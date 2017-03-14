<template>
  <div id="done">
      <div id="ok-wrap">
        <span class="glyphicon glyphicon-ok ok"></span>
      </div>

      <p class="addDone">添加成功</p>

      <div class="btns">
        <p class="btn goOn"><router-link to="/postshop">继续发布</router-link></p>
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
    background-color: #ffffff;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 auto;
  }

  .ok{
    font-size: 50px;
    color: #c62f2f;
    margin: 23px 0 0 25px;
  }

  #done .addDone{
    text-align: center;
    margin-top: 15px;
    font-size: 18px;
    color: #999999;
  }

  #done .btn a{
    color: #c62f2f;
    border: none;
    display: block;
    padding: 10px 0;
    font-size: 16px;
    margin-top: 20px;
    border: 1px solid #c62f2f;
  }
  
  #done .btns{
    text-align: center;
    padding: 20px 20px 0;
  }

  #done .btn {
    background-color: #ffffff;
  }

  #done .btns .goOn a{
    border: 1px solid #cccccc;
    color: #999999;
  }

  #done .btn a:active{
    background: rgba(240, 240, 240, 0.8);
  }
</style>