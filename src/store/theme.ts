import { Theme } from '@/interface/theme.type';
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: () => {
        return {
            // 这里写变量
            themeConfig: {
                primaryBackGroundColor: '',
                primaryTextColor: '',
                primaryActiveColor:'',
                primaryTipColor:'',
                primaryTagTextColor:'',
                primarySubColor:'',
                primaryTagBackGroundColor:''
            }
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        // 这里写方法action
        setTheme(theme: Theme) {
            this.themeConfig = theme;
        }
    },
    getters: {
        //   getters
    }
})