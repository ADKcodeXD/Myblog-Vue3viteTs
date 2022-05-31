<template>
  <EmojiPicker
    :hide-group-icons="true"
    :disable-skin-tones="true"
    :disabled-groups="disabledGroup"
    :group-names="groupName"
    :static-texts="{ placeholder: '搜索表情' }"
    @select="selectEmojiTemp"
    class="tw-absolute tw-z-50 tw-top-full tw-right-0"
  />
</template>
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { useEmoji } from "@/hooks/Article";
import EmojiPicker from "vue3-emoji-picker";
export default defineComponent({
  components: { EmojiPicker },
  props: {
    comment: {
      type: String,
      default: "",
    },
    /**
     * 传入表单的光标索引
     */
    cursorIndex:{
        type:Number,
        default:0
    }
  },
  setup(props, { emit }) {
    const { selectEmoji, disabledGroup, groupName } = useEmoji();
    const selectEmojiTemp = (emoji: any) => {
      selectEmoji(emoji, emit, props.comment,props.cursorIndex);
    };
    return {
      selectEmoji,
      disabledGroup,
      groupName,
      selectEmojiTemp,
    };
  },
});
</script>


<style lang="less" scoped>
@media screen and(min-width:320px) {
  .v3-emoji-picker {
    width: 60vw;
  }
}
@media screen and(min-width:768px) {
  .v3-emoji-picker {
    width: 40vw;
  }
}
@media screen and(min-width:1024px) {
  .v3-emoji-picker {
    width: 280px;
  }
}
</style>