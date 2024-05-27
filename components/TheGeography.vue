<template>
<VIntersect
  @enter="onEnter"
>
  <div
    id="geography"
    ref="wrapper"
    class="geography"
  >
    <!-- v-resize="onScroll" v-scroll="onScroll" -->
    <div class="geography__left">
      <div class="page__header">
        География присутствия
      </div>
      <div class="geography__projects">
        <div
          v-for="(project) in projects.projectsTop"
          :key="project.slug"
          class="geography__projects-item active"
          @click="handleClickProject(project.slug)"
        >
          {{ project.title }}
        </div>
      </div>

      <div class="geography__projects-other">
        <div class="geography__header-other page__header">
          ДРУГИЕ ПРОЕКТЫ
        </div>
        <div
          v-for="project in projects.projectsBottom"
          :key="project.slug"
          class="geography__projects-item active"
          @click="handleClickProject(project.slug)"
        >
          {{ project.title }}
        </div>
      </div>
    </div>
    <div class="geography__right">
      <div class="line__vertical"/>
      <div class="geography__map-wrapper">
        <yandex-map
          v-if="isMounted"
          ref="map"
          class="geography__map"
          :settings="mapSettings"
          :coords="coords"
          :controls="[]"
          :zoom="zoom"
        >
          <ymap-marker
            v-for="(item,index) in allProjects"
            :key="item.id"
            ref="pin"
            :marker-id="index + 1"
            :coords="[item.lat, item.long]"
          >
            <!-- @click="onClick" -->
            <template slot="balloon">
              <div class="geography__map-popper-inner">
                <div class="geography__map-popper-inner-row">
                  <!-- <div class="geography__map-popper-img-wrapper">
                    <NuxtImg
                      class="geography__map-popper-img"
                      :src="item.img.url"
                      width="200"
                      height="100"
                      loading="lazy"
                    />
                  </div> -->
                  <div class="geography__map-popper-text-wrapper">
                    <div class="geography__map-popper-title">
                      {{ item.title }}
                    </div>
                    <div
                      v-if="item.category"
                      class="geography__map-popper-category"
                    >
                      {{ item.category.name }}
                    </div>
                  </div>
                </div>
                <div class="geography__map-popper-coords">
                  {{ item.lat }}—{{ item.long }}
                </div>
              </div>
            </template>
          </ymap-marker>
        </yandex-map>
        <!--:options="{
              iconImageHref:'/pin.svg'
            }" <NuxtImg
          class="geography__map"
          src="/map.png"
          alt="map"
          loading="lazy"
        />
        <VMenu
          v-for="item in projects.projectsTop"
          :key="item.id"
          ref="pin"
          :placement="'top'"
          class="geography__map-pin"
          :style="{
            top: item.top+'%',
            left: item.left+'%'
          }"
        >
          <template #default="{shown}">
            <div>
              <div class="geography__map-pin-inner-backdrop"/>
              <div class="geography__map-pin-inner">
                <div
                  class="geography__map-pin-inner-circle"
                  :class="{'is-selected': shown}"
                />
              </div>
            </div>
          </template>
          <template #popper>
            <div class="geography__map-popper-inner">
              <div class="geography__map-popper-inner-row">
                <div class="geography__map-popper-img-wrapper">
                  <NuxtImg
                    class="geography__map-popper-img"
                    :src="item.img.url"
                    width="200"
                    height="100"
                    loading="lazy"
                  />
                </div>
                <div class="geography__map-popper-text-wrapper">
                  <div class="geography__map-popper-title">
                    {{ item.title }}
                  </div>
                  <div class="geography__map-popper-category">
                    {{ item.category.name }}
                  </div>
                </div>
              </div>
              <div class="geography__map-popper-coords">
                {{ item.lat }}—{{ item.long }}
              </div>
            </div>
          </template>
        </VMenu> -->
      </div>
    </div>
    <div class="geography__bottom">
      <div class="page__header geography__header-bottom">
        ДРУГИЕ ПРОЕКТЫ
      </div>
      <VPan class="geography__bottom-inner">
        <div
          v-for="project in projects.projectsBottom"
          :key="project.title"
          class="geography__projects-item-bottom"
        >
          {{ project.title }}
        </div>
      </VPan>
    </div>
    <div class="line__horizontal"/>
  </div>
</VIntersect>
</template>

<script>
import VIntersect from '~/components/ui/VIntersect.vue';
import VPan from '~/components/ui/VPan.vue';

import { projects } from '~/constants/data';

export default {
  name: 'TheGeography',
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
      isInView: false,
      isIntersected: false,
      isMounted: false,
      mapSettings: {
        apiKey: process.env.MAP_API_KEY,
        lang: 'ru_RU',
        coordorder: 'latlong',
        enterprise: false,
        // version: '2.1',
        suppressMapOpenBlock: true,
      },
      zoom: 10,
      coords: [55.7500609, 37.6238099],
      allProjects: projects,
    };
  },
  computed: {

    projects() {
      const projectsTop = [];
      const projectsBottom = [];
      for (const project of projects) {
        if (!project.isBottom) {
          projectsTop.push(project);
        } else {
          projectsBottom.push(project);
        }
      }
      return {
        projectsTop,
        projectsBottom,
      };
    },
  },
  watch: {
    isInView(val, oldVal) {
      if (val) {
        this.$emit('enter');
      } else {
        this.$emit('leave');
      }
    },
    isIntersected(val) {
      if (val) {
        this.runInitAnimation();
      }
    },
    isMobile(val, oldVal) {
      if (!val) {
        this.runInitAnimation();
      }
    },
  },
  mounted() {
    this.isMounted = true;
  },
  methods: {
    // onClick(payload) {
    //   console.log('🚀 ~ file: TheGeography.vue:213 ~ onClick ~ payload', payload);
    // },
    handleClickProject(slug) {
      const index = this.allProjects.findIndex(item => item.slug === slug);
      // console.log('🚀 ~ file: TheGeography.vue:210 ~ handleClickProject ~ index', index);
      const item = this.allProjects[index];
      // this.coords = [item.lat, item.long];
      this.zoom = 12;
      const myMap = this.$refs.map.myMap;
      myMap.setCenter([item.lat, item.long]);
      // console.log('🚀 ~ file: TheGeography.vue:251 ~ handleClickProject ~ this.$refs.pin', this.$refs.pin[index]);
      // console.log('🚀 ~ file: TheGeography.vue:252 ~ handleClickProject ~ map', this.$refs.map);
      this.$nextTick(() => {
        myMap.balloon.close();
        myMap.balloon.open([item.lat, item.long], `
       <div class="geography__map-popper-inner">
          <div class="geography__map-popper-inner-row">

            <div class="geography__map-popper-text-wrapper">
              <div class="geography__map-popper-title">
                ${item.title}
              </div>
              <div class="geography__map-popper-category">
                ${item.category.name}
              </div>
            </div>
          </div>
          <div class="geography__map-popper-coords">
            ${item.lat}—${item.long}
          </div>
        </div>`);
      // this.$refs.pin[index].$el.balloonopen();
      });
    },
    onEnter() {
      this.isIntersected = true;
    },
    runInitAnimation() {
      const { $anime } = this;
      if (this.isMobile) {
        return;
      }
      $anime
        .timeline({
          easing: 'easeInCubic',
        })
        .add({
          targets: '.geography__right .line__vertical',
          scaleY: [0, 1],
          duration: 700,
        })
        // .add({
        //   targets: '.geography__map-pin',
        //   opacity: [0, 1],
        //   duration: 700,
        //   delay: $anime.stagger(100),
        // }, '-=250');
        .add({
          targets: '#geography .line__horizontal',
          scaleX: [0, 1],
          duration: 700,
        }, '-=250');
    },
    // onScroll(e) {
    //   const rect = this.$refs.wrapper.getBoundingClientRect();
    //   const { height, y } = rect;
    //   const offset = this.isMobile ? 41 : 72;
    //   const yWithOffset = y - offset;
    //   if (yWithOffset < 0 && yWithOffset > -height) { // element is not reached from top && y
    //     this.isInView = true;
    //     return;
    //   }
    //   this.isInView = false;
    // },
  },
};
</script>


<style lang="scss" scoped>
  .geography {
    position: relative;
    display: flex;
    height: torem(952);
    // height: calc(100vh - var(--header-h)); //100vh;
    // background: linear-gradient(125.8deg, #394d4b 0%, #18241e 100%);
    .line__horizontal {
      bottom: 0;
      transform-origin: torem(352) 0;
    }

    @include respond-to(md) {
      height: auto;
      flex-direction: column;
    }

    &__left {
      display: flex;
      min-width: torem(352);
      padding-top: torem(33);
      padding-right: torem(32);
      padding-left: torem(32);
      flex-basis: torem(352);
      flex-direction: column;

      @include respond-to(md) {
        margin-bottom: 41px;
        padding-top: 21px;
        padding-right: 16px;
        padding-left: 16px;
        flex-basis: 100%;
      }
    }

    &__right {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex: 1;

      @include respond-to(md) {
        width: 100%;
        padding-right: 16px;
        padding-left: 16px;
      }

      .line__vertical {
        top: 0;
        left: 0;
        z-index: 1;
        height: 100%;
        background-color: $black;

        @include respond-to(md) {
          display: none;
        }
      }
    }

    &__bottom {
      display: none;
      padding-bottom: 26px - 8px;
      padding-left: 16px;

      @include respond-to(md) {
        display: flex;
        padding-top: 16px;
        flex-direction: column;
      }
    }

    &__bottom-inner {
      display: flex;
      padding-top: 8px;
      padding-bottom: 8px;
      // gap: 24px;
    }

    &__header-bottom {
      margin-bottom: 16px - 8px;
      font-size: 12px;
      font-weight: 400;
      line-height: 14px;
      letter-spacing: .32em;
      color: $olive;
    }

    &__projects-item-bottom {
      margin-right: 24px;
      text-transform: uppercase;
      white-space: nowrap;
      font-size: 10px;
      font-weight: 300;
      line-height: 12px;
      letter-spacing: .32em;
      color: $black;
    }

    &__projects {
      display: flex;
      margin-top: torem(32);
      margin-bottom: torem(32);
      flex-direction: column;

      @include respond-to(md) {
        display: none;
      }
    }

    &__projects-other {
      display: flex;
      flex-direction: column;

      @include respond-to(md) {
        display: none;
      }
    }

    &__projects-item {
      display: inline-block;
      margin-bottom: torem(12.6);
      text-transform: uppercase;
      font-size: torem(12.2);
      font-weight: 400;
      line-height: percentage(14px / 12px);
      letter-spacing: .32em;
      color: $black;

      &.active {
        cursor: pointer;
      }
    }

    &__header-other {
      margin-bottom: torem(16);
    }

    &__map-wrapper {
      width: 100%;
      height: 100%;

      @include respond-to(md) {
        width: 100%;
      }
    }

    &__map {
      position: relative;
      height: 100%;
      -webkit-filter: grayscale(100%);

      @include respond-to(md) {
        width: 100%;
        height: 40vh;
        min-height: 300px;
      }
    }

    &__map-pin {
      position: absolute;

      @include respond-to(md) {
        transform: translate(20px, 20px);
      }
    }

    &__map-pin-inner {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: torem(15);
      height: torem(15);
      border-radius: 50%;
      background-color: white;

      @include respond-to(md) {
        width: 15px;
        height: 15px;
      }
    }

    &__map-pin-inner,
    &__map-pin-inner-backdrop {
      &:after {
        content: "";
        position: absolute;
        bottom: 1px;
        display: block;
        width: torem(1);
        height: torem(12);
        background-color: white;
        transform: translateY(100%);
        // transform: translate(50%,100%);
        // right: 50%;
        @include respond-to(md) {
          display: none;
        }
      }
    }

    &__map-pin-inner-backdrop {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: torem(15);
      height: torem(15);
      border-radius: 50%;
      background-color: white;
      filter: blur(torem(2));

      @include respond-to(md) {
        filter: blur(2px);
      }
    }

    &__map-pin-inner-circle {
      width: torem(7);
      height: torem(7);
      border-radius: 50%;
      background-color: $olive;
      transition: $transition;

      @include respond-to(md) {
        width: 7px;
        height: 7px;
      }

      &.is-selected {
        background-color: #239e21;
      }
    }
  }
</style>

<style lang="scss">
  // .v-popper--theme-dropdown
  .v-popper__inner {
    box-shadow: 4px 4px 16px rgba(0, 0, 0, .25) !important;
    backdrop-filter: blur(5px);
    border: none !important;
  }

  .v-popper__arrow-container {
    display: none;
  }

  .geography {
    &__map-popper-inner {
      display: flex;
      max-width: 350px;
      padding: 16px;
      flex-direction: column;
      padding-right: 0;
    }

    &__map-popper-inner-row {
      display: flex;
    }

    &__map-popper-img-wrapper {
      margin-right: 16px;

      @include respond-to(md) {
        display: none;
      }
    }

    &__map-popper-img {
      width: 70px;
      height: 45px;
    }

    &__map-popper-text-wrapper {
      // margin-left: 16px;
    }

    &__map-popper-title {
      margin-bottom: 8px;
      text-transform: uppercase;
      font-family: "Raleway", sans-serif;
      font-size: 20px;
      font-weight: 600;
      line-height: 23px;
      color: $black;

      @include respond-to(md) {
        font-size: 12px;
        line-height: 14px;
      }
    }

    &__map-popper-category {
      font-family: "Raleway", sans-serif;
      font-size: 12px;
      font-weight: 300;
      line-height: 14px;
      color: $olive;

      @include respond-to(md) {
        display: none;
      }
    }

    &__map-popper-coords {
      margin-top: 16px;
      font-family: "Raleway", sans-serif;
      font-size: 12px;
      font-weight: 300;
      line-height: 14px;
      color: $olive;

      @include respond-to(md) {
        margin-top: 0;
      }
    }
  }
</style>
