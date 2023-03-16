<template>
  <!-- 表单组件 -->
  <el-dialog v-model="isDialogShow" title="上传图片" @close="$emit('close')">
    <div class="dialog">
      <div class="dialog-image">
        <UploadImage
          @imglink="setUrl"
          :imglink="postParams.url"
          v-if="isDialogShow"
          :only-show="imgItem ? true : false"
        />
      </div>
      <input class="text" type="text" v-model="postParams.title" placeholder="这里输入图片标题" />
      <div class="summary">
        <el-input
          autosize
          show-word-limit
          maxlength="80"
          type="textarea"
          placeholder="请输入图片简介 不多于80字"
          v-model="postParams.summary"
        />
      </div>
      <div class="origin">
        是否原创:
        <el-switch
          v-model="postParams.isOrigin"
          inline-prompt
          active-text="是"
          inactive-text="否"
          :active-value="1"
          :inactive-value="0"
        />
      </div>
      <div class="tag">
        <p class="choose">选择板块</p>
        <el-select v-model="postParams.tag" class="m-2" placeholder="Select">
          <el-option v-for="(item, index) in 6" :key="item" :label="PicTag[index]" :value="index" />
        </el-select>
      </div>
      <div class="button-group">
        <ElButton type="danger" @click="$emit('close')">取消</ElButton>
        <ElButton type="success" @click="postImage">提交</ElButton>
      </div>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import { addPic } from '@/api/pic'
import { useUserStore } from '@/store/user'
import { ElMessage } from 'element-plus'
import { PicTag } from '@/interface/EnumExport'
const props = defineProps<{
  isDialogShow: boolean
  imgItem?: PicVo
}>()
const emit = defineEmits(['flushImage', 'close', 'changeImg'])
const currentUser = useUserStore()
const postParams = reactive<PicParams>({
  id: undefined,
  url: '',
  title: '',
  summary: '',
  isOrigin: 0,
  tag: 0
})
onMounted(() => {
  if (props.imgItem) {
    postParams.url = props.imgItem.url
    postParams.isOrigin = props.imgItem.origin
    postParams.id = props.imgItem.id
    postParams.summary = props.imgItem.summary
    postParams.tag = props.imgItem.tag
    postParams.title = props.imgItem.title
  }
})

const setUrl = (val: string) => {
  postParams.url = val
}
const postImage = async () => {
  if (postParams.summary.length <= 0 || postParams.summary.length > 80) {
    ElMessage.error('介绍应控制在0-80字哦~')
    return
  }
  if (postParams.title.length <= 0 || postParams.summary.length > 24) {
    ElMessage.error('标题要控制在0-24字哦~')
    return
  }
  if (!postParams.url) {
    ElMessage.error('请上传图片~')
    return
  }
  if (!currentUser.userinfo.id) {
    ElMessage.error('请登录后上传~')
    return
  }
  if (props.imgItem) {
    emit('close')
    emit('changeImg', postParams)
    return
  }
  await addPic(postParams)
  ElMessage.success('上传成功！')
  emit('close')
  postParams.summary = ''
  postParams.title = ''
  postParams.url = ''
  postParams.isOrigin = 0
  emit('flushImage')
}
</script>
<style lang="less" scoped>
.dialog {
  width: 100%;
  .font-normal();

  &-image {
    width: 100%;
  }

  .text {
    .textShadow(1px, 5px, rgba(255, 255, 255, 0.452));
    background-color: rgba(255, 255, 255, 0.014);
    height: 36px;
    border: none;
    outline: none;
    border-bottom: 1px @tipTextColor solid;
    width: 100%;
    font-size: 2rem;
    margin: @margin-general 0;
  }

  .summary {
    margin: @margin-general 0;
  }

  .origin {
    margin: @margin-general 0;
  }

  .tag {
    margin: @margin-general 0;
    display: flex;
    align-items: center;

    .choose {
      margin-right: 1.5rem;
    }
  }
}
</style>
