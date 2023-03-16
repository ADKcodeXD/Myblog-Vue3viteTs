<template>
  <div class="container">
    <div class="imgcontainer" v-if="animeDetail.images">
      <MyElimage :img="animeDetail.images.large" :notFoundType="'3:4'" />
    </div>
    <div class="title-info" v-if="animeDetail">
      <div class="title-info-first">
        <h1 class="title--big">
          {{ animeDetail.name_cn ? animeDetail.name_cn : animeDetail.name }}
          <p class="tag">
            {{ ratingTag }}
          </p>
        </h1>
        <small v-if="animeDetail.name_cn" class="title--small">原名:{{ animeDetail.name }}</small>
      </div>
      <div class="title-info-second">
        <p>开播日期:{{ animeDetail.air_date }}</p>
        <p>放送日:{{ day }}</p>
        <p>类型:{{ type }}</p>
        <p>导演:{{ director }}</p>
        <p v-if="animeDetail.eps_count">
          总集数:{{ animeDetail.eps_count ? animeDetail.eps_count : animeDetail.eps.length }}
        </p>
      </div>
      <div class="title-info-third">
        <div class="rating" v-if="animeDetail.rating">
          <small class="desc">评分</small>
          <p class="score">
            {{ animeDetail.rating.score ? animeDetail.rating.score : '暂无数据' }}/10.0
          </p>
        </div>
        <div class="rating rank">
          <small class="desc">排名</small>
          <p class="score">
            {{ animeDetail.rank ? animeDetail.rank : '暂无数据' }}
          </p>
        </div>
        <div class="rating miru">
          <small class="desc">{{ mostPeople.type }}</small>
          <p class="score">
            {{ mostPeople.nums }}
          </p>
        </div>
      </div>
    </div>
    <ElEmpty v-else />
    <div class="title-info-third--mobile">
      <div class="rating" v-if="animeDetail.rating">
        <small class="desc">评分</small>
        <p class="score">
          {{ animeDetail.rating.score ? animeDetail.rating.score : '暂无数据' }}/10.0
        </p>
      </div>
      <div class="rating rank">
        <small class="desc">排名</small>
        <p class="score">
          {{ animeDetail.rank ? animeDetail.rank : '暂无数据' }}
        </p>
      </div>
      <div class="rating miru">
        <small class="desc">{{ mostPeople.type }}</small>
        <p class="score">
          {{ mostPeople.nums }}
        </p>
      </div>
    </div>
    <div class="follow-bangumi" :class="{ followed: isFollow }" @click="followBangumi">
      <i class="iconfont" :class="isFollow ? 'icon-star' : 'icon-changyonggongneng'"></i>
      <p v-if="!isFollow">点击追番</p>
      <p v-else>已追番</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { WeekDayType, BangumiType, CollectionType } from '@/interface/EnumExport'
import { useRatingTag } from '@/hooks/Bangumi'
import { ElMessageBox } from 'element-plus'
const props = defineProps({
  animeDetail: {
    type: Object as PropType<Bangumi.AnimeDeatilItem>,
    default: () => {
      return {}
    }
  },
  isFollow: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['follow', 'unFollow'])
const director = computed(() => {
  if (props.animeDetail.staff) {
    let a = props.animeDetail.staff.find(item => {
      return item.jobs.find(item => {
        return item == '导演' || item == '监督'
      })
    })
    if (a) {
      return a.name_cn ? a.name_cn : a.name
    }
  } else {
    return '未知'
  }
})
const type = computed(() => {
  for (let i in BangumiType) {
    if (props.animeDetail.type === parseInt(BangumiType[i])) {
      return i
    }
  }
})
const day = computed(() => {
  if (props.animeDetail.air_weekday) {
    for (let i in WeekDayType) {
      if (props.animeDetail.air_weekday === parseInt(WeekDayType[i])) {
        return i
      }
    }
  }
})
const mostPeople = computed(() => {
  let obj = { type: '', nums: 0 }
  if (props.animeDetail.collection) {
    for (let i in props.animeDetail.collection) {
      if (props.animeDetail.collection[i] > obj.nums) {
        obj.type = CollectionType[i]
        obj.nums = props.animeDetail.collection[i]
      }
    }
  }
  return obj
})
const { ratingTag } = useRatingTag(props.animeDetail?.rating?.score || 0)
const followBangumi = () => {
  if (!props.isFollow) {
    emit('follow')
  } else {
    ElMessageBox.confirm(
      '你确定要取消追番吗，会清除掉所有进度哦(不想追番可以将其设置为抛弃或者看过)?',
      'Warning',
      {
        confirmButtonText: '确定',
        cancelButtonText: '不取消了',
        type: 'warning'
      }
    ).then(() => {
      emit('unFollow')
    })
  }
}
</script>

<style lang="less" scoped>
@import url(../../styles/AnimeDetailHeader.less);
</style>
