<template>
  <div
    class="tw-my-5 tw-flex tw-px-20 tw-justify-between tw-items-center"
    v-if="myinfo"
  >
    <div class="tw-w-48 tw-h-48 tw-rounded-full tw-overflow-hidden">
      <MyElimage :img="myinfo.avatar.large" />
    </div>
    <div class="tw-flex tw-flex-col tw-items-end">
      <p class="tw-text-4xl">{{ myinfo.nickname }}</p>
      <div class="tw-text-sm tw-font-light tw-leading-6">
        {{ myinfo.sign ? myinfo.sign : "暂无签名" }}
      </div>
      <div class="tw-text-sm tw-font-light tw-leading-10">
        用户id:{{ myinfo.id }}
      </div>
    </div>
  </div>
  <div v-else>
    <el-empty></el-empty>
  </div>
</template>

<script setup lang="ts">
import { getMyBangumiInfo } from "@/api/bangumi";
import { useBangumiUser } from "@/store/bangumiUser";
let myinfo = ref<Bangumi.BangumiMyInfo>();
const user = useBangumiUser();
if (!user.bgm_user_info) {
  getMyBangumiInfo()
    .then((result) => {
      myinfo.value = result.data;
      user.setBangumiUserInfo(myinfo.value);
    })
    .catch((err) => {
      console.log(err);
    });
}else{
    myinfo.value=user.bgm_user_info;
}
</script>

