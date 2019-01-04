<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>

<script>
const directionMaps = ["row", "row-reverse", "column", "column-reverse"];
const wrapMaps = ["nowrap", "wrap", "wrap-reverse"];
const alignMaps = ["left", "right", "center", "between", "around"];
const valignMaps = ["top", "middle", "bottom", "stretch", "baseline"];
const alignContentMaps = [
  "start",
  "end",
  "center",
  "between",
  "around",
  "stretch"
];
const overflow = ["hide", "scroll", "auto"];

export default {
  name: "Flex",
  data() {
    return {
      prefixClassName: "ui-flex"
    };
  },
  props: {
    span: {
      type: Number,
      validator: value => {
        if (!value) return true;
        return value > 0 && value <= 24;
      }
    },
    direction: {
      type: String,
      validator: value => directionMaps.indexOf(value) > -1
    },
    wrap: {
      type: String,
      validator: value => wrapMaps.indexOf(value) > -1
    },
    align: {
      type: String,
      validator: value => alignMaps.indexOf(value) > -1,
      default: "left"
    },
    valign: {
      type: String,
      validator: value => valignMaps.indexOf(value) > -1,
      default: "top"
    },
    alignContent: {
      type: String,
      validator: value => alignContentMaps.indexOf(value) > -1
    },
    blocked: Boolean,
    fulled: Boolean,
    overflow: {
      type: String,
      validator: value => {
        if (!value) return true;
        return overflow.indexOf(value) > -1;
      }
    }
  },
  computed: {
    classes() {
      const classes = [];

      if (this.span) {
        if (
          this.direction ||
          this.wrap ||
          this.align ||
          this.valign ||
          this.alignContent
        ) {
          classes.push(this.prefixClassName);
        }
        classes.push(
          `${this.prefixClassName}-item`,
          `${this.prefixClassName}-span-${this.span}`
        );
      } else {
        classes.push(this.prefixClassName);
      }

      this.direction &&
        classes.push(`${this.prefixClassName}-dir-${this.direction}`);
      this.wrap && classes.push(`${this.prefixClassName}-${this.wrap}`);
      this.align && classes.push(`${this.prefixClassName}-align-${this.align}`);
      this.valign &&
        classes.push(`${this.prefixClassName}-valign-${this.valign}`);
      this.alignContent &&
        classes.push(
          `${this.prefixClassName}-align-content-${this.alignContent}`
        );
      this.blocked && classes.push(`${this.prefixClassName}-blocked`);
      this.fulled && classes.push(`${this.prefixClassName}-fulled`);
      this.overflow && classes.push(`${this.prefixClassName}-${this.overflow}`);

      return classes;
    }
  }
};
</script>
<style lang="less" scoped>
.ui-flex {
  text-align: left;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}
.ui-flex-auto {
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}
.ui-flex-hide {
  overflow-x: hidden;
  overflow-y: hidden;
}
.ui-flex-scroll {
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
.ui-flex-nowrap {
  flex-wrap: nowrap;
}
.ui-flex-wrap {
  flex-wrap: wrap;
}
.ui-flex-wrap-reverse {
  flex-wrap: wrap-reverse;
}
.ui-flex-dir-row {
  flex-direction: row;
}
.ui-flex-dir-row-reverse {
  flex-direction: row-reverse;
}
.ui-flex-dir-column {
  flex-direction: column;
}
.ui-flex-dir-column-reverse {
  flex-direction: column-reverse;
}
.ui-flex-align-left {
  justify-content: flex-start;
}
.ui-flex-align-right {
  justify-content: flex-end;
}
.ui-flex-align-center {
  justify-content: center;
}
.ui-flex-align-between {
  justify-content: space-between;
}
.ui-flex-align-around {
  justify-content: space-around;
}
.ui-flex-valign-top {
  align-items: flex-start;
}
.ui-flex-valign-bottom {
  align-items: flex-end;
}
.ui-flex-valign-middle {
  align-items: center;
}
.ui-flex-valign-stretch {
  align-items: stretch;
}
.ui-flex-valign-baseline {
  align-items: baseline;
}
.ui-flex-align-content-start {
  align-content: flex-start;
}
.ui-flex-align-content-end {
  align-items: flex-end;
}
.ui-flex-align-content-center {
  align-items: center;
}
.ui-flex-align-content-between {
  align-items: stretch;
}
.ui-flex-align-content-around {
  align-items: baseline;
}
.ui-flex-align-content-stretch {
  align-items: baseline;
}
.ui-flex-span-1 {
  flex: 1;
}
.ui-flex-span-2 {
  flex: 2;
}
.ui-flex-span-3 {
  flex: 3;
}
.ui-flex-span-4 {
  flex: 4;
}
.ui-flex-span-5 {
  flex: 5;
}
.ui-flex-span-6 {
  flex: 6;
}
.ui-flex-span-7 {
  flex: 7;
}
.ui-flex-span-8 {
  flex: 8;
}
.ui-flex-span-9 {
  flex: 9;
}
.ui-flex-span-10 {
  flex: 10;
}
.ui-flex-span-11 {
  flex: 11;
}
.ui-flex-span-12 {
  flex: 12;
}
.ui-flex-span-13 {
  flex: 13;
}
.ui-flex-span-14 {
  flex: 14;
}
.ui-flex-span-15 {
  flex: 15;
}
.ui-flex-span-16 {
  flex: 16;
}
.ui-flex-span-17 {
  flex: 17;
}
.ui-flex-span-18 {
  flex: 18;
}
.ui-flex-span-19 {
  flex: 19;
}
.ui-flex-span-20 {
  flex: 20;
}
.ui-flex-span-21 {
  flex: 21;
}
.ui-flex-span-22 {
  flex: 22;
}
.ui-flex-span-23 {
  flex: 23;
}
.ui-flex-span-24 {
  flex: 24;
}
.ui-flex-item {
  box-sizing: border-box;
}
.ui-flex-blocked {
  width: 100%;
}
.ui-flex-fulled {
  height: 100%;
}
</style>