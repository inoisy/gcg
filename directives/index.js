import Vue from 'vue';

// import Clickoutside from './clickoutside';
import Intersect from './intersect';
import TouchPan from './touch-pan';
import Resize from './resize';
import Scroll from './scroll';

// Vue.directive('clickoutside', Clickoutside);
Vue.directive('intersect', Intersect);
Vue.directive('resize', Resize);
Vue.directive('scroll', Scroll);
Vue.directive('touch-pan', TouchPan);
