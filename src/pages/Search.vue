<template>
	<section>
		<div class="con-top">
			<!--<span  class="backIcon" @click="backIcon"><icon name="angle-left" scale="2" style="height: 40px;"></icon></span>-->
			<el-input placeholder="搜索" v-model="searchCon.productName" class="input-with-select">
				<el-button slot="prepend" icon="arrow-left" @click="backBtn"></el-button>
				<el-button slot="append" icon="search" @click="searchBtn"></el-button>
			</el-input>
			<!--<span class="searchBtn" @click="searchBtn">搜索</span>-->
		</div>
		<!--<div class="search-con">
			<div  :class="{ 'clickred': 1 == selectbg }" @click="clickSec(1)">默认</div>
			<div   :class="{ 'clickred': 2 == selectbg }" @click="clickSec(2)">销量</div>
			<div   :class="{ 'clickred': 3 == selectbg }" @click="clickSec(3)">价格</div>
		</div>-->
		<div style="height: 100vh;overflow-y: scroll;-webkit-overflow-scrolling : touch;position: fixed;top: 0;left: 0;padding-top: 50px;box-sizing: border-box;width: 100%;">

			<ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
				<li v-for="items in allProductList" :key="items.id" style="background: #fff;">
					<div class="items">
						<router-link tag="div" class="item" :to="'/productdetail?Id='+items.id">
							<div class="productImg">
								<img v-lazy="items.productPhoto" alt="" />
							</div>
							<div class="right">
								<div class="item-title">
									{{items.productName}}
								</div>
								<div class="price">
									<div class="vip-price">
										<span>会员价￥:</span><span>{{items.memberPrice.toFixed(2)}}</span>
									</div>
									<div class="normal-price">
										<div class="line"></div>
										<span>零售价￥:</span><span>{{items.marketPrice.toFixed(2)}}</span>
									</div>
								</div>
							</div>
						</router-link>
					</div>
				</li>
			</ul>
			<div class="noneMore" ref="noneMore">已无更多商品</div>
			<div class="loadMore" ref="loadMore">
				<mt-spinner type="fading-circle"></mt-spinner>
			</div>

		</div>

	</section>

</template>

<script>
	// import { getProductListBysearch, ipAddr } from "../js/api"
	import { Indicator, Toast } from 'mint-ui';
	export default {
		name: 'Search',
		data() {
			return {
				// ip_Addr: ipAddr,
				searchCon: {
					categoryId: 0,
					productName: "",
					productNameOp: 0,
					qField: "pName",
					unstock: 0,
					onSale: 0,
					isDelete: 0,
					// setId: this.$store.state.setId.setId,
					onCity: 0,
					supplier: 0
				},
				pagesInfo: {
					start: 0,
					pageSize: 10
				},
				allCount: 0,
				allProductList: [],
				bottomStatus: '',
				selectbg: 1,
				loadingStop: false,
				controlNoneMore: false,
				botDistance: 100,
				allLoaded: false,
				autoFill: false,
				loading: false,
				firstIn:false
			}
		},
		methods: {
			clickSec: function(index) {
				this.selectbg = index;
			},

			/*上拉加载*/
			loadMore() {
				// if(this.firstIn){
				// 	this.$refs.loadMore.style.display = "block";
				// setTimeout(() => {
				// 	this.pagesInfo.start += this.pagesInfo.pageSize;
				// 	this.getProductList(false);
				// }, 200);
				// }
			},
			prductDetail: function(index) {
				console.log(index);
				this.$router.push({
					query: {
						Id: index
					},
					path: '/productdetail'
				});
			},
			searchBtn() {
				// this.firstIn=true;
				// this.allProductList.splice(0, this.allProductList.length);
				// this.pagesInfo.start = 0;
				// this.$refs.noneMore.style.display = "none";
				// this.$refs.loadMore.style.display = "none";
				// this.getProductList(true);
			},
			backBtn(){
				this.$router.go(-1);
			},
			getProductList(catType) {
				// if(catType) {
				// 	Indicator.open({
				// 		text: '加载中...',
				// 		spinnerType: 'fading-circle'
				// 	});
				// }
				// let info = Object.assign({}, this.$store.state.generalInfo);
				// info = Object.assign(info, this.pagesInfo);
				// info.search = this.searchCon;
				// console.log("搜索条件", JSON.stringify(info));
				// getProductListBysearch(info).then(data => {
				// 	let {
				// 		errCode,
				// 		errMsg,
				// 		productList,
				// 		count
				// 	} = data;
				// 	if(errCode != 0) {
				// 		console.log(errCode);
				// 		Toast({
				// 			message: errMsg,
				// 			position: 'middle',
				// 			duration: 2000
				// 		});
				// 		Indicator.close();
				// 	} else {
				// 		console.log(productList);
				// 		this.allCount = count;
				// 		this.allProductList = this.allProductList.concat(productList);
				// 		Indicator.close();
				// 		if(count <= this.pagesInfo.pageSize) {
				// 			this.loading = true;
				// 			this.controlNoneMore = true;
				// 			this.$refs.noneMore.style.display = "block";
				// 		} else {
				// 			this.loading = false;
				// 			this.controlNoneMore = false;
				// 			this.$refs.loadMore.style.display = "block";
				// 		}
				// 		if((this.pagesInfo.start + this.pagesInfo.pageSize) >= this.allCount) {
				// 			this.loading = true;
				// 			this.controlNoneMore = false;
				// 			this.$refs.noneMore.style.display = "block";
				// 			this.$refs.loadMore.style.display = "none";
				// 		}
				// 	}
				// });
			},
		},
		mounted() {},
		// beforeRouteLeave(to, from, next) {
		// // 设置下一个路由的 meta
		// to.meta.keepAlive = false; // B 跳转到 A 时，让 A 缓存，即不刷新
		// next();
		//    }
		}
</script>

<style scoped>
	ul {
		list-style: none;
	}
	
	.con-top {
		padding: 5px;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 10;
		background: #fff;
	}
	/*.mint-search{
		height: 40px;
		width: 100%;
		padding: 0 50px;
		box-sizing: border-box;
	}
	.mint-search .mint-searchbar{
		margin-top: 2px;
		padding: 0;
	}
	.mint-searchbar-cancel{
		display: none;
	}
	.mint-searchbar-inner .mintui-search {
    font-size: 20px;
}*/
	/*.searchBtn{
	color: #fff;
	position: absolute;
		top: 0;
		right: 0;
	display: inline-block;
	height: 40px;
	text-align: center;
	line-height: 40px;
	width: 50px;
}*/
	
	.search-con {
		height: 42px;
		background: #fff;
		width: 100%;
		text-align: center;
	}
	
	.search-con div {
		width: 30%;
		height: 24px;
		display: inline-block;
		text-align: center;
		margin-top: 9px;
		border: 1px solid #666;
	}
	
	.search-con .clickred {
		border-color: #ab0923;
		color: #ab0923;
	}
	
	.content:after {
		display: block;
		clear: both;
		content: "";
		visibility: hidden;
		height: 0
	}
	
	.content {
		zoom: 1;
		padding-top: 5px;
		box-sizing: border-box;
		min-height: 100vh;
	}
	
	ul:after {
		display: block;
		clear: both;
		content: "";
		visibility: hidden;
		height: 0
	}
	
	.item img {
		width: 100%;
	}
	
	.item-title {
		padding: 0 1%;
		margin: 5px 2px 2px;
		font-size: 12px;
		height: 30px;
		line-height: 15px;
		overflow: hidden;
		color: #666;
		font-size: 12px;
	}
	
	.price {
		padding: 0 1%;
		color: #c7000a;
		;
		float: left;
		height: 30px;
	}
	
	.shoppingCart {
		float: right;
		margin-right: 5px;
	}
	
	.focusbg {
		background: #ff4949;
		color: #fff;
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
</style>