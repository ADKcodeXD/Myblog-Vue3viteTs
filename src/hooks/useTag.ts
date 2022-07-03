import { getTagList, addTag } from '@/api/article';
import { ElMessage } from 'element-plus';

export const useTag = () => {
  // 选择tag
  const tags = ref<Tag[]>([]);
  const options = ref<Tag[]>([]);
  const getTag = async () => {
    const { data } = await getTagList();
    if (data.code === 200) {
      options.value = data.data;
    } else {
      console.log('error');
    }
  };
  const addTagFn = async (val: string) => {
    // 接口 调用 添加tag
    await addTag(val);
    ElMessage.success('成功');
    getTag();
  };
  // 计算属性  移除已选择标签
  const canChooseTags = computed(() => {
    return options.value.filter(item => {
      let flag = true;
      tags.value.forEach(tag => {
        if (tag.id === item.id) flag = false;
      });
      return flag;
    });
  });
  onMounted(() => {
    getTag();
  });
  return {
    tags,
    options,
    getTag,
    addTagFn,
    canChooseTags
  };
};
