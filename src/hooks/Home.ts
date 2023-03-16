import { currentUserAll, currentUserApi, updateUserInfoApi } from '@/api/user'
import { useUserStore } from '@/store/user'
import { ElMessage, ElForm } from 'element-plus'
import { validateEmail, validateJianjie, validateNickname } from '@/utils/validate'
const userStore = useUserStore()

export const useHomeIndex = () => {
  const formAllinfo = reactive<UpdateUserInfoParams>({
    email: '未设置',
    nickname: '',
    gender: '1',
    introduce: '',
    banner: '',
    avatar: ''
  })
  const currentUser = reactive<UserAll>({
    id: '',
    username: '',
    nickname: '',
    role: '',
    email: '',
    gender: '',
    date: '',
    banner: '',
    avatar: '',
    introduce: ''
  })
  const getAllinfo = async () => {
    const { data } = await currentUserAll()
    const obj = data.data
    const keys: any[] = Object.keys(currentUser)
    keys.forEach(key => {
      currentUser[key] = obj[key]
    })
    currentUser.gender = obj.gender.toString()
    formAllinfo.email = obj.email ? obj.email : '未设置'
    formAllinfo.gender = obj.gender ? obj.gender.toString() : '1'
    formAllinfo.introduce = obj.introduce
    formAllinfo.nickname = obj.nickname
  }

  const changeAvatar = (link: string) => {
    formAllinfo.avatar = link
    updateUserInfo()
  }

  const changeBanner = (bannerUrl: string) => {
    formAllinfo.banner = bannerUrl
    updateUserInfo()
  }
  //修改表单 的处理函数
  const changeInfo = async () => {
    await updateUserInfo()
    await getAllinfo()
    const { data } = await currentUserApi()
    userStore.setUser(data.data)
  }

  // 编辑资料完成 调用api修改资料
  const updateUserInfo = async () => {
    const { data } = await updateUserInfoApi(formAllinfo)
    if (data.code === 200) {
      ElMessage.success('修改成功')
    } else {
      ElMessage.error(data.msg)
    }
    getAllinfo()
  }
  // 组件加载
  onMounted(() => {
    getAllinfo()
  })

  return {
    changeInfo,
    updateUserInfo,
    changeBanner,
    changeAvatar,
    currentUser,
    formAllinfo
  }
}
export const useFormGroup = emit => {
  // 表单校验规则
  const rules = reactive({
    nickname: [{ required: true, validator: validateNickname, trigger: 'blur' }],
    email: [{ required: true, validator: validateEmail, trigger: 'blur' }],
    introduce: [{ required: true, validator: validateJianjie, trigger: 'blur' }]
  })
  // 控制表单编辑
  const isEdit = ref(false)
  // 获取表单实例
  type FormInstance = InstanceType<typeof ElForm>
  const formInstance = ref<FormInstance>()
  // 控制编辑资料
  const changeIsEdit = (val: boolean) => {
    isEdit.value = val
  }
  // 完成资料  获取表单 校验 发布
  const formSubmit = (formEl: FormInstance | undefined) => {
    if (!formEl) {
      return false
    }
    formEl.validate(async vaild => {
      if (vaild) {
        //校验成功 把修改好的值传出去
        isEdit.value = false
        emit('changeInfo')
      } else {
        ElMessage.error('请校验表单')
        return false
      }
    })
  }
  return {
    formSubmit,
    changeIsEdit,
    formInstance,
    rules,
    isEdit
  }
}
