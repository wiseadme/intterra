// styles
import './TableColumn.scss'
// Vue
import Vue from 'vue'
// types
import { VNode } from 'vue/types'

export default Vue.extend({
  name: 'TableColumn',
  props: {
    col: Object
  },
  computed: {
    content(): VNode {
      return this.$createElement('span', {
        staticClass: 'table__col-title',
        class: {
          sortable: this.col.sortable && !this.col.sorted,
          sorted: this.col.sorted
        },
        on: {
          click: () => this.$emit('sort', this.col)
        }
      }, this.col.title)
    }
  },

  render(h): VNode {
    return h('div', {
      staticClass: 'table__col',
      style: {
        width: `${ this.col.width }%`
      }
    }, [this.content])
  }
})
