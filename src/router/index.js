import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve =>require(['@/pages/Home'], resolve);
const Shoppingcar = resolve =>require(['@/pages/Shoppingcar'], resolve);
const ProductDetail = resolve =>require(['@/pages/ProductDetail'], resolve);
const Mine = resolve =>require(['@/pages/Mine'], resolve);
const Order = resolve =>require(['@/pages/Order'], resolve);
const MyData = resolve =>require(['@/pages/MyData'], resolve);
const Editpwd = resolve =>require(['@/pages/Editpwd'], resolve);
const AddressManage = resolve =>require(['@/pages/AddressManage'], resolve);
const AddAddress = resolve =>require(['@/pages/AddAddress'], resolve);
const EditAddress = resolve =>require(['@/pages/EditAddress'], resolve);
const Search = resolve =>require(['@/pages/Search'], resolve);
const ConfirmOrder = resolve =>require(['@/pages/ConfirmOrder'], resolve);

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
			iconCls: 'iconfont icon-shouye',
			component: Home,
		},
		{
			path: '/shoppingcar',
			name: '购物车',
			iconCls: 'iconfont icon-gouwuche',
			menuShow: true,
			component: Shoppingcar
		},
		{
			path: '/mine',
			name: '我的',
			iconCls: 'iconfont icon-wode',
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
		{
			path: '/myData',
			name: '个人资料',
			menuShow: false,
			component: MyData
		},
		{
			path: '/editpwd',
			name: '修改密码',
			menuShow: false,
			component: Editpwd
		},
		{
			path: '/addressManage',
			name: '地址管理',
			menuShow: false,
			component: AddressManage
		},
		{
			path: '/addAddress',
			name: '新增地址',
			menuShow: false,
			component: AddAddress
		},
		{
			path: '/editAddress',
			name: '修改地址',
			menuShow: false,
			component: EditAddress
		},
		{
			path: '/search',
			name: '搜索',
			menuShow: false,
			component: Search
		},
		{
			path: '/confirmOrder',
			name: '确认订单',
			menuShow: false,
			component: ConfirmOrder
		},
  	]
})
