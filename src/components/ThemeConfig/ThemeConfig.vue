<template >
    <div class="out"  @click="isElShow=!isElShow">
        <div class="theme-global" title="更改主题颜色" 
        :class="{ active: isElShow }">
            <i class="iconfont icon-shezhi"></i>
        </div>
    </div>
    <div class="mini-setting" v-if="isElShow" v-on-click-outside="close">
    <div class="close" @click="isElShow=false">
                <i class="iconfont icon-delete"></i>
            </div>
        <ElScrollbar>
            <div class="title">
                <div class="left">
                    <p>设置</p>
                    <span>Options</span>
                </div>
                <div class="right">
                    <p @click="setDefaultFn">重置所有</p>
                    <p @click="setDarkFn">暗黑主题</p>
                    <p @click="$router.push('/index/options'); isElShow = false">跳转设置页面</p>
                </div>
            </div>
            <p class="tip">设置完毕请拉到底部点击保存,保存后可在下次自动载入</p>
            <ElDivider />
            <div class="pannel">
                <div class="form-item">
                    <span class="label">背景颜色</span>
                    <el-color-picker v-model="localConfig.bgColor" show-alpha />
                </div>
                <div class="form-item">
                    <span class="label">文字颜色</span>
                    <el-color-picker v-model="localConfig.textColor" />
                </div>
                <div class="form-item">
                    <span class="label">阴影色</span>
                    <el-color-picker show-alpha v-model="localConfig.shadowColor" />
                </div>
                <div class="form-item">
                    <span class="label">超大文字(verybig)大小(rem)</span>
                    <el-slider :min="0.5" :max="5" :step="0.1" v-model="localConfig.veryBigText" />
                </div>
                <div class="form-item">
                    <span class="label">大文字(big)大小(rem)</span>
                    <el-slider :min="0.5" :max="5" :step="0.1" v-model="localConfig.bigText" />
                </div>
                <div class="form-item">
                    <span class="label">中文字(mid)大小(rem)</span>
                    <el-slider :min="0.5" :max="4" :step="0.1" v-model="localConfig.midText" />
                </div>
                <div class="form-item">
                    <span class="label">小文字(small)大小(rem)</span>
                    <el-slider :min="0.5" :max="3" :step="0.1" v-model="localConfig.smallText" />
                </div>
                <div class="form-item">
                    <span class="label">超小文字(verysmall)大小(rem)</span>
                    <el-slider :min="0.5" :max="3" :step="0.1" v-model="localConfig.verySamllText" />
                </div>
                <div class="form-item">
                    <span class="label">圆角度(rem)</span>
                    <el-slider :min="0" :max="10" :step="0.1" v-model="localConfig.borderRadius" />
                </div>
                <div class="form-item">
                    <span class="label">边框粗细(rem)</span>
                    <el-slider :min="0" :max="5" :step="0.01" v-model="localConfig.borderLine" />
                </div>
                <div class="form-item">
                    <span class="label">背景图片模糊度(rem)</span>
                    <el-slider :min="0" :max="5" :step="0.01" v-model="localConfig.backGroundImgBlur" />
                </div>
                <div class="form-item">
                    <span class="label">背景图片亮度(%)</span>
                    <el-slider :min="0" :max="300" :step="0.1" v-model="localConfig.backGroundImgLight" />
                </div>
            </div>
            <div class="tw-flex tw-justify-end">
                <AdkButton :x="7" :y="2.8" :spacing="1.4" :main-textsize="0.9" :sub-textsize="0.5" @click="saveLocal">
                    保存
                    <template #endesc>
                        save
                    </template>
                </AdkButton>
            </div>
        </ElScrollbar>
    </div>
</template>
<script setup lang="ts">
import { getItem } from '@/utils/storage';
import { ElMessage } from 'element-plus';
import { setConfig, setDark, setDefault } from '@/theme/theme';
import { vOnClickOutside } from '@vueuse/components';

const localConfig = reactive(getItem('globalConfig') as GlobalConfig);
const setDefaultFn=()=>{
    setDefault();
    const newconfig=getItem('globalConfig');
    for(let key in localConfig){
        localConfig[key]=newconfig[key];
    }
}
const setDarkFn=()=>{
    setDark();
    const newconfig=getItem('globalConfig');
    for(let key in localConfig){
        localConfig[key]=newconfig[key];
    }
}
const saveLocal = () => {
    ElMessage.success('保存到本地成功!');
    setConfig(localConfig, true);
}
const isElShow = ref(false);
const target = ref();
const close=(event: any) => {
    let regex = new RegExp(/el-[\s\S]*/g);
    let className = event.target.className
    if (!className) {
        className = event.target.parentNode.className;
    }
    if (!regex.test(className)) {
        isElShow.value = false;
    }
    console.log(isElShow.value+"onClickOutside");
}
onMounted(() => {
    watch(localConfig,(newval) => {
        setConfig(newval);
    })
    // watch(isElShow,(val:Boolean)=>{
    //     if(val){
    //         const local=getItem('globalConfig');
    //         for(let key in local){
    //             localConfig[key]=local[key]
    //         }
    //         console.log(isElShow.value+"watch");
    //     }
    //     console.log(val+"2");
    // })
})
</script>
<style lang="less" scoped>
@import url(./styles/ThemeConfig.less);
</style>