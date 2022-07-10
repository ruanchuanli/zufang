<template>
  <div class="main">
    <van-nav-bar :title="title">
      <van-icon
        slot="left"
        name="arrow-left"
        @click="$router.back()"
      ></van-icon>
    </van-nav-bar>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
    <div class="sanceng">
      <div class="top">
        <p class="title">{{ infos.title }}</p>
        <p class="tags">
          <van-tag
            type="warning"
            v-for="(item, index) in infos.tags"
            :key="index"
            >{{ item }}</van-tag
          >
        </p>
      </div>
      <div class="center">
        <div class="aitem">
          <p class="price">{{ infos.price }} <span>/月</span></p>
          <p class="txt">租金</p>
        </div>
        <div class="aitem">
          <p class="num">{{ infos.roomType }}</p>
          <p class="txt">房型</p>
        </div>
        <div class="aitem">
          <p class="size">{{ infos.size }}平米</p>
          <p class="txt">面积</p>
        </div>
      </div>
      <div class="bottom">
        <div class="left">
          <p>装修： <span>精装</span></p>
          <p>
            楼层： <span>{{ infos.floor > 3 ? '高楼层' : '中楼层' }}</span>
          </p>
        </div>
        <div class="right">
          <p>
            朝向: <span>{{ infos.oriented[0] }}</span>
          </p>
          <p>类型: <span>普通住宅</span></p>
        </div>
      </div>
    </div>

    <div class="sanceng">
      <p>小区：{{ infos.community }}</p>
      <div id="container"></div>
      <p class="peitao">房屋配套</p>
      <van-grid :border="false">
        <van-grid-item
          v-for="(item, index) in infos.supporting"
          :key="index"
          icon="point-gift-o"
          :text="item"
        />
      </van-grid>
    </div>
    <div class="sanceng">
      <p class="gaik">房源概况</p>
      <div class="master">
        <van-image
          round
          fit="cover"
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fblog%2F202008%2F03%2F20200803130051_lnxsh.thumb.1000_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1658892175&t=3b2a4c522c6886ce6653f8a8783d4963"
        />
        <van-cell title="王女士" label="描述信息">
          <span slot="label">
            <van-icon name="like"></van-icon> 已认证房主
          </span>
          <van-button plain type="primary" slot="extra">发消息</van-button>
        </van-cell>
      </div>
      <p class="decp">{{ infos.description }}</p>
    </div>

    <div class="sanceng sanceng3">
      <p class="gaik">猜你喜欢</p>
      <homeitem
        v-for="(item, index) in likehome"
        :key="index"
        :item="item"
      ></homeitem>
    </div>

    <van-grid :border="true" :column-num="3" class="fixbottom">
      <van-grid-item>
        <van-button plain>
          <van-icon
            :name="isFavorite ? 'star' : 'star-o'"
            :color="isFavorite ? 'red' : 'unset'"
            @click="collect"
          ></van-icon>
          收藏</van-button
        >
      </van-grid-item>
      <van-grid-item>
        <van-button plain>在线咨询</van-button>
      </van-grid-item>
      <van-grid-item>
        <van-button type="primary">电话预约</van-button>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import homeitem from '@/components/homeitem.vue'
import { iscollecthome, collecthome,delhome} from '@/api/user'
export default {
  created() {
    this.getinfos()
    //   this.initmap()
    this.iscollect()
  },
  data() {
    return {
      title: '',
      homeinfo: getItems('homeitem'),
      images: [],
      infos: [],
      baidumap: null,
      likehome: getItems('likehome'),
      isFavorite: null,
    }
  },
  methods: {
    async getinfos() {
      let toptitle = getItems('homeitem').desc.split('/')
      this.title = toptitle[toptitle.length - 1]
      const { data } = await getinfo(this.homeinfo.houseCode)
      console.log(data.body)
      this.infos = data.body

      if (data.body.houseImg instanceof Array) {
        this.images = data.body.houseImg.map(
          (item) => 'http://liufusong.top:8080' + item
        )
      } else {
        this.images = ['http://liufusong.top:8080' + data.body.houseImg]
      }
    },
    initmap() {
      const {BMapGL}=window
      // 创建地图实例
      this.baidumap = new BMapGL.Map('container')
      let point = new BMapGL.Point(
        this.infos.coord.longitude,
        this.infos.coord.latitude
      )
      this.baidumap.centerAndZoom(point, 11)
      this.baidumap.enableScrollWheelZoom()
      let cont = `<span>${this.title}</span> <div class='HouseDetail_mapArrow__26oyW'></div>`
      var label = new BMapGL.Label(cont, {
        // 创建文本标注
        position: point,
        offset: new BMapGL.Size(10, 20),
      })
      this.baidumap.addOverlay(label) // 将标注添加到地图中
      label.setStyle({
        // 设置label的样式
        // color: '#000',
        // fontSize: '30px',
        // border: '2px solid #1E90FF',
        position: 'absolute',
        display: 'inline',
        cursor: 'inherit',
        backgroundColor: 'rgb(238, 93, 91)',
        border: '1px solid rgb(255, 0, 0)',
        padding: '5px 10px',
        whiteSpace: 'nowrap',
        font: '12px / 14px arial, sans-serif',
        zIndex: '-999999',
        color: 'rgb(255, 255, 255)',
        boxShadow: 'rgb(204 204 204) 2px 2px 2px',
        userSelect: 'none',
        left: '188px',
        top: '37px',
      })
    },
    async iscollect() {
      console.log('是否收藏')
      const { data } = await iscollecthome(this.homeinfo.houseCode)
      console.log(data)
      this.isFavorite = data.body.isFavorite
    },
    async collect() {
      try {
        if(this.isFavorite){
          this.$toast.loading('取消中...')
          console.log('取消收藏')
          const { data } = await delhome(this.homeinfo.houseCode)
          console.log(data)
          this.isFavorite = false
          this.$toast('已取消收藏')
        }else {
          console.log('收藏')
          this.$toast.loading('收藏中...')
          const { data } = await collecthome(this.homeinfo.houseCode)
          console.log(data)
          this.isFavorite = true
          this.$toast.success('收藏成功')
        }
      } catch (e) {
        console.log(e)
      }
    },
  },
  computed: {},
  watch: {
    homeinfo: {
      handler(val) {
        console.log('监听')
        console.log(val)
        getItems('homeitem')
      },
      immediate: true,
    },
  },
  filters: {},
  components: { homeitem },
  updated() {
    this.initmap()
  },
}
import { getinfo } from '@/api/home'
import { getItems } from '@/utils/storage'
</script>

<style scoped lang="less">
.decp {
  color: #999;
  margin-top: 10px;
  padding-bottom: 30px;
}
.master {
  display: flex;
  align-content: center;
  justify-content: start;
  /deep/ .van-image {
    width: 60px;
    height: 60px;
    margin-right: 5px;
    /deep/ img {
      width: 60px;
      height: 60px;
    }
    margin-top: 5px;
  }
}
/deep/ .van-cell {
  width: 280px;
}
.peitao,
.gaik {
  padding: 10px 0;
  font-weight: 500;
  border-bottom: 1px solid #eee;
}
/deep/ .van-grid-item {
  border: none;
}
/deep/ .van-tag {
  margin-right: 5px;
}
/deep/ .HouseDetail_mapArrow__26oyW {
  background: url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png)
    no-repeat !important;
  position: absolute;
  width: 11px;
  height: 10px;
  top: 23px;
  left: 10px;
  overflow: hidden;
}
#container {
  width: 100%;
  height: 145px;
  padding: 0 !important;
  margin-top: 5px;
}
.main {
  background-color: #eee;
}
p {
  margin: 0;
  padding: 0;
  font-size: 15px;
}

.sanceng {
  margin-bottom: 5px;
  background-color: #fff;
  //   height: 266px;
  padding: 0 15px;
  .top {
    // height: 80px;
    border-bottom: 1px solid #aaa;
    .title {
      font-size: 16px;
      padding-top: 15px;
      margin-bottom: 10px;
    }
    padding-bottom: 10px;
  }
  .center {
    text-align: center;
    height: 70px;
    border-bottom: 1px solid #aaa;
    display: flex;
    justify-content: space-around;
    align-content: center;
    .aitem {
      margin-top: 10px;
      p {
        margin-bottom: 5px;
        font-size: 13px;
        color: #666;
        color: #eb553d;
        font-size: 18px;
      }
      .txt {
        font-size: 13px;
        color: #666;
      }
    }
  }
  .bottom {
    margin-top: 20px;
    height: 70px;
    display: flex;
    justify-content: start;
    p {
      margin-bottom: 5px;
      margin-right: 6px;
      font-size: 13px;
      color: #666;
      span {
        font-size: 14px;
        color: #333;
      }
    }
    .right {
      margin-left: 120px;
    }
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
/deep/ .van-swipe {
  //   margin-top: 40px;
  width: 100%;
  height: 252px;
  img {
    width: 100%;
    height: 252px;
  }
}
/deep/ .sanceng3 {
  padding-bottom: 50px;
  .van-cell {
    width: 360px;
  }
}
.fixbottom {
  z-index: 999;
  border-top: 1px solid #eee;
  width: 100%;
  position: fixed;
  bottom: 0;
  /deep/ .van-button--normal {
    font-size: 18px;
  }
  /deep/ .van-button {
    border: none;
    width: 100%;
  }
  /deep/ .van-grid-item__content {
    padding: 0;
  }
}
</style>
