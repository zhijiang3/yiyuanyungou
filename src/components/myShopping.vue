<template>
  <div id="myShopping">
    <div v-for="(type, key) in commodityType" key="div">

      <h2
        class="title"
        v-show="type.length > 0"
        v-text="getTitleOfCommodityType(key)"></h2>

      <div class="box" v-for="commodity in type">
        <p class="boxTitle" v-text="commodity.title"></p>
        <div class="boxImg"><img :src="'./static/img/commodity/' + commodity.img"></div>
        <div class="boxContent">
          
          <p class="progressBar">
            <span
              v-setWidth="{
                price: commodity.price,
                rest: commodity.rest}"
              class="progressBarInner"></span>
          </p>
          
          <div class="inner clearfix">

            <div class="right">
              <p class="countDown">
                结果: 
                <span
                  class="red"
                  v-setCountDown="{
                    finalCode: commodity.finalCode,
                    rest: commodity.rest,
                    type: commodity.type,
                    luckyCode: commodity.mine.luckyCode }"></span>
              </p>
              <div class="button clearfix" :class="{ disabled: (commodity.rest == 0) }">
                <a
                  v-if="(commodity.rest == 0)"
                  class="link"
                  href=""
                  key="disabled"
                  @click.prevent.stop>继续云购</a>
                <a
                  v-else
                  class="link"
                  href=""
                  key="notdisabled"
                  @click.prevent.stop="click">继续云购</a>
                <span class="spacer"></span>
                <i class="cart glyphicon glyphicon-shopping-cart"></i>
              </div>
            </div>

            <div class="left">
              <p>已购: <span class="blue">{{ commodity.mine.total }}</span></p>
              <p>剩余: <span class="red">{{ commodity.rest }}</span></p>
              <p>总需: <span>{{ commodity.price }}</span></p>
            </div>
            
          </div>

        </div>
        <div class="final" v-if="lucky(commodity.mine.luckyCode, commodity.finalCode)">中奖</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buyCommodity: [],
      commodityType: {
        open: [],
        wait: [],
        done: []
      },
      userId: ""
    };
  },
  props: {
    globalData: {
      type: Object
    }
  },
  created() {
    this.$emit("routerTitleEvent", "我的云购");
  },
  mounted() {
    this.userId = this.$route.params.userId;
    this.initMyShop();
  },
  methods: {
    findCommodity(commodityId) { // 根据商品id返回该商品数据
      var self = this;
      var shop = {};

      shop = this.globalData.commodity.filter(function(item, index, arr) {
        return item.commodityId == commodityId;
      });

      return shop[0];
    },
    filterNotMyCommodity() { // 过滤掉不是"我"购买的商品
      var self = this;

      this.globalData.mixin.forEach(function(item, index, arr) {
        item.busers.forEach(function(bItem, bIndex, bArr) {
          if (bItem.userId == self.userId) { // 这个商品是我买的

            var shop = self.findCommodity(item.commodityId);

            shop.mine = {
              "total": bItem.total,
              "luckyCode": bItem.luckyCode
            };

            self.buyCommodity.push(shop)
          }
        });
      });
    },
    commodityClassify() { // 商品分类
      var self = this;
      var typeName = "";

      this.buyCommodity.forEach(function(item, index, arr) {

        switch (item.type) {
          case 0:
            typeName = "open";
            break;
          case 1:
            typeName = "wait";
            break;
          case -1:
            typeName = "done";
            break;
          default :
            typeName = "done";
        }

        self.commodityType[typeName].push(item);

      });
    },
    initMyShop() { // 初始化"我"的商品
      this.filterNotMyCommodity();
      this.commodityClassify();
    },
    getTitleOfCommodityType(key) { // 根据传入参数获取标题
      var typeName = "";

      switch (key) {
        case "open":
          typeName = "即将开奖";
          break;
        case "wait":
          typeName = "等待开奖";
          break;
        case "done":
          typeName = "已经开奖";
          break;
        default :
          typeName = "已经开奖";
      }

      return typeName;
    },
    lucky(luckyCode, finalCode) {
      return luckyCode.some(function findCode(code) {
        return code === finalCode
      });
    }
  },
  directives: {
    setWidth(el, binding) { // 设置进度条指令
      var count = (1 - binding.value.rest / binding.value.price) * 100;
      el.style.width = count.toFixed(2) + "%";
    },
    setCountDown(el, binding) { // 设置结果指令
      var self = this;
      var timeOut = 60;

      function findCode(code) {
        return code === binding.value.finalCode;
      }

      switch (binding.value.type) {
        case -1:
          el.innerHTML = binding.value.finalCode;
          break;

        case 1:
          el.innerHTML = "待开奖";
          break;

        case 0:
          if (binding.value.rest === 0){
            if (el.timeOut != undefined) {
              return ;
            }
            el.timeOut = timeOut;

            // 倒计时
            (function countDown() {
              el.innerHTML = --el.timeOut + "秒";

              if (el.timeOut <= 0) {
                // 执行倒计时结束事件
                return ;
              }

              setTimeout(function() {
                countDown();
              }, 1000);
            })();
          } else {

            el.innerHTML = "错误";
          }
          break;
      }
    }
  }
}
</script>

<style scoped>

  .clearfix:after {
    content: " ";
    display: block;
    overflow: hidden;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  #myShopping {
    padding: 0 10px;
  }

  #myShopping .red {
    color: #c62f2f;
  }

  #myShopping .blue {
    color: #539ddb;
  }

  #myShopping .title {
    color: #c62f2f;
    font-weight: normal;
    font-size: 14px;
    margin: 10px 0;
  }

  #myShopping .box {
    position: relative;
    z-index: 0;
    overflow: hidden;
    padding: 15px 10px;
    background-color: #ffffff;
    margin-bottom: 15px;
    -webkit-box-shadow: 0 2px 5px 0 #ccc;
    box-shadow: 0 2px 5px 0 #ccc;
  }

  #myShopping .final {
    position: absolute;
    right: 0;
    top: 0;
    text-align: center;
    padding: 4px 0;
    width: 152px;
    display: block;
    color: #ffffff;
    font-size: 14px;
    -webkit-transform: rotate(44deg) translate(42px, -25px);
    -ms-transform: rotate(44deg) translate(42px, -25px);
    -o-transform: rotate(44deg) translate(42px, -25px);
    transform: rotate(44deg) translate(42px, -25px);
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.3);
    background: #c62f2f;
  }

  #myShopping .box .boxTitle {
    color: #333333;
    font-size: 14px;
    margin-bottom: 5px;
  }

  #myShopping .box .boxContent {
    margin-right: 85px;
    padding-right: 10px;
  }

  #myShopping .box .inner {
    margin-top: 15px;
  }

  #myShopping .box .boxContent .inner .left p {
    margin-bottom: 5px;
  }

  #myShopping .box .inner .left {
    margin-right: 110px;
  }
  
  #myShopping .box .inner .right {
    float: right;
    width: 100px;
  }

  #myShopping .box .inner .right .button {
    color: #ffffff;
    font-size: 12px;
    background-color: #c62f2f;
    margin-top: 7px;
  }
    
  #myShopping .right .button .link,
  #myShopping .right .button .cart,
  #myShopping .right .button .spacer {
    float: left;
  }

  #myShopping .right .button .link:active,
  #myShopping .right .button .cart:active {
    background-color: rgba(255, 255, 255, 0.2);
  }

  #myShopping .right .button .link {
    color: #ffffff;
    padding: 8px 10px;
  }

  #myShopping .right .button .cart {
    padding: 9px 9px;
    cursor: pointer;
  }

  #myShopping .right .button .spacer {
    height: 16px;
    width: 2px;
    background-color: #fff;
    margin: 8px 0;
  }

  #myShopping .box .boxContent .progressBar,
  #myShopping .box .boxContent .progressBar .progressBarInner {
    height: 10px;
    border-radius: 10px;
    display: block;
  }

  #myShopping .box .boxContent .progressBar {
    background-color: #8d8d8d;
    margin: 0 auto 5px;
  }

  #myShopping .box .boxContent .progressBar .progressBarInner {
    background-color: #c62f2f;
    max-width: 100%;
    min-width: 2%;
  }

  #myShopping .box .boxContent p {
    color: #999999;
    font-size: 12px;
  }

  #myShopping .box .boxContent .countDown {
    font-size: 14px;
  }

  #myShopping .box .boxImg {
    width: 85px;
    height: 85px;
    overflow: hidden;
    float: right;
  }

  #myShopping .box .boxImg img {
    width: 100%;
  }

  #myShopping .box .inner .right .disabled {
    background-color: #aaaaaa;
  }

  #myShopping .box .inner .right .disabled .link,
  #myShopping .box .inner .right .disabled .cart {
    cursor: not-allowed;
  }


</style>