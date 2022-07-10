<template>
  <div>
    <van-nav-bar title="我的收藏">
      <van-icon
        slot="left"
        name="arrow-left"
        @click="$router.back()"
      ></van-icon>
    </van-nav-bar>
    <homeitem
      v-for="(item, index) in collects"
      :key="index"
      :item="item"
    ></homeitem>
  </div>
</template>

<script>
import { mycollect } from '@/api/user'
import homeitem from '@/components/homeitem'
export default {
  created() {
    this.mycollects()
  },
  data() {
    return {
      collects: [],
    }
  },
  methods: {
    async mycollects() {
      try {
        this.$toast.loading('加载中...')
        const { data } = await mycollect()
        console.log(data)
        this.collects = data.body
        this.$toast.success('加载成功')
      } catch (e) {
        console.log(e)
        this.$toast.fail('加载失败，请稍后重试')
      }
    },
  },
  computed: {},
  watch: {},
  filters: {},
  components: { homeitem },
}
</script>

<style scoped lang="less">
/deep/ .van-nav-bar {
  background-color: #4eb979;
  .van-nav-bar__title {
    color: #fff;
    font-size: 20px;
  }
  .van-icon {
    color: #fff;
    font-size: 20px;
  }
}
</style>
