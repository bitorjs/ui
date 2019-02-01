<template>
  <div>
    <Button type="primary" plain @click.native="onClickAlert">点击</Button>
    <Popup v-model="show" position="right">
      gdggfgfg
      <Button type="primary" plain @click.native="show=false;">关闭</Button>
    </Popup>
  </div>
  
</template>
<script>
export default {
  name: 'pop-up',
  data(){
    return {
      show: false,
    }
  },
  methods:{
    onClickAlert(){
      this.show = true;
    }
  }
}
</script>
<style lang="less" scoped>
.popup.right {
  width: 100%;
  // height: 100%;
}
</style>
