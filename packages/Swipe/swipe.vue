<template>
  <div :class="'swipe'">
        <div
          :style="trackStyle"
          :class="'track'"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
          @touchcancel="onTouchEnd"
          @transitionend="onTransitionend"
        >
          <slot></slot>
        </div>
        <slot name="indicator">
          <div v-if="showIndicators&&count>1" :class="['indicators', { vertical: vertical }]" @transitionend="stop">
            <i
              :class="['indicator', { active: index === activeIndicator }]"
              :style="index === activeIndicator ? indicatorStyle : null"
              v-for="(empty, index) in count" :key="index"
            />
          </div>
        </slot>
        
      </div>
</template>
<script>
import Touch from '../common/mixins/touch';
import { on, off } from '../common/utils/event';

export default {
  mixins: [Touch],

  props: {
    width: Number,
    height: Number,
    autoplay: Number,
    vertical: Boolean,
    initialSwipe: {type:Number, default:0},
    indicatorColor: String,
    loop: {
      type: Boolean,
      default: true
    },
    touchable: {
      type: Boolean,
      default: true
    },
    showIndicators: {
      type: Boolean,
      default: true
    },
    duration: {
      type: Number,
      default: 500
    }
  },

  data() {
    return {
      computedWidth: 0,
      computedHeight: 0,
      offset: 0,
      active: 0,
      deltaX: 0,
      deltaY: 0,
      swipes: [],
      swiping: false
    };
  },

  mounted() {
    this.initialize();

    if (!this.$isServer) {
      on(window, 'resize', this.onResize, true);
    }
  },

  activated() {
    if (this.rendered) {
      this.initialize();
    }

    this.rendered = true;
  },

  destroyed() {
    this.clear();

    if (!this.$isServer) {
      off(window, 'resize', this.onResize, true);
    }
  },

  watch: {
    swipes() {
      this.initialize();
    },

    initialSwipe() {
      this.initialize();
    },

    autoplay(autoplay) {
      if (!autoplay) {
        this.clear();
      } else {
        this.autoPlay();
      }
    }
  },

  computed: {
    count() {
      return this.swipes.length;
    },

    delta() {
      return this.vertical ? this.deltaY : this.deltaX;
    },

    size() {
      return this[this.vertical ? 'computedHeight' : 'computedWidth'];
    },

    trackSize() {
      return this.count * this.size;
    },

    activeIndicator() {
      return (this.active + this.count) % this.count;
    },

    isCorrectDirection() {
      const expect = this.vertical ? 'vertical' : 'horizontal';
      return this.direction === expect;
    },

    trackStyle() {
      const mainAxis = this.vertical ? 'height' : 'width';
      const crossAxis = this.vertical ? 'width' : 'height';
      return {
        [mainAxis]: `${this.trackSize}px`,
        [crossAxis]: this[crossAxis] ? `${this[crossAxis]}px` : '',
        transitionDuration: `${this.swiping ? 0 : this.duration}ms`,
        transform: `translate${this.vertical ? 'Y' : 'X'}(${this.offset}px)`
      };
    },

    indicatorStyle() {
      return {
        backgroundColor: this.indicatorColor
      };
    }
  },

  methods: {
    // initialize swipe position
    initialize(active = this.initialSwipe) {
      clearTimeout(this.timer);
      if (this.$el) {
        const rect = this.$el.getBoundingClientRect();
        this.computedWidth = this.width || rect.width;
        this.computedHeight = this.height || rect.height;
      }
      this.swiping = true;
      this.active = active;
      this.offset = this.count > 1 ? -this.size * this.active : 0;
      this.swipes.forEach(swipe => {
        swipe.offset = 0;
      });
      this.autoPlay();
    },

    onResize() {
      this.initialize(this.activeIndicator);
    },

    onTouchStart(event) {
      if (!this.touchable) return;

      this.clear();
      this.swiping = true;
      this.touchStart(event);
      this.correctPosition();
    },

    onTouchMove(event) {
      if (!this.touchable || !this.swiping) return;

      this.touchMove(event);

      if (this.isCorrectDirection) {
        event.preventDefault();
        event.stopPropagation();
        this.move(0, Math.min(Math.max(this.delta, -this.size), this.size));
      }
    },

    onTouchEnd() {
      if (!this.touchable || !this.swiping) return;

      if (this.delta && this.isCorrectDirection) {
        const offset = this.vertical ? this.offsetY : this.offsetX;
        this.move(offset > 0 ? (this.delta > 0 ? -1 : 1) : 0);
      }

      this.swiping = false;
      this.autoPlay();
    },

    move(move = 0, offset = 0) {
      const { delta, active, count, swipes, trackSize } = this;
      const atFirst = active === 0;
      const atLast = active === count - 1;
      const outOfBounds =
        !this.loop &&
        ((atFirst && (offset > 0 || move < 0)) || (atLast && (offset < 0 || move > 0)));

      if (outOfBounds || count <= 1) {
        return;
      }

      if (swipes[0]) {
        swipes[0].offset = atLast && (delta < 0 || move > 0) ? trackSize : 0;
      }

      if (swipes[count - 1]) {
        swipes[count - 1].offset = atFirst && (delta > 0 || move < 0) ? -trackSize : 0;
      }

      if (move && active + move >= -1 && active + move <= count) {
        this.active += move;
      }

      this.offset = offset - this.active * this.size;
    },

    swipeTo(index) {
      this.swiping = true;
      this.resetTouchStatus();
      this.correctPosition();
      setTimeout(() => {
        this.swiping = false;
        this.move((index % this.count) - this.active);
      }, 30);
    },

    correctPosition() {
      if (this.active <= -1) {
        this.move(this.count);
      }
      if (this.active >= this.count) {
        this.move(-this.count);
      }
    },

    clear() {
      clearTimeout(this.timer);
    },

    autoPlay() {
      const { autoplay } = this;
      if (autoplay && this.count > 1) {
        this.clear();
        this.timer = setTimeout(() => {
          this.swiping = true;
          this.resetTouchStatus();
          this.correctPosition();

          setTimeout(() => {
            this.swiping = false;
            this.move(1);
            this.autoPlay();
          }, 30);
        }, autoplay);
      }
    },

    onTransitionend(event) {
      event.stopPropagation();
      this.$emit('change', this.activeIndicator);
    },

    stop(e){
      e.stopPropagation();
    }
  }

}

</script>
<style lang="less" scoped>
@import '../common/style/theme';

.swipe {
  overflow: hidden;
  position: relative;
  user-select: none;

  .track {
    height: 100%;
  }

  .indicators {
    display: flex;
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);

    &.vertical {
      left: 10px;
      top: 50%;
      bottom: auto;
      flex-direction: column;
      transform: translateY(-50%);

      .indicator:not(:last-child) {
        margin-bottom: @swipe-indicator;
      }
    }
  }

  .indicator {
    opacity: .3;
    border-radius: 100%;
    width: @swipe-indicator;
    height: @swipe-indicator;
    transition: opacity .2s;
    background-color: @border-color;

    &:not(:last-child) {
      margin-right: @swipe-indicator;
    }

    &.active {
      opacity: 1;
      background-color: @blue;
    }
  }
}
</style>
