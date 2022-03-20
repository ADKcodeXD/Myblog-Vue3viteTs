import { getArticleItem } from "@/api/article";
import { addComment, getComments } from "@/api/comment";
import { ArticleItemInfo } from "@/interface/article";
import { CommentItemInfo } from "@/interface/comment";
import {
    CommentParams,
    LikeOrCollectParams,
    PageParams,
} from "@/interface/params";
import { UserEasy } from "@/interface/user";
import { useUserStore } from "@/store/user";
import { getRealativeTime } from "@/utils/dayjs";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import _ from "lodash";
import { userCollect, userLike } from "@/api/user";

export const useArticle = () => {

    const route = useRoute();
    const userStore = useUserStore();

    // 定义所有使用到的变量
    let comment = ref("");
    const user = userStore.userinfo;
    let currentUser = reactive<UserEasy>({
        id: user.id,
        role: user.role,
        avatar: user.avatar,
        username: user.username,
        nickname: user.nickname,
        introduce: user.introduce,
        banner: user.banner,
    });
    let commentParams: CommentParams = reactive({
        articleId: route.params.id as string,
        authorId: currentUser.id,
        content: comment,
    });
    let article = ref<ArticleItemInfo>();
    let commentList = ref<CommentItemInfo[]>([]);

    // 计算属性 计算相对时间
    let time = computed(() => {
        article.value as ArticleItemInfo;
        if (article.value) {
            return getRealativeTime(article.value.createDate);
        }
    });

    // 方法区-----------------------
    // 发送一级评论
    const publishComment = async () => {
        if (commentParams.content != "") {
            const { data } = await addComment(commentParams);
            if (data.code === 200) {
                ElMessage.success("发布成功");
                comment.value = "";
                getAllComment();
            } else {
                ElMessage.error(data.msg);
            }
        } else {
            ElMessage.error("内容不能为空");
        }
    };
    // 获取文章
    const getArticle = async (id: any) => {
        const { data } = await getArticleItem(id);
        if (data.code === 200) {
            article.value = data.data;
        } else {
            ElMessage.error(data.msg);
        }
    };
    // 评论分页参数
    let pageparams: PageParams = reactive({
        page: 1,
        pagesize: 10,
    });
    // 获取评论
    const getAllComment = async () => {
        console.log(pageparams);
        const { data } = await getComments(route.params.id as string, pageparams);
        commentList.value = data.data;
    };
    // 滚动
    const body = ref<HTMLElement | null>();
    const goTop = () => {
        console.log(body.value?.scrollTop);
    };
    // 接受发送二级评论
    const publishSecond = () => {
        ElMessage.success("发送成功");
        getAllComment();
    };

    // loading
    let isLikedLoading = ref(false);
    let isCollectLoading = ref(false);
    // 喜欢文章
    const likedArticle = async () => {
        isLikedLoading.value = true;
        // 如果是登录状态下
        if (user.id) {
            let likedValue = !article.value?.isLiked;
            if (article.value) {
                let reqParams: LikeOrCollectParams = {
                    articleId: article.value.id,
                    flag: likedValue,
                };
                await userLike(reqParams);
                article.value.isLiked = likedValue;
            }
        } else {
            ElMessage.error("请先登录后点赞");
        }
        isLikedLoading.value = false;
    };

    // 收藏文章
    const collectArticle = async () => {
        isCollectLoading.value = true;
        if (user.id) {
            let collectValue = !article.value?.isCollected;
            if (article.value) {
                let reqParams: LikeOrCollectParams = {
                    articleId: article.value.id,
                    flag: collectValue,
                };
                await userCollect(reqParams);
                article.value.isCollected = collectValue;
            }
        } else {
            ElMessage.error("请先登录后收藏");
        }
        isCollectLoading.value = false;
    };
    // 函数加载 挂载组件
    onMounted(() => {
        if (user) {
            currentUser = user;
        }
        getArticle(route.params.id);
        getAllComment();
    });
    return {
        collectArticle,
        likedArticle,
        isLikedLoading,
        isCollectLoading,
        publishSecond,
        goTop,
        getAllComment,
        publishComment,
        time,
        article,
        commentList,
        currentUser,
        comment
    }
}