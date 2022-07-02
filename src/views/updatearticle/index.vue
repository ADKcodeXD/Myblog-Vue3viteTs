<template >
    <MyPageHeader class="header">
        编辑文章 {{ updateParam.articleName }}
    </MyPageHeader>
    <div class="edit" v-if="!isLoading">
        <el-alert :title="`本文使用了${isMarkdown ? 'Markdown' : '富文本'}编辑器进行编写，请注意编辑器的选择`" type="warning" effect="dark" />
        <input class="title" v-model="updateParam.articleName" />
        <div class="summary">
            <el-input v-model="updateParam.summary" autosize show-word-limit maxlength="80" type="textarea"
                placeholder="请输入摘要 不多于80字" />
        </div>
        <!-- 双重切换编辑器 -->
        <MyEditor @changeEditor="changeEditor" @changeContent="changeContent" @changeContentRich="changeContentRich"
            :default-editor="editorName" :saveContent="content" :saveContentRich="contentRich" />
        <div class="bottom">
            <div class="tag">
                <TagChoose :chooseOptions="canChooseTags" :choosedTag="tags" :canAdd="true" @addTag="addTagFn" />
                <div class="pannel">
                    <p class="label">板块选择</p>
                    <el-select v-model="updateParam.pannel" placeholder="选择板块">
                        <el-option v-for="item, index in 8" :key="item" :label="ArticlePannel[index]" :value="index" />
                    </el-select>
                </div>
            </div>
            <div class="banner">
                <p class="label">封面图片</p>
                <UploadImage :imglink="updateParam.banner" :max-h="200" @imglink="changeBanner" />
            </div>
            <div class="publish">
                <el-button type="primary" round size="large" class="submit-btn" @click="submitChange">
                    修改
                </el-button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { getArticleItem, updateMyArticle } from '@/api/article';
import { useEditor } from '@/hooks/useEdit';
import { useTag } from '@/hooks/useTag';
import { ArticlePannel } from '@/interface/EnumExport';
import { ElMessage, ElMessageBox } from 'element-plus';
const route = useRoute();
const router = useRouter();
const articleId = ref(route.params.id.toString());
const isMarkdown = ref(false);
const isLoading = ref(true);
const updateParam = reactive<ArticleReqParams>({
    body: {
        contentHtml: "",
        content: ""
    },
    summary: "",
    articleName: "",
    banner: "",
    tags: [],
    id: articleId.value,
    pannel: 0
});
const { changeEditor, changeContentRich, changeContent, editorName, content, contentRich } = useEditor();
const { tags, addTagFn, canChooseTags } = useTag();
// 获取文章
const getArticle = async () => {
    const { data } = await getArticleItem(articleId.value);
    isLoading.value = false;
    if (data.code === 200) {
        let article = data.data;
        if (article.body.content === "") {
            //如果content为空 可知这个内容是使用富文本编辑器编写的
            editorName.value = "tinymce";
            isMarkdown.value = false;
            contentRich.html = article.body.html;
            contentRich.text = article.body.html;
            content.html = article.body.html;
            content.text = article.body.html;
        } else {
            editorName.value = "markdown";
            isMarkdown.value = true;
            contentRich.html = article.body.html;
            contentRich.text = article.body.content;
            content.html = article.body.html;
            content.text = article.body.content;
        }
        updateParam.articleName = article.articleName;
        updateParam.summary = article.summary;
        updateParam.tags = article.tags;
        updateParam.banner = article.banner;
        tags.value = article.tags;
    } else {
        ElMessage.error(data.msg);
    }
};
getArticle();
const changeBanner = (val: string) => {
    updateParam.banner = val;
}
const confirm = (isMarkdown: boolean) => {
    ElMessageBox.confirm(
        `本文使用了${isMarkdown ? 'Markdown' : '富文本'}编辑器进行编写,检测到您修改了编辑器类型，是否要修改编辑器并提交？`,
        'Warning',
        {
            confirmButtonText: '直接提交',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {
            submit(isMarkdown ? 'rich' : 'markdown');
        })
}
const submitChange = () => {
    if (isMarkdown.value) {
        if (editorName.value !== "markdown") {
            confirm(isMarkdown.value);
        } else {
            submit('markdown')
        }
    } else {
        if (editorName.value !== "tinymce") {
            confirm(isMarkdown.value);
        } else {
            submit('rich')
        }
    }
}
const submit = async (type: 'rich' | 'markdown') => {
    if (type === 'rich') {
        updateParam.body.content = "";
        updateParam.body.contentHtml = contentRich.html;
    } else {
        updateParam.body.content = content.text;
        updateParam.body.contentHtml = content.html;
    }
    updateParam.tags = tags.value;
    await updateMyArticle(updateParam);
    ElMessage.success("修改成功");
    router.back();
}
</script>

<style lang="less" scoped>
@media screen and(min-width: @mobile-device) {
    .header {
        margin-top: 6.6rem;
    }
}

@media screen and(min-width: @smallpc-device) {
    .header {
        margin-top: @margin-general;
    }
}
.edit {
    display: flex;
    flex-direction: column;
    background-color: @bgColor;
    margin: @margin-general 0;
    padding: @padding-general;
    .border-normal();
    .font-normal();
    .title {
        .textShadow(1px, 5px, rgba(255, 255, 255, 0.452));
        background-color: rgba(255, 255, 255, 0.014);
        height: 48px;
        border: none;
        outline: none;
        width: 100%;
        font-size: 2.6rem;
        margin: @margin-general 0;
    }

    .summary {
        margin: @margin-general 0;

        :deep(.el-textarea) {
            .el-textarea__inner {
                min-height: 60px !important;
            }
        }
    }

    .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;

        .tag {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
        }

        .pannel {
            display: flex;

            .label {
                width: 100px;
            }
        }

        .publish {
            width: 100%;

            .el-button {
                width: 100%;
            }
        }

        .banner {
            width: 100%;
            display: flex;
            .font-normal();

            .label {
                flex-shrink: 0;
                margin-right: 20px;
            }
        }
    }
}
</style>