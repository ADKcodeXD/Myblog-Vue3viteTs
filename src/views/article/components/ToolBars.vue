<template >
    <div class="toolbars">
        <ul>
            <li @click="likeEvent" :class="{ active: article.isLiked }"><i class="iconfont icon-good"></i></li>
            <li @click="collectEvent" :class="{ active: article.isCollected }"><i
                    class="iconfont icon-changyonggongneng"></i></li>
            <li @click="toComment"><i class="iconfont icon-pinglun"></i></li>
            <li @click="top"><i class="iconfont icon-huidaodingbu"></i></li>
        </ul>
    </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
    article: {
        type: Object as PropType<ArticleItemInfo>,
        default: () => { }
    },
})
const emit = defineEmits(['likeArticle', 'collectArticle', 'toComment']);
const likeEvent = () => {
    emit('likeArticle')
}
const collectEvent = () => {
    emit('collectArticle')
}
const top = () => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
};
const toComment = () => {
    emit('toComment')
}
</script>
<style lang="less" scoped>
@media screen and(min-width:320px) {
    .toolbars {
        position: fixed;
        bottom: 20px;
        right: 5%;
        z-index: 10;
        width: 0;
        height: 0;
        ul {
            display: flex;
            flex-direction: column;
            li {
                .ball(4.5rem, rgb(255, 255, 255));
                .flexbox(row);
                cursor: pointer;
                margin: 5px;
                box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);

                &:active {
                    background-color: orange;
                    color: white;
                }

                &:hover {
                    background-color: orange;
                    color: white;
                }

            }

            .active {
                background-color: orange;
                color: white;
                box-shadow: 2px 2px 5px rgba(250, 21, 71, 0.171);
            }
        }
    }
}
@media screen and (min-width:992px) {
    .toolbars{
        position: fixed;
        top: 20px;
        left: 16%;
    }
}
</style>