export const validateUsername = (rule: any, value: any, callback: any) => {
  value as string
  const reg = new RegExp(/^[A-Za-z0-9]+/)
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if (value.length < 6 || value.length > 16) {
    callback(new Error('用户名长度需要在6-16位之间'))
  } else if (!reg.test(value)) {
    callback(new Error('请输入无特殊符号的用户名'))
  } else {
    callback()
  }
}
export const validatePassword = (rule: any, value: any, callback: any) => {
  const reg = new RegExp(/[a-zA-Z0-9!?.]+/)
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (value.length < 6 || value.length > 16) {
    callback(new Error('密码长度需要在6-16位之间'))
  } else if (!reg.test(value)) {
    callback(new Error('密码中不能包含除了!?.之外的特殊符号'))
  } else {
    callback()
  }
}
export const validateNickname = (rule: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error('请取一个名字吧~'))
  } else if (value.length < 2 || value.length > 16) {
    callback(new Error('昵称不要太长也别短哦~'))
  } else {
    callback()
  }
}

export const validateJianjie = (rule: any, value: any, callback: any) => {
  if (value.length === 0) {
    callback(new Error('请用一句话描述一下自己哦~'))
  } else if (value.length < 2 || value.length > 32) {
    callback(new Error('一句话就好 不要多也不要少 ~'))
  } else {
    callback()
  }
}

export const validateEmail = (rule: any, value: any, callback: any) => {
  const reg = new RegExp(/[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+/)
  if (value.length === 0) {
    callback(new Error('可以告诉我你的邮箱吗~'))
  } else if (value.length < 5 || value.length > 64) {
    callback(new Error('你的邮箱长度有点问题~'))
  } else if (!reg.test(value)) {
    callback(new Error('可以输入正确的邮箱格式吗~'))
  } else {
    callback()
  }
}
