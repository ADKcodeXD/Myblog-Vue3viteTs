<template>
  <el-tag
    class="tag"
    type="success"
    :closable="closable"
    @close="closeTag"
    @click="isClick?$router.push(`/index/articlelist?tagId=${tagId}&tagName=${tagName}`):''"
    >{{ tagName }}</el-tag
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props:{
        tagId:{
            type:Number,
            require:true
        },
        tagName:{
            type:String,
            require:true
        },
        closable:{
          type:Boolean,
          default:false
        },
        isClick:{
          type:Boolean,
          default:true
        }
    },
    setup(props,{emit}) {
        const closeTag=()=>{
          emit('closeTag',props.tagId)
        }
        return {closeTag}
    },
})
</script>

<style lang="less" scoped>
.tag{
  margin-left: 5px;
  margin-top: 5px;
  cursor: pointer;
}
</style>