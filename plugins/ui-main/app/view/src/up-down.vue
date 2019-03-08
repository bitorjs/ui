<template>
  <div>
    <p>排名：<CountDown type='scroll' endNum="99" /></p>
    <p>金额：<CountDown type='scroll' startNum="0" endNum="18299.5" /></p>
    <p><flipCountdown  :value="deadline" :length="length"></flipCountdown></p>
    <p><CountDown :value="deadline" styles="color: red;height:100%;font-size:40px;font-weight:bold;" /></p>
  </div>
</template>
<script>
export default {
  name:'',
  data () {
    return {
        deadline: 1,
        length: 5
      }
  },
  mounted(){
    setInterval(()=>{
      this.deadline = parseInt(Math.random() * 10000)
    },6000)
  }
}
</script>

<style lang="less" scoped>

</style>
