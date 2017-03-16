<template>
  <div id="myShopping">
    
    <div :key=" 'shopping_' + key " v-for="(type, key) in commodityType" key="div">

      <h2
        class="title"
        v-show="type.length > 0"
        v-text="getTitleOfCommodityType(key)"></h2>

      <transition-group name="flip-list-box" tag="div">

      <div class="box" :key=" 'box_' + commodity.commodityId " v-for="commodity in type">
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
                <span class="red" v-if="commodity.type == -1" v-text="commodity.finalCode"></span>
                <span class="red" v-if="commodity.type == 1" v-text=" '待开奖' "></span>
                <span class="red" v-if="commodity.type == 0" v-text=" timeOut['timeOut_' + commodity.commodityId] + ' 秒' "></span>
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
                  @click.prevent.stop="showBuy(commodity.commodityId)">继续云购</a>
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

      </transition-group>
    </div>

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
      buyCommodity: [],
      buy: {
        show: false,
        commodityId: -1
      },
      commodityType: {
        open: [],
        wait: [],
        done: []
      },
      timeOut: {

      },
      time: 60,
      userId: 1
    };
  },
  props: {
    globalData: {
      type: Object
    }
  },
  components: {
    "buy": require("@/components/buy.vue")
  },
  created() {
    this.$emit("routerTitleEvent", "我的云购");
  },
  mounted() {
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
      this.buyCommodity = [];

      this.globalData.mixin.forEach(function(item, index, arr) {
        item.busers.forEach(function(bItem, bIndex, bArr) {
          if (bItem.userId == self.userId) { // 这个商品是我买的

            // 深复制一份
            var commodity = self.findCommodity(item.commodityId);
            var shop = {};

            for(let item in commodity) {
              shop[item] = commodity[item];
            }

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
      for (let i in this.commodityType) {
        this.commodityType[i] = [];
      }
      var typeName = "";

      this.buyCommodity.forEach(function(item, index, arr) {
        switch (item.type) {
          case 0:
            typeName = "open";
            self.getCountDown(item.commodityId);
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
      var self = this;
      this.filterNotMyCommodity();
      this.commodityClassify();
      this.sortShopping();
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
    formatTime(time) { // 根据结束时间格式化
      var year = time.slice(0, 4);
      var month = time.slice(4, 6);
      var day = time.slice(6, 8);
      var hours = time.slice(8, 10);
      var min = time.slice(10, 12);
      var sour = time.slice(12);

      var time = new Date( year+"-"+month+"-"+day+" "+hours+":"+min+":"+sour );
      return time;
    },
    getCountDown(commodityId) {
      var self = this;
      var nowTime = new Date();
      var commodity = this.findCommodity(commodityId);
      var doneTime = this.formatTime(commodity.doneTime);
      var diffTime = nowTime.getTime() - doneTime;
      var timeOut = Math.round(self.time - diffTime / 1000);

      this.$set(this.timeOut, "timeOut_" + commodityId, Math.max(0, timeOut));

      (function getResult() {
        setTimeout(function() {
          nowTime = new Date();
          diffTime = nowTime.getTime() - doneTime;
          timeOut = Math.round(self.time - diffTime / 1000);

          if (timeOut <= 0) {
            commodity.type = -1;
            commodity.finalCode = Math.round(Math.random() * commodity.price + 1);
            self.initMyShop();
            return ;
          }

          self.timeOut['timeOut_' + commodityId] = timeOut;
          getResult();
        }, 1000);
      } ());
    },
    sortShopping() {
      var self = this;

      for(let item of Object.keys(this.commodityType)) {
        if (item == "wait") {
          self.commodityType[item] = self.commodityType[item].sort((item1, item2) => (1 - item2.rest / item2.price) - (1 - item1.rest / item1.price));
        } else {
          self.commodityType[item] = self.commodityType[item].sort((item1, item2) => item2.doneTime - item1.doneTime);
        }
      }
    },
    lucky(luckyCode, finalCode) {
      return luckyCode.some(function findCode(code) {
        return code === finalCode
      });
    },
    showBuy(commodityId) { // 继续云购
      this.buy.commodityId = commodityId;
      this.buy.show = true;
    },
    closeBuy() {
      this.buy.show = false;
    },
    updateData() {
      this.initMyShop();
    }
  },
  directives: {
    setWidth(el, binding) { // 设置进度条指令
      var count = (1 - binding.value.rest / binding.value.price) * 100;
      el.style.width = count.toFixed(2) + "%";
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
    transition: width 0.3s;
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
  
  .b-e,
  .b-l-a {
    opacity: 0;
  }

  .b-e-a,
  .b-l-a {
    transition: opacity 0.4s;
  }

  .flip-list-move {
    transition: transform 1s;
  }

  .flip-list-box-move {
    transition: transform 1s;
  }

</style>