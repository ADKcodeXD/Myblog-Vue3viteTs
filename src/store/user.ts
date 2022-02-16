import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            // 这里写变量
            userinfo: {
                id: '',
                username: '',
                avatar: '',
                role: ''
            }
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        // 这里写方法action
        setUser(user: any) {
            this.userinfo = user;
        }
    },
    getters: {
        //   getters
    }
})