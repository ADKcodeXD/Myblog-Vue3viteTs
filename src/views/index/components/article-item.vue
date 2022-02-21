<template>
  <div class="box" @click="$router.push(`/article/${articleItem.id}`)">
    <div class="image">
      <img :src="articleItem.banner" alt="" />
    </div>
    <div class="content">
      <div class="up">
        <div class="left">
          <p class="title">{{ articleItem.articleName }}</p>
          <p class="desc">
            {{ articleItem.summary }}
          </p>
        </div>
        <div class="right">
          <p class="time">{{ time }}</p>
        </div>
      </div>
      <div class="down">
        <div class="leftcontent">
          <p class="author">作者:{{ articleItem.authorVo.nickname }}</p>
          <i class="iconfont icon-yanjing">阅读:{{ articleItem.viewCounts }}</i>
          <i class="iconfont icon-pinglun">评论:{{ articleItem.commentCounts }}</i>
        </div>
        <TagsGroup :tags="articleItem.tags"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { getRealativeTime } from "@/utils/dayjs";
import TagsGroup from "@/components/TagsGroup.vue";
import { ArticleItemInfo } from "@/interface/article";
export default defineComponent({
    props: {
        articleItem: {
            type: Object as PropType<ArticleItemInfo>,
            default: () => { },
        },
    },
    setup(props) {
        const time = computed(() => {
            return getRealativeTime(props.articleItem.createDate);
        });
        return { time };
    },
    components: { TagsGroup }
});
</script>


<style lang="less" scoped>
@import url('../styles/pc/article-item-pc.less');
</style>