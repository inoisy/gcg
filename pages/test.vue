<template>
<div class="index-page">
  <TheUnderConstruction v-if="!$config.IS_SITE_DISABLED"/>
  <MainPage v-else/>
</div>
</template>

<script>
import TheUnderConstruction from '~/components/TheUnderConstruction.vue';
import MainPage from '~/components/pages/MainPage.vue';
export default {
  name: 'TestPage',
  components: {
    TheUnderConstruction,
    MainPage,
  },

};
</script>

<style lang="scss" scoped>
  .index-page {
    width: 100%;
  }
</style>
