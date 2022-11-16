import Vue from 'vue';
import YmapPlugin from 'vue-yandex-maps';

const settings = {
  apiKey: process.env.MAP_API_KEY,
  lang: 'ru_RU',
  coordorder: 'latlong',
  enterprise: false,
  version: '2.1',
}; // настройки плагина
export default function(ctx, inject) {
  console.log('🚀 ~ file: ymapPlugin.js ~ line 13 ~ function ~ process.server', process.server);
  Vue.use(YmapPlugin, settings);
}
