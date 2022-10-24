<template>
<div class="the-header">
  <img class="the-header__logo" src="/logo.svg" alt="logo">
  <div class="the-header__nav">
    <NuxtLink
      v-for="item in items"
      :key="item.slug"
      :to="`/${item.slug}`"
      class="the-header__nav-item"
    >
      {{ item.text }}
    </NuxtLink>
  </div>
</div>
</template>

<script>
export default {
  name: 'TheHeader',
  data() {
    return {
      items: [
        {
          text: 'Услуги',
          slug: 'services',
        },
        {
          text: 'Проекты',
          slug: 'projects',
        },
        {
          text: 'Презентация',
          slug: 'presentation',
        },
        {
          text: 'Отзывы',
          slug: 'reviews',
        },
        {
          text: 'География',
          slug: 'geography',
        },
        {
          text: 'Контакты',
          slug: 'contacts',
        },
        {
          text: 'Лицензии',
          slug: 'licenses',
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
  .the-header {
    position: relative;
    display: flex;
    align-items: center;
    height: 72px;
    padding: 16px 48px;

    @include respond-to(md) {
      justify-content: center;
    }

    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: .5px;
      background-color: $black;
    }

    &__logo {
      width: 90px;
      height: 40px;
      object-fit: contain;
    }

    &__nav {
      display: flex;
      justify-content: space-between;
      flex: 1;
      margin-left: 180px;
    }

    &__nav-item {
      text-transform: uppercase;
      font-family: 'Raleway', Tahoma, sans-serif;
      font-size: 12px;
      font-weight: 500;
      line-height: 14px;
      letter-spacing: .32em;
      color: $black;
    }
  }
</style>
