<template>
  <div>
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(item,index) in msg" :key="index">
          <img :src="item" alt />
        </div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
export default {
  updated() {
    this.$nextTick(()=>{
      let swiper = new Swiper(".swiper-container", {
      loop: true,
      autoplay: true,
      pagination: {
        el: ".swiper-pagination"
      },
      observer:true,
      observeParents:true
    });
    })
  },
  props:['msg'],
};
</script>
<style lang="stylus" scoped>
.swiper-container {
  width: 100%;
  height: 100%;
  z-index 0
}

.swiper-slide {
  text-align: center;
  font-size: 18px;

  img {
    width: 5.74rem;
    height: 100%;
  }
}
</style>