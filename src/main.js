import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import "./assets/global.css"
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight, faArrowDown91, faArrowDownZA, faArrowUp19, faArrowUpAZ, faArrowsRotate, faCloudArrowDown, faMagnifyingGlass, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons'
library.add(faAnglesLeft,faAnglesRight,faAngleRight,faAngleLeft,faArrowUpAZ,faArrowDownZA,faArrowUp19,faArrowDown91,faMagnifyingGlass,faCloudArrowDown,faArrowsRotate,faSortDown,faSortUp)

const app=createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
