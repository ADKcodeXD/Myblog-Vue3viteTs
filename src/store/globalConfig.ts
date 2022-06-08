import { getItem } from "@/utils/storage";
import { defineStore } from "pinia";

export const useGlobalConfigStore = defineStore('globalConfig', {
    state: () => {
        return { // 这里写变量
            config: getItem('globalConfig')
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: { // 这里写方法action
        setGlabalConfig(config : GlobalConfig) {
            this.config = config;
        }
    },
    getters: { // getters
    }
})
