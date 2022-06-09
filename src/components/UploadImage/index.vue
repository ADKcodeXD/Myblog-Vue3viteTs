<template >
    <el-upload class="upload-demo" action="" :on-remove="handleRemove" :before-remove="beforeRemove"
        :before-upload="beforeBannerUpload" :show-file-list="false" :limit="1" accept=".png, .jpg, .jpeg"
        :on-exceed="handleExceed">
        <div class="upload-banner">
            <MyElimage :img="imglink" v-if="imglink" />
            <div class="tip" v-else>
                <div v-if="!loading" class="inner">
                    <span style="font-size: 80px;">+</span>
                    <slot></slot>
                </div>
                <div v-else class="loading">
                    <LoadingAnime />
                </div>
            </div>
        </div>
    </el-upload>
</template>
<script setup lang="ts">
import { useUploadImg } from './hooks/useUpload';

const props = defineProps({
    imglink: {
        type: String,
        default: ""
    }
})
const emit = defineEmits(['imglink']);
const { imglink, loading, handleRemove, beforeRemove, handleExceed, beforeBannerUpload } = useUploadImg(emit, props.imglink);

</script>
<style lang="less" scoped>
.upload-demo {
    padding: 20px 0;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;

    :deep(.el-upload) {
        width: 100%;
        height: 100%;
    }

    .upload-banner {
        border: @border-line dashed @textColor;
        border-radius: 30px;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: @tipTextColor;
        transition: background-color 0.3s ease;

        &:hover {
            border: @linkColor @border-line dashed;
            background-color: @bgColor;
        }

        .tip {
            .flexbox(column);
            .font-normal();
            height: 100%;
            width: 100%;
            .inner{
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .loading{
                background-color: @bgColor;
            }
        }
    }
}
</style>