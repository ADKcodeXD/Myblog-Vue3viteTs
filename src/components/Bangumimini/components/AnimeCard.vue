<template>
  <div class="anime-card" v-if="animeInfo">
    <el-row :gutter="10" :span="6">
      <el-card
        @mouseenter="detailInfoShow = true"
        class="card"
        :body-style="{ padding: '0px' }"
      >
        <el-image :src="animeInfo.images.large" fit="cover" class="elimg">
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
                  <img
                    class="tw-w-fill tw-h-fill"
                    src="@/assets/img/404img.jpg"
                  />
                </div>
          </template>
        </el-image>
        <div class="info">
          <div class="top">
            <div class="rating">
              <p class="man" v-if="animeInfo.collection">
                {{ animeInfo.collection.doing }}人在看
              </p>
              <p>
                bgm排名:<span class="rank">{{
                  animeInfo.rank ? animeInfo.rank : "暂无数据"
                }}</span>
              </p>
            </div>
            <p class="title text-line-show-2" :alt="animeInfo.name">
              作品名:{{ animeInfo.name }}
            </p>
            <p v-if="animeInfo.name_cn" class="title-cn text-line-show-2">
              中文译名:{{ animeInfo.name_cn }}
            </p>
          </div>
          <div class="bottom">
            <p>开播日期:{{ animeInfo.air_date }}</p>
            <div class="rating-count">
              <p>
                综合评分:<span class="rank">{{
                  animeInfo.rating && animeInfo.rating.score
                }}</span>
              </p>
              <p>评分人数:{{ animeInfo.rating && animeInfo.rating.total }}</p>
            </div>
          </div>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script lang="ts">
import { AnimeItemInfo } from "@/interface/bangumiApi.type";
import { defineComponent, PropType } from "vue";
import Loading from "@/assets/img/loading.gif";
export default defineComponent({
  props: {
    animeInfo: {
      type: Object as PropType<AnimeItemInfo>,
      default: {},
    },
  },
  setup(props) {
    let detailInfoShow = ref(false);
    return {
      Loading,
      detailInfoShow,
    };
  },
});
</script>


<style lang="less" scoped>
@media screen and (min-width: 320px) and (max-width: 1440px) {
  .anime-card {
    margin-right: 1rem;
    margin-top: 1rem;
    width: 47%;
    cursor: pointer;
  }
  .card {
    width: 100%;
    .elimg {
      width: 100%;
      height: 25rem;
    }

    .info {
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 15rem;
      .top {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        font-size: 0.75rem;
        .title {
          margin-top: 5px;
          font-size: 1rem;
          color: rgb(0, 126, 78);
        }
        .rating {
          display: flex;
          justify-content: space-between;
          .rank {
            color: rgb(255, 90, 40);
          }
          .man {
            margin-bottom: 5px;
          }
        }
      }
      .bottom {
        font-size: 0.8rem;
        margin-top: 5px;
        .rating-count {
          .rank {
            color: rgb(255, 90, 40);
          }
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .img {
      width: 30rem;
      height: 30rem;
    }
    .gray {
      width: 100%;
      height: 100%;
      background-color: rgb(73, 72, 71);
      display: flex;
      flex-direction: column;
      color: rgb(@primaryActiveTextColor);
      justify-content: center;
      align-items: center;
    }
  }
}
@media screen and (min-width: 1440px) {
  .anime-card {
    margin-right: 1rem;
    cursor: pointer;
    &:hover {
      :deep(.el-card) {
        transform: translateY(-5px);
        background-color: rgb(255, 251, 234);
      }
    }
  }
  .card {
    position: relative;
    .elimg {
      width: 18rem;
      height: 18rem;
    }
    .info {
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 12rem;
      .top {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        font-size: 0.75rem;
        .title {
          margin-top: 5px;
          font-size: 1rem;
          color: rgb(0, 126, 78);
        }
        .rating {
          display: flex;
          justify-content: space-between;
          .rank {
            color: rgb(255, 90, 40);
          }
          .man {
            margin-bottom: 5px;
          }
        }
      }
      .bottom {
        font-size: 0.8rem;
        margin-top: 5px;
        .rating-count {
          .rank {
            color: rgb(255, 90, 40);
          }
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .img {
      width: 30rem;
      height: 30rem;
    }
    .gray {
      width: 100%;
      height: 100%;
      background-color: rgb(73, 72, 71);
      display: flex;
      flex-direction: column;
      color: rgb(@primaryActiveTextColor);
      justify-content: center;
      align-items: center;
    }
  }
}
</style>