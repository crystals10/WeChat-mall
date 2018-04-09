<template>
	<section style="padding-bottom: 50px;" class="productDetail">
		<div class="backIcon"   @click="backList">
			<!-- <icon name="angle-left" scale="2"></icon> -->
			返回
		</div>
		<div class="searchIcon"  @click="searchIcon">
			<!-- <icon name="search" scale="2"></icon> -->
			搜索
		</div>
		<div class="swiper-container">
			<div class="swiper-wrapper" style="background: #fff;">
				<div class="swiper-slide" v-for="image in imgs"><img v-lazy="image"/></div>
			</div>
			<!-- Add Pagination -->
			<div class="swiper-pagination"></div>
		</div>
		<div style="padding: 10px;background: #fff;">
			<div class="productName">{{productInfo.productName}}</div>
			<div class="subtitle">{{productInfo.subtitle}}</div>
			<div style="padding-bottom: 5px;"><span style="font-size: 14px;color: #f40;">￥</span><span style="font-size: 18px;color: #f40;">{{productInfo.memberPrice|formatMoney}}</span></div>
			<!-- <div style="border-top: 1px solid #e8e8e8;height: 36px;"><span style="color: #666;line-height: 36px;">库存：</span><span style="color: #333;">{{productInfo.StockNumber}}件</span></div> -->
		</div>
		<div style="margin-top: 10px;background: #fff;padding: 0 10px;">
			<p style="height: 45px;line-height: 45px;">图文详情
				<!--<icon name="angle-down" style="float: right;height:45px;" scale="2"></icon>-->
			</p>
			
			<div v-html="productInfo.description" class="productDes">
				<!--<img v-for="img in imgs" v-lazy="img.url" class="imgDetail" alt="" />-->
				
			</div>
		</div>
		<div style="height: 50px;position: fixed;bottom: 0;left: 0;width: 100%;text-align: center;    border-top: 1px solid #c7000a;z-index: 99;">
			<div style="width: 50%;float: left; color: #333;background-color: #f8f8f8;height: 50px;"  @click="shoppingCar">
				<div style="display: inline-block;line-height: 50px;" >购物车</div>
				<div style="display: inline-block;height: 50px;vertical-align: middle;">
					<!-- <icon name="shopping-cart" scale="1.5" style="float: left;margin-top: 10px;"></icon> -->
				</div>
			</div>
			<div style="width: 50%;float: left;    color: #fff;background-color: #ab0923;height: 50px;line-height: 50px;"  @click="showOp">加入购物车</div>
		</div>
		<div class="mengBan" :class="megnban?'megnbanShow':'megnbanHide'">
			<div class="mengBanBot">
				<div class="mb-title">
					<img :src="productInfo.productPhoto" alt="" />
					<div class="mb-name">{{productInfo.productName}}</div>
					<div><span style="font-size: 14px;color: #f40;">￥:</span><span style="font-size: 16px;color: #f40;">{{productInfo.memberPrice}}</span></div>
					<div  class="mb-close"  @click="megnban=false">关闭</div>
				</div>
				<div class="mb-account">
					<div style="display: inline-block;float: left;height: 35px;line-height: 35px;"><!-- <span>库存：</span><span>{{productInfo.StockNumber}}</span> --></div>
						<div class="opNum">
							<span @click="operateNum(0)">-</span><input type="text" v-model="numMod" ref="numRef"  @input="addNumOp" @focus="focusNumOp" @blur="blurNumOp"/><span  @click="operateNum(1)">+</span>
						</div>
				</div>
				<div class="operate">
					<mt-button size="small" type="danger" @click="addShoppingCar(false)">立即购买</mt-button>
					<mt-button  size="small" type="danger" @click="addShoppingCar(true)">加入购物车</mt-button>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
	import { Toast } from 'mint-ui';
	// import { getProductUsedInfo ,ipAddr,batchAddCar} from "../js/api"
	// import { ls,ss} from "../js/LStorage"
	export default {
		name: 'ProductDetail',
		data() {
			return {
				productInfo:{
					"itemNumber": "",
		"proType": 0,
		"cityState": 0,
		"marketPrice": 150.00,
		"salesCount": 0,
		"city": 1,
		"kittiesCookies": "",
		"displayOrder": 0,
		"SimInventory": "",
		"description": "<img alt=\"\" src=\"http://www.taiibao.com/upload/a55/6a7/3c307e9efe5e37f454bc6f7638_131957_750x562.jpg\" /><img alt=\"\" src=\"http://www.taiibao.com/upload/6c9/eaa/6e42acab80048f3112b542ae88_151042_750x562.jpg\" /><img alt=\"\" src=\"http://www.taiibao.com/upload/744/e3c/f543affeecb03778ccfa95ff74_176105_750x561.jpg\" /><img alt=\"\" src=\"http://www.taiibao.com/upload/d4c/035/6e90594c269c40dfdfd0bd9b83_74575_750x562.jpg\" /><img alt=\"\" src=\"/upload/2f5/63e/6d419960f2f6e092eeb998c5ac_43110_750x562.jpg\" /><img alt=\"\" src=\"http://www.taiibao.com/upload/06a/54c/23b04cd7aa0fec5f1f608e50f4_61217_750x562.jpg\" /><img alt=\"\" src=\"http://www.taiibao.com/upload/669/d71/675be30ed5b9d92704dd1c5eac_34858_750x562.jpg\" /><img alt=\"\" src=\"http://www.taiibao.com/upload/55e/39e/8a248baa9ceaa57d8abefb4dd6_56113_750x562.jpg\" /><img alt=\"\" src=\"http://www.taiibao.com/upload/2c2/ceb/0de600dd075cacbe054afa6462_62845_750x562.jpg\" /><img alt=\"\" src=\"http://www.taiibao.com/upload/f25/fb7/a06d8975e229b95cea1bd68e8d_62528_750x561.jpg\" /><img alt=\"\" src=\"http://www.taiibao.com/upload/2b1/f5f/e0ce8d11bb52b57502a34ee83d_99901_750x562.jpg\" /><img alt=\"\" src=\"http://www.taiibao.com/upload/730/fd9/c72039c4e4b00ce03fedee6dac_129811_750x562.jpg\" /><img alt=\"\" src=\"http://www.taiibao.com/upload/84e/2db/96bf0d1297b0515b2c33eed02c_116319_750x562.jpg\" />",
		"updateAt": "Dec 13, 2017 6:39:03 PM",
		"productName": "智利泰瑞贵族珍藏佳美娜干红葡萄酒750mL",
		"listId": 0,
		"MaxNum": 30,
		"updateBy": 44,
		"enable": true,
		"setId": 5,
		"id": 1058,
		"editNumberEnable": 0,
		"stock": 0,
		"saleOnYp": 0,
		"shelfState": 6,
		"spuDisplay": 0,
		"imgs": "[\"http://www.taiibao.com/upload/f0e/79e/aa57d0df9a40438784e868a86b_54882_800x800.jpg\",\"http://www.taiibao.com/upload/202/d09/c431861d7563dc68d9ae0f799c_43529_800x800.jpg\"]",
		"productPhoto": "http://www.taiibao.com/upload/f0e/79e/aa57d0df9a40438784e868a86b_54882_800x800.jpg",
		"memberPrice": 120.00,
		"cashOnDelivery": 1,
		"displayType": 0,
		"subtitle": "非凡深邃的红宝石颜色，红色浆果、烟草、巧克力和纯净的果香演绎珍藏赤霞珠的盛世繁华、热情而高雅。",
		"StockNumber": 30,
		"shortName": "",
		"categoryId": 11
				},
				imgs: ["http://www.taiibao.com/upload/f0e/79e/aa57d0df9a40438784e868a86b_54882_800x800.jpg"],
				megnban:false,
				addNum:1,
				// ip_Addr:ipAddr,
				localData:"",
				goodsId:"",
				numMod:1,
				defaultNum:"",
				groupID:""
			}
		},
		methods: {
			backList: function() {
//				this.$router.push({
//					path: '/home'
//				});
			this.$router.go(-1)
			},
			searchIcon(){
				// ss.removeItem("hisCache");
				this.$router.push({path:"/search"});
			},
		addShoppingCar(opType){
			// if(this.productInfo.StockNumber==0){
			// 	Toast({
			// 		  message: "该商品库存不足",
			// 		  position: 'middle',
			// 		  duration: 1000
			// 		});
			// 		this.megnban=false;
					
			// }else{
			// 	let good={
			// 		goodsNum:this.addNum,
			// 	goodsId:this.goodsId
			// 		}
			// 	let shoppingCar=Object.assign({},this.$store.state.generalInfo);
			// 	let productInfo={};
			// 	productInfo.userId=this.$store.state.wx_user_info.user.id;
			// 	productInfo=Object.assign(productInfo,good);
			// 	shoppingCar.productInfo=productInfo;
			// 	batchAddCar(shoppingCar).then(data => {
			// 		let {
			// 			errCode,
			// 			errMsg
			// 		} = data;
			// 		if(errCode != 0) {
			// 			this.megnban=false;
			// 			Toast({
			// 		  message: errMsg,
			// 		  position: 'middle',
			// 		  duration: 1000
			// 		});
			// 		} else {
			// 			this.megnban=false;
			// 			if(opType){
			// 				Toast({
			// 		  message: "成功加入购物车",
			// 		  position: 'middle',
			// 		  duration: 1000
			// 		});
			// 			}else{
			// 				this.$router.push({
			// 		path: '/shoppingcar'
			// 	});
			// 			}
						
					
			// 		}
			// 	});
			// }
			
			
				
			
			
			
		},
		
		
		/*opTemporary(){
			var temporaryShoppingCar={
					goodsNum:this.addNum,
					goodsId:this.goodsId
				}
							if(this.getCookie("temporaryShoppingCar")!=null){
					
					try {
					　　// 此处是可能产生例外的语句
						let temporary=JSON.parse(this.getCookie("temporaryShoppingCar"));
						temporary.push(temporaryShoppingCar);
						document.cookie="temporaryShoppingCar="+JSON.stringify(temporary);
						Toast({
					  message: "成功加入购物车",
					  position: 'middle',
					  duration: 1000
					});
					　　} catch(error) {
					　　// 此处是负责例外处理的语句
							let temporary=[];
							temporary.push(temporaryShoppingCar);
							document.cookie="temporaryShoppingCar="+JSON.stringify(temporary);
							Toast({
					  message: "成功加入购物车",
					  position: 'middle',
					  duration: 1000
					});
					　　}
				}else{
					let temporary=[];
					temporary.push(temporaryShoppingCar);
					document.cookie="temporaryShoppingCar="+JSON.stringify(temporary);
					Toast({
					  message: "成功加入购物车",
					  position: 'middle',
					  duration: 1000
					});
				}
		},*/
/*		getCookie(name){
					var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
					if(arr=document.cookie.match(reg))
					return unescape(arr[2]);
					else
					return null;
				},*/
		shoppingCar(){
			this.$router.push(
				{path:'/shoppingcar'}
			);
		},
		closemb(){
			
		},
		addNumOp(val){
//			console.log(this.numMod);
//			if((/^[0-9]*$/.test(this.numMod))){
//				if(this.numMod>this.productInfo.MaxNum){
//					Toast({
//					  message: "您最多只能购买"+this.productInfo.MaxNum+"件商品",
//					  position: 'middle',
//					  duration: 2000
//					});s
//					this.addNum=this.productInfo.MaxNum;
//					this.numMod=this.productInfo.MaxNum;
//				}else{
//					this.addNum=this.numMod;
//				}
//			}else{
//				
////				this.numMod=this.addNum;
//			}
		},
		blurNumOp(){
			// if(this.numMod==''||this.numMod==0){
			// 	this.numMod=1;
			// 	this.addNum=1;
			// }else if(/^[0-9]*$/.test(this.numMod)){
			// 	if(this.numMod>this.productInfo.MaxNum){
			// 		Toast({
			// 		  message: "您最多只能购买"+this.productInfo.MaxNum+"件商品",
			// 		  position: 'middle',
			// 		  duration: 2000
			// 		});
			// 		this.addNum=this.productInfo.MaxNum;
			// 		this.numMod=this.productInfo.MaxNum;
			// 	}else{
			// 		this.addNum=this.numMod;
			// 	}
			// }else{
			// 	this.numMod=this.addNum;
			// }
		},
		focusNumOp(){
			this.addNum=this.numMod;
		},
		operateNum(index){
			// if(index==0){
			// 	if(this.numMod>1){
			// 		this.addNum=--this.numMod;
			// 	}
			// }else if(index==1){
			// 	if(this.numMod>=this.productInfo.MaxNum){
			// 		if(this.productInfo.StockNumber==0){
			// 			Toast({
			// 		  message: "该商品库存不足",
			// 		  position: 'middle',
			// 		  duration: 2000
			// 		});
			// 		}else{
			// 			Toast({
			// 		  message: "您最多只能购买"+this.productInfo.MaxNum+"件商品",
			// 		  position: 'middle',
			// 		  duration: 2000
			// 		});
			// 		}
					
			// 	}else{
			// 		this.addNum=++this.numMod;
			// 	}
				
			// }
		},
		showOp(){
			// console.log(this.$store.state.WXBrowser);
			// console.log(ls.getItem('wx_user_info'));
			// if(this.$store.state.WXBrowser){
			// 	this.megnban=true;
			// }else{
			// 	if(ls.getItem('wx_user_info')){
			// 		this.megnban=true;
			// 	}else{
			// 		this.$router.push('/login');
			// 	}
				
			// }
			
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
// 			var swiper = new Swiper('.swiper-container', {
// 				pagination: '.swiper-pagination',
// 				paginationClickable: true,
// 				autoplay:1000,
// 				observer:true   //修改swiper自己或子元素时，自动初始化swiper
// //			   observeParents:true,//修改swiper的父元素时，自动初始化swiper
// 			});

			
// 			if(this.$route.query) {
// 				console.log(this.$route.query);
				
// 				let info = Object.assign({}, this.$store.state.generalInfo);
// 				info.product_id=this.$route.query.Id;
// 				info.setId=this.$store.state.setId.setId;
// 				getProductUsedInfo(info).then(data => {
// 					let {
// 						errCode,
// 						errMsg,
// 						productInfo
// 					} = data;
// 					if(errCode != 0) {
// 						console.log(errCode);
// 						Toast({
// 					  message: errCode,
// 					  position: 'middle',
// 					  duration: 2000
// 					});
// 					} else {
// 						this.goodsId=this.$route.query.Id;
// 						this.productInfo = productInfo;
// 						this.imgs = eval(productInfo.imgs);
// 						console.log('productInfo',productInfo);
// 					}
// 				});
// 			}

// 		},
// 			beforeRouteLeave(to, from, next) {
// 			   // 设置下一个路由的 meta
// 			   console.log("商品详情页的路由",to);
// 			   if(to.path=="/home"||to.path=="/search"){
// 			   	 to.meta.keepAlive = true; // B 跳转到 A 时，让 A 缓存，即不刷新
// 			 	 next();
// 			   }
// 			    next();
			 
			 }
		 }
</script>

<style>

	/*image[lazy=loading] {
	  width: 100%;
	  margin: auto;
	}*/
	.swiper-container {
		width: 100%;
		height: 100%;
	}
	
	.swiper-slide {
		text-align: center;
		font-size: 18px;
		background: #fff;
		/* Center slide text vertically */
		display: -webkit-box;
		display: -ms-flexbox;
		display: -webkit-flex;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-ms-flex-align: center;
		-webkit-align-items: center;
		align-items: center;
	}
	
	.swiper-slide img {
		width: 100%;
	}
	
	.productName {
		font-size: 18px;
		line-height: 20px;
		color: #333;
		word-break: break-all;
		word-wrap: break-word;
	}
	
	.subtitle {
		font-size: 14px;
		line-height: 16px;
		padding: 5px 0 10px;
		color: #666;
		word-break: break-all;
		word-wrap: break-word;
	}
	
	.productDetail .backIcon {
		height: 40px;
		width: 40px;
		text-align: center;
		line-height: 40px;
		border-radius: 20px;
		background: rgba(199, 0, 10,0.6);
		position: fixed;
		top: 10px;
		left: 10px;
		z-index: 10;
	}
	
	.searchIcon {
		height: 40px;
		width: 40px;
		text-align: center;
		line-height: 45px;
		border-radius: 20px;
		background: rgba(199, 0, 10,0.6);
		position: fixed;
		top: 10px;
		right: 10px;
		z-index: 10;
	}
	
	.backIcon svg {
		height: 40px;
		color: #fff;
	}
	
	.searchIcon svg {
		height: 20px;
		color: #fff;
		line-height: 40px;
	}
	
	.clickred {
		border-color: #ab0923;
		color: #ab0923;
	}
	.imgDetail{
		width: 100%;
	}
	.mengBan{
		position: fixed;
		top: 0;left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 100;
		background: rgba(0,0,0,0.3);
		display: none;
	}
	.megnbanShow{
		display: block;
	}
	.megnbanHide{
		display: none;
	}
	.mengBanBot{
		height: 212px;
		width: 100%;
		    background-color: #fff;
    padding: 5px 10px 20px;
    color: #666;
		position: fixed;
		bottom: 0;
		left: 0;
		box-sizing: border-box;
	}
	.mb-title{
		    padding: 10px 0 12px;
    border-bottom: 1px solid #e8e8e8;
	}
	.mb-title img{
		width: 50px;
		height: 50px;
		float: left;
		margin-right: 10px;
	}
	.mb-name{
		font-size: 14px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    height: 25px;
    line-height: 25px;
    padding-left: 2px;
    padding-right: 20px;
	}
	.mb-close{
		position: absolute;
		top: 10px;
		right: 10px;
		height: 20px;
		width: 20px;
		vertical-align: middle;
		text-align: center;
		border-radius: 10px;
		background-color: #999;
	}
	.mb-close svg{
		color: #fff;
	}
	.mb-account{
		padding: 10px 0 12px;
		    height: 54px;
		    box-sizing: border-box;
	}
	.opNum{
		display: inline-block;float: right;
	}
	.opNum span{
		float: left;
		display: inline-block;
		height: 30px;
		width: 30px;
		text-align: center;
		line-height: 30px;
		border: 1px solid #e8e8e8;
	}
	.opNum input{
		float: left;
		width: 25px;
		height: 30px;
		outline: none;
		text-align: center;
		border: 0;
		border-top: 1px solid #e8e8e8;
		border-bottom: 1px solid #e8e8e8;
		box-shadow :none;
		-webkit-appearance: none;
		border-radius: 0;
	}
	.operate button{
		width: 49%;
		height: 40px;
	}
	.productDes{
		width: 100%;
		height: auto;
		word-wrap: break-word;
    	word-break: break-all;
	}
	.productDes img{
		width: 100%;
	}
	
</style>