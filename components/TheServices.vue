<template>
<div
  id="services"
  class="services"
>
  <div class="services__inner">
    <div class="services__header">УСЛУГИ</div>
    <div
      v-for="item in items"
      :key="item"
      class="services__item"
    >
      <div class="services__icon-wrapper">
        <SvgIcon
          class="services__icon"
          name="plus"
        />
      </div>

      {{ item }}
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'TheServices',
  data() {
    return {
      items: [
        'Монтаж электрооборудования',
        'Монтаж систем водоснабжения',
        'Монтаж инженерных сетей отопления',
        'Устройство воздушного отопления, монтаж инженерных систем вентиляции и кондиционирования',
        'Устройство слаботочных сетей согласно проекту',
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
  .services {
    // height: torem(733);
    padding-top: torem(197);
    padding-bottom: torem(196);
    padding-left: torem(352);

    @include respond-to(md) {
      padding-top: 24px;
      padding-bottom: 100px;
      padding-left: 16px;
    }

    &__inner {
      max-width: torem(770);
    }

    &__header {
      margin-bottom: torem(42);
      margin-left: torem(32);
      text-transform: uppercase;
      font-size: torem(14);
      font-weight: 400;
      line-height: percentage(16px / 14px);
      letter-spacing: .32em;
      color: $olive;

      @include respond-to(md) {
        margin-bottom: 32px;
        margin-left: 0;
        font-size: 12px;
        line-height: 14px;
      }
    }

    &__icon {
      $size: torem(24);

      width: $size;
      min-width: $size;
      height: $size;
      margin-right: torem(8);

      @include respond-to(md) {
        $size: 20px;

        width: $size;
        min-width: $size;
        height: $size;
        margin-right: 8px;
      }
    }

    &__item {
      display: flex;
      margin-bottom: torem(32);
      text-transform: uppercase;
      font-size: torem(20);
      font-weight: 400;
      line-height: percentage(24px/20px);
      letter-spacing: .02em;
      color: $black;

      &:last-child {
        margin-bottom: 0;
      }

      @include respond-to(md) {
        align-items: center;
        font-size: 12px;
        line-height: 14px;
      }
    }
  }
</style>
