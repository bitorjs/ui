<template>
  <div class="skeleton" ref="ske"></div>
</template>
<script>
export default {
  name: 'Skeleton',
  inheritAttrs:true,
  mounted(){
    let $attrs = this.$attrs;
    for(let key in this.$attrs) {
      this.$refs.ske.setAttribute(key, $attrs[key])
    }
    
  }
}
</script>
<style lang="less" scoped>
@bg-color: #eeeeee;
@keyframes w-opacity {
  0% {
    opacity: 1
  }
  10%,90% {
    opacity: .9
  }
  20%,80% {
    opacity: .8
  }
  30%,70% {
    opacity: .7
  }
  40%,60% {
    opacity: .6
  }
  50% {
    opacity: .5
  }
  to {
    opacity: .95
  }
}
.skeleton {
  background: @bg-color;
  animation: w-opacity 2s infinite linear;
  height: 1px; /*px*/
  margin: 1px;
  width: 100%;
}
</style>

