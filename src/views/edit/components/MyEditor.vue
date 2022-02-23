<template>
  <el-tabs v-model="editorName" class="tabs" type="card">
    <el-tab-pane label="富文本编辑器" name="tinymce">
      <Editor
        api-key="h8f98pdypo6nw0cszfeo8vk97gkvk92wxtwxmiz3e2e05gje"
        :init="editorInit"
        v-model="contentRich.html"
      />
    </el-tab-pane>
    <el-tab-pane label="markdown编辑器" name="markdown">
      <!-- markdown 编辑器 -->
      <div id="markdown">
        <MdEditor
          v-model="content.text"
          ref="mdeditor"
          :theme="theme.theme === 'dark' ? 'dark' : 'light'"
          @onHtmlChanged="saveHtml"
          @onUploadImg="onUploadImg"
        />
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Content } from "@/interface/article";

// 引入tinymce富文本编辑器
import Editor from "@tinymce/tinymce-vue";
import { uploadBanner } from "@/api/article";
// 引入md-editor-v3 markdown编辑器
import MdEditor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { useThemeStore } from "@/store/theme";
import { useUpload } from "@/hooks/upload";

export default defineComponent({
  components: {
    Editor,
    MdEditor,
  },
  props: {
    html: {
      type: String,
      default: "",
    },
    saveContent: {
      type: Object as PropType<Content>,
      default: "",
    },
    saveContentRich: {
      type: Object as PropType<Content>,
      default: "",
    },
  },
  setup(props, { emit }) {
    // 当前tag名 默认富文本
    const theme = useThemeStore();
    let editorName = ref("tinymce");
    // v-model
    // markdown绑定的对象
    let content = reactive<Content>({
      html: "",
      text: "",
    });
    // 富文本编辑器绑定的对象
    let contentRich = reactive<Content>({
      html: "",
      text: "",
    });
    
    // 如果有本地存储 读取本地存储
    if (props.saveContent) {
      content.html = props.saveContent.html;
      content.text = props.saveContent.text;
    }
    if(props.saveContentRich){
      contentRich.html=props.saveContentRich.html;
      contentRich.text=props.saveContentRich.text;
    }
    // tinyMce编辑器
    let editorInit = {
      // language_url: "/public/tinymce/zh_CN.js",  //开发环境下
      language_url: "/tinymce/zh_CN.js", //生产环境
      language: "zh_CN",
      height: 500,
      plugins: [
        "advlist autolink lists link image charmap print preview anchor",
        "searchreplace visualblocks code fullscreen",
        "insertdatetime media table paste code help wordcount",
      ],
      toolbar:
        "undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help",
      images_upload_handler: async (
        blobInfo: { blob: () => string | Blob },
        success: (arg0: any) => void,
        failure: (arg0: string) => void
      ) => {
        let formdata = new FormData();
        formdata.append("image", blobInfo.blob());
        try {
          let result = await uploadBanner(formdata);
          success(result.data.data);
        } catch (error) {
          failure("error");
        }
      },
    };
    const saveHtml = (val: string) => {
      content.html = val;
    };

    // markdown图片上传逻辑
    const onUploadImg=async (files: FileList, callback:(urls: string[]) => void)=> {
      const res = await Promise.all(
        Array.from(files).map((file) => {
          return new Promise((rev, rej) => {
            const form = new FormData();
            form.append('image', file);
            uploadBanner(form).then((result: any) => {
              rev(result);
            }).catch((err: any) => {
              rej(err);
            });
          });
        })
      );
      callback(res.map((item: any) => item.data.data));
    }

    // 区分开两个编辑器分别传不同的值..... 这里需要
    watch(content, (newValue) => {
      emit("changeContent", newValue);
    });
    // 富文本改变
    watch(contentRich, (newValue) => {
      emit("changeContentRich", newValue);
    });
    watch(editorName, (newValue) => {
      emit("changeEditor", newValue);
    });
    // tinyMce编辑器
    return {
      editorName,
      editorInit,
      content,
      theme,
      saveHtml,
      contentRich,
      onUploadImg
    };
  },
});
</script>

<style lang="less" scoped>
</style>