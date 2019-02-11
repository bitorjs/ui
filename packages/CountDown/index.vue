<template>
  <div class="count-down" :style="styles">
    <template v-if="type=='up'">
      <span class="numb" :class="ani" v-for="(n,index) in ns" :key="`${n}_${index}`">{{n}}</span>
    </template>
    
    <template v-if="type=='scroll'&&format">
      {{ format(showNumber) }}
    </template>
    <template v-else-if="type=='scroll'">
      {{ showNumber }}
    </template>
  </div>
</template>
<script>
export default {
  name:'CountDown',
  props:{
    type:{
      type: String,
      default: 'up',
      validator: function(val){
        return ['up','scroll','flip'].indexOf(val)>-1
      }
    },
    value: {type: Number, default: 0},
    styles: String,
    startNum:{
      default: 0,
    },
    endNum:{
      default: 0,
    },
    speed:{
      // 变换速度(毫秒)
      default: 20,
    },
    times:{
      // 变换次数
      default: 10,
    },
    format:{
      default: 0,
    },
  },
  data(){
    return {
      ns:[],
      ani: '',
      showNumber: 0
    }
  },
  created() {
      this.showNumber = this.startNum || 0
    },
    mounted() {
      this.JNumberScroll({
        speed: Number(this.speed) || 50, // 变换速度
        times: Number(this.times) || 10, // 变换次数
        startNum: Number(this.startNum) || 0, // 起始数量
        endNum: Number(this.endNum) || 0 // 到达数量
      })
    },
  watch:{
    value:{
      handler(val){
        let arr = [];
        if(this.ns.length===1) arr.push(this.ns[0]);
        else if(this.ns.length===2) arr.push(this.ns[1]);
        arr.push(val)
        this.ns = arr;
        if(arr.length===2) this.ani = 'ani';
      },
      immediate: true
    },
    endNum(newValue, oldValue) {
        this.JNumberScroll({
          speed: Number(this.speed) || 50, // 变换速度
          times: Number(this.times) || 10, // 变换次数
          startNum: Number(oldValue) || 0, // 起始数量
          endNum: Number(newValue) || 0 // 到达数量
        })
      }
  },
  methods: {
      JNumberScroll(params) {
        var defaultParams = {
          speed: 50, // 变换速度(毫秒)
          times: 10, // 变换次数
          startNum: 0, // 开始数量
          endNum: 100 // 到达数量
        }
        for(var i in params) {
          defaultParams[i] = params[i]
        }
        // 分割后要遍历显示的数组
        var splitArr = [];
        // end 和 start之间的间隔
        var gap = Math.abs(defaultParams.endNum - defaultParams.startNum)
        // 判断是增加还是减少
        var add = defaultParams.endNum - defaultParams.startNum > 0
        // 叠加数
        var splitNum = gap / defaultParams.times;
        // end字符串，用于判断变化过程是否显示小数
        var endNumStr = String(defaultParams.endNum);
        // endNum是否为浮点数，用途就是展示效果是否显示小数
        var isFloat = endNumStr.indexOf('.') !== -1;
        // 整数叠加数小于1的可能，间隔最小就为1，次数也为end-start的绝对值
        !isFloat && (splitNum < 1) && (splitNum = 1) && (defaultParams.times = gap)
        for(var i = 0; i < defaultParams.times; i++) {
          var tempNum = add?(defaultParams.startNum + splitNum * i):(defaultParams.startNum - splitNum * i)
          // 小数的位数
          var decimalNum = 0;
          // 如果是浮点数，就获取小数的位数
          isFloat && (decimalNum = endNumStr.length - endNumStr.indexOf('.') - 1)
          // 最后是否保留小数位
          splitArr.push(isFloat?(parseInt(tempNum * 10 ** decimalNum) / (10 ** decimalNum)): parseInt(tempNum))
        }
        // 如果增加，并且数组最后一位比end小，则push最后一位；如果减少，并且数组最后一位比end大，则push最后一位
        ((add && (splitArr[splitArr.length-1] < defaultParams.endNum)) || (!add && (splitArr[splitArr.length-1] > defaultParams.endNum))) && splitArr.push(defaultParams.endNum);
        console.log(splitArr)
        var _index = 0;
        var _this = this;
        // 定时显示
        var intervalId = setInterval(function() {
          if(_index < splitArr.length)
            _this.showNumber = (splitArr[_index++])
          else {
            clearInterval(intervalId)
          }
        }, defaultParams.speed)
      }
    }
}
</script>
<style lang="less" scoped>
.count-down {
  height: 2rem;
  overflow: hidden;

  .numb {
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
