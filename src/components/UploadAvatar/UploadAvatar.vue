<template>
  <div class="out">
    <el-upload
      class="upload"
      action=""
      :show-file-list="false"
      :limit="1"
      accept=".png, .jpg, .jpeg"
      :on-exceed="handleExceed"
      :before-upload="beforeUpload"
      :http-request="upload"
      ref="uploadEl"
    >
      <div class="upload-banner">
        <div class="tip" v-if="!imglink">
          <div class="inner">&#128513;</div>
        </div>
        <div v-else class="tw-h-full tw-w-full">
          <div class="tip" v-if="loading">
            <div class="loading_percent">
              <LoadingAnime />
              {{ loadingPercent }}%
            </div>
          </div>
          <MyElimage :img="imglink" />
        </div>
      </div>
    </el-upload>
    <p v-if="isShow">点击上传头像</p>
  </div>
</template>

<script lang="ts" setup>
import img from '@/assets/logo.png'
import { useUploadImg } from '@/hooks/useUpload'
const emit = defineEmits(['imglink'])
const props = defineProps({
  avatar: {
    type: String,
    default: img
  },
  isShow: {
    type: Boolean,
    default: true
  }
})
const { imglink, handleExceed, beforeUpload, upload, loading, loadingPercent, uploadEl } =
  useUploadImg(emit, props.avatar)
</script>

<style lang="less" scoped>
.out {
  width: 100%;
  height: 100%;
  .flexbox(column,flex-start);
}
.upload {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  :deep(.el-upload) {
    width: 100%;
    height: 100%;
  }

  .upload-banner {
    border: @border-line dashed @textColor;
    .flexbox();
    border-radius: 50%;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: @tipTextColor;
    transition: background-color 0.3s ease;
    position: relative;
    overflow: hidden;

    &:hover {
      border: @linkColor @border-line dashed;
      background-color: @bgColor;
    }

    .tip {
      position: absolute;
      .flexbox(column);
      z-index: 5;
      height: 100%;
      width: 100%;
      backdrop-filter: blur(3px);
      border-radius: 50%;

      .inner {
        height: 100%;
        width: 100%;
        .flexbox();
        font-size: 60px;
      }

      .loading_percent {
        color: @hoverTextColor;
        .flexbox(column);
        padding: @padding-general;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
