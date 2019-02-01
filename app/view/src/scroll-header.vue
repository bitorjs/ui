<template>
  <div class="po">
    <nav>
      <span v-for="(item,$index) in arr"
      :key="item"
      @click="toggle($index)"
      :class="{active:$index==active, spanlast:$index==7}">{{item}}</span>
    </nav>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
      arr: [
        "联系我们", "安全保障","组织信息","备案信息","联系大家","联系朋友", "我的梦想","挑战自我"
      ]
    };
  },
  methods: {
    toggle: function(index) {
      this.active = index;
    }
  }
};
</script>

<style lang="less" scoped>
    .po {
      width: 100%;
      cursor: pointer;

      nav {
        position: relative;
        display: flex;
        overflow: auto;
        -ms-overflow-style: none; 
        // -webkit-overflow-scrolling: touch;

        &::-webkit-scrollbar { 
          width: 0 !important;
          display: none; 
        }

        span {
          display: inline-block;
          font-size: 14px;
          text-align: center;
          flex-shrink: 0;
          height: 40px;
          padding: 0 0.2rem;
          align-self:flex-start;
          

          &.active {
            color: red;
            font-size: 18px;
          }
        }
      }

      
    }

  
    


</style>