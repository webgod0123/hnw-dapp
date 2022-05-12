import { Doughnut } from 'vue-chartjs'
import { Chart } from 'chart.js'

Chart.defaults.global.defaultColor = 'rgba('+ window.getComputedStyle(document.body).getPropertyValue('--app-component-color-rgb').trim() + ', .65)';
Chart.defaults.global.defaultFontFamily = window.getComputedStyle(document.body).getPropertyValue('--bs-body-font-family').trim();
Chart.defaults.global.defaultFontStyle = 600;
Chart.defaults.scale.gridLines.color = 'rgba('+ window.getComputedStyle(document.body).getPropertyValue('--app-component-color-rgb').trim() + ', .15)';
Chart.defaults.scale.gridLines.zeroLineColor = 'rgba('+ window.getComputedStyle(document.body).getPropertyValue('--app-component-color-rgb').trim() + ', .15)';

export default {
  extends: Doughnut,
  props: ['data', 'options'],
  mounted () {
    this.renderChart(this.data, this.options)
  }
}