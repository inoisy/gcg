<template>
<div
  :class="$style.BaseOverlay"
  :style="styles"
  v-on="$listeners"
/>
</template>

<script>
import { preventScroll } from '~/mixins/prevent-scroll';

export default {
  name: 'BaseOverlay',
  props: {
    zIndex: {
      type: [String, Number],
      default: 101,
    },
    absolute: {
      type: Boolean,
      default: false,
    },
    isPreventScroll: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    styles() {
      return {
        'z-index': this.zIndex,
        position: this.absolute ? 'absolute' : 'fixed',
      };
    },
  },
  beforeMount() {
    if (this.isPreventScroll) {
      preventScroll(true);
    }
  },
  beforeDestroy() {
    if (this.isPreventScroll) {
      preventScroll(false);
    }
  },
  methods: {
    handleClick() {
      this.$emit('clicked');
    },
  },
};
</script>

<style lang="scss" module>
  .BaseOverlay {
    top: 0;
    left: 0;
    z-index: 30;
    width: 100%;
    height: 100%;
    background-color: rgba(#1a2a44, .7);
    transition-property: opacity;
    will-change: opacity;
  }
</style>
