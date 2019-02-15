<template>
  <div class="container">
    <textarea v-model="nginx" name="" id="" cols="30" rows="50"></textarea>
    <pre>{{ret}}</pre>
  </div>
</template>
<script>
import config from '../lib/config';
import parse from '../lib/parse';
import write from '../lib/write';
export default {
  name:'',
  data(){
    return {
      nginx: config,
      ret:''
    }
  },
  mounted(){
    this.parse()
  },

  methods:{
    parse(){
      let p = parse(this.nginx);
      this.ret = p;
      write(JSON.parse(p))
      
    }
  },
  watch:{
    nginx(){
      this.parse()
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
}
textarea {
  display: inline-block;
  width: 49%;
  height: 100%;
   overflow-y: auto;
  outline: none;
  border: none;
  background: beige;
  vertical-align: top;
}
center{
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
}
pre {
  display: inline-block;
  width: 49%;
  height: 100%;
  overflow: scroll;
  vertical-align: top;
}
</style>
