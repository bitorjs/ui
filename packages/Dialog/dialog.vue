<template>
  <transition name="dialog-bounce">
    <div v-show="value" :class="['dialog', className]">
      <div
        v-if="title"
        v-html="title"
        :class="['header', { isolated: !message && !$slots.default }]"
      />
      <div :class="'content'" v-if="message || $slots.default">
        <slot>
          <div v-if="message" v-html="message" :class="['message', { 'has-title': title }]"/>
        </slot>
      </div>
      <div
        class="hairline--top"
        :class="['footer', { 'buttons': showCancelButton && showConfirmButton }]"
      >
        <Button
          v-show="showCancelButton"
          :loading="loading.cancel"
          size="large"
          :class="'cancel'"
          @click.native="handleAction('cancel')"
        >{{ cancelButtonText || 'cancel' }}</Button>
        <Button
          v-show="showConfirmButton"
          size="large"
          :loading="loading.confirm"
          :class="['confirm', { 'hairline--left': showCancelButton && showConfirmButton }]"
          @click.native="handleAction('confirm')"
        >{{ confirmButtonText || 'confirm' }}</Button>
      </div>
    </div>
  </transition>
</template>

<script>
import Button from "../Button";
import Popup from "../common/mixins/popup";

export default {
  name: "Dialog",
  components: {
    Button
  },
  mixins: [Popup],
  props: {
    title: String,
    message: String,
    callback: Function,
    className: [String, Object, Array],
    beforeClose: Function,
    confirmButtonText: String,
    cancelButtonText: String,
    showCancelButton: Boolean,
    showConfirmButton: {
      type: Boolean,
      default: true
    },
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: {
        confirm: false,
        cancel: false
      }
    };
  },
  methods: {
    handleAction(action) {
      if (this.beforeClose) {
        this.loading[action] = true;
        this.beforeClose(action, state => {
          if (state !== false) {
            this.onClose(action);
          }
          this.loading[action] = false;
        });
      } else {
        this.onClose(action);
      }
    },
    onClose(action) {
      this.$emit("input", false);
      this.$emit(action);
      this.callback && this.callback(action);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../common/style/theme";
@import "../common/style/hairline";

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  // width: 85%;
  max-width: 85%;
  min-width: 300px;
  font-size: 16px;
  overflow: hidden;
  transition: 0.3s;
  border-radius: 4px;
  background-color: @white;
  transform: translate3d(-50%, -50%, 0);

  .header {
    font-weight: 500;
    padding-top: 25px;
    text-align: center;

    &.isolated {
      padding: 25px 0;
    }
  }

  .message {
    padding: 25px;
    font-size: 14px;
    line-height: 1.5;
    max-height: 60vh;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    &.has-title {
      padding-top: 12px;
      color: @gray-darker;
    }
  }

  .footer {
    overflow: hidden;
    user-select: none;

    &.buttons {
      display: flex;

      .button {
        flex: 1;
      }
    }
  }

  .button {
    border: 0;
  }

  .confirm {
    &,
    &:active {
      color: @blue;
    }
  }

  &-bounce-enter {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.7);
  }

  &-bounce-leave-active {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.9);
  }
}
</style>
