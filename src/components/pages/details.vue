<template>
  <div>
    <div class="box">
      <img :src="item" alt="" v-for="(item,index) in shopDes" :key="index">
    </div>
  </div>
</template>
<script>
export default {
  props:['shopDes']
}
</script>
<style lang="stylus" scoped>
  .box
    padding 0 0.3rem
    img 
      width 100%
</style>