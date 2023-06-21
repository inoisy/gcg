<template>
<div class="index-page">
  <div class="the-header">
    <img
      class="the-header__logo"
      src="/logo-new.svg"
      alt="logo"
    >

  </div>
  <div class="index-page__wrapper">
    <div class="index-page__company-name-wrapper">
      <div class="index-page__company-name">
        GLOBAL<br>
        CONSTRUCTION<br>
        <!-- GROUP -->
      </div>
    </div>
    <div></div>
    <div></div>
    <div class="index-page__middle">
      <h1>Сайт находится в стадии разработки</h1>
      <div>Пожалуйста, вернитесь позже</div>
      <img
        class="index-page__img"
        src="/construction.svg"
      >
    </div>
    <div class="index-page__bottom"></div>
    <div></div>
  </div>
</div>
</template>

<script>
export default {
  name: 'IndexPage',
  head() {
    return {
      title: 'GCG',
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

  .index-page {
    flex: 1;
    height: 100%;

    &__bottom {
      border-top: .5px solid $black;
      border-right: .5px solid $black;

      @include respond-to(md) {
        display: none;
      }
    }

    &__wrapper {
      display: grid;
      grid-template-columns: clamp(325px, 23%, 23%) auto;
      grid-template-rows: 20vh 65vh auto;
      flex: 1;
      min-height: calc(100% - 72px);

      @include respond-to(md) {
        display: flex;
      }
    }

    &__company-name-wrapper {
      display: flex;
      align-items: center;
      padding-top: 20px;
      padding-right: 14px;
      padding-bottom: 20px;
      // width: 23%;
      // min-width: 325px;
      // min-height: 20vh;
      padding-left: 42px;
      border-right: .5px solid $black;
      border-bottom: .5px solid $black;
      background-color: #97a99f;
      // padding: 42px 14px 33px 48px;
      @include respond-to(md) {
        display: none;
      }
    }

    &__company-name {
      text-shadow:
        .5px 0 #fff,
        -.5px 0 #fff,
        0 .5px #fff,
        0 -.5px #fff,
        .5px .5px #fff,
        -.5px -.5px #fff,
        .5px -.5px #fff,
        -.5px .5px #fff;
      font-family: 'Arial Black', Tahoma, sans-serif;
      font-size: 28px;
      font-weight: 900;
      line-height: 39px;
      color: #97a99f;
    }

    &__middle {
      // height: 65vh;
      position: relative;
      // margin-left: clamp(325px, 23%, 23%);
      padding: 48px;
      border: .5px solid $black;
      border-right: none;
      background-color: #97a99f;
      font-size: 24px;
      font-weight: 400;
      line-height: 28px;
      color: #fff;

      @include respond-to(md) {
        margin-left: 0;
      }

      @include respond-to(md) {
        width: 100%;
        border: none !important;
        font-size: 16px;
        line-height: 19px;
      }

      h1 {
        margin-bottom: 24px;
        font-size: 32px;
        font-weight: 900;
        line-height: 38px;

        @include respond-to(md) {
          font-size: 24px;
          line-height: 28px;
        }
      }
    }

    &__img {
      position: absolute;
      right: 0;
      bottom: 0;

      @include respond-to(md) {
        max-width: 90%;
      }
    }
  }
</style>
