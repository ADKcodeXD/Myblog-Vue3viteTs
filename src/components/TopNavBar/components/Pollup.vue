<template >
    <div class="pollup" ref="pollup">
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
    </div>
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
@media screen and (min-width:320px) {

    // 移动端弹出层样式
    .pollup {
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        transition: all 0.3s ease;
        width: 60%;
        height: 100%;
        color: rgb(0, 0, 0);
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
        background-color: rgb(@primaryBackGroundColor);
        // 右上角的关闭键
        .out {
            position: absolute;
            z-index: 5;
            cursor: pointer;
            font-size: 2rem;
            width: 3rem;
            height: 3rem;
            display: flex;
            align-items: center;
            justify-content: center;
            right: 8px;
            top: 5px;
            color: rgb(255, 255, 255);
            background-color: rgb(243, 45, 45);
            border-radius: 50%;
        }

        .right {
            justify-content: space-between;
            color: rgb(@primaryTextColor);
            font-size: 1.4286rem;
            align-items: center;
            position: relative;

            // 头像以及个人信息
            .container {
                .info-box {
                    width: 100%;
                    position: relative;
                    height: 14rem;
                    display: flex;
                    align-items: center;
                    // box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.3);
                    background-size: 100% auto;

                    .imgcontainer {
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        z-index: -5;
                        opacity: 0.8;
                        filter: blur(1px) brightness(0.6);
                        background-size: cover;
                    }

                    .loginbox {
                        width: 100%;
                        display: flex;
                        color: rgb(@primaryTextColor);
                        padding: .7143rem 0;
                        color: #fff;
                        // text-shadow: 1px 1px 5px rgba(0, 0, 0, 0.4);
                        flex-direction: column;
                        justify-content: space-between;

                        .up {
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            text-align: center;
                            align-items: center;
                            padding: 0 1rem;

                            .avatar {
                                flex-shrink: 0;
                                width: 7rem;
                                height: 7rem;
                            }

                            h2 {
                                margin: .7143rem 0;
                                font-size: 2rem;
                            }
                        }

                    }

                }

                .avatar {
                    width: 5.2143rem;
                    height: 5.2143rem;
                    border-radius: 50%;
                    overflow: hidden;
                    background-color: #fff;
                    z-index: 2;
                    transition: all ease 1s;

                    img {
                        height: 100%;
                        width: 100%;
                        object-fit: cover;
                    }
                }
            }
        }

        .menu-list {
            display: flex;
            flex-direction: column;
            margin-top: 30px;
            font-size: 1.5rem;
            font-weight: 600;

            a {
                padding: 10px;
                // background-color: rgb(255, 210, 210);
                cursor: pointer;
                display: flex;
                align-items: center;

                &:active {
                    background-color: rgb(@primaryActiveColor);
                }
            }
        }

        .button-login {
            display: flex;
            flex-direction: column;
            padding: 8px;

            .el-button {
                margin: 0;
                height: 4rem;
                margin-top: 2rem;
            }
        }
    }
}
@media  screen and (min-width: 640px) { 
  .up {
    flex-direction:row !important;
    text-align: start;
  }
}
@media  screen and (min-width: 1024px){
    .pollup{
        display: none;
    }
}
</style>