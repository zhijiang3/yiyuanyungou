<template>
	<div id="done">
			<div id="ok-wrap">
				<span class="glyphicon glyphicon-ok ok"></span>
			</div>

			<p class="addDone">添加成功</p>

			<div class="btns">
				<p class="btn"><router-link to="/postshop">继续发布</router-link></p>
				<p class="btn"><router-link to="/home">完成</router-link></p>
			</div>
	</div>
</template>

<script>
	export default {
		created () {
			this.$emit('routerTitleEvent','发布详情');
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

	#done .addDone{
		text-align: center;
		margin-top: 10px;
		font-size: 18px;
		color: #9b9696;
	}

	#done .btn{
		background-color: rgb(197,43,43);
		border: none;
		display: block;
		width: 80%;
		height: 45px;
		line-height: 45px;
		margin: 20px auto;
		color: #fff;
		font-size: 16px;
		text-align: center;
	}
	
	#done .btns{
		margin-top: 50px;
	}

	a{
		color: #fff;
	}
</style>