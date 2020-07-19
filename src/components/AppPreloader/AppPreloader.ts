import './AppPreloader.scss'
import Vue from 'vue'
import { VNode } from 'vue/types'
import preloader from '@/schemes/preloader.json'

export default Vue.extend({
  name: 'AppPreloader',
  functional: true,
  render(h): VNode {
    return h('div', {
      staticClass: 'table__preloader',
      domProps: {
        innerHTML: preloader[0]
      },
    })
  }
})
