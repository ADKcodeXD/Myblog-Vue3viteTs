<template>
  <router-link class="box" :to="`/article/${articleItem.id}`">
    <figure class="image">
      <MyElimage :img="articleItem.banner" :zip="2" />
    </figure>
    <article class="content">
      <section class="up">
        <div class="left">
          <title class="title">{{ articleItem.articleName }}</title>
          <summary class="desc">
            {{ articleItem.summary }}
          </summary>
        </div>
        <time class="right tw-flex-shrink-0">
          <time class="time">{{ time }}</time>
        </time>
      </section>
      <section class="down">
        <div class="leftcontent">
          <div class="tw-flex tw-items-center ">
            <div class="tw-w-8 tw-h-8 tw-rounded-full tw-overflow-hidden tw-mr-2">
              <MyElimage :img="articleItem.authorVo.avatar" :zip="1"/>
            </div>
            <p class="author">{{ articleItem.authorVo.nickname }}</p>
          </div>
          <div>
            <TagItem v-for="tag in articleItem.tags" :key="tag.id" :tagId="tag.id" :tagName="tag.tagName" />
          </div>
        </div>
        <div>
          <div class="icongroup">
            <i class="iconfont icon-yanjing">{{ articleItem.viewCounts }}</i>
            <i class="iconfont icon-pinglun">{{ articleItem.commentCounts }}</i>
            <i class="iconfont icon-good">{{ articleItem.likeCounts }}</i>
            <i class="iconfont icon-changyonggongneng">{{
                articleItem.collectCounts
            }}</i>
          </div>
        </div>
      </section>
    </article>
  </router-link>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { getRealativeTime } from "@/utils/dayjs";

const props = defineProps({
  articleItem: {
    type: Object as PropType<ArticleItemInfo>,
    default: () => { },
  },
});

const time = computed(() => {
  return getRealativeTime(props.articleItem.createDate);
});
</script>
<style lang="less" scoped>
@import url("./styles/Index.less");

</style>