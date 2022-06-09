import { useUpload } from "@/hooks/upload";
import { ElMessage, UploadProps } from "element-plus";

export const useUploadImg = (emit,init:string) => {
    const imglink = ref(init);
    const loading=ref(false);
    const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
        console.log(file, uploadFiles)
    }
    const beforeRemove: UploadProps['beforeRemove'] = (file, fileList) => {
        return true;
    };
    const handleExceed: UploadProps['onExceed'] = (files, fileList) => {
        ElMessage.warning("只能上传一张头图");
    };
    const beforeBannerUpload: UploadProps['beforeUpload'] = async (file) => {
        loading.value=true;
        const link = await useUpload(file);
        if (link !== "") {
            imglink.value = link;
            emit('imglink',imglink.value);
        }
        loading.value=false;
        return true;
    };
    return {
        imglink,
        handleRemove,
        beforeRemove,
        handleExceed,
        beforeBannerUpload,
        loading
    }
}