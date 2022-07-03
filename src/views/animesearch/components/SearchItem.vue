<template>
  <div
    class="box tw-flex tw-mt-3 tw-p-3 tw-border-2 hover:tw-bg-red-200 tw-cursor-pointer"
    @click="$router.push(`/index/animedetail/${item.id}`)"
  >
    <div
      class="tag-type"
      :class="{
        bluebg: item.type === 1,
        pinkbg: item.type === 2,
        greenbg: item.type === 3,
        brownbg: item.type === 6,
        orangebg: item.type === 4
      }"
    >
      {{ type }}
    </div>
    <div class="img tw-flex-shrink-0 tw-w-48 tw-h-48 tw-ml-3">
      <MyElimage
        :img="item.images.medium ? item.images.medium : item.images[0]"
        v-if="item.images"
      />
      <MyElimage v-else />
    </div>
    <div class="info tw-ml-3 tw-flex tw-flex-col tw-justify-between tw-w-full">
      <section>
        <section class="tw-flex tw-justify-between md:tw-flex-row tw-flex-col tw-w-full">
          <p class="tw-text-2xl tw-font-bold tw-text-slate-700 tw-break-all">
            {{ item.name_cn ? item.name_cn : item.name }}
          </p>
          <p v-if="item.rank" class="tw-text-xl tw-text-red-600">综合排名: #{{ item.rank }}</p>
        </section>

        <p class="tw-text-sm tw-font-thin tw-text-slate-700" v-if="item.name_cn">
          {{ item.name }}
        </p>
        <p class="tw-text-sm tw-text-slate-800 text-line-show-3" v-if="item.name_cn">
          {{ item.summary }}
        </p>
      </section>
      <section class="tw-flex tw-justify-between">
        <p class="tw-mr-6">开播or发售日期:{{ item.air_date }}</p>
        <p v-if="item.rating">评分:{{ item.rating.score }}</p>
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { BangumiType } from '@/interface/EnumExport';
const props = defineProps({
  item: {
    type: Object as PropType<Bangumi.AnimeItemInfo>,
    default: () => {
      return {};
    }
  }
});

let type = computed(() => {
  var reg = /[a-zA-Z]/g;
  for (let key in BangumiType) {
    if (props.item.type == parseInt(BangumiType[key])) {
      return key.replace(reg, '');
    }
  }
});
</script>

<style lang="less" scoped>
.info {
  p {
    margin-top: 3px;
  }
}

.tag-type {
  display: flex;
  color: white;
  width: 2rem;
  height: auto;
  align-items: center;
  justify-content: center;
  line-height: 20px;
  padding: 5px;
  text-align: center;
}

.bluebg {
  background-color: rgb(10, 132, 180);
}

.pinkbg {
  background-color: rgb(221, 16, 187);
}

.greenbg {
  background-color: rgb(14, 180, 23);
}

.brownbg {
  background-color: rgb(116, 59, 6);
}

.orangebg {
  background-color: rgb(202, 73, 22);
}
</style>
