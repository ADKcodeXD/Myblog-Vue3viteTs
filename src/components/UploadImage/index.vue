<template >
    <el-upload class="upload-demo" action="" :on-remove="handleRemove" :before-remove="beforeRemove" drag
        :show-file-list="false" :limit="1" accept=".png, .jpg, .jpeg" :on-exceed="handleExceed" :auto-upload="true"
        :before-upload="beforeUpload" ref="uploadEl" :http-request="upload">
        <div class="upload-banner">
            <div class="tip" v-if="!imglink">
                <div class="inner">
                    <span style="font-size: 80px;">+</span>
                    <slot></slot>
                </div>
            </div>
            <div v-else class="tw-h-full tw-w-full">
                <div class="tip" v-if="loading">
                    <div class="loading_percent">
                        <LoadingAnime />
                        {{ loadingPercent }}%
                        <ElButton type="danger" @click.stop="cancelUpload">
                            取消上传
                        </ElButton>
                    </div>
                </div>
                <MyElimage :img="imglink" not-found-type="3:1" />
            </div>
        </div>
    </el-upload>
</template>
<script setup lang="ts">
import { useUploadImg } from '@/hooks/useUpload';
const props = defineProps({
    imglink: {
        type: String,
        default: ""
    }
})
const emit = defineEmits(['imglink']);
const { imglink,
    handleRemove,
    beforeRemove,
    handleExceed,
    beforeUpload,
    cancelUpload,
    upload,
    loading,
    loadingPercent,
    uploadEl } = useUploadImg(emit, props.imglink);

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
        min-height: 200px;
        overflow: hidden;
        background-color: @tipTextColor;
        transition: background-color 0.3s ease;
        position: relative;

        &:hover {
            border: @linkColor @border-line dashed;
            background-color: @bgColor;
        }

        .tip {
            position: absolute;
            .flexbox(column);
            .font-normal();
            z-index: 5;
            height: 100%;
            width: 100%;
            backdrop-filter: blur(3px);

            .inner {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .loading_percent {
                color: @hoverTextColor;
                .flexbox(column);
                padding: @padding-general;
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>