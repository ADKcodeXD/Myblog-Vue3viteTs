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
        <div class="right tw-flex-shrink-0">
          <p class="time">{{ time }}</p>
        </div>
      </div>
      <div class="down">
        <div class="leftcontent">
          <p class="author">作者:{{ articleItem.authorVo.nickname }}</p>
          <div class="icongroup">
            <i class="iconfont icon-yanjing">{{ articleItem.viewCounts }}</i>
            <i class="iconfont icon-pinglun">{{ articleItem.commentCounts }}</i>
            <i class="iconfont icon-good">{{ articleItem.likeCounts }}</i>
            <i class="iconfont icon-changyonggongneng">{{
              articleItem.collectCounts
            }}</i>
          </div>
        </div>
        <div>
          <TagItem
            v-for="tag in articleItem.tags"
            :key="tag.id"
            :tagId="tag.id"
            :tagName="tag.tagName"
          />
        </div>
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
      default: () => {},
    },
  },
  setup(props) {
    const time = computed(() => {
      return getRealativeTime(props.articleItem.createDate);
    });
    return { time };
  },
  components: { TagsGroup },
});
</script>


<style lang="less" scoped>
@import url("../styles/pc/article-item-pc.less");
</style>