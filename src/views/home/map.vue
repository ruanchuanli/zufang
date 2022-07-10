<template>
  <div class="main">
    <!-- <van-nav-bar title="城市地图" left-arrow @click="$router.go(-1)" fixed /> -->
    <van-nav-bar title="城市地图">
      <van-icon
        slot="left"
        name="arrow-left"
        @click="$router.back()"
      ></van-icon>
    </van-nav-bar>
    <div id="container" ref="baidumai"></div>
    <van-popup v-model="showpop" position="bottom" :style="{ height: '40%' }">
      <div class="list">
        <list1>房屋列表</list1>
        <span>更多房源</span>
      </div>
      <homeitem
        v-for="(item, index) in neihomes"
        :key="index"
        :item="item"
      ></homeitem>
    </van-popup>
  </div>
</template>
<script>
import homeitem from '@/components/homeitem'
import { getItems } from '@/utils/storage'
import { citypoint } from '@/api/city'
import { gethomebycityid } from '@/api/find'
export default {
  async created() {
    this.citypoints(this.points.value)
    this.initmap()
  },
  data() {
    return {
      points: getItems('currentitem') || { value: 'AREA|88cff55c-aaa4-e2e0' },
      firstpoints: [],
      baidumap: null,
      currentpoint: null,
      num: 0,
      neihomes: [],
      showpop: false,
    }
  },
  methods: {
    async citypoints(value) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '加载中...',
      })
      try {
        const { data } = await citypoint({
          id: value,
        })
        console.log('points')
        console.log(data.body)
        this.firstpoints = data.body
        // this.initmap()
        this.bianli()
      } catch (e) {
        console.log(e)
        this.$toast.fail('请稍后重试')
      }
    },
    async initmap() {
      const {BMapGL}=window
      let x =
        getItems('citymap') == null
          ? '116.449979'
          : getItems('citymap').coord.longitude
      let y =
        getItems('citymap') == null
          ? '39.912338'
          : getItems('citymap').coord.latitude
      // 创建地图实例
      this.baidumap = new BMapGL.Map('container')
      // 添加缩放控件
      var zoomCtrl = new BMapGL.ZoomControl()
      this.baidumap.addControl(zoomCtrl)

      this.baidumap.centerAndZoom(new BMapGL.Point(x, y), 11)
      this.baidumap.enableScrollWheelZoom()
    },
    bianli() {
      const {BMapGL}=window
      this.firstpoints.forEach((item) => {
        let x = item.coord.latitude
        let y = item.coord.longitude
        let point = new BMapGL.Point(y, x)
        this.add(this.baidumap, point, item)
      })
    },
    async add(baidumap, point, item) {
      const {BMapGL}=window
      console.log(point)
      // 文字
      let opts = {
        position: point, // 指定文本标注所在的地理位置
        offset: new BMapGL.Size(-21, -10), //设置文本偏移量
      }
      if (this.num >= 2) {
        this.wenzi = `<p class='label'>${item.label}  ${item.count}套 <i class='map_arrow__27v3o></i> </p>`
      } else {
        this.wenzi = `<p class='label'>${item.label} </br> ${item.count}套</p>`
      }
      let label = new BMapGL.Label(this.wenzi, opts) // 创建文本标注对象
      if (this.num >= 2) {
        label.setStyle({
          width: '100px',
          height: '20px',
          display: 'inline-block',
          lineHeight: '0px',
          position: 'absolute',
          borderRadius: '10px',
          background: 'rgba(12, 181, 106, 0.9)',
          color: '#fff',
          border: '2px solid hsla(0, 0%, 100%, 0.8)',
          textAlign: 'center',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        })
      } else {
        label.setStyle({
          width: '70px',
          height: '70px',
          lineHeight: '20px',
          display: 'inline-block',
          position: 'absolute',
          borderRadius: '100%',
          background: 'rgba(12, 181, 106, 0.9)',
          color: '#fff',
          border: '2px solid hsla(0, 0%, 100%, 0.8)',
          textAlign: 'center',
          cursor: 'pointer',
        })
      }

      baidumap.addOverlay(label) //增加文字
      label.addEventListener('click', async () => {
        this.num++
        console.log(this.num, 8)
        console.log(item.value)
        if (this.num <= 2) {
          baidumap.clearOverlays()
        }
        this.citypoints(item.value)
        console.log('点')
        // 以当前点击的点为中心点
        if (this.num == 2) {
          baidumap.centerAndZoom(
            new BMapGL.Point(
              // this.firstpoints[0].coord.longitude,
              // this.firstpoints[0].coord.latitude
              item.coord.longitude,
              item.coord.latitude
            ),
            16
          )
        } else {
          baidumap.centerAndZoom(
            new BMapGL.Point(
              // this.firstpoints[0].coord.longitude,
              // this.firstpoints[0].coord.latitude
              item.coord.longitude,
              item.coord.latitude
            ),
            14
          )
        }
        if (this.num > 2) {
          this.showpop = true
          const { data } = await gethomebycityid({
            cityId: item.value,
          })
          console.log(data.body)
          this.neihomes = data.body.list
          this.$toast.success('加载成功')
        }
      })
      this.$toast.success('加载成功')
    },
  },
  mounted() {
    this.initmap()
  },
  updated() {
    this.initmap()
  },
  computed: {},
  watch: {},
  filters: {},
  components: { homeitem },
}
</script>

<style scoped lang="less">
.main {
  height: 100vh;
}
/deep/ .map_arrow__27v3o {
  display: block;
  width: 0;
  height: 0;
  margin: 0 auto;
  border: 4px solid transparent;
  border-top-color: #00a75b;
}
.list {
  height: 50px;
  width: 100%;
  line-height: 50px;
  background-color: #c0c0c2;
  display: flex;
  justify-content: space-between;
  align-content: center;
  span {
    font-size: 14px;
    color: #999;
  }
  .list1 {
    font-size: 16px !important;
    font-weight: 500;
    color: #333;
  }
}
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
#container {
  height: 620px;
  width: 375px;
}
.cicle {
  p {
    margin-bottom: 0 !important;
  }
}
</style>
