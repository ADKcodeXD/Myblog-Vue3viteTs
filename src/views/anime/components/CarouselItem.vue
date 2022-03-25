<template>
  <div
    class="
      content
      tw-flex 
      tw-justify-center 
      tw-items-center 
      tw-bg-black tw-relative
    "
    
  >
    <div class="info tw-w-4/5 md:tw-w-2/5">
      <h3 class="tw-text-4xl tw-font-bold tw-text-slate-100">
        {{ animeInfo.name_cn ? animeInfo.name_cn : animeInfo.name }}
      </h3>
      <small class="tw-text-xl tw-font-bold tw-text-orange-300">{{
        animeInfo.name_cn ? animeInfo.name : ""
      }}</small>
      <p
        class="
          detail
          tw-text-sm tw-text-slate-100 tw-break-words
          tw-font-thin
          tw-leading-6
          md:tw-leading-4
          text-line-show-6
        "
      >
        {{ animeInfo.summary }}
      </p>
      <div class="tw-flex tw-justify-between tw-items-center">
        <p class="detail tw-text-slate-100">
          总集数:{{ animeInfo.eps ? animeInfo.eps : "暂无数据" }} 评分:{{
            animeInfo.rating && animeInfo.rating.score
          }}
        </p>
        <div
          class="
            button
            tw-text-xl
            tw-font-bold
            tw-text-slate-100
            tw-text-center
            tw-transition-all
            tw-cursor-pointer
            hover:tw-bg-orange-500
          "
          @click="$router.push(`/index/animedetail/${animeInfo.id}`)"
        >
          查看更多
        </div>
      </div>
      <div>
        <el-tag v-for="tag,index in tagsInfoThree" :key="index" type="warning" class="tag-text" >
          {{ tag.name }}
        </el-tag>
      </div>
    </div>
    <el-image
      class="tw-opacity-60 tw-self-center"
      :src="animeInfo.images.large"
    >
      <template #placeholder>
        <div class="tw-h-fill tw-w-fill tw-self-center">
          <el-image :src="Loading">
            <template #placeholder>
              <p>正在努力加载</p>
            </template>
          </el-image>
          <span>图片努力加载中~</span>
        </div>
      </template>
      <template #error>
        <div>
          <div class="tw-w-fill tw-h-fill">
            <img
              class="tw-w-fill tw-h-fill"
              src="@/assets/img/404img1200.jpg"
            />
          </div>
        </div>
      </template>
    </el-image>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Loading from "@/assets/img/loading.gif";
import { SubjectInfoSmall } from "@/interface/bangumiApi.type";

export default defineComponent({
  props: {
    animeInfo: {
      type: Object as PropType<SubjectInfoSmall>,
      default: {},
    },
  },
  setup(props) {
    const tagsInfoThree = computed(() => {
      let tags = [];
      if (props.animeInfo.tags.length > 3) {
        for (let i = 0; i < 3; i++) {
          tags.push(props.animeInfo.tags[i]);
        }
      } else {
        return props.animeInfo.tags;
      }
      return tags;
    });
    return {
      Loading,
      tagsInfoThree,
    };
  },
});
</script>

<style lang="less" scoped>
@media screen and(min) {
  
}
:deep(.el-carousel__indicators){
  display: flex !important;
}
.content {
  width: 100%;
  height: 400%;
  position: absolute;
  left: 0;
  right: 0;
  overflow: hidden;
}
.info {
  position: absolute;
  left: 30px;
  top: 42%;
  z-index: 10;
  text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);
  .detail {
    margin-top: 5px;
  }
  .button {
    border: rgba(255, 166, 1, 0.438) 1px solid;
    margin-top: 10px;
    width: 7rem;
    border-radius: 5px;
    padding: 5px;
  }
  .tag-text {
    text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1) !important;
    margin-right: 5px;
  }
}

:deep(.el-image) {
  width: unset;
  height: unset;
  flex: 1;
}
</style>