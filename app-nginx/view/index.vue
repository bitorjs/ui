<template>
  <Flex blocked fulled valign="stretch" hidden>
    <textarea hidden v-model="nginx" name id cols="30" rows="50"></textarea>
    <MonacoEditor
      ref="editor"
      width="50%"
      language="nginx"
      :code="nginx"
      :editorOptions="options"
      @mounted="onMounted"
      @codeChange="onCodeChange"
    ></MonacoEditor>
    <pre>{{ret}}</pre>
    <button style="position:fixed;left:0;top:0;">保存</button>
  </Flex>
  
</template>
<script>
import MonacoEditor from "./Monaco";
import config from "../lib/config";
import parse from "../lib/parse";
import write from "../lib/write";
import nginx from "../lib/nginx";

export default {
  name: "",
  components: {
    MonacoEditor
  },
  data() {
    return {
      nginx: config,
      ret: "",
      options: {
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: "line",
        automaticLayout: false,
        glyphMargin: true,
        minimap: {
          enabled: true
        }
      }
    };
  },
  mounted() {
    // this.nginx = config;
    this.parse();
  },

  methods: {
    parse() {
      let p = parse(this.editor.getValue());
      this.ret = p;
      write(JSON.parse(p));
    },
    onMounted(editor) {
      this.editor = editor;
      window.onresize = function () {
        if (editor) {
          editor.layout();
        }
      };
    },
    onCodeChange(editor) {
      this.parse();
    }
  }
};
</script>
<style lang="less">
* {
  outline: none;
  -webkit-tap-highlight-color: transparent;
  margin: 0;
}
html,
body {
  display: inline-block;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
div,
p,
center {
  box-sizing: border-box;
}
</style>

<style lang="less" scoped>
textarea {
  flex: 1;
  overflow: auto;
  outline: none;
  border: none;
  background: beige;
  padding: 1rem;
  resize: none;
}
.icon {
  width: 10px;
}
pre {
  flex: 1;
  overflow: scroll;
  padding: 1rem;
}
</style>
