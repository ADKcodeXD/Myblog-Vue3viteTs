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
            <li>
                <router-link to="/index/picture" v-show="false">首页</router-link>
                <el-dropdown>
                    <p>更多</p>
                    <span>More</span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>
                                <div class="tw-flex tw-justify-between tw-items-center" @click="$router.push('/index/picture')">
                                    <SvgIcon name="tupian" class="tw-w-8 tw-h-8 tw-mr-2" />
                                    <p >画廊</p>
                                </div>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <div class="tw-flex tw-justify-between tw-items-center"  @click="$router.push('/index/aboutme')">
                                    <SvgIcon name="yonghu" class="tw-w-8 tw-h-8 tw-mr-2" />
                                    <p >关于我</p>
                                </div>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <div class="tw-flex tw-justify-between tw-items-center" @click="$router.push('/index/friendslink')" >
                                    <SvgIcon name="link" class="tw-w-8 tw-h-8 tw-mr-2" />
                                    <p >友链</p>
                                </div>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </li>
        </ul>
    </nav>
</template>
<style lang="less" scoped>
@import url(../styles/PcMenu.less);
</style>