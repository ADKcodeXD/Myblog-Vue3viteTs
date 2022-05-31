<template >
    <!-- 左边 -->
    <div class="my-info-easy">
        <!-- icon 头像 -->
        <div class="avatar">
            <UploadAvatar @changeAvatar="changeAvatar" :is-show="false" :avatar="currentUser.avatar" />
        </div>
        <div class="infobox">
            <!-- 用户名 -->
            <div class="username">
                {{ currentUser.nickname }}
                <i class="iconfont icon-nansheng" v-if="currentUser.gender === '1'"></i>
                <i class="iconfont icon-nvsheng" v-else></i>
            </div>
            <!-- 介绍 -->
            <div class="introuce">{{ currentUser.introduce }}</div>
            <!-- emil 性别 等 -->
            <div class="more-info">
                <div class="email">
                    <i class="iconfont icon-riqi"></i>创建日期:{{ currentUser.date }}
                </div>
                <div class="email">
                    <i class="iconfont icon-youjian"></i>邮件:{{
                            currentUser.email ? currentUser.email : "未设置"
                    }}
                </div>
                <div class="email">
                    <i class="iconfont icon-gerenzhongxin"></i>用户名:{{
                            currentUser.username
                    }}
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { UserAll } from '@/interface/user';
import { PropType } from 'vue';

const props = defineProps({
    currentUser: {
        type: Object as PropType<UserAll>,
        default: {}
    }
})
const emit = defineEmits(['changeAvatar']);

const changeAvatar = (url: string) => {
    emit('changeAvatar', url)
}

</script>


<style lang="less">
@media screen and(min-width:320px) {
    .my-info-easy {
        padding: 20px;
        display: flex;
        width: 100%;
        flex-shrink: 0;
        align-items: center;
        flex-direction: row;

        .avatar {
            width: 150px;
            height: 150px;
        }

        .infobox {
            width: 100%;
            text-align: left;
            padding-left: 20px;
            margin-top: 10px;
            flex: 1;

            .username {
                font-size: 30px;
                display: -webkit-box;
                text-overflow: ellipsis;
                overflow: hidden;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;

                .iconfont {
                    font-size: 26px;
                    transform: translateY(-10px);
                    margin-left: 10px;
                }
            }

            .introuce {
                margin-top: 10px;
                font-size: 14px;
            }

            .more-info {
                i {
                    margin-right: 2px;
                }

                margin-top: 10px;
                font-size: 16px;
                line-height: 30px;
            }
        }
    }
}

@media screen and(min-width: 960px) {
    .my-info-easy {
        flex-direction: column;
        width: 26%;

        .avatar {
            width: 200px;
            height: 200px;
        }
    }

}
</style>