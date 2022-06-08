<template>
    <ElPagination background layout="prev, pager, next" :page-count="Math.ceil(total / pageparams.pagesize)"
      @current-change="changePage" :current-page="pageparams.page">
    </ElPagination>
</template>
<script setup lang="ts">
import { PropType } from 'vue';

const props=defineProps({
    pageparams:{
        type:Object as PropType<PageParams>,
        default:()=>{}
    },
    total:{
        type:Number,
        default:0
    }
})
const emit=defineEmits(['changePage'])
const changePage=(val:number)=>{
    props.pageparams.page = val;
    emit('changePage')
}
</script>