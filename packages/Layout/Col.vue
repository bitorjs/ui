<template>
  <component
    :is="tag"
    class="col"
    :class="{ [`col-${span}`]: span, [`offset-${offset}`]: offset }"
    :style="style"
  >
    <slot/>
  </component>
</template>

<script>
export default {
  name: "Col",
  props: {
    span: [Number, String],
    offset: [Number, String],
    tag: {
      type: String,
      default: "div"
    }
  },
  computed: {
    gutter() {
      return (this.$parent && Number(this.$parent.gutter)) || 0;
    },
    style() {
      const padding = `${this.gutter / 2}px`;
      return this.gutter ? { paddingLeft: padding, paddingRight: padding } : {};
    }
  }
};
</script>
<style lang="less" scoped>
@import "../style/theme";

.col {
  float: left;
  box-sizing: border-box;
}

.generate-col(24);
.generate-col(@n, @i: 1) when (@i =< @n) {
  .col-@{i} {
    width: @i * 100% / 24;
  }
  .offset-@{i} {
    margin-left: @i * 100% / 24;
  }
  .generate-col(@n, (@i + 1));
}
</style>
