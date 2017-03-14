<template>
  <div id="home">
    <banner :globalData="globalData"></banner>
    <p class="allmodi">所有商品</p>
    <ul>
      <li class="item-wrap clearfix" v-for="item in globalData.commodity">
        <div class="item-left left">
          <p v-text="item.title"></p>
          <p class="progress-wrap">
            <span class="progress" v-setWidth="{
              price:item.price,
              rest:item.rest
              }"></span>
          </p>
          <div class="bottom">
            <div class="need left">
              <p>剩余：<span class="red" v-text="item.rest"></span></p>
              <p>总需：<span v-text="item.price"></span></p>
            </div>
            <button>立刻一元云购 |</button>
          </div>
        </div>
          <div class="item-right right">
            <img :src="'./static/img/commodity/'+ item.img">            
          </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  components: {
    "banner": require("@/components/banner.vue")
  },
  props: {
    globalData: {
      type: Object
    }
  },
  created() {
    this.$emit("routerTitleEvent", "首页");
  },
  directives: {
    setWidth (el,bind) {
      let count = (1 - bind.value.rest / bind.value.price) * 100;
      el.style.width = count.toFixed(2)+'%';
    }
  }
};
</script>

<style scoped>
  .clearfix:after{
    content: " ";
    display: block;
    overflow: hidden;
    height: 0;
    clear: both;
    visibility: hidden;
  }
  .allmodi{
    color: rgb(198,47,47);
    margin-top: 15px;
    padding-left: 10px;
  }
  .progress-wrap{
    height: 10px;
    border-radius: 10px;
    margin: 5px 0;
    background-color: #8d8d8d;
  }
  .progress{
    background-color: rgb(197,47,47);
    display: block;
    border-radius: 10px;
    height: 10px;
    max-width: 100%;
  }
  .item-wrap{
    margin: 15px 10px;
    padding: 15px 10px;
    background-color: #fff;
  }
  .item-left{
    width: 210px;
  }
  .item-right{
    width: 110px;
  }
  .item-right img{
    width: 100%;
    max-width: 100%;
  }
  .bottom{
    margin-top: 15px;
  }
  .bottom button{
    margin-top: 3px;
    background-color: rgb(197,47,47);
    color: #fff;
    padding: 5px 30px 5px 5px;
    float: right;
    border: none;
    /*background-image: url('../../static/img/home/shoppcar.png');*/
    background-repeat: no-repeat;
    background-position: 100px center;
  }
  .left{
    float: left;
  }
  .right{
    float: right;
  }
  .need{
    color: rgb(176,176,176);
    font-size: 13px;
  }
  .red{
    color: rgb(197,47,47);
  }
</style>