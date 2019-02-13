<template>
  <transition :name="transitionName" v-if="shouldRender">
    <div v-show="value" :class="['popup',{[position]: position}]">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
import Popup from "../common/mixins/popup";

export default {
  name: "Popup",
  mixins: [Popup],

  props: {
    position: String,
    transition: String,
    overlay: {
      type: Boolean,
      default: true
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    transitionName() {
      const { position, transition } = this;
      return transition || (position ? `popup-slide-${position}` : "fade");
    }
  }
};
</script>
<style lang="less" scoped>
@import "../common/style/theme";

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  max-height: 100%;
  overflow-y: auto;
  background-color: @white;
  transition: 0.3s ease-out;
  -webkit-overflow-scrolling: touch;
  transform: translate3d(-50%, -50%, 0);

  &-slide-top-enter,
  &-slide-top-leave-active {
    transform: translate3d(-50%, -100%, 0);
  }

  &-slide-right-enter,
  &-slide-right-leave-active {
    transform: translate3d(100%, -50%, 0);
  }

  &-slide-bottom-enter,
  &-slide-bottom-leave-active {
    transform: translate3d(-50%, 100%, 0);
  }

  &-slide-left-enter,
  &-slide-left-leave-active {
    transform: translate3d(-100%, -50%, 0);
  }
}
</style>

