<template >
    <div class="detail">
        <div class="bottom-text">
            <div class="left">
                <p class="red">未经作者允许 禁止转载</p>
            </div>
        </div>
        <div class="tags">
            <TagItem v-for="tag in article.tags" :key="tag.id" :tagId="tag.id" :tagName="tag.tagName" />
        </div>
        <div class="good">
            <!-- 点赞部分 -->
            <i class="iconfont icon-good" :class="{ active: article.isLiked }" @click="likeEvent"><span
                    v-if="!article.isLiked">点赞</span><span v-else>已点赞</span></i>
            <i class="iconfont icon-changyonggongneng" :class="{ active: article.isCollected }"
                @click="collectEvent"><span v-if="!article.isCollected">收藏</span><span v-else>已收藏</span></i>
        </div>
    </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';
const props=defineProps({
    article:{
        type:Object as PropType<ArticleItemInfo>,
        default:()=>{}
    },
})
const emit=defineEmits(['likeArticle','collectArticle']);
const likeEvent=()=>{
    emit('likeArticle')
}
const collectEvent=()=>{
    emit('collectArticle')
}
</script>

<style lang="less" scoped>
@media screen and (min-width:320px) {
    .detail {
        display: flex;
        flex-direction: column;
        .good {
            display: flex;
            align-self: center;
            justify-content: space-between;
            width: 30rem;
            padding: 20px;
            i {
                cursor: pointer;
                .ball(8rem,#fff);
                .flexbox(column);
                transition: 0.4s all ease;
                box-shadow: 2px 2px 5px rgba(0,0,0,0.4);
                &:active {
                    background-color: orange;
                    color: white;
                }
            }
        }
        .bottom-text {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .tags {
            margin: 20px 0;
        }
    }
}

@media screen and(min-width: 992px) {
    .detail {
        .good {
            i {
                width: 5rem;
                height: 5rem;

                &:hover {
                    background-color:orange;
                    color: white;
                }
            }
        }
    }
}
</style>