<template>
  <iframe id="dplayerContainer" :src="`/player.html?videoUrl=${videoUrl}`" ref="dp"></iframe>
</template>
<script lang="ts" setup>
defineExpose(['getVideoTime'])
let dp = ref<HTMLIFrameElement>()
const props = withDefaults(
  defineProps<{
    videoUrl?: string
  }>(),
  {
    videoUrl: ''
  }
)
onMounted(() => {
  if (dp.value) {
    dp.value.contentWindow.postMessage({ videoUrl: props.videoUrl }, '*')
  }
})
watch(props, props => {
  if (dp.value) {
    dp.value.contentWindow.postMessage({ videoUrl: props.videoUrl }, '*')
  }
})
</script>

<style lang="less" scoped>
@media screen and (min-width: @mobile-device) {
  #dplayerContainer {
    overflow: hidden;
    border-radius: 2rem;
    .shadow();
  }
}

@media screen and (min-width: @smallpc-device) {
  #dplayerContainer {
    height: 54rem;
    width: 100%;
  }
}
</style>
