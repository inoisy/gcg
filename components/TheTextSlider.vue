<template>
<div class="the-text-slider">
  <transition
    name="fade-fast"
    mode="out-in"
  >
    <div
      v-if="currentIndex === 0"
      key="div-0"
    >
      <p>
        Мы — строительно-инжиниринговая компания компания, выполняющая широкий спектр строительно-монтажных и инженерных работ объектов жилой и коммерческой недвижимости.
      </p>
      <p>
        Компания была создана в Москве  в 2011 году с целью выполнения внутренних инженерных работ.
      </p>
      <p>
        На сегодняшний день является активно развивающейся компанией, которая работает на строительном рынке Москвы и других регионов Российской Федерации.
      </p>
    </div>
    <div
      v-else-if="currentIndex ===1"
      key="div-1"
    >
      <p>
        Мы строго следуем правилам и регламенту качества строительных работ, технических норм и стандартов охраны труда, имеем всю необходимую разрешительную документацию (лицензии МЧС и членство в СРО).
      </p>
      <p>
        В условиях стремительных изменений рыночной ситуации мы уделяем пристальное внимание на подбор высококвалифицированного и компетентного персонала.
      </p>
      <p>
        Компания систематически проводит обучение сотрудников, позволяющее не только повышать уровень знаний работников и вырабатывать требуемые профессиональные навыки, но и формировать у них систему ценностей и установок, которая соответствует сегодняшним реалиям и поддерживает стратегию развития компании.
      </p>
    </div>
    <div
      v-else-if="currentIndex ===2"
      key="div-2"
    >
      <p>
        В своей деятельности широко используем новейшие цифровые и строительные технологии, что позволяет систематизировать сбор и поступление новой информации, координировать участников строительного процесса, включать их в совместную работу.
      </p>
      <p>
        Применение новых технологий снижает временные затраты на определенные типы работ, ведет к экономии и снижению затрат на проект в целом.
      </p>
      <p>
        Изложенные вышеперечисленные факты позволяют нашей компании быть гибкими, надежными, конкурентоспособными и с перспективой смотреть в будущее.
      </p>
    </div>
  </transition>
  <div class="the-text-slider__pagination-arrow-wrapper">
    <SvgIcon
      ref="prev"
      :class="{'is-disabled': currentIndex === 0}"
      class="the-text-slider__pagination-arrow"
      name="arrow-left-circle"
      @click="handlePrev"
    />
    <SvgIcon
      ref="next"
      :class="{'is-disabled': currentIndex === slides - 1}"
      class="the-text-slider__pagination-arrow"
      name="arrow-right-circle"
      @click="handleNext"
    />
  </div>
</div>
</template>

<script>
export default {
  name: 'TheTextSlider',
  data() {
    return {
      currentIndex: 0,
      slides: 3,
    };
  },
  methods: {
    handlePrev() {
      this.currentIndex -= 1;
    },
    handleNext() {
      this.currentIndex += 1;
    },
  },
};
</script>

<style lang="scss" scoped>
  .the-text-slider {
    position: relative;

    &__pagination-arrow-wrapper {
      position: absolute;
      bottom: 0;
      display: flex;

      @include respond-to(md) {
        position: relative;
        margin-top: 26px;
        margin-left: auto;
      }
    }

    &__pagination-arrow {
      width: torem(24);
      height: torem(24);
      color: $black;
      transition: $transition;
      cursor: pointer;

      + .the-text-slider__pagination-arrow {
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
  }
</style>
