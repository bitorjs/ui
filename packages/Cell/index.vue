<template>
  <div
    :class="[
    'cell',
      {
        center,
        required,
        [size]: size,
        borderless: !border,
        clickable: isLink || clickable
      }
    ]"
  >
    <slot name="icon">
      <icon v-if="icon" :class="'left-icon'" :name="icon"/>
    </slot>
    <div v-if="title!==undefined || $slots.title" :class="['title', titleClass]">
      <slot name="title">
        <span v-text="title"/>
        <div v-if="label" v-text="label" :class="['label', labelClass]"/>
      </slot>
    </div>
    <div
      v-if="value!==undefined || $slots.default"
      :class="['value', { alone: !$slots.title && !title }, valueClass]"
    >
      <slot name="value">
        <span v-text="value"/>
      </slot>
    </div>
    <slot name="right-icon">
      <icon v-if="isLink" :class="'right-icon'" :name="arrowIcon"/>
    </slot>
    <slot name="extra"/>
  </div>
</template>

<script>
import Icon from "../Icon";
export default {
  name: "Cell",
  components: {
    Icon
  },
  props: {
    icon: String,
    center: Boolean,
    isLink: Boolean,
    required: Boolean,
    titleClass: String,
    valueClass: String,
    labelClass: String,
    title: [String, Number],
    value: [String, Number],
    label: [String, Number],
    border: {
      type: Boolean,
      default: true
    },

    size: String,
    clickable: Boolean,
    arrowDirection: String
  },
  computed: {
    arrowIcon() {
      return this.arrowDirection ? `arrow-${this.arrowDirection}` : "arrow";
    }
  },
  methods: {
    // onClick() {
    //   this.$emit("click");
    //   this.routerLink();
    // }
  }
};
</script>
<style lang="less" scoped>
@import "../style/theme";
.hairline-common() {
  content: " ";
  position: absolute;
  pointer-events: none;
  box-sizing: border-box;
}

.hairline(@border-color: #ebedf0) {
  .hairline-common();

  top: -50%;
  left: -50%;
  right: -50%;
  bottom: -50%;
  transform: scale(0.5);
  border: 0 solid @border-color;
}

.hairline-bottom(@border-color: #ebedf0, @left: 0) {
  .hairline-common();

  left: @left;
  right: 0;
  bottom: 0;
  transform: scaleY(0.5);
  border-bottom: 1px solid @border-color;
}

.cell {
  width: 100%;
  display: flex;
  padding: 10px 15px;
  box-sizing: border-box;
  line-height: 24px;
  position: relative;
  background-color: @white;
  color: @text-color;
  font-size: 14px;
  overflow: hidden;

  &:not(:last-child)::after {
    .hairline-bottom(@border-color, 15px);
  }

  &.borderless::after {
    display: none;
  }

  .label {
    font-size: 12px;
    line-height: 18px;
    color: @gray-darker;
  }

  .title,
  .value {
    flex: 1;
  }

  .value {
    overflow: hidden;
    text-align: right;
    position: relative;
    vertical-align: middle;

    &.alone {
      text-align: left;
    }
  }

  .left-icon,
  .right-icon {
    height: 24px;
    min-width: 1em;
    font-size: 16px;
    line-height: 24px;
  }

  .left-icon {
    margin-right: 5px;
  }

  .right-icon {
    color: @gray-dark;
    margin-left: 5px;
  }

  &.clickable {
    &:active {
      background-color: @active-color;
    }
  }

  &.required {
    overflow: visible;

    &::before {
      content: "*";
      position: absolute;
      left: 7px;
      font-size: 14px;
      color: @red;
    }
  }

  &.center {
    align-items: center;
  }

  &.large {
    padding-top: 12px;
    padding-bottom: 12px;

    .title {
      font-size: 16px;
    }

    .label {
      font-size: 14px;
    }
  }
}
</style>
