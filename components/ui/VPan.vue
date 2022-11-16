<template>
<div
  ref="scrollBox"
  v-touch-pan.horizontal.prevent.mouse="handlePan"
  class="v-pan"
>
  <slot/>
</div>
</template>

<script>
export default {
  name: 'VPan',
  data() {
    return {
      panning: false,
      position: 0,
    };
  },
  methods: {
    handlePan({ evt, ...newInfo }) {
      this.panning = newInfo.isFirst !== true && newInfo.isFinal !== true;
      const newPosition = this.position - newInfo.delta.x;
      return this.handleDelta(newPosition);
    },
    handleDelta(input) {
      const el = this.$refs.scrollBox;
      const max = el.scrollWidth - el.offsetWidth;
      let newPosition = input;
      if (newPosition < 0) {
        newPosition = 0;
      } else if (newPosition > max) {
        newPosition = max;
      }
      if (this.position === newPosition) {
        return;
      }
      this.position = newPosition;
      return el.scrollTo(this.position, 0);
    },
  },
};
</script>

<style lang="scss">
  .v-pan {
    overflow-x: auto;
    overflow-y: hidden;
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
    user-select: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
</style>
