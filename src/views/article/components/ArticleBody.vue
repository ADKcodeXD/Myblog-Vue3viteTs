<template >
    <div>
        <div v-html="html" class="markdown-body" @click="ImagePreview($event)"></div>
        <template v-if="showPreview">
            <ElImageViewer v-if="showPreview"  :infinite="false"
                :url-list="urlList" :hide-on-click-modal="true" :teleported="false"
                @close="showPreview=false"
                >
            </ElImageViewer>
        </template>
    </div>
</template>
<script setup lang="ts">
const prop = defineProps({
    html: {
        type: String,
        default: ""
    }
})
const htmlFilter = (val: string) => {
    let reg = new RegExp(/\<img/g);

}
const ImagePreview = (e) => {
    if (e.target.nodeName === 'IMG') {
        urlList.value[0]=e.target.currentSrc;
        showPreview.value=true
    }
}
let urlList=ref([]);
let showPreview=ref(false)
</script>
<style lang="less" scoped>
.markdown-body {
    margin: 20px 0;
    padding: 30px;
}

.img{
    height: unset !important;
}

</style>