<template>
<div
  class="index-page"
>
  <TheHeader
    v-model="isShowMenu"
    :items="$options.navItems"
    :is-green="isGeographyIntersected"
  />
  <BaseDrawer v-model="isShowMenu">
    <div class="drawer-nav">
      <template v-for="item in $options.navItems">
        <div
          v-if="!item.href"
          :key="item.slug"
          class="drawer-nav__item"
          @click="handleScrollTo(item.slug)"
        >
          {{ item.text }}
        </div>
        <a
          v-else
          :key="item.href"
          :href="item.href"
          class="drawer-nav__item"
          target="_blank"
        >
          {{ item.text }}
        </a>
      </template>
    </div>
  </BaseDrawer>
  <div class="index-page-content">
    <VIntersect
      @enter="onFirstIntersect"
    >
      <div class="main">
        <div class="line__vertical line__vertical-one" />
        <div class="line__vertical line__vertical-two" />
        <div class="main__header-wrapper">
          <div class="line__horizontal mobile mobile-one"/>
          <VTextSlice class="main__header">
            GLOBAL
            CONSTRUCTION
          </VTextSlice>
          <div class="line__horizontal mobile mobile-two"/>
        </div>
        <div class="main__img-wrapper">
          <video
            id="myVideo"
            autoplay
            muted
            loop
            class="main__img"
          >
            <source
              src="bg.mp4"
              type="video/mp4"
            >
          </video>
          <!-- <NuxtImg
            src="/main-bg.jpg"
            alt="sd"
            class="main__img"
            loading="lazy"
          /> -->
        </div>
        <div class="line__vertical line__vertical-one-bottom" />
        <div class="line__vertical line__vertical-two-bottom" />
        <div class="line__horizontal"/>
      </div>
    </VIntersect>
    <VIntersect
      @enter="onSecondAnimation"
    >
      <div
        id="about"
        class="about"
      >
        <h2 class="about__header page__header">О НАС</h2>
        <div
          class="about__content"
        >
          <div
            class="about__img-wrapper"
          >
            <NuxtImg
              class="about__img"
              src="/bg2.jpg"
              alt="Проект башня ОКО"
              loading="lazy"
            />
            <VTextSlice class="about__img-header">
              GLOBAL
              CONSTRUCTION
              <!-- GROUP -->
            </VTextSlice>
          </div>
          <TheTextSlider class="about__content-right"/>
        </div>
      </div>
    </VIntersect>
    <VIntersect
      @enter="onBenefitsIntersect"
    >
      <div class="benefits">
        <div class="line__horizontal line__horizontal-top"/>
        <div class="benefits__left">
          <h2 class="benefits__header page__header">Преимущества</h2>
          <div class="line__vertical" />
        </div>
        <div class="benefits__right">
          <div class="benefits__row">
            <div class="line__horizontal" />
            <div class="benefits__row-inner">
              <div class="benefits__count">
                1 /
              </div>
              <div class="benefits__text">
                Высокое качество работ
              </div>
            </div>
          </div>
          <div class="benefits__row">
            <div class="line__horizontal" />
            <div class="benefits__row-inner">
              <div class="benefits__count">
                2 /
              </div>
              <div class="benefits__text">
                Соблюдение сроков строительства
              </div>
            </div>
          </div>
          <div class="benefits__row">
            <div class="line__horizontal" />
            <div class="benefits__row-inner">
              <div class="benefits__count">
                3 /
              </div>
              <div class="benefits__text">
                Наличие всех необходимых разрешений
              </div>
            </div>
          </div>
          <div class="benefits__row">
            <div class="line__horizontal" />
            <div class="benefits__row-inner">
              <div class="benefits__count">
                4 /
              </div>
              <div class="benefits__text">
                Высококвалифицированный персонал
              </div>
            </div>
          </div>
          <div class="benefits__row">
            <div class="line__horizontal" />
            <div class="benefits__row-inner">
              <div class="benefits__count">
                5 /
              </div>
              <div class="benefits__text">
                Постоянное совершенствование
              </div>
            </div>
          </div>
          <div class="benefits__row">
            <div class="benefits__row-bottom">
              <p>
                Большой опыт в сфере строительно-монтажных и инженерных работ, а также высокая квалификация работников позволяют нам выполнять работы любой сложности с гарантированным качеством.
              </p>
              <p>
                Мы тщательно подбираем материалы под технические требования объекта, пожелания заказчика, не нарушая внешний вид интерьера.
              </p>
            </div>
          </div>
        </div>
        <div class="line__horizontal line__horizontal-bottom"/>
      </div>
    </VIntersect>
    <TheProjects :is-mobile="isMobile"/>
    <TheGeography
      :is-mobile="isMobile"
      @enter="onEnterGeography"
      @leave="onLeaveGeography"
    />
    <TheServices/>
    <TheLicenses :is-mobile="isMobile"/>
    <TheContacts :is-mobile="isMobile"/>
    <div class="page__copy">
      &copy;&nbsp;Global Construction Group {{ new Date().getFullYear() }}
    </div>
  </div>
</div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import TheHeader from '~/components/TheHeader.vue';
import VTextSlice from '~/components/ui/VTextSlice.vue';
import VIntersect from '~/components/ui/VIntersect.vue';

import BaseDrawer from '~/components/ui/BaseDrawer.vue';
import navItems from '~/constants/nav';

import TheProjects from '~/components/TheProjects.vue';
import TheGeography from '~/components/TheGeography.vue';
import TheServices from '~/components/TheServices.vue';
import TheLicenses from '~/components/TheLicenses.vue';
import TheContacts from '~/components/TheContacts.vue';
import TheTextSlider from '~/components/TheTextSlider.vue';
// import MAIN_QUERY from '~/queries/main';
/* eslint-disable no-promise-executor-return*/
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export default {
  name: 'IndexPage',
  components: {
    TheHeader,
    TheTextSlider,
    VTextSlice,
    VIntersect,
    TheProjects,
    BaseDrawer,
    TheGeography,
    TheServices,
    TheLicenses,
    TheContacts,
  },
  // scrollToTop: true,
  navItems,
  data() {
    return {
      isMounted: false,
      isFirstIntersected: false,
      isBenefitsIntersected: false,
      isShowMenu: false,
      isGeographyIntersected: false,
    };
  },
  // async fetch() {
  //   try {
  //     const data = await this.$graphql.query({
  //       query: MAIN_QUERY,
  //     });
  //     console.log('🚀 ~ file: index.vue ~ line 37 ~ fetch ~ data', data);
  //   } catch (error) {
  //     console.log('🚀 ~ file: index.vue ~ line 36 ~ fetch ~ error', error);
  //   }
  // },
  head() {
    return {
      title: 'Global Construction',
    };
  },
  computed: {
    isFirstAnimationPlay() {
      return this.isMounted && this.isFirstIntersected;
    },
    isMobile() {
      if (!this.isMounted) {
        return false;
      }
      return this.$nuxt.$mq !== 'lg';
    },
    // isBenefitsAnimationPlay() {
    //   return this.isMounted && this.isBenefitsIntersected;
    // },
  },
  watch: {
    isFirstAnimationPlay(val) {
      if (!val) {
        return;
      }
      return sleep(100).then(() => this.onFirstAnimation());
    },
    isBenefitsIntersected(val) {
      if (!val) {
        return;
      }
      return this.runBenefitsAnimation();// sleep(500).then(() => this.runBenefitsAnimation());
    },
    isMobile(val, oldVal) {
      // console.log('🚀 ~ file: index.vue ~ line 257 ~ isMobile ~ val', val, oldVal);
      if (!val) {
        // console.log('🚀 ~ file: index.vue ~ line 265 ~ isMobile ~ !val');
        // this.isFirstIntersected = false;
        // this.isFirstIntersected = true;
        // this.isBenefitsIntersected = false;
        // this.isBenefitsIntersected = true;
        this.runBenefitsAnimation();
        this.onFirstAnimation();
      }
    },
  },
  mounted() {
    this.isMounted = true;
    // await sleep(500);
    // this.onFirstAnimation();
  },
  methods: {
    // handleResize() {
    //   if (!this.isMounted) {
    //     return;
    //   }
    //   // this.window.innerWidth > 1023;
    //   // console.log('🚀 ~ file: index.vue ~ line 274 ~ handleResize ~ this.window.innerWidth > 1023', window.innerWidth > 1024);
    // },
    onEnterGeography() {
      // console.log('🚀 ~ file: index.vue ~ line 262 ~ onEnterGeography ~ onEnterGeography');
      this.isGeographyIntersected = true;
    },
    onLeaveGeography() {
      // console.log('🚀 ~ file: index.vue ~ line 265 ~ onLeaveGeography ~ onLeaveGeography');
      this.isGeographyIntersected = false;
    },
    async handleScrollTo(slug) {
      this.isShowMenu = false;
      await sleep(400);
      return this.$scrollTo(`#${slug}`, { offset: -41 });
    },
    onBenefitsIntersect() {
      this.isBenefitsIntersected = true;
      // console.log('🚀 ~ file: index.vue ~ line 212 ~ onBenefitsIntersect ~ onBenefitsIntersect');
    },
    runBenefitsAnimation() {
      const { $anime } = this;
      const timeline = $anime
        .timeline({
          easing: 'easeInCubic',
        })
        .add({
          targets: '.benefits .line__horizontal-top',
          scaleX: [0, 1],
          duration: 700,
        });
      if (this.isMobile) {
        return timeline
          // .add({
          //   targets: '.benefits__left .line__vertical',
          //   scaleY: [0, 1],
          //   duration: 700,
          // })
          .add({
            targets: '.benefits__row .line__horizontal',
            scaleX: [0, 1],
            duration: 700,
            delay: $anime.stagger(100),
          }, '-=500')
          .add({
            targets: '.benefits .line__horizontal-bottom',
            scaleX: [0, 1],
            duration: 700,
          });
      }
      return timeline
        .add({
          targets: '.benefits__left .line__vertical',
          scaleY: [0, 1],
          duration: 700,
        })
        .add({
          targets: '.benefits__row .line__horizontal',
          scaleX: [0, 1],
          duration: 700,
          delay: $anime.stagger(100),
        }, '-=500')
        .add({
          targets: '.benefits .line__horizontal-bottom',
          scaleX: [0, 1],
          duration: 700,
        });
    },
    onFirstIntersect() {
      this.isFirstIntersected = true;
      // console.log('🚀 ~ file: index.vue ~ line 241 ~ onFirstIntersect ~ isFirstIntersected');
    },
    onSecondAnimation() {
      // console.log('🚀 ~ file: index.vue ~ line 244 ~ onSecondAnimation ~ onSecondAnimation');
      const { $anime } = this;
      $anime({
        targets: '.about__img-header .v-text-slice__letter',
        opacity: [0, 1],
        delay: $anime.stagger(100, { from: 'center' }),
      });
    },
    onFirstAnimation() {
      const { $anime } = this;
      const letterAnimation = {
        targets: '.main__header .v-text-slice__letter',
        translateY: ['100%', 0],
        opacity: [0, 1],
        delay: $anime.stagger(100, { from: 'center' }),
        duration: 800,
      };
      if (this.isMobile) {
        return $anime
          .timeline({
            easing: 'easeInCubic',
          })
          .add(letterAnimation)
          .add({
            targets: '.main .line__horizontal.mobile.mobile-one',
            scaleX: [0, 1],
            duration: 200,
          }, '-=400')
          .add({
            targets: '.main .line__horizontal.mobile.mobile-two',
            scaleX: [0, 1],
            duration: 600,
          }, '-=200');
      }
      return $anime
        .timeline({
          easing: 'easeInCubic',
        })
        // .add({
        //   targets: '.the-header .line__horizontal',
        //   scaleX: [0, 1],
        //   duration: 400,
        // })
        .add({
          targets: '.main .line__vertical-one',
          scaleY: [0, 1],
          duration: 700,
        })// , '-=400'
        .add(letterAnimation, '-=200')
        .add({
          targets: '.main .line__vertical-one-bottom',
          scaleY: [0, 1],
          duration: 600,
        }, '-=400')
        .add({
          targets: '.main .line__horizontal',
          scaleX: [0, 1],
          duration: 1000,
        }, '-=300')
        .add({
          targets: '.main .line__vertical-two',
          scaleY: [0, '100%'],
          duration: 500,
        }, '-=700')
        .add({
          targets: '.main .line__vertical-two-bottom',
          scaleY: [0, 1],
          duration: 400,
        }, '-=400');
    },
  },
};
</script>

<style lang="scss">
  .drawer-nav {
    display: flex;
    justify-content: flex-end;
    height: 100%;
    padding: 64px  16px;
    background-color: white;
    color: #002f72;
    flex-direction: column;

    &__item {
      margin-bottom: 32px;
      text-align: right;
      text-transform: uppercase;
      font-size: 16px;
      font-weight: 400;
      line-height: 19px;
      letter-spacing: .32em;
      cursor: pointer;
    }
  }

  .benefits {
    position: relative;
    display: flex;

    @include respond-to(md) {
      flex-direction: column;
    }

    .line__horizontal {
      transform-origin: torem(352) 50%;
    }

    .line__horizontal-bottom {
      bottom: 0;
      transform-origin: torem(352) 50%;
    }

    .line__vertical {
      top: 0;
      right: 0;
      height: 100%;

      @include respond-to(md) {
        display: none;
      }
    }

    &__left {
      position: relative;
      padding-top: torem(31);
      flex-basis: torem(352);

      @include respond-to(md) {
        flex-basis: 100%;
        padding-top: 24px;
        padding-bottom: 32px;
      }
    }

    &__header {
      margin-left: torem(32);

      @include respond-to(md) {
        margin-left: 16px;
      }
    }

    &__right {
      flex: 1;
    }

    &__row {
      position: relative;
      display: flex;
      width: 100%;

      .line__horizontal {
        bottom: 0;
        transform-origin: 0%;

        @include respond-to(md) {
          background-color: $olive;
        }
      }
    }

    &__row-inner {
      display: flex;
      width: 100%;
      padding: torem(48) torem(32);

      @include respond-to(md) {
        padding: 16px;
      }
    }

    &__count {
      font-size: torem(20);
      font-weight: 400;
      line-height: percentage(23px / 20px);
      letter-spacing: .02em;
      color: $olive;

      @include respond-to(md) {
        font-size: 10px;
        line-height: 10px;
      }
    }

    &__text {
      margin-left: torem(12);
      font-size: torem(32);
      font-weight: 500;
      line-height: percentage(48px / 32px);
      letter-spacing: .02em;
      color: $black;

      @include respond-to(md) {
        margin-left: 4px;
        font-size: 14px;
        line-height: 16px;
      }
    }

    &__row-bottom {
      padding: torem(118) torem(12) torem(118) torem(104);

      @include respond-to(md) {
        padding: 32px 16px 100px 16px;
      }

      p {
        margin-bottom: torem(28);
        font-size: torem(18);
        font-weight: 400;
        line-height: percentage(27px / 18px);
        color: $black;

        @include respond-to(md) {
          margin-bottom: 16px;
          font-size: 12px;
          line-height: 17px;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }

  .about {
    margin-bottom: torem(140);
    padding-top: torem(140);

    @include respond-to(md) {
      margin-bottom: 100px;
      padding-top: 100px;
    }

    &__header {
      margin-bottom: torem(100);
      margin-left: 48px;

      @include respond-to(md) {
        display: none;
      }
    }

    &__content {
      display: flex;

      @include respond-to(md) {
        flex-direction: column;
      }
    }

    &__img-wrapper {
      position: relative;
      width: torem(815);
      height: torem(542);

      @include respond-to(md) {
        order: 2;
        width: 100%;
        height: unset;
        padding-right: 16px;
        padding-left: 16px;
      }
    }

    &__img {
      width: torem(815);
      object-fit: cover;

      @include respond-to(md) {
        width: 100%;
        aspect-ratio: 328 / 167;
      }
    }

    &__img-header {
      position: absolute;
      top: 0;
      right: 0;
      max-width: torem(278);
      font-size: torem(34);
      font-weight: 700;
      line-height: percentage(40px / 34px);
      letter-spacing: .02em;
      color: $black;
      transform: translate(torem(133.3), torem(-37));

      .v-text-slice__word {
        // &:nth-child(2) {
        //   .v-text-slice__letter:nth-child(-n+6) {
        //     color: white;
        //   }
        // }

        // &:last-child {
        //   color: white;
        // }

        .v-text-slice__letter {
          opacity: 0;
        }
      }

      @include respond-to(md) {
        left: 0;
        max-width: 176px;
        // transform: translate(-26px, -31px);
        text-align: left;
        // text-align: right;
        font-size: 14px;
        font-weight: 700;
        line-height: 16px;
        letter-spacing: .04em;
        transform: translate(17px, -16px);
      }
    }

    &__content-right {
      display: flex;
      justify-content: center;
      // padding-top: torem(75);
      padding-right: torem(48);
      // padding-bottom: torem(75);
      padding-left: torem(54);
      font-size: torem(16);
      font-weight: 400;
      line-height: percentage(24px / 16px);
      letter-spacing: .02em;
      color: #0b0b0b;
      flex-direction: column;

      p {
        margin-bottom: torem(20);

        @include respond-to(md) {
          margin-bottom: 16px;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }

      @include respond-to(md) {
        order: 1;
        margin-bottom: 34px;
        padding-right: 16px;
        padding-left: 16px;
        font-size: 12px;
        line-height: 17px;
      }
    }
  }

  .page {
    &__header {
      text-transform: uppercase;
      font-size: torem(12);
      font-weight: 400;
      line-height: percentage(14px / 12px);
      letter-spacing: .32em;
      color: $olive;

      @include respond-to(md) {
        font-size: 12px;
        line-height: 14px;
      }
    }

    &__copy {
      display: flex;
      align-items: center;
      justify-content: center;
      height: torem(56);
      font-size: torem(12);
      font-weight: 400;
      line-height: percentage(14px / 12px);
      color: $black;

      @include respond-to(md) {
        height: 81px;
        line-height: 17px;
        letter-spacing: .02em;
      }
    }
  }

  .line {
    background-color: $black;

    &__horizontal {
      position: absolute;
      right: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: $black;
      transform: scaleX(0);
      transform-origin: 20% 50%;
    }

    &__vertical {
      position: absolute;
      // left: 0;
      width: 1px;
      // height: 100%;
      background-color: $black;
      transform: scaleY(0);
      transform-origin: 0% 0%;
    }

    &.show {
      transform: translate(0, 0);
    }
  }

  .main {
    position: relative;
    height: torem(866);

    @include respond-to(md) {
      display: flex;
      height: auto;
      flex-direction: column;
    }

    .v-text-slice__letter {
      transform: translateY(100%);
    }

    .line__vertical {
      @include respond-to(md) {
        display: none;
      }
    }

    .line__horizontal {
      bottom: 0;
      transform-origin: torem(129) 50%;

      @include respond-to(md) {
        display: none;
      }

      &.mobile {
        display: none;
        transform: scaleX(100%);

        @include respond-to(md) {
          bottom: 24px;
          display: block;
        }
      }

      &.mobile-one {
        display: none;
        width: 12px;
        transform: scaleX(0);
        transform-origin: 0% 50%;

        @include respond-to(md) {
          display: block;
        }
      }

      &.mobile-two {
        position: absolute;
        right: 0;
        left: unset;
        display: none;
        width: 180px;
        transform: scaleX(0);
        transform-origin: 0% 50%;

        @include respond-to(md) {
          display: block;
          width: calc(100% - 340px);
        }
      }
    }

    .line__vertical-one {
      top: 0;
      left: torem(129);//px;
      height: torem(90);
    }

    .line__vertical-one-bottom {
      bottom: 0;
      left: torem(129);
      height: torem(550);
    }

    .line__vertical-two {
      top: 0;
      left: torem(879);
      height: torem(174);
    }

    .line__vertical-two-bottom {
      bottom: 0;
      left: torem(879);
      height: torem(48);
    }

    &__inner {
      position: relative;
      padding-top: torem(61);
      padding-left: torem(48);
    }

    &__header-wrapper {
      padding-top: torem(90);
      padding-left: torem(48);

      @include respond-to(md) {
        order: 2;
        margin-top: -46px;
        padding-top: unset;
        padding-left: 16px;
      }
    }

    &__header {
      position: relative;
      z-index: 2;
      max-width: torem(1017);
      font-size: torem(95);
      font-weight: 900;
      // line-height: 118%;
      line-height: percentage(112px / 95px);
      letter-spacing: .245em;
      color: #002f72;

      .v-text-slice__word {
        &:nth-child(2) {
          .v-text-slice__letter:nth-child(n+4) {
            color: #d9d9d9;

            @include respond-to(md) {
              color: #002f72;
            }
          }
        }
      }

      // mix-blend-mode: color;

      @include respond-to(md) {
        position: relative;
        max-width: unset;
        font-size: 40px;
        line-height: 118%;
        // mix-blend-mode: unset;
        letter-spacing: 0;

        .v-text-slice__word:first-child {
          color: #d9d9d9;
        }
      }

      // @include respond-to(sm) {
      //   font-size: 32px;
      // }
    }

    &__img-wrapper {
      position: absolute;
      top: torem(203);
      right: 0;
      z-index: 0;

      @include respond-to(md) {
        position: static;
        order: 1;
      }
    }

    &__img {
      width: torem(1107);
      height: torem(599);
      object-fit: cover;
      // background-image: url('/main-bg.jpg');
      @include respond-to(md) {
        width: 100%;
        height: 374px;
      }
    }
  }

  .index-page {
    // overflow-x: hidden;
    flex: 1;
    height: 100%;
  }

  .index-page-content {
    width: 100%;
    padding-top: var(--header-h);
  }
</style>
