<template>
  <div
    class="button"
    :type="nativeType"
    :disabled="disabled"
    :class="[type,
      size,
      {
        block,
        plain,
        round,
        square,
        loading,
        disabled,
        unclickable: disabled || loading,
        'bottom-action': bottomAction
      }]"
    @click="onClick"
  >
    <loading v-if="loading" size="20px" :color="type === 'default' ? void 0 : ''"/>
    <span v-else class="text">
      <slot>{{text}}</slot>
    </span>
  </div>
</template>
<script>
export default {
  name: "Button",
  props: {
    text: String,
    block: Boolean,
    plain: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    disabled: Boolean,
    nativeType: String,
    bottomAction: Boolean,
    type: {
      type: String,
      default: "default"
    },
    size: {
      type: String,
      default: "normal"
    }
  },
  methods: {
    classes() {
      let cls = [];
      return cls;
    },
    onClick(event) {
      if (!this.loading && !this.disabled) {
        this.$emit("click", event);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../common/style/theme";

.button {
  position: relative;
  padding: 0;
  display: inline-block;
  height: 44px;
  line-height: 42px;
  border-radius: 2px;
  box-sizing: border-box;
  font-size: 16px;
  text-align: center;
  -webkit-appearance: none;
  -webkit-text-size-adjust: 100%;

  &::before {
    content: " ";
    position: absolute;
    top: 50%;
    left: 50%;
    opacity: 0;
    width: 100%;
    height: 100%;
    border: inherit;
    border-color: @black;
    background-color: @black;
    border-radius: inherit; /* inherit parent's border radius */
    transform: translate(-50%, -50%);
  }

  &:active::before {
    opacity: 0.15;
  }

  &.unclickable::before {
    display: none;
  }

  &.default {
    color: @button-default-color;
    background-color: @button-default-background-color;
    border: 1px solid @button-default-border-color;
  }

  &.primary {
    color: @button-primary-color;
    background-color: @button-primary-background-color;
    border: 1px solid @button-primary-border-color;
  }

  &.danger {
    color: @button-danger-color;
    background-color: @button-danger-background-color;
    border: 1px solid @button-danger-border-color;
  }

  &.warning {
    color: @button-warning-color;
    background-color: @button-warning-background-color;
    border: 1px solid @button-warning-border-color;
  }

  &.plain {
    background-color: @white;

    &.primary {
      color: @button-primary-background-color;
    }

    &.danger {
      color: @button-danger-background-color;
    }

    &.warning {
      color: @button-warning-background-color;
    }
  }

  &.large {
    width: 100%;
    height: 50px;
    line-height: 48px;
  }

  &.normal {
    padding: 0 15px;
    font-size: 14px;
  }

  &.small {
    height: 30px;
    padding: 0 8px;
    min-width: 60px;
    font-size: 12px;
    line-height: 28px;
  }

  &.loading {
    .loading {
      display: inline-block;
    }
  }

  /* mini图标默认宽度50px，文字不能超过4个 */
  &.mini {
    display: inline-block;
    width: 50px;
    height: 22px;
    line-height: 20px;
    font-size: 10px;

    & + .mini {
      margin-left: 5px;
    }
  }

  &.block {
    width: 100%;
    display: block;
  }

  &.bottom-action {
    width: 100%;
    height: 50px;
    line-height: 50px;
    border: 0;
    border-radius: 0;
    font-size: 16px;
    color: @button-bottom-action-default-color;
    background-color: @button-bottom-action-default-background-color;

    &.primary {
      background-color: @button-bottom-action-primary-background-color;
    }
  }

  &.disabled {
    opacity: 0.5;
  }

  &.round {
    border-radius: 10em;
  }

  &.square {
    border-radius: 0;
  }
}
</style>
