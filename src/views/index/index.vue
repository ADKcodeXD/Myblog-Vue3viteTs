<template>
  <main class="main">
    <div class="tw-h-24 ghost"></div>
    <SubTitle>
      最近更新
      <template #right> welcome to Adkblog </template>
    </SubTitle>
    <Carousel :items="bannerList" />
    <FollowBangumiCard
      v-if="userInfo.user.token && userInfo.followBangumiCard"
      @hide="hideFollowBgmCard"
    />
    <SubTitle> 看看新番 </SubTitle>
    <section class="bangumi">
      <Bangumimini />
    </section>
    <SubTitle> 我的文章 </SubTitle>
    <section class="view-content">
      <aside class="article">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <div class="title">
                <div class="tw-flex tw-flex-col few">
                  <p>近期更新文章</p>
                  <span>Update in few days</span>
                </div>
              </div>
              <AdkButton
                :x="8"
                :y="3.3"
                :mainTextsize="1.3"
                :subTextsize="0.7"
                @click="$router.push('/index/articlelist')"
              >
                更多
                <template #endesc> more </template>
              </AdkButton>
            </div>
          </template>
          <ArticleItem
            v-for="articleItem in articles"
            :key="articleItem.id"
            :articleItem="articleItem"
          />
          <AdkEmpty v-if="articles.length === 0" desc="暂时没有文章发表哦~"></AdkEmpty>
        </el-card>
      </aside>
      <ul class="rightbox" ref="rightUl">
        <li>
          <ArticleTimeLine />
        </li>
        <li>
          <TagsAll />
        </li>
        <li>
          <TimeLine />
        </li>
      </ul>
    </section>
  </main>
</template>

<script lang="ts">
export default { name: 'IndexPage' }
</script>

<script setup lang="ts">
import { getIndexArticleApi, getIndexBanner } from '@/api/article'
import TimeLine from './components/TimeLine.vue'
import TagsAll from './components/TagsAll.vue'
import ArticleTimeLine from './components/ArticleTimeLine.vue'
import SubTitle from './components/SubTitle.vue'
import { useStore } from '@/store/main'
// 获取首页文章 按照时间顺序 5篇
const articles = ref<ArticleItemInfo[]>([])
const bannerList = ref<ArticleItemInfo[]>([])
const userInfo = useStore()
const pageparams: PageParams = {
  page: 1,
  pagesize: 5
}
// 获取文章列表
const getIndexfive = async () => {
  const { data } = await getIndexArticleApi(pageparams)
  articles.value = data.data
}
const rightUl = ref<HTMLElement>()
// 获取文章头图
const getBannerList = async () => {
  const { data } = await getIndexBanner()
  bannerList.value = data.data
}
const hideFollowBgmCard = () => {
  userInfo.setFollowBangumiCard(false)
}
// 拖拽
onMounted(() => {
  getIndexfive()
  getBannerList()
})
</script>

<style lang="less" scoped>
@import url(./styles/Index.less);
</style>
