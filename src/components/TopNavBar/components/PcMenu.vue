<template >
    <div class="menu">
        <ul class="menu-list">
            <li @click="$router.push('/index')">
                <a>首页</a>
                <span>Index</span>
            </li>
            <li @click="$router.push('/index/articlelist')">
                <a>文章</a>
                <span>Article</span>
            </li>
            <li @click="$router.push('/index/messageboard')">
                <a>留言板</a>
                <span>Message</span>
            </li>
            <li @click="$router.push('/index/anime')">
                <a>动漫</a>
                <span>Anime</span>
            </li>
            <li @click="$router.push('/index/edit')">
                <a>我也要写</a>
                <span>Edit</span>
            </li>
        </ul>
    </div>
</template>
<style lang="less" scoped>
@import url(../styles/PcMenu.less);
</style>