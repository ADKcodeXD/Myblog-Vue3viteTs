<template>
  <div class="main tw-bg-slate-500 tw-w-full tw-mt-5 tw-p-3" v-if="animeDetail">
    <!-- 简介 -->
    <div class="desc">
      <p class="tw-text-white tw-font-bold tw-text-3xl">简介</p>
      <p class="tw-text-xs tw-leading-6 tw-text-white tw-mt-10 md:tw-text-2xl">
        {{ animeDetail.summary }}
      </p>
    </div>
    <div class="tw-my-5" v-if="sites.length > 0">
      <p class="tw-font-bold tw-text-2xl tw-text-slate-50">播放源</p>
      <div v-if="cnSite.length > 0">
        <div class="tw-font-bold tw-text-xl tw-text-slate-50 tw-mt-2">
          简中播放源
        </div>
        <div class="tw-flex tw-flex-wrap">
          <div
            class="playsource"
            :class="site.site"
            v-for="(site, index) in cnSite"
            :key="index"
            @click="openUrl(site.url)"
          >
            <i
              class="iconfont tw-text-white tw-mr-2"
              :class="{
                'icon-acfun': site.site === 'acfun',
                'icon-iqiyi': site.site === 'iqiyi',
                'icon-leshi': site.site === 'letv',
                'icon-PPTV': site.site === 'pptv',
                'icon-mangguoTV': site.site === 'mgtv',
                'icon-bilibili-line': site.site === 'bilibili',
                'icon-sohu': site.site === 'sohu',
                'icon-tengxunshipin': site.site === 'qq',
                'icon-youku1193430easyiconnet': site.site === 'youku',
              }"
            ></i>
            <p class="tw-text-center tw-font-bold tw-text-white">
              {{ site.title }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="twHkSite.length > 0">
        <div class="tw-font-bold tw-text-xl tw-text-slate-50 tw-mt-2">
          繁中播放源
        </div>
        <div class="tw-flex">
          <div
            class="playsource"
            v-for="(site, index) in twHkSite"
            :key="index"
            @click="openUrl(site.url)"
          >
            <i
              class="iconfont tw-text-white tw-mr-2"
              :class="{
                'icon-bilibili': site.site === 'bilibili_hk_mo_tw',
                'icon-icon_post_gamer': site.site === 'gamer',
                'icon-pc-dongman': site.site === 'muse_hk',
              }"
            ></i>
            <p class="tw-text-center tw-font-bold tw-text-white">
              {{ site.title }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="jpSite.length > 0">
        <div class="tw-font-bold tw-text-xl tw-text-slate-50 tw-mt-2">
          日语播放源
        </div>
        <div class="tw-flex">
          <div
            class="playsource"
            v-for="(site, index) in jpSite"
            :key="index"
            @click="openUrl(site.url)"
          >
            <i
              class="iconfont tw-text-white tw-mr-2"
              :class="{ 'icon-niconico': site.title === 'Niconico' }"
            ></i>
            <p class="tw-text-center tw-font-bold tw-text-white">
              {{ site.title }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="otherSite.length > 0">
        <div class="tw-font-bold tw-text-xl tw-text-slate-50 tw-mt-2">
          其他播放源
        </div>
        <div class="tw-flex">
          <div
            class="playsource"
            v-for="(site, index) in otherSite"
            :key="index"
            @click="openUrl(site.url)"
          >
            <i
              class="iconfont tw-text-white tw-mr-2"
              :class="{
                'icon-niconico': site.site === 'ani_one_asia',
                'icon-VIU': site.site === 'viu',
              }"
            ></i>
            <p class="tw-text-center tw-font-bold tw-text-white">
              {{ site.title }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 在线播放源 樱花 -->
    <div class="tw-my-5" v-if="yhdmList.length > 0">
      <p class="tw-text-xl tw-text-white tw-font-bold">
        在线播放(来自网络资源，非本站所有，侵权请联系)
      </p>
      <div v-for="(yhdm, index) in yhdmList" :key="index">
        <div
          v-if="index === 1"
          class="tw-my-5 tw-text-white tw-text-xl tw-font-bold"
        >
          相关搜索结果（上条不准确请查看以下列表）
        </div>
        <div class="tw-text-lg tw-text-white tw-my-2">
          {{ yhdm.title }}(樱花动漫)
        </div>
        <div class="tw-flex tw-flex-wrap">
          <div
            class="ep"
            v-for="(ep, index) in yhdm.epInfo"
            :key="index"
            @click="$router.push(`/index/animeplay/${urlFilter(ep.epUrl)}`)"
          >
            {{ ep.epTitle }}
          </div>
        </div>
      </div>
    </div>

    <AnimeEp :eps="animeDetail.eps" v-if="animeDetail.eps" />
    <HumanBoxCard :AnimeItemList="animeDetail.crt" />
    <HumanBoxCard :StaffItemList="animeDetail.staff" />
    <AnimeDetailInfoBox />
  </div>
</template>

<script lang="ts" setup>
import {  PropType } from "vue";
import HumanBoxCard from "./HumanBoxCard.vue";
import AnimeEp from "./AnimeEp.vue";
import AnimeDetailInfoBox from "./AnimeDetailInfoBox.vue";
import { useYhdm } from "@/hooks/Yhdm";

const props = defineProps({
    animeDetail: {
      type: Object as PropType<Bangumi.AnimeDeatilItem>,
      require: true,
    },
  });

const {
      eps,
      sites,
      cnSite,
      jpSite,
      twHkSite,
      otherSite,
      openUrl,
      yhdmList,
      urlFilter,
    } = useYhdm(props.animeDetail ? props.animeDetail : null);
</script>


<style lang="less" scoped>
@media screen and (min-width: 320px) {
  .ep {
    background-color: rgb(38, 166, 252);
    color: #fff;
    margin: 2px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    padding: 8px;
    align-items: center;
    transition: all ease 0.3s;
    cursor: pointer;
    &:hover {
      background-color: rgb(11, 168, 11);
    }
    &:active {
      background-color: rgb(255, 132, 51);
    }
  }
  .playsource {
    width: 15rem;
    height: 4rem;
    border-radius: 10px;
    margin-right: 0.8rem;
    margin-top: 0.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(3, 42, 77);
    cursor: pointer;
    &:hover {
      box-shadow: 0px 0px 10px rgba(209, 37, 37, 0.596);
    }
  }
  .sohu {
    background-color: rgb(216, 178, 7);
  }
  .letv {
    background-color: rgb(3, 40, 82);
  }
  .iqiyi {
    background-color: rgb(30, 150, 14);
  }
  .pptv {
    background-color: rgb(10, 102, 114);
  }
  .mgtv {
    background-color: rgb(204, 100, 16);
  }
  .youku {
    background-color: rgb(2, 57, 88);
  }
  .bilibili {
    background-color: rgb(233, 55, 123);
  }
}

@media screen and (min-width: 1024px) {
  .playsource {
    width: 20%;
  }
}
</style>