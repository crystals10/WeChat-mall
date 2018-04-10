<template>
	<section>
		<div class="header">
			<div class="search-wrap">
				<div class="search-bar" @click="search">
					<div style="display:inline-block">
						<!-- <icon name="search" scale="1.1" style="float:left;margin-top:7px;"></icon> -->
						<span style="float:left;margin-left:10px;">搜索</span>
					</div>
				</div>
			</div>
			<div class="product-class">
				<ul class="clearfix">
					<li :class="{'class-active':classActive==rec}" @click="selectRecommend">推荐</li>
					<li v-for="(item ,index) in productCategorylist" :key="index" :class="{'class-active':classActive==item.id}" @click="select(item.id)">
						{{item.name}}
					</li>
				</ul>
			</div>
		</div>

		<div class="container">
			<!--轮播-->
			<div class="swiper-container">
				<mt-swipe :auto="3000">
				  <mt-swipe-item><img src="http://www.taiibao.com/upload/f22/cfc/99c8a57a3f95a5997acc825bca_179036_750x375.jpg" alt="" /></mt-swipe-item>
				  <mt-swipe-item><img src="http://www.taiibao.com/upload/f22/cfc/99c8a57a3f95a5997acc825bca_179036_750x375.jpg" alt="" /></mt-swipe-item>
				  <mt-swipe-item><img src="http://www.taiibao.com/upload/f22/cfc/99c8a57a3f95a5997acc825bca_179036_750x375.jpg" alt="" /></mt-swipe-item>
				</mt-swipe>
			</div>
				

			<!--商品列表推荐-->
			<div class="contentList" v-show="recommendContent">
				<div class="contentItem" v-for="item in productList">
					<div class="title">
						<div class="title-line">
							<div class="title-fonts">{{item.CategoryName}}</div>
						</div>
					</div>
					<router-link to="##" class="top-img">
						<img src="http://www.taiibao.com/upload/7d8/24c/6e6d4de8964ad594c6c7fb21ab_49799_740x240.jpg" alt="">
					</router-link>
					<div class="items">
						<router-link tag="div" class="item" v-for="(items,index) in item.productInfo" :key="index" to="/productdetail">
							<div class="productImg">
								<img v-lazy="items.productPhoto" alt="" />
							</div>
							<div class="right">
								<div class="item-title">
									{{items.productName}}
								</div>
								<div class="price">
									<div class="vip-price">
										<span>会员价￥:</span><span>{{items.marketPrice|formatMoney}}</span>
									</div>
									<div class="normal-price">
										<div class="line"></div>
										<span>零售价￥:</span><span>{{items.marketPrice+20|formatMoney}}</span>
									</div>
								</div>
							</div>
						</router-link>
					</div>
				</div>
			</div>
			<!--商品列表分类-->
			<div v-show="classContent"  class="scrollul" ref="scrollul" style="background: #fff; height: 100vh;overflow-y: scroll;-webkit-overflow-scrolling : touch;position: fixed;top: 0;left: 0;padding:89px 0 59px;box-sizing: border-box;width: 100%;">
				<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
					<li v-for="items in allProductList" :key="items.id">
						<div class="items">
							<div tag="div" class="item" @click="prductDetail(items.Id)">
								<div class="productImg">
									<img v-lazy="ip_Addr+items.productPhoto" alt="" />
								</div>
								<div class="right">
									<div class="item-title">
										{{items.productName}}
									</div>
									<div class="price">
										<div class="vip-price">
											<span>会员价￥:</span><span>{{items.Price|formatMoney}}</span>
										</div>
										<div class="normal-price">
											<div class="line"></div>
											<span>零售价￥:</span><span>{{items.marketPrice|formatMoney}}</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</li>
				</ul>
				<div class="noneMore" ref="noneMore">已无更多商品</div>
				<div class="loadMore" ref="loadMore">
					<mt-spinner type="fading-circle"></mt-spinner>
				</div>
			</div>

		</div>
		<tabbar-select></tabbar-select>
	</section>
</template>
<script>
	import Tabbar from '@/components/Tabbar'
	// import { homepageList, ipAddr, getCategoryList, getProductListBysearch ,queryProductList,getLocation} from "../js/api"
	import { Lazyload, Indicator, Toast, Swipe, SwipeItem} from 'mint-ui'
	export default {
		name:"Home",
		components: {
			'tabbar-select': Tabbar,
		},
		data() {
			return {
				rec: -1,
				classActive: -1,
				value: '',
				productList:[
					{
						"categoryImage": "",
						"CategoryName": "食品生鲜",
						"Id": 1,
						"productInfo": [{
							"marketPrice": 158.00,
							"productPhoto": "http://www.taiibao.com/upload/177/b4f/577016229836f576b4b5b5cc33_247488_800x800.jpg",
							"Id": 3,
							"productName": "乌拉圭原装进口牛腱子(1.8-2.0KG/块)"
						}, {
							"marketPrice": 118.00,
							"productPhoto": "http://www.taiibao.com/upload/65f/f1c/28b4a168645afa1c5dead3c85d_38552_800x800.jpg",
							"Id": 6,
							"productName": "冰岛Clearice大西洋鳕鱼(去皮4段) 560G/袋"
						}, {
							"marketPrice": 139.00,
							"productPhoto": "http://www.taiibao.com/upload/177/b4f/577016229836f576b4b5b5cc33_247488_800x800.jpg",
							"Id": 30,
							"productName": "乌拉圭原装进口牛腱子 (1.6-1.8KG/块)"
						}, {
							"marketPrice": 119.00,
							"productPhoto": "http://www.taiibao.com/upload/eeb/3d1/e36d2d4937186748db2fab2542_89668_800x800.jpg",
							"Id": 31,
							"productName": "乌拉圭原装进口牛蹄筋 约1kg/袋"
						}]
					},
					{
						"categoryImage": "",
						"CategoryName": "粮油副食",
						"Id": 13,
						"productInfo": [{
							"marketPrice": 120.00,
							"productPhoto": "http://www.taiibao.com//upload/e60/db8/1365783c2915a6f4dffcbd7bc2_48049_800x800.jpg",
							"Id": 64,
							"productName": "意大利Italissima斯玛葡萄籽油 1L/瓶"
						}, {
							"marketPrice": 73.00,
							"productPhoto": "http://www.taiibao.com//upload/ec8/e27/bdb3661857946e6b8f2b15c2b5_56484_800x800.jpg",
							"Id": 204,
							"productName": "法国鲸鱼牌粗粒海盐（非碘食用盐）180g/瓶"
						}, {
							"marketPrice": 34.00,
							"productPhoto": "http://www.taiibao.com//upload/91c/1aa/eed6de2d01f3cad35a5f404862_237539_800x800.jpg",
							"Id": 239,
							"productName": "澳大利亚SAXA赛克萨粗粒海盐500g/袋"
						}, {
							"marketPrice": 118.00,
							"productPhoto": "http://www.taiibao.com//upload/935/a89/d9cc1acb60aafaa5275f2265ed_295690_800x800.jpg",
							"Id": 248,
							"productName": "土耳其 ZADE牌 葵花籽油 5L/桶"
						}]
					}
				],
				// ip_Addr: ipAddr,
				productCategorylist: [{id:2,name:'食品生鲜'},{id:3,name:'果蔬休闲'},{id:4,name:'精粮副食'},{id:5,name:'酒水茶饮'}],
				selectCon: {
					userId:"",
					productName: "",
					categoryId: "",
					// setId: this.$store.state.setId.setId,
					city: ""
				},
				pagesInfo: {
					start: 0,
					pageSize: 10
				},
				loading: false,
				allProductList: [],
				recommendContent: true,
				classContent: false,
			}
		},
		methods: {
			search: function() {
				// ss.removeItem("hisCache");
				this.$router.push({
					path: '/search'
				});
			},
			//商品分类选择
			select(id) {
				// ss.removeItem("hisCache");
				this.$router.push({
					path:"/home",
					// query:{
					// 	categoryId:id
					// }
				});
				this.classActive = id;
				// console.log(id);
				// this.$refs.noneMore.style.display = "none";
				// this.$refs.loadMore.style.display = "none";
				// this.allProductList = [];
				// this.pagesInfo.start = 0;
				// this.selectCon.categoryId = id;
				// this.recommendContent = false;
				// this.classContent = true;
				// this.getProductList(true);

			},
			//推荐
			selectRecommend() {
				// ss.removeItem("hisCache");
				this.classActive=-1;
				this.recommendContent = true;
				this.classContent = false;
			},
			getProductList(catType) {
				
// 				if(catType) {
// 					Indicator.open({
// 						text: '加载中...',
// 						spinnerType: 'fading-circle'
// 					});
// 				}
// 				let info = Object.assign({},this.$store.state.generalInfo);
// //				info = Object.assign(info, this.pagesInfo);
// 				this.city=="请选择"?this.selectCon.city="":this.selectCon.city=this.city;
// 				info.search = Object.assign(this.selectCon, this.pagesInfo);
// 				console.log("商品分类查询搜索条件",JSON.stringify(info));

// 				queryProductList(info).then(data => {
// 					let {
// 						errCode,
// 						errMsg,
// 						productList,
// 						count
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
// 						console.log(productList);
// 						this.allCount = count;
// 						this.allProductList = this.allProductList.concat(productList);
// 						Indicator.close();
// 						if(count <= this.pagesInfo.pageSize) {
// 							this.loading = true;
// 							this.controlNoneMore = true;
// 							this.$refs.noneMore.style.display = "block";
// 						} else {
// 							this.loading = false;
// 							this.controlNoneMore = false;
// 							this.$refs.loadMore.style.display = "block";
// 						}
// 						if((this.pagesInfo.start + this.pagesInfo.pageSize) >= this.allCount) {
// 							this.loading = true;
// 							this.controlNoneMore = false;
// 							this.$refs.noneMore.style.display = "block";
// 							this.$refs.loadMore.style.display = "none";
// 						}

// 					}
// 				});
			},
			/*上拉加载*/
			loadMore() {
				
				// console.log("上拉加载");
				// this.$refs.loadMore.style.display = "block";
				// this.loading = true;
				// setTimeout(() => {
				// 	this.pagesInfo.start += this.pagesInfo.pageSize;
				// 	this.getProductList(false);
				// }, 2000);

			},
			/*跳转到商品详情页面*/
			prductDetail: function(index) {
				// this.$store.commit("setScrollPosition",this.$refs.scrollul.scrollTop);

				// //将加载的数据保存到localsession中
				// ss.setItem("hisCache",JSON.stringify({
				// 	data:this.allProductList,
				// 	pages:this.pagesInfo.start,
				// 	allCount:this.allCount
				// }));
				// console.log(index);
				this.$router.push({
					// query: {
					// 	Id: index
					// },
					path: '/productdetail'
				});
			},
			// 获取商品分类列表
			getCategory() {
				// let info = Object.assign({}, this.$store.state.generalInfo);
				// info.setId=this.$store.state.setId.setId
				// console.log(info);

				// getCategoryList(info).then(data => {
				// 	let {
				// 		errCode,
				// 		errMsg,
				// 		categoryList
				// 	} = data;
				// 	if(errCode != 0) {
				// 		Toast({
				// 			message: errMsg,
				// 			position: 'middle',
				// 			duration: 2000
				// 		});
				// 		Indicator.close();
				// 	} else {
				// 		Indicator.close();
				// 		this.productCategorylist = categoryList;
				// 		console.log("商品分类", categoryList);
				// 	}
				// });
			},
			openModel() {
				this.$router.push({
					path: '/citySelect'
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
			// console.log("5");
			// this.selectCon.setId = this.$store.state.setId.setId;
			// console.log("商品集合", this.selectCon.setId);
			// var swiper = new Swiper('.swiper-container', {
			// 	pagination: '.swiper-pagination',
			// 	paginationClickable: true,
			// 	autoplay: true,
			// 	observer: true, //修改swiper自己或子元素时，自动初始化swiper
			// 	observeParents: true, //修改swiper的父元素时，自动初始化swiper
			// 	autoplayDisableOnInteraction: false,
			// 	autoplay: 3000,
			// })
			// //获取商品分类
			// this.getCategory();
			// ss.removeItem("hisCache")
			// if(this.$route.query.categoryId){
				
			// 	console.log("没有缓存");
			// 	this.selectCon.categoryId = this.$route.query.categoryId;
			// 	this.loading=true;
			// 	this.getProductList(false);
			// }
		
			// homepageList({}).then(data => {
			// 	let {
			// 		errCode,
			// 		errMsg,
			// 		Homepage
			// 	} = data;
			// 	if(errCode != 0) {
			// 		console.log(errCode);
			// 		Indicator.close();
			// 		this.$message({
			// 			message: errMsg,
			// 			type: 'error'
			// 		});
			// 	} else {
			// 		this.productList = Homepage;
			// 		Indicator.close();
			// 		console.log(this.productList)
			// 	}
			// });
		},
	}
</script>
<style scoped>
	.clearfix:after {
		content: '';
		display: block;
		clear: both;
		height: 0;
		visibility: hidden;
	}
	
	.container {
		margin-top: 91px;
	}
	
	.swiper img {
		width: 100%;
	}
	
	.mint-swipe-items-wrap>div {
		width: auto;
		height: auto;
	}
	
	.contentList {
		padding-bottom: 59px;
		background: #fff;
	}
	
	.contentList :after {
		display: block;
		clear: both;
		content: "";
		visibility: hidden;
		height: 0
	}
	
	.contentItem {
		padding-bottom: 10px;
	}
	
	.items:after {
		display: block;
		clear: both;
		content: "";
		visibility: hidden;
		height: 0
	}
	
	.title {
		height: 42px;
		text-align: center;
		background-color: #fff;
	}
	
	.title-line {
		height: 20px;
		width: 172px;
		margin: 0 auto;
		vertical-align: baseline;
		display: inline-block;
		font-size: 18px;
		line-height: 40px;
		border-bottom: 1px solid #333;
	}
	
	.title-fonts {
		height: 40px;
		padding: 0 10px;
		background-color: #fff;
		display: inline-block;
	}
	
	.top-img img {
		width: 98%;
		display: block;
		margin: auto;
	}
	
	.items {
		padding: 1%;
		/*padding-top: 20px;*/
	}
	
	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 101;
		height: 91px;
		background: white;
	}
	
	.area {
		float: left;
		width: 25%;
		max-width: 100px;
		height: 50px;
		color: #ac497a;
		padding: 10px 0;
		box-sizing: border-box;
		font-size: 14px;
		position: relative;
	}
	
	.area svg {
		position: absolute;
		top: 50%;
		left: 20%;
		transform: translateY(-50%);
	}
	
	.area span {
		position: absolute;
		top: 50%;
		left: 40%;
		transform: translateY(-50%);
	}
	/* 城市选择模态框 */
	
	.area-model {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		background: white;
		z-index: 200;
		overflow: scroll;
		-webkit-overflow-scrolling: touch;
	}
	
	.area-top {
		position: relative;
		text-align: center;
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid #e8e8e8;
	}
	
	.area-top i {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		left: 0;
		padding: 10px;
	}
	
	.pompt {
		font-size: 12px;
		padding: 10px 10px 0;
		color: #a21f75;
	}
	
	.now-city {
		margin-top: 20px;
	}
	
	.popular-city {
		margin-top: 20px;
	}
	
	.all-city {
		margin-top: 20px;
	}
	
	.city-tag {
		display: block;
		text-align: left;
		font-size: 14px;
		font-weight: bold;
		margin-bottom: 10px;
		padding: 0 10px;
	}
	
	.city-wrap {
		padding: 0 10px;
	}
	
	.my-button {
		font-size: 14px;
		padding: 4px 25px;
		border: 1px solid;
		border-radius: 2px;
		display: inline-block;
		margin-right: 10px;
		margin-bottom: 10px;
		border-color: #999999;
	}
	
	.default {
		color: #a21f75;
		border-color: #a21f75;
	}
	
	.city-letter {
		background: #f3f3f3;
		height: 30px;
		line-height: 30px;
		padding: 0 10px;
	}
	
	.city-item {
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #e8e8e8;
		font-size: 14px;
		padding-left: 10px;
	}
	
	.city-nav {
		position: fixed;
		top: 0;
		right: 0;
		font-size: 12px;
		color: #a21f75;
		height: 100vh;
		display: table;
	}
	
	.city-nav ul {
		list-style-type: none;
		display: table-cell;
		vertical-align: middle;
	}
	
	.city-nav ul li {
		text-align: center;
		padding: 1px 10px;
		color: #a21f75;
	}
	
	.search-wrap {
		height: 50px;
		padding: 8px 0;
		box-sizing: border-box;
	}
	
	.search-bar {
		width: 98%;
		height: 34px;
		line-height: 34px;
		background: #f3f3f3;
		border-radius: 20px;
		text-align: center;
		color: #666666;
		font-size: 14px;
	}
	
	.product-class {
		clear: both;
		height: 40px;
		border-top: 1px solid #e8e8e8;
		/*box-shadow: 0 4px 3px 2px rgba(0, 0, 0, 0.4);*/
	}
	
	.product-class ul {
		padding-left: 10px;
		padding-right: 10px;
		list-style-type: none;
		overflow-x: scroll;
		white-space: nowrap;
		-webkit-overflow-scrolling: touch;
	}
	
	.product-class ul li {
		display: inline-block;
		height: 40px;
		line-height: 40px;
		padding: 0 20px;
		box-sizing: border-box;
	}
	
	.product-class ul li:nth-last-child(1) {
		margin-right: 10px;
	}
	
	.class-active {
		font-weight: bold;
		border-bottom: 5px solid #ffe46f;
		font-size: 18px;
	}
	/* 商品排版 */
	
	.item {
		width: 100%;
		padding: 10px 0;
		border-top: 1px solid #e8e8e8;
	}
	
	.productImg {
		float: left;
		margin-left: 10px;
		width: 100px;
		height: 100px;
	}
	
	.productImg img {
		width: 100%;
	}
	
	.right {
		position: relative;
		margin-left: 100px;
		padding: 0 5%;
		height: 100px;
	}
	
	.item-title {
		width: 100%;
		height: 60px;
		font-size: 14px;
		line-height: 20px;
		color: #666;
		word-break: break-all;
		overflow: hidden;
	}
	
	.price {
		width: 90%;
		position: absolute;
		bottom: 0;
		font-size: 16px;
	}
	
	.vip-price {
		float: left;
		color: #c7000a;
	}
	
	.vip-price span {
		display: inline-block;
	}
	
	.vip-price span:nth-of-type(1) {
		font-size: 10px;
	}
	
	.normal-price {
		float: right;
		color: #ccc;
		position: relative;
	}
	
	.normal-price span {
		display: inline-block;
	}
	
	.normal-price span:nth-of-type(1) {
		font-size: 10px;
	}
	
	@media screen and (max-width:320px) {
		.price {
			font-size: 12px;
		}
		.vip-price span:nth-of-type(1) {
			font-size: 8px;
		}
		.normal-price span:nth-of-type(1) {
			font-size: 8px;
		}
	}
	
	.line {
		position: absolute;
		border-top: 1px solid #ccc;
		width: 110%;
		left: -5%;
		top: 10px;
	}
	
	.swiper-container {
		width: 100%;
		height: 150px;
	}
	.swiper-container img{
		width:100%;
		height:100%;
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
	
	.noneMore {
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
	
	.loadMore {
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
	
	.loadMore span {
		display: inline-block;
	}
</style>