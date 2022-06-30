<template>
    <div class="loading">
        <div class="loading-box" style="--i:1;"></div>
        <div class="loading-box" style="--i:2;"></div>
        <div class="loading-box" style="--i:3;"></div>
    </div>
</template>

<style lang="less" scopd>
@keyframes uptodown {
    0%,
    50%,
    100% {
        transform: translateY(0);
    }

    25% {
        transform: translateY(-15px);
    }

    75% {
        transform: translateY(15px);
    }
}
.loading{
    .flexbox(row);
    height: 100%;
}
.loading-box{
    .ball(1rem, #fc566c);
    margin: 1rem;
    animation: uptodown 1s linear calc(var(--i)*0.15s) infinite both;
}
</style>