<template>
  <div class="eps tw-mt-10">
    <p class="tw-text-white tw-font-bold tw-text-3xl">章节数</p>
    <div class="eps-container tw-flex tw-flex-wrap tw-mt-3" v-loading="loading">
      <el-popover
        v-for="ep in arrs"
        :key="ep.id"
        placement="top-start"
        :title="ep.name_cn ? ep.name_cn : ep.name"
        :width="200"
        :trigger="popType"
      >
        <template #reference>
          <div
            v-if="ep.type === 0"
            class="tw-flex"
          >
            <span v-if="ep.sort <= 1" class="sp ep tw-mr-2 tw-text-white"
              >正片</span
            >
            <span class="ep tw-mr-2" :class="{ noactive: ep.status === 'NA' }"> {{ ep.sort }}</span>
          </div>
          <div v-if="ep.type === 1" class="tw-flex">
            <span v-if="ep.sort <= 1" class="sp ep tw-mr-2 tw-text-white"
              >SP</span
            >
            <span class="ep tw-mr-2" :class="{ noactive: ep.status === 'NA' }">
              {{ ep.sort }}
            </span>
          </div>
          <div v-if="ep.type === 2" class="tw-flex">
            <span v-if="ep.sort <= 1" class="sp ep tw-mr-2 tw-text-white"
              >OP</span
            >
            <span class="ep tw-mr-2" :class="{ noactive: ep.status === 'NA' }">
              {{ ep.sort }}
            </span>
          </div>
          <div v-if="ep.type === 3" class="tw-flex">
            <span v-if="ep.sort <= 1" class="sp ep tw-mr-2 tw-text-white"
              >ED</span
            >
            <span class="ep tw-mr-2" :class="{ noactive: ep.status === 'NA' }">
              {{ ep.sort }}
            </span>
          </div>
        </template>
        <template #default>
          <p v-if="ep.name_cn">原名:{{ ep.name }}</p>
          <p class="tw-text-xs tw-leading-5 text-line-show-2" v-if="ep.desc">
            简介:{{ ep.desc }}
          </p>
          <div>
            <p v-if="ep.duration">
              <span v-if="ep.duration.indexOf(':') != -1">
                时长{{
                  ep.duration.split(":")[0] +
                  "时" +
                  ep.duration.split(":")[1] +
                  "分" +
                  ep.duration.split(":")[2]
                }}
              </span>
              <span v-else> 时长/出现集数:{{ ep.duration }} </span>
            </p>
            <p>开播日期{{ ep.airdate }}</p>
          </div>
        </template>
      </el-popover>
      <div v-if="moreFlag">
        <p
          class="tw-text-xl tw-text-white tw-cursor-pointer tw-font-bold"
          @click="nextPage"
        >
          更多
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isMobile } from "@/utils/mobile";
import { PropType } from "vue";

const props = defineProps({
    eps: {
      type: Object as PropType<Array<Bangumi.EpDeatil>>,
      require: true,
    },
  });

let pageParams = reactive({
      page: 1,
    });
    let arrs = ref<Array<Bangumi.EpDeatil>>([]);
    let moreFlag = ref(false);
    let loading = ref(false);
    // 大于100条章节  更多再显示
    if (props.eps && props.eps.length > 100) {
      for (let i = 0; i < 100; i++) {
        arrs.value.push(props.eps[i]);
      }
      moreFlag.value = true;
    } else if (props.eps) {
      arrs.value = props.eps;
    }
    
    const nextPage = () => {
      loading.value = true;
      if (props.eps) {
        if (pageParams.page < Math.ceil(props.eps?.length / 100)) {
          pageParams.page++;
        } else {
          return;
        }
        let length =
          pageParams.page * 100 > props.eps.length
            ? props.eps.length
            : pageParams.page * 100;
        for (let i = (pageParams.page - 1) * 100; i < length; i++) {
          arrs.value.push(props.eps[i]);
        }
        if (pageParams.page >= Math.ceil(props.eps?.length / 100)) {
          moreFlag.value = false;
        }
      }
      loading.value = false;
    };
    let popType = ref("");
    // 判断设备
    if (isMobile()) {
      popType.value = "click";
    } else {
      popType.value = "hover";
    }
</script>

<style lang="less" scoped>
.ep {
  padding: 0.8rem;
  height: 20px;
  margin-top: 4px;
  background-color: antiquewhite;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  outline: 1px double rgb(250, 194, 157);
}
.noactive {
  background-color: rgb(136, 136, 136);
  outline: 1px double rgb(27, 0, 0);
}
.sp {
  background-color: rgb(240, 62, 62);
  outline: 1px double rgb(255, 255, 255);
}
</style>