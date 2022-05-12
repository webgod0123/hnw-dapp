import Vue from 'vue'
import routes from './config/AppRoutes'
// plugins
import Toasted from 'vue-toasted';
import { Modal } from 'bootstrap';
import VueRouter from 'vue-router'
import VueBootstrap from 'bootstrap-vue'
import VueNVD3 from 'vue-nvd3'
import VueInsProgressBar from 'vue-ins-progress-bar'
import VueEventCalendar from 'vue-event-calendar'
import VueSparkline from 'vue-sparklines'
import * as VueGoogleMaps from 'vue2-google-maps'
import Vueditor from '@agametov/vueditor'
import VueHljs from 'vue-hljs'
import hljs from "highlight.js";
import VueSweetalert2 from 'vue-sweetalert2'
import VueNotification from 'vue-notification'
import VuePanel from './plugins/panel/'
import VueDateTimePicker from 'vue-bootstrap-datetimepicker'
import VueSelect from 'vue-select'
import VueDatepicker from "vuejs-datepicker/dist/vuejs-datepicker.esm.js"
import VueMaskedInput from 'vue-maskedinput'
import VueInputTag from 'vue-input-tag'
import VueSlider from 'vue-slider-component'
import VueGoodTable from 'vue-good-table'
import VueCountdown from '@chenfengyuan/vue-countdown'
import VueColorpicker from 'vue-pop-colorpicker'
import VueCustomScrollbar from 'vue-custom-scrollbar'
import VueApexCharts from 'vue-apexcharts'
import DateRangePicker from 'vue2-daterange-picker'
import VueCookies from 'vue-cookies'


// plugins css
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'nvd3/build/nv.d3.min.css'
import 'vue-event-calendar/dist/style.css'
import 'vue-hljs/dist/style.css'
import '@agametov/vueditor/dist/style/vueditor.min.css'
import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css'
import 'simple-line-icons/css/simple-line-icons.css'
import 'flag-icon-css/css/flag-icons.min.css'
import 'ionicons/dist/css/ionicons.min.css'
import 'vue-good-table/dist/vue-good-table.css'
import 'vue-select/dist/vue-select.css'
import 'vue-slider-component/theme/antd.css'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
import 'sweetalert2/dist/sweetalert2.min.css'
import '@sweetalert2/theme-wordpress-admin/wordpress-admin.css'
import 'vue-custom-scrollbar/dist/vueScrollbar.css'

// color admin css
import './scss/vue.scss'
import 'bootstrap-social/bootstrap-social.css'

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(Toasted, {
  duration: 3000,
  position: 'top-center',
  theme: 'toasted-primary',
  iconPack: 'material'
})
Vue.use(VueCookies)
Vue.$cookies.config('7d')
Vue.use(VueRouter)
Vue.use(VueBootstrap)
Vue.use(VueNVD3)
Vue.use(VueEventCalendar, { locale: 'en' })
Vue.use(VueSparkline)
Vue.use(Vueditor)
Vue.use(VueHljs, { hljs })
Vue.use(VueSweetalert2)
Vue.use(VueNotification)
Vue.use(VuePanel)
Vue.use(VueDateTimePicker)
Vue.use(VueGoodTable)
Vue.use(VueColorpicker)
Vue.use(VueGoogleMaps, {
  load: {
    key: '',
    libraries: 'places'
  }
})
Vue.use(VueInsProgressBar, {
  position: 'fixed',
  show: true,
  height: '3px'
})
Vue.component('v-select', VueSelect);
Vue.component('datepicker', VueDatepicker)
Vue.component('masked-input', VueMaskedInput)
Vue.component('input-tag', VueInputTag)
Vue.component('vue-slider', VueSlider)
Vue.component('vue-custom-scrollbar', VueCustomScrollbar)
Vue.component('apexchart', VueApexCharts)
Vue.component('date-range-picker', DateRangePicker)
Vue.component(VueCountdown.name, VueCountdown);

/*
 *  [START] Vee-Validate
 */

// https://vee-validate.logaretm.com/v3/guide/basics.html#validation-provider
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import en from 'vee-validate/dist/locale/en';

// loop over all rules
for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: en.messages[rule] // add its message
  });
}
//SoftCap rule
extend('softcap', {
  validate(value, { hardcap }) {
    return (Number(value) <= Number(hardcap) && Number(value) >= (Number(hardcap) / 2));
  },
  params: ['hardcap'],
  message: 'The softcap field must be greater than or equal to 50% of the hardcap.'
});
//HardCap rule
extend('hardcap', {
  validate(value, { softcap }) {
    return (Number(value) <= (Number(softcap) * 2));
  },
  params: ['softcap'],
  message: 'The softcap field must be greater than or equal to 50% of the hardcap.'
});

// Register it globally
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);

/*
 *  [END] Vee-Validate
 */

/*
 *  [START] Old Git Import
 */
import helpers from './utils/helpers';
Object.defineProperty(Vue.prototype, '$helpers', { value: helpers });

import callsContainer from './utils/callsContainer';
Object.defineProperty(Vue.prototype, '$calls', { value: callsContainer });

import eventBus from "./utils/eventBus";
Object.defineProperty(Vue.prototype, '$eventBus', { value: eventBus });

Object.defineProperty(Vue.prototype, '$ethereum', {value: window.ethereum})

import { store } from './store/index';
/*
 *  [END] Old Git Import
 */

/* Extend numbers */
Number.prototype.padLeft = function (base, chr) {
  var len = (String(base || 10).length - String(this).length) + 1;
  return len > 0 ? new Array(len).join(chr || '0') + this : this;
}


const router = new VueRouter({
  mode: 'history',
  routes,
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

// HELPERS
Object.defineProperty(Array.prototype, 'chunk', {
  value: function (chunkSize) {
    var R = [];
    for (var i = 0; i < this.length; i += chunkSize)
      R.push(this.slice(i, i + chunkSize));
    return R;
  }
});