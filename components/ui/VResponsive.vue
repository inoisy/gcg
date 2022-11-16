<script>
// function getSlot (vm, name = 'default', data, optional = false) {
//   if (vm.$scopedSlots.hasOwnProperty(name)) {
//     return vm.$scopedSlots[name].(data instanceof Function ? data() : data)
//   } else if (vm.$slots.hasOwnProperty(name) && (!data || optional)) {
//     return vm.$slots[name]
//   }
//   return undefined
// }
/* eslint-disable no-eq-null*/
function convertToUnit(str, unit = 'px') {
  if (str == null || str === '') {
    return undefined;
  } else if (isNaN(Number(str))) {
    return String(str);
  } else {
    return `${Number(str)}${unit}`;
  }
}
export default {
  // export default mixins(Measurable).extend({
  name: 'VResponsive',

  props: {
    aspectRatio: [String, Number],
    contentClass: String,
    height: [Number, String],
    maxHeight: [Number, String],
    maxWidth: [Number, String],
    minHeight: [Number, String],
    minWidth: [Number, String],
    width: [Number, String],
  },

  computed: {
    computedAspectRatio() {
      return Number(this.aspectRatio);
    },
    aspectStyle() {
      return this.computedAspectRatio
        ? { paddingBottom: (1 / this.computedAspectRatio) * 100 + '%' }
        : undefined;
    },
    __cachedSizer() {
      if (!this.aspectStyle) {
        return [];
      }

      return this.$createElement('div', {
        style: this.aspectStyle,
        staticClass: 'v-responsive__sizer',
      });
    },
    measurableStyles() {
      const styles = {};

      const height = convertToUnit(this.height);
      const minHeight = convertToUnit(this.minHeight);
      const minWidth = convertToUnit(this.minWidth);
      const maxHeight = convertToUnit(this.maxHeight);
      const maxWidth = convertToUnit(this.maxWidth);
      const width = convertToUnit(this.width);

      if (height) {
        styles.height = height;
      }
      if (minHeight) {
        styles.minHeight = minHeight;
      }
      if (minWidth) {
        styles.minWidth = minWidth;
      }
      if (maxHeight) {
        styles.maxHeight = maxHeight;
      }
      if (maxWidth) {
        styles.maxWidth = maxWidth;
      }
      if (width) {
        styles.width = width;
      }

      return styles;
    },
  },

  methods: {
    genContent() {
      return this.$createElement('div', {
        staticClass: 'v-responsive__content',
        class: this.contentClass,
      }, this.$slots.default);
    },
  },

  render(h) {
    return h('div', {
      staticClass: 'v-responsive',
      style: this.measurableStyles,
      on: this.$listeners,
    }, [
      this.__cachedSizer,
      this.genContent(),
    ]);
  },
// })
};
</script>

<style lang="scss">
  .v-responsive {
    position: relative;
    overflow: hidden;
    display: flex;
    flex: 1 0 auto;
    max-width: 100%;

    &__content {
      flex: 1 0 0;
      max-width: 100%;
    }

    &__sizer ~ &__content {
      // +ltr()
      margin-left: -100%;

      // +rtl()
      //   margin-right: -100%
    }

    &__sizer {
      flex: 1 0 0;
      transition: padding-bottom .2s $transition;
    }
  }
</style>
