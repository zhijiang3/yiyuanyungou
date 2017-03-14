<template>
	<div class="formWrap">
		<form>
			<h3>商品名字:</h3>
			<input type="text" v-model="modiName" required>
			<h3>总价:</h3>
			<input type="text" v-model.number="modiMoney" required pattern="[0-9]*">
			<h3>图片名字(含后缀):</h3>
			<select v-model="modiPath" required>
				<option></option>
				<option v-for="path in 20" v-bind:value="'shopping'+path+'.jpg'">{{"shopping"+path+".jpg"}}</option>
			</select>
			<button @click="createModi">提交</button>
		</form>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				modiName: '',
				modiMoney: '',
				modiPath: '',
				modiId: 6
			}
		},
		props: {
			globalData: {
	      type: Object
	    }
		},
		methods: {
			createModi () {
				if (this.modiName == '' || this.modiMoney == '' || this.modiPath == '' || typeof this.modiMoney !== 'number') {
					return false;
				}	else {

					// 创建日期
					let date = new Date();
					let timeArr = [
						date.getFullYear(),
						date.getMonth() + 1,
						date.getDate(),
						date.getHours(),
						date.getMinutes(),
						date.getSeconds()
					];

					timeArr = timeArr.map(item => (item > 10 ? item : "0" + item)).join("");

					let newModi = {
						"title": this.modiName,
						"price": this.modiMoney,
						"img": this.modiPath,
						"commodityId": this.modiId++,
						"rest": this.modiMoney,
						"type": 1,
						"finalCode": '',
						"createTime": timeArr,
						"doneTime": ''
					};

					this.modiName = '';
					this.modiMoney = '';
					this.modiPath = '';
					this.globalData.commodity.push(newModi);

					// 路由跳转
					this.$router.replace({
						path: '/done'
					});
					return;
				}
			}
		},
		created () {
			this.$emit('routerTitleEvent','发布商品');
		}
	}
</script>

<style scoped>
	input,
	select {
		outline: 0;
	}

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
</style>