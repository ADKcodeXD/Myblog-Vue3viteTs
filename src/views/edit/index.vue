<template>
  <div class="edit">
    <div class="top">
      <el-upload class="upload-demo" action="" :on-remove="handleRemove" :before-remove="beforeRemove"
        :before-upload="beforeBannerUpload" :show-file-list="false" :limit="1" accept=".png, .jpg, .jpeg"
        :on-exceed="handleExceed">
        <div class="upload-banner">
          <MyElimage :img="imglink" v-if="imglink" />
          <div class="tip" v-else>
            <span style="font-size: 80px;">+</span>
            点击上传文章头图
          </div>
        </div>
      </el-upload>
      <input class="title" :class="{ boxshadow: styleChange }" type="text" @focus="styleChange = true"
        @blur="styleChange = false" v-model="title" />
      <div class="summary">
        <el-input v-model="summary" autosize show-word-limit maxlength="80" type="textarea"
          placeholder="请输入摘要 不多于80字" />
      </div>
      <!-- tinymce编辑器 -->
      <MyEditor @changeEditor="changeEditor" @changeContent="changeContent" @changeContentRich="changeContentRich"
        :saveContent="content" :saveContentRich="contentRich" />
      <div class="bottom">
        <div class="tag">
          <TagChoose :chooseOptions="canChooseTags" :choosedTag="tags" :canAdd="true" @addTag="addTagFn" />
        </div>
        <div class="publish">
          <el-button type="primary" round size="large" @click="submitArticle" class="submit-btn">
            发布
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MyEditor from "./components/MyEditor.vue";
import { ElInput } from "element-plus";
import { useEditor, useTagAndArticle, useUploadBanner } from "@/hooks/useEdit";

const { imglink, handleRemove, beforeRemove, handleExceed, beforeBannerUpload } = useUploadBanner();

const { changeEditor,
  changeContentRich,
  changeContent,
  editorName,
  content,
  contentRich } = useEditor();

const {canChooseTags,
        addTagFn,
        submitArticle,
        tags,
        styleChange,
        summary,
        title}=useTagAndArticle(editorName,imglink,contentRich,content);

</script>

<style lang="less" scoped>
@import url(./styles/edit-pc.less);

.boxshadow {
  background-color: rgb(255, 255, 254) !important;
  box-shadow: 1px 1px 10px rgba(10, 145, 255, 0.521);
}
</style>