<template>
  <div class="nc" :style="styles">
    <span class="n" :class="ani" v-for="(n) in ns" :key="n">{{n}}</span>
  </div>
</template>
<script>
export default {
  name:'countDown',
  props:{
    val: {type: Number, default: 0},
    styles: String
  },
  data(){
    return {
      old: this.val,
      ns:[],
      ani: ''
    }
  },
  watch:{
    val(n, old){
      let arr = [];
      if(this.ns.length===1) arr.push(this.ns[0]);
      else if(this.ns.length===2) arr.push(this.ns[1]);

      arr.push(n)
      this.ns = arr;
      if(arr.length===2) this.ani = 'ani';
    }
  }
}
</script>
<style lang="less" scoped>
.nc {
  height: 2rem;
  overflow: hidden;
}
.n {
  display: inherit;
  width: inherit;
  height: inherit;
  
  &.ani {
    animation-name:move;
    animation-duration: .3s;
    animation-timing-function:ease;
    animation-delay:0s;
    animation-fill-mode:both;

  }
}

@keyframes move {
  0%{

    transform: translateY(0);

  }

  100%{

    transform: translateY(-100%);

  }
}
</style>
