<template>
  <div
    class="
      card-main
      tw-mr-5 tw-mt-10
      hover:-tw-translate-y-5
      tw-transition-all tw-cursor-pointer
    "
    v-if="item"
  >
    <div class="card">
      <el-image
        :src="item.imageUrl"
        fit="cover"
        style="width: 100%; height: 100%"
      >
        <template #placeholder>
          <div class="gray">
            <el-image :src="Loading">
              <template #placeholder>
                <p>正在努力加载</p>
              </template>
            </el-image>
            <span>图片努力加载中~</span>
          </div>
        </template>
        <template #error>
          <div class="tw-w-fill">
            <img class="tw-w-fill tw-h-fill" src="@/assets/img/404img.jpg" />
          </div>
        </template>
      </el-image>
    </div>
    <div class="tw-p-1 tw-flex tw-flex-col tw-justify-between tw-flex-1">
      <div class="title-part tw-flex">
        <div>
          <p class="tw-text-2xl tw-font-bold tw-shrink-0 tw-text-orange-500">
            #{{ item.rank }}
          </p>
          <span></span>
        </div>
        <div class="tw-flex tw-flex-col tw-flex-1 tw-ml-2">
          <p
            class="
              tw-text-base tw-font-bold tw-text-red-500 tw-break-all
              text-line-show-2
              tw-flex-shrink-0
            "
          >
            {{ item.nameCn ? item.nameCn : item.name }}
          </p>
          <p class="tw-text-xs tw-text-slate-400 ">{{ item.infoTip }}</p>
        </div>
      </div>
      <div class="raiting tw-flex tw-items-center tw-justify-between tw-p-1">
        <small
          >{{
            item.count && item.count > 10 ? item.count : "少于10"
          }}人评分</small
        >
        <el-rate
          v-if="item.score"
          v-model="score"
          disabled
          size="small"
          show-score
          text-color="#ff9900"
          :score-template="item.score.toString()"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { BroswerResult } from "@/interface/bangumiApi.type";
import { defineComponent, PropType } from "vue";
import Loading from "@/assets/img/loading.gif";

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<BroswerResult>,
      default: {},
    },
  },
  setup(props) {
    const score = computed(() => {
      return props.item.score ? props.item.score / 2 : 0;
    });
    return { Loading, score };
  },
});
</script>


<style lang="less" scoped>
.card-main {
  height: 22rem;
  width: 15rem;
  border-radius: 0.6rem 0.6rem 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  background-color: rgb(255, 255, 255);
}
.card {
  width: 100%;
  height: 14rem;
}
.title-part{
    max-height: 5.5714rem;
    overflow: hidden;
}
:deep(.el-rate__item) {
  width: 18px;
}
:deep(.el-rate--small) {
  height: 16px;
}
</style>