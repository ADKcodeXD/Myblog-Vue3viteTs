<template >
    <nav class="menu">
        <ul class="menu-list">
            <li @click="$router.push('/index')">
                <router-link to="/index" v-show="false">首页</router-link>
                <p>首页</p>
                <span>Index</span>
            </li>
            <li @click="$router.push('/index/articlelist')">
                <router-link to="/index/articlelist" v-show="false">首页</router-link>
                <p>文章</p>
                <span>Article</span>
            </li>
            <li @click="$router.push('/index/messageboard')">
                <router-link to="/index/messageboard" v-show="false">首页</router-link>
                <p>留言板</p>
                <span>Message</span>
            </li>
            <li @click="$router.push('/index/anime')">
                <router-link to="/index/anime" v-show="false">首页</router-link>
                <p>动漫</p>
                <span>Anime</span>
            </li>
            <li @click="$router.push('/index/edit')">
                <router-link to="/index/edit" v-show="false">首页</router-link>
                <p>写文</p>
                <span>Edit</span>
            </li>
            <li @click="$router.push('/index/aboutme')">
                <router-link to="/index/aboutme" v-show="false">首页</router-link>
                <p>关于我</p>
                <span>About ME</span>
            </li>
            <li @click="$router.push('/index/picture')">
                <router-link to="/index/picture" v-show="false">首页</router-link>
                <p>画廊</p>
                <span>Picture</span>
            </li>
        </ul>
    </nav>
</template>
<style lang="less" scoped>
@import url(../styles/PcMenu.less);
</style>