<template>
	<div class="formWrap">
		<h3>商品名字:</h3>
		<input type="text" v-model="modi.modiName" @focus='reset'> 
		<h3>总价:</h3>
		<input type="text" v-model.number="modi.modiMoney" @focus='reset'>
		<h3>图片名字(含后缀):</h3>
		<select v-model="modi.modiPath" @focus='reset'>
			<option></option>
			<option v-for="path in 20" v-bind:value="'shopping'+path+'.jpg'">{{"shopping"+path+".jpg"}}</option>
		</select>
		<p v-text='errorText' class="error"></p>
		<button @click="createModi">提交</button>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				modi:{
					modiName: '',
					modiMoney: '',
					modiPath: '',
					modiId: 6,
				},
				errorText: ''
			}
		},
		props: {
			globalData: {
	      type: Object
	    }
		},
		methods: {
			createModi () {
				if (this.modi.modiName == '') {
						this.errorText = '商品名字选项没填!';
						return false;
				}	else if (this.modi.modiMoney == '') {
						this.errorText = '总价选项没填!';
						return false;
				}	else if (typeof this.modi.modiMoney !== 'number') {
						this.errorText = '总价必须是数字!';
						return false;
				}	else if (this.modi.modiPath == '') {
						this.errorText = '图片名字没选!';
						return false;
				}	else {
					// 创建日期
					let date = new Date();
					let times = [
						date.getFullYear(),
						date.getMonth(),
						date.getMonth(),
						date.getDate(),
						date.getHours(),
						date.getMinutes(),
						date.getSeconds(),
						date.getSeconds()
					]
					let curDate = times.map(function(item) {
						return item >= 10? item: '0' + item;
					}).join('');

					let newModi = {
						"title": this.modi.modiName,
						"price": this.modi.modiMoney,
						"img": this.modi.modiPath,
						"commodityId": this.modi.modiId++,
						"rest": this.modi.modiMoney,
						"type": 1,
						"finalCode": '',
						"createTime": curDate,
						"doneTime": ''
					};

					this.modi.modiName = '';
					this.modi.modiMoney = '';
					this.modi.modiPath = '';
					this.globalData.commodity.push(newModi);

					// 路由跳转
					this.$router.replace({
						path: '/done'
					});
					return;
				}
			},
			reset () {
				this.errorText = '';
			}
 		},
		created () {
			this.$emit('routerTitleEvent','发布商品');
		}
	}
</script>

<style scoped>
	.formWrap{
		padding:0 20px;
	}
	.formWrap input{
		width: 100%;
		height: 30px;
	}
	.formWrap h3{
		margin: 15px 0;
		font-weight: normal;
		font-size: 16px;
	}
	.formWrap button{
		width: 100%;
		height: 40px;
		background-color: rgb(198,47,47);
		border: none;
		margin: 15px 0px;
		color: #fff;
	}
	.formWrap select{
		width: 100%;
    height: 30px;
	}
	.error{
		color: rgb(197,43,43);
		margin-top: 15px;
	}
</style>