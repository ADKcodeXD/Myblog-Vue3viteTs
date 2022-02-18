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
import { uploadBanner } from "@/api/article";
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
    const beforeAvatarUpload = async (file: ElFile) => {
      const isImg = file.type === "image/jpeg" || file.type === "image/png";
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isImg) {
        ElMessage.error("请上传jpg或者png格式的图片");
        return isImg;
      }
      if (!isLt5M) {
        ElMessage.error("请不要上传大于5MB的图片");
        return isLt5M;
      }
      let flag = true;
      // 上传到后端
      const fd = new FormData();
      fd.append("image", file);
      const { data } = await uploadBanner(fd);
      console.log(data);
      if (data.code !== 200) {
        ElMessage.error(data.msg);
        return flag;
      } else {
        ElMessage.success("上传成功");
        avatarLink.value = data.data;
        // 通知父组件 链接更改
        emit("changeAvatar", avatarLink.value);
      }
      return flag;
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