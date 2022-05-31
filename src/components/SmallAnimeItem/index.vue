<template>
  <div
    class="card-little tw-flex tw-mb-2 tw-cursor-pointer tw-p-3 hover:tw-bg-blue-100"
    @click="$router.push(`/index/animedetail/${item.id}`)"
  >
    <div class="img tw-w-2/5 tw-flex-shrink-0 tw-h-40">
      <MyElimage :img="item.images.medium" :not-found-type="'3:4'" />
    </div>
    <div class="info tw-ml-2 tw-flex tw-flex-col tw-justify-between">
      <div>
        <p class="tw-font-extrabold tw-text-amber-900">
          {{ item.name_cn ? item.name_cn : item.name }}
        </p>
        <p class="tw-text-sm tw-text-gray-400">
          综合评分{{ item.rating.score }}
        </p>
      </div>

      <p >{{ item.collection.doing }}人在看</p>
    </div>
  </div>
</template>

<script lang="ts">
import { AnimeItemInfo } from "@/interface/bangumiApi.type";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    item: {
      type: Object as PropType<AnimeItemInfo>,
      default: {},
    },
  },
});
</script>