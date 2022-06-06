<template>
  <div class="upload">
    <el-upload action="noaction" :show-file-list="false" 
    :limit="1" accept=".png, .jpg, .jpeg" 
    :on-exceed="handleExceed"
    :before-upload="beforeAvatarUpload">
      <div class="avatar" >
        <MyElimage :img="avatar ? avatar : logo" />
      </div>
      <p style="font-size: 12px" v-if="isShow">点此上传头像</p>
    </el-upload>
  </div>
</template>

<script lang="ts" setup>
import img from "@/assets/logo.png";
import { ElMessage, UploadProps } from "element-plus";
import { useUpload } from "@/hooks/upload";
import logo from '@/assets/img/logo.png';
const emit = defineEmits(['changeAvatar'])
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
const handleExceed: UploadProps['onExceed'] = (files, fileList) => {
  ElMessage.warning("只能上传一张头图");
};
const beforeAvatarUpload: UploadProps['beforeUpload'] = async (file) => {
  const url = await useUpload(file);
  if (url == "") return false;
  emit("changeAvatar", url);
};
</script>

<style lang="less" scoped>
.upload {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  &>div{
    width: 100%;
    height: 100%;
  }
  :deep(.el-upload) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    width: 100%
  }

  .avatar {
    .flexbox(row);
    background-color: rgb(0, 0, 0);
    margin: 0 auto;
    border-radius: 50%;
    width: 100%;
    height: 100%;
    flex-shrink: 0;
    overflow: hidden;
  }
}
</style>