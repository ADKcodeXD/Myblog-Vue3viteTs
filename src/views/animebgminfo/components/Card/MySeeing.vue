<template>
  <div class="tw-bg-white tw-p-2 tw-m-2">
    <div class="tw-text-3xl tw-m-2">正在观看({{ list.length }})</div>
    <div class="tw-flex tw-flex-wrap">
      <div v-for="item in list" :key="item.name" class="box">
        <div class="tw-w-1/3 tw-h-full tw-flex-shrink-0">
          <MyElimage :img="item.subject.images.large" :not-found-type="'3:4'" />
        </div>
        <div class="tw-ml-2 tw-flex-1 tw-justify-between tw-flex tw-flex-col tw-p-2 tw-break-all">
          <div>
            <p class="tw-font-bold tw-text-xl tw-block tw-mb-2 text-line-show-2">
              {{ item.subject.name_cn ? item.subject.name_cn : item.subject.name }}
            </p>
            <p v-if="item.subject.name_cn" class="tw-text-slate-400 text-line-show-2">
              {{ item.subject.name }}
            </p>
            <div class="tw-w-full tw-h-5 tw-bg-slate-300 tw-relative tw-my-2">
              <span
                class="tw-absolute tw-left-1/2 tw-text-center -tw-translate-x-1/2 tw-z-20 tw-font-bold"
                >{{ item.ep_status }}/{{ item.subject.eps }}</span
              >
              <div
                class="tw-absolute tw-bg-orange-400 tw-h-full"
                :style="'width:' + (item.ep_status / item.subject.eps) * 100 + '%'"
              ></div>
            </div>
          </div>
          <p>上次观看{{ item.lasttouch }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getMySeeingCollection } from '@/api/bangumi'
import { useBangumiUser } from '@/store/bangumiUser'
const bgmUserStore = useBangumiUser()
const bgmUser = bgmUserStore.bgm_user_info
let list = ref<Bangumi.MySeeing[]>([])
getMySeeingCollection(bgmUser.id).then(result => {
  list.value = result.data
})
</script>

<style lang="less" scoped>
@media screen and(min-width:320px) {
  .box {
    width: 90%;
    height: 20rem;
    padding-right: 10px;
    display: flex;
    flex-grow: 1;
    margin: 20px;
    border-radius: 40px;
    overflow: hidden;
    background-color: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  }
}

@media screen and(min-width:768px) {
  .box {
    width: 45%;
    height: 20rem;
  }
}

@media screen and(min-width:1024px) {
  .box {
    width: 24rem;
    height: 16rem;
  }
}
</style>
