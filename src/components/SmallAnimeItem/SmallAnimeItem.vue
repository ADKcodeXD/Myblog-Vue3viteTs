<template>
  <router-link class="card-little" v-if="myItem.id" :to="`/index/animedetail/${myItem.id}`">
    <div class="card-little-img tw-w-2/5">
      <MyElimage :img="myItem.images.common || ''" :not-found-type="'3:4'" />
    </div>
    <div class="card-little-info">
      <div>
        <p class="card-little-info__title">
          {{ myItem.name_cn ? myItem.name_cn : myItem.name }}
        </p>
        <p class="card-little-info__tip">
          综合评分{{ myItem.rating.score }}({{ myItem.rating.total }}条评价)
        </p>
      </div>
      <div>
        <p class="card-little-info__rank">排名:{{ myItem.rank }}</p>
        <p class="card-little-info__miru" v-if="myItem.collection?.doing">
          {{ myItem.collection.doing }}人在看
        </p>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

const props = defineProps({
  item: {
    type: Object as PropType<Bangumi.AnimeItemInfo>,
    default: () => {
      return {}
    }
  },
  broswerItem: {
    type: Object as PropType<Bangumi.BroswerResult>,
    default: () => {
      return {}
    }
  }
})
const myItem = reactive<any>({})
onMounted(() => {
  if (props.item.id) {
    for (let i in props.item) {
      myItem[i] = props.item[i]
    }
  } else if (props.broswerItem) {
    myItem.images = {}
    myItem.images.common = props.broswerItem.imageUrl
    myItem.name_cn = props.broswerItem.nameCn
    myItem.name = props.broswerItem.name
    myItem.rating = { total: 0, score: 0, count: null }
    myItem.rating.score = props.broswerItem.score
    myItem.rating.total = props.broswerItem.count
    myItem.rank = props.broswerItem.rank
    myItem.id = props.broswerItem.id
  }
})
</script>

<style lang="less" scoped>
@import url(./styles/SmallAnimeItem.less);
</style>
