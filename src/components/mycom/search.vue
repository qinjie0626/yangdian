<template>
  <div>
    <div class="search">
      <input type="text" placeholder="请输入您要搜索的物品" />
      <van-icon name="search" class="icon" size="0.44rem" />
    </div>
  </div>
</template>
<script>
export default {
    
}
</script>
<style lang="stylus" scoped>
    .search
        position relative
        width 5.2rem
        height 0.64rem
        background rgba(255,255,255,.8)
        border-radius 0.12rem
        margin 0.28rem auto 0
        input 
            border none 
            background transparent
            width 100%
            height 100%
            line-height 0.64rem
            padding 0 0.2rem
            font-size 0.2rem
        .icon
            position absolute
            right 0.16rem
            top 0.08rem
</style>