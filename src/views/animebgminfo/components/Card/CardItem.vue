<template>
  <div class="box">
    <div class="
        tw-w-2/5 md:tw-w-1/3 tw-h-full tw-flex-shrink-0 tw-rounded-l-3xl tw-overflow-hidden
      ">
      <MyElimage :img="item.images.large" :not-found-type="'3:4'" />
    </div>
    <div class="
        tw-ml-2
        tw-flex-1
        tw-justify-between
        tw-flex
        tw-flex-col
        tw-p-2
        tw-break-all
      ">
      <div>
        <!-- 标题 -->
        <div class="tw-flex tw-justify-between">
          <div>
            <p class="tw-font-bold tw-text-xl tw-block tw-mb-2 text-line-show-2">
              {{ item.name_cn ? item.name_cn : item.name }}
            </p>
            <p v-if="item.name_cn" class="tw-text-slate-400 text-line-show-2">
              {{ item.name }}
            </p>
          </div>
          <div class="tw-relative">
            <!-- 操作 更改想看在看等 -->
            <div ref="target" v-if="isStatusBoxShow" class="
                tw-absolute
                -tw-top-20
                tw-z-20
                md:-tw-top-16
                tw-right-0
                tw-flex
                tw-rounded-full
                tw-bg-white
                tw-p-3
                tw-drop-shadow-xl
              ">
              <ElTag effect="dark" v-for="(type, index) in tagType" :key="index" :type="type.mode"
                class="tw-m-1 tw-cursor-pointer hover:tw-bg-green-500">
                {{ type.text }}
              </ElTag>
            </div>
            <ElTag class="tw-cursor-pointer" effect="dark" :type="tagType[item.CollectionInfo.status.id - 1].mode"
              @click="isStatusBoxShow = !isStatusBoxShow">
              {{
                item.CollectionInfo.status.name
              }}
            </ElTag>
          </div>
        </div>
        <!-- 简介评分等 -->
        <div class="tw-mt-2">
          <p v-if="item.CollectionInfo.comment !== ''" class="tw-text-slate-600">
            <span class="tw-text-xl">“评:</span>
            <span class="tw-text-xs tw-text-indigo-500 tw-font-mono">
              {{ item.CollectionInfo.comment }}
            </span>
          </p>

          <div class="tw-flex tw-flex-wrap" v-if="item.CollectionInfo.tag">
            <ElTag
              v-for="name in item.CollectionInfo.tag.length > 3 ? item.CollectionInfo.tag.slice(0, 3) : item.CollectionInfo.tag"
              :key="name" class="tw-m-1">
              {{ name }}
            </ElTag>
          </div>
        </div>
      </div>
      <div>
        <p v-if="item.CollectionInfo.rating !== 0">
          我的评分:<span class="tw-text-xl tw-font-bold tw-text-orange-500">{{ item.CollectionInfo.rating }}/10</span>
        </p>
        <div class="tw-flex">
          <p>
            上次操作{{
              formatTime(item.CollectionInfo.lasttouch * 1000, "YYYY-MM-DD")
            }}
          </p>
          <span class="tw-text-blue-500 tw-cursor-pointer" @click="openForm"> 修改信息</span>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogVisable" title="修改番剧评价信息">
      <el-form :model="form" label-position="left" label-width="100px">
        <el-form-item label="当前状态">
          <el-select v-model="form.status" placeholder="选择状态">
            <el-option label="想看" value="wish" />
            <el-option label="在看" value="do" />
            <el-option label="看过" value="collect" />
            <el-option label="搁置" value="on_hold" />
            <el-option label="抛弃" value="dropped" />
          </el-select>
        </el-form-item>
        <el-form-item label="评分">
          <el-rate score-template="{value} 分" v-model="form.rating" show-score :max="10" :low-threshold="4"
            :high-threshold="7" :colors="['#767676', '#0EEB93', '#FF9900']" />
        </el-form-item>
        <TagChoose :choose-options="tagsOption" :choosed-tag="form.tags" :limit="10" />
        <el-form-item label="短评">
          <el-input v-model="form.comment" autocomplete="off" type="textarea" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisable = false">取消</el-button>
          <el-button type="primary" @click="submitChangeCollection">提交</el-button>
        </span>
      </template>
    </el-dialog>  </div>
</template>

<script setup lang="ts">
import { changeCollectionStatus, getSubjectInfoApi } from "@/api/bangumi";
import { getFormatTime } from "@/utils/dayjs";
import { PropType } from "@vue/runtime-core";
import { onClickOutside } from "@vueuse/core";
import { ElMessage } from "element-plus";

let dialogVisable = ref(false);
let isStatusBoxShow = ref(false);
const target = ref(null);
let tagsOption = ref<Bangumi.AnimeTag[]>([])
const props = defineProps({
  item: {
    type: Object as PropType<Bangumi.AnimeItemInfoCollection>,
    default: {},
  },
});
const emit = defineEmits(['changeItem'])
let form = reactive({
  status: props.item.CollectionInfo.status.type,
  comment: props.item.CollectionInfo.comment,
  rating: props.item.CollectionInfo.rating,
  tags: new Array(...props.item.CollectionInfo.tag)
})
let tagType: {
  mode: "" | "success" | "warning" | "info" | "danger";
  type: string;
  text: string;
}[] = [
    { mode: "", type: "1", text: "想看" }, //想看
    { mode: "success", type: "2", text: "看过" }, //在看
    { mode: "warning", type: "3", text: "在看" },
    { mode: "info", type: "4", text: "搁置" },
    { mode: "danger", type: "5", text: "抛弃" },
  ];
const formatTime = getFormatTime;
onClickOutside(target, () => (isStatusBoxShow.value = false));
const openForm = () => {
  dialogVisable.value = true;
  getSubjectInfoApi(props.item.id).then(({ data }) => {
    let item: Bangumi.SubjectInfoSmall = data;
    tagsOption.value = item.tags;
  })
}
// 提交表单
const submitChangeCollection = async () => {
  const { data } = await changeCollectionStatus(props.item.id, 'update', form.status, form.tags, form.comment, form.rating);
  ElMessage.success('修改成功');
  emit('changeItem', data, props.item.id);
  dialogVisable.value = false;
}
</script>


<style lang="less" scoped>
@media screen and (min-width: 320px) {
  .box {
    width: 90%;
    height: 24rem;
    padding-right: 10px;
    display: flex;
    flex-grow: 1;
    margin: 20px;
    border-radius: 40px;
    // overflow: hidden;
    background-color: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  }

  :deep(.el-dialog) {
    width: 95%;
  }
}

@media screen and (min-width: 1024px) {
  .box {
    width: 28rem;
    height: 240px;
  }

  :deep(.el-dialog) {
    width: 60%;
  }
}

@media screen and (min-width: 1440px) {
  .box {
    width: 400px;
    height: 280px;
  }
}
</style>