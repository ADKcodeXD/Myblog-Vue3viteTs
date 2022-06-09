<template>
  <div class="edit">
    <div class="top">
      <div class="upload">
        <UploadImage @imglink="changeImagelink" :imglink="imglink">点击上传文章头图</UploadImage>
      </div>
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
import { useEditor, useTagAndArticle } from "@/hooks/useEdit";
const imglink = ref("");
const changeImagelink = (link: string) => {
  imglink.value = link
}
const { changeEditor,
  changeContentRich,
  changeContent,
  editorName,
  content,
  contentRich } = useEditor();

const { canChooseTags,
  addTagFn,
  submitArticle,
  tags,
  styleChange,
  summary,
  title } = useTagAndArticle(editorName, imglink, contentRich, content);

</script>

<style lang="less" scoped>
@import url(./styles/Edit.less);
</style>