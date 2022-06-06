<template>
  <div class="edit">
    <div
      class="top"
      :style="
        imglink
          ? { background: `url(${imglink}) no-repeat`, backgroundSize: 'cover' }
          : ''
      "
    >
      <input
        class="title"
        :class="{ boxshadow: styleChange }"
        type="text"
        @focus="styleChange = true"
        @blur="styleChange = false"
        v-model="title"
      />
      <el-upload
        class="upload-demo"
        action=""
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :before-upload="beforeBannerUpload"
        :show-file-list="true"
        :limit="1"
        accept=".png, .jpg, .jpeg"
        :on-exceed="handleExceed"
      >
        <template #tip>
          <div class="tip-banner" v-if="!imglink">
            请上传一张banner作为文章的头图
          </div>
          <div v-else class="tip-banner">点此重新上传</div>
        </template>
        <el-button type="primary">点击上传</el-button>
      </el-upload>
      <p>请在这里输入摘要</p>
      <div class="summary">
        <el-input
          v-model="summary"
          autosize
          show-word-limit
          maxlength="80"
          type="textarea"
          placeholder="请输入摘要 不多于80字"
        />
      </div>
    </div>
    <div class="input-text">
      <!-- tinymce编辑器 -->
      <MyEditor
        @changeEditor="changeEditor"
        @changeContent="changeContent"
        @changeContentRich="changeContentRich"
        :saveContent="content"
        :saveContentRich="contentRich"
      />
      <!-- wangeditor -->
      <!-- <div ref="editor"></div> -->
    </div>
    <div class="tagandpublish">
      <div class="tag">
        <p>选择标签</p>
        <div class="tagsgroup">
          <el-tag
            class="tag-item"
            v-for="item in canChooseTags"
            :key="item.id"
            type="success"
            @click="addInTags(item)"
            
            >{{ item.tagName }}
          </el-tag>
          <el-input
            v-if="inputVisible"
            v-model="inputValue"
            ref="inputref"
            style=" width:5em"
            size="small"
            placeholder="标签名"
            @keyup.enter="handleInputConfirm"
            @blur="handleInputConfirm"
          >
          </el-input>
          <el-button
            v-else
            class="button-new-tag ml-1"
            size="small"
            @click="showInput"
          >
            + New Tag
          </el-button>
        </div>
        <p>已选择标签</p>
        <div class="choosed">
          <el-tag
            class="tag-item"
            v-for="item in tags"
            :key="item.id"
            type="success"
            @close="deleteTag(item)"
            closable
            >{{ item.tagName }}
          </el-tag>
        </div>
      </div>
      <div class="publish">
        <el-button
          style="width: 100px; height: 50px"
          type="primary"
          round
          size="large"
          @click="submitArticle"
          >发布</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { addTag, getTagList, publishArticle } from "@/api/article";
import { useStore } from "@/store/main";
import { useUpload } from "@/hooks/upload";
import MyEditor from "./components/MyEditor.vue";
import { getItem, removeItem, setItem } from "@/utils/storage";
import { ElInput, ElMessage, ElNotification } from "element-plus";
import type { UploadProps, UploadUserFile } from 'element-plus'
// 上传组件待重构
// import { UploadFile,ElFile } from "element-plus/lib/components";
// 定义组件名
const store = useStore();
const router = useRouter();
let imglink = ref("");

// 存放两种内容的地方
let content = reactive<Content>({
  html: "",
  text: "",
});
let contentRich = reactive<Content>({
  html: "",
  text: "",
});
// v-model 动态更改编辑器内容
const changeContent = (val: Content) => {
  content.html = val.html;
  content.text = val.text;
};
const changeContentRich = (val: Content) => {
  contentRich.html = val.html;
  contentRich.text = val.text;
};
// 读取子组件是否更改编辑器类型
let editorName = ref("tinymce");
const changeEditor = (val: string) => {
  editorName.value = val;
};
// 自动保存定时器
function save() {
  if (content.html) {
    setItem("temp", { rich: contentRich, markdown: content });
    ElNotification({
      title: "自动保存成功",
      message: "已保存到本地存储",
      type: "success",
    });
  }
}
// 2分钟自动保存一次 设置定时器
const saveTemp = setInterval(save, 120000);
// 加载 包括本地存储
onBeforeMount(() => {
  getTag();
  const a = getItem("temp");
  if (a) {
    if (a.rich) {
      contentRich.html = a.rich.html;
      contentRich.text = a.rich.text;
    }
    if (a.markdown) {
      content.html = a.markdown.html;
      content.text = a.markdown.text;
    }
  }
});
onUnmounted(() => {
  clearInterval(saveTemp);
});

// elm input
const summary = ref("");
let title = ref("这里输入标题");
let styleChange = ref(false);
// 选择tag
let tags = ref<Tag[]>([]);
let options = ref<Tag[]>([]);
const getTag = async () => {
  const { data } = await getTagList();
  if (data.code === 200) {
    options.value = data.data;
  } else {
    console.log("error");
  }
};

// 上传图片
interface RawFile {
  name: string;
  url: string;
}
const fileList = ref<RawFile[]>([]);
const handleRemove: UploadProps['onRemove'] = (file, uploadFiles) => {
  console.log(file, uploadFiles)
}
const beforeRemove: UploadProps['beforeRemove'] = (file,fileList) => {
  return true;
};
const handleExceed: UploadProps['onExceed'] = (files, fileList) => {
  ElMessage.warning("只能上传一张头图");
};
const beforeBannerUpload: UploadProps['beforeUpload'] = async (file) => {
  const link = await useUpload(file);
  if (link !== "") {
    imglink.value = link;
  }
  return true;
};

// 提交逻辑
const submitArticle = async () => {
  if (!store.user.token) {
    ElMessage.error("您当前未登录，请登录后重试");
    return;
  } else {
    // 已登录状态下 校验标题和摘要或者标题是否为空还有是否选中标签
    if (!summary.value) {
      ElMessage.error("请输入摘要");
      return;
    } else if ( editorName.value==="tinymce"? !contentRich.html : !content.html ) {
      ElMessage.error("请输入正文");
      return;
    } else if (!title.value) {
      ElMessage.error("请输入标题");
      return;
    } else if (!tags.value || tags.value.length === 0) {
      ElMessage.error("请选择标签");
      return;
    } else if (!imglink.value) {
      ElMessage.error("请上传头图哦");
      return;
    }
    // 创建一个请求参数体
    const articleReqParams: ArticleReqParams = {
      body: {
        contentHtml: "",
        content: "",
      },
      summary: "",
      articleName: "",
      tags: [],
      banner: "",
    };
    
    // 赋值
    if (editorName.value === "tinymce") {
      // 不改表结构的情况下 让markdown存入contentHtml中 后续渲染可以直接不用动态切换
      articleReqParams.body.content = contentRich.text;
      articleReqParams.body.contentHtml = contentRich.html;
    } else {
      articleReqParams.body.content = content.text;
      articleReqParams.body.contentHtml = content.html;
    }
    articleReqParams.summary = summary.value;
    articleReqParams.tags = tags.value;
    articleReqParams.articleName = title.value;
    articleReqParams.banner = imglink.value;
    // 请求
    const { data } = await publishArticle(articleReqParams);
    removeItem("temp");
    ElMessage.success("发布成功 2s后跳转文章");
    content.html = "";
    setTimeout(() => {
      router.push(`/article/${data.data.id}`);
    }, 2000);
  }
};

// 动态增加标签
let inputVisible=ref(false);
let inputValue=ref('');
let inputref=ref<InstanceType<typeof ElInput>>()
const showInput=()=>{
  inputVisible.value=true;
  // 由于dom还没渲染 在下一个异步任务队列当中 nexttick直接
  // 跳到下一个异步任务
   nextTick(() => {
    inputref.value!.input!.focus()
  })
}
// 添加标签触发的事件
const handleInputConfirm=async ()=>{
  if (inputValue.value) {
    if(inputValue.value.length>8){
      ElMessage.error('标签长度不能太长')
    }else{
      // 接口 调用 添加tag
      await addTag(inputValue.value);
      ElMessage.success('成功');
      getTag();
    }
  }
  inputVisible.value = false
  inputValue.value = ''
}
// 增加标签
const addInTags=(item:Tag)=>{
  if(tags.value.length<=3){
    tags.value.push(item);
  }else{
    ElMessage.error('最多只能选择4个标签')
  }
}
// 删除标签
const deleteTag=(item:Tag)=>{
  tags.value.splice(tags.value.indexOf(item),1);
}
// 计算属性  移除已选择标签
const canChooseTags=computed(()=>{
  return options.value.filter(item=>{
    let flag=true;
    tags.value.forEach(tag=>{
      if(tag.id===item.id)  flag=false
    })
    return flag;
  })
})
</script>

<style lang="less" scoped>
@import url(./styles/edit-pc.less);
.boxshadow {
  background-color: rgb(255, 255, 254) !important;
  box-shadow: 1px 1px 10px rgba(10, 145, 255, 0.521);
}
</style>