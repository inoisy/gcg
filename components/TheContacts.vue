<template>
<VIntersect
  @enter="onEnter"
>
  <div
    id="contacts"
    class="contacts"
  >
    <div class="contacts__left">
      <div class="contacts__header page__header mobile">
        Контакты
      </div>
      <yandex-map
        v-if="isMounted"
        class="contacts__map"
        :settings="mapSettings"
        :coords="coords"
        :controls="[]"
        :zoom="18"
      >
        <ymap-marker
          marker-id="1"
          :coords="coords"
        />
      </yandex-map>
    </div>
    <div class="contacts__right">
      <div class="contacts__line-vertical line__vertical"/>
      <div class="contacts__right-inner">
        <div class="contacts__header page__header">
          Контакты
        </div>
        <div class="contacts__text contacts__item contacts__margin-bottom">
          <span>ОГРН </span>
          <span>1187746853469</span>
        </div>
        <div class="contacts__text contacts__item contacts__margin-bottom">
          <span>ИНН </span>
          <span>9729275666</span>
        </div>
        <div class="contacts__text contacts__item contacts__margin-bottom">
          <span>График работы </span>
          <span>09:00 – 18.00</span>
        </div>
        <div class="contacts__margin-bottom">
          <div class="contacts__text contacts__address">
            119530, г.Москва,  Очаковское шоссе, дом 34
          </div>
          <div class="contacts__coords">
            {{ coords.join(', ') }}
          </div>
        </div>

        <div class="contacts__text contacts__email contacts__margin-bottom">
          <a href="mailto:info@globalcons.group">info@globalcons.group</a>
        </div>
        <div class="contacts__text contacts__phones">
          <a href="tel:+74992880268">+7 499 288 02 68</a>
          <a href="tel:+74957433055">+7 495 743 30 55</a>
        </div>
      </div>
    </div>
    <div class="contacts__line-bottom line__horizontal"/>
  </div>
</VIntersect>
</template>

<script>
// class="mb-6"
// import {
//   yandexMap,
//   ymapMarker,
// } from 'vue-yandex-maps';
import VIntersect from '~/components/ui/VIntersect.vue';


export default {
  name: 'TheContacts',
  components: {
    // yandexMap,
    // ymapMarker,
    VIntersect,
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      coords: [55.686736, 37.440496],
      mapSettings: {
        apiKey: process.env.MAP_API_KEY,
        lang: 'ru_RU',
        coordorder: 'latlong',
        enterprise: false,
        version: '2.1',
        //
      },
      isMounted: false,
      isIntersected: false,
    };
  },
  watch: {
    isIntersected(val) {
      if (val) {
        this.runAnimation();
      }
    },
    isMobile(val, oldVal) {
      if (!val) {
        this.runAnimation();
      }
    },
  },
  mounted() {
    this.isMounted = true;
  },
  methods: {
    onEnter() {
      this.isIntersected = true;
    },
    runAnimation() {
      const animation = this.$anime
        .timeline({
          easing: 'easeInCubic',
        });
      if (!this.isMobile) {
        animation.add({
          targets: '.contacts__line-vertical',
          scaleY: [0, 1],
          duration: 700,
        });
      }
      animation.add({
        targets: '.contacts__line-bottom',
        scaleX: [0, 1],
        duration: 700,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  .contacts {
    position: relative;
    display: flex;

    @include respond-to(md) {
      padding-top: 32px;
      padding-right: 16px;
      padding-bottom: 32px;
      padding-left: 16px;
      flex-direction: column;
    }

    &__left {
      width: torem(720);
      height: torem(889);

      @include respond-to(md) {
        width: 100%;
        height: unset;
        margin-bottom: 24px;
      }
    }

    &__map {
      width: 100%;
      height: 100%;
      -webkit-filter: grayscale(100%);

      @include respond-to(md) {
        height: 260px;
      }
    }

    &__right {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;
    }

    &__right-inner {
      width: torem(386);

      @include respond-to(md) {
        display: flex;
        width: 100%;
        flex-direction: column;
      }
    }

    &__header {
      margin-bottom: torem(32);

      @include respond-to(md) {
        display: none;
      }

      &.mobile {
        display: none;

        @include respond-to(md) {
          display: block;
          margin-bottom: 27px;
        }
      }
    }

    &__text {
      font-size: torem(18);
      font-weight: 400;
      line-height: percentage(21px / 18px);
      color: $black;

      @include respond-to(md) {
        font-size: 12px;
        line-height: 17px;
      }
    }

    &__margin-bottom {
      margin-bottom: torem(24);

      @include respond-to(md) {
        margin-bottom: 16px;
      }
    }

    &__item {
      // margin-bottom: torem(24);

      @include respond-to(md) {
        display: flex;
        // margin-bottom: 16px;
      }

      span {
        + span {
          margin-left: 12px;

          @include respond-to(md) {
            margin-left: auto;
          }
        }
      }
    }

    &__address {
      margin-bottom: torem(10);

      @include respond-to(md) {
        margin-bottom: 16px;
      }
    }

    &__email {
      // margin-bottom: torem(32);
      text-decoration-line: underline;

      // @include respond-to(md) {
      //   margin-bottom: 16px;
      // }
    }

    &__coords {
      // margin-bottom: torem(32);
      font-size: torem(16);
      font-weight: 300;
      line-height: percentage(19px/16px);
      color: $olive;

      @include respond-to(md) {
        order: -1;
        // margin-bottom: 32px;
        font-size: 10px;
        line-height: 12px;
      }
    }

    &__phones {
      @include respond-to(md) {
        display: flex;
      }

      a + a {
        margin-left: 16px;

        @include respond-to(md) {
          margin-left: auto;
        }
      }
    }

    &__line-bottom {
      bottom: 0;
      transform-origin: torem(720) 0%;

      @include respond-to(md) {
        transform-origin: 0% 0%;
      }
    }

    &__line-vertical {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;

      @include respond-to(md) {
        display: none;
      }
    }
  }
</style>
