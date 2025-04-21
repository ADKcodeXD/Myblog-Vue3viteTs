<template>
  <div class="edit">
    <div class="top">
      <div class="upload">
        <UploadImage @imglink="changeImagelink" :imglink="imglink">点击上传文章头图</UploadImage>
      </div>
      <input
        class="title"
        :class="{ boxshadow: styleChange }"
        type="text"
        @focus="styleChange = true"
        @blur="styleChange = false"
        v-model="title"
        placeholder="这里输入标题"
      />
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
      <!-- 双重切换编辑器 -->
      <MyEditor
        @changeEditor="changeEditor"
        @changeContent="changeContent"
        @changeContentRich="changeContentRich"
        :saveContent="content"
        :saveContentRich="contentRich"
      />
      <div class="bottom">
        <div class="tags">
          <TagChoose
            :chooseOptions="canChooseTags"
            :choosedTag="tags"
            :canAdd="true"
            @addTag="addTagFn"
            class="tag"
          />
          <div class="pannel">
            <p class="label">板块选择</p>
            <el-select v-model="pannel" placeholder="选择板块">
              <el-option
                v-for="(item, index) in 8"
                :key="item"
                :label="ArticlePannel[index]"
                :value="index"
              />
            </el-select>
          </div>
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
import { ElInput } from 'element-plus'
import { useArticleSubmit, useEditor, useSave } from '@/hooks/useEdit'
import { useTag } from '@/hooks/useTag'
import { ArticlePannel } from '@/interface/EnumExport'
const imglink = ref('')
const changeImagelink = (link: string) => {
  imglink.value = link
}
const { changeEditor, changeContentRich, changeContent, editorName, content, contentRich } =
  useEditor()
const { tags, addTagFn, canChooseTags } = useTag()
const { submitArticle, styleChange, summary, title, pannel } = useArticleSubmit(
  editorName,
  imglink,
  contentRich,
  content,
  tags
)
useSave(content, contentRich)
</script>

<style lang="less" scoped>
@import url(./styles/Edit.less);
</style>
