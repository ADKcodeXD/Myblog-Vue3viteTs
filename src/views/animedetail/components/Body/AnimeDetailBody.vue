<template>
  <div class="main" v-if="animeDetail">
    <!-- 简介 -->
    <summary class="desc">
      <p class="desc-title">简介</p>
      <p class="desc-summary">
        {{ animeDetail.summary }}
      </p>
    </summary>
    <!-- 播放源 -->
    <div class="playsource-container" v-if="sites.length > 0">
      <p class="frist">播放源</p>
      <div v-if="cnSite.length > 0">
        <div class="playsource-container-title">简中播放源</div>
        <div class="playsource-tag">
          <div
            class="playsource"
            :class="site.site"
            v-for="(site, index) in cnSite"
            :key="index"
            @click="openUrl(site.url)"
          >
            <i
              class="iconfont inner"
              :class="{
                'icon-acfun': site.site === 'acfun',
                'icon-iqiyi': site.site === 'iqiyi',
                'icon-leshi': site.site === 'letv',
                'icon-PPTV': site.site === 'pptv',
                'icon-mangguoTV': site.site === 'mgtv',
                'icon-bilibili-line': site.site === 'bilibili',
                'icon-sohu': site.site === 'sohu',
                'icon-tengxunshipin': site.site === 'qq',
                'icon-youku1193430easyiconnet': site.site === 'youku'
              }"
            ></i>
            <p class="inner_text">
              {{ site.title }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="twHkSite.length > 0">
        <div class="playsource-container-title">繁中播放源</div>
        <div class="playsource-tag">
          <div
            class="playsource"
            v-for="(site, index) in twHkSite"
            :key="index"
            @click="openUrl(site.url)"
          >
            <i
              class="iconfont inner"
              :class="{
                'icon-bilibili': site.site === 'bilibili_hk_mo_tw',
                'icon-icon_post_gamer': site.site === 'gamer',
                'icon-pc-dongman': site.site === 'muse_hk'
              }"
            ></i>
            <p class="inner_text">
              {{ site.title }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="jpSite.length > 0">
        <div class="playsource-container-title">日语播放源</div>
        <div class="playsource-tag">
          <div
            class="playsource"
            v-for="(site, index) in jpSite"
            :key="index"
            @click="openUrl(site.url)"
          >
            <i class="iconfont inner" :class="{ 'icon-niconico': site.title === 'Niconico' }"></i>
            <p class="inner_text">
              {{ site.title }}
            </p>
          </div>
        </div>
      </div>
      <div v-if="otherSite.length > 0">
        <div class="playsource-container-title">其他播放源</div>
        <div class="playsource-tag">
          <div
            class="playsource"
            v-for="(site, index) in otherSite"
            :key="index"
            @click="openUrl(site.url)"
          >
            <i
              class="iconfont inner"
              :class="{
                'icon-niconico': site.site === 'ani_one_asia',
                'icon-VIU': site.site === 'viu'
              }"
            ></i>
            <p class="inner_text">
              {{ site.title }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- 在线播放源2 senfun -->
    <!-- 在线播放源 樱花 -->
    <div class="yhdm" v-if="yhdmList.length > 0">
      <p class="yhdm-title">
        在线播放(本站不提供存储增值付费服务，仅提供学习交流，所有资源源于网络，侵权请联系)
      </p>
      <div v-for="(yhdm, index) in yhdmList" :key="index">
        <div v-if="index === 1" class="yhdm-little-title">
          相关搜索结果（上条不准确请查看以下列表）
        </div>
        <div class="yhdm-little-title">{{ yhdm.title }}(樱花动漫)</div>
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
import { PropType } from 'vue';
import { useYhdm } from '@/hooks/Yhdm';
import HumanBoxCard from './HumanBoxCard.vue';
import AnimeEp from './AnimeEp.vue';
import AnimeDetailInfoBox from './AnimeDetailInfoBox.vue';
const props = defineProps({
  animeDetail: {
    type: Object as PropType<Bangumi.AnimeDeatilItem>,
    require: true
  }
});

const { sites, cnSite, jpSite, twHkSite, otherSite, openUrl, yhdmList, urlFilter } = useYhdm(
  props.animeDetail ? props.animeDetail : null
);
</script>

<style lang="less" scoped>
@import url(./styles/AnimeBody.less);
</style>
