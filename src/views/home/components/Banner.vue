<template>
   <div class="banner">
      <el-upload class="upload" action="" :before-upload="beforeBannerUpload" :show-file-list="true" :limit="1"
        accept=".png, .jpg, .jpeg" :on-exceed="handleExceed">
        <el-button type="primary" plain>点击上传封面</el-button>
      </el-upload>
      <img :src="banner" alt="" onerror="javascript:this.src='/src/assets/img/404img1200.jpg';" />
    </div>
</template>
<script setup lang="ts" >
import { ElMessage } from "element-plus";
import type {
  UploadFile,
  ElFile,
} from 'element-plus/es/components/upload/src/upload.type';
import { useUpload } from "../../../hooks/upload";
const props=defineProps({
    banner:{
        type:String,
        default:""
    }
})
const emit=defineEmits(['changeBanner']);
// 上传banner
const beforeBannerUpload = async (file: UploadFile) => {
  const url = await useUpload(file as unknown as ElFile)
  if (url == "") {
    return false;
  }
  emit('changeBanner',url);
};

const handleExceed = (files: FileList, fileList: UploadFile[]) => {
  ElMessage.warning("只能上传一张头图");
};

</script>

<style lang="less">
.banner {
    position: relative;
    width: 100%;
    height: 300px;
    background-color: rgb(@primaryActiveColor);

    .upload {
      position: absolute;
      right: 20px;
      bottom: 30px;
    }
  }
</style>