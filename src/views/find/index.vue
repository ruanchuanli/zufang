<template>
  <div class="main">
    <van-icon name="arrow-left" class="fanhui" @click="$router.back()" />
    <searchnav
      :bgc="'#4eb979'"
      class="ssnav2"
      :chooseitem="chooseitem"
    ></searchnav>
    <div class="saixuan">
      <van-dropdown-menu duration="0.2" active-color="#4eb979">
        <van-dropdown-item title="区域" ref="item1">
          <van-picker
            show-toolbar
            item-height="30"
            toolbar-position="bottom"
            :columns="columns"
            @confirm="onConfirm"
            @cancel="onCancel"
          >
          </van-picker>
        </van-dropdown-item>
        <van-dropdown-item title="方式" ref="item2">
          <van-picker
            show-toolbar
            item-height="30"
            toolbar-position="bottom"
            :columns="columns2"
            @confirm="onConfirm2"
            @cancel="onCancel2"
          >
          </van-picker>
        </van-dropdown-item>
        <van-dropdown-item title="租金" ref="item3">
          <van-picker
            show-toolbar
            item-height="30"
            toolbar-position="bottom"
            :columns="columns3"
            @confirm="onConfirm3"
            @cancel="onCancel3"
          >
          </van-picker>
        </van-dropdown-item>
        <van-dropdown-item title="筛选" ref="item4" @open="show = true">
          <van-popup
            v-model="show"
            v-if="show"
            position="right"
            :style="{ height: '100%', width: '80%' }"
          >
            <van-checkbox-group v-model="result" direction="horizontal">
              <van-cell>
                <span class="option">户型</span>
                <div class="spans">
                  <van-checkbox
                    class="aitem"
                    v-for="(item, index) in cditionlist.roomType"
                    :key="index"
                    :name="item.value"
                  >
                    <template #icon="props">
                      <span
                        class="img-icon"
                        :class="{ isactive: props.checked }"
                      >
                        {{ item.label }}
                      </span>
                    </template>
                  </van-checkbox>
                </div>
              </van-cell>
              <van-cell>
                <span class="option">朝向</span>
                <div class="spans">
                  <van-checkbox
                    class="aitem"
                    v-for="(item, index) in cditionlist.oriented"
                    :key="index"
                    :name="item.value"
                  >
                    <template #icon="props">
                      <span
                        class="img-icon"
                        :class="{ isactive: props.checked }"
                      >
                        {{ item.label }}
                      </span>
                    </template>
                  </van-checkbox>
                </div>
              </van-cell>
              <van-cell>
                <span class="option">楼层</span>
                <div class="spans">
                  <van-checkbox
                    class="aitem"
                    v-for="(item, index) in cditionlist.floor"
                    :key="index"
                    :name="item.value"
                  >
                    <template #icon="props">
                      <span
                        class="img-icon"
                        :class="{ isactive: props.checked }"
                      >
                        {{ item.label }}
                      </span>
                    </template>
                  </van-checkbox>
                </div>
              </van-cell>
              <van-cell>
                <span class="option">房屋亮点</span>
                <div class="spans">
                  <van-checkbox
                    class="aitem"
                    v-for="(item, index) in cditionlist.characteristic"
                    :key="index"
                    :name="item.value"
                  >
                    <template #icon="props">
                      <span
                        class="img-icon"
                        :class="{ isactive: props.checked }"
                      >
                        {{ item.label }}
                      </span>
                    </template>
                  </van-checkbox>
                </div>
              </van-cell>
            </van-checkbox-group>
            <div class="btns">
              <van-button class="cancel1" @click="onCancel4">清除</van-button>
              <van-button class="sure1" @click="onConfirm4">确定</van-button>
            </div>
          </van-popup>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <div class="homes">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell v-for="item in citybyid" :key="item.value">
          <van-card
            :desc="item.desc"
            :title="item.title"
            :thumb="'http://liufusong.top:8080' + item.houseImg"
          >
            <template #tags>
              <van-tag
                plain
                type="danger"
                v-for="(item1, index1) in item.tags"
                :key="index1"
                >{{ item1 }}</van-tag
              >
            </template>
            <template #price>
              <span>{{ item.price }}</span> 元/月
            </template>
          </van-card>
        </van-cell> -->
        <homeitem
          v-for="item in citybyid"
          :key="item.value"
          :item="item"
        ></homeitem>
      </van-list>
    </div>
  </div>
</template>

<script>
import homeitem from '@/components/homeitem'
import { getItems ,setItems} from '@/utils/storage'
import { gethomebycityid, getzicity, getcondition, seachhome } from '@/api/find'
import searchnav from '@/components/searchnav.vue'
export default {
  props: {},
  created() {
    this.gethomebycityids()
    this.getzicitys()
    this.getconditions()
  },
  data() {
    return {
      chooseitem: getItems('currentitem') || {
        label: '北京',
        value: 'AREA|88cff55c-aaa4-e2e0',
        pinyin: 'beijing',
        short: 'bj',
      },
      show: false,
      showPicker: false,
      cditionlist: {},
      columns: [],

      columns2: [
        // 第一列
        {
          values: [],
          defaultIndex: 0,
        },
      ],
      columns3: [
        // 第一列
        {
          values: [],
          defaultIndex: 0,
        },
      ],

      placelist: [],
      loading: false,
      finished: false,
      citybyid: [],
      placeid: null,
      area: null,
      subway: null,
      rentType: null,
      price: null,
      more: [],
      result: [],
      val: null,
      stat: 1,
      end: 20,
    }
  },
  methods: {
    bianli() {
      let a = JSON.stringify(this.cditionlist.area)
      const regex = /label/gi
      const regex2 = /不限",/gi
      let b = a
        .replace(regex, 'text')
        .replace(regex2, '不限","children":[null],')
      let c = JSON.parse(b)
      this.columns[0] = c

      let d = JSON.stringify(this.cditionlist.subway)
      const regex3 = /label/gi
      const regex4 = /不限",/gi
      let e = d
        .replace(regex3, 'text')
        .replace(regex4, '不限","children":[null],')
      let f = JSON.parse(e)
      this.columns[0] = c
      this.columns[1] = f
    },

    async getconditions() {
      const { data } = await getcondition({
        id: this.chooseitem.value,
      })
      this.cditionlist = data.body
      this.columns2[0].values = data.body.rentType.map((item) => item.label)
      this.columns3[0].values = data.body.price.map((item) => item.label)
      this.bianli()
    },

    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // try {
      //   const { data } = await gethomebycityid({
      //     cityId: this.chooseitem.value,
      //   })
      //   console.log(data.body.list)
      //   this.citybyid = data.body.list
      //   setItems('likehome',this.citybyid.slice(5,8))
      // } catch (e) {
      //   console.log(e)
      // }
      this.stat = this.end
      this.end = this.end + 20
      this.seachhomes()
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      // if (this.citybyid.length >= 20) {
      //   this.finished = true
      // }
    },
    async gethomebycityids() {
      this.$toast.loading({
        duration:0,
        message:'加载中...'
      })
      try{
        const { data } = await gethomebycityid({
        cityId: this.chooseitem.value,
      })
      console.log(data.body.list)
      this.citybyid = data.body.list
      setItems('likehome',this.citybyid.slice(5,8))
      this.$toast.success('加载成功')
      }catch (e) {
        console.log(e);
      }
    },
    // 根据市id获取地名
    async getzicitys() {
      const { data } = await getzicity({
        id: this.chooseitem.value,
      })
      console.log(data.body)
      this.placelist = data.body
      this.columns[1].values.push(...this.placelist.map((item) => item.label))
    },

    // picker 滚动变化根据地区id获取地区下的地方名
    // async onChange(value, index) {
    //   // 获取地区id
    //   this.placelist.forEach((item) => {
    //     if (item.label == index[1]) {
    //       this.placeid = item.value
    //     }
    //   })
    //   const { data } = await getzicity({
    //     id: this.placeid,
    //   })
    //   this.columns[2].values = data.body.map((item) => item.label)
    // },

    // 遍历得到value值
    getvalue(data, name, val) {
      data.forEach((item) => {
        if (name == item.label) {
          val = item.value
        } else if (item.children && item.children.length > 0) {
          val = this.getvalue(item.children, name, val)
        }
      })
      return val
    },
    async seachhomes() {
      this.citybyid = []
      this.$toast.loading({
        duration: 0,
        message: '加载中...',
      })
      const { data } = await seachhome({
        citybyid: this.chooseitem.value,
        stat: this.stat,
        end: this.end,
        area: this.area,
        subway: this.subway,
        rentType: this.rentType,
        price: this.price,
        more: this.more,
      })
      console.log('搜索结果')
      console.log(data)
      this.citybyid = data.body.list
      this.$toast.success('加载成功')
      if (data.body.list.length <= 0) {
        this.finished = true
      }
    },
    onConfirm(value, index) {
      console.log(value, index)
      this.$refs.item1.toggle()
      console.log(value[1])
      if (value[0] == '区域') {
        this.subway = null
        if (value[2] == '不限') {
          this.area = this.getvalue(
            this.cditionlist.area.children,
            value[1],
            this.area
          )
        } else {
          this.area = this.getvalue(
            this.cditionlist.area.children,
            value[2],
            this.area
          )
        }
      } else if (value[0] == '地铁') {
        this.area = null
        if (value[2] == '不限') {
          this.subway = this.getvalue(
            this.cditionlist.subway.children,
            value[1],
            this.subway
          )
        } else {
          this.subway = this.getvalue(
            this.cditionlist.subway.children,
            value[2],
            this.subway
          )
        }
      }
      this.seachhomes()
    },
    onCancel(val) {
      console.log(val)
      this.$refs.item1.toggle()
    },

    onConfirm2(value) {
      console.log(value)
      this.$refs.item2.toggle()
      if (value[0] == '整租') {
        this.rentType = true
      } else {
        this.rentType = false
      }
      this.seachhomes()
    },
    onCancel2(val) {
      console.log(val)
      this.$refs.item2.toggle()
    },

    onConfirm3(value) {
      console.log(value)
      this.$refs.item3.toggle()
      this.price = value[0]
      this.seachhomes()
    },
    onCancel3(val) {
      console.log(val)
      this.$refs.item3.toggle()
    },

    onConfirm4() {
      this.show = false
      // this.more
      this.more = this.result.join(',')
      this.seachhomes()
    },
    onCancel4() {
      this.result = []
    },
  },
  computed: {},
  watch: {
    chooseitem: {
      handler() {
        console.log('giabian')
        this.citybyid = []
        this.gethomebycityids()
      },
      immediate: true,
    },
  },
  filters: {},
  components: { searchnav, homeitem },
}
</script>

<style scoped lang="less">
/deep/ .van-checkbox-group {
  height: 92vh;
  overflow-y: auto;
}
/deep/.isactive {
  box-sizing: border-box;
  border: 2px solid #09d480 !important;
  color: #21b97a !important;
  background-color: #defaef !important;
}
/deep/ .van-tag--default {
  background-color: unset;
}
.btns {
  position: fixed;
  bottom: 0px;
  left: 0;
}
.option {
  display: inline-block;
  font-size: 15px;
  color: #333;
  margin-bottom: 15px;
}
.spans {
  padding-left: 50px;
  .aitem,
  .img-icon {
    display: inline-block;
    height: 32px;
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
  .img-icon {
    border: none;
  }
}
.main {
  position: relative;
}
.ssnav2 {
  /deep/ .van-search {
    width: 100%;
    padding-left: 35px;
    padding-right: 20px;
  }
}
.fanhui {
  position: absolute;
  top: 12px;
  left: 8px;
  color: white;
  font-size: 20px;
}
.sure1 {
  width: 200px;
  color: #fff;
  background-color: #4eb979;
}
.cancel1 {
  width: 100px;
  color: #4eb979;
}
.sure,
/deep/ .van-picker__confirm {
  width: 70%;
  color: #fff;
  background-color: #4eb979;
}
.cancel,
/deep/ .van-picker__cancel {
  border-top: 1px solid #eee;
  width: 30%;
  color: #4eb979;
}
/deep/ .van-dropdown-menu__bar--opened {
  z-index: 10;
}
/deep/ .van-popup {
  z-index: 999;
}
</style>
