import { getItem, setItem, removeItem } from '@/utils/storage';
import { defineStore } from 'pinia';

export const useStore = defineStore('main', {
  state: () => {
    return {
      // 这里写变量
      user: {
        token: getItem('user') || ''
      },
      cancel: {},
      sourcePage: [],
      followBangumiCard: getItem('followBangumiCard') || true
    };
  },
  actions: {
    // 这里写方法action
    setCancel(cancelObj) {
      this.cancel = cancelObj;
    },
    setUserToken(token: string) {
      this.user.token = token;
      token ? setItem('user', token) : removeItem('user');
    },
    setFollowBangumiCard(val: boolean) {
      this.followBangumiCard = val;
      setItem('followBangumiCard', val);
    }
  }
});
