<template>
  <ul class="list">
    <li @click="$router.push('/home')"><i class="iconfont icon-geren"></i></li>
    <li @click="top"><i class="iconfont icon-huidaodingbu"></i></li>
    <li v-if="!isDark" @click="changedark">
      <i class="iconfont icon-dark"></i>
    </li>
    <li v-else @click="chanegDefault">
      <i class="iconfont icon-tianqitaiyangqichuang"></i>
    </li>
  </ul>
</template>
<script lang="ts">
import { setTheme } from "@/theme/theme";
import { getItem } from "@/utils/storage";
import { defineComponent } from "vue";

export default defineComponent({
  setup(props, { emit }) {
    const top = () => {
      emit("top");
    };
    const changedark = () => {
      setTheme("dark");
      isDark.value = true;
    };
    const chanegDefault = () => {
      setTheme("default");
      isDark.value = false;
    };
    let isDark = ref(false);
    let theme = getItem("themeName");
    onMounted(() => {
      if (theme) {
        if (theme == "dark") {
          isDark.value = true;
        } else {
          isDark.value = false;
        }
      }
    });

    return { top, changedark, chanegDefault, isDark };
  },
});
</script>


<style lang="less" scoped>
.list {
  position: fixed;
  right: 50px;
  bottom: 200px;
  z-index: 1;
  li {
    cursor: pointer;
    height: 3vw;
    width: 3vw;
    border-radius: 50%;
    color: rgb(@primaryTextColor);
    text-align: center;
    line-height: 3vw;
    margin-bottom: 1vw;
    transition: 0.3s all ease;
    background-color: rgba(@primaryTipColor, 0.6);
    &:hover {
      font-size: 20px;
      color: rgb(@primaryActiveTextColor);
      background-color: rgba(@primaryActiveColor, 1);
    }
  }
}
</style>