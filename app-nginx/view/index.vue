<template>
  <div>
    <textarea v-model="nginx" name="" id="" cols="30" rows="20"></textarea>
    <center>解析后</center>    
    <pre>{{ret}}</pre>
  </div>
</template>
<script>
import config from '../lib/config';
import parse from '../lib/parse';
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
    }
  }
}
</script>
<style lang="less" scoped>
textarea {
  width: 100%;
  height: 50%;
  outline: none;
  border: none;
  background: beige;
}
center{
  padding: 10px;
  font-size: 20px;
  font-weight: bold;
}
</style>
