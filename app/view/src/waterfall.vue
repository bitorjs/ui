<template>
  <div class="wrap">
    <span class="img-wrap" v-for="src in imgs" :key="src"> <img :src="'https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/'+src+'.jpg'" alt=""></span>
  </div>
</template>
<script>
export default {
  name: '',
  data(){
    return {
      imgs:[
        1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20
      ]
    }
  }
}
</script>
<style lang="less" scoped>
.wrap {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.img-wrap{
  display: inline-block;
  // max-width: 100px;
  width: 33.3%;

  img{
    width: 100%;
    transition: .8s opacity;
  }
}
</style>
