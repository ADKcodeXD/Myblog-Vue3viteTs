import { getItem, setItem, removeItem } from '@/utils/storage';
import { defineStore } from 'pinia';

export const useBangumiUser = defineStore('bangumi', {
  state: () => {
    return {
      // 这里写变量
      access_token: getItem('bangumi_access_token') || '',
      refresh_token: getItem('bangumi_refresh_token') || '',
      bgm_user_info: getItem('bangumi_user_info') || null
    };
  },
  actions: {
    // 这里写方法action
    setBangumiToken(accesstoken: string, refreshtoken: string) {
      this.access_token = accesstoken;
      this.refresh_token = refreshtoken;
      setItem('bangumi_access_token', accesstoken);
      setItem('bangumi_refresh_token', refreshtoken);
    },
    removeBangumiToken() {
      removeItem('bangumi_access_token');
      removeItem('bangumi_refresh_token');
      this.access_token = '';
      this.refresh_token = '';
    },
    setBangumiUserInfo(bgmUserInfo: Bangumi.BangumiMyInfo) {
      this.bgm_user_info = bgmUserInfo;
      setItem('bangumi_user_info', bgmUserInfo);
    },
    removeBangumiUserInfo() {
      this.bgm_user_info = {};
      removeItem('bangumi_user_info');
    }
  }
});
