<template>
  <div class="anime-card" v-if="animeInfo" @mouseenter="requestInfo" @mouseleave="detailInfoShow = false">
    <div class="card">
      <el-image :src="animeInfo.images && animeInfo.images.large" fit="cover" class="elimg"
        @click="$router.push(`/index/animedetail/${animeInfo.id}`)">
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
                        animeInfo.rank ? animeInfo.rank : "暂无数据"
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
                <p class="tw-text-red-500">评分:{{ animeInfo.rating.score ? animeInfo.rating.score : '暂无评分'
                }}&nbsp;<span>({{ animeInfo.rating.total
}}人参加评分)</span></p>
                <div class="tw-flex tw-justify-between tw-items-end tw-flex-wrap">
                  <div class="tw-flex tw-items-center tw-flex-shrink-0">
                    相关tag:
                    <ElTag v-for="tag in tagsInfoThree" effect="dark" class="tw-m-1">
                      {{ tag.name }}
                    </ElTag>
                  </div>
                  <div class="tw-text-blue-500 tw-cursor-pointer tw-underline tw-font-bold tw-text-xl tw-flex-shrink-0"
                    @click="$router.push(`/index/animedetail/${animeInfo.id}`)">
                    查看更多
                  </div>
                </div>

              </div>
            </div>
            <LoadingAnime v-else />
          </transition>
        </div>
      </transition>
      <div class="info" >
        <p class="title text-line-show-2" :alt="animeInfo.name">
          {{ animeInfo.name_cn ? animeInfo.name_cn : animeInfo.name }}
        </p>
        <div class="rating">
          <p class="man" v-if="animeInfo.collection">
            {{ animeInfo.collection.doing }}人在看
          </p>
          <p>
            #<span class="rank">{{
                animeInfo.rank ? animeInfo.rank : "暂无数据"
            }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getSubjectInfoApi } from "@/api/bangumi";
import { useAnime } from "@/hooks/Anime";
import { PropType } from "vue";
const props = defineProps({
  animeInfo: {
    type: Object as PropType<Bangumi.AnimeItemInfo>,
    default: {},
  },
});
const {
  infoXenter,
  infoXleave,
} = useAnime();
let detailInfoShow = ref(false);
let animeDetailData = ref<null | Bangumi.SubjectInfoSmall>();
const getSubjectInfo = async (id: number) => {
  const { data } = await getSubjectInfoApi(id);
  animeDetailData.value = data;
}
const requestInfo = async () => {
  detailInfoShow.value = true;
  if (!animeDetailData.value) {
    getSubjectInfo(props.animeInfo.id);
  } else {
    return;
  }
}
const tagsInfoThree = computed(() => {
  let tags = [];
  if (animeDetailData.value && animeDetailData.value.tags.length > 3) {
    for (let i = 0; i < 3; i++) {
      tags.push(animeDetailData.value.tags[i]);
    }
  } else {
    return animeDetailData.value.tags;
  }
  return tags;
});
</script>


<style lang="less" scoped>
@media screen and (min-width: 320px) {
  .anime-card {
    margin-right: 1rem;
    margin-top: 1rem;
    height: 30rem;
    width: 98%;
    border-radius: 20px;
    overflow: hidden;
    border: 3px solid rgb(255, 87, 115);
    background-color: white;

    &:hover {
      .elimg {
        width: 0%;
        height: 100%;
      }
      .info{
        opacity: 0;
        color: rgb(255, 255, 255);
      }
      .info-detail{
        opacity: 1;
      }
    }
  }
  // 容器
  .card {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    transition: all 0.5s ease;
    position: relative;
    font-family: 'Thinfont', '幼圆';
    font-weight: 600;
    .elimg {
      width: 100%;
      height: 70%;
      flex-shrink: 0;
      transition: all 0.5s ease;
    }

    .title {
      font-size: 1.4rem;
    }

    .info {
      padding: 10px;
      flex: 1;
      width: 100%;
      height: 30%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: all 1s ease;

      .rating {
        display: flex;
        justify-content: space-between;
      }
      .rank {
        color: rgb(0, 60, 255);
      }
    }
    .info-detail-container{
      width:100%
    }
    .info-detail {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: rgb(0, 0, 0);
      height: 100%;
      opacity: 0;
      .hanyaku {
        font-family: '黑体';
      }

      .desc {
        .text-line-show(8);
        margin-bottom: 0.3rem;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .anime-card {
    height: 34rem;
    &:hover {
      width: 98%;
      background-color: rgb(255, 255, 255);
      .elimg {
        cursor: pointer;
        width: 40%;
        height: 100%;
      }
      .info{
        opacity: 0;
      }
      .info-detail{
        opacity: 1;
      }
    }
  }
  .card .info-detail-container{
      width:60%
  }
}

@media screen and (min-width: 1280px) {
  .anime-card {
    margin-right: 1rem;
    height: 26rem;
    width: 20rem;
    flex-shrink: 0;
    transition: all 0.5s ease;

    &:hover {
      width: 50rem;
      background-color: rgb(255, 255, 255);
    }
  }

  .card {
    .elimg {
      width: 100%;
    }
  }
}
</style>