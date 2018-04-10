<template>
	<section style="height:100vh;background:#f1f1f1;">
		<div class="nav-top">
			<mt-header title="地址管理" fixed style="height: 45px;background: #c7000a;font-size: 18px;    font-weight: 400;">
			<router-link to="/mine" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
			</div>
		</div>
		<mt-tab-container style="padding-top: 15px;padding-bottom: 60px;" v-model="active">
			<mt-tab-container-item id="a1">
				<div class="content" style="background:#f1f1f1;">
					<div class="titleName" style="background:#fff;padding-top:40px;padding-left:5px;">个人地址</div>
					<div class="item-content" v-for="(item ,index) in addrList" :key="item.id" style="background:#fff;margin-bottom:10px;">
						<div class="item-main" @click="skipOrder(item.id)">
							<div class="name">{{item.consignee}}</div>
							<div class="tel">{{item.mobile}}</div>
							<div class="addr" style="padding-top:10px;">{{item.areaName}} {{item.detailAddr}}</div>
						</div>
						<div class="oper">
							<div class="deldiv" :class="{ 'delSty': index == sty }" @click="delAddr(item.id)">
								<div>
									<i class="iconfont icon-shanchu" style="font-size:24px;"></i>
								</div>
								<div style="padding:0 5px">删除地址</div>
							</div>

							<div style="display: inline-block;" :class="{ 'editSty': index == sty }" @click="editAddr(index,item.id)">
								<div>
									<i class="iconfont icon-xiugai07" style="font-size:24px;"></i>
								</div>

								<div style="padding:0 5px">{{index == sty?'修改地址':'管理地址'}}</div>
							</div>
						</div>
						<div class="hiddenOp" :class="{ 'showOP': index == sty }" @click="hiddenOp">
							<span>+</span>
						</div>
					</div>

				</div>
			</mt-tab-container-item>
			<mt-tab-container-item id="a2">
				<!--<mt-cell v-for="n in 5" title="tab-container 2">

				</mt-cell>-->
				<p style="text-align: center;margin-top: 50px;">暂无</p>
			</mt-tab-container-item>
		</mt-tab-container>
		<div class="addAddr">
			<mt-button type="danger" size="large" @click="addAddr"><i class="iconfont icon-add" style="font-size:18px;"></i>&nbsp;新建收货地址</mt-button>
		</div>
	</section>

</template>

<script>
	import { Toast, MessageBox, Indicator } from 'mint-ui';
	// import { userAddress, DelUserAddress } from "../js/api"
	export default {
		name: 'AddressMamage',
		data() {
			return {
				active: "a1",
				selectbg: 'a1',
				sty: -1,
				opAddrName: '管理地址',
				opState: false,
				addrList:  [{
		"new": false,
		"creator": 0,
		"consignee": "鲁钺锋",
		"groupAddressId": 0,
		"groupId": 0,
		"latitude": 0,
		"isDefaultAddr": 1,
		"mobile": "17826804660",
		"cityId": 26,
		"provinceId": 7,
		"userId": 1826,
		"businessAreaId": 0,
		"checkversion": 0,
		"createAt": 1511144783000,
		"distributionRouteId": 0,
		"detailAddr": "东部软件园3104",
		"detailAddrId": 0,
		"districtId": 2062,
		"areaName": "浙江省杭州市西湖",
		"id": 2905,
		"longitude": 0
	}, {
		"new": false,
		"creator": 0,
		"consignee": "张三",
		"groupAddressId": 0,
		"groupId": 0,
		"latitude": 0,
		"isDefaultAddr": 0,
		"mobile": "17826804660",
		"cityId": 26,
		"provinceId": 7,
		"userId": 1826,
		"businessAreaId": 0,
		"checkversion": 0,
		"createAt": 1511147794000,
		"distributionRouteId": 0,
		"detailAddr": "东部软件园3106",
		"detailAddrId": 0,
		"districtId": 2062,
		"areaName": "浙江省杭州市西湖",
		"id": 2944,
		"longitude": 0
	}],
				addressId: -1,
				vir: 0,
				localOrder: ''
			}
		},
		methods: {
			backIcon: function() {
//				this.$router.push({
//					path: '/mine'
//				});
				this.$router.go(-1)
			},
			selMethod: function(index) {
				this.selectbg = index;
				this.active = index;
			},
			editAddr: function(index, addrId) {
				if(this.addressId != index) {
					this.addressId = index;
					this.opState = false;
					if(this.opState) {
						this.$router.push({
							path: '/editAddress',
							// query: {
							// 	op: 0,
							// 	addrId: addrId,
							// 	vir: this.vir
							// }
						});
					} else {
						this.sty = index;
						this.opState = true;
					}
				} else {
					if(this.opState) {
						this.$router.push({
							path: '/editAddress',
							// query: {
							// 	op: 0,
							// 	addrId: addrId,
							// 	vir: this.vir
							// }
						});
					} else {
						this.sty = index;
						this.opState = true;
					}
				}

			},
			delAddr: function(id) {

				MessageBox.confirm('您确定要删除此地址吗?').then(action => {
					let info = Object.assign({},this.$store.state.generalInfo);
					info.add_id = id;
					// DelUserAddress(info).then(data => {
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
					// 		this.delSty = -1;
					// 		Toast({
					// 			message: '删除成功',
					// 			position: 'middle',
					// 			duration: 2000
					// 		});
					// 		this.sty = -1;
					// 		this.addressId = -1;
					// 		this.opState = true;
					// 		this.getAddrList();
					// 	}
					// });
				});

			},
			getAddrList() {
				// Indicator.open({
				// 	text: '加载中...',
				// 	spinnerType: 'fading-circle'
				// });
				// let info = Object.assign({}, this.$store.state.generalInfo);
				// info.user_id = this.$store.state.wx_user_info.user.id
				// userAddress(info).then(data => {
				// 	let {
				// 		errCode,
				// 		errMsg,
				// 		consigneeInformationlist
				// 	} = data;
				// 	if(errCode != 0) {
				// 		Indicator.close();
				// 		Toast({
				// 			message: errMsg,
				// 			position: 'middle',
				// 			duration: 2000
				// 		});
				// 	} else {
				// 		this.addrList = consigneeInformationlist;
				// 		console.log(consigneeInformationlist);
				// 		Indicator.close();
				// 	}
				// });
			},
			addAddr() {
				this.$router.push({
					path: '/addAddress',
					// query: {
					// 	op: 1,
					// 	vir: this.vir
					// }
				});
			},
			skipOrder(id) {
				if(this.vir == 1) {
					this.localOrder.addresId = id;
					this.$router.push({
						path: '/confirmOrder',
						query: {
							virOrder: JSON.stringify(this.localOrder)
						}
					});
				}
			},
			hiddenOp() {
				this.sty = -1;
				this.addressId = -1;
				this.opState = true;
			},

		},
		mounted() {
			// this.getAddrList();
			// if(this.$route.query.vir == 1) {
			// 	this.vir = 1;
			// }
			// if(localStorage.getItem('wxlocalaccess-order')) {
			// 	this.localOrder = JSON.parse(localStorage.getItem('wxlocalaccess-order'));
			// }

		}
	}
</script>

<style scoped>
	.nav-top {
		height: 45px;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		background: #c7000a;
		z-index: 1;
		text-align: center;
	}
	
	.backIcon {
		display: inline-block;
		width: 30px;
		text-align: center;
		color: #fff;
		height: 45px;
		float: left;
	}
	
	.nav-sel {
		height: 32px;
		display: inline-block;
		width: 192px;
		margin-top: 6.5px;
		margin-right: 30px;
		border: 1px solid #fff;
	}
	
	.nav-sel div {
		width: 50%;
		float: left;
		line-height: 32px;
		color: #fff;
	}
	
	.nav-sel .foc {
		color: #c7000a;
		background: #fff;
	}
	
	.content {
		margin-top: 10px;
		background: #fff;
		/*padding: 10px;*/
	}
	
	.titleName {
		color: #c7000a;
		border-bottom: 1px solid #e8e8e8;
		font-size: 16px;
		height: 30px;
		line-height: 30px;
	}
	
	.item-content {
		padding: 5px 5px;
		position: relative;
	}
	
	.item-main {
		margin-right: 60px;
	}
	
	.name {
		width: 30%;
		float: left;
		overflow: hidden;
		margin-right: 5%;
		color: #333;
		font-size: 16px;
		line-height: 25px;
		height: 25px;
	}
	
	.tel {
		width: 50%;
		float: left;
		overflow: hidden;
		color: #333;
		font-size: 16px;
		line-height: 25px;
		height: 25px;
	}
	
	.addr {
		clear: both;
		font-size: 14px;
		color: #666;
		/*line-height: 16px;*/
		word-break: break-all;
		line-height: 20px;
	}
	
	.oper {
		right: 0;
		top: 0;
		position: absolute;
		font-size: 12px;
		color: #666;
		text-align: center;
		line-height: 20px;
		padding-top: 5px;
		/*width: 60px;*/
		display: inline-block;
	}
	
	.deldiv {
		display: none;
	}
	
	.oper>div {
		padding-top: 10px;
	}
	
	.oper .delSty {
		float: left;
		color: #fff;
		background-color: #ff364f;
		display: inline-block;
	}
	
	.oper .editSty {
		float: left;
		color: #fff;
		background-color: #c7000a;
	}
	
	.addAddr {
		position: fixed;
		bottom: 0;
		left: 0;
		padding: 2%;
		width: 96%;
		background: #fff;
	}
	
	.hiddenOp {
		position: absolute;
		top: 5px;
		right: 0;
		transform: rotate(45deg);
		width: 15px;
		height: 15px;
		border-radius: 7.5px;
		background: #fff;
		display: none;
	}
	
	.hiddenOp span {
		position: absolute;
		color: red;
		font-size: 15px;
		left: 2px;
		top: -4px;
	}
	
	.content .showOP {
		display: block;
	}
</style>