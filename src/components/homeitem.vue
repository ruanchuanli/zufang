<template>
  <van-cell class="cell">
    <van-card
      :desc="item.desc"
      :title="item.title"
      :thumb="'http://liufusong.top:8080' + item.houseImg"
      @click="todeail()"
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
  </van-cell>
</template>

<script>
import { setItems } from '@/utils/storage'
export default {
  props: {
    item: {
      type: Object,
      require: true,
    },
  },
  created() {},
  data() {
    return {}
  },
  methods: {
    todeail() {
      setItems('homeitem', this.item)
      this.$router.push('/homedetail')
    },
  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
}
</script>

<style scoped lang="less">
.cell {
  padding: 0 !important;
}
/deep/ .van-card {
  background-color: #fff;
  /deep/ .van-card__thumb {
    width: 106px;
    height: 80px;
  }
  .van-card__content {
    font-size: 16px;
    .van-tag--danger.van-tag--plain {
      margin-right: 4px;
      background-color: #e4f5f8;
      border: none;
      color: #69c3d2;
    }
    .van-card__desc {
      margin-top: 2px;
      font-size: 12px;
      color: #afb2b3;
    }
    .van-card__price {
      span {
        font-size: 16px;
      }
      font-size: 12px;
      color: #fa5741;
    }
  }
}
</style>
