import { getSearchTipApi, getTagListApi } from '@/api/article'
import { ElMessage } from 'element-plus'

export const useArticleListSearch = (props, emit) => {
  const searchByKeyword = async () => {
    if (props.pageParams.keyword) {
      // await getArticle();
      emit('changeKeyword')
    }
  }
  // 为空时 直接获取原来的结果
  const nullSearch = (val: string | number) => {
    if (!val) {
      props.pageParams.keyword = undefined
      // getArticle();
      emit('changeKeyword')
    }
  }
  // 搜索建议
  const querySearchAsync = (val: string, cb: (arg: any) => void) => {
    getSearchTipApi(val)
      .then(({ data }) => {
        const results = data.data
        cb(results)
      })
      .catch(err => {
        ElMessage.error(err)
      })
  }
  // 自动填充
  const handleSelect = (val: any) => {
    props.pageParams.keyword = val.articleName
  }
  return { handleSelect, querySearchAsync, nullSearch, searchByKeyword }
}

export const useArticleListConditional = (props, emit) => {
  const time = ref<Date>()
  const tagTotal = ref<number>(0)
  const currentOrder = ref(0)
  const chooseTag = ref<Tag[]>([])
  // tag的pageparams
  const tagPageParams: PageParams = reactive({ page: 1, pagesize: 5 })
  const tagloading = ref(false)
  const options = ref<Tag[]>([])
  // ids 存放列表
  const currentTagIds = ref<Array<number>>([])
  const route = useRoute()
  // 排序规则
  const order = (val: string, num: number) => {
    currentOrder.value = num
    if (val !== 'null') {
      props.pageParams.orderRole = val
      props.pageParams.page = 1
    } else {
      props.pageParams.orderRole = undefined
      props.pageParams.page = 1
    }
    emit('changeConditional')
  }
  const getTagId = (tag: Tag) => {
    if (currentTagIds.value.includes(tag.id)) {
      currentTagIds.value.splice(currentTagIds.value.indexOf(tag.id), 1)
      chooseTag.value = chooseTag.value.filter(item => {
        return item.id !== tag.id
      })
    } else {
      currentTagIds.value.push(tag.id)
      chooseTag.value?.push(tag)
    }
    // 如果没有tag  发送一个 undefined
    if (currentTagIds.value.length === 0) props.pageParams.tagIds = undefined
    else props.pageParams.tagIds = currentTagIds.value
    emit('changeConditional')
  }
  // 年月日
  const pickDate = (date: Date) => {
    if (date) {
      props.pageParams.year = date.getFullYear().toString()
      props.pageParams.month = (date.getMonth() + 1).toString()
    } else {
      props.pageParams.year = undefined
      props.pageParams.month = undefined
    }
    emit('changeConditional')
  }
  // 获取tag api
  const getTag = async () => {
    tagloading.value = true
    const { data } = await getTagListApi(tagPageParams)
    if (data.code === 200) {
      options.value = data.data.results
      tagTotal.value = data.data.length
    } else {
      console.log('error')
    }
    tagloading.value = false
  }
  // 获取tag 下一页
  const changeTag = () => {
    if (tagPageParams.page == Math.ceil(Math.ceil(tagTotal.value / tagPageParams.pagesize))) {
      tagPageParams.page = 1
    } else {
      tagPageParams.page++
    }
    getTag()
  }

  // 监视时间的改变并发送请求
  watch(time, (newValue: Date | undefined) => {
    if (newValue) {
      props.pageParams.year = newValue.getFullYear().toString()
      props.pageParams.month = (newValue.getMonth() + 1).toString()
    } else {
      props.pageParams.year = undefined
      props.pageParams.month = undefined
    }
    emit('changeConditional')
  })
  onActivated(() => {
    if (route.query.tagId && route.query.tagName) {
      try {
        currentTagIds.value.push(Number(route.query.tagId))
        chooseTag.value.push({
          id: Number(route.query.tagId),
          tagName: route.query.tagName.toString()
        })
        props.pageParams.tagIds = currentTagIds.value
      } catch (error) {
        ElMessage.error('查询出错')
      }
    }
  })
  onDeactivated(() => {
    chooseTag.value = []
    currentTagIds.value = []
  })
  onMounted(() => {
    getTag()
  })
  return {
    changeTag,
    pickDate,
    getTagId,
    order,
    chooseTag,
    tagPageParams,
    time,
    tagTotal,
    currentTagIds,
    options,
    tagloading,
    currentOrder
  }
}
