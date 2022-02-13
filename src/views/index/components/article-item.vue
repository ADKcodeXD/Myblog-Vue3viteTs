<template>
  <div class="box">
    <div class="image">
      <img src="@/assets/img/women.png" alt="" />
    </div>
    <div class="content">
      <p class="title">这是标题</p>
      <p class="desc">
        这是简介这是简介这是简介这是简 这是简介这是简介这是简介
        这是简介这是简介这是简介 这是简介这是简介这是简介这是简
        这是简介这是简介这是简介 这是简介这是简介这是简介介这简介
        这是简介这是简介这是简介这是简介 这是简介这是简介这是简介
        这是简介这是简介这是简介这是简介 这是简介这是简介这是简介
        是简介这是简介这是简介这是简介 这是简介这是简介这是简介这
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {},
});
</script>


<style lang="less" scoped>
.box {
  height: 150px;
  padding: 5px;
  margin: 10px 0;
//   border-bottom: 1px solid rgb(216, 216, 216);
  display: flex;
  justify-content: start;
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
    .title {
      font-size: 32px;
    }
    .desc {
        margin-top: 5px;
      color: gray;
      font-size: 14px;
      word-break: break-all;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
    }
    
  }
  &:hover{
        color: rgb(241, 201, 115) ;
        background-color: rgb(248, 248, 248);
        .desc{
            color:  rgb(241, 201, 115);
        }
        cursor: pointer;
    }
}
</style>