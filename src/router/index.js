import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve =>require(['@/pages/Home'], resolve);
const Shoppingcar = resolve =>require(['@/pages/Shoppingcar'], resolve);
const ProductDetail = resolve =>require(['@/pages/ProductDetail'], resolve);
const Mine = resolve =>require(['@/pages/Mine'], resolve);
const Order = resolve =>require(['@/pages/Order'], resolve);

Vue.use(Router)

export default new Router({
  	routes: [
    	{
      		path: '/',
			menuShow: false,
			redirect: '/home'
    	},
    	{
			path: '/home',
			name: '首页',
			menuShow: true,
			iconCls: 'home_light.svg',
			component: Home,
		},
		{
			path: '/shoppingcar',
			name: '购物车',
			iconCls: 'shopping-cart.svg',
			menuShow: true,
			component: Shoppingcar
		},
		{
			path: '/mine',
			name: '我的',
			iconCls: 'shopping-cart.svg',
			menuShow: true,
			component: Mine
		},
		{
			path: '/productdetail',
			name: '商品详情',
			menuShow: false,
			component: ProductDetail
		},
		{
			path: '/order',
			name: '订单',
			menuShow: false,
			component: Order
		},
  	]
})
