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
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
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
@media screen and (min-width:320px) and (max-width:992px){
.list {
  position: fixed;
  right: 3.5714rem;
  bottom: 14.2857rem;
  z-index: 1;
  li {
    cursor: pointer;
    height: 4.2857rem;
    width: 4.2857rem;
    border-radius: 50%;
    color: rgb(@primaryTextColor);
    text-align: center;
    line-height: 4.2857rem;
    margin-bottom: 1.4286rem;
    transition: 0.3s all ease;
    background-color: rgba(@primaryTipColor, 0.6);
    &:active {
      color: rgb(@primaryActiveTextColor);
      background-color: rgba(@primaryActiveColor, 1);
    }
    &:hover{
      
    }
  }
}
}
@media screen and (min-width:992px){
.list {
  position: fixed;
  right: 3.5714rem;
  bottom: 14.2857rem;
  z-index: 1;
  li {
    cursor: pointer;
    height: 4.2857rem;
    width: 4.2857rem;
    border-radius: 50%;
    color: rgb(@primaryTextColor);
    text-align: center;
    line-height: 4.2857rem;
    margin-bottom: 1.4286rem;
    transition: 0.3s all ease;
    background-color: rgba(@primaryTipColor, 0.6);
    &:hover {
      color: rgb(@primaryActiveTextColor);
      background-color: rgba(@primaryActiveColor, 1);
    }
  }
}
}

</style>