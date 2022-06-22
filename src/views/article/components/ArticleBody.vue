<template >
    <section>
        <div v-html="html" v-highlight class="markdown-body" @click="ImagePreview($event)"></div>
        <template v-if="showPreview">
            <ElImageViewer v-if="showPreview"  :infinite="false"
                :url-list="urlList" :hide-on-click-modal="true" :teleported="false"
                @close="close"
                >
            </ElImageViewer>
        </template>
    </section>
</template>
<script setup lang="ts">
import { isMobile } from '@/utils/mobile';
import '@/assets/styles/markdown/markdown.less';
import 'highlight.js/styles/monokai.css';
const prop = defineProps({
    html: {
        type: String,
        default: ""
    }
})
const ImagePreview = (e) => {
    if (e.target.nodeName === 'IMG') {
        urlList.value[0]=e.target.currentSrc;
        showPreview.value=true;
        isMobile()?document.documentElement.style.overflow='hidden':document.body.style.overflow='hidden';     
    }
}
const close=()=>{
    showPreview.value=false;
    isMobile()?document.documentElement.style.overflow='':document.body.style.overflow='';
}
let urlList=ref([]);
let showPreview=ref(false);
</script>
<style lang="less" scoped>
.markdown-body {
    margin: @margin-general 0;
    padding: @padding-general;
}

.img{
    height: unset !important;
}

</style>