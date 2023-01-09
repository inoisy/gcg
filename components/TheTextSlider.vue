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
        GLOBAL CONSTRUCTION - строительно-инжиниринговая компания, выполняющая широкий спектр строительно-монтажных и&nbsp;инженерных работ на&nbsp;объектах жилой и&nbsp;коммерческой недвижимости.
      </p>
      <p>
        Компания была создана в&nbsp;2011 году в&nbsp;городе Москве с&nbsp;целью выполнения работ по&nbsp;монтажу внутренних инженерных систем. На&nbsp;сегодняшний день является активно развивающейся компанией, работающей на&nbsp;строительном рынке Москвы и&nbsp;других регионах Российской Федерации.
      </p>
      <p>
        Мы&nbsp;строго следуем правилам и&nbsp;регламенту качества строительных работ, технических норм и&nbsp;стандартов охраны труда, имеем всю необходимую разрешительную документацию (лицензии МЧС и&nbsp;членство в&nbsp;СРО).
      </p>
    <!--
            <p>
              В&nbsp;своей деятельности широко используем новейшие цифровые и&nbsp;строительные технологии, что позволяет систематизировать сбор и&nbsp;поступление новой информации, координировать участников строительного процесса, включать их&nbsp;в&nbsp;совместную работу. Применение новых технологий снижает временные затраты на&nbsp;определенные типы работ, ведет к&nbsp;экономии и&nbsp;снижению затрат на&nbsp;проект в&nbsp;целом.
            </p>
           -->

    </div>
    <div
      v-else-if="currentIndex ===1"
      key="div-1"
    >
      <p>
        В&nbsp;условиях стремительных изменений рыночной ситуации мы&nbsp;уделяем пристальное внимание на&nbsp;подбор высококвалифицированного и&nbsp;компетентного персонала. Компания систематически проводит обучение сотрудников, позволяющее не&nbsp;только повышать уровень знаний работников и&nbsp;вырабатывать требуемые профессиональные навыки, но&nbsp;и&nbsp;формировать у&nbsp;них систему ценностей и&nbsp;установок, которая соответствует сегодняшним реалиям и&nbsp;поддерживает стратегию развития компании.
      </p>
      <p>
        Изложенные вышеперечисленные факты позволяют нашей компании быть гибкими, надежными, конкурентоспособными и&nbsp;с&nbsp;перспективой смотреть в&nbsp;будущее.
      </p>
    </div>
    <!-- <div v-else-if="currentIndex ===2">

    </div> -->
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
      slides: 2,
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
