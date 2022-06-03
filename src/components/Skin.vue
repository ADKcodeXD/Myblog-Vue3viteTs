<template>
  <ul class="list">
    <li @click="$router.push('/index/home')">
      <i class="iconfont icon-geren"></i>
    </li>
    <li @click="top"><i class="iconfont icon-huidaodingbu"></i></li>
    <li
      class="item-anime"
      @click="isChatRoomshow = !isChatRoomshow"
      :class="{ acti: isChatRoomshow }"
    >
      <i class="iconfont icon-pinglun"></i>
    </li>
  </ul>
  <ul class="list-mobile">
    <transition-group mode="out-in" name="toptodown">
      <li class="item-anime" @click="isMobile = true" v-if="!isMobile" :key="1">
        <i class="iconfont icon-peizhikanban"></i>
      </li>
      <li class="item-anime" @click="isMobile = false" v-if="isMobile" :key="1">
        <i class="iconfont icon-under"></i>
      </li>
      <li
        class="item-anime"
        @click="$router.push('/index/home')"
        v-if="isMobile"
        :key="3"
      >
        <i class="iconfont icon-geren"></i>
      </li>
      <li class="item-anime" @click="top" v-if="isMobile" :key="4">
        <i class="iconfont icon-huidaodingbu"></i>
      </li>
      <li
        class="item-anime"
        @click="isChatRoomshow = !isChatRoomshow"
        :class="{ acti: isChatRoomshow }"
        v-if="isMobile"
        :key="4"
      >
        <i class="iconfont icon-pinglun"></i>
      </li>
    </transition-group>
  </ul>
  <transition name="width-height" >
    <ChatRoom v-if="isChatRoomshow"   @close="isChatRoomshow=false" />
  </transition>
</template>
<script lang="ts">
import { useThemeStore } from "@/store/theme";
import { setTheme } from "@/theme/theme";
import { getItem } from "@/utils/storage";
import { defineComponent } from "vue";

export default defineComponent({
  setup(props, { emit }) {
    const themeStore = useThemeStore();
    let isChatRoomshow = ref(false);
    let isDark = ref(false);
    let theme = getItem("themeName");
    let isMobile = ref(false);
    const top = () => {
      document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
    };
    const changedark = () => {
      setTheme("dark");
      isDark.value = true;
      themeStore.setTheme("dark");
    };
    const chanegDefault = () => {
      setTheme("default");
      isDark.value = false;
      themeStore.setTheme("default");
    };

    onMounted(() => {
      if (theme) {
        if (theme == "dark") {
          isDark.value = true;
        } else {
          isDark.value = false;
        }
      }
    });

    return { top, changedark, chanegDefault, isDark, isMobile, isChatRoomshow };
  },
});
</script>


<style lang="less" scoped>
.width-height-enter-from,
.width-height-leave-to{
  transform: scaleY(0);
  transform-origin: 50% 100%;
  opacity: 0;
}
.width-height-enter-to,
.width-height-leave-from {
  transform: scaleY(1);
  transform-origin: 50% 100%;
  opacity: 1;
}
.width-height-enter-active ,
.width-height-leave-active{
  transition: all 0.5s ease;
}
.toptodown-enter-from,
.toptodown-leave-to {
  transform: translateY(10%);
  opacity: 0;
}
.toptodown-enter-to,
.toptodown-leave-from {
  transform: translateY(0);
  opacity: 1;
}
.toptodown-enter-active {
  transition: all 0.5s ease;
}
.toptodown-leave-active {
  position: absolute;
  transition: all 0.5s ease;
}
@media screen and (min-width: 320px) and (max-width: 750px) {
  .list {
    display: none;
  }
  .list-mobile {
    display: block;
    position: fixed;
    right: 1rem;
    bottom: 10rem;
    z-index: 9999;
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
    }
  }
  .acti {
    color: rgb(@primaryActiveTextColor) !important;
    background-color: rgba(@primaryActiveColor, 1) !important;
  }
}
@media screen and (min-width: 750px) and (max-width: 992px) {
  .list {
    position: fixed;
    right: 3.5714rem;
    bottom: 14.2857rem;
    z-index: 9999;
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
    }
  }
  .list-mobile {
    display: none;
  }
  .acti {
    color: rgb(@primaryActiveTextColor) !important;
    background-color: rgba(@primaryActiveColor, 1) !important;
  }
}
@media screen and (min-width: 992px) {
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
  .list-mobile {
    display: none;
  }
  .acti {
    color: rgb(@primaryActiveTextColor) !important;
    background-color: rgba(@primaryActiveColor, 1) !important;
  }
}
</style>