<template>
	<section>
		<mt-header title="修改地址" fixed style="height: 45px;background: #c7000a;font-size: 18px;    font-weight: 400;">
			<router-link to="/addressManage" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div style="width: 98%;margin: 0 auto;border-radius: 3px;margin-top:45px;" >
			<div class="fieldInput">
			<mt-field label="联系人" placeholder="请输入联系人" v-model="selectOp.consignee"></mt-field>
			<mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="selectOp.mobile"></mt-field>
			<div @click="selectAddr"><mt-cell title="收货区域" is-link :value="selectAddrNameDefaul"></mt-cell></div>
			<mt-field label="详细地址" placeholder="请输入详细地址" type="textarea" rows="2" v-model="selectOp.detailAddr"></mt-field>
			<div style="margin: 5px 0;font-size: 14px;" v-show="opType=='edit'"><el-checkbox v-model="selectOp.IsDefaultAddr" style="margin-right: 5px;"></el-checkbox><span>默认地址</span></div>
		</div>
			<mt-button type="danger"  size="large" @click="save">保存</mt-button>
		</div>
		
		<div :class="{ 'visible': visibleM==true }" class="AddrArea">
			<div class="address-picker">
				<div class="add-toolbar"><span @click="cancalM">取消</span><span @click="sureM">确定</span></div>
				<div>
					<mt-picker :slots="slots1" style="width: 33%;text-align: center;float: left;" valueKey="provinceName"  @change="onProValuesChange"></mt-picker>
					<mt-picker :slots="slots2" style="width: 33%;text-align: center;float: left;" valueKey="cityName"   @change="onCityValuesChange"></mt-picker>
					<mt-picker :slots="slots3" style="width: 33%;text-align: center;float: left;" valueKey="districtName"   @change="onDisValuesChange"></mt-picker>
				</div>
				
				<!--<mt-picker :slots="slots" valueKey="id"  @change="onValuesChange"></mt-picker>-->
			</div>
		</div>
		
	</section>

</template>

<script>
	import { Toast ,Indicator} from 'mint-ui';
	// import { provinceAll ,cityByProvince,districtByCity ,AddUserAddress,getUserAddressInfo,UpdUserAddress} from "../js/api"
	// import { ls} from "../js/LStorage"
	export default {
		name: 'EditAddress',
		data() {
			return {
				addrTite:'',
				visibleM: false,
				userInfo:'',
				selectOp:{
					consignee: '张三',
					mobile: '11111111',
					detailAddr:'',
					province_id:'',
					city_id:'',
					district_id:'',
					IsDefaultAddr:false
				},
				vir:0,
				reSelectOp:{},
				selectOpData:{},
				cityIndex:0,
				disIndex:5,
				addrId:'',
				addrInfo:'',
				opType:'',
				selectAddrName:{},
				selectAddrNameDefaul:'请选择',
				defaultArea:{},
				slots1: [{
						flex: 1,
						values:[],
						className: 'slot1',
						textAlign: 'center'
				},
					{
						divider: true,
						content: '-',
						className: 'slot2'
					}
				],
				slots2: [{
						flex: 1,
						values:[],
						className: 'slot1',
						textAlign: 'center'
				},
					{
						divider: true,
						content: '-',
						className: 'slot2'
					}
				],
				slots3: [{
						flex: 1,
						values:[],
						className: 'slot1',
						textAlign: 'center'
				}
				]
				
			}
		},
		methods: {
			onProValuesChange(picker, values) {
				// this.selectAddrName.pro=values[0].provinceName;
				// this.selectOpData.province_id=values[0].id;
				// console.log('选中的省',this.selectOp.province_id);
				// this.getCity({province_id:values[0].id});
				
			},
			onCityValuesChange(picker, values) {
				// this.selectAddrName.city=values[0].cityName;
				// this.selectOpData.city_id=values[0].id;
				// console.log('选中的市',this.selectOp.city_id);
				// this.getDis({city_id:values[0].id});
			},
			onDisValuesChange(picker, values) {
				// console.log('选中的县',values);
				// this.selectAddrName.dis=values[0].districtName;
				// this.selectOpData.district_id=values[0].id;
			},
			cancalM: function() {
				this.visibleM = false;
				
			},
			sureM: function() {
				this.visibleM = false;
				// this.selectOp.province_id=this.selectOpData.province_id;
				// this.selectOp.city_id=this.selectOpData.city_id;
				// this.selectOp.district_id=this.selectOpData.district_id;
				// this.selectAddrNameDefaul=this.selectAddrName.pro+this.selectAddrName.city+this.selectAddrName.dis;
			},
			selectAddr:function(){
				this.visibleM = true;
				// console.log(this.disIndex);
				// console.log(this.selectOp);
			},
			save(){
					
				if(this.selectOp.consignee.trim()==""){
					Toast({
					  message: "请输入联系人",
					  position: 'middle',
					  duration: 1000
					});
				}else if(this.selectOp.mobile.trim()==""){
					Toast({
					  message: "请输入手机号",
					  position: 'middle',
					  duration: 1000
					});
				}else if(!(/^1[34578]\d{9}$/.test(this.selectOp.mobile.trim()))&&this.selectOp.mobile.trim()!=""){
					Toast({
					  message: "您输入的手机号码格式有误，请重新输入",
					  position: 'middle',
					  duration: 1000
					});
				}
				else if(this.selectOp.city_id=="" && this.selectOp.district_id==""){
					Toast({
					  message: "选择收货区域",
					  position: 'middle',
					  duration: 1000
					});
				}
				else if(this.selectOp.detailAddr.trim()==""){
					Toast({
					  message: "请输入详细地址",
					  position: 'middle',
					  duration: 1000
					});
				}
				else
				if(this.opType=="add"){
					Indicator.open({
						text: '加载中...',
						spinnerType: 'fading-circle'
					});
					console.log(this.selectOp);
					let info=Object.assign({},this.$store.state.generalInfo);
					info.consigneeInformation=this.selectOp;
//					info.setId=0;
					
				// 	AddUserAddress(info).then(data => {
				// 	let {
				// 		errCode,
				// 		errMsg
				// 	} = data;
				// 	if(errCode != 0) {
				// 		Indicator.close();
				// 		Toast({
				// 	  message: errCode,
				// 	  position: 'middle',
				// 	  duration: 2000
				// 	});
				// 	} else {
				// 		Indicator.close();
				// 		let instance = Toast({
				// 		  message: '新建地址成功',
				// 		  iconClass: 'icon icon-success'
				// 		});
				// 			setTimeout(() => {
				// 			  instance.close();
				// 			this.$router.push({
				// 			path: '/addressManage',
				// 			query:{
				// 				vir:this.vir
				// 			}
				// 		});
				// 			}, 1000);
				// 	 }
					
				// });
				}else if(this.opType=="edit"){
				// 	Indicator.open({
				// 		text: '加载中...',
				// 		spinnerType: 'fading-circle'
				// 	});
				// 	let info=Object.assign({},this.$store.state.generalInfo);
				// 	this.selectOp.IsDefaultAddr=this.selectOp.IsDefaultAddr==true ? 1:0;
				// 	info.consigneeInformation=this.selectOp;
				// 	console.log("修改后提交的地址",info);
				// 	UpdUserAddress(info).then(data => {
				// 	let {
				// 		errCode,
				// 		errMsg
				// 	} = data;
				// 	if(errCode != 0) {
				// 		Indicator.close();
				// 		Toast({
				// 	  message: errCode,
				// 	  position: 'middle',
				// 	  duration: 2000
				// 	});
				// 	} else {
				// 		Indicator.close();
				// 		let instance = Toast({
				// 		  message: '修改地址成功',
				// 		  iconClass: 'icon icon-success'
				// 		});
				// 			setTimeout(() => {
				// 			  instance.close();
				// 			this.$router.push({
				// 			path: '/addressManage',
				// 			query:{
				// 				vir:this.vir
				// 			}
				// 		});
				// 			}, 1000);
				// 	 }
					
				// });
				}
			},
			//获取市
			getCity(op){
				// let generalInfo=Object.assign({},this.$store.state.generalInfo);
				// let info=Object.assign(op,generalInfo);
				// cityByProvince(info).then(data => {
				// 	let {
				// 		errCode,
				// 		errMsg,
				// 		citylist
				// 	} = data;
				// 	if(errCode != 0) {
				// 		console.log(errCode);
				// 		Toast({
				// 	  message: errCode,
				// 	  position: 'middle',
				// 	  duration: 2000
				// 	});
				// 	} else {
				// 		this.slots2[0].values=citylist;
				// 		this.defaultVal(citylist,this.slots2,'city_id');
				// 	}
				// });
			},
			//获取县
			getDis(op){
				// let generalInfo=Object.assign({},this.$store.state.generalInfo);
				// let info=Object.assign(op,generalInfo);
				// districtByCity(info).then(data => {
				// 	let {
				// 		errCode,
				// 		errMsg,
				// 		districtlist
				// 	} = data;
				// 	if(errCode != 0) {
				// 		console.log(errCode);
				// 		Toast({
				// 	  message: errCode,
				// 	  position: 'middle',
				// 	  duration: 2000
				// 	});
				// 	} else {
				// 		this.slots3[0].values=districtlist;
				// 		console.log('districtlistdistrictlistdistrictlistdistrictlistdistrictlist',districtlist);
				// 		this.defaultVal(districtlist,this.slots3,'district_id');
				// 	}
				// });
			},
			getAddrById(id){
				
			},
			defaultVal(arr,arg,addr){
				// console.log('类表里是什么?',arr);
				// console.log('类表里是什么?',this.selectOp);
				// console.log('类表里是什么?',this.reSelectOp);
				// for( let [ i, item ] of new Map( arr.map( ( item, i ) => [ i, item ] ) ) ){
								
				// 				if(item.id==this.reSelectOp[addr]){
				// 					console.log("下标",i);
				// 					arg[0].defaultIndex=i;
				// 					break;
				// 				}
				// 			}
			},
		},
		mounted() {
			
		// 	console.log(this.$route.query.vir==1)
		// 	if(this.$route.query.vir==1){
		// 		this.vir=1;
		// 	}
		// 	this.userInfo = ls.getItem('wx_user_info');
		// this.selectOp.user_id=this.userInfo.user.id;
		// let  routeQuery= this.$route.query;
		// if('op' in routeQuery){
		// 	if(routeQuery.op==1){
		// 			Indicator.open({
		// 				text: '加载中...',
		// 				spinnerType: 'fading-circle'
		// 			});
		// 		this.addrTite='新建地址';
		// 		this.opType="add";
		// 		let info=Object.assign({},this.$store.state.generalInfo);
		// 		provinceAll(info).then(data => {
				
		// 			let {
		// 				errCode,
		// 				errMsg,
		// 				provincelist
		// 			} = data;
		// 			if(errCode != 0) {
		// 				Indicator.close();
		// 				Toast({
		// 			  message: errCode,
		// 			  position: 'middle',
		// 			  duration: 2000
		// 			});
					
		// 			} else {
		// 				this.slots1[0].values=provincelist;
						
		// 				if(this.opType=="edit"){
		// 					this.defaultVal(provincelist,this.slots1,'province_id');
		// 				}else{
		// 					this.selectOp.province_id=provincelist[0].id;
		// 				}
		// 				console.log('省列表',this.selectOp.province_id)
		// 				Indicator.close();
		// 			}
		// 		});
				
				
				
				
		// 	}else if((routeQuery.op==0)&&('addrId' in routeQuery)){
		// 		Indicator.open({
		// 				text: '加载中...',
		// 				spinnerType: 'fading-circle'
		// 			});
		// 		this.addrTite='修改地址';
		// 		this.opType="edit";
		// 		this.addrId=this.$route.query.addrId;
		// 		this.selectOp.add_id=this.$route.query.addrId;
		// 		let info=Object.assign({},this.$store.state.generalInfo);
		// 		info.addId=this.addrId;
		// 		info.username=this.$store.state.wx_user_info.user.username;
		// 		getUserAddressInfo(info).then(data => {
		// 			let {
		// 				errCode,
		// 				errMsg,
		// 				consigneeInformationInfo
		// 			} = data;
		// 			if(errCode != 0) {
		// 				Indicator.close();
		// 				console.log('data',data);
		// 				Toast({
		// 			  message: errCode,
		// 			  position: 'middle',
		// 			  duration: 2000
		// 			});
		// 			} else {
		// 				console.log("修改前数据",consigneeInformationInfo);
		// 				this.selectAddrNameDefaul=consigneeInformationInfo.areaName;
		// 				this.selectOp.consignee=consigneeInformationInfo.consignee;
		// 				this.selectOp.mobile=consigneeInformationInfo.mobile;
		// 				this.selectOp.detailAddr=consigneeInformationInfo.detailAddr;
		// 				this.selectOp.IsDefaultAddr=consigneeInformationInfo.isDefaultAddr==1?true:false;
		// 				this.selectOp.province_id=consigneeInformationInfo.provinceId;
		// 				this.selectOp.city_id=consigneeInformationInfo.cityId;
		// 				this.selectOp.district_id=consigneeInformationInfo.districtId;
						
		// 				this.reSelectOp.province_id=consigneeInformationInfo.provinceId;
		// 				this.reSelectOp.city_id=consigneeInformationInfo.cityId;
		// 				this.reSelectOp.district_id=consigneeInformationInfo.districtId;
						
		// 				console.log('this.selectOpthis.selectOpthis.selectOpthis.selectOpthis.selectOp');
						
						
		// //获取省份
		// let generalInfo=Object.assign({},this.$store.state.generalInfo);
		// provinceAll(generalInfo).then(data => {
		// 			let {
		// 				errCode,
		// 				errMsg,
		// 				provincelist
		// 			} = data;
		// 			if(errCode != 0) {
		// 				Indicator.close();
		// 				console.log(errCode);
		// 				Toast({
		// 			  message: errCode,
		// 			  position: 'middle',
		// 			  duration: 2000
		// 			});
		// 			} else {
		// 				this.slots1[0].values=provincelist;
						
		// 				if(this.opType=="edit"){
		// 					this.defaultVal(provincelist,this.slots1,'province_id');
		// 				}else{
		// 					this.selectOp.province_id=provincelist[0].id;
		// 				}
		// 				console.log('省列表',this.selectOp.province_id)
		// 				Indicator.close();
		// 			}
		// 		});
						
						
		// 			}
		// 		});
				
		// 	}
		// }
		// Indicator.close();
		// console.log(routeQuery);
		

				
				
				
		}
	}
</script>

<style scoped>
	.fieldInput{
		margin-bottom: 10px;
	}
	.AddrArea {
		top: 0;
		left: 0;
		position: fixed;
		height: 100vh;
		width: 100vw;
		/*opacity: .5;*/
		background: rgba(0, 0, 0, 0.5);
		z-index: 99;
		display: none;
	}
	
	section .visible {
		display: block;
	}
	
	.address-picker {
		height: 292px;
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
		background: #fff;
	}
	
	.add-toolbar {
		height: 40px;
		border-bottom: 1px solid #eaeaea;
	}

	.add-toolbar span {
		display: inline-block;
		width: 50%;
		text-align: center;
		line-height: 40px;
		font-size: 16px;
		color: #26a2ff;
	}
	/*.slot1{
		width: 33px;
	}*/
</style>