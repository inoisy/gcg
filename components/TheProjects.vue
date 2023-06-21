<template>
<VIntersect @enter="onIntersect">
  <div
    id="projects"
    class="projects"
  >
    <h1 class="page__header projects__heading mobile">ПРОЕКТЫ</h1>
    <div class="projects__top">
      <div
        ref="scrollBoxCategories"
        v-touch-pan.horizontal.prevent.mouse="isMobile ? handlePanCategories : null"
        class="projects__top-categories"
      >
        <div class="projects__top-categories-header">ОБЪЕКТЫ:</div>
        <div
          v-for="category in categories"
          :key="category.name"
          class="projects__categories"
          :class="{
            'is-active': categorySelected === category.slug
          }"

          @click="onCategoryClick(category.slug)"
        >
          {{ category.name }}&nbsp;({{ category.total }})
        </div>
      </div>
      <transition-group
        ref="scrollBox"
        v-touch-pan.horizontal.prevent.mouse="handlePan"
        name="chip"
        tag="div"
        class="projects__projects"
      >
        <div
          v-for="item in projectsFiltered"
          :key="item.slug"
          class="projects__projects-item"
          @click="onProjectClick(item.slug)"
        >
          {{ item.title }}
        </div>
      </transition-group>
    </div>
    <div class="projects__content" >
      <div class="line horizontal top"/>
      <div class="projects__content-left">
        <div class="projects__content-left-inner">
          <h1 class="page__header projects__heading desktop">ПРОЕКТЫ</h1>
          <transition
            name="fade-fast"
            mode="out-in"
          >
            <div
              :key="currentIndex+project.title"
              class="projects__top-text"
            >
              <h2 class="projects__title">{{ project.title }}</h2>
              <div class="projects__project-info">
                Срок реализации:
                <template v-if="project.dateStart">
                  {{ project.dateStart }} -
                </template>
                {{ project.dateEnd }}
              </div>
              <div class="projects__project-info desktop">
                <div>
                  Площадь: {{ project.square }} <span>м<sup>2</sup></span>
                </div>
              </div>
              <div class="projects__project-info desktop">
                Вид работ: {{ project.type }}
              </div>
              <div class="projects__project-info desktop">
                Заказчик: {{ project.client }}
              </div>
              <VDropdown
                ref="copyMenu"
                distance="10"
              >
                <div
                  class="projects__project-info desktop projects__coords"
                  @click="onCopy(`${ project.lat },${ project.long }`)"
                >
                  {{ project.lat }}, {{ project.long }}
                  <SvgIcon
                    class="projects__map-icon"
                    name="map"
                  />
                </div>
                <template #popper>
                  <div class="projects__copy-popper">
                    Координаты скопированы!
                    <SvgIcon
                      class="projects__copy-popper-icon"
                      name="check"
                    />
                  </div>
                </template>
              </VDropdown>
            </div>
          </transition>
          <VResponsive
            v-if="isMobile"
            class="projects__img-mobile-wrapper"
            :aspect-ratio="360/202"
          >
            <div
              ref="slider"
              class="swiper"
            >
              <div class="swiper-wrapper">
                <div
                  v-for="item in projectsFiltered"
                  :key="item.slug"
                  class="swiper-slide"
                >
                  <NuxtImg
                    class="projects__img projects__img-mobile"
                    :src="item.img.url"
                    alt="Проект"
                    width="700"
                    height="436"
                    loading="lazy"
                    fit="cover"
                  />
                </div>
              </div>
            </div>
          </VResponsive>
          <div class="projects__content-left-bottom">
            <div class="projects__project-category">Категория</div>
            <div class="projects__content-left-bottom-inner">
              <div class="projects__project-category-value">
                <transition
                  name="fade-fast"
                  mode="out-in"
                >
                  <span :key="project.category.name">{{ project.category.name }}</span>
                </transition>
              </div>
              <div class="projects__pagination">
                <div class="projects__pagination-counter">
                  {{ currentIndex + 1 }}/{{ projectsFiltered.length }}
                </div>
                <div class="projects__pagination-arrow-wrapper">
                  <SvgIcon
                    ref="prev"
                    :class="{'is-disabled': currentIndex === 0}"
                    class="projects__pagination-arrow"
                    name="arrow-left-circle"
                    @click="handlePrev"
                  />
                  <SvgIcon
                    ref="next"
                    :class="{'is-disabled': currentIndex === projectsFiltered.length - 1}"
                    class="projects__pagination-arrow"
                    name="arrow-right-circle"
                    @click="handleNext"
                  />
                </div>
              </div>
            </div>
            <div class="projects__project-info-mobile-wrapper">
              <div class="projects__project-info mobile">
                Вид работ: {{ project.type }}
              </div>
              <div class="projects__project-info mobile">
                Заказчик: {{ project.client }}
              </div>
              <VDropdown
                ref="copyMenu"
                distance="10"
              >
                <div
                  class="projects__project-info mobile projects__coords"
                  @click="onCopy(`${ project.lat },${ project.long }`)"
                >
                  {{ project.lat }}, {{ project.long }}
                  <SvgIcon
                    class="projects__map-icon"
                    name="map"
                  />
                </div>
                <template #popper>
                  <div class="projects__copy-popper">
                    Координаты скопированы!
                    <SvgIcon
                      class="projects__copy-popper-icon"
                      name="check"
                    />
                  </div>
                </template>
              </VDropdown>
            </div>

          </div>
        </div>
      </div>
      <div class="projects__content-right">
        <div
          class="line vertical"
        />
        <div class="projects__content-right-inner">
          <ImgSlider
            v-if="!isMobile"
            class="projects__img-wrapper"
            :src="project.img.url"
          />
        </div>
      </div>
    </div>
    <div class="projects__bottom">
      <div
        class="line horizontal bottom"
      />
    </div>
  </div>
</VIntersect>
</template>

<script>
/* eslint-disable sonarjs/no-duplicate-string */
import Swiper from 'swiper/swiper-bundle.min';
import VIntersect from '~/components/ui/VIntersect.vue';
import ImgSlider from '~/components/ImgSlider.vue';
import VResponsive from '~/components/ui/VResponsive.vue';
import { projects, categories } from '~/constants/data';

export default {
  name: 'TheProjects',
  components: {
    VIntersect,
    ImgSlider,
    VResponsive,
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isMounted: false,
      categories,
      projects,
      currentIndex: 0,
      panning: false,
      position: 0,
      panningCategories: false,
      positionCategories: 0,
      isInitAnimationEnd: false,
      isIntersected: false,
      swiperOptions: {
        autoplay: false,
      },
      slider: null,
      // isTextCopy: false,
      categorySelected: null,
      projectSelected: null,
    };
  },
  computed: {
    project() {
      return this.projectsFiltered[this.currentIndex];
    },
    projectsFiltered() {
      if (!this.categorySelected) { // $route.query.category
        return this.projects;
      }
      return this.projects.filter(item => item.category.slug === this.categorySelected);// $route.query.category
    },
    imageUrl() {
      return this.project?.img?.url;
    },
    // imageIndex() {
    //   return {
    //     currentIndex: this.currentIndex,
    //     image: this.imageUrl,
    //     category: this.categorySelected/// this.$route.query.category,
    //     // isImageLoad: this.isImageLoad,
    //   };
    // },
    // categorySelected() {
    //   return this.$route.query.category;
    // },
  },
  watch: {
    isMobile: {
      handler(val) {
        if (process.server) {
          return;
        }
        if (val) {
          this.initSwiper();
        }
        this.$nextTick(() => {
          this.isInitAnimationEnd = false;
          this.runAnimation();
        });
      },
      immediate: true,
    },
    'categorySelected'(val) {
      this.currentIndex = 0;
      //  this.slider.update();
      //                 this.slider.loopDestroy();
      //                 this.slider.loopCreate();
      //                 this.slider.slideTo(this.synchronizeSlides ? this.activeIndex + 1 : 0, 0);
      //                 this.slider.slideToLoop(this.synchronizeSlides ? this.activeIndex : 0, 0);
      //                 this.slider.lazy.loadInSlide(this.synchronizeSlides ? this.activeIndex + 1 : 0);
      //                 this.activeIndex = this.synchronizeSlides ? this.activeIndex : 0;
      if (this.slider) {
        this.slider.destroy();
        this.slider = null;
        this.$nextTick(() => {
          this.initSwiper();
        });
      }
    },
    projectSelected: // $route.query.project
      {
        handler(val) {
          if (val) {
            const newIndex = this.projectsFiltered.findIndex(item => item.slug === val);
            this.currentIndex = newIndex;
          }
        },
        immediate: true,
      },
    imageUrl(val, oldVal) {
      if (!this.isInitAnimationEnd || this.isMobile) {
        return;
      }

      return this.$anime({
        easing: 'easeInCubic',
        targets: '.projects__img-curtain',
        translateY: [0, '100%'],
        duration: 700,
      });
    },
    isIntersected(val) {
      if (!val) {
        return;
      }
      this.runAnimation();
    },

  },
  mounted() {
    this.isMounted = true;
    // if (this.isMobile) {
    //   this.initSwiper();
    // }
  },
  methods: {
    async onCopy(text) {
      try {
        await this.$copyText(text);
        // this.isTextCopy = true;
        this.$refs.copyMenu.open();
      } catch (e) {
        console.log('🚀 ~ file: TheProjects.vue ~ line 302 ~ onCopy ~ e', e);
      }
    },
    initSwiper() {
      const options = {
        speed: 1000,
        slidesPerView: 'auto',
        loop: false,
        loopFillGroupWithBlank: true,
        watchSlidesProgress: true,
        watchSlidesVisibility: true,
        allowTouchMove: true,
        lazy: true,
        spaceBetween: 8,
        navigation: {
          prevEl: this.$refs.prev?.$el || this.$refs.prev || false,
          nextEl: this.$refs.next?.$el || this.$refs.next || false,
        },
        // breakpoints: {
        //     1920: {
        //         slidesPerView: 4,
        //         slidesPerGroup: 4,
        //         spaceBetween: 48,
        //     },

        //     992: {
        //         slidesPerView: 3,
        //         slidesPerGroup: 3,
        //         spaceBetween: 40,
        //     },

        //     768: {
        //         slidesPerView: 2,
        //         slidesPerGroup: 2,
        //         spaceBetween: 24,
        //     },
        // },

        // pagination: {
        //     el: this.$refs.pagination || false,
        //     type: 'progressbar',
        // },

        // navigation: {
        //     prevEl: this.$refs.prev?.$el || this.$refs.prev || false,
        //     nextEl: this.$refs.next?.$el || this.$refs.next || false,
        // },
      };

      this.$nextTick(() => {
        this.slider = new Swiper(this.$refs.slider, options);

        this.slider.on('slideChange', () => {
          this.currentIndex = this.slider.realIndex;
        });
      });
    },
    onProjectClick(slug) {
      if (this.projectSelected === slug) {
        this.projectSelected = null;
        return;
      }
      this.projectSelected = slug;
    },
    onCategoryClick(slug) { // , e
      if (this.categorySelected === slug) {
        this.categorySelected = null;
        return; // this.$router.push({ name: 'index' });
      }
      this.categorySelected = slug;
      // return this.$router.push({
      //   name: 'index',
      //   query: {
      //     category: slug,
      //   },
      // });
    },
    handlePrev() {
      const newIndex = this.currentIndex - 1;
      if (newIndex < 0) {
        return;
      }
      this.currentIndex = newIndex;
    },
    handleNext() {
      const newIndex = this.currentIndex + 1;
      if (newIndex > this.projectsFiltered.length - 1) {
        return;
      }
      this.currentIndex = newIndex;
    },

    handlePan({ evt, ...newInfo }) {
      this.panning = newInfo.isFirst !== true && newInfo.isFinal !== true;
      const newPosition = this.position - newInfo.delta.x;
      return this.handleDelta(newPosition);
    },
    handlePanCategories({ evt, ...newInfo }) {
      this.panningCategories = newInfo.isFirst !== true && newInfo.isFinal !== true;
      const newPosition = this.positionCategories - newInfo.delta.x;
      return this.handleDeltaCategories(newPosition);
    },
    // handleWheel(e) {
    //   e.preventDefault();
    //   const newPosition = this.position += e.deltaY;
    //   return this.handleDelta(newPosition, true);
    // },
    handleDeltaCategories(input) {
      const el = this.$refs.scrollBoxCategories;
      const max = el.scrollWidth - el.offsetWidth;
      let newPosition = input;
      if (newPosition < 0) {
        newPosition = 0;
      } else if (newPosition > max) {
        newPosition = max;
      }
      if (this.positionCategories === newPosition) {
        return;
      }
      this.positionCategories = newPosition;
      return el.scrollTo(this.positionCategories, 0);
    },
    handleDelta(input) {
      const el = this.$refs.scrollBox.$el;
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
    onIntersect(val) {
      this.isIntersected = true;
    },
    runAnimation() {
      // console.log('🚀 ~ file: TheProjects.vue ~ line 413 ~ runAnimation ~ runAnimation');
      if (this.isMobile) {
        // console.log('🚀 ~ file: TheProjects.vue ~ line 415 ~ runAnimation ~ this.isMobile', this.isMobile);
        const animation = this.$anime
          .timeline({
            easing: 'easeInCubic',
          })
          .add({
            targets: '.projects__img-curtain',
            translateY: [0, '100%'],
            duration: 1000,
          });
        // eslint-disable-next-line promise/catch-or-return
        animation.finished.then(() => {
          this.isInitAnimationEnd = true;
        });
        return;
      }
      // console.log('🚀 ~ file: TheProjects.vue ~ line 402 ~ runAnimation ~ animation');

      const animation = this.$anime
        .timeline({
          easing: 'easeInCubic',
        })
        .add({
          targets: '.projects__content .line.horizontal.top',
          scaleX: [0, 1],
          duration: 700,
        })
        .add({
          targets: '.projects__img-curtain',
          translateY: [0, '100%'],
          duration: 700,
        }, '-=700')
        .add({
          targets: '.projects__content-right .line.vertical',
          scaleY: [0, 1],
          duration: 700,
        }, '-=700')
        .add({
          targets: '.projects__bottom .line.horizontal.bottom',
          scaleX: [0, 1],
          duration: 700,
        });
      // eslint-disable-next-line promise/catch-or-return
      animation.finished.then(() => {
        this.isInitAnimationEnd = true;
      });
    },
  },
};
</script>

<style lang="scss">
  .chip {
    $primary-transition: .3s linear;

    &-move {
      transition-duration: .3s;
      transition-property: transform, opacity;
    }

    &-enter-active {
      transition: opacity .3s $transition;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
      transition-duration: .3s;
    }

    &-leave-to {
      transition-duration: 0;
    }

    &-leave-active {
      position: absolute !important;
      visibility: hidden;
    }
  }

  .line {
    background-color: $black;

    &.horizontal {
      position: absolute;
      right: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      height: 1px;
      transform: scaleX(0);
      transform-origin: torem(352) 50%;
    }

    &.vertical {
      position: absolute;
      left: 0;
      width: 1px;
      height: 100%;
      transform: scaleY(0);
      transform-origin: 0% 0%;
    }

    &.show {
      transform: translate(0, 0);
    }
  }
</style>

<style lang="scss">
  .swiper {
    height: 100%;
  }

  .projects {
    overflow-x: hidden;
    display: flex;
    flex: 1;
    width: 100%;
    flex-direction: column;
    // margin-bottom: 139px;

    @include respond-to(md) {
      // margin-bottom: 0;
      // padding-bottom: 100px - 8px;
    }

    .swiper-slide {
      // width: 95vw;
      width: 90%;
    }

    &__copy-popper {
      padding: 12px;
      font-size: 12px;
      font-weight: 300;
      line-height: 14px;
      color: #0b0b0b;
    }

    &__copy-popper-icon {
      width: 16px;
      height: 11px;
      margin-left: 10px;
    }

    &__top-text {
      @include respond-to(md) {
        padding-right: 16px;
        padding-left: 16px;
      }
    }

    &__heading {
      margin-bottom: torem(32);
      // font-size: torem(14);
      // font-weight: 400;
      // line-height: percentage(16px/14px);
      // letter-spacing: .32em;
      // color: $olive;

      @include respond-to(md) {
        padding-left: 16px;
      }

      &.desktop {
        @include respond-to(md) {
          display: none;
        }
      }

      &.mobile {
        display: none;
        margin-top: 24px;
        margin-bottom: 32px - 8px - 8px;

        @include respond-to(md) {
          display: block;
        }
      }
    }

    &__title {
      margin-bottom: torem(16);
      font-size: torem(28);
      font-weight: 600;
      line-height: percentage(33px/28px);
      color: $black;

      @include respond-to(md) {
        margin-bottom: 8px;
        font-size: 20px;
        line-height: 23px;
      }
    }

    &__dates {
      // margin-bottom: torem(32);
      // font-weight: 300;
      // color: $olive;

      // @include respond-to(md) {
      //   margin-bottom: 9px;
      //   font-size: 10px;
      //   line-height: 12px;
      // }
    }

    &__coords {
      display: inline-flex;
      cursor: pointer;

      &.mobile {
        display: inline-flex;
        margin-bottom: 0 !important;
        color: #aac0b4 !important;
      }

      &.desktop {
        display: inline-flex;
      }
    }

    &__project-info-mobile-wrapper {
      display: none;
      margin-top: 16px;
      padding-right: 16px;
      padding-left: 16px;

      @include respond-to(md) {
        display: block;
      }
    }

    &__project-info {
      display: flex;
      // display: inline-flex;
      align-items: center;
      margin-bottom: torem(16);
      font-size: torem(12);
      font-weight: 300;
      line-height: percentage(14px/12px);
      color: $olive;

      @include respond-to(md) {
        margin-bottom: 18px;
        font-size: 10px;
        font-weight: 300;
        line-height: 12px;
      }

      &.desktop {
        @include respond-to(md) {
          display: none;
        }
      }

      &.mobile {
        margin-bottom: 16px;
        font-size: 12px;
        line-height: 14px;
        color: #0b0b0b;
      }
    }

    &__map-icon {
      width: torem(16);
      height: torem(14.55);
      margin-left: torem(10);
    }

    &__content-left-bottom {
      margin-top: auto;

      @include respond-to(md) {
        padding-right: 16px;
      }
    }

    &__content-left-bottom-inner {
      @include respond-to(md) {
        display: flex;
        align-items: center;
        padding-left: 16px;
      }
    }

    &__project-category {
      margin-bottom: torem(8);
      font-size: torem(12);
      font-weight: 300;
      line-height: percentage(14px/12px);

      /* Text Grey */

      color: #aaaeb6;
      user-select: none;

      @include respond-to(md) {
        margin-bottom: 12px;
        padding-left: 16px;
        font-size: 10px;
        font-weight: 300;
        line-height: 12px;
        color: $olive;
      }
    }

    &__project-category-value {
      margin-bottom: torem(32);
      font-size: torem(14);
      font-weight: 600;
      line-height: percentage(16px/14px);
      color: $black;
      user-select: none;

      @include respond-to(md) {
        flex: 1;
        margin-bottom: 0;
        font-size: 14px;
        line-height: 16px;
      }
    }

    &__pagination {
      display: flex;
      align-items: center;
      justify-content: space-between;

      @include respond-to(md) {
        gap: 26px;
      }
    }

    &__pagination-counter {
      font-size: torem(14);
      font-weight: 600;
      line-height: percentage(16px/14px);
      color: $black;
      user-select: none;

      @include respond-to(md) {
        font-size: 14px;
        line-height: 16px;
      }
    }

    &__pagination-arrow-wrapper {
      display: flex;
    }

    &__pagination-arrow {
      width: torem(24);
      height: torem(24);
      color: $black;
      transition: $transition;
      cursor: pointer;

      + .projects__pagination-arrow {
        margin-left: 16px;
      }

      &:hover {
        color: lighten($black, 20%);
      }

      &.is-disabled {
        color: #d9d9d9;
        pointer-events: none;
      }

      @include respond-to(md) {
        width: 24px;
        height: 24px;
      }
    }

    &__img-wrapper {
      position: relative;
      overflow: hidden;
      display: flex;
      flex: 1;
    }

    &__img {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &__img-curtain {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: white;
      transform: translateY(0);
      pointer-events: none;
    }

    &__img-mobile-wrapper {
      margin-bottom: 16px;
    }

    &__img-mobile {
      // width: calc(100% - 17px);
      height: 100%;
    }

    &__img-curtain-side {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: white;
      transform: translateX(-100%);
      pointer-events: none;
    }

    &__top {
      padding-top: torem(13);
      padding-bottom: torem(16);
      padding-left: torem(32);

      @include respond-to(md) {
        order: 0;
        padding-top: 0;
        padding-bottom: 0;
        padding-left: 16px;
      }
    }

    &__top-categories {
      display: flex;
      align-items: center;
      margin-bottom: torem(8);
      text-transform: uppercase;
      font-size: torem(12);
      line-height: percentage(14px/12px);
      gap: torem(32);

      @include respond-to(md) {
        overflow-x: auto;
        overflow-y: hidden;
        margin-top: 8px;
        margin-bottom: 0;
        padding-top: 8px;
        padding-bottom: 8px;
        font-size: 10px;
        line-height: 12px;
        gap: 16px;
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }

    &__top-categories-header {
      font-weight: 400;
      color: $olive;
      user-select: none;

      @include respond-to(md) {
        display: none;
      }
    }

    &__categories {
      white-space: nowrap;
      font-weight: 400;
      font-style: italic;
      letter-spacing: .32em;
      color: $olive;
      cursor: pointer;
      user-select: none;

      &.is-active {
        font-weight: 700;
      }
    }

    &__content {
      position: relative;
      // display: grid;
      display: flex;
      height: torem(736);
      max-height: calc(100vh - #{torem(71)} - 72px);
      // grid-template-columns: repeat(5, 1fr);
      .line.horizontal.top {
        @include respond-to(md) {
          display: none;
        }
      }

      @include respond-to(md) {
        height: unset;
        max-height: unset;
        flex-direction: column;
      }
    }

    &__content-right-inner,
    &__content-left-inner {
      display: flex;
      width: 100%;
      height: 100%;
      padding: torem(32);
      flex-direction: column;
    }

    &__content-left-inner {
      @include respond-to(md) {
        padding: 24px 16px;
        padding-right: 0;
        padding-bottom: 0;
        padding-left: 0;
      }
    }

    &__projects {
      position: relative;
      overflow-x: auto;
      overflow-y: hidden;
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      padding-top: torem(8);
      padding-right: 0;
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
      gap: torem(32);

      &::-webkit-scrollbar {
        display: none;
      }

      @include respond-to(md) {
        display: none;
      }
    }

    &__projects-item {
      text-transform: uppercase;
      white-space: nowrap;
      font-size: torem(14);
      // font-size: 14px;
      font-weight: 300;
      line-height: percentage(16px/14px);
      // line-height: 16px;
      letter-spacing: .32em;
      color: $black;
      cursor: pointer;
      user-select: none;

      &:last-child {
        margin-right: 32px;
      }
    }

    &__content-left {
      position: relative;
      // grid-column: 1/span 1;
      min-width: torem(352);
      flex-basis: torem(352);

      @include respond-to(md) {
        min-width: 100%;
        flex-basis: 100%;
      }
    }

    &__content-right {
      position: relative;
      flex: 1;

      // .line.vertical {
      @include respond-to(md) {
        display: none;
      }
      // }
    }

    &__bottom {
      position: relative;

      .line.horizontal {
        bottom: 0;
      }

      @include respond-to(md) {
        padding-bottom: 92px;

        //   display: none;
      }
      // height: 133px;
    }
  }
</style>
