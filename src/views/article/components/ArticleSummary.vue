<template>
    <div class="article-author-info">
        <!-- 文章标题 -->
        <div class="article-title">
            <h2>{{ article.articleName }}</h2>
            <p><i class="iconfont icon-riqi"></i>发布于{{ article.createDate }}</p>
        </div>
        <!-- 作者部分 -->
        <div class="author">
            <div class="img">
                <MyElimage :img="article.authorVo.avatar" />
            </div>
            <div class="author-info">
                <p class="author-name">{{ article.authorVo.nickname }}</p>
                <p class="introduce">{{ article.authorVo.introduce }}</p>
            </div>
        </div>
        <!-- icon group 文章点赞等信息 -->
        <ul class="icongroup">
            <li><i class="iconfont icon-yanjing"></i>{{ article.viewCounts }}</li>
            <li><i class="iconfont icon-good"></i>{{ article.likeCounts }}</li>
            <li><i class="iconfont icon-changyonggongneng"></i>{{ article.collectCounts }}</li>
            <li><i class="iconfont icon-pinglun"></i>{{ article.commentCounts }}</li>
        </ul>
        <div class="summary">
            <i class="summary-yinhao">“</i>
            <p class="summary-content">
                引言:{{ article.summary }}
            </p>
        </div>
        <div class="tip">
            <p>本文大概字数为：{{ word }}字，
                看完大概需要{{ needMin }}分钟</p>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useArticle } from '@/hooks/Article';
import { PropType } from 'vue';

const props = defineProps({
    article: {
        type: Object as PropType<ArticleItemInfo>,
        default: () => { }
    }
})
const word = computed(() => {
    if (props.article.body.content && props.article.body.content.length != 0) {
        return props.article.body.content.length
    } else {
        return props.article.body.html.length
    }
})
const needMin = computed(() => {
    if (props.article.body.content && props.article.body.content.length != 0) {
        return Math.round(props.article.body.content.length / 360)
    } else {
        return Math.round(props.article.body.html.length / 360)
    }
})
</script>

<style lang="less" scoped>
.article-author-info {
    display: flex;
    flex-direction: column;
    font-family: 'Thinfont', '幼圆';
    align-items: center;
    font-weight: 600;
    padding: 5px;

    .article-title {
        font-size: 28px;
        margin: 10px 0;
        text-align: center;

        p {
            font-size: 16px;
            margin: 5px 0;
        }
    }

    .author {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-color: rgb(@primaryBackGroundColor);
            object-fit: cover;
            border: 5px solid black;
            overflow: hidden;
            margin: 5px 0;
        }

        .author-info {
            display: flex;
            flex-direction: column;
            align-items: center;

            .author-name {
                font-size: 22px;
                font-weight: 600;
            }

            .introduce {
                font-size: 16px;
                color: rgb(179, 179, 179);
            }
        }
    }

    .summary {
        position: relative;
        padding: 0 20px;
        margin: 30px 0;
        align-self: flex-start;

        .summary-yinhao {
            font-size: 200px;
            margin: 0;
            top: -100px;
            opacity: 0.5;
            position: absolute;
            color: rgb(160, 160, 160);
            z-index: 0;
        }

        .summary-content {
            color: black;
            font-size: 18px;

            &::first-letter {
                font-size: 22px;
            }
        }
    }

    .icongroup {
        display: flex;
        margin: 10px 0;

        .iconfont {
            font-size: 24px;
        }

        li {
            margin: 0px 20px;
            font-size: 20px;
        }
    }

    .tip {
        padding: 0 20px;
        align-self: flex-start;
    }
}
</style>