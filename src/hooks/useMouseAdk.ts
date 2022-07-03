import { Ref } from 'vue';

/**
 * 基于屏幕的中间点 计算鼠标的位置
 * 可以用于基本的跟随鼠标移动的情况
 * @param x Ref<number> 鼠标的x位置
 * @param y Ref<number> 鼠标的y位置
 * @offset offset 如果偏移度越小 则元素移动的幅度越大 反之同理
 * @returns {xPos,yPos} 返回一个对象包含x的位置和y的位置 类型为vue的ComputedRef
 */
export const useMousePointer = (x: Ref<number>, y: Ref<number>, offset: number) => {
  const xPos = computed(() => {
    let res = 0;
    const halfVal = window.innerWidth / 2;
    res = x.value - halfVal;
    return res / offset;
  });
  const yPos = computed(() => {
    let res = 0;
    const halfVal = window.innerHeight / 2;
    res = y.value - halfVal;
    return res / offset;
  });
  return {
    xPos,
    yPos
  };
};
