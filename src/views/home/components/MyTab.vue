<template>
    <div class="tw-bg-white tw-p-3">
        <div class="tw-flex tw-items-center tw-justify-between">
            <p class="tw-text-2xl">
                <slot name="title">
                    
                </slot>
            </p>
            <span>
                <slot name="total">

                </slot>
            </span>
        </div>
        <ElDivider />
        <div v-if="articles">
            <div v-for="item in articles" :key="item.id">
                <div class="tw-flex" >
                    <ArticleItem :articleItem="item" class="tw-flex-1" />
                        <div class="tw-my-2 
                            tw-mx-2 
                            tw-w-5 
                            tw-px-8 
                            tw-flex 
                            tw-bg-slate-700
                            tw-items-center 
                            tw-text-white
                            tw-justify-center
                            tw-cursor-pointer"
                            @click="tabFn(item.id)">
                            <slot name="caozuo"></slot>
                        </div>
                </div>
                <ElDivider />
            </div>
        </div>
        <div v-else>
            <ElEmpty />
        </div>
    </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
    articles: {
        type: Object as PropType<ArticleItemInfo[]>,
        default: () => { }
    },
    fn:{
        type:Function,
        default:()=>{}
    }
})
const emit=defineEmits(['changeTab'])

const tabFn=async (id:string)=>{
    await props.fn(id);
    emit('changeTab')
}
</script>
