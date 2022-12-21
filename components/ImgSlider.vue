<template>
<div class="img-slider">
  <!-- <div> -->
  <!-- class="projects__img-wrapper" sizes="lg:70vw"-->
  <NuxtImg
    class="projects__img"
    :src="src"
    alt="Проект"
    loading="lazy"
    format="jpg"
  />
  <div class="projects__img-curtain"/>
  <div class="projects__img-curtain-side"/>
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
