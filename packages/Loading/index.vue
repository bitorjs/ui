<template>
  <div class="loading" :class="[`loading--${type}`, colorType]" :style="style">
    <span :class="['loading__spinner',type]">
      <i v-for="(item, index) in (type === 'spinner' ? 12 : 0)" :key="index"/>
      <svg v-if="type === 'circular'" :class="'circular'" viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" fill="none"></circle>
      </svg>
    </span>
  </div>
</template>

<script>
const DEFAULT_COLOR = "#c9c9c9";
export default {
  name: "Loading",
  props: {
    size: String,
    type: {
      type: String,
      default: "circular"
    },
    color: {
      type: String,
      default: DEFAULT_COLOR
    }
  },
  computed: {
    colorType() {
      const { color } = this;
      return color === "white" || color === "black" ? color : "";
    },
    style() {
      return {
        color: this.color === "black" ? DEFAULT_COLOR : this.color,
        width: this.size,
        height: this.size
      };
    }
  }
};
</script>
<style lang="less" scoped>
@import "../common/style/theme";

.loading {
  width: 30px;
  height: 30px;
  z-index: 0;
  font-size: 0;
  line-height: 0;
  position: relative;
  vertical-align: middle;

  .circle {
    width: 16px;
    height: 16px;

    .circular {
      animation-duration: 2s;
    }
  }

  &__spinner {
    z-index: -1;
    width: 100%;
    height: 100%;
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    animation: rotate 0.8s linear infinite;

    &.circle {
      border-radius: 100%;
      border: 3px solid transparent;
      border-color: @gray;
      border-top-color: @gray-darker;
    }

    &.gradient-circle {
      background-size: contain;
      background-image: url("./gradient-circle-black.png");
    }

    &.spinner {
      animation-timing-function: steps(12);

      i {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        position: absolute;

        &::before {
          width: 2px;
          height: 25%;
          content: " ";
          display: block;
          margin: 0 auto;
          border-radius: 40%;
          background-color: currentColor;
        }
      }
    }

    &.circular {
      animation-duration: 2s;
    }
  }

  .circular {
    width: 100%;
    height: 100%;

    circle {
      stroke: currentColor;
      stroke-width: 3;
      stroke-linecap: round;
      animation: circular 1.5s ease-in-out infinite;
    }
  }

  &.white {
    .circle {
      border-color: rgba(0, 0, 0, 0.1);
      border-top-color: rgba(255, 255, 255, 0.7);
    }

    .gradient-circle {
      background-image: url("./gradient-circle-white.png");
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes circular {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40;
  }

  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120;
  }
}

.generate-spinner(@n, @i: 1) when (@i =< @n) {
  .spinner i:nth-of-type(@{i}) {
    opacity: 1 - (0.75 / 12) * (@i - 1);
    transform: rotate(@i * 30deg);
  }
  .generate-spinner(@n, (@i + 1));
}
.generate-spinner(12);
</style>
