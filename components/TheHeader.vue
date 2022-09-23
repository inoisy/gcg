<template>
<div class="the-header">
  <img src="/logo.svg" alt="logo">
  <a href="#" class="the-header__license">Лицензия</a>
</div>
</template>

<script>
export default {
  name: 'TheHeader',
};
</script>

<style lang="scss" scoped>
.the-header{
  padding: 16px 48px;
  position: relative;
  display: flex;
  align-items: center;
  @include respond-to(md){
    justify-content: center;
  }
  &:after{
    content: "";
    position: absolute;
    height: 0.5px;
    background-color: $black;
    width: 100%;
    bottom: 0;
    left:0;
  }
  &__license{
    font-weight: 600;
    font-size: 14px;
    line-height: 16px;
    color: $black;
    margin-left: auto;
    @include respond-to(md){
      display: none;
    }
    transition: opacity $transition;
    &:hover{
      opacity: 0.7;
    }
  }
}
</style>
