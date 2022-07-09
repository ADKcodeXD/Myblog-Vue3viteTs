import { addMessageApi, getMessageApi } from '@/api/message';
import { useUserStore } from '@/store/user';
import { ElMessage, ElScrollbar } from 'element-plus';
import { Ref } from 'vue';
import Logo from '@/assets/img/logo.png';
import { decodeEmoji, encodeEmoji } from '@/utils/emoji';
export const useMessageBoardParams = () => {
  const userinfo = useUserStore();
  const messageParams: MessageParamsForADK = reactive({
    authorName: '',
    contact: '',
    content: '',
    avatar: userinfo.userinfo.avatar
  });
  const pageparams = reactive<PageParams>({ page: 1, pagesize: 10 });
  const messageList = ref<MessageVo[]>();
  const total = ref(0);

  return { messageParams, pageparams, messageList, total };
};

export const useMessageApi = (
  messageParams: MessageParamsForADK,
  pageparams: PageParams,
  messageList: Ref<MessageVo[]>,
  total: Ref<number>
) => {
  // 方法和逻辑区
  const orderRole = ref(0);
  const body = ref<InstanceType<typeof ElScrollbar>>();
  const getMessage = async (pageparams: PageParams) => {
    const { data } = await getMessageApi(pageparams);
    total.value = data.data.length;
    messageList.value = data.data.results;
  };
  // 留言的逻辑
  const publishMessage = async () => {
    if (!messageParams.content) {
      ElMessage.error('内容不能为空');
      return false;
    } else if (!messageParams.authorName) {
      ElMessage.error('请输入昵称');
      return false;
    }
    if (!messageParams.avatar) {
      messageParams.avatar = Logo;
    }
    messageParams.content = encodeEmoji(messageParams.content);
    const { data } = await addMessageApi(messageParams);
    if (data.code == 200) {
      ElMessage.success('发表成功');
    } else {
      ElMessage.error(data.msg);
    }
    // 清空留言框
    messageParams.content = '';
    messageParams.authorName = '';
    messageParams.avatar = Logo;
    messageParams.contact = '';
    pageparams.page = 1;
    getMessage(pageparams);
  };
  // 排序方法
  const order = (val: number) => {
    if (orderRole.value === val) {
      return;
    } else if (val === 1) {
      pageparams.orderRole = 'a';
      orderRole.value = 1;
    } else if (val === 2) {
      pageparams.orderRole = undefined;
      orderRole.value = 2;
    }
    getMessage(pageparams);
  };
  // 控制滚动条
  const changePage = () => {
    getMessage(pageparams);
    body.value?.setScrollTop(0);
  };
  onMounted(() => {
    getMessage(pageparams);
  });
  return {
    getMessage,
    publishMessage,
    order,
    changePage,
    body,
    orderRole
  };
};

export const useChangeParams = (
  messageParams: MessageParamsForADK,
  messageList: Ref<MessageVo[]>
) => {
  // 排序规则
  const changeAvatarParams = (val: string) => {
    messageParams.avatar = val;
  };
  const changeMsg = (val: string) => {
    messageParams.content = val;
  };
  const toCommentItem = computed(() => {
    const newCommentList = ref<CommentItemInfo[]>();
    newCommentList.value = messageList.value.map(item => {
      const obj = {
        content: decodeEmoji(item.content),
        contact: item.contact,
        nickname: item.authorName,
        createDate: item.createDate,
        id: item.id,
        avatar: item.avatar
      };
      return obj;
    });
    return newCommentList.value;
  });
  return { changeAvatarParams, changeMsg, toCommentItem };
};
