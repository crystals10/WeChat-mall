<template>
	<section class="section-con">
		
		<div>
			<div class="myU-head">
				<div class="photo">
					<img src="../assets/images/touxiang.jpg" height="300" width="300"/>
					<!-- <div style="padding-top:30px;color:white;"><span>张三</span></div> -->
				</div>
				<div class="phone">17826804660</div>
				<div class="jifen">积分￥10</div>
			</div>
			<div class="orderPanel">
			<div style="background: #fff;border-radius: 3px;">
			<mt-cell title="我的订单" is-link to="/order" style="border-bottom: 1px solid #e8e8e8;">
  <span>查看全部订单</span>
</mt-cell>
<div class="allOrder">
	<div @click="clickOrder(0)">
		<i class="iconfont icon-dingdanzhuangtaidengdai" style="font-size:30px;"></i>
		<p>代付款</p>
	</div>
	<div @click="clickOrder(1)">
		<i class="iconfont icon-distribution" style="font-size:30px;"></i>
		<p>待发货</p>
	</div>
	<div @click="clickOrder(2)">
		<i class="iconfont icon-daodashijian" style="font-size:30px;"></i>
		<p>待收货</p>
	</div>
	<div @click="clickOrder(3)">
		<i class="iconfont icon-icon5" style="font-size:30px;"></i>
		<p>已完成</p>
	</div>
</div>
</div>
<div class="box-panel">
	<div class="allOrder"  style="border-bottom: 1px solid #eee;">
			<div  @click="skip('myData')">
		<i class="iconfont icon-gerenziliao" style="font-size:30px;"></i>
		<p>个人资料</p>
	</div>
	<div @click="skip('addressManage')">
		<i class="iconfont icon-dizhiguanli" style="font-size:30px;"></i>
		<p>地址管理</p>
	</div>
	<div @click="skip('myShare')">
		<i class="iconfont icon-fenxiang" style="font-size:30px;"></i>
		<p>我的分享</p>
	</div>
</div>
</div>
<div class="connect">客服电话：111-111-1111</div>
<mt-button type="danger" size="large" @click="clearData">清除缓存</mt-button>
	
    
			</div>
		</div>
		<tabbar-select></tabbar-select>
	</section>
</template>
<script>
	// import { getUser ,domainName} from "../js/api"
	// import { ls } from "../js/LStorage"
	import Tabbar from '@/components/Tabbar'
	import { Toast} from 'mint-ui';
	export default {
		name: 'Mine',
		components: {
			'tabbar-select': Tabbar
		},
		data() {
			return {
				userInfo:{}
			}
		},
		methods: {
			clickOrder:function(index){
				this.$router.push({
					path: '/order',
					query:{
						state:index
					}
				});
			},
			skip:function(index){
				this.$router.push({
					path: '/'+index
				});
			},
			clearData(){
				// ls.clear();
				window.location.href=domainName+"/#/home";
//				history.go(0) ;
			},
		},
		mounted() {
			// let info = Object.assign({}, this.$store.state.generalInfo);
			// let search={
			// 	token:this.$store.state.wx_user_info.token,
			// 	userId:this.$store.state.wx_user_info.user.id
			// }
			// info.search=search;
			// console.log("获取用户信息提交数据",info);
			// getUser(info).then(data => {
			// 		let {
			// 			errCode,
			// 			errMsg,
			// 			userInfo
			// 		} = data;
			// 		if(errCode != 0) {
			// 			Toast({
			// 				message: errCode,
			// 				position: 'middle',
			// 				duration: 2000
			// 			});
			// 		} else {
			// 			this.userInfo=userInfo;
			// 			console.log('this.userInfo',JSON.stringify(this.userInfo));
			// 		}
			// 	});
		},
		// beforeRouteLeave(to, from, next) {
		// 	   // 设置下一个路由的 meta
		// 	  to.meta.keepAlive = false; // C 跳转到 A 时让 A 不缓存，即刷新
		// 	  next();
		// 	}
		
	}
</script>
<style scoped>
	.section-con{
		background:#fbdcbd;
		/*height: 100vh;*/
		
	}
	.myU-head{
	height: 170px;
	background: #c7000a url(../assets/images/my-bk.png) bottom center no-repeat;
    background-size: 100% auto;
    width: 100%;
    text-align: center;
    padding: 20px 0 0;
	}
	.photo{
		height: 70px;
	}
	.photo img{
		height: 70px;
		width: 70px;
		border-radius: 35px;
	}
	.phone{
		height: 60px;
		line-height: 60px;
    color: #fff;
    font-size: 14px;
    font-weight: 900;
	}
	.jifen{
		color: #c7000a;
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
    font-size: 14px;
	}
	.orderPanel{
		    background-color: #fbdcbd;
    width: 98%;
    padding: 5px 1% 15px;
    margin: auto;
    border-radius: 3px;
    color: #333;
    margin-bottom: 60px;
	}
	.allOrder{
		height: 90px;
		text-align: center;
	}
	.allOrder div{
		width: 25%;
		float: left;
		height: 80px;
		font-size: 12px;
    color: #666;
    padding-top: 15px;
    box-sizing: border-box;
	}
	.allOrder div p{
		margin-top: 5px;
	}
	.box-panel{
		margin-top: 10px;
		background: #fff;
		border-radius: 3px;
	}
	.box-panel>.allOrder>div{
		border-right: 1px solid #eee;
		box-sizing: border-box;
		height: 90px;
	}
	.connect{
		    background-color: #fff;
    width: 98%;
    padding: 0 1%;
    margin: 10px auto;
    border-radius: 3px;
    color: #333;
    font-size: 14px;
    text-align: center;
    height: 45px;
    line-height: 45px;
	}
</style>