// styles
import './TableFilter.scss'
// vue
import Vue from 'vue'
// types
import { VNode } from 'vue/types'

export default Vue.extend({

  name: 'TableFilter',
  props: {
    filter: Object
  },

  computed: {
    label(): VNode {
      return this.$createElement('span', {
        staticClass: 'table__filter-label',
        class: {
          checked: this.filter.checked
        },
        on: {
          click: () => this.$emit('click')
        }
      }, [this.filter.title])
    },
  },

  render(h): VNode {
    return h('div', {
      staticClass: 'table__filter',
    }, [this.label])
  }
})
