// styles
import './TableRow.scss'
// vue
import Vue from 'vue'
// types
import { VNode } from 'vue/types'

export default Vue.extend({
  name: 'TableRow',
  functional: true,
  render(h, context): VNode {
    return h('div', {
      ...context.data,
      staticClass: 'table__row'
    }, context.children)
  }
})
