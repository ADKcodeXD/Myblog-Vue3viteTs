<template>
  <div class="upload">
    <el-upload class="avatar-uploader" action="noaction" :show-file-list="false" :limit="1" accept=".png, .jpg, .jpeg"
      :on-exceed="handleExceed" :before-upload="beforeAvatarUpload">
      <div class="avatar">
        <img :src="avatar ? avatar : 'src/assets/img/logo.png'"
          onerror="javascript:this.src='src/assets/img/logo.png';" />
      </div>
      <p style="font-size: 12px" v-if="isShow">点此上传头像</p>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import img from "@/assets/logo.png";
import { ElMessage } from "element-plus";
import {
  ElFile,
  UploadFile,
} from "element-plus/es/components/upload/src/upload.type";
import { useUpload } from "@/hooks/upload";
const emit=defineEmits(['changeAvatar'])
const props = defineProps({
  size: {
    type: Number,
    default: 60,
  },
  avatar: {
    type: String,
    default: img,
  },
  isShow: {
    type: Boolean,
    default: true,
  },
});

let avatarLink = ref<string | undefined>("");
avatarLink.value = props.avatar;
const handleExceed = (files: FileList, fileList: UploadFile[]) => {
  ElMessage.warning("只能上传一张头图");
};
const beforeAvatarUpload = async (file: UploadFile) => {
  const url = await useUpload(file as unknown as ElFile);
  if (url == "") return false;
  emit("changeAvatar", url);
};
</script>

<style lang="less" scoped>
.upload {
  display: flex;
  width: 100%;
  height: 100%;

  .avatar-uploader {
    display: flex;
    width: 100%;
    height: 100%;

    .avatar {
      background-color: rgb(@primaryTextColor);
      overflow: hidden;
      border-radius: 50%;
      margin: 0 auto;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>