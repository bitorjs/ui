<template>
  <div class="demo-swipe">
    <center>普通</center>
    <Swipe
      :autoplay="3000"
      indicator-color="white"
    >
      <SwipeItem>1</SwipeItem>
      <SwipeItem>2</SwipeItem>
      <SwipeItem>3</SwipeItem>
      <SwipeItem>4</SwipeItem>
    </Swipe>
    <center>垂直-自定义指示器</center>
    <Swipe
      vertical
      :autoplay="3000"
      indicator-color="white"
      @change="onChange"
    >
      <SwipeItem v-for="(image, index) in images" :key="index">
        <img :src="image" />
      </SwipeItem>
      <div
          class="custom-indicator"
          slot="indicator"
        >
          {{ current + 1 }}/4
        </div>
    </Swipe>
    <center>ff</center>
    <Swipe
      vertical
      :autoplay="20"
      :loop="false"
      @change="onChange"
    >
      <SwipeItem v-for="n in ns" :key="n">
        {{n}}
      </SwipeItem>
      <div
          class="custom-indicator"
          slot="indicator"
        >
        </div>
    </Swipe>
  </div>
  
</template>
<script>
export default {
  name: '',
  data() {
    return {
      current: 0,
      images: [
        'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
        'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
        'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg',
        'https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg'
      ],
      ns:[]
    }
  },
  mounted(){
    setInterval(()=>{
      let arr = [];
      let n = parseInt(Math.random() * 10000)

      if(this.ns.length===1) arr.push(this.ns[0]);
      else if(this.ns.length===2) arr.push(this.ns[1]);
      arr.push(n)
      // this.ns.push(n);
      // if(this.ns.length>2) this.ns.shift();
      this.ns = arr;
    },1000)
  },
  methods: {
    onChange(index) {
      this.current = index;
    }
  }
}
</script>
<style lang="less" scoped>

.demo-swipe {
  padding-bottom: 30px;

  .swipe {
    cursor: pointer;
    height: 150px;

    &-item {
      color: white;
      font-size: 20px;
      text-align: center;
      line-height: 150px;

      &:nth-child(even) {
        background-color: #39a9ed;
      }

      &:nth-child(odd) {
        background-color: #66c6f2;
      }
    }

    img {
      // width: 100%;
      // height: 240px;
      height: 100%;
      width: auto;
      margin: 0 auto;
      display: block;
      padding: 30px 60px;
      box-sizing: border-box;
      // background-color: white;
      pointer-events: none;
    }
  }

  &.vertical {
    height: 200px;

    .swipe-item {
      line-height: 200px;
    }
  }

  .custom-indicator {
    // visibility: hidden;
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    color: white;
    background: rgba(0, 0, 0, .1);
  }
}
</style>
