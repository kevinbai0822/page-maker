import Vue from 'vue'
import Router from 'vue-router'
import Toolbar from '@/components/framework-left'

Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'toolbar',
		component: Toolbar
	}]
})
