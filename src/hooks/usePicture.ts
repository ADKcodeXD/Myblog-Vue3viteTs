import { getPics } from "@/api/pic";
import { debounce, throttle } from "@/utils/tools";
import {Ref} from "vue";

export const useImageLayout = () => { /**
     * 瀑布流布局的use函数 推荐利用防抖来延迟布局
     * @param imgcontainer 装图片的容器 要求是一个Ref<HTMLElement> 为了防止没有挂载就返回函数的问题 所以做成了响应式的
     * @param className 图片的类名 item的类名
     * @param gutter 间隔大小
     * @param cb 回调函数 可传可不传
     * @return 一个包装好了的函数 可以直接使用 
     */
    const layoutImage = (imgcontainer : Ref < HTMLElement >, className : string, gutter : number, cb? : Function) => {
        return() => {
            let divList = imgcontainer.value.getElementsByClassName(className); // 获取到需要布局显示的div容器
            const newDiv: HTMLElement[] = Array.from(divList)as HTMLElement[];
            const pageW = imgcontainer.value.clientWidth // 获取容器的宽度
            const divW = divList[0].clientWidth // 获取一个div容器的宽度
            const cols = Math.floor(pageW / divW) // 计算一行能够放几个div容器
            const arrH: number[] = [] // 用来存储每个div容器的高度;
            const gap = gutter;
            // 循环div容器的数组
            newDiv.forEach((item, index) => { // 1. 对下标小于一行个数的div容器进行操作
                if (index < cols) {
                    arrH.push(item.clientHeight + gap * 2) // 将div容器的高度放入数组中
                    item.style.left = index * divW + index * gap * 2 + 'px';
                    item.style.top = 0 + 'px';
                    item.style.opacity = '1';
                } else {
                    let minH = Math.min(... arrH); // 获取到数组中最小的高度
                    let idx_min = arrH.indexOf(minH)
                    // 查找到最小高度的下标
                    // newDiv[i].style.position = 'absolute';
                    item.style.left = newDiv[idx_min].style.left;
                    item.style.top = minH + gap + 'px';
                    // 最小列的高度 = 当前自己的高度 + 新容器的高度 + 间隙
                    arrH[idx_min] = minH + item.clientHeight + gap * 3;
                    item.style.opacity = '1';
                }
            })
            let MaxH = Math.max(... arrH);
            imgcontainer.value.style.height = MaxH + gap + 50 + 'px'; // 50预留给提示（图片没有了的提示）
            cb ? cb() : '';
        }
    }
    return {layoutImage}
}
export const useShowImgItem=(picList:Ref<PicVo[]>)=>{
    const imgShow = ref(false);
    const imgShowIndex = ref(0);
    const activeItem = ref < PicVo > ();
    const isDialogShow = ref(false);
    const imgShowFn = (index : number) => {
        activeItem.value = picList.value[index];
        imgShow.value = true;
        imgShowIndex.value = index
    }
    return {
        imgShowFn,
        imgShow,
        imgShowIndex,
        activeItem,
        isDialogShow
    }
}
export const useGetPics = (layoutImage) => {
    const isChangeRule = ref(false);
    const orderRole = ref < undefined | string > (undefined);
    const tag = ref < undefined | number > (undefined);
    const isOrigin = ref < number > (0);
    const pageParams = {
        page: 1,
        pagesize: 10,
        orderRole: orderRole.value,
        tag: tag.value,
        isOrigin: isOrigin.value
    }
    const total = ref(0);
    const imgcontainer = ref < HTMLElement > ();
    const picList = ref < PicVo[] > ([]);
    const isLoading = ref(false); // 图片加载完成的标志
    const isAjaxLoading = ref(false); // 请求加载完成的标志
    const layout = debounce(300, layoutImage(imgcontainer, 'grid-item', 8, () => isLoading.value = false));
    // 上传后的增加图片的函数
    const flushImage = async () => {
        let historyPage = pageParams.page;
        pageParams.page = 1;
        pageParams.orderRole = undefined;
        pageParams.isOrigin = 0;
        pageParams.tag = undefined;
        orderRole.value = undefined;
        isOrigin.value = 0;
        tag.value = undefined;
        await getPicsFn();
        pageParams.page = historyPage;
        layout();
    }
    const getPicsFn = async () => {
        isAjaxLoading.value = true
        const {data} = await getPics(pageParams);
        total.value = data.data.length;
        if (pageParams.page > 1) {
            let res = [
                ...picList.value,
                ...data.data.results
            ];
            picList.value = [...new Set(res)];
        } else {
            // 如果大于0 这时候估计就是上传后重新请求了
            // 也要考虑 排序规则改变 如果排序规则改变了 则重新请求 并且排序规则改变 都需要将page重置为1
            if (picList.value.length > 0) {
                if (isChangeRule.value) {
                    picList.value = data.data.results;
                } else { // 此时第一个就更新好了
                    let el = data.data.results.find(element => {
                        return picList.value.indexOf(element) === -1;
                    });
                    picList.value.unshift(el);
                }
            } else {
                picList.value = data.data.results;
            }
        }
        isAjaxLoading.value = false
    }
    const getNext = () => {
        pageParams.page += 1;
        isLoading.value = true;
        getPicsFn();
        layout();
    }
    const loaded = () => {
        layout();
    }
    onMounted(() => {
        let netAjax = throttle(500, getNext);
        window.addEventListener('resize', layout);
        document.addEventListener('scroll', (e) => {
            if (imgcontainer.value) {
                let windowHeight; // 窗口高度
                let scrollHeight = document.documentElement.scrollHeight; // 总高度
                let scrollbar = document.body.scrollTop + document.documentElement.scrollTop; // 已滚动的距离
                document.compatMode == "CSS1Compat" ? windowHeight = document.documentElement.clientHeight : windowHeight = document.body.clientHeight;
                let relative = 200 // 相对距离
                if (scrollbar + windowHeight >= scrollHeight - relative) {
                    if (((pageParams.page + 1) * pageParams.pagesize) - pageParams.pagesize<total.value) {
                    netAjax();
                }
            }
        }
    })
    getPicsFn();
    })
    watch([isOrigin, tag, orderRole], async () => {
        pageParams.page = 1;
        pageParams.isOrigin = isOrigin.value;
        pageParams.tag = tag.value;
        pageParams.orderRole = orderRole.value;
        isChangeRule.value = true;
        await getPicsFn();
        layout();
        isChangeRule.value = false;
    }) 
    return {
        loaded,
        getPicsFn,
        flushImage,
        total,
        isOrigin,
        imgcontainer,
        orderRole,
        tag,
        picList,
        isLoading,
        isAjaxLoading,
        pageParams
    }         
}
