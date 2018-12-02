<template>
  <div :class="['nav-bar',{ fixed }, { 'hairline--bottom': border }]" :style="style">
    <div :class="'left'" @click="$emit('click-left')">
      <slot name="left">
        <icon v-if="leftArrow" :class="'arrow'" name="arrow-left"/>
        <span v-if="leftText" v-text="leftText" :class="'text'"/>
      </slot>
    </div>
    <div :class="'title'" class="ellipsis">
      <slot name="title">{{ title }}</slot>
    </div>
    <div :class="'right'" @click="$emit('click-right')">
      <slot name="right">
        <span v-if="rightText" v-text="rightText" :class="'text'"/>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    title: String,
    fixed: Boolean,
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    border: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 1
    }
  },
  computed: {
    style() {
      return {
        zIndex: this.zIndex
      };
    }
  }
};
</script>
<style lang="less" scoped>
@import "../style/theme";

.nav-bar {
  height: 46px;
  position: relative;
  user-select: none;
  text-align: center;
  line-height: 46px;
  background-color: @white;

  .icon {
    color: @blue;
    vertical-align: middle;
  }

  .arrow {
    min-width: 1em;
    font-size: 16px;

    + .text {
      margin-left: -20px;
      padding-left: 25px;
    }
  }

  &.fixed {
    top: 0;
    left: 0;
    width: 100%;
    position: fixed;
  }

  .title {
    margin: 0 auto;
    max-width: 60%;
    font-size: 16px;
    font-weight: 500;
  }

  .left,
  .right {
    bottom: 0;
    font-size: 14px;
    position: absolute;
  }

  .left {
    left: 15px;
  }

  .right {
    right: 15px;
  }

  .text {
    color: @blue;
    margin: 0 -15px;
    padding: 0 15px;
    display: inline-block;
    vertical-align: middle;

    &:active {
      background-color: @active-color;
    }
  }
}
</style>
