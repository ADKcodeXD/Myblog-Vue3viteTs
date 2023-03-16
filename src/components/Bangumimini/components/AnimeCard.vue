<template>
  <div
    class="anime-card"
    ref="nowcard"
    v-if="animeInfo"
    @mouseenter="requestInfo"
    @mouseleave="detailInfoShow = false"
  >
    <div class="card">
      <el-image :src="animeInfo.images && animeInfo.images.large" fit="cover" class="elimg">
        <template #placeholder>
          <div class="tw-w-full tw-h-full tw-bg-white">
            <LoadingAnime />
          </div>
        </template>
        <template #error>
          <div class="tw-w-fill">
            <img class="tw-w-fill tw-h-fill" src="@/assets/img/404img.jpg" />
          </div>
        </template>
      </el-image>
      <transition @enter="infoXenter" @leave="infoXleave">
        <div v-if="detailInfoShow" class="info-detail-container">
          <transition @enter="infoXenter" @leave="infoXleave">
            <div v-if="animeDetailData" class="info-detail">
              <div :key="1" :data-index="0">
                <div class="tw-flex tw-justify-between">
                  <p class="title text-line-show-2">
                    {{ animeInfo.name_cn ? animeInfo.name_cn : animeInfo.name }}
                  </p>
                  <p class="tw-shrink-0">
                    排名:<span class="rank tw-text-blue-600">{{
                      animeInfo.rank ? animeInfo.rank : '暂无数据'
                    }}</span>
                  </p>
                </div>
                <p class="hanyaku text-line-show-2" v-if="animeInfo.name_cn">
                  {{ animeInfo.name }}
                </p>
                <p>开播日期:{{ animeInfo.air_date }}</p>
              </div>
              <p class="desc" :key="2" :data-index="1">简介:{{ animeDetailData.summary }}</p>
              <div :key="3" :data-index="2">
                <p class="tw-mt-1">总集数:{{ animeDetailData.eps }}</p>
                <p class="tw-text-red-500" v-if="animeInfo.rating">
                  评分:{{ animeInfo.rating.score ? animeInfo.rating.score : '暂无评分' }}&nbsp;<span
                    >({{ animeInfo.rating.total }}人参加评分)</span
                  >
                </p>
                <div class="tw-flex tw-justify-between tw-items-end tw-flex-wrap">
                  <div class="tw-flex tw-items-center tw-flex-shrink-0">
                    相关tag:
                    <ElTag v-for="tag in tagsInfoThree" :key="tag.id" effect="dark" class="tw-m-1">
                      {{ tag.name }}
                    </ElTag>
                  </div>
                  <router-link
                    class="tw-cursor-pointer tw-underline tw-font-bold tw-text-xl tw-flex-shrink-0"
                    :to="`/index/animedetail/${animeInfo.id}`"
                  >
                    查看更多
                  </router-link>
                </div>
              </div>
            </div>
            <LoadingAnime v-else />
          </transition>
        </div>
      </transition>
      <div class="info">
        <p class="title text-line-show-2" :alt="animeInfo.name">
          {{ animeInfo.name_cn ? animeInfo.name_cn : animeInfo.name }}
        </p>
        <div class="rating">
          <p class="man" v-if="animeInfo.collection">{{ animeInfo.collection.doing }}人在看</p>
          <p>
            #<span class="rank">{{ animeInfo.rank ? animeInfo.rank : '暂无数据' }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getSubjectInfoApi } from '@/api/bangumi'
import { useAnime } from '@/hooks/Anime'
import { PropType } from 'vue'
const props = defineProps({
  animeInfo: {
    type: Object as PropType<Bangumi.AnimeItemInfo>,
    default: () => {
      return {}
    }
  }
})
const emit = defineEmits(['scrollLeft'])
const { infoXenter, infoXleave } = useAnime()
const detailInfoShow = ref(false)
const animeDetailData = ref<null | Bangumi.SubjectInfoSmall>()
const nowcard = ref<HTMLElement>()
const getSubjectInfo = async (id: number) => {
  const { data } = await getSubjectInfoApi(id)
  animeDetailData.value = data.data
}
const requestInfo = async () => {
  detailInfoShow.value = true
  emit('scrollLeft', nowcard.value.offsetWidth)
  if (!animeDetailData.value) {
    getSubjectInfo(props.animeInfo.id)
  } else {
    return
  }
}
const tagsInfoThree = computed(() => {
  let tags = []
  if (animeDetailData.value && animeDetailData.value.tags.length > 3) {
    for (let i = 0; i < 3; i++) {
      tags.push(animeDetailData.value.tags[i])
    }
  } else {
    return animeDetailData.value.tags
  }
  return tags
})
</script>

<style lang="less" scoped>
@import url(../styles/AnimeCard.less);
</style>
