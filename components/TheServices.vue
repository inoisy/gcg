<template>
<div
  id="services"
  class="services"
>
  <div class="services__inner">
    <div class="services__header">УСЛУГИ</div>
    <div
      v-for="(item,index) in items"
      :key="item.title"
      class="services__item"
      :class="{
        open: itemsState[index]
      }"
    >
      <div
        class="services__item-activator"
      >

        <!-- @click="onClick(index)" -->
        <div class="services__icon-wrapper">
          <SvgIcon
            class="services__icon"
            :name="itemsState[index] ? 'minus' : 'plus'"
          />
        </div>

        {{ item.title }}
      </div>

      <!-- <VExpandTransition>
        <div
          v-show="itemsState[index]"
          class="services__content"
        >
          <div class="services__content-spacer"></div>
          {{ item.content }}
        </div>
      </VExpandTransition> -->
    </div>
  </div>
</div>
</template>

<script>
/* eslint-disable max-len,sonarjs/no-duplicate-string*/
export default {
  name: 'TheServices',
  data() {
    const items = [
      {
        title: 'Монтаж систем отопления и теплоснабжения',
        content: 'Картины озарились, головы дев ему улыбнулись, статуи приняли обманчивую окраску жизни. Втянутые в пляску тою лихорадочною тревогой, которая, точно хмель, бродила в его больном мозгу, эти произведения под покровом тени ожили, зашевелились и вихрем понеслись перед ним; каждый фарфоровый уродец строил ему гримасу, у людей, изображенных на картинах, веки опустились, чтобы дать отдохнуть глазам. Все эти фигуры вздрогнули, вскочили, сошли со своих мест — кто грузно, кто легко, кто грациозно, кто неуклюже, в зависимости от своего нрава, свойства и строения. То был некий таинственный шабаш, достойный тех чудес, что видел доктор Фауст на Брокене.',
      },
      {
        title: 'Монтаж систем вентиляции, кондиционирования и дымоудаления',
        content: 'Картины озарились, головы дев ему улыбнулись, статуи приняли обманчивую окраску жизни. Втянутые в пляску тою лихорадочною тревогой, которая, точно хмель, бродила в его больном мозгу, эти произведения под покровом тени ожили, зашевелились и вихрем понеслись перед ним; каждый фарфоровый уродец строил ему гримасу, у людей, изображенных на картинах, веки опустились, чтобы дать отдохнуть глазам. Все эти фигуры вздрогнули, вскочили, сошли со своих мест — кто грузно, кто легко, кто грациозно, кто неуклюже, в зависимости от своего нрава, свойства и строения. То был некий таинственный шабаш, достойный тех чудес, что видел доктор Фауст на Брокене.',
      },
      {
        title: 'Монтаж систем водоснабжения и водоотведения',
        content: 'Картины озарились, головы дев ему улыбнулись, статуи приняли обманчивую окраску жизни. Втянутые в пляску тою лихорадочною тревогой, которая, точно хмель, бродила в его больном мозгу, эти произведения под покровом тени ожили, зашевелились и вихрем понеслись перед ним; каждый фарфоровый уродец строил ему гримасу, у людей, изображенных на картинах, веки опустились, чтобы дать отдохнуть глазам. Все эти фигуры вздрогнули, вскочили, сошли со своих мест — кто грузно, кто легко, кто грациозно, кто неуклюже, в зависимости от своего нрава, свойства и строения. То был некий таинственный шабаш, достойный тех чудес, что видел доктор Фауст на Брокене.',
      },
      {
        title: 'Монтаж систем пожаротушения',
        content: 'Картины озарились, головы дев ему улыбнулись, статуи приняли обманчивую окраску жизни. Втянутые в пляску тою лихорадочною тревогой, которая, точно хмель, бродила в его больном мозгу, эти произведения под покровом тени ожили, зашевелились и вихрем понеслись перед ним; каждый фарфоровый уродец строил ему гримасу, у людей, изображенных на картинах, веки опустились, чтобы дать отдохнуть глазам. Все эти фигуры вздрогнули, вскочили, сошли со своих мест — кто грузно, кто легко, кто грациозно, кто неуклюже, в зависимости от своего нрава, свойства и строения. То был некий таинственный шабаш, достойный тех чудес, что видел доктор Фауст на Брокене.',
      },
      {
        title: 'Монтаж систем электроснабжения и электроосвещения',
        content: 'Картины озарились, головы дев ему улыбнулись, статуи приняли обманчивую окраску жизни. Втянутые в пляску тою лихорадочною тревогой, которая, точно хмель, бродила в его больном мозгу, эти произведения под покровом тени ожили, зашевелились и вихрем понеслись перед ним; каждый фарфоровый уродец строил ему гримасу, у людей, изображенных на картинах, веки опустились, чтобы дать отдохнуть глазам. Все эти фигуры вздрогнули, вскочили, сошли со своих мест — кто грузно, кто легко, кто грациозно, кто неуклюже, в зависимости от своего нрава, свойства и строения. То был некий таинственный шабаш, достойный тех чудес, что видел доктор Фауст на Брокене.',
      },
      {
        title: 'Монтаж слаботочных систем',
      },
      {
        title: 'Генеральный подряд',
      },
      {
        title: 'Проектирование проектной и рабочей документации по внутренним инженерным системам',
      },
    ];
    return {
      itemsState: {
        0: false,
        1: false,
        2: false,
        3: false,
        4: false,
      },
      items,
    };
  },
  methods: {
    onClick(index) {
      this.itemsState[index] = !this.itemsState[index];
    },
  },
};
</script>

<style lang="scss" scoped>
  .services {
    padding-top: torem(197);
    padding-bottom: torem(196);
    padding-left: torem(352);

    @include respond-to(md) {
      padding-top: 24px;
      padding-right: 32px;
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

    &__icon-wrapper {
      display: flex;
    }

    &__icon {
      $size: torem(24);

      width: $size;
      min-width: $size;
      height: $size;
      margin-right: torem(8);
      color: $black;

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
      flex-direction: column;

      &:last-child {
        margin-bottom: 0;
      }

      &.open {
        .services__item-activator {
          color: $olive;
        }

        .services__icon {
          color: $olive;
        }
      }

      @include respond-to(md) {
        margin-bottom: 24px;
      }
    }

    &__item-activator {
      display: flex;
      align-items: center;
      text-transform: uppercase;
      font-size: torem(20);
      font-weight: 400;
      line-height: percentage(24px/20px);
      letter-spacing: .02em;
      color: $black;
      // cursor: pointer;

      @include respond-to(md) {
        align-items: center;
        font-size: 12px;
        line-height: 14px;
      }
    }

    &__content {
      padding-left: 32px;
      font-size: torem(16);
      font-weight: 400;
      line-height: percentage(24px/16px);
      letter-spacing: .02em;
      color: #0b0b0b;

      @include respond-to(md) {
        font-size: 12px;
        line-height: 17px;
      }
    }

    &__content-spacer {
      height: torem(20);
    }
  }
</style>
