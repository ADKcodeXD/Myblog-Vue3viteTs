<template >
    <div class="container">
        <div class="top">
            <div class="title">友情链接</div>
            <p class="tip">需要申请友情链接的可以邮件我哦~ 790532173@qq.com</p>
        </div>
        <ElDivider />
        <div class="content">
            <div class="friendlink">
                <div class="left-image">
                    <MyElimage :img="Logo" :zip="2" />
                </div>
                <div class="info">
                    <div class="up">
                        <a href="https://adkdream.top" target="_blank" class="title">ADK-Blog 我的个人小站</a>
                        <p class="desc">一个基于Vue3和vite的动漫类博客网站 支持了动漫功能和一些其他功能</p>
                    </div>
                    <address class="tw-text-blue-400">地址:https://adkdream.top</address>
                </div>
            </div>
            <div class="friendlink">
                <div class="left-image">
                    <MyElimage img="https://www.crackingvip.xyz/wp-content/uploads/2022/06/Photo_1654586953819.png" :zip="2" />
                </div>
                <div class="info">
                    <div class="up">
                        <a href="https://www.crackingvip.xyz/" target="_blank" class="title">狐说社区</a>
                        <p class="desc">狐说社区是国内小众的资源分享社区,拥有,资源分享,次元阁,玩机,技术分享,游戏,音乐等,板块</p>
                    </div>
                    <address class="tw-text-blue-400">地址:https://www.crackingvip.xyz/</address>
                </div>
            </div>
        </div>
    </div>
</template>
<script  setup lang="ts">
import Logo from '@/assets/img/logo.png';
</script>
<style lang="less" scoped>
.container {
    display: flex;
    flex-direction: column;
    padding: @padding-general;
    background-color: @bgColor;
    margin: @margin-general 0;
    .font-normal();
    border-radius: @border-radius;
    min-height: 80vh;
    .shadow();
    .top {
        .title {
            font-size: @big-text;
        }
    }
    .content {
        display: flex;
        flex-wrap: wrap;
        .friendlink {
            margin: 5px;
            .border-normal();
            width: 24rem;
            height: 150px;
            .shadow();
            display: flex;
            overflow: hidden;
            padding:@padding-general ;
            .left-image {
                .ball(5rem, @bgColor);
                flex-shrink: 0;
            }

            .info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                .desc{
                    .text-line-show(4);
                }
                .title {
                    font-size: @big-text;
                    .text-line-show(2);
                }
            }
        }
    }
}

</style>