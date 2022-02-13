import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return{
        // 这里写变量
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    // 这里写方法action
  },
  getters:{
    //   getters
  }
})