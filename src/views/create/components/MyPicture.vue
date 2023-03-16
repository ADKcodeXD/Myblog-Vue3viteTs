<template>
  <div class="pic-list">
    <el-table :data="imgs" class="table" border stripe>
      <el-table-column label="预览">
        <template #default="scope">
          <div class="img">
            <MyElimage :img="scope.row.url" :zip="2" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template #default="scope">
          <p class="title">{{ scope.row.title }}</p>
        </template>
      </el-table-column>
      <el-table-column label="简介">
        <template #default="scope">
          <p class="summary">{{ scope.row.summary }}</p>
        </template>
      </el-table-column>
      <el-table-column label="板块">
        <template #header>
          <div style="height: 80px">
            <p style="margin-bottom: 5px">按板块筛选</p>
            <el-select v-model="pageParams.tag" placeholder="选择板块">
              <el-option
                v-for="(item, index) in 6"
                :key="item"
                :label="PicTag[index]"
                :value="index"
              />
            </el-select>
          </div>
        </template>
        <template #default="scope">
          <ElTag type="" effect="dark">
            {{ PicTag[scope.row.tag] }}
          </ElTag>
        </template>
      </el-table-column>
      <el-table-column label="原创">
        <template #header>
          选择所有原创
          <el-switch
            v-model="pageParams.isOrigin"
            inline-prompt
            active-text="是"
            inactive-text="否"
            :active-value="1"
            :inactive-value="0"
          />
        </template>
        <template #default="scope">
          <ElTag type="success" effect="dark" v-if="scope.row.origin === 1"> 原创 </ElTag>
          <ElTag type="info" effect="dark" v-else> 非原创 </ElTag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button effect="dark" @click="open(scope.row)">编辑</el-button>
          <el-button effect="dark" type="danger" @click="deleteItem(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <MyPagination :pageParams="pageParams" :total="total" />
    <PostImg
      :isDialogShow="isDialogShow"
      v-if="isDialogShow"
      @close="isDialogShow = false"
      :imgItem="activeItem"
      @changeImg="changeImg"
    />
  </div>
</template>
<script setup lang="ts">
import { deleteMyPic, getMyPic, updateMyPic } from '@/api/pic'
import { PicTag } from '@/interface/EnumExport'
import { ElMessage, ElMessageBox } from 'element-plus'
import PostImg from '../../picture/components/PostImg.vue'
const pageParams = reactive<PageParams>({
  page: 1,
  pagesize: 10,
  isOrigin: 0
})
const imgs = ref<PicVo[]>()
const total = ref(0)
const activeItem = ref<PicVo>()
const getPicsFn = async () => {
  const { data } = await getMyPic(pageParams)
  imgs.value = data.data.results
  total.value = data.data.length
}
const deleteItem = async (id: string) => {
  ElMessageBox.confirm('删除图片后将无法恢复！', '删除图片', {
    confirmButtonText: '我要删除',
    cancelButtonText: '取消',
    type: 'error'
  }).then(async () => {
    await deleteMyPic(id)
    ElMessage.success('删除成功')
    getPicsFn()
  })
}
const changeImg = async (param: PicParams) => {
  await updateMyPic(param)
  ElMessage.success('修改成功')
  getPicsFn()
}
const isDialogShow = ref(false)
const open = (item: PicVo) => {
  activeItem.value = item
  isDialogShow.value = true
}
watchEffect(() => {
  getPicsFn()
})
</script>
<style lang="less" scoped>
.table {
  width: 100%;
  :deep(.el-table) {
    thead {
      height: 100px;
    }
  }
  .img {
    width: 100%;
    min-height: 5rem;
    max-height: 20rem;
  }

  .title {
    color: @textColor;
    .text-line-show(2);
  }
}
</style>
