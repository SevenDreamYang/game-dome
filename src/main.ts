import Vue from 'vue';
import App from './App.vue';
import uView from 'uview-ui';
import plugins from '@/utils/plugin';
Vue.use(uView);
Vue.use(plugins);
Vue.config.productionTip = false;

new App().$mount();

declare module 'vue/types/vue' {
  interface Vue {
    $nextPage: (url: string, params?: { [x: string]: any }, callback?: (...args: any[]) => {}) => void;
    $goTypePage: (url: string | number, type?: 'redirectTo' | 'reLaunch' | 'switchTab', params?: { [x: string]: any }) => void;
    $toast: (title: string, icon?: string, mask?: boolean, time?: number) => void;
  }
}
