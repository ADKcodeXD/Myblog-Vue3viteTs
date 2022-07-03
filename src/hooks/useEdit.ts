import { ElInput, ElMessage, ElNotification, UploadProps } from 'element-plus';
import { getItem, removeItem, setItem } from '@/utils/storage';
import { ref, reactive, onBeforeMount, onUnmounted, Ref } from 'vue';
import { publishArticle } from '@/api/article';
import { useStore } from '@/store/main';
export const useEditor = () => {
  // 存放两种内容的地方
  const content = reactive<Content>({ html: '', text: '' });
  const contentRich = reactive<Content>({ html: '', text: '' });
  // 读取子组件是否更改编辑器类型
  const editorName = ref('tinymce');
  // v-model 动态更改编辑器内容
  const changeContent = (val: Content) => {
    content.html = val.html;
    content.text = val.text;
  };
  const changeContentRich = (val: Content) => {
    contentRich.html = val.html;
    contentRich.text = val.text;
  };
  const changeEditor = (val: string) => {
    editorName.value = val;
  };
  // 加载 包括本地存储
  onBeforeMount(() => {
    const a = getItem('temp');
    if (a) {
      if (a.rich) {
        contentRich.html = a.rich.html;
        contentRich.text = a.rich.text;
      }
      if (a.markdown) {
        content.html = a.markdown.html;
        content.text = a.markdown.text;
      }
    }
  });
  return {
    changeEditor,
    changeContentRich,
    changeContent,
    editorName,
    content,
    contentRich
  };
};

export const useAddtag = (emit: any) => {
  // 动态增加标签
  const inputVisible = ref(false);
  const inputValue = ref('');
  const inputref = ref<InstanceType<typeof ElInput>>();
  const showInput = () => {
    inputVisible.value = true;
    // 由于dom还没渲染 在下一个异步任务队列当中 nexttick直接
    // 跳到下一个异步任务
    nextTick(() => {
      inputref.value!.input!.focus();
    });
  };
  // 添加标签触发的事件
  const handleInputConfirm = async () => {
    if (inputValue.value) {
      if (inputValue.value.length > 8) {
        ElMessage.error('标签长度不能太长');
      } else {
        emit('addTag', inputValue.value);
      }
    }
    inputVisible.value = false;
    inputValue.value = '';
  };
  return {
    inputVisible,
    inputValue,
    inputref,
    showInput,
    handleInputConfirm
  };
};
/**
 *
 * @param editorName 当前编辑器的名字 是一个ref对象
 * @param imglink ref的图片链接
 * @param contentRich 富文本编辑器的内容
 * @param content markdown编辑器内容
 * @param tags ref 的Tag[]数组
 * @returns
 */
export const useArticleSubmit = (
  editorName: Ref<string>,
  imglink: Ref<string>,
  contentRich: Content,
  content: Content,
  tags: Ref<Tag[]>
) => {
  const store = useStore();
  const router = useRouter();
  // elm input
  const summary = ref('');
  const title = ref('这里输入标题');
  const styleChange = ref(false);
  const pannel = ref(0);
  // 提交逻辑
  const submitArticle = async () => {
    if (!store.user.token) {
      ElMessage.error('您当前未登录，请登录后重试');
      return;
    } else {
      // 已登录状态下 校验标题和摘要或者标题是否为空还有是否选中标签
      if (!summary.value) {
        ElMessage.error('请输入摘要');
        return;
      } else if (editorName.value === 'tinymce' ? !contentRich.html : !content.html) {
        ElMessage.error('请输入正文');
        return;
      } else if (!title.value) {
        ElMessage.error('请输入标题');
        return;
      } else if (!tags.value || tags.value.length === 0) {
        ElMessage.error('请选择标签');
        return;
      } else if (!imglink.value) {
        ElMessage.error('请上传头图哦');
        return;
      }
      // 创建一个请求参数体
      const articleReqParams: ArticleReqParams = {
        body: {
          contentHtml: '',
          content: ''
        },
        summary: '',
        articleName: '',
        tags: [],
        banner: '',
        pannel: pannel.value
      };

      // 赋值
      if (editorName.value === 'tinymce') {
        // 不改表结构的情况下 让markdown存入contentHtml中 后续渲染可以直接不用动态切换
        articleReqParams.body.content = contentRich.text;
        articleReqParams.body.contentHtml = contentRich.html;
      } else {
        articleReqParams.body.content = content.text;
        articleReqParams.body.contentHtml = content.html;
      }
      articleReqParams.summary = summary.value;
      articleReqParams.tags = tags.value;
      articleReqParams.articleName = title.value;
      articleReqParams.banner = imglink.value;
      // 请求
      const { data } = await publishArticle(articleReqParams);
      removeItem('temp');
      ElMessage.success('发布成功 2s后跳转文章');
      content.html = '';
      setTimeout(() => {
        router.push(`/article/${data.data.id}`);
      }, 2000);
    }
  };
  return {
    submitArticle,
    styleChange,
    summary,
    title,
    pannel
  };
};

export const useSave = (content: Content, contentRich: Content) => {
  // 自动保存定时器
  const save = () => {
    if (content.html) {
      setItem('temp', {
        rich: contentRich,
        markdown: content
      });
      ElNotification({ title: '自动保存成功', message: '已保存到本地存储', type: 'success' });
    }
  };
  // 2分钟自动保存一次 设置定时器
  const saveTemp = setInterval(save, 120000);
  onUnmounted(() => {
    clearInterval(saveTemp);
  });
};
