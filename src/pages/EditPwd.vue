<template>
	<section>
			<mt-header title="修改密码" fixed style="height: 45px;background: #c7000a;font-size: 18px;    font-weight: 400;">
			<router-link to="/myData" slot="left">
				<mt-button icon="back"></mt-button>
			</router-link>
		</mt-header>
		<div class="content">
			<mt-field label="" placeholder="请输入用户名" v-model="editPwdInfo.username"></mt-field>
			<mt-field label=""  type="password" placeholder="请输入新密码" v-model="editPwdInfo.userInfo.password"></mt-field>
			<!--<mt-field label="" placeholder="图片验证码" v-model="editPwdInfo.captcha">
  <img src="http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIkJkHnicIuroMeMr72oUh9UaboR5A8Dd5iagpRySe9dn7zf7O0iafuDuE56wREJl9h8dZx47c2OmV4g/0" height="45px" width="100px">
</mt-field>-->
	<mt-field label="" placeholder="短信验证码" v-model="editPwdInfo.userInfo.SMSCode">
  <!--<mt-button type="default"  size="small">获取验证码</mt-button>-->
  <mt-button type="default"  size="small" @click="getCode" :disabled="btnControl" style="width: 100px;margin-left: 10px;">{{getInfo}}</mt-button>
</mt-field>
<mt-button type="default" style="margin-top: 20px;"  size="large" @click="resetPwd">重置</mt-button>
		</div>
	</section>
</template>

<script>
	// import { updatePassword ,getSMSCode} from "../js/api"
	import { Toast } from 'mint-ui';
	export default {
		name: 'EditPwd',
		data() {
			return {
				getInfo:'获取验证码',
			btnControl:false,
			editPwdInfo:{
				username:"",
				userInfo:{
					SMSCode:"",
					password:""
				},
				username:"",
				captcha:"",
				SMSCode:"",
				chaZhi:"",
				justify:""
			}
			}
		},
		methods: {
			getCode(){
// 			if(/^1[0-9]{10}$/.test(this.editPwdInfo.username)){
// 				getSMSCode({username:this.editPwdInfo.username}).then(data => {
// 					console.log(data);
// 					let {
// 						errCode,
// 						errMsg
// 					} = data;
// 					if(errCode != 0) {
// 						Toast({
// 					  message: errMsg,
// 					  position: 'middle',
// 					  duration: 2000
// 					});
// 					} else {
// 			localStorage.setItem('editPwdtimeInterval', JSON.stringify({time:new Date().getTime()+60000}));
// 			this.timeMon=JSON.parse(localStorage.getItem("editPwdtimeInterval"))
// 			let justify=setInterval(()=>{
// //					var chaZhi=Math.ceil((this.timeMon.time-(new Date()).getTime())/1000);
// //					if(chaZhi>0){
// //					this.btnControl=true;
// //					this.getInfo=chaZhi+'s';
// //				}else{
// //					clearInterval(justify);
// //					this.btnControl=false;
// //					this.getInfo='获取验证码';
// //				}
// 				this.getCodeTiem();
// 				},200);
// 					}
// 				});
// 			}else{
// 				Toast({
// 				  message: '手机号格式有误',
// 				  position: 'middle',
// 				  duration: 2000
// 				});
// 			}	
		},
		getCodeTiem(){
			// this.chaZhi=Math.ceil((this.timeMon.time-(new Date()).getTime())/1000);
			// 		if(this.chaZhi>0){
			// 		this.btnControl=true;
			// 		this.getInfo=this.chaZhi+'s';
			// 	}else{
			// 		clearInterval(this.justify);
			// 		this.btnControl=false;
			// 		this.getInfo='获取验证码';
			// 	}
		},
		resetPwd(){
			// updatePassword(this.editPwdInfo).then(data => {
			// 		let {
			// 			errCode,
			// 			errMsg
			// 		} = data;
			// 		if(errCode != 0) {
			// 			Toast({
			// 		  message: errMsg,
			// 		  position: 'middle',
			// 		  duration: 2000
			// 		});
			// 		} else {
			// 			let instance = Toast({
			// 		  message: "密码修改成功",
			// 		  position: 'middle'
			// 		});
			// 				setTimeout(() => {
			// 				  instance.close();
			// 				  this.$router.push("/mine");
			// 				}, 800);
						
			// 		}
			// 	});
		},

		},
		mounted() {
			// this.timeMon=JSON.parse(localStorage.getItem("editPwdtimeInterval"))
			// if(!this.timeMon){
			// 	this.btnControl=false;
			// }else{
			// 	this.getCodeTiem();
			// 	this.justify=setInterval(()=>{
			// 		this.getCodeTiem();
			// 	},1000);
				
				
			// }
		}
	}
</script>

<style scoped>
	section{
		height:100vh;
		background: #f1f1f1;
		overflow: hidden;
	}
	.content{
		width: 98%;
		margin: 55px auto 0;
		border-radius:3px ;
		
	}
</style>



