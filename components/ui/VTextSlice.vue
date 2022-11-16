<script>
export default {
  name: 'VTextSlice',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    letterClass: {
      type: String,
      default: 'v-text-slice__letter',
    },
    wordClass: {
      type: String,
      default: 'v-text-slice__word',
    },
  },
  methods: {
    genLetters() {
      if (!this.$slots?.default?.length || !this.$slots.default[0].text) {
        console.error('🚀 ~ file: VTextSlice.vue ~ line 7 ~ genLetters ~ wrong input');
        return [this.$slots.default];
      }
      const cleanString = str => str.replace(/ /g, '');
      const words = cleanString(this.$slots.default[0].text).split('\n')
        .filter(item => Boolean(item));
      const toLetters = word => word.split('');
      return [
        words.map(word => this.$createElement('div', {
          class: this.wordClass,
        }, [
          toLetters(word).map(item => this.$createElement('span', {
            class: this.letterClass,
          }, [item])),
        ])),
      ];
    },
  },
  render(h) {
    return h(this.tag, this.genLetters());
  },
};
</script>

<style lang="scss">
  .v-text-slice {
    &__word {
      overflow: hidden;
      white-space: nowrap;
    }

    &__letter {
      display: inline-block;
    }
  }
</style>
