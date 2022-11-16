<template>
<transition
  appear
  name="drawer"
  @afterLeave="handleAfterLeave"
>
  <div
    v-if="innerValue"
    :class="[$style.Drawer, innerValue && 'show']"
  >
    <BaseOverlay
      id="drawer-overlay"
      key="overlay"
      ref="overlay"
      class="drawer-overlay"
      is-prevent-scroll
      :class="$style.overlay"
      @click.self="handleClose"
      @contextmenu.stop.prevent
    />
    <div
      id="drawer-body"
      key="body"
      class="drawer-body"
      :style="{ width: width }"
      :class="$style.body"
    >
      <!-- <button
        type="button"
        :class="$style.closeButton"
        aria-label="Закрыть попап"
        @click.prevent="handleClose"
      >
        <SvgIcon :class="$style.icon" name="modal-close" />
      </button> -->
      <div
        id="drawer-body-inner"
        :class="$style.bodyInner"
        class="hide-scrollbar"
      >
        <slot />
      </div>
    </div>
  </div>
</transition>
</template>

<script>
// import PerfectScrollbar from 'perfect-scrollbar';

export default {
  name: 'BaseDrawer',
  props: {
    width: {
      type: String,
      default: '100%',
    },
    value: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      innerValue: false,
      _scrollbar: null,
    };
  },
  computed: {
    isMobileComputed() {
      return !this.$nuxt.$device.isDesktop;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(val) {
        this.innerValue = val;
      },
    },
  },
  // mounted() {
  //   // eslint-disable-next-line no-new
  //   if (!this.isMobileComputed) {
  //     console.log('🚀 ~ file: BaseDrawer.vue ~ line 76 ~ mounted ~ !this.isMobileComputed', !this.isMobileComputed);
  //     this._scrollbar = new PerfectScrollbar('#drawer-body-inner');
  //     // console.log('🚀 ~ file: ModalInvestFund.vue ~ line 343 ~ mounted ~ ps', this.isMobile);
  //   }
  // },
  // beforeDestroy() {
  //   if (!this.isMobile) {
  //     return this?._scrollbar?.destroy();
  //   }
  // },
  methods: {
    handleClose() {
      this.innerValue = false;
      return this.$emit('input', false);
    },
    handleAfterLeave() {
      return this.$emit('leaved');
    },
  },
};
</script>

<style lang="scss">
  $popup-in-bezier: cubic-bezier(.4, 0, .2, 1);
  $popup-out-bezier: #{$popup-in-bezier};
  $popup-in-duration: .5s;
  $popup-out-duration: .4s;

  .drawer {
    &-enter-active {
      .drawer-close,
      .drawer-overlay,
      .drawer-body {
        transition-duration: $popup-in-duration;
        transition-timing-function: $popup-in-bezier;
      }
    }

    &-leave-active {
      transition-duration: $popup-out-duration;
      transition-timing-function: $popup-out-bezier;

      .drawer-close,
      .drawer-overlay,
      .drawer-body {
        transition-duration: $popup-out-duration;
        transition-timing-function: $popup-out-bezier;
      }
    }

    &-enter,
    &-leave-to {
      .drawer-close,
      .drawer-overlay {
        opacity: 0%;
      }

      .drawer-body {
        transform: translate3d(110%, 0, 0);
      }
    }

    &--from-bottom {
      .drawer {
        &-body {
          top: auto;
          bottom: 0;
          height: auto;
          background-color: transparent;
          transform: translate3d(0, 0, 0);
        }
      }
    }

    &--from-bottom.drawer-enter,
    &--from-bottom.drawer-leave-to {
      .drawer-body {
        transform: translate3d(0, 100%, 0);
      }
    }
  }
</style>

<style lang="scss" module>

  .Drawer {
    position: fixed;
    top: calc(1px + var(--header-h));
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 400;
    width: 100%;
  }

  .overlay {
    cursor: pointer;
  }

  .closeButton {
    position: absolute;
    top: 24px;
    left: -24px;
    z-index: 1;
    width: 32px;
    height: 24px;
    border-radius: 8px;
    color: #333;
    transform: translateX(-100%);
    transition-property: opacity;
    cursor: pointer;
    will-change: opacity;
  }

  .body {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 400;
    display: flex;
    max-width: 100%;
    height: 100%;
    background-color: $black;
    transform: translate3d(0, 0, 0);
    transition-property: transform;
    flex-direction: column;
    will-change: transform;
  }

  .bodyInner {
    overflow-y: auto;
    height: 100%;
  }

  .icon {
    width: 24px;
    height: 24px;
  }
</style>
