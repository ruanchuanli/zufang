<template>
  <div class="ssnav">
    <van-search
      round
      show-action
      label="地址"
      placeholder="请输入搜索关键词"
      :background="bgc"
      fixed
    >
      <template #action>
        <div>
          <van-icon
            name="paid"
            color="white"
            size="28"
            style="margin-top: 10px"
            @click="tomap"
          />
        </div>
      </template>
      <template #label>
        <span @click="$router.push(`/city?name=${$route.path}`)">{{
          chooseitem.label
        }}</span>
        <van-icon name="arrow-down" />
      </template>
    </van-search>
  </div>
</template>

<script>
export default {
  props: {
    bgc: {
      type: String,
      default: 'transparent',
    },
    chooseitem: {
      type: [String, Object],
      default: () => ({
        value: 'AREA|88cff55c-aaa4-e2e0',
        label: '北京',
      }),
    },
  },
  created() {},
  data() {
    return {}
  },
  methods: {
    tomap() {
      console.log(123)
      this.$router.push({
        path: '/map',
        // query: { chooseitem: this.chooseitem },
      })
    },
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
}
</script>

<style scoped lang="less">
.ssnav {
  height: 50px;
  /deep/ .van-search {
    padding: unset;
  }
}
</style>
