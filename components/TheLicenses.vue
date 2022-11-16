<template>
<VIntersect @enter="onIntersect">
  <div class="licenses">
    <div class="licenses__top-line line__horizontal"/>
    <div class="licenses__inner">
      <div class="licenses__left">
        <div class="licenses__header page__header">
          ЛИЦЕНЗИИ
        </div>
        <component
          :is="itemsComponent"
          class="licenses__items-wrapper"
        >
          <a
            v-for="(item,index) in items"
            :key="item.title"
            class="licenses__item"
            :href="item.href"
            target="_blank"
          >
            <div>{{ index + 1 }} /</div>
            <div>{{ item.title }}</div>
            <SvgIcon
              class="licenses__pdf"
              name="pdf"
            />
          </a>
        </component>
      </div>
      <div class="licenses__right">
        <div class="licenses__vertical-line line__vertical"/>
        <div class="licenses__right-header page__header">Регламент качества</div>
        <div class="licenses__right-text">
          <p>
            Мы строго следуем правилам и регламенту качества строительных работ, технических норм и стандартов охраны труда.
          </p>
          <p>
            Имеем всю необходимую документацию, лицензии МЧС и разрешение на осуществление деятельности.
            А также являемся членом саморегулируемой организации.
          </p>
        </div>
      </div>
    </div>
    <div class="licenses__bottom-line line__horizontal"/>
  </div>
</VIntersect>
</template>

<script>
import VIntersect from '~/components/ui/VIntersect.vue';
import VPan from '~/components/ui/VPan.vue';

export default {
  name: 'TheLicenses',
  components: {
    VIntersect,
    VPan,
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isIntersect: false,
      items: [
        {
          title: 'СЕРТИФИКАТ СООТВЕТСТВИЯ',
          href: '/licenses/Сертификат соответствия 2021-24.pdf',
        },
        {
          title: 'ЛИЦЕНЗИЯ',
          href: '/licenses/Лицензия МЧС.pdf',
        },
        {
          title: 'ВЫПИСКА',
          href: '/licenses/Выписка СРО от 17.08.2022.pdf',
        },
      ],
    };
  },
  computed: {
    itemsComponent() {
      return this.isMobile ? 'VPan' : 'div';
    },
  },
  watch: {
    isIntersect(val) {
      this.runAnimation();
    },
    isMobile(val) {
      if (!val) {
        this.runAnimation();
      }
    },
  },
  methods: {
    onIntersect() {
      this.isIntersect = true;
    },
    runAnimation() {
      const animation = this.$anime
        .timeline({
          easing: 'easeInCubic',
        })
        .add({
          targets: '.licenses__top-line',
          scaleX: [0, 1],
          duration: 700,
        });

      if (!this.isMobile) {
        animation.add({
          targets: '.licenses__vertical-line',
          scaleY: [0, 1],
          duration: 700,
        }, '-=500');
      }

      animation.add({
        targets: '.licenses__bottom-line',
        scaleX: [0, 1],
        duration: 700,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .licenses {
    position: relative;

    &__inner {
      display: flex;

      @include respond-to(md) {
        flex-direction: column;
        padding-bottom: 100px;
      }
    }

    &__left {
      padding-top: torem(32);
      padding-bottom: torem(237);
      padding-left: torem(32);
      flex-basis: torem(879);

      @include respond-to(md) {
        padding-top: 24px;
        // padding-right: 16px;
        padding-bottom: 32px;
        padding-left: 16px;
        flex-basis: 100%;
      }
    }

    &__right {
      position: relative;
      display: flex;
      justify-content: center;
      flex: 1;
      padding-right: torem(48);
      padding-left: torem(39);
      flex-direction: column;

      @include respond-to(md) {
        padding-right: 16px;
        padding-left: 16px;
      }
    }

    &__top-line {
      top: 0;
      // transform: scaleX(100%);
      transform-origin: torem(879) 0%;

      @include respond-to(md) {
        transform-origin: 0% 0%;
      }
    }

    &__bottom-line {
      bottom: 0;
      // transform: scaleX(100%);
      transform-origin: torem(879) 0%;

      @include respond-to(md) {
        transform-origin: 0% 0%;
      }
    }

    &__vertical-line {
      left: 0;
      height: 100%;
      // transform: scaleY(100%);

      @include respond-to(md) {
        display: none;
      }
    }

    &__header {
      margin-bottom: torem(189);
      font-size: torem(14);

      @include respond-to(md) {
        margin-bottom: 32px;
        font-size: 12px;
      }
    }

    &__items-wrapper {
      display: flex;
      gap: torem(48);
      align-items: center;
      justify-content: center;

      @include respond-to(md) {
        gap: 0;
        justify-content: flex-start;
      }
    }

    &__item {
      position: relative;
      width: torem(183);
      height: torem(259);
      padding-top: torem(106);
      padding-right: torem(13);
      padding-left: torem(8);
      border-radius: 28px 0 0 0;
      border: 1px solid $olive;
      background: #fff;
      text-transform: uppercase;
      font-size: torem(14);
      font-weight: 400;
      line-height: percentage(16px / 14px);
      letter-spacing: .32em;
      color: #aac0b4;

      @include respond-to(md) {
        width: 180px;
        min-width: 180px;
        height: 99px;
        margin-right: 16px;
        padding-top: 38px;
        padding-right: 9px;
        padding-left: 9px;
        font-size: 10px;
        font-weight: 300;
        line-height: 12px;
        letter-spacing: 0;
      }
    }

    &__pdf {
      position: absolute;
      right: 0;
      bottom: 0;
      width: torem(64.62);
      height: torem(59);
      color: $olive;

      @include respond-to(md) {
        width: 40.52px;
        height: 37px;
      }
    }

    &__right-header {
      margin-bottom: 24px;

      @include respond-to(md) {
        display: none;
      }
    }

    &__right-text {
      font-size: torem(16);
      font-weight: 400;
      line-height: percentage(24px/16px);
      letter-spacing: .02em;
      color: #0b0b0b;

      p {
        margin-bottom: torem(24);

        @include respond-to(md) {
          margin-bottom: 16px;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }

      @include respond-to(md) {
        font-size: 12px;
        line-height: 17px;
      }
    }
  }
</style>
