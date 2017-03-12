<template>
  <div id="home">
    <banner :globalData="globalData"></banner>
    <p>阿斯顿马丁</p>
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
  }
};
</script>