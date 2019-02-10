<template>
  <div>
    <p>排名：<number-scroll startNum="90" endNum="99" speed="1000" times="100"/></p>
    <p>金额：<number-scroll startNum="0" endNum="18299.5" speed="10" times="10"/></p>
    <p><flipCountdown  :deadline="deadline" :length="length"></flipCountdown></p>
    <p><countDown :val="deadline" styles="color: red;" /></p>
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
      console.log(this.deadline)
    },1000)
  }
}
</script>

<style lang="less" scoped>

</style>
