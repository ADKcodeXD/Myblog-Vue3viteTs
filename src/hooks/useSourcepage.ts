import { useStore } from '@/store/main';

export const useBackToSource = router => {
  const back = () => {
    const page = useStore();
    if (page.sourcePage.length !== 0) {
      const url = page.sourcePage.pop();
      router.push({ path: url, query: { isCache: 'no' } });
    } else {
      router.back();
    }
  };
  return { back };
};
