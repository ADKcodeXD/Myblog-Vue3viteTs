<template>
  <div class="grid-item" @click="$emit('showImg', index)">
    <div class="up">
      <MyElimage :img="`${item.url}`" @load="$emit('loaded')" :zip="2" />
    </div>
    <div class="info">
      <div class="up-info">
        <div>
          <p class="title">{{ item.title }}</p>
          <p class="desc">{{ item.summary }}</p>
        </div>
        <div class="likes">
          <i class="iconfont icon-good"></i>
          <p>{{ item.likes }}</p>
        </div>
      </div>
      <div class="author">
        <div class="inner">
          <div class="avatar">
            <MyElimage :img="item.author.avatar" :zip="1" />
          </div>
          <p class="authorname">{{ item.author.nickname }}</p>
        </div>
        <div class="right">
          <div class="tag">
            <ElTag type="success" v-if="item.origin === 1">原创</ElTag>
            <ElTag type="" effect="dark">
              {{ PicTag[item.tag] }}
            </ElTag>
          </div>
          <p class="time">发布于{{ item.createTime }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { PicTag } from '@/interface/EnumExport';
defineProps<{
  item: PicVo;
  index: number;
}>();
defineEmits(['loaded', 'showImg']);
</script>
<style lang="less" scoped>
@media screen and (min-width: @mobile-device) {
  .grid-item {
    position: absolute;
    transition: all ease 1s;
    width: 48%;
    top: 60%;
    opacity: 0;
    background-color: @bgColor;
    .shadow();
    .border-normal();
    .cusor-pointer();
    overflow: hidden;

    .up {
      min-height: 200px;

      :deep(.el-image) {
        .flexbox();
      }
    }

    .info {
      .up-info {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        .likes {
          display: flex;
          font-size: @big-text;
        }
      }

      padding: @padding-general;

      .title {
        .text-line-show(1);
        font-size: @big-text;
      }

      .desc {
        font-size: @small-text;
        .text-line-show(2);
      }

      .author {
        margin-top: @margin-general;
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        .inner {
          display: flex;
          align-items: center;
          flex-shrink: 0;

          .authorname {
            margin-left: 0.5rem;
          }
        }

        .avatar {
          .ball(2rem, @bgColor);
          overflow: hidden;
        }

        .time {
          margin-top: 2px;
          font-size: @very-samll-text;
        }

        .right {
          margin-top: @margin-general;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
      }
    }

    &:hover {
      transform: translateY(-10px);
      box-shadow: 5px 5px 0px @themeColor;
    }
  }
}

@media screen and (min-width: @smallpc-device) {
  .grid-item {
    width: 24.4%;
    .info {
      .author {
        flex-direction: row;
        align-items: flex-end;
        .right {
          margin-top: unset;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }
      }
    }
  }
}

@media screen and (min-width: @normal-device) {
  .grid {
    .grid-item {
      width: 24.5%;
    }
  }
}
</style>
