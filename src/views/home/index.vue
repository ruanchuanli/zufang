<template>
  <div>
    <div class="lbt">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
      <searchnav class="ssipt" :chooseitem="chooseitem"></searchnav>
    </div>
    <div class="finditem">
      <van-grid>
        <van-grid-item
          icon="photo-o"
          text="文字"
          @click="$router.push('/find')"
        >
          <van-icon name="home-o" size="35" color="green" />
          <span style="font-size: 14px; margin-top: 6px">整租</span>
        </van-grid-item>
        <van-grid-item
          icon="photo-o"
          text="文字"
          @click="$router.push('/find')"
        >
          <van-icon name="user-o" size="35" color="green" />
          <span style="font-size: 14px; margin-top: 6px">合租</span>
        </van-grid-item>
        <van-grid-item icon="photo-o" text="文字" @click="$router.push('/map')">
          <van-icon name="bar-chart-o" size="35" color="green" />
          <span style="font-size: 14px; margin-top: 6px">地图找房</span>
        </van-grid-item>
        <van-grid-item
          icon="photo-o"
          text="文字"
          @click="$router.push('/puthome')"
        >
          <van-icon name="orders-o" size="35" color="green" />
          <span style="font-size: 14px; margin-top: 6px">去出租</span>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="xiaozu">
      <div class="top">
        <h3>租房小屋</h3>
        <p>更多</p>
      </div>
      <van-row type="flex" justify="center">
        <van-col span="11" v-for="(item, index) in xiaowulist" :key="index">
          <div class="heng">
            <van-image :src="'http://liufusong.top:8080' + item.imgSrc" />
            <div class="van-multi-ellipsis--l2">{{ item.title }}</div>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getItems, setItems } from '@/utils/storage'
import searchnav from '@/components/searchnav'
import { getimg, getxiaowu } from '@/api/home'
export default {
  created() {
    this.getimgs()
    this.getxiaowus()
    // setItems('currentitem', {
    //   label: '北京',
    //   pinyin: 'beijing',
    //   short: 'bj',
    //   value: 'AREA|88cff55c-aaa4-e2e0',
    // })
    // setItems('citymap', {
    //   coord: { latitude: '39.912338', longitude: '116.449979' },
    //   count: 612,
    //   label: '朝阳',
    //   value: 'AREA|69cc5f6d-4f29-a77c',
    // })
  },
  data() {
    return {
      images: [],
      chooseitem: getItems('currentitem') || {
        label: '北京',
        value: 'AREA|88cff55c-aaa4-e2e0',
        pinyin: 'beijing',
        short: 'bj',
      },
      xiaowulist: [],
    }
  },
  methods: {
    async getimgs() {
      const { data } = await getimg()
      console.log(data.body)
      let imgs = data.body.map((item) => {
        item.imgSrc = 'http://liufusong.top:8080' + item.imgSrc
        return item.imgSrc
      })
      this.images = imgs
    },

    async getxiaowus() {
      const { data } = await getxiaowu({
        id: this.chooseitem.value,
      })
      console.log(data.body)
      this.xiaowulist = data.body
    },
  },
  computed: {},
  watch: {},
  filters: {},
  components: { searchnav },
}
</script>

<style scoped lang="less">
.lbt {
  position: relative;
  .ssipt {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translate(-50%, 0);
    width: 95%;
  }
}
/deep/ .van-swipe {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
  height: 212px;
  img {
    height: 212px;
    width: 375px;
  }
}
/deep/ .van-col {
  background-color: #fff;
  margin-right: 6px;
  margin-bottom: 6px;
  border-radius: 8px;
  width: 172px;
}
.finditem {
  /deep/ .van-grid {
    .van-grid-item {
      border: none;
    }
  }
}
.xiaozu {
  padding: 6px;
  .top {
    height: 40px;
    padding: 0 10px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    h3 {
      color: #333;
      font-size: 15px;
    }
    p {
      color: #787d82;
      font-size: 12px;
    }
  }

  .heng {
    display: flex;
    align-content: center;
    align-content: center;
    padding: 10px;
    .van-image {
      /deep/ img {
        height: 50px;
        width: 50px;
      }
      margin-right: 6px;
    }
    .van-multi-ellipsis--l2 {
      font-size: 14px;
      color: #333;
      line-height: 50px;
    }
  }
}
</style>
