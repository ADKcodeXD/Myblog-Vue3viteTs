<template>
  <div class="options-container">
    <!-- 标题 -->
    <div class="title">
      <div class="left">
        <p>设置</p>
        <span>Options</span>
      </div>
      <div class="right">
        <p @click="setDefaultFn">重置所有</p>
        <p @click="setDarkFn">暗黑主题</p>
      </div>
    </div>
    <p class="tip">设置完毕请拉到底部点击保存,保存后可在下次自动载入</p>
    <ElDivider />
    <div class="form">
      <div class="pannel">
        <div class="form-item">
          <span class="label">全局背景颜色</span>
          <el-color-picker v-model="localConfig.globlBgColor" />
        </div>
        <div class="form-item">
          <span class="label">背景颜色</span>
          <el-color-picker v-model="localConfig.bgColor" show-alpha />
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
          <el-color-picker v-model="localConfig.hoverTextColor" />
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
          <span class="label">链接文字色</span>
          <el-color-picker v-model="localConfig.linkColor" />
        </div>
        <div class="form-item">
          <span class="label">警告文字色</span>
          <el-color-picker v-model="localConfig.warnningTextColor" />
        </div>
        <div class="form-item">
          <span class="label">错误文字色</span>
          <el-color-picker v-model="localConfig.errorTextColor" />
        </div>
        <div class="form-item">
          <span class="label">阴影色</span>
          <el-color-picker show-alpha v-model="localConfig.shadowColor" />
        </div>
      </div>
      <div class="title">
        <p>文字和大小设置</p>
        <span>font and margin</span>
      </div>
      <ElDivider />
      <div class="demo" :class="{ active: isClick }" @click="isClick = !isClick">
        <div>演示:</div>
        <p class="very-big">超大文字</p>
        <p class="big">大文字</p>
        <p class="mid">中文字</p>
        <p class="small">小文字</p>
        <p class="very-small">超小文字</p>
      </div>
      <div class="pannel">
        <div class="form-item">
          <span class="label">超大文字(verybig)大小(rem)</span>
          <el-slider :min="0.5" :max="12" :step="0.1" v-model="localConfig.veryBigText" />
        </div>
        <div class="form-item">
          <span class="label">大文字(big)大小(rem)</span>
          <el-slider :min="0.5" :max="10" :step="0.1" v-model="localConfig.bigText" />
        </div>
        <div class="form-item">
          <span class="label">中文字(mid)大小(rem)</span>
          <el-slider :min="0.5" :max="8" :step="0.1" v-model="localConfig.midText" />
        </div>
        <div class="form-item">
          <span class="label">小文字(small)大小(rem)</span>
          <el-slider :min="0.5" :max="2.5" :step="0.05" v-model="localConfig.smallText" />
        </div>
        <div class="form-item">
          <span class="label">超小文字(verysmall)大小(rem)</span>
          <el-slider :min="0.5" :max="2" :step="0.05" v-model="localConfig.verySamllText" />
        </div>
        <div class="form-item">
          <span class="label">padding标准值(rem)</span>
          <el-slider :min="0" :max="10" :step="0.1" v-model="localConfig.paddingGeneral" />
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
          <span class="label">marigin标准值(rem)</span>
          <el-slider :min="0" :max="10" :step="0.1" v-model="localConfig.marginGeneral" />
        </div>
      </div>
      <div class="title">
        <p>首页背景图片设置</p>
        <span>index background image setting</span>
      </div>
      <ElDivider />
      <div class="pannel">
        <div class="form-item">
          <span class="label">当前背景图片</span>
          <div class="background">
            <UploadImage :imglink="localConfig.backGroundImg" @imglink="changeLink" />
          </div>
        </div>
        <div class="form-item">
          <span class="label">背景图片模糊度(rem)</span>
          <el-slider :min="0" :max="5" :step="0.01" v-model="localConfig.backGroundImgBlur" />
        </div>
        <div class="form-item">
          <span class="label">背景图片亮度(%)</span>
          <el-slider :min="0" :max="300" :step="0.1" v-model="localConfig.backGroundImgLight" />
        </div>
        <div class="form-item">
          <span class="label">背景重复方式</span>
          <el-select
            v-model="localConfig.backGroundImgRepeat"
            placeholder="选择重复方式"
            size="small"
          >
            <el-option label="重复" value="repeat" />
            <el-option label="不重复" value="no-repeat" />
            <el-option label="x轴重复" value="repeat-x" />
            <el-option label="y轴重复" value="repeat-y" />
            <el-option label="尽可能重复(不裁剪)" value="space" />
            <el-option label="拉伸画面(不重复)" value="round" />
          </el-select>
        </div>
        <div class="form-item">
          <span class="label">背景扩展模式</span>
          <el-select
            v-model="localConfig.backGroundImgSize"
            placeholder="选择重复方式"
            size="small"
          >
            <el-option label="自动(推荐)" value="auto" />
            <el-option label="自动对齐主轴(contain)" value="contain" />
            <el-option label="放大适应" value="cover" />
          </el-select>
        </div>
        <div class="form-item">
          <span class="label">背景是否随滚轮移动</span>
          <el-radio-group v-model="localConfig.backgroundImgAttachment" class="ml-4">
            <el-radio label="fixed">不随滚轮移动(fixed)</el-radio>
            <el-radio label="scroll">随滚轮移动(scroll)</el-radio>
          </el-radio-group>
        </div>
      </div>
    </div>
    <div class="tw-flex tw-justify-end">
      <AdkButton @click="saveLocal">
        保存
        <template #endesc> save </template>
      </AdkButton>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'OptionsPage' }
</script>
<script setup lang="ts">
import { setConfig, setDark, setDefault } from '@/theme/theme'
import { getItem } from '@/utils/storage'
import { ElMessage } from 'element-plus'
let localConfig = reactive(getItem('globalConfig') as GlobalConfig)
const changeLink = link => {
  localConfig.backGroundImg = link
}
const saveLocal = () => {
  ElMessage.success('保存到本地成功!')
  setConfig(localConfig, true)
}
const isClick = ref(false)
const setDefaultFn = () => {
  setDefault()
  const newconfig = getItem('globalConfig')
  for (let key in localConfig) {
    localConfig[key] = newconfig[key]
  }
}
const setDarkFn = () => {
  setDark()
  const newconfig = getItem('globalConfig')
  for (let key in localConfig) {
    localConfig[key] = newconfig[key]
  }
}
onMounted(() => {
  watchEffect(() => {
    setConfig(localConfig)
  })
})
</script>
<style lang="less" scoped>
@import url(./styles/Options.less);
</style>
