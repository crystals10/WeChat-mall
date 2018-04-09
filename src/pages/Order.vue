<template>
	<section style="color: #999;">
		<!--<mt-header title="永沁福利" style="background: #c7000a;height: 45px;font-size: 18px;" fixed>
			<router-link to="/mine" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>-->
		<div class="container">
			<div class="allOrder">
				<div :class="{ 'clickred': -1 == selectbg }" @click="selOrder(-1)">
					<!-- <icon name="list-alt" style="color: inherit;" scale="2"></icon> -->
					<p style="color: inherit;">全部</p>
				</div>
				<div :class="{ 'clickred': 0 == selectbg }" @click="selOrder(0)">
					<!-- <icon name="hourglass-start" scale="2"></icon> -->
					<p>待配送</p>
				</div>
				<div :class="{ 'clickred': 1 == selectbg }" @click="selOrder(1)">
					<!-- <icon name="truck" scale="2"></icon> -->
					<p>配送中</p>
				</div>
				<div :class="{ 'clickred': 2 == selectbg }" @click="selOrder(2)">
					<!-- <icon name="creative-commons" scale="2"></icon> -->
					<p>已送达</p>
				</div>
				<div :class="{ 'clickred': 3 == selectbg }" @click="selOrder(3)">
					<!-- <icon name="history" scale="2"></icon> -->
					<p>退换货</p>
				</div>
			</div>
				<!--<div class="goodsList" v-for="item in orderInfoList">
		<div class="panel-header">
			<span>订单编号：{{item.orderInfo.orderSn}}</span>
			<span class="state">已取消</span>
		</div>
		
		<div class="proInfo" v-for="productItem in item.productList">
			<div class="img">
				<img :src="item.productList.productPhoto" alt="" />
			</div>
			<div class="partRight">
				<div class="proTitle">{{productItem.goodsName}}</div>
				<div class="border-bottom"><span class="price">￥{{productItem.goodsPrice}}</span><span class="num">*{{productItem.goodsNumber}}</span></div>
			</div>
		</div>
		
	</div>-->
				<!--内容区域-->
				<div style="height: 100vh;overflow-y: scroll;-webkit-overflow-scrolling : touch;position: fixed;top: 0;left: 0;box-sizing: border-box;width: 100%;z-index: -1;padding: 80px 0 0;background:#cccc">
					<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
						<li v-for="(item,index) in orderInfoList" :key="index" style="margin-bottom: 10px;background: #fff;padding: 0 10px;" @click="skipOrderDetail(item.orderinfoId)">
							<div class="panel-header">
			<span>订单编号：{{item.orderSn}}</span>
			<span class="state">{{orderInfoState[item.orderState]}}</span>
		</div>
		
		<div class="proInfo" v-for="orderItem in item.orderPart">
			<div  v-for="productItem in orderItem.orderGoods">
			<div class="img">
				<img :src="productItem.producePhoto" alt="" />
			</div>
			<div class="partRight">
				<div class="proTitle">{{productItem.goodsName}}</div>
				<div class="border-bottom"><span class="price">￥{{productItem.goodsPrice|formatMoney}}</span><span class="num">*{{productItem.goodsNumber}}</span></div>
			</div>
			</div>
		</div>
		<div class="opOrder" v-if="item.orderState==0">
			<span>待支付：￥{{item.orderAmount|formatMoney}}</span>
			<mt-button type="danger" size="small" style="float: right; height: 30px; margin-top: 5px;margin-left: 5px;" @click="payOrder(this.event,item.orderSn,item.orderAmount)">立即支付</mt-button>
			<mt-button type="danger" size="small"  style="float: right; height: 30px; margin-top: 5px;"  @click="cancelOrderInfo(this.event,item.orderSn)">取消订单</mt-button>
		</div>
		<div class="opOrder" v-else-if="item.orderState==1">
			<span>订单金额：￥{{item.orderAmount|formatMoney}}</span>
			<mt-button type="danger" size="small"  style="float: right; height: 30px; margin-top: 5px;" @click="cancelOrderInfo(this.event,item.orderSn)">取消订单</mt-button>
		</div>
		<div class="opOrder" v-else-if="item.orderState==2">
			<span >订单金额：￥{{item.orderAmount|formatMoney}}</span>
		</div>
		<div class="opOrder" v-else>
			<span >订单金额：￥139</span>
		</div>
		<div v-else></div>
						</li>
					</ul>
					<div class="noneMore" ref="noneMore">已无更多订单</div>
					<div class="loadMore" ref="loadMore"><mt-spinner type="fading-circle"></mt-spinner></div>

				</div>

			<!--<div class="loading">无更多订单</div>-->
		</div>
	</section>
</template>

<script>
	// import { OrderList ,ipAddr,cancelOrder,Orderinfo} from "../js/api"
	import { Indicator ,Toast,MessageBox } from 'mint-ui';
	export default {
		name: 'Order',
		data() {
			return {
				selectbg: -1,
				orderInfoList: [{
					"AgencyName": "客户自助下单",
					"invType": "",
					"consignee": "鲁钺锋",
					"address": "浙江省宁波市余姚就不告诉你",
					"shippingName": "永沁专递",
					"orderSn": "1111111",
					"orderState":16,
					"orderPart": [{
						"partId": 3228,
						"orderGoods": [{
							"orderGoodsId": 6016,
							"goodsAttr": "",
							"marketPrice": 139.00,
							"skuList": [{
								"stockingUnit": "1块",
								"productionDate": "2016-11-02",
								"name": "乌拉圭牛腱子1.6-1.8kg/块"
							}],
						"producePhoto": "http://www.taiibao.com/upload/177/b4f/577016229836f576b4b5b5cc33_247488_800x800.jpg",
						"goodsNumber": 1.00,
						"goodsPrice": 139.00,
						"goodsName": "乌拉圭原装进口牛腱子 (1.6-1.8KG/块)"
						}]
					}]
				}],
				orderSearch: {
					/*orderState: "", //订单状态（不能与配送状态同时传）
					userId:"",
					adminId:"",
					orderFrom: "", //订单来源
					startTime: "", //订单生成时间  开始时间	（必须是2017-05-06的格式）
					endTime: "", //订单生成时间  结束时间（必须是2017-05-06的格式）
					oField:"",	//具体搜索条件
					oVal:"",		//oField的 value值
					pField:"",	// 收货时间的条件
 					pVal:""	,	//pField的value值
 					partState:"",//子订单状态
//					realname: "", //买主
//					consignee: "", //收货人
					deliveryState: "" ,//配送状态     -1,全部;0代配送;1配送中;2已送达;3退换货
					payBillWay:"",	//收款方式
					houseId:"",	//库房
					onlinePay:"" //支付金额*/
					orderAmountState:"0", 
					deliveryState:"-1",	 //订单配送状态
					// -1,全部;0待配送;1配送中;2已送达;3退换货
					userId:"",
					 adminId:"",
					orderFrom:"",	//订单来源
					orderState:[],	//订单状态
					partState:"",	//子订单状态
					payBillWay:"",	//收款方式
					houseId:"",	//库房
					startTime:"",	//搜索的开始时间
					endTime:"",	//搜索的结束时间
					oField:"",	//具体搜索条件
					oVal:"",		//oField的 value值
					pField:"",	// 收货时间的条件
					pVal:""	,	//pField的value值
					onlinePay:"" ,//支付金额
					timeField:"", //日期筛选条件
					timeValS:"",		//小的时间
 					timeValB:"",		//大的时间
 					invNeed:""	,//开发票 0--不需要 1--需要开发票  2--已开发票
   					bField: "all",	//all--所有订单，now--最近两天，bew---需要称重
   					goodsState:""
				},
				pagesInfo: {
					start: 0,
					pageSize: 5
				},
				// ip_Addr: ipAddr,
				loading:false,
				orderInfoState:{
					"0":"未确认",
					"1":"已确认",
					"2":"已取消",
					"3":"无效",
					"4":"退货",
					"5":"已分单",
					"10":"已备货",
					"11":"打印送货单",
					"12":"发货中",
					"13":"送达",
					"14":"全退",
					"15":"部分退货",
					"16":"已完成",
					"17":"退货待入库",
					"20":"拼团中",
					"100":"欠款",
					"101":"退款审核中",
					"112":"库房审核中",
				}
				
			}
		},
		methods: {
			selOrder: function(index) {
				// history.replaceState(null, "我的", location.pathname + "#/mine");
				// this.$router.push({
				// 	path:"order",
				// 	query:{
				// 		state:index
				// 	}
				// });
				
				// this.$refs.noneMore.style.display="none";
				// this.selectbg = index;
				// this.getOrderInfo(true);
			},
			getOrderInfo(catType) {
// 				if(catType) {
// 					this.orderInfoList=[];
// 					this.pagesInfo.start=0;
// 					Indicator.open({
// 						text: '加载中...',
// 						spinnerType: 'fading-circle'
// 					});
					
// 				}
// 				this.orderSearch.deliveryState = this.selectbg;
// 				this.orderSearch.userId=this.$store.state.wx_user_info.user.id;
// 				let info = Object.assign({}, this.$store.state.generalInfo);
// 				info = Object.assign(info, this.pagesInfo);
// 				info.search = this.orderSearch;
// 				console.log(JSON.stringify(info));
// 				OrderList(info).then(data => {
// 					let {
// 						errCode,
// 						errMsg,
// 						orderInfoList,
// 						orderCount
// 					} = data;
// 					if(errCode != 0) {
// 						console.log(errCode);
// 						Toast({
// 							message: errMsg,
// 							position: 'middle',
// 							duration: 2000
// 						});
// 						Indicator.close();
// 					} else {
// 						console.log("订单数据",data);
// 						Indicator.close();
// 						this.orderInfoList = [...this.orderInfoList,...orderInfoList];
// 						console.log(this.orderInfoList)
// 						if(orderCount <= this.pagesInfo.pageSize) {
// 								this.loading = true;
// //								this.controlNoneMore = true;
// 								this.$refs.noneMore.style.display="block";
// 							} else {
// 								this.loading = false;
// //								this.controlNoneMore = false;
// 								this.$refs.loadMore.style.display="block";
// 							}
// 							if((this.pagesInfo.start + this.pagesInfo.pageSize) >= orderCount) {
// 								this.loading = true;
// //								this.controlNoneMore = false;
// 								this.$refs.noneMore.style.display="block";
// 								this.$refs.loadMore.style.display="none";
// 					}
						
						
						
// 					}
// 				});
			},
			loadMore() {
				// this.$refs.loadMore.style.display="block";
				// setTimeout(() => {
				// 	this.pagesInfo.start += this.pagesInfo.pageSize;
				// 	this.getOrderInfo(false);
				// }, 200);
			},
			//取消订单
			cancelOrderInfo(event,orderNum){
				event.cancelBubble = true;
				MessageBox.confirm('确定取消该订单吗?').then(action => {
				// console.log(orderNum);
				// let info=Object.assign({},this.$store.state.generalInfo);
				// info.orderSn=orderNum;
				// info.returnPath="1";
				// console.log(JSON.stringify(info));
				// cancelOrder({orderInfo:info}).then(data => {
				// 	let {
				// 		errCode,
				// 		errMsg
				// 	} = data;
				// 	if(errCode != 0) {
				// 		Toast({
				// 			message: errMsg,
				// 			position: 'middle',
				// 			duration: 2000
				// 		});
				// 	} else {
				// 		Toast({
				// 			message: "订单已取消",
				// 			position: 'middle',
				// 			duration: 1000
				// 		});
				// 		this.getOrderInfo(true);
				// 	}
				// });
				});
			},
			//立即支付
			payOrder(event,orderNum,money){
				console.log("立即实付");
				 event.cancelBubble = true;
				 
				 this.$store.commit('set_wx_order', {
					orderSn:orderNum,
					totalFee:money
				});
				this.$router.push({
					path: '/submitOrder'
				});
			},
			//跳到订单详情
			skipOrderDetail(orderNum){
				this.$router.push({
					path:"/OrderDetail",
					query:{id:orderNum}
				});

			},
		},
		//过滤器
		filters: {
			formatMoney(val){
				if(typeof(val)=="number"){
					return val.toFixed(2);	
				}else{
					return val;
				}
			}
		},
		mounted() {
			// if(this.$route.query.state>=0) {
			// 	this.selectbg = this.$route.query.state;
			// 	this.orderSearch.deliveryState=this.$route.query.state;
			// }
			// console.log(this.$route.query.state);
			// this.getOrderInfo(true);
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		margin: 55px auto 0;
	}
	
	.allOrder {
		height: 75px;
		text-align: center;
		background: #fff;
		border-radius: 3px;
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 1;
	}
	
	.allOrder div {
		width: 20%;
		float: left;
		height: 60px;
		font-size: 12px;
		color: #666;
		padding-top: 15px;
		box-sizing: border-box;
	}
	
	.loading {
		margin: 20px 0;
		text-align: center;
		line-height: 40px;
		background-color: #fff;
		font-size: 16px;
	}
	
	.goodsList {
		background-color: #fff;
		border-radius: 3px;
		margin: 10px auto;
		padding: 10px 1%;
	}
	
	.state {
		float: right;
		color: #c7000a;
		;
	}
	
	.proInfo {
		margin-top: 5px;
		border-top: 1px solid #e8e8e8;
	}
	
	.proInfo>div{
		border-bottom: 1px solid #e8e8e8;
	}
	.proInfo>div:last-child{
		/*border-bottom:none;*/
	}
	
	
	
	
	.proInfo .img {
		height: 90px;
		width: 80px;
		float: left;
	}
	
	.proInfo .img img {
		margin-top: 5px;
		height: 80px;
		width: 80px;
	}
	
	.partRight {
		width: 100%;
		padding-left: 85px;
		height: 90px;
		box-sizing: border-box;
	}
	
	.proTitle {
		max-height: 45px;
		overflow: hidden;
		vertical-align: middle;
		line-height: 18px;
		font-size: 14px;
		padding: 5px 0;
	}
	
	.border-bottom {
		height: 30px;
		line-height: 30px;
	}
	
	
	.num {
		float: right;
	}
	
	.allOrder .clickred {
		color: #ab0923;
	}
	.noneMore{
		margin: 10px auto 50px;
		width: 100%;
		text-align: center;
		line-height: 40px;
		background-color: #fcfcfc;
		font-size: 18px;
		height: 40px;
		float: left;
		bottom: 0;
		display: none;
	}
 .loadMore{
		/*margin: 10px auto 0px;*/
		padding-top: 10px;
		width: 100%;
		text-align: center;
		line-height: 40px;
		background-color: #fcfcfc;
		font-size: 18px;
		height: 40px;
		/*float: left;*/
		bottom: 0;
		display: none;
	}
		.loadMore span{
		display: inline-block;
	}
	.panel-header{
		height: 30px;
		line-height: 30px;
	}
	.opOrder{
		height: 40px;
		line-height: 40px;
	}
</style>