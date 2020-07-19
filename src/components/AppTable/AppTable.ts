// style
import './AppTable.scss'

// decorators
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

// template
import WithRender from './AppTable.html'

// filter helpers
import { setFromDictionary, compareDates } from '@/helpers'

// types
import { Column, Filter } from '@/interfaces'

// components
import TableColumn from './TableColumn'
import TableRow from './TableRow'
import TableCell from './TableCell'
import TableFilter from './TableFilter'
import AppPreloader from '@/components/AppPreloader'

@WithRender
@Component({
  components: {
    TableColumn,
    TableRow,
    TableCell,
    TableFilter,
    AppPreloader
  }
})

export default class AppTable extends Vue {
  @Prop() cols!: Column[]
  @Prop() filters!: Filter[]
  @Prop() rows!: object[]
  @Prop() icons!: object
  @Prop() indicators!: object

  tableRows: object[]
  tableCols: Column[]
  showPreloader: boolean

  constructor() {
    super()
    this.tableCols = []
    this.tableRows = []
    this.showPreloader = true
  }

  created() {
    this.tableCols = this.cols
  }

  addFilter(filter: Filter): void {
    this.showPreloader = true
    filter.checked = !filter.checked
    this.filters.map(fl => {
      fl !== filter ? fl.checked = false : false
    })
    this.$emit('filter', filter)
  }

  sortByColumn(col: Column): void {
    this.cols.forEach(it => {
      this.$set(
        it,
        'sorted',
        it.key === col.key && !col.sorted
      )
    })
    this.sortRows(col)
  }

  sortRows(col: Column): void {
    if (col.sorted) {
      this.tableRows.sort((a, b) => {
        if (col.key === 'date' && col.sorted) {
          return compareDates(a[col.key], b[col.key])
        }
        if (col.dictionary && col.sorted) {
          return (setFromDictionary(a[col.key], col.key)
            > setFromDictionary(b[col.key], col.key)) ? 1 : -1
        }
        return 0
      })
    } else {
      this.tableRows.reverse()
    }
  }

  @Watch('rows', { immediate: true })
  setRows(to: object[]): void {
    this.tableRows = to
  }

  @Watch('rows')
  preloader(): void {
    this.showPreloader = false
  }
}
