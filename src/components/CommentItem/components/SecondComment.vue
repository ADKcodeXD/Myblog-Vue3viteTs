<template >
    <div class="second-comment">
        <div class="user-avatar">
            <img :src="childrenItem.user.avatar" alt="" />
        </div>
        <div class="tw-w-full tw-flex tw-flex-col">
            <div class="username">
                <div class="username-time">
                    <h3>
                        {{ childrenItem.user.nickname }}
                        <div class="tag" v-if="childrenItem.user.id === authorId">
                            博主
                        </div>
                        <!-- 占位 以后接入等级系统可用 -->
                        <div class="tag tag2">
                            Lv1
                        </div>
                    </h3>
                </div>
                <p>{{ childrenItem.createDate }}</p>
            </div>
            <p class="content tw-flex-1"><span v-if="childrenItem.toUser.id !== parentUserId">回复给<span
                        class="tw-text-blue-500 tw-font-extrabold">@{{ childrenItem.toUser.nickname }} ：</span></span>{{
                                childrenItem.content
                        }}</p>
        </div>
    </div>
    <Reply :articleId="articleId" :commentInfo="childrenItem" @published="published" :parentId="parentId" />
</template>
<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
    childrenItem: {
        type: Object as PropType<CommentItemInfo>,
        default: () => { }
    },
    /**
     * 一级评论的评论id
     */
    parentId:{
        type: String,
        default: ""
    },
    /**
     * 一级评论的userid
     */
    parentUserId: {
        type: String,
        default: ""
    },
    /**
     * 文章作者的id
     */
    authorId: {
        type: String,
        default: ""
    },
    /**
     * 文章id 用于二级评论中
     */
    articleId: {
        type: String,
        default: ""
    }
})
const emit=defineEmits(['published']);
const published=()=>{
    emit('published')
}
</script>
<style lang="less" scoped>
@import url(../styles/CommentPublic.less);


.second-comment {
    display: flex;
    margin-top: 1rem;
    padding: 1rem;
    overflow: hidden;
    border-radius: 20px;

    .user-avatar {
        margin-right: 10px;
    }

    .content {
        margin: 0;
        font-size: 14px;
        color: rgb(0, 0, 0);
    }
}
</style>