<template>
    <footer class="footer">
        <aside class="left">
            <p class="one">Adk-blog</p>
            <p class="two">仅供学习使用 本博客为个人用途 无任何盈利用途</p>
            <p class="three">备案/许可证编号：粤ICP备2022022555号</p>
        </aside>
        <address class="right">
            <p>本项目基于MIT Licence进行开源</p>
            <!-- <p>我的联系方式:790532173@qq.com</p> -->
            <p>项目地址:<a href="https://github.com/ADKcodeXD/Myblog-Vue3viteTs" target="_blank">Github</a></p>
            <p>Copyright © 2022 adkdream.top</p>
        </address>
    </footer>
</template>



<style lang="less" scoped>
@media screen and(min-width: @mobile-device) {
    .footer {
        width: 100%;
        display: flex;
        color: @textColor;
        padding: @padding-general;
        justify-content: center;
        text-align: center;
        align-items: center;
        flex-direction: column;
        background-color: @bgColor;
        flex-wrap: wrap;
        margin-top: 20px;
        .shadow(-1px, 2px);
        .font-normal();

        .one {
            font-size: @big-text;
        }

        .two {
            font-size: @small-text;
        }

        .three {
            font-size: @very-samll-text;
        }

        .right {
            flex-shrink: 0;
            font-size: @very-samll-text;
            text-align: center;
        }
    }
}
@media screen and(min-width: 460px) {
    .footer{
        justify-content: space-between;
        flex-direction: row;
        text-align: unset;
        .right{
            text-align: right;
        }
    }
}
@media screen and(min-width: @smallpc-device) {
    .footer{
        padding: 0.5rem 5rem;
    }
}
</style>