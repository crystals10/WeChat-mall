<template>
	<section>
		<div ref="shoppingcar">
		<mt-header title="购物车" fixed style="height: 45px;    background: #c7000a;font-size: 18px;">
			<span slot="right">
				<mt-button  @click="delect1">
					<i class="iconfont icon-shanchu" style="font-size:24px;"></i>
				</mt-button>
			</span>
		</mt-header>

		<div style="padding-top: 45px;padding-bottom: 108px;box-sizing: border-box;height: 100vh;">
			<div style="height: 100%;width: 100%;overflow-y: scroll;-webkit-overflow-scrolling : touch;" ref="transScroll">
				<el-checkbox-group v-model="value" @change="selectProducts">
					<div v-for="(item,index) in productList" class="valid-product" :key="index">
						<el-checkbox :label="item.productCartId" :key="index" :disabled="item.GoodsMaxNum==0"></el-checkbox>
						<div>
							<img :src="item.ProductPhoto" :class="item.SKU==0?'gray':''" style="width: 80;height: 80px;float: left;" alt="" @click="$router.push({path:'/productdetail'})" />
							<div style="width: 100%;padding-left: 120px;height:92px;    box-sizing: border-box;">
								<div style="font-size: 14px;line-height: 20px;text-overflow: ellipsis;word-wrap: normal;overflow: hidden;color: #666; height: 20px;">
									{{item.ProductName}}
								</div>
								<div style="height: 35px;margin-top: 5px;">
									<div style="display: inline-block;float: left;height: 35px;line-height: 35px;"><span>￥</span><span>{{item.Price|formatMoney}}</span></div>
									<div class="opNum">
										<span @click="operateNum(0,index)">-</span><input type="text" v-model="item.GoodsNumber" ref="numRef" @input="addNumOp" @focus="focusNumOp(index)" @blur="blurNumOp(index)" /><span @click="operateNum(1,index)">+</span>
									</div>
								</div>
								<!-- <div style="color: red;font-size: 14px;" v-if="item.GoodsMaxNum<99&&item.GoodsMaxNum>0">库存剩余：{{item.GoodsMaxNum}}</div>
								<div style="color: red;font-size: 14px;" v-else-if="item.GoodsMaxNum==0">该商品暂时无货</div>
								<div style="font-size: 14px;" v-else>库存剩余：{{item.GoodsMaxNum}}</div> -->
							</div>
						</div>
					</div>
				</el-checkbox-group>
			</div>
		</div>
		<div class="total-content">

			<el-checkbox style="line-height:normal;" v-model="checkAll" @change="allSelect()"></el-checkbox><span style="margin:0 10px 0 5px;">全选</span>
			<span style="    color: #ab0923;">合计：{{allCount|formatMoney}}元</span>
			<router-link to="/confirmOrder">
				<mt-button type="danger" size="small" style="float: right;margin: 8px;" @click="doOrderInfo" :disabled="doOrderAbled">结算({{allNum}})</mt-button>
			</router-link>
			
		</div>
		<tabbar-select></tabbar-select>
		</div>
		
		
		<!--删除购物车部分-->
		<div class="productListMB" ref="productListMB">
			<mt-header title="删除商品" fixed style="height: 45px;background: #c7000a;font-size: 18px; font-weight: 400;-webkit-transform: translateZ(0);">
				<div slot="left">
					<mt-button @click="backVirOrder" icon="back"></mt-button>
				</div>
			</mt-header>
			
			<div class="selectcontent">
					<el-checkbox-group v-model="value" @change="selectProducts" style="font-size:16px;">
						<div v-for="(item,index) in productList" class="valid-product" :key="index">
							<el-checkbox :label="item.productCartId" :key="index"></el-checkbox>
							<div>
								<img :src="item.ProductPhoto" :class="item.SKU==0?'gray':''" style="width: 80;height: 80px;float: left;" alt="" />
								<div style="width: 100%;padding-left: 120px;height:92px;    box-sizing: border-box;">
									<div style="font-size: 14px;line-height: 20px;text-overflow: ellipsis;word-wrap: normal;overflow: hidden;color: #666; height: 20px;">
										{{item.ProductName}}
									</div>
									<div style="height: 35px;margin-top: 5px;">
										<div style="display: inline-block;float: left;height: 35px;line-height: 35px;"><span>￥</span><span>{{item.Price|formatMoney}}</span></div>
									</div>
								</div>
							</div>
						</div>
					</el-checkbox-group>
				</div>
			<div class="total-content" style="position: fixed;bottom: 0;left: 0;-webkit-transform: translateZ(0);">
					<div style="position: absolute;">
						<el-checkbox style="line-height:normal;" v-model="checkAll" @change="allSelect(false)"></el-checkbox><span style="margin:0 10px 0 5px;">全选</span>
					<mt-button type="danger" size="small" style="text-align:center;margin: 8px;width: 150px;float: right;" @click="doDelect" :disabled="doOrderAbled">删除</mt-button>
					</div>
				</div>
		</div>
		
	</section>
</template>
<script>
	// import { shoppingcarInfo, ipAddr, addFalseOrder, updateGoodsNum, batchDeleteCar } from "../js/api"
	import { Toast, Indicator } from 'mint-ui';
	import Tabbar from '@/components/Tabbar'
	// import { ls } from "../js/LStorage"
	export default {
		name: 'Shoppingcar',
		components: {
			'tabbar-select': Tabbar
		},
		data() {
			return {
				value: [],
				addNum: 1,
				localData: "",
				productList: [{
					"Subtitle": "",
					"ProductName": "新西兰易极优DIY酸奶MINI套装 （一台小酸奶机+5袋MINI酸奶粉）",
					"Price": 190.00,
					"ProductPhoto": "http://www.taiibao.com/upload/b4b/4c2/13467413e6b14101622c5f765a_48913_800x800.jpg",
					"SKU": 1000,
					"productCartId": 13827,
					"GoodsNumber": 1.00,
					"GoodsId": 103,
					"GoodsMaxNum": 99
				}, {
					"Subtitle": "纯净牧场 优选基因",
					"ProductName": "乌拉圭科拿全脂纯牛奶 1L/瓶",
					"Price": 12.00,
					"ProductPhoto": "http://www.taiibao.com/upload/344/076/f69a960f9d8df05ce922d4b7dd_66698_666x666.jpg",
					"SKU": 72,
					"productCartId": 13826,
					"GoodsNumber": 1.00,
					"GoodsId": 927,
					"GoodsMaxNum": 72
				}],
				// ip_Addr: ipAddr,
				allCount: 0,
				allNum: 0,
				allSelectData: [],
				doOrderAbled: true,
				allSelectDis: false,
				checkAll: false,
				checkedCities: [],

			}
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
		methods: {
			//			//选择全部商品
			allSelect() {   //true:购买 false:删除

				if(this.value.length === 0){
					console.log(111)
					for(var item of this.productList){
						this.value.push(item.productCartId);
					}
				}
				else{
					console.log(222)
					this.value = [];
				}
				
				//				console.log(this.allSelectData);
				// console.log(111,event)
				// if(event.target.checked) {
				// 	for(var item of this.productList) {
				// 		if(state){
				// 			if(item.SKU > 0  ) {
				// 			if(this.value.indexOf(item.productCartId) < 0) {
				// 				this.value.push(item.productCartId);
				// 			}
				// 		}
				// 		}else{
				// 			if(this.value.indexOf(item.productCartId) < 0) {
				// 				this.value.push(item.productCartId);
				// 			}
				// 		}
						
						
				// 	}
				// 	this.doOrderAbled = false;
				// } else {
				// 	this.value = [];
				// 	this.doOrderAbled = true;
				// }
				// 				this.value = event.target.checked ? this.value : [];
			},
			//			//选择单个商品
			selectProducts: function(value) {
				console.log(value);
				console.log(this.value);
				//				if(this.productList.length==this.value.length){
				//					this.allSelectData.push("全选");
				//					console.log(this.allSelectData);
				//				}else{
				//					this.allSelectData=[];
				//					this.doOrderAbled=true;
				//				}
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.productList.length;
				this.doOrderAbled = (value.length == 0);
				//				        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
				this.watchNum();
			},
			addNumOp(index, $this) {},
			//		//数量框失去焦点
			blurNumOp(index) {
				console.log("jiaodian", this.addNum);
				if(this.productList[index].GoodsNumber == '') {
					this.addNum = 1;
					this.opGoodsNum(this.productList[index].productCartId, 1, index);
				} else if((/^[0-9]*$/.test(this.productList[index].GoodsNumber))) {
					this.opGoodsNum(this.productList[index].productCartId, this.productList[index].GoodsNumber, index);
					console.log("对的");
				} else {
					console.log("错的");
					console.log(this.addNum);
					this.productList[index].GoodsNumber = this.addNum;
				}
				this.watchNum();
			},
			//		//数量框聚焦
			focusNumOp(index) {
				this.addNum = this.productList[index].GoodsNumber;
				console.log(this.addNum);
			},
			//		//数量加减按钮
			operateNum(op, index) {
				let num;
				if(op == 0) {
					num = this.productList[index].GoodsNumber;
					this.opGoodsNum(this.productList[index].productCartId, --num, index);
				} else if(op == 1) {
					num = this.productList[index].GoodsNumber;
					this.opGoodsNum(this.productList[index].productCartId, ++num, index);
				}
			},
			opGoodsNum(id, num, index) {
				// Indicator.open({
				// 	text: '加载中...',
				// 	spinnerType: 'fading-circle'
				// });
				// let good = {
				// 	productCartId: id,
				// 	goodsNum: num,
				// 	userId: this.$store.state.wx_user_info.user.id
				// }
				// let shoppingCar = Object.assign({}, this.$store.state.generalInfo);
				// shoppingCar.shoppingInfo = good;
				// console.log("修改购物车商品数量", JSON.stringify(shoppingCar));
				// updateGoodsNum(shoppingCar).then(data => {
				// 	let {
				// 		errCode,
				// 		errMsg,
				// 		goodsNum
				// 	} = data;
				// 	if(errCode != 0) {
				// 		Indicator.close();
				// 		Toast({
				// 			message: errCode,
				// 			position: 'middle',
				// 			duration: 2000
				// 		});
				// 	} else {
				// 		Indicator.close();
				// 		console.log(this.productList[index]);
				// 		this.productList[index].GoodsNumber = goodsNum;
				// 		this.watchNum();
				// 	}
				// });
			},
			watchNum() {
				// let itemsCount = 0;
				// let itemsNum = 0;
				// for(var item of this.productList) {
				// 	if(this.value.indexOf(item.productCartId) > -1) {
				// 		this.doOrderAbled = false;
				// 		itemsCount += parseInt(item.GoodsNumber) * parseFloat(item.Price);
				// 		itemsNum += parseInt(item.GoodsNumber);
				// 	}
				// }
				// this.allCount = itemsCount;
				// this.allNum = itemsNum;
			},
			doOrderInfo() {
				// if(this.value.length == 0) {
				// 	Toast({
				// 		message: "请勾选要购买的商品",
				// 		position: 'middle',
				// 		duration: 1000
				// 	});
				// } else {
				// 	let virtualOrder = {
				// 		goods: [],
				// 		username: this.$store.state.wx_user_info.user.username,
				// 		addresId: 0
				// 	};
				// 	for(var item of this.productList) {
				// 		if(this.value.indexOf(item.productCartId) > -1) {
				// 			virtualOrder.goods.push({
				// 				goodsId: item.GoodsId,
				// 				goodsNum: item.GoodsNumber
				// 			});
				// 		}
				// 	}
				// 	this.$router.push({
				// 		path: "/confirmOrder",
				// 		query: {
				// 			virOrder: JSON.stringify(virtualOrder)
				// 		}
				// 	});
				// }

			},
			//删除按钮
			delect1() {
				this.checkAll = false;
				this.allSelectData = [];
				this.doOrderAbled = true;
				this.$refs.transScroll.style.overflowY = "hidden";
				this.$refs.shoppingcar.style.display="none"
				this.productListShow();
			},
			productListShow() {
				this.value = [];
				this.$refs.productListMB.style.display = "block";

			},
			backVirOrder() {
				this.checkAll = false;
				this.doOrderAbled = true;
				this.value = [];
				this.$refs.shoppingcar.style.display="block"
				this.$refs.transScroll.style.overflowY = "scroll";
				this.$refs.productListMB.style.display = "none";
				this.getShoppingcar();
			},
			doDelect() {
				// let info = Object.assign({}, this.$store.state.generalInfo);;
				// var cartJson = {
				// 	productCartIds: this.value,
				// 	userId: this.$store.state.wx_user_info.user.id
				// };
				// info.cartJson = cartJson;
				// console.log("删除购物车中商品提交的数据", JSON.stringify(info));
				// batchDeleteCar(info).then(data => {
				// 	let {
				// 		errCode,
				// 		errMsg
				// 	} = data;
				// 	if(errCode != 0) {
				// 		Toast({
				// 			message: errCode,
				// 			position: 'middle',
				// 			duration: 1000
				// 		});
				// 	} else {
				// 		Toast({
				// 			message: "删除成功",
				// 			position: 'middle',
				// 			duration: 1000
				// 		});
				// 		this.checkAll=false;
				// 		this.allSelectData = [];
				// 		this.getShoppingcar();
				// 	}
				// });
			},
			getShoppingcar() {
				// Indicator.open({
				// 	text: '加载中...',
				// 	spinnerType: 'fading-circle'
				// });
				// let getInfo = Object.assign({}, this.$store.state.generalInfo);;
				// let search = {};
				// search.userId = this.$store.state.wx_user_info.user.id;
				// search.setId = this.$store.state.setId.setId;
				// getInfo.search = search;
				// console.log("查询购物车输入条件", getInfo);
				// shoppingcarInfo(getInfo).then(data => {
				// 	let {
				// 		errCode,
				// 		errMsg,
				// 		shoppingcarList
				// 	} = data;
				// 	if(errCode != 0) {
				// 		Indicator.close();
				// 		Toast({
				// 			message: errCode,
				// 			position: 'middle',
				// 			duration: 2000
				// 		});
				// 	} else {
				// 		Indicator.close();
				// 		console.log(shoppingcarList);
				// 		if(shoppingcarList.length == 0) {
				// 			this.allSelectDis = true;
				// 		}
				// 		this.productList = shoppingcarList;
				// 	}
				// });
			},
			handleCheckAllChange(event) {
				this.checkedCities = event.target.checked ? cityOptions : [];
				this.isIndeterminate = false;
			},
			handleCheckedCitiesChange(value) {
				let checkedCount = value.length;
				this.checkAll = checkedCount === this.cities.length;
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
			}
		},
		watch: {
			value: function() {

				let itemsCount = 0;
				let itemsNum = 0;
				for(var item of this.productList) {
					if(this.value.indexOf(item.productCartId) > -1) {
						itemsCount += parseInt(item.GoodsNumber) * parseInt(item.Price);
						itemsNum += parseInt(item.GoodsNumber);
					}
				}
				this.allCount = itemsCount;
				this.allNum = itemsNum;
			},
			productList: function() {
				console.log(1);
			},

		},
		mounted() {
			this.getShoppingcar();
			//			if(ls.getItem("wxlocalaccess-user")){
			//				this.localData=JSON.parse(localStorage.getItem("wxlocalaccess-user"));
			//				
			//			}else{
			//				this.$router.push({
			//					path:"/login"
			//				});
			//			}
		},
	}
</script>

<style>
	.valid-product {
		padding: 10px 5px 15px;
		background: #fff;
		border-bottom: 1px solid #e8e8e8;
		width: 100%;
		display: block;
		box-sizing: border-box;
	}
	
	.mint-header.is-fixed {
		z-index: 2;
	}
	
	.mint-checklist-title {
		display: none;
	}
	
	.valid-product .mint-cell:last-child,
	.mint-cell-wrapper {
		background-size: 100% 0px;
	}
	
	.valid-product .mint-checklist {
		width: 30px;
	}
	
	.valid-product .mint-cell-wrapper {
		padding: 0;
	}
	
	.valid-product .mint-checklist-label {
		padding: 0;
		line-height: 80px;
		height: 80px;
		width: 30px;
		text-align: center;
	}
	
	.opNum {
		display: inline-block;
		float: right;
	}
	
	.opNum span {
		float: left;
		display: inline-block;
		height: 30px;
		width: 30px;
		text-align: center;
		line-height: 30px;
		border: 1px solid #e8e8e8;
	}
	
	.opNum input {
		float: left;
		width: 25px;
		height: 30px;
		outline: none;
		text-align: center;
		border: 0;
		border-top: 1px solid #e8e8e8;
		border-bottom: 1px solid #e8e8e8;
		box-shadow: none;
		-webkit-appearance: none;
		border-radius: 0;
	}
	
	.total-content {
		height: 48px;
		position: fixed;
		bottom: 59px;
		width: 100%;
		/*border-bottom: 1px solid #c7000a;*/
		line-height: 48px;
		/*text-align: center;*/
		background: #fff;
		padding: 0 10px;
		box-sizing: border-box;
		z-index: 2;
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
		
	}
	
	.selectcontent {
		height: 100vh;
		width: 100%;
		padding: 45px 0 48px;
		overflow-y: scroll;
		-webkit-overflow-scrolling : touch;
		box-sizing: border-box;
	}
	
	.productItem {
		width: 100%;
		height: 110px;
		background-color: #fff;
		padding: 17px 15px 0 10px;
		margin-top: 10px;
		box-sizing: border-box;
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
		/*margin-bottom: 20px;*/
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
	
	.gray {
		-webkit-filter: grayscale(100%);
		-moz-filter: grayscale(100%);
		-ms-filter: grayscale(100%);
		-o-filter: grayscale(100%);
		filter: grayscale(100%);
		filter: gray;
	}
	
	.valid-product .mint-cell-wrapper {
		border: 0;
	}
	
	.valid-product .el-checkbox {
		float: left;
		/*line-height: 92px;*/
		top: 34.5px;
		margin-right: 10px;
	}
	
	.valid-product .el-checkbox__label {
		display: none;
	}
	
	.el-checkbox+.el-checkbox {
		margin-left: 0;
	}
	.mint-header.is-fixed{
		z-index: 2!important;
	}
</style>