import { getItem } from '@/utils/storage';
import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return{
        // 这里写变量
        user:{
          token:getItem("user")||""
        },
        cancel:{

        },
        sourcePage:[]
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    // 这里写方法action
    setCancel(cancelObj){
      this.cancel=cancelObj
    }
  },
  getters:{
    //   getters
  }
})