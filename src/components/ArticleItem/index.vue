<template>
  <div class="box" @click="$router.push(`/article/${articleItem.id}`)">
    <div class="image">
      <MyElimage :img="articleItem.banner" alt="" />
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
          <div class="tw-flex tw-items-center ">
            <div class="tw-w-8 tw-h-8 tw-rounded-full tw-overflow-hidden tw-mr-2">
              <MyElimage :img="articleItem.authorVo.avatar" />
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
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, PropType } from "vue";
import { getRealativeTime } from "@/utils/dayjs";
import { ArticleItemInfo } from "@/interface/article";

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
@import url("./style.less");

.tag {
  margin-top: unset;
}
</style>