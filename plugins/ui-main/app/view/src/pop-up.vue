<template>
  <div>
    <Button type="primary" plain @click.native="show1=true">TOP</Button>
    <Button type="primary" plain @click.native="show2=true">RIGHT</Button>
    <Button type="primary" plain @click.native="show3=true">BOTTOM</Button>
    <Button type="primary" plain @click.native="show4=true">LEFT</Button>
    <Popup v-model="show1" position="top">gdggfgfg
      <Button type="primary" plain @click.native="show1=false;">关闭</Button>
    </Popup>
    <Popup v-model="show2" position="right">gdggfgfg
      <Button type="primary" plain @click.native="show2=false;">关闭</Button>
    </Popup>
    <Popup v-model="show3" position="bottom">gdggfgfg
      <Button type="primary" plain @click.native="show3=false;">关闭</Button>
    </Popup>
    <Popup v-model="show4" position="left">gdggfgfg
      <Button type="primary" plain @click.native="show4=false;">关闭</Button>
    </Popup>
  </div>
</template>
<script>
export default {
  name: "pop-up",
  data() {
    return {
      show1: false,
      show2: false,
      show3: false,
      show4: false
    };
  },
  methods: {
    onClickAlert() {
      this.show = true;
    }
  }
};
</script>
<style lang="less" scoped>
.popup {
  // height: 100%;
  // height: 50px;

  &.top {
    width: 100%;
    height: 50%;
    // top: 10px;
    // right: auto;
    // bottom: auto;
    // left: 50%;
    // transform: translate3d(-50%, 0, 0);
  }

  &.right {
    width: 100%;
    height: 50%;
    // top: 50%;
    // right: 0;
    // bottom: auto;
    // left: auto;
    // transform: translate3d(0, -50%, 0);
  }

  &.bottom {
    width: 100%;
    height: 50%;
    // top: auto;
    // bottom: 0;
    // right: auto;
    // left: 50%;
    // transform: translate3d(-50%, 0, 0);
  }

  &.left {
    width: 100%;
    height: 50%;
    // top: 50%;
    // right: auto;
    // bottom: auto;
    // left: 0;
    // transform: translate3d(0, -50%, 0);
  }
}
</style>
