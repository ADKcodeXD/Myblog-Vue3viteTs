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
@media screen and(max-width:960px) {
  .box{
    justify-content: space-between;
    height: auto;
  }
}
.box {
  padding: 5px;
  margin: 10px 0;
  //   border-bottom: 1px solid rgb(216, 216, 216);
  display: flex;
  height: 8vw;
  justify-content: flex-start;
  align-items: center;
  .image {
    flex-shrink: 0;
    margin-right: 10px;
    img {
      width: 140px;
      height: 140px;
      object-fit: cover;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    .up {
      display: flex;
      height: 50%;
      justify-content: space-between;
      .time {
        padding: 5px;
        justify-content: flex-end;
      }
      
      .title {
        font-size: 32px;
      }
      .desc {
        margin-top: 5px;
        color: rgb(@primarySubColor);
        font-size: 14px;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
        overflow: hidden;
      }
    }
    .down {
      display: flex;
      justify-content: space-between;
      width: 100%;
     
      .leftcontent {
        display: flex;
        align-items: center;
        .author {
          color: rgb(@primaryHightlightColor);
          font-size: 14px;
          margin-right: 10px;
        }
        i{
          color: rgb(@primaryHightlightColor);
          margin-right: 5px;
        }
      }

      
    }
  }
  &:hover {
    color: rgb(@primaryActiveTextColor);
    background-color: rgb(@primaryActiveColor);
    cursor: pointer;
  }
}
</style>