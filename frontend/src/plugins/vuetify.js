import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import pt from 'vuetify/es5/locale/pt';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    primary: '#C33C3C',
    secondary: '#363a49',
    accent: '#82B1FF',
    info: '#2196F3',
    success: '#3EBD93',
    error: '#E02D38',
    warning: '#F7C947',
    grey: '#757575',
    text: '#424242',
  },
  iconfont: 'md',
  lang: {
    locales: { pt },
    current: 'pt',
  },
});
