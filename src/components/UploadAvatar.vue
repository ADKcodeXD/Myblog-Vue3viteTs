<template>
  <div class="upload">
    <el-upload
      class="avatar-uploader"
      action=""
      :show-file-list="false"
      :limit="1"
      accept=".png, .jpg, .jpeg"
      :on-exceed="handleExceed"
      :before-upload="beforeAvatarUpload"
    >
      <div class="avatar" :style="{ width: `${size}px`, height: `${size}px` }">
        <img :src="avatar ? avatar : 'src/assets/img/logo.png'" />
      </div>

      <p style="font-size: 12px" v-if="isShow">点此上传头像</p>
    </el-upload>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import img from "@/assets/img/women.png";
import { ElMessage } from "element-plus";
import {
  ElFile,
  UploadFile,
} from "element-plus/es/components/upload/src/upload.type";
import { useUpload } from "@/hooks/upload";
export default defineComponent({
  props: {
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
  },
  setup(props, { emit }) {
    let avatarLink = ref<string | undefined>("");
    avatarLink.value = props.avatar;
    const handleExceed = (files: FileList, fileList: UploadFile[]) => {
      ElMessage.warning("只能上传一张头图");
    };
    const beforeAvatarUpload = async (file: UploadFile) => {
      const url=await useUpload(file);
      // 通知父组件 链接更改
      if(url!==""){
        avatarLink.value=url;
        emit("changeAvatar", avatarLink.value);
      }
    };
    return { handleExceed, beforeAvatarUpload, avatarLink };
  },
});
</script>

<style lang="less" scoped>
.upload {
  display: flex;
  .avatar-uploader {
    display: flex;

    .avatar {
      background-color: rgb(184, 183, 183);
      overflow: hidden;
      border-radius: 50%;
      margin: 0 auto;
      img {
        width: 100%;
        height: auto;
        object-fit: cover;
      }
    }
  }
}
</style>