// styles
import './TableCell.scss'
// Vue
import Vue from 'vue'
// types
import { VNode } from 'vue/types'
// helpers
import { setFormattedDate, setFromDictionary } from '@/helpers'
// enums
import { Assessment, Culture } from '@/models/Operation'

export default Vue.extend({
  name: 'TableCell',
  props: {
    row: Object,
    col: Object
  },

  computed: {
    contentWrap(): VNode {
      return this.$createElement('div', {
        staticClass: 'table__cell-content'
      }, [])
    },

    cellIcon(): VNode | null {
      const { col } = this
      if (col.icon) {
        return this.$createElement('span', {
          staticClass: 'table__cell-icon',
          class: {
            ...this.iconClasses
          }
        })
      }
      return null
    },

    formattedText(): string {
      const { row, col } = this
      if (row[col.key] && row[col.key].year) {
        return setFormattedDate(row[col.key])
      }
      if (col.dictionary) {
        return setFromDictionary(row[col.key], col.key)
      }
      return row[col.key]
    },

    cellText(): VNode {
      return this.$createElement('span', {
        staticClass: 'table__cell-text',
        class: {
          ...this.textClasses
        }
      }, this.formattedText)
    },

    iconClasses(): Record<string, boolean> {
      const { row, col } = this
      let classes = {}
      if (col.icon) {
        classes = {
          ...classes, [Culture[row[col.key]].toLowerCase()]: true
        }
      }
      return classes
    },

    textClasses(): Record<string, boolean> {
      const { row, col } = this
      let classes = {}
      if (col.indicator && Assessment[row[col.key]]) {
        classes[Assessment[row[col.key]].toLowerCase()] = true
      }
      if (col.indicator && !Assessment[row[col.key]]) {
        classes = { ...classes, none: true }
      }
      return { ...classes, accent: col.accent }
    }
  },

  render(h): VNode {
    const content = this.contentWrap
    if (this.cellIcon) {
      content.children!.push(this.cellIcon)
    }
    content.children!.push(this.cellText)
    return h('div', {
      staticClass: 'table__cell',
      style: {
        width: `${ this.col.width }%`
      }
    }, [content])
  }
})
