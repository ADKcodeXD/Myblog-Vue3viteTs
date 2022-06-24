<template>
    <div class="container myscrollbar">
        <div class="title">
            <div>
                <h2>这里是画廊</h2>
                <p>欢迎您上传你喜欢的图片哦~</p>
            </div>
            <div class="post" @click="isDialogShow = true">
                投稿
            </div>
        </div>
        <ElDivider />
        <div class="img" ref="imgcontainer">
            <AdkEmpty v-if="picList.length<=0" />
            <div class="img-item" v-for="item in picList" :key="item.id">
                <div class="up">
                    <MyElimage :img="item.url" @load="imagePubu" />
                </div>
                <div class="info">
                    <p class="title">{{item.title}}</p>
                    <p class="desc">{{item.summary}}</p>
                    <div class="author">
                        <div class="inner">
                            <div class="avatar">
                                <MyElimage :img="item.author.avatar" />
                            </div>
                            <p class="authorname">{{item.author.nickname}}</p>
                        </div>
                        <address class="time">发布于{{item.createTime}}</address>
                    </div>
                </div>
            </div>
        </div>
        <!-- 表单组件 -->
        <el-dialog v-model="isDialogShow" title="上传图片">
            <div class="dialog">
                <div class="dialog-image">
                    <UploadImage @imglink="setUrl" :imglink="postParams.url" />
                </div>
                <input class="text" type="text" v-model="postParams.title" placeholder="这里输入图片标题" />
                <div class="summary">
                    <el-input  autosize show-word-limit maxlength="80" type="textarea" placeholder="请输入图片简介 不多于80字"
                        v-model="postParams.summary" />
                </div>
                <div class="button-group">
                    <ElButton type="danger" @click="isDialogShow = false">取消</ElButton>
                    <ElButton type="success" @click="postImage">上传</ElButton>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script setup lang="ts" >
import { addPic, getPics } from '@/api/pic';
import Img from '@/assets/img/404img.jpg'
import { useUserStore } from '@/store/user';
import { ElMessage } from 'element-plus';
const imgcontainer = ref<HTMLElement>();
const imagePubu = () => {
    let divList = imgcontainer.value.getElementsByClassName('img-item');// 获取到需要布局显示的div容器
    const newDiv: HTMLElement[] = Array.from(divList) as HTMLElement[];
    const pageW = imgcontainer.value.clientWidth // 获取容器的宽度
    const divW = divList[0].clientWidth // 获取一个div容器的宽度
    const cols = Math.floor(pageW / divW) // 计算一行能够放几个div容器
    const arrH: number[] = [] // 用来存储每个div容器的高度;
    const gap = 8;
    // 循环div容器的数组
    newDiv.forEach((item, index) => {
        // 1. 对下标小于一行个数的div容器进行操作
        if (index < cols) {
            arrH.push(item.offsetHeight) // 将div容器的高度放入数组中
            console.log(item.clientHeight);
            item.style.left = index * divW + index * gap * 2 + 'px' // 同时设置每个容器的left值，第一行top都为0
        }
    })
    // 2. 对剩余的div容器进行循环
    for (let i = cols; i < newDiv.length; i++) {
        let minH = Math.min(...arrH); // 获取到数组中最小的高度
        let idx_min = arrH.indexOf(minH) // 查找到最小高度的下标
        newDiv[i].style.left = newDiv[idx_min].style.left
        newDiv[i].style.top = minH + gap + 'px';
        // 最小列的高度 = 当前自己的高度 + 新容器的高度 + 间隙
        arrH[idx_min] = minH + divList[i].clientHeight + gap;
    }
}
const isDialogShow = ref(false);
const postParams = reactive({
    url: '',
    title: '',
    summary: ''
})
const pageParams = reactive<PageParams>({
    page:1,
    pagesize:10
})
const picList=ref<PicVo[]>([]);
const total=ref(0);
const setUrl = (val: string) => {
    postParams.url = val
}
const currentUser=useUserStore();
const postImage=async ()=>{
    if(postParams.summary.length<=0||postParams.summary.length>80){
        ElMessage.error('介绍应控制在0-80字哦~');
        return ;
    }
    if(postParams.title.length<=0||postParams.summary.length>24){
        ElMessage.error('标题要控制在0-24字哦~');
        return ;
    }
    if(!postParams.url){
        ElMessage.error('请上传图片~');
        return ;
    }
    if(!currentUser.userinfo.id){
        ElMessage.error('请登录后上传~');
        return ;
    }
    await addPic(postParams);
    ElMessage.success('上传成功！');
    isDialogShow.value=false;
    postParams.summary='';
    postParams.title='';
    postParams.url='';
    getPicsFn();
}
const getPicsFn=async ()=>{
    const{data}= await getPics(pageParams);
    total.value=data.data.length;
    picList.value=data.data.results;
}
onMounted(() => {
    window.addEventListener('resize', imagePubu);
    getPicsFn();
})

</script>
<style lang="less" scoped>
@import url(./styles/picture.less);
</style>