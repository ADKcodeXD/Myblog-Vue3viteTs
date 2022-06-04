import { getItem } from '@/utils/storage';
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: () => {
        return {
            // 这里写变量
            theme:getItem('themeName')
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        // 这里写方法action
        setTheme(theme: string) {
            this.theme = theme;
        }
    },
    getters: {
        //   getters
    }
})