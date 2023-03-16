<template>
  <div class="eps">
    <p class="eps-title">章节数</p>
    <div class="eps-container" v-loading="loading">
      <el-popover
        v-for="(ep, index) in filterEp"
        :key="ep.id"
        placement="top-start"
        :title="ep.name_cn ? ep.name_cn : ep.name"
        :show-after="100"
        :width="200"
        :trigger="popType"
      >
        <template #reference>
          <div v-if="ep.type === 0" class="eps-container-ep">
            <span v-if="ep.sort <= 1" class="ep eps-container-split">正片</span>
            <span class="ep" :class="{ noactive: ep.status === 'NA' }"> {{ ep.sort }}</span>
          </div>
          <div v-if="ep.type === 1" class="eps-container-ep">
            <span v-if="filterEp[index - 1].type !== ep.type" class="ep eps-container-split"
              >SP</span
            >
            <span class="ep" :class="{ noactive: ep.status === 'NA' }">
              {{ ep.sort }}
            </span>
          </div>
          <div v-if="ep.type === 2" class="eps-container-ep">
            <span v-if="filterEp[index - 1].type !== ep.type" class="ep eps-container-split"
              >OP</span
            >
            <span class="ep" :class="{ noactive: ep.status === 'NA' }">
              {{ ep.sort }}
            </span>
          </div>
          <div v-if="ep.type === 3" class="eps-container-ep">
            <span v-if="filterEp[index - 1].type !== ep.type" class="ep eps-container-split"
              >ED</span
            >
            <span class="ep" :class="{ noactive: ep.status === 'NA' }">
              {{ ep.sort }}
            </span>
          </div>
        </template>
        <template #default>
          <p v-if="ep.name_cn">原名:{{ ep.name }}</p>
          <p class="text-line-show-2" v-if="ep.desc">简介:{{ ep.desc }}</p>
          <div>
            <p v-if="ep.duration">
              <span v-if="ep.duration.indexOf(':') != -1">
                时长{{
                  ep.duration.split(':')[0] +
                  '时' +
                  ep.duration.split(':')[1] +
                  '分' +
                  ep.duration.split(':')[2]
                }}
              </span>
              <span v-else> 时长/出现集数:{{ ep.duration }} </span>
            </p>
            <p>开播日期{{ ep.airdate }}</p>
          </div>
        </template>
      </el-popover>
      <div v-if="moreFlag" @click="nextPage">
        <p class="ep">更多</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { isMobile } from '@/utils/mobile'
const props = defineProps<{
  eps: Array<Bangumi.EpDeatil>
}>()
const pageParams = reactive({
  page: 1
})
const arrs = shallowRef<Array<Bangumi.EpDeatil>>([])
const moreFlag = ref(false)
const loading = ref(false)
const popType = ref<'click' | 'focus' | 'hover' | 'contextmenu'>()
// 大于100条章节  更多再显示 (防止dom量过多造成卡顿)
if (props.eps && props.eps.length > 100) {
  for (let i = 0; i < 100; i++) {
    arrs.value.push(props.eps[i])
  }
  moreFlag.value = true
} else if (props.eps) {
  // eslint-disable-next-line vue/no-setup-props-destructure
  arrs.value = props.eps
}

const nextPage = () => {
  loading.value = true
  if (props.eps) {
    if (pageParams.page < Math.ceil(props.eps?.length / 100)) {
      pageParams.page++
    } else {
      return
    }
    let length = pageParams.page * 100 > props.eps.length ? props.eps.length : pageParams.page * 100
    for (let i = (pageParams.page - 1) * 100; i < length; i++) {
      arrs.value.push(props.eps[i])
    }
    if (pageParams.page >= Math.ceil(props.eps?.length / 100)) {
      moreFlag.value = false
    }
  }
  loading.value = false
}

const filterEp = computed<Array<Bangumi.EpDeatil>>(() => {
  if (arrs.value) {
    return arrs.value.sort((a, b) => {
      if (a.type === b.type) return a.sort - b.sort
      else return a.type - b.type
    })
  }
})

// 判断设备
if (isMobile()) {
  popType.value = 'click'
} else {
  popType.value = 'hover'
}
</script>

<style lang="less" scoped>
@import url(./styles/AnimeEp.less);
</style>
