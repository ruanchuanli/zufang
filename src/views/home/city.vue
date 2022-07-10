<template>
  <div>
    <van-nav-bar title="城市列表" left-arrow @click-left="$router.back()" />
    <van-index-bar class="main" :index-list="indexList">
      <van-index-anchor index="当前城市" />
      <van-cell :title="currencity" />
      <van-index-anchor index="热门城市" />
      <van-cell
        v-for="(obj, index) in hotcity"
        :key="index + '1'"
        :title="obj.label"
        @click="choosecity(obj)"
      />
      <div v-for="(obj, index) in citylists" :key="index + '1'">
        <van-index-anchor :index="index.toUpperCase()" />
        <van-cell
          v-for="(item1, index1) in obj"
          :key="index1"
          :title="item1.label"
          @click="choosecity(item1)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import { setItems, getItems } from '@/utils/storage'
import { getcitylist, gethotcity, citypoint } from '@/api/city'
import orderby from 'lodash/orderBy'
export default {
  props: {
    // currencity: {
    //   type: String,
    //   default: '暂无城市',
    // },
  },
  created() {
    this.getcitylists()
    this.gethotcitys()
  },
  data() {
    return {
      citylists: {},
      //   indexs: [],
      indexList: [],
      hotcity: [],
      route: '',
      currencity: getItems('currentcity') || '暂无城市',
      homes: [],
    }
  },
  methods: {
    async getcitylists() {
      const { data } = await getcitylist({
        level: 1,
      })
      console.log(data.body)
      let citylist = {}
      data.body = orderby(data.body, ['short'])
      data.body.forEach((item) => {
        const firstzm = item.short.substr(0, 1)
        if (citylist[firstzm]) {
          citylist[firstzm].push(item)
        } else {
          citylist[firstzm] = [item]
        }
      })
      let indexs = Object.keys(citylist).sort()
      this.indexList = ['#', '热'].concat(
        indexs.map((item) => item.toUpperCase())
      )
      this.citylists = citylist
    },

    async gethotcitys() {
      const { data } = await gethotcity()
      console.log(data.body)
      this.hotcity = data.body
    },

    async citypoints(value) {
      this.homes=[]
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
      })
      try {
        const { data } = await citypoint({
          id: value,
        })
        console.log('points')
        console.log(data.body)
        this.homes = data.body
        if (data.body.length <= 0) {
          return this.$toast('暂无房源')
        }
        setItems('citymap', data.body[0])
      } catch (e) {
        console.log(e)
        this.$toast.fail('请稍后重试')
      }
      this.$toast.success('加载成功')
      // await this.$nextTick()
    },

    async choosecity(item) {
      this.homes=[]
      this.citypoints(item.value)
        console.log(2323)
        console.log(item)
        setItems('currentcity', item.label)
        this.currencity = item.label

        if (this.$route.query.name == '/find') {
          this.$router.push({
            path: '/find',
          })
        } else if (this.$route.query.name == '/home') {
          this.$router.push({
            path: '/home',
          })
        }
        setItems('currentitem', item)
    },
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
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
.main {
  height: 90vh;
  overflow-y: auto;
  /deep/ .van-index-bar__sidebar {
    span {
      margin: 6px 0;
    }
  }
  /deep/ .van-index-anchor {
    color: #999;
  }
  .van-cell__title {
    color: #333;
    font-size: 16px;
  }
}
</style>
