<template>
  <div class="
      card-main
      tw-mr-2 tw-mt-10
      hover:-tw-translate-y-5
      tw-transition-all tw-cursor-pointer
    " v-if="item" @click="$router.push(`/index/animedetail/${item.id}`)">
    <div class="card tw-relative">
      <div v-if="item.rank" class="
          round
          tw-absolute
          tw-top-0
          tw-right-0
          tw-z-50
          tw-bg-red-600
          tw-h-12
          tw-p-3
          tw-flex
          tw-items-center
        ">
        <p class="tw-text-2xl tw-font-bold tw-shrink-0 tw-text-orange-50">
          #{{ item.rank }}
        </p>
      </div>
      <el-image :src="item.imageUrl" fit="cover" style="width: 100%; height: 100%">
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
        <div class="tw-flex tw-flex-col tw-flex-1 tw-ml-2">
          <p class="
              tw-text-base tw-font-bold tw-text-red-500 tw-break-all
              text-line-show-2
              tw-flex-shrink-0
            ">
            {{ item.nameCn ? item.nameCn : item.name }}
          </p>
          <p class="tw-text-xs tw-text-slate-400 tw-leading-5">
            {{ item.infoTip }}
          </p>
        </div>
      </div>
      <div class="raiting tw-flex tw-items-center tw-justify-between tw-p-1">
        <small class="tw-flex-shrink-0">{{
            item.count && item.count > 10 ? item.count : "少于10"
        }}人评分</small>
        <el-rate v-if="item.score" v-model="score" disabled size="small" show-score text-color="#ff9900"
          :score-template="item.score.toString()" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import Loading from "@/assets/img/loading.gif";

const props = defineProps({
  item: {
    type: Object as PropType<Bangumi.BroswerResult>,
    default: {},
  },
});

const score = computed(() => {
  return props.item.score ? props.item.score / 2 : 0;
});
</script>


<style lang="less" scoped>
@media screen and (min-width: 320px) {
  .round {
    border-radius: 0 0.6rem 0 1.5rem;
  }

  .card-main {
    height: 24rem;
    width: 48%;
    border-radius: 0.6rem 0.6rem 0 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    background-color: rgb(255, 255, 255);
  }

  .title-part {
    flex: 1;
    max-height: 7rem;
    overflow: hidden;
  }

  :deep(.el-rate__item) {
    width: 10px;
  }

  :deep(.el-rate) {
    display: flex;
    align-items: center;
    flex: 1;
    justify-content: space-between;
  }
}

@media screen and (min-width: 768px) {
  :deep(.el-rate) {
    flex-grow: 0;
    flex-basis: auto;
    width: 40%;
  }
}

@media screen and (min-width: 1024px) {
  .card-main {
    height: 24rem;
    width: 30%;
  }

  :deep(.el-rate) {
    width: auto;
  }
}

@media screen and (min-width: 1600px) {
  .card-main {
    height: 22rem;
    width: 14rem;
  }

  .title-part {
    flex: 1;
    max-height: 5.5rem;
    overflow: hidden;
  }

  :deep(.el-rate__item) {
    width: 16px;
  }
}

.card {
  width: 100%;
  height: 14rem;
}

:deep(.el-rate--small) {
  height: 16px;
}
</style>