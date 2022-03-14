import Vue, { PluginObject } from 'vue';
import { nextPage, goTypePage, showToast } from './index';

const plugins: PluginObject<any> = {
  install: (vue: typeof Vue) => {
    vue.prototype.$nextPage = nextPage;
    vue.prototype.$goTypePage = goTypePage;
    vue.prototype.$toast = showToast;
  },
};

export default plugins;
