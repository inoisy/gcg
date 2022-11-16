<template>
<div class="img-slider">
  <!-- <div> -->
  <!-- class="projects__img-wrapper" -->
  <img
    class="projects__img"
    :src="src"
    alt="Проект"
  >
  <div class="projects__img-curtain"/>
  <div class="projects__img-curtain-side"/>
  <!-- @load="onImageLoad" </div> -->
</div>
</template>

<script>
export default {
  name: 'ImgSlider',
  props: {
    src: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
  //
</style>
