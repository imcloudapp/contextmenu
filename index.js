import Vue from 'vue'
import menu from './menu'

const Menu = Vue.extend(menu)

const fn=options=>{
  if(!options.event) return;
  let instance = new Menu()
  instance.event=options.event
  instance.items=options.items
  instance.size=options.size||''
  instance.$mount()
  document.body.appendChild(instance.$el)
  instance.visibled = true
}

export default {
  install(Vue){
    Vue.prototype.$contextmenu=fn
  }
}