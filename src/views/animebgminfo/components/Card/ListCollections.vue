<template>
  <div v-if="list.length > 0" class="tw-flex tw-flex-wrap tw-bg-white">
    <CardItem v-for="item in list" :item="item" :key="item.id" @change-item="updateItem" />  </div>
</template>

<script setup lang="ts">
import { AnimeItemInfoCollection } from "@/interface/bangumiApi.type";
import { CollectionTypeTwo } from "@/interface/BangumiEnum";
import { PropType } from "@vue/runtime-core";
import CardItem from "./CardItem.vue";

const props = defineProps({
  list: {
    type: Object as PropType<AnimeItemInfoCollection[]>,
    default: [],
  },
});
const updateItem = async (data: any, subject_id: number) => {
  let item = props.list.find(item => item.id === subject_id);
  for (let key in item.CollectionInfo) {
    item.CollectionInfo[key] = data[key]
  }
  let type=item.CollectionInfo.status.type;
  item.CollectionInfo.status.name=CollectionTypeTwo[type];
  
}
</script>
