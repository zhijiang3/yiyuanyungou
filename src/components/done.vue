<template>
	<div id="done">
			<div id="ok-wrap">
				<span class="glyphicon glyphicon-ok ok"></span>
			</div>
			<p>添加成功</p>

			<button><router-link to="/postshop">继续发布</router-link></button>
			<button><router-link to="/home">完成</router-link></button>
	</div>
</template>

<script>
	export default {
		created () {
			this.$emit('routerTitleEvent','交易详情');
		}
	}
</script>

<style scoped>
	#done{
		padding: 20px 0;
	}
	#ok-wrap{
		background-color: rgb(197,47,47);
		width: 100px;
		height: 100px;
		border-radius: 50%;
		margin: 0 auto;
	}
	.ok{
		font-size: 50px;
		color: #fff;
		margin: 23px 0 0 25px;
	}
	#done > p{
		text-align: center;
		margin-top: 10px;
		font-size: 18px;
		color: #9b9696;
	}
	#done button{
		background-color: #fff;
		border: none;
		display: block;
		width: 80%;
		height: 50px;
		line-height: 50px;
		border: 1px solid black;
		margin: 20px auto;
		font-size: 16px;
	}
	#done button:nth-of-type(1){
		margin-top: 50px;
	}
	a{
		color: black;
	}
</style>