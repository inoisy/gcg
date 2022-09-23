<template>
<div class="index-page">
  <TheHeader/>
  <div class="index-page__wrapper">
    <div class="index-page__company-name-wrapper">
      <div class="index-page__company-name">
        GLOBAL<br>
        CONSTRUCTION<br>
        GROUP
      </div>
    </div>
    <div></div>
    <div></div>
    <div class="index-page__middle">
      <h1>Сайт находится в стадии разработки</h1>
      <div>Пожалуйста, вернитесь позже</div>
      <img class="index-page__img" src="/construction.svg" >
    </div>
    <div class="index-page__bottom"></div>
    <div></div>
  </div>
</div>
</template>

<script>
import TheHeader from '~/components/TheHeader.vue';
export default {
  name: 'IndexPage',
  components: {
    TheHeader,
  },
  head() {
    return {
      title: 'GCG',
    };
  },
};
</script>

<style lang="scss" scoped>
.index-page{
  flex: 1;
  height: 100%;
  &__bottom{
    border-top: 0.5px solid $black;
    border-right: 0.5px solid $black;
    @include respond-to(md){
      display: none;
    }
  }
  &__wrapper{
    display: grid;
    grid-template-columns: clamp(325px, 23%, 23%) auto;
    grid-template-rows: 20vh 65vh auto;
    flex: 1;
    min-height: calc(100% - 72px);
    @include respond-to(md){
      display: flex;
    }
  }
  &__company-name-wrapper{
    border-bottom: 0.5px solid $black;
    border-right: 0.5px solid $black;
    background-color: #97A99F;
    // width: 23%;
    // min-width: 325px;
    // min-height: 20vh;
    padding-left:42px;
    padding-right: 14px;
    display: flex;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
    // padding: 42px 14px 33px 48px;
    @include respond-to(md){
      display: none;
    }
  }
  &__company-name{
    font-family: 'Arial Black';
    font-weight: 900;
    font-size: 28px;
    line-height: 39px;
    color:#97A99F;
    text-shadow: 0.5px 0 #fff, -0.5px 0 #fff, 0 0.5px #fff, 0 -0.5px #fff,
             0.5px 0.5px #fff, -0.5px -0.5px #fff, 0.5px -0.5px #fff, -0.5px 0.5px #fff;

  }
  &__middle{
    border: 0.5px solid $black;
    border-right: none;
    background-color: #97A99F;
    // margin-left: clamp(325px, 23%, 23%);
    padding: 48px;
    // height: 65vh;
    position:relative;
    @include respond-to(md){
      margin-left: 0;
    }
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    color: #FFFFFF;
    @include respond-to(md){
      font-size: 16px;
      line-height: 19px;
      width: 100%;
      border: none !important;
    }
    h1 {
      font-weight: 900;
      font-size: 32px;
      line-height: 38px;
      margin-bottom: 24px;
      @include respond-to(md){
        font-size: 24px;
        line-height: 28px;
      }
    }
  }
  &__img{
    position: absolute;
    right: 0;
    bottom: 0;
    @include respond-to(md){
      max-width: 90%;
    }
  }
}
</style>
