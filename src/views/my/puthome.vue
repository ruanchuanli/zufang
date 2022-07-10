<template>
  <div>
    <van-nav-bar title="发布房源">
      <van-icon
        slot="left"
        name="arrow-left"
        @click="$router.back()"
      ></van-icon>
    </van-nav-bar>
    <van-cell-group>
      <van-cell class="fyxx" title="房源信息" />
      <van-cell
        title="小区名称"
        :value="xiaoqu"
        is-link
        @click="$router.push('/rentsearch')"
      />
      <van-field
        label="租  金"
        v-model="datas.price"
        placeholder="请输入租金/月"
      >
        <span slot="extra">￥/月</span>
      </van-field>
      <van-field
        label="建筑面积"
        v-model="datas.size"
        placeholder="请输入建筑面积"
      >
        <span slot="extra">￥/月</span>
      </van-field>
      <van-cell title="户 型" :value="hx" is-link @click="roomType1 = true" />
      <van-cell title="所在楼层" :value="lc" is-link @click="floor1 = true" />
      <van-cell title="朝向" :value="cx" is-link @click="oriented1 = true" />
      <van-cell title="房屋标题" />
      <van-field
        v-model="datas.title"
        placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
      />
      <van-cell title="房屋图像" />
      <van-uploader v-model="fileList" :after-read="afterRead" />
      <van-cell title="房屋配置" />
      <van-checkbox-group v-model="result">
        <van-grid :column-num="6" :border="false">
          <van-checkbox
            :name="item.label"
            v-for="(item, index) in puthomeinfo.supporting"
            :key="index"
          >
            <template #icon="props">
              <van-grid-item :class="{ isactive: props.checked }">
                <span class="txt"
                  ><i slot="icon" class="toutiao toutiao-shipin"></i> <br />
                  {{ item.label }}</span
                >
              </van-grid-item>
            </template>
          </van-checkbox>
        </van-grid>
        <!-- <van-checkbox name="a">
          <template #icon="props">
            <span class="sup" :class="{ isactive: props.checked }">
              <van-icon class="tubiao" name="like-o"></van-icon>
              <van-icon class="tubiao" name="star-o"></van-icon>
              <span>喜欢</span>
            </span>
          </template>
        </van-checkbox> -->
      </van-checkbox-group>
      <van-cell title="房屋描述" />
      <van-field
        v-model="datas.description"
        type="textarea"
        rows="4"
        placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
        class="miaoshu"
      />
      <van-tabbar class="btns">
        <van-button @click="cancel">取消</van-button>
        <van-button type="primary" @click="puthomes">提交</van-button>
      </van-tabbar>
    </van-cell-group>
    <van-popup v-model="roomType1" position="bottom">
      <van-picker
        show-toolbar
        :columns="puthomeinfo.roomType.map((item) => item.label)"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>

    <van-popup v-model="floor1" position="bottom">
      <van-picker
        show-toolbar
        :columns="puthomeinfo.floor.map((item) => item.label)"
        @confirm="onConfirm1"
        @cancel="onCancel1"
      />
    </van-popup>

    <van-popup v-model="oriented1" position="bottom">
      <van-picker
        show-toolbar
        :columns="puthomeinfo.oriented.map((item) => item.label)"
        @confirm="onConfirm2"
        @cancel="onCancel2"
      />
    </van-popup>
  </div>
</template>

<script>
import { puthomeinfo, getimgs } from '@/api/home'
import { puthome } from '@/api/user'
import { getItems, removeItems } from '@/utils/storage'
export default {
  created() {
    this.puthomeinfos()
    this.getcommunity()
  },
  data() {
    return {
      fileList: [],
      result: [],
      roomType1: false,
      floor1: false,
      oriented1: false,
      hx: '请选择',
      lc: '请选择',
      cx: '请选择',
      xiaoqu: '请选择小区名称',
      puthomeinfo: {},
      datas: {
        roomType: null,
        floor: null,
        oriented: null,
        title: null,
        description: null,
        supporting: null,
        price: null,
        size: null,
        community: null,
        houseImg: null,
      },
      imgs: [],
    }
  },
  methods: {
    getcommunity() {
      this.xiaoqu = getItems('community').communityName
      this.datas.community = getItems('community').community
    },
    onConfirm(value, index) {
      console.log(value, index)
      this.hx = value
      this.puthomeinfo.roomType.forEach((item) => {
        if (item.label == value) {
          this.datas.roomType = item.value
        }
      })
      this.roomType1 = false
    },
    onConfirm1(value, index) {
      console.log(value, index)
      this.lc = value
      this.puthomeinfo.floor.forEach((item) => {
        if (item.label == value) {
          this.datas.floor = item.value
        }
      })
      this.floor1 = false
    },

    onConfirm2(value, index) {
      console.log(value, index)
      this.cx = value
      this.puthomeinfo.oriented.forEach((item) => {
        if (item.label == value) {
          this.datas.oriented = item.value
        }
      })
      this.oriented1 = false
    },
    onCancel() {
      this.roomType1 = false
    },
    onCancel1() {
      this.floor1 = false
    },
    onCancel2() {
      this.oriented1 = false
    },
    async puthomeinfos() {
      const { data } = await puthomeinfo()
      console.log('putinfo')
      console.log(data)
      this.puthomeinfo = data.body
    },

    // 图片处理
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
      let formdata = new FormData()
      formdata.append('file', file.file)
      const { data } = await getimgs(formdata)
      console.log('上传图片')
      console.log(data.body)
      this.imgs.push(data.body)
    },
    async puthomes() {
      this.$toast.loading('发布中...')
      try {
        this.datas.supporting = this.result.join('|')
        this.datas.houseImg = this.imgs.join('|')
        if (this.imgs.length <= 0) {
          return this.$toast('请上传图片')
        }
        const { data } = await puthome(this.datas)
        if (data.status != 200) {
          this.$toast.fail('发布失败，重新登录试试')
        } else {
          this.$dialog
            .confirm({
              title: '提示',
              message: '发布房源成功',
              confirmButtonText: '继续发布',
              cancelButtonText: '去查看',
            })
            .then(() => {
              console.log('继续')
              // this.datas.forEach(item=>item==null)
              for (let key in this.datas) {
                key = null
                console.log(key)
              }
              removeItems('community')
            })
            .catch(() => {
              this.$router.push('/find')
              removeItems('community')
            })
        }
        console.log('新增房源')
        console.log(data)
      } catch (e) {
        console.log(e)
      }
    },
    cancel() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '放弃发布房源？',
          confirmButtonText: '继续编辑',
          cancelButtonText: '放弃',
        })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          this.$router.push('/home')
          removeItems('community')
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
/deep/ .van-grid-item__content {
  height: 40px;
  width: 65px;
  font-size: 13px !important;
}
.main {
  background-color: #eee;
}
.miaoshu {
  padding-bottom: 50px;
}
.btns {
  margin-top: 50px;
  /deep/ .van-button {
    width: 50%;
    border: none;
  }
}
/deep/ .van-checkbox-group {
  padding: 10px 0;
}
/deep/ .van-checkbox {
  padding: 5px 5px;
}
/deep/ .van-checkbox__icon {
  height: unset;
}
.txt {
  margin-bottom: 6px;
  .toutiao {
    font-size: 18px;
  }
  text-align: center;
  font-size: 15px;
}
// /deep/.van-checkbox__icon--round .van-icon {
//   display: none;
// }
/deep/ .tubiao {
  display: inline-block !important;
}
/deep/ .van-checkbox__icon .van-checkbox__icon {
  border: none;
}
.sup {
  display: inline-block;
  height: 40px;
  width: 70px;
  border: 1px solid #eee;
  border-radius: 6px;
  text-align: center;
  line-height: 32px;
  color: #aaa;
  margin-right: 15px;
  margin-bottom: 5px;
  font-size: 13px;
}
/deep/.isactive {
  color: #21b97a !important;
}
.fyxx {
  color: #4eb979;
  font-size: 16px;
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
</style>
