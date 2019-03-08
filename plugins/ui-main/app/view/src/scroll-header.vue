<template>
  <div class="po">
    <nav ref="scrollbox">
      <span v-for="(item,$index) in arr"
      :key="$index"
      @click="toggle($event,$index)"
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
        "联系我们", "安全保障","组织信息","备案信息","联系大家","联系朋友", "我的梦想","挑战自我","联系我们", "安全保障","组织信息","备案信息","联系大家","联系朋友", "我的梦想","挑战自我"
      ]
    };
  },
  methods: {
    toggle: function(e, index) {
      this.active = index;
      let scrollbox = this.$refs.scrollbox;
      let children = scrollbox.childNodes;
      let width = 0;
      for (let index = 0; index < children.length; index++) {
        const child = children[index];
        if(child === e.target) {
          width += child.scrollWidth/2.0;
          break;
        } else {
          width += child.scrollWidth;
        }
      }

      scrollbox.scrollLeft = width - scrollbox.clientWidth/2.0;
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
    /*解决ios上滑动不流畅*/
    -webkit-overflow-scrolling: touch;

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