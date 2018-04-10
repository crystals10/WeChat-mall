<template>
	<section class="confirmOrder" style="background:#f1f1f1;">
		<mt-header title="确认订单" fixed style="height: 45px;background: #c7000a;font-size: 18px;    font-weight: 400;">
			<router-link to="/shoppingcar" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>

		<div class="content" style="margin-top:45px;">
			<div class="content-item" v-if="virOrder.AddressInfo.addresId!=''">
				<mt-cell title="收货地址">
					<span @click="skipAddr">更多地址<div class="svgDiv"><!-- <icon name="angle-right"  scale="1.2"></icon> --></div></span>
				</mt-cell>
				<div class="address">
					<div class="addrInfo">
						<div class="addr">
							<div>
								<!-- <icon name="user-o" scale="1"></icon> -->
							</div>
							<div>{{virOrder.AddressInfo.consignee}}</div>
						</div>
						<div class="addr">
							<div>
								<!-- <icon name="mobile-phone" scale="1.5"></icon> -->
							</div>
							<div>{{virOrder.AddressInfo.mobile}}</div>
						</div>
					</div>
					<div class="addr" >
						<div>
							<!-- <icon name="map-marker" scale="1.2"></icon> -->
						</div>
						<div style="padding:15px 0 10px 0;">{{virOrder.AddressInfo.addres}}</div>
					</div>

				</div>

			</div>
			<div class="noAddr" v-else @click="skipAddr">
				+请选择收货方式
			</div>
			<div class="content-item">
				<mt-cell title="商品清单">
					<span class="pruductNum" @click="productListShow">共{{virOrder.productCount}}件<div class="svgDiv"><!-- <icon name="angle-right"  scale="1.2"></icon> --></div></span>
				</mt-cell>
				<div class="productsImg">
					<img v-for="item in virOrder.productList" :src="item.productPhoto" :class="virOrder.Nodelivery.indexOf(item.productId)>-1?'gray':''" />
					<span style="float:right;font-size:14px;" v-for="item in virOrder.productList">{{item.productName}}</span>
				</div>
				<div style="color: red;font-size: 12px;height: 20px;" v-if="virOrder.Nodelivery.length>0">&nbsp;&nbsp;该商品清单中有{{overNum}}件商品在该地区暂时无货!</div>
			</div>
			<div class="content-item">
				<mt-cell title="备注"></mt-cell>
				<mt-field placeholder="备注不要超过50个字" type="textarea" rows="2" v-modal="submitOrder.remarks"></mt-field>
			</div>

			<div class="content-item">
				<!--<mt-cell title="优惠券" to="//github.com" is-link>
				</mt-cell>-->
				<!-- <mt-cell title="账户积分">
					<div style="width: 150px;">
						<mt-switch style="float: right;" v-model="submitOrder.balancePaystate" @change="countjifen" :disabled="virOrder.productPrice>=virOrder.totalFell"></mt-switch>
						<span style="float: right;line-height: 32px;margin-right: 20px;">￥{{virOrder.totalFell.toFixed(2)}}</span>
					</div>
				</mt-cell> -->
			</div>
			<div class="content-item">
				<mt-cell title="费用明细"></mt-cell>
				<div class="payList">
					<div>
						商品总额
						<span style="float: right">￥{{virOrder.productPrice.toFixed(2)}}</span>
					</div>
					<!-- <div  v-if="virOrder.shippingFee">
						运费
						<span style="float: right">￥{{virOrder.shippingFee.toFixed(2)}}</span>
					</div> -->
				<!--<mt-cell title="商品总额">
					<span>￥{{virOrder.productPrice.toFixed(2)}}</span>
				</mt-cell>
				<mt-cell title="运费" v-if="virOrder.shippingFee">
					<span>￥<span v-html="virOrder.shippingFee"></span></span>
				</mt-cell>-->
				</div>

				<!-- <div v-if="virOrder.shippingFee" class="freeShippingTip"><span>再买￥{{virOrder.differencePrice.toFixed(2)}}元免运费</span></div> -->
			</div>
			<div class="need-content">
				<span class="needMoney">待支付：￥{{virOrder.price.toFixed(2)}}<!-- (<span v-html="virOrder.shippingFee?'包含运费￥'+virOrder.shippingFee:'已免运费'"></span>) --></span>
				<mt-button type="danger" size="small" @click="submitOrderTo">提交</mt-button>
			</div>

		</div>

		<div class="productListMB" ref="productListMB">
			<mt-header title="商品清单" fixed style="height: 45px;background: #c7000a;font-size: 18px; font-weight: 400;">
				<div slot="left">
					<mt-button @click="backVirOrder" icon="back"></mt-button>
				</div>
			</mt-header>
			<div class="listContent">
				<div class="productItem" v-for="item in virOrder.productList">
					<img :src="item.productPhoto" alt="" :class="virOrder.Nodelivery.indexOf(item.productId)>-1?'gray':''" />
					<div class="item-right">
						<div class="item-title">{{item.productName}}</div>
						<div style="color: red;font-size: 12px;height: 20px;"><span v-if="virOrder.Nodelivery.indexOf(item.productId)>-1">抱歉，此商品在该地区暂时无货!</span></div>
						<div class="item-info">
							<span class="item-price">￥:{{item.memberPrice}}</span>
							<span class="item-num">*{{item.productNum}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="payMB" ref="payMB">
			<mt-header title="支付" fixed style="height: 45px;background: #c7000a;font-size: 18px; font-weight: 400;">
				<div slot="left">
					<mt-button @click="tobackVirOrder" icon="back"></mt-button>
				</div>
			</mt-header>
			<div class="content" style="width: 100%;">
				<div class="money-tip">请支付￥{{virOrder.price}}(<span v-html="virOrder.shippingFee?'包含运费￥'+virOrder.shippingFee:'已免运费'"></span>)</div>
				<div>
					<div style="height: 40px;line-height: 40px;padding-left: 10px;">在线支付</div>
					<div @click="skipZFB">
						<mt-cell title="支付宝支付">
							<div class="svgDiv">
								<!-- <icon name="angle-right" scale="1.2"></icon> -->
							</div>
							<!-- <img slot="icon" src="../assets/images/ali-icon.png" width="40" height="26"> -->
						</mt-cell>
					</div>
					<div @click="skipWX">
						<mt-cell title="微信">
							<div class="svgDiv">
								<!-- <icon name="angle-right" scale="1.2"></icon> -->
							</div>
							<!-- <img slot="icon" src="../assets/images/wx.png" width="25" height="26" style="margin:0 7.5px;"> -->
						</mt-cell>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<script>
	// import { addFalseOrder, ipAddr, addOrder, domainName, appID } from "../js/api"
	// import { ls } from "../js/LStorage"
	import { Toast, Switch, Indicator } from 'mint-ui';
	export default {
		name: 'ConfirmOrder',
		data() {
			return {
				localData: "",
				virOrder:  {
		"totalFell": 0.00,
		"Nodelivery": [],
		"shippingFee": 0.01,
		"differencePrice": 154.99,
		"price": 145.01,
		"Delivery": [1147],
		"productCount": 1,
		"productPrice": 145.00,
		"productList": [{
			"productPhoto": "http://www.taiibao.com/upload/199/8ca/871a6095bab7f64adba86cd089_468444_800x800.jpg",
			"productId": 1147,
			"memberPrice": 145.00,
			"productNum": 1,
			"productName": "丹东红颜草莓礼盒装 36颗 单果30-40g 1200g"
		}],
		"AddressInfo": {
			"addresId": 2905,
			"consignee": "鲁钺锋",
			"mobile": "17826804660",
			"addres": " 浙江省杭州市西湖 东部软件园3104"
		}
	},
				// ip_Addr: ipAddr,
				urlOrder: '',
				submitOrder: {
					remarks: "",
					balancePaystate: "",
					addresId: ""
				},
				// domainName: domainName,
				// appID: appID,
				countJF: false,
				overNum: 0
			}
		},
		methods: {
			productListShow() {
				this.$refs.productListMB.style.display = "block";
				console.log(this.$refs.productListMB);
			},
			submitOrderTo() {
				if(this.virOrder.AddressInfo.addresId == "") {
					Toast({
						message: "请选择收货地址",
						position: 'middle',
						duration: 1000
					});
				} else {
					if(this.submitOrder.balancePaystate == 1) {
						this.zhifuMain();
					} else {
						this.$refs.payMB.style.display = "block";
					}

				}

			},
			backVirOrder() {
				this.$refs.productListMB.style.display = "none";
			},
			tobackVirOrder() {
				this.$refs.payMB.style.display = "none";
			},
			skipAddr() {
				localStorage.setItem("wxlocalaccess-order", JSON.stringify(this.urlOrder));
				this.$router.push({
					path: "/addressManage",
					query: {
						vir: 1
					}
				});
			},
			countjifen: function(checked) {
				if(checked) {
					this.submitOrder.balancePaystate = 0;
				} else {
					this.submitOrder.balancePaystate = 1;
				}
			},
			skipZFB() {
				this.submitOrder.payBillWay = "支付宝";
				this.zhifuMain();
			},
			skipWX() {
				this.submitOrder.payBillWay = "微信";
				this.zhifuMain();
			},
			zhifuMain() {
				let info = Object.assign({}, this.$store.state.generalInfo);
				this.submitOrder.orderFromName="永沁";
				this.submitOrder.userId=this.$store.state.wx_user_info.user.id;
				this.submitOrder.setId=this.$store.state.wx_user_info.defaultGroupInfo.setId;
				info.orderInfo = this.submitOrder;
				console.log("订单提交数据",JSON.stringify(info));
// 				addOrder(info).then(data => {
// 					let {
// 						errCode,
// 						errMsg,
// 						orderInfo
// 					} = data;
// 					if(errCode != 0) {
// 						Toast({
// 							message: errMsg,
// 							position: 'middle',
// 							duration: 1000
// 						});
// 					} else {
// 						this.$store.commit('set_wx_order', orderInfo);
// 						this.$router.push({
// 							path: '/submitOrder'
// 						});
						
// //						let skipUtl = this.domainName + "/#/submitOrder";
// //						skipUtl = encodeURIComponent(skipUtl);
// //						let baseHref = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + this.appID + "&redirect_uri=" + skipUtl + "&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
// //						window.location.href = baseHref;
// 					}
// 				});
			}
		},
		mounted() {
			// this.localData = ls.getItem("wx_user_info");
			// let urlOrder = this.$route.query;
			// if(this.$route.query.virOrder) {
			// 	Indicator.open({
			// 		text: '加载中...',
			// 		spinnerType: 'fading-circle'
			// 	});
			// 	let order = Object.assign({}, this.$store.state.generalInfo);
			// 	let falseOrderInfo = Object.assign({}, JSON.parse(this.$route.query.virOrder));
			// 	falseOrderInfo.userId = this.localData.user.id;
			// 	falseOrderInfo.setId = this.localData.defaultGroupInfo.setId;
			// 	order.falseOrderInfo = falseOrderInfo;

			// 	this.submitOrder.shippingname = 0;
			// 	this.submitOrder.balancePaystate = 0;

			// 	console.log(JSON.stringify(falseOrderInfo));
			// 	addFalseOrder(order).then(data => {
			// 		let {
			// 			errCode,
			// 			errMsg,
			// 			FalseOrder
			// 		} = data;
			// 		if(errCode != 0) {
			// 			console.log(errCode);
			// 			Indicator.close();
			// 			Toast({
			// 				message: errCode,
			// 				position: 'middle',
			// 				duration: 2000
			// 			});
			// 		} else {
			// 			this.virOrder = FalseOrder;
			// 			console.log('FalseOrder', FalseOrder);
			// 			this.urlOrder = order.falseOrderInfo;
			// 			this.submitOrder.goods = [];
			// 			this.submitOrder.addresId = FalseOrder.AddressInfo.addresId;
			// 			for(var val of FalseOrder.productList) {
			// 				if(FalseOrder.Nodelivery.indexOf(val.productId) > -1) {
			// 					this.overNum += parseInt(val.productNum);
			// 				}
			// 				if(FalseOrder.Delivery.indexOf(val.productId) > -1) {
			// 					this.submitOrder.goods.push({
			// 						goodsId: val.productId,
			// 						goodsNum: val.productNum
			// 					});
			// 				}
			// 			}
			// 			Indicator.close();

			// 		}
			// 	});
			// }

		}
	}
</script>

<style scoped>
	.confirmOrder .content {
		width: 100%;
		margin: 0 auto 50px;
	}
	
	.content-item {
		padding-bottom: 10px;
	}
	
	.address {
		padding: 0 10px;
		background: #fff;
		/*border-top: 1px solid #d9d9d9;*/
		background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
	    background-size: 120% 1px;
	    background-repeat: no-repeat;
	    background-origin: content-box;
	}
	
	.addrInfo .addr {
		width: 50%;
		float: left;
	}
	
	.addr div {
		display: inline-block;
		display: table-cell;
		vertical-align: middle;
		padding-right: 5px;
	}
	
	.addr div:nth-child(1) {
		padding-top: 5px;
	}
	.productsImg{
		background: #fff;
		background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-origin: content-box;
    padding: 0 10px;
		
	}
	.productsImg:after {
		content: "";
		clear: both;
		visibility: hidden;
		height: 0;
	}
	
	.productsImg img {
		height: 60px;
		width: 60px;
		margin-right: 5px;
		margin-bottom: 5px;
		margin-top: 5px;
	}
	
	.need-content {
		height: 50px;
		padding: 0 10px;
		position: fixed;
		bottom: 0;
		left: 0;
		line-height: 50px;
		width: 100%;
		background: #fff;
	}
	
	.need-content button {
		width: 80px;
		height: 40px;
		float: right;
		margin-right: 20px;
		margin-top: 5px;
	}
	
	.needMoney {
		font-size: 12px;
		color: red;
	}
	
	.freeShippingTip {
		height: 22px;
		padding: 0 10px;
	}
	
	.freeShippingTip:after {
		content: "";
		clear: both;
		visibility: hidden;
		height: 0;
	}
	
	.freeShippingTip span {
		line-height: 22px;
		font-size: 12px;
		color: red;
		float: right;
	}
	
	.pruductNum {
		display: inline-block;
		height: 48px;
		font-size: 14px;
	}
	
	.svgDiv {
		display: table-cell;
		vertical-align: middle;
		display: inline-block;
		height: 48px;
		padding-left: 10px;
	}
	
	.svgDiv svg {
		height: 43px;
	}
	
	.productListMB {
		position: fixed;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		background: #fff;
		z-index: 10;
		display: none;
		overflow-y: scroll;
	}
	
	.payMB {
		position: fixed;
		height: 100%;
		width: 100%;
		top: 0;
		left: 0;
		background: #fff;
		z-index: 10;
		display: none;
	}
	
	.productItem {
		width: 100%;
		height: 110px;
		background-color: #fff;
		padding: 17px 15px 0 10px;
		margin-top: 10px;
		box-sizing: border-box;
		border-bottom: 1px solid #d9d9d9;
	}
	
	.productItem img {
		height: 80px;
		width: 80px;
		float: left;
		margin-right: 10px;
	}
	
	.productItem .item-title {
		font-size: 14px;
		color: #666;
		line-height: 20px;
		height: 40px;
		overflow: hidden;
	}
	
	.item-info .item-price {
		float: left;
	}
	
	.item-info .item-num {
		float: right;
	}
	
	.money-tip {
		height: 40px;
		width: 100%;
		background-color: #ffdba0;
		color: #ff364f;
		font-size: 18px;
		line-height: 40px;
		padding: 0 20px;
		box-sizing: border-box;
	}
	
	.noAddr {
		height: 80px;
		line-height: 80px;
		font-size: 18px;
		text-align: center;
		background-color: #ffdba0;
		color: #c7000a;
	}
	
	.gray {
		-webkit-filter: grayscale(100%);
		-moz-filter: grayscale(100%);
		-ms-filter: grayscale(100%);
		-o-filter: grayscale(100%);
		filter: grayscale(100%);
		filter: gray;
	}
	.listContent{
		margin-top: 45px;
	}
	.payList{
		padding: 0 10px;
		background: #fff;
		background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
    background-size: 120% 1px;
    background-repeat: no-repeat;
    background-origin: content-box;
	}
	.payList>div{
		padding: 5px 0;
	}
</style>