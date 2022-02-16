export const validateUsername = (rule: any, value: any, callback: any) => {
    value as string;
    let reg=new RegExp(/^[A-Za-z0-9]+/)
    if (value === '') {
      callback(new Error('请输入用户名'))
    } else if(value.length <6 || value.length >16) {
      callback(new Error('用户名长度需要在6-16位之间'))
    }else if(!reg.test(value)){
        callback(new Error('请输入无特殊符号的用户名'))
    }else{
        callback()
    }
  }
  export const validatePassword = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('请输入密码'))
    } else if (value.length<6||value.length>16) {
      callback(new Error("密码长度需要在6-16位之间"))
    } else {
      callback()
    }
  }
  