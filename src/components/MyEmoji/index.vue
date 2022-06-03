<template>
  <div ref="picker" class="tw-h-full tw-w-full">
    <EmojiPicker :hide-group-icons="true" :disable-skin-tones="true" :disabled-groups="disabledGroup"
      :group-names="groupName" :static-texts="{ placeholder: '搜索表情' }" picker-type="textarea" @update:text="onChangeText"
        />
  </div>
  
</template>
<script lang="ts" setup>
import { useEmoji } from "@/hooks/Article";
import EmojiPicker from "vue3-emoji-picker";

const props = defineProps({
  placeholder:{
    type: String,
    default: "请输入评论~",
  },
  maxLeagth:{
    type: Number,
    default: 255,
  }
});
const clearInput=()=>{
  let textarea=picker.value.querySelector('.v3-emoji-picker-textarea');
  console.log(textarea.value);
  textarea.value="";
}
defineExpose({clearInput})
const emit = defineEmits(['changeText'])
const onChangeText = (t: string) => {
  emit('changeText', t)
}
const picker = ref<EmojiPicker | null>();
const { disabledGroup, groupName } = useEmoji();


onMounted(()=>{
  let textarea=picker.value.querySelector('.v3-emoji-picker-textarea');
  textarea.setAttribute('maxlength',props.maxLeagth.toString());
  textarea.setAttribute('placeholder',props.placeholder);
  textarea.setAttribute('row','10')
})
</script>


<style lang="less" scoped>
@media screen and(min-width:320px) {
  :deep(.v3-emoji-picker) {
    .v3-header {
      display: none !important;
    }

    .v3-footer {
      display: none;
    }

    width: 65vw;
  }

  :deep(.v3-input-picker-root) {
    width: 100%;
    height: 100%;

    .v3-emoji-picker-textarea {
      border-radius: 10px;
      padding: 5px 5px 3px 6px !important;
      font-size: 16px;
      line-height: 20px;
      resize: none !important;
      min-height: 120px !important;
    }
  }
}

@media screen and(min-width:768px) {
  :deep(.v3-emoji-picker) {
    width: 40vw;
  }
}

@media screen and(min-width:1024px) {
  :deep(.v3-emoji-picker) {
    width: 280px;
  }
}
</style>