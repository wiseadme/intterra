// style
import './TableView.scss'

// template
import WithRender from './TableView.html'

// Vue
import Vue from 'vue'

// decorators
import { Component } from 'vue-property-decorator'

// api
import * as api from '@/api'

// components
import AppTable from '@/components/AppTable'

// interfaces
import { Column, Filter } from '@/interfaces'

// models
import Operation from '@/models/Operation'

@WithRender
@Component({
  components: {
    AppTable
  }
})

export default class TableView extends Vue {
  rows: Operation[] | null = []
  cols: Column [] = [
    {
      title: 'Дата',
      key: 'date',
      width: 15,
      sortable: true
    },
    {
      title: 'Операция',
      key: 'type',
      width: 40,
      dictionary: true,
      accent: true,
      sortable: true
    },
    {
      title: 'Культура',
      key: 'culture',
      width: 22.5,
      dictionary: true,
      icon: true,
      sortable: true
    },
    {
      title: 'Качество',
      key: 'assessment',
      width: 22.5,
      dictionary: true,
      indicator: true,
      sortable: true
    }
  ]

  filters: Filter[] = [
    {
      title: 'Запланированные операции',
      checked: false,
      col: 'assessment',
      value: null
    },
    {
      title: 'Выполненные операции',
      checked: false,
      col: 'assessment',
      value: true
    }
  ]

  created() {
    this.fetchOperations()
  }

  fetchOperations() {
    api.getOperations()
      .then((operations) => this.rows = operations)
      .catch(() => this.rows = null)
  }

  fetchFilteredOperations(filter): void {
    api.getFilteredOperations(filter)
      .then(operations => this.rows = operations)
      .catch(() => this.rows = null)
  }
}
