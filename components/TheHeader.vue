<template>
<div
  class="the-header"
  :class="{
    'is-green': isGreen,
    'is-menu-open': value
  }"
>
  <div class="the-header__inner">
    <NuxtLink
      to="/"
      class="the-header__logo"
    >
      <!-- <SvgIcon
        :class="{'white': value}"
        class="the-header__logo-img"
        name="logo"
      /> -->
      <img
        class="the-header__logo-img"
        src="/logo-new.svg"
        alt="logo"
      />
    </NuxtLink>
    <div
      class="the-header__nav"
    >
      <template v-for="item in items">
        <div
          v-if="!item.href"
          :key="item.slug"
          class="the-header__nav-item"
          @click="$scrollTo(`#${item.slug}`,{ offset: -72 })"
        >
          {{ item.text }}
        </div>
        <a
          v-else
          :key="item.href"
          :href="item.href"
          class="the-header__nav-item"
          0
          target="_blank"
        >
          {{ item.text }}
        </a>
      </template>
    </div>
    <div
      class="the-header__burger"
      :class="{'is-open':value}"
      @click="onBurgerClick"
    >
      <span class="the-header__burger-line-one"></span>
      <span class="the-header__burger-line-two"></span>
    </div>
  </div>
  <div
    class="line__horizontal"
    :class="{'white': value}"
  />
</div>
</template>

<script>
// import navItems from '~/constants/nav';
export default {
  name: 'TheHeader',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      required: true,
    },
    isGreen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // isMounted: false,
      // items: navItems,
      // isShowMenu: false,
    };
  },
  computed: {
    // backgroundColor() {
    //   if (this.value) {
    //     return '#0B0B0B';
    //   }
    //   return 'white';
    // },
  },
  mounted() {
    this.$anime.timeline({
      easing: 'easeInCubic',
    }).add({
      targets: '.the-header .line__horizontal',
      scaleX: [0, 1],
      duration: 700,
    });
  },
  methods: {
    onBurgerClick() {
      return this.$emit('input', !this.value);
    },
  },
  // mounted() {
  //   this.isMounted = true;
  // },
};
</script>

<style lang="scss">
  :root {
    --header-h: 72px;

    @include respond-to(md) {
      --header-h: 41px;
    }
  }

  .the-header {
    position: fixed;
    // position: relative;
    top: 0;
    z-index: 700;
    width: 100%;
    height: var(--header-h);
    background-color: white;
    transition: background-color .4s cubic-bezier(.4, 0, .2, 1);

    &.is-green {
      // background-color: transparent;
      background: linear-gradient(125.8deg, #394d4b 0%, #253430 100%);

      .the-header__logo-img {
        color: white;
      }

      .line__horizontal {
        background-color: white;
      }

      .the-header__nav-item {
        color: white;
      }

      .the-header__burger-line-one,
      .the-header__burger-line-two {
        background-color: white;
      }
    }

    &.is-menu-open {
      background-color: $black;
    }

    &__inner {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 16px 48px;

      @include respond-to(md) {
        padding: 8px 16px;
        //   justify-content: center;
      }
    }

    .line__horizontal {
      // transform: scaleX(100%);
      transform-origin: torem(129) 50%;

      @include respond-to(md) {
        transform-origin: 0% 50%;
      }

      &.white {
        background-color: white;
      }
    }

    &__logo {
      // width: 90px;
      // min-width: 90px;

      // @include respond-to(md) {
      //   width: 56px;
      //   min-width: 56px;
      // }
      display: flex;
    }

    &__logo-img {
      width: 143.13px;
      height: 40px;
      color: $black;
      transition: color $transition;
      object-fit: contain;

      @include respond-to(md) {
        width: 90px;
        min-width: 90px;
        height: 25px;
      }

      &.white {
        color: white;
      }
    }

    &__nav {
      display: flex;
      justify-content: space-between;
      flex: 1;
      margin-left: torem(180);

      @include respond-to(lg) {
        margin-left: torem(150);
      }

      @include respond-to(md) {
        display: none;
      }
    }

    &__nav-item {
      text-transform: uppercase;
      font-size: 12px;
      font-weight: 500;
      line-height: 14px;
      letter-spacing: .32em;
      color: $black;
      cursor: pointer;

      &.nuxt-link-active {
        color: $olive;
      }
    }

    &__burger {
      position: relative;
      display: none;
      width: 24px;
      height: 24px;
      margin-left: auto;
      cursor: pointer;

      @include respond-to(md) {
        display: block;
      }

      &.is-open {
        &:before,
        &:after {
          background-color: white;
        }

        .the-header__burger-line-one {
          background-color: white;
          transform: rotate(45deg)  translate(3px, 2px); //translateY(9px);
        }

        .the-header__burger-line-two {
          // margin-top: 9px;
          background-color: white;
          transform: rotate(-45deg) translate(3px, -2px);// translateY(15px);
        }
      }
    }

    &__burger-line-one {
      // margin-top: 9px;
      position: absolute;
      top: 8px;
      display: block;
      width: 24px;
      height: .5px;
      background-color: $black;
      // transform: translateY(9px);
      transition: transform $transition, background-color $transition;
    }

    &__burger-line-two {
      position: absolute;
      bottom: 8px;
      display: block;
      width: 24px;
      height: .5px;
      // margin-top: 5px;
      background-color: $black;
      // transform: translateY(15px);
      transition: transform $transition, background-color $transition;
    }
  }
</style>
