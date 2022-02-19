<template>
  <div class="edit">
    <div class="top" :style="imglink?{background:`url(${imglink}) no-repeat`,backgroundSize:'cover'}:''">
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
          <div v-else class="tip-banner">
            点此重新上传
          </div>
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
      <div ref="editor"></div>
    </div>
    <div class="tagandpublish">
      <div class="tag">
        <p>选择标签</p>
        <el-select
          style="width: 50%"
          v-model="tags"
          multiple
          placeholder="请选择标签"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.tagName"
            :value="item.tagName"
          >
          </el-option>
        </el-select>
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
import { getTagList, publishArticle, uploadBanner } from "@/api/article";
import type {
  ElFile,
  UploadFile,
} from "element-plus/es/components/upload/src/upload.type";
import { useStore } from "@/store/main";
import { ElMessage, ElMessageBox } from "element-plus";
import { onMounted, onBeforeUnmount, ref, reactive } from "vue";
import { useRouter } from "vue-router";
import WangEditor from "wangeditor";
import { Tag } from "@/interface/tag";
import { ArticleReqParams, Content } from "@/interface/article";
import { useUpload } from "@/hooks/upload";
const store = useStore();
const router = useRouter();
let imglink = ref("");
//富文本编辑器
const editor = ref();
const content = reactive<Content>({
  html: "",
  text: "",
});
let instance: WangEditor;
onMounted(() => {
  instance = new WangEditor(editor.value);
  Object.assign(instance.config, {
    onchange() {},
  });
  instance.create();
  getTag();
});
onBeforeUnmount(() => {
  instance.destroy();
});
//富文本编辑器

// elm input
const summary = ref("");
let title = ref("这里输入标题");
let styleChange = ref(false);
// 选择tag

let tags = ref<string[]>([]);
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
const handleRemove = (file: UploadFile) => {
  console.log(file);
};
const beforeRemove = (file: UploadFile, fileList: UploadFile[]) => {
  return true;
};
const handleExceed = (files: FileList, fileList: UploadFile[]) => {
  ElMessage.warning("只能上传一张头图");
};
const beforeBannerUpload = async (file: UploadFile) => {
  console.log(file);
  const link =await useUpload(file);
  console.log(link);
  if(link!==""){
    imglink.value=link;
  }
  return true;
};

// 提交逻辑
const submitArticle = async () => {
  if (!store.user.token) {
    ElMessage.error("您当前未登录，请登录后重试");
    return
  } else {
    // 已登录状态下 校验标题和摘要或者标题是否为空还有是否选中标签
    if (!summary.value) {
      ElMessage.error("请输入摘要");
      return
    } else if (!instance.txt.html()) {
      ElMessage.error("请输入正文");
      return
    } else if (!title.value) {
      ElMessage.error("请输入标题");
      return
    } else if (!tags.value || tags.value.length === 0) {
      ElMessage.error("请选择标签");
      return
    } else if(!imglink.value){
      ElMessage.error("请上传头图哦");
      return
    }
    // 创建一个请求参数体
    const articleReqParams :ArticleReqParams = {
      body: {
        contentHtml: "",
        content: "",
      },
      summary: "",
      articleName: "",
      tags: [],
      banner:''
    };
    content.html = instance.txt.html();
    content.text = instance.txt.text();
    // 处理tag
    // TODO 优化tags逻辑  
    let tagsReal=ref<Tag[]>([])
    for(let i =0;i<tags.value.length;i++){
      options.value.forEach(item=>{
        if(tags.value[i]===item.tagName){
          tagsReal.value.push(item);
        }
      })
    }
    // 赋值
    articleReqParams.body.content = content.text;
    articleReqParams.body.contentHtml = content.html;
    articleReqParams.summary = summary.value;
    articleReqParams.tags =tagsReal.value;
    articleReqParams.articleName = title.value;
    articleReqParams.banner = imglink.value;
    // 请求
    const { data } = await publishArticle(articleReqParams);
    ElMessage.success("发布成功 2s后跳转文章");
    setTimeout(() => {
      router.push(`/article/${data.data.id}`);
    }, 2000);
  }
};
</script>

<style lang="less" scoped>
.boxshadow {
  background-color: rgb(255, 255, 254) !important;
  box-shadow: 1px 1px 10px rgba(10, 145, 255, 0.521);
}
.edit {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  p {
    color: rgb(107, 5, 5);
    margin: 20px 0;
  }
  .top {
    margin: 20px 0;
    padding: 20px;
    border-radius: 30px;
    background-color: rgb(255, 255, 255);
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.452);
    input {
      background-color: rgba(255, 255, 255, 0.014);
      height: 48px;
      border: none;
      outline: none;
      text-shadow:1px 1px 5px rgba(255, 255, 255, 0.452); ;
      width: 80%;
      font-size: 36px;
    }
    
    .upload-demo {
      padding: 20px 0;
      display: flex;
      align-items: center;
      .tip-banner{
        margin-left: 20px;
      }
    }
  }
  .tagandpublish {
    margin-top: 30px;
    display: flex;
    padding: 20px;
    justify-content: space-between;
    align-items: center;
    border-radius: 30px;
    background-color: rgb(255, 170, 170);
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.452);
    .tag {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
    }
    
  }
}
</style>