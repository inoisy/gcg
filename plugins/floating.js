import Vue from 'vue';
import {
  // Directives
  VTooltip,
  VClosePopper,
  // Components
  Dropdown,
  Tooltip,
  Menu,
} from 'floating-vue';
import 'floating-vue/dist/style.css';
import components from '~/plugins/transitions';

Vue.directive('tooltip', VTooltip);
Vue.directive('close-popper', VClosePopper);

Vue.component('VDropdown', Dropdown);
Vue.component('VTooltip', Tooltip);
Vue.component('VMenu', Menu);
for (const key in components) {
  const component = components[key];

  Vue.component(key, component);
}
