import { Component, Vue } from 'vue-property-decorator'
// import './assets/scss/main.scss'

@Component({
  template: `
    <div id="app">
      <header class="header"></header>
      <div class="wrap">
        <router-view/>
      </div>
    </div>`
})

export default class App extends Vue {

}
