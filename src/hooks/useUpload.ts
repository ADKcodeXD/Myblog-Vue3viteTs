import {uploadImage,uploadImageToLocal} from "@/api/article";
import {Ref} from "vue";
import {useStore} from '@/store/main';
import {
    ElMessage,
    genFileId,
    UploadInstance,
    UploadProps,
    UploadRawFile
} from "element-plus";


/**
 * 重新封装的useUpload函数 目前可以得知上传的进度
 * 
 * @param file 上传的文件
 * @param loadingNum 用于接收上传进度的ref数值 双向绑定数值 可以不传入 则不绑定
 * @returns url 一个图片链接
 */
export const useUpload = async (file : File, loadingNum? : Ref < number >) : Promise < string > => { // 上传到后端
    return new Promise((resolve, reject) => {
        const fd = new FormData();
        fd.append("image", file);
        let url = "";
        uploadImage(fd, (e) => {
            if (loadingNum) {
                if (e.lengthComputable) 
                    loadingNum.value = Number(((e.loaded / e.total) * 100).toFixed(2));
            }
        }).then(({data}) => {
            if (data.code !== 200) {
                ElMessage.error(data.msg);
                return url;
            } else {
                url = data.data;
                resolve(url);
            }
        }).catch((reason) => {
            reject('请求失败');
        })
    })
}

/**
 * 上传图片的hooks 使用这个即可
 * 注意要接受一个事件 upload会发送一个事件@imglink @param 是接口返回的图片链接
 * @param emit emit 用于发送事件给上层组件 在upload函数中 会发送一个事件@imglink
 * @param init 初始的图片链接 可以传入 也可以不传入
 * @returns 
 */
export const useUploadImg = (emit, init?: string,onlyShow?:boolean) => {
    const imglink = ref(init); // 初始化图片链接
    const loading = ref(false); // 标识等待
    const uploadEl = ref < UploadInstance > (); // elupload 的组件实例
    const loadingPercent = ref(0); // 标识文件上传进度的值；

    const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
        console.log(file, uploadFiles)
    }
    const beforeRemove: UploadProps['beforeRemove'] = (file, fileList) => {
        return true;
    };
    /**
     * 只用于上传单张图片 
     * 用于在超出文件限制时  替换和移除上一个文件的钩子
     * @param files 自动传入当前的文件
     */
    const handleExceed: UploadProps['onExceed'] = (files) => {
        uploadEl.value !.clearFiles()
        const file = files[0] as UploadRawFile
        file.uid = genFileId()
        uploadEl.value !.handleStart(file);
        /**
         * 这里由于循环队列的原因 upload会最先被推入队列中 这样就导致了
         * catch块和finally 后于upload执行 那么loading的值会被覆盖掉 
         * 为了保证catch块和finally先于这两个执行 故使用setTimeout将其推入宏任务队列中
         */
        cancelUpload();
        setTimeout(() => {
            if (beforeUpload(file)) {
                // imglink.value = "";
                upload({file})
            };
        }, 0)
    };
    /**
     * 用于暂时的获取blob标签 判断文件的类型以及大小
     * 大小设置为5mb 文件暂定只有jpeg和png
     * @param file 文件
     * @returns 
     */
    const beforeUpload: UploadProps['beforeUpload'] = (file) => {
        const isImg = file.type === "image/jpeg" || file.type === "image/png";
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (! isImg) {
            ElMessage.error("请上传jpg或者png格式的图片");
            return false;
        }
        if (! isLt5M) {
            ElMessage.error("请不要上传大于5MB的图片");
            return false;
        }
        if(onlyShow){
            ElMessage.error("当前仅为展示模式!!");
            return false
        }
        imglink.value = URL.createObjectURL(file);
        return true;
    }
    /**
     * 使用接口上传文件 成功了会emit一个 imglink的事件 参数为新的img的链接
     * @param params 
     */
    const upload = async (params) => {
        const {file} = params;
        loading.value = true;
        console.log('upload');
        try {
            const link = await useUpload(file, loadingPercent);
            if (link !== "") {
                imglink.value = link;
                emit('imglink', imglink.value);
            }
        } catch (error) {
            console.log(error);
            imglink.value = "";
        } finally {
            loading.value = false;
        }
    };
    /**
     * 用于取消上传图片
     */
    const cancelUpload = () => {
        const store = useStore();
        let obj = store.cancel;
        if (obj['/api/upload/img']) {
            obj['/api/upload/img']();
            delete obj['/api/upload/img'];
        }
        store.setCancel(obj);
    }
    return {
        imglink,
        handleRemove,
        beforeRemove,
        handleExceed,
        beforeUpload,
        cancelUpload,
        upload,
        loading,
        loadingPercent,
        uploadEl
    }
}
