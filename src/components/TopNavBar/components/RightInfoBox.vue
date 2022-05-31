<template >
    <div class="right">
        <ul v-if="userinfo.id" class="icon-group">
            <li>
                <i class="iconfont icon-mail"></i>
            </li>
            <li>
                <i class="iconfont icon-shezhi "></i>
            </li>
            <li>
                <i class="iconfont icon-changyonggongneng"></i>
            </li>
        </ul>
        <p v-else>
            访客你好 去<RouterLink to="/login" style="color: rgb(124, 12, 226)">登录</RouterLink>
        </p>
        <div class="container" @mouseenter="infoShow = true" @mouseleave="infoShow = false">
            <div class="avatar">
                <img v-if="userinfo.id" :src="userinfo.avatar"
                    onerror="javascript:this.src='/src/assets/img/logo.png';" />
                <img v-else src="@/assets/img/logo.png" alt="占位图片" />
            </div>
            <transition name="toptodown" mode="out-in">
                <div v-show="infoShow" class="info-box">
                    <!-- 显示个人用户设置的背景图 -->
                    <div class="imgcontainer" :style="{
                        backgroundImage: `url(${userinfo.banner})`,
                    }"></div>
                    <div class="loginbox" v-if="userinfo.id">
                        <div class="up">
                            <div class="info">
                                <h2>{{ userinfo.nickname }}</h2>
                                <div>{{ userinfo.introduce }}</div>
                            </div>
                        </div>
                        <div class="button">
                            <ul>
                                <li @click="$router.push('/index/home')">
                                    <i class="iconfont icon-geren"></i>
                                    <span>个人中心</span>
                                </li>
                                <li @click="$router.push('/index/home')">
                                    <i class="iconfont icon-xihuan"></i>
                                    <span>我的收藏</span>
                                </li>
                                <li @click="$router.push('/index/home')">
                                    <i class="iconfont icon-edit"></i>
                                    <span>我的发布</span>
                                </li>
                                <li @click="$router.push('/index/home')">
                                    <i class="iconfont icon-shezhi"></i>
                                    <span>设置</span>
                                </li>
                                <li @click="logout">
                                    <i class="iconfont icon-close_circle"></i>
                                    退出登录
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="nologin" v-else>
                        喵~ 点击这里跳转
                        <RouterLink to="/login" style="color: rgb(124, 12, 226)">登录
                        </RouterLink>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>
<script setup lang="ts">
import { UserEasy } from '@/interface/user';
import { PropType } from 'vue';

const props = defineProps({
    userinfo: {
        type: Object as PropType<UserEasy>,
        default: () => { }
    }
})
const emit = defineEmits(['logout']);
let pollup = ref<HTMLElement | null>();
const logout = () => {
    emit('logout')
}
let infoShow = ref(false);
</script>


<style lang="less" scoped>
@import url(@/assets/styles/MyAnimate.less);
@media screen and(min-width:320px) {
    .right {
        display: none;
        justify-content: space-between;
        font-size: 1.5rem;
        align-items: center;
        position: relative;
        font-family: '幼圆', '微软雅黑';
        font-weight: 600;

        .icon-group {
            flex: 1;
            display: flex;
            margin-right: 20px;
            justify-content: space-around;

            li {
                cursor: pointer;
                transition: transform 0.8s cubic-bezier(0, .79, .16, .99);

                i {
                    font-size: 1.5rem;
                }

                &:hover {
                    transform: rotate(360deg);
                }
            }

        }

        .container {

            .avatar-info {
                position: absolute;
                z-index: 10;
                right: 20px;
                top: 30px;
            }

            .info-box {
                position: absolute;
                width: 100%;
                top: 100%;
                right: 0;
                display: flex;
                z-index: -1;
                background-color: rgb(255, 255, 255);
                box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.452);
                border-radius: 40px;
                overflow: hidden;
                background-size: 100% auto;
                border: #fff 5px solid;

                .imgcontainer {
                    position: absolute;
                    width: 100%;
                    height: 7rem;
                    z-index: -5;
                    opacity: 0.8;
                    filter: blur(1px) brightness(0.6);
                    background-size: cover;
                }

                .loginbox {
                    width: 100%;
                    display: flex;
                    color: rgb(250, 250, 250);
                    padding: 1rem 2rem;
                    font-size: 1rem;
                    flex-direction: column;
                    justify-content: flex-start;

                    .up {
                        display: flex;
                        justify-content: flex-start;
                        align-items: flex-start;
                        text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);

                        h2 {
                            margin: .5rem 0;
                            font-size: 1.6rem;
                        }
                    }

                    .button {
                        font-size: 1.5rem;
                        display: flex;
                        flex-direction: column;
                        color: black;
                        width: 100%;
                        margin-top: 1.5rem;
                        font-size: 1.4rem;
                        font-weight: 100;


                        li {
                            display: flex;
                            cursor: pointer;
                            margin: 10px 0px;

                            &:first-child {
                                margin-top: 10;
                            }

                            i {
                                font-size: 1.4rem;
                                margin-right: 10px;
                            }

                            &:last-child {
                                margin-top: 20px;
                                border-bottom: none;
                                color: red;
                                font-weight: 600;
                            }

                            &:hover {
                                text-shadow: 3px 3px 10px rgba(255, 80, 80, 0.3);
                            }

                            border-bottom: black 2px dashed;
                        }
                    }
                }

                .nologin {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100px;
                    color: gray;
                }
            }

            .avatar {
                width: 4.8rem;
                height: 4.8rem;
                border-radius: 50%;
                overflow: hidden;
                background-color: #fff;
                z-index: 9999;
                transition: all ease 0.4s;
                box-sizing: content-box;
                border: #fff 5px solid;

                img {
                    height: 100%;
                    width: 100%;
                    object-fit: cover;
                }
            }

            &:hover {
                .avatar {
                    transform: scale(1.2) translate(-20px, 30px);
                }
            }
        }
    }
}
@media screen and (min-width:992px) {
    .right {
        display: flex;
    }
}
</style>