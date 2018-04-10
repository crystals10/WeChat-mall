<template>
	<section class="myData">
		<!--<mt-header title="个人资料" fixed style="height: 45px;background: #c7000a;font-size: 18px;    font-weight: 400;">
			<router-link to="/mine" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>-->
		<mt-header title="个人资料" fixed style="height: 45px;background: #c7000a;font-size: 18px;    font-weight: 400;">
			<router-link to="/mine" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="content">
			<div class="head-portrait">头像<img src="../assets/images/touxiang.jpg" /></div>
			<mt-cell title="手机号" value="11111111111"></mt-cell>
			<mt-cell title="密码" value="修改密码" to="/editPwd" is-link></mt-cell>
			<mt-button style="margin-top: 20px;" size="large" @click="exitLogin">退出登录</mt-button>
		</div>
		
	</section>
</template>
<script>
	export default {
		name: 'MyData',
		data() {
			return {

			}
		},
		methods: {
		exitLogin:function(){
			// window.localStorage.removeItem('wxlocalaccess-user');
			this.$router.push({
					path: '/login'
				});
		}

		},
		mounted() {
			
		}
	}
</script>

<style scoped>
	.myData .content{
		width: 100%;
		height:100vh;
		border-radius:3px ;
		position: absolute;
		top:50px;
		left: 0;
		background: #f1f1f1;
	}
	.head-portrait{
		    height: 70px;
    line-height: 70px;
    padding: 0 10px;
    background: #fff;
    /*border-bottom: 1px solid #e8e8e8;*/
	}
	.mint-cell-wrapper{
		border-bottom: 1px solid #e8e8e8;
	}
	.head-portrait img{
		float: right;
    height: 50px;
    margin-top: 10px;
	}
</style>