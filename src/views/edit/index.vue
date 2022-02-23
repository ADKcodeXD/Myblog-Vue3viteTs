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
import { getTagList, publishArticle } from "@/api/article";
import type { UploadFile } from "element-plus/es/components/upload/src/upload.type";
import { useStore } from "@/store/main";
import { ElMessage, ElNotification } from "element-plus";
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { Tag } from "@/interface/tag";
import { ArticleReqParams, Content } from "@/interface/article";
import { useUpload } from "@/hooks/upload";
import MyEditor from "./components/MyEditor.vue";
import { getItem, removeItem, setItem } from "@/utils/storage";
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
  const link = await useUpload(file);
  console.log(link);
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
    } else if (!content.html) {
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
    // 处理tag
    // TODO 优化tags逻辑
    let tagsReal = ref<Tag[]>([]);
    for (let i = 0; i < tags.value.length; i++) {
      options.value.forEach((item) => {
        if (tags.value[i] === item.tagName) {
          tagsReal.value.push(item);
        }
      });
    }
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
    articleReqParams.tags = tagsReal.value;
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
</script>

<style lang="less" scoped>
@import url(./styles/edit-pc.less);
.boxshadow {
  background-color: rgb(255, 255, 254) !important;
  box-shadow: 1px 1px 10px rgba(10, 145, 255, 0.521);
}
</style>