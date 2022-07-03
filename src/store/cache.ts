import { defineStore } from 'pinia';

export const useCacheStore = defineStore('cache', {
  state: () => {
    return {
      // 这里写变量
      cachePages: [] as Array<string>
    };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    // 这里写方法action
    setCachePage(page: string) {
      if (!this.cachePages.includes(page)) {
        this.cachePages.push(page);
      }
    },
    removeCachePages(page: string) {
      if (this.cachePages.indexOf(page) !== -1) {
        this.cachePages.splice(this.cachePages.indexOf(page), 1);
      }
    }
  },
  getters: {
    //   getters
  }
});
