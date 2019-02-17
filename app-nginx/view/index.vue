<template>
  <Flex blocked fulled valign="stretch">
    <textarea v-model="nginx" name id cols="30" rows="50"></textarea>
    <pre>{{ret}}</pre>
  </Flex>
</template>
<script>
import config from "../lib/config";
import parse from "../lib/parse";
import write from "../lib/write";
export default {
  name: "",
  data() {
    return {
      nginx: config,
      ret: ""
    };
  },
  mounted() {
    this.parse();
  },

  methods: {
    parse() {
      let p = parse(this.nginx);
      this.ret = p;
      write(JSON.parse(p));
    }
  },
  watch: {
    nginx() {
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
