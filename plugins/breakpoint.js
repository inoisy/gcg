import Vue from 'vue';
import VueMq from 'vue-mq';

Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    md: 1025,
    lg: Infinity,
  },
  defaultBreakpoint: 'lg', // ctx.$device.isMobile ? 'md' : 'lg', // customize this for SSR
});
