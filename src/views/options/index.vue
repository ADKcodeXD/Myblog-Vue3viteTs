<template >
    <div class="options-container">
        <!-- 标题 -->
        <div class="title">
            <p>设置</p>
            <span>Options</span>
        </div>
        <div class="form">
            <div class="form-item">
                <span class="label">全局背景颜色</span>
                <el-color-picker v-model="localConfig.globlBgColor" />
            </div>
            <div class="form-item">
                <span class="label">背景颜色</span>
                <el-color-picker v-model="localConfig.bgColor" />
            </div>
            <div class="form-item">
                <span class="label">文字颜色</span>
                <el-color-picker v-model="localConfig.textColor" />
            </div>
            <div class="form-item">
                <span class="label">提示文字颜色</span>
                <el-color-picker v-model="localConfig.tipTextColor" />
            </div>
            <div class="form-item">
                <span class="label">鼠标hover颜色</span>
                <el-color-picker v-model="localConfig.hoverColor" />
            </div>
            <div class="form-item">
                <span class="label">hover文字颜色</span>
                <el-color-picker v-model="localConfig.hoverTextColor"  />
            </div>
            <div class="form-item">
                <span class="label">活动颜色</span>
                <el-color-picker v-model="localConfig.activeColor" />
            </div>
            <div class="form-item">
                <span class="label">主题色</span>
                <el-color-picker v-model="localConfig.themeColor" />
            </div>
            <div class="form-item">
                <span class="label">链接色</span>
                <el-color-picker v-model="localConfig.linkColor" />
            </div>
            <div class="form-item">
                <span class="label">阴影色</span>
                <el-color-picker show-alpha v-model="localConfig.shadowColor" />
            </div>
            <div class="form-item">
                <span class="label">超大文字(verybig)大小(rem)</span>
                <el-slider :min="0.5" :max="10" :step="0.1" v-model="localConfig.veryBigText"/>
            </div>
            <div class="form-item">
                <span class="label">大文字(big)大小(rem)</span>
                <el-slider :min="0.5" :max="10" :step="0.1" v-model="localConfig.bigText"/>
            </div>
            <div class="form-item">
                <span class="label">中文字(mid)大小(rem)</span>
                <el-slider :min="0.5" :max="10" :step="0.1" v-model="localConfig.midText"/>
            </div>
            <div class="form-item">
                <span class="label">小文字(small)大小(rem)</span>
                <el-slider :min="0.5" :max="10" :step="0.1" v-model="localConfig.smallText" />
            </div>
            <div class="form-item">
                <span class="label">超小文字(verysmall)大小(rem)</span>
                <el-slider :min="0.5" :max="10" :step="0.1" v-model="localConfig.verySmallText"/>
            </div>
            <div class="form-item">
                <span class="label">padding标准值(rem)</span>
                <el-slider :min="0" :max="10" :step="0.1" v-model="localConfig.paddingGeneral"/>
            </div>
            <div class="form-item">
                <span class="label">圆角度(rem)</span>
                <el-slider :min="0" :max="10" :step="0.1" v-model="localConfig.borderRadius"/>
            </div>
            <div class="form-item">
                <span class="label">边框粗细(rem)</span>
                <el-slider :min="0" :max="5" :step="0.1" v-model="localConfig.borderLine"/>
            </div>
            <div class="form-item">
                <span class="label">marigin标准值(rem)</span>
                <el-slider :min="0" :max="10" :step="0.1" v-model="localConfig.marginGeneral"/>
            </div>
        </div>
        <div>
            <AdkButton>
                保存
                <template #endesc>
                    save
                </template>
            </AdkButton>
        </div>
    </div>
</template>
<script setup lang="ts">
import { setConfig } from '@/theme/theme';
import { getItem } from '@/utils/storage';
const localConfig=reactive(getItem('globalConfig') as GlobalConfig);
watch(localConfig,(newval)=>{
    setConfig(newval);
})
</script>
<style lang="less" scoped>
@import url(./styles/Options.less);
</style>