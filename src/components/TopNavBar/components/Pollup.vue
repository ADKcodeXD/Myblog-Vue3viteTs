<template >
    <nav class="pollup" ref="pollup">
        <div class="right">
            <div class="out">
                <i class="iconfont icon-delete" @click="closePollup"></i>
            </div>
            <!-- 这是上面的个人信息框 -->
            <div class="container">
                <div class="info-box">
                    <!-- banner展示div -->
                    <div class="imgcontainer" :style="{
                        backgroundImage: `url(${userinfo.banner})`,
                    }"></div>
                    <!-- 信息框 -->
                    <div class="loginbox">
                        <div class="up">
                            <!-- 头像 -->
                            <div class="avatar">
                                <img v-if="userinfo.id" :src="userinfo.avatar"
                                    onerror="javascript:this.src='/src/assets/img/logo.png';" />
                                <img v-else src="@/assets/img/logo.png" alt="" />
                            </div>
                            <!-- 提示信息 以及个人签名 -->
                            <div class="info">
                                <h3 v-if="userinfo.nickname">
                                    {{ userinfo.nickname }}
                                </h3>
                                <h3 v-else class="tw-text-slate-800">欢迎您 尊敬的访客</h3>
                                <div v-if="userinfo.introduce">
                                    {{ userinfo.introduce }}
                                </div>
                                <div v-else class="tw-text-slate-800">
                                    登录后可以使用更多功能哦
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 手机弹出导航栏 -->
            <div class="menu-list">
                <router-link @click="closePollup" to="/index" active-class="router-active">
                    <SvgIcon name="shoucang" class="tw-w-12 tw-h-12 tw-mr-2" />
                    首页
                </router-link>
                <router-link @click="closePollup" to="/index/articlelist" active-class="router-active">
                    <SvgIcon name="wenzi" class="tw-w-12 tw-h-12 tw-mr-2" />
                    文章
                </router-link>
                <router-link @click="closePollup" to="/index/messageboard" active-class="router-active">
                    <SvgIcon name="pinglun" class="tw-w-12 tw-h-12 tw-mr-2" />留言板
                </router-link>
                <router-link @click="closePollup" to="/index/anime" active-class="router-active">
                    <SvgIcon name="bofang" class="tw-w-12 tw-h-12 tw-mr-2" />
                    动漫
                </router-link>
                <router-link @click="closePollup" to="/index/edit" active-class="router-active">
                    <SvgIcon name="bianji" class="tw-w-12 tw-h-12 tw-mr-2" />
                    我也要写
                </router-link>
            </div>
            <div class="button-login" v-if="userinfo.id">
                <el-button type="primary" plain @click="
    $router.push('/index/home');
closePollup;
                ">编辑资料</el-button>
                <el-button type="danger" plain @click="logout">退出登录</el-button>
            </div>
            <div class="button-login" v-else>
                <el-button type="success" plain @click="
    $router.push('/login');
closePollup;
                ">去登录</el-button>
            </div>
        </div>
    </nav>
</template>
<script setup lang="ts">

import { onClickOutside } from "@vueuse/core";
import { PropType } from "vue";
const props = defineProps({
    userinfo: {
        type: Object as PropType<UserEasy>,
        default: () => { }
    }
})
const emit = defineEmits(['close', 'logout']);
let pollup = ref<HTMLElement | null>();
const closePollup = () => {
    emit('close')
}
const logout = () => {
    emit('logout')
}
onMounted(() => {
    if (pollup.value) {
        onClickOutside(pollup, (event) => (emit('close')));
    }
})

</script>

<style lang="less" scoped>
@import url(../styles/Pollup.less);
</style>