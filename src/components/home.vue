<template>
  <div id="home">
    <banner :globalData="globalData"></banner>
    <p class="allmodi">所有商品</p>

    <ul key="modi-ul">
      <transition-group name="modi-list" tag="li">
      <div class="item-wrap clearfix" :key=" 'modi_' + item.commodityId " v-for="item in commoditys">
        <div class="item-right right">
          <img :src="'./static/img/commodity/'+ item.img">            
        </div>
        <div class="item-left clearfix">
          <p class="title" v-text="item.title"></p>
          <p class="progress-wrap">
            <span class="progress" v-setWidth="{
              price:item.price,
              rest:item.rest
              }"></span>
          </p>
          <div class="bottom">
            <div class="button right">
              <a
                  class="link"
                  href=""
                  @click.prevent.stop="showBuy(item.commodityId)">立刻1元云购</a>
               <span class="spacer"></span>
              <i class="cart glyphicon glyphicon-shopping-cart"></i>
            </div>
            <div class="need left">
              <p>剩余: <span class="red" v-text="item.rest"></span></p>
              <p>总需: <span v-text="item.price"></span></p>
            </div>
          </div>
        </div>
      </div>
      </transition-group>
    </ul>

    <transition
      name="buy"
      enter-class="b-e"
      leave-class="b-l"
      enter-active-class="b-e-a"
      leave-active-class="b-l-a">

    <buy
      v-if="buy.show"
      @closeBuy="closeBuy"
      @updateData="updateData"
      :id="buy.commodityId"
      :userId="userId"
      :globalData="globalData"></buy>

    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      commoditys: {

      },
      buy: {
        show: false,
        commodityId: -1
      },
      userId: 1
    };
  },
  components: {
    "banner": require("@/components/banner.vue"),
    "buy": require("@/components/buy.vue")
  },
  props: {
    globalData: {
      type: Object
    }
  },
  methods: {
    init() {
      this.filterCommodity();
      this.sortCommodity();
    },
    filterCommodity() {
      this.commoditys = this.globalData.commodity.filter(item => item.type == 1);
    },
    sortCommodity() {
      this.commoditys = this.commoditys.sort((item1, item2) => item2.createTime - item1.createTime);
    },
    showBuy(id) {
      this.buy.commodityId = id;
      this.buy.show = true;
    },
    closeBuy() {
      this.buy.show = false;
    },
    updateData() {
      this.init();
    }
  },
  directives: {
    setWidth (el,bind) {
      let count = (1 - bind.value.rest / bind.value.price) * 100;
      el.style.width = count.toFixed(2)+'%';
    }
  },
  created() {
    this.$emit("routerTitleEvent", "首页");
    this.init();
  }
};
</script>

<style scoped>

  .item-wrap .title {
    color: #333333;
    font-size: 14px;
  }

  .item-wrap .item-left {
    margin-right: 95px;
  }

  .item-wrap .item-right {
    width: 85px;
    height: 85px;
    overflow: hidden;
  }

  .item-wrap .item-right img {
    display: block;
    width: 100%;
  }

  .bottom .button {
    color: #ffffff;
    font-size: 12px;
    background-color: #c62f2f;
  }
    
  .bottom .button .link,
  .bottom .button .cart,
  .bottom .button .spacer {
    float: left;
  }

  .button .link:active,
  .button .cart:active {
    background-color: rgba(255, 255, 255, 0.2);
  }

  .button .link {
    color: #ffffff;
    padding: 8px 8px;
  }

  .button .cart {
    padding: 9px 6px;
    cursor: pointer;
  }

  .bottom .button .spacer {
    height: 16px;
    width: 1px;
    background-color: #fff;
    margin: 8px 0;
  }

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
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 14px;
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
    min-width: 2%;
    transition: width 0.3s;
  }

  .item-wrap{
    margin: 0 10px 15px;
    padding: 15px 8px;
    background-color: #fff;
  }

  .bottom{
    margin-top: 15px;
  }

  .left{
    float: left;
  }

  .right{
    float: right;
  }

  .need{
    color: rgb(176,176,176);
    font-size: 12px;
  }

  .red{
    color: rgb(197,47,47);
  }

  .b-e,
  .b-l-a {
    opacity: 0;
  }

  .b-e-a,
  .b-l-a {
    transition: opacity 0.4s;
  }

  .modi-list-move {
    transition: transform 0.4s;
  }
</style>