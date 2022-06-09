<template>
    <div class="footer">
        <div class="left">
            <p class="one">Adk-blog</p>
            <p class="two">仅供学习使用 本博客为个人用途 无任何盈利用途</p>
            <p class="three">备案/许可证编号：粤ICP备2022022555号</p>
        </div>
        <div class="right">
            <p>本项目基于MIT Licence进行开源</p>
            <!-- <p>我的联系方式:790532173@qq.com</p> -->
            <p>项目地址:<a href="" target="_blank">Github</a></p>
            <p>Copyright © 2022 adkdream.top</p>
        </div>
    </div>
</template>



<style lang="less" scoped>
.footer {
    width: 100%;
    display: flex;
    color: @textColor;
    padding: 0.5rem 5rem;
    justify-content: space-between;
    align-items: center;
    background-color: @bgColor;
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
    .right{
        font-size: @very-samll-text;
        text-align: right;
    }
}
</style>