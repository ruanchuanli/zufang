<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="$router.back()"
        background="#eee"
        @input="getaddresss(value)"
      />
    </form>
    <van-cell-group v-if='result.length!=0'>
  <van-cell :title="item.communityName" v-for="(item, index) in result" :key="index" @click="getcommunityid(index)"/>
</van-cell-group>
<van-empty description="暂无数据,请重新查询" v-else/>
  </div>
</template>

<script>
import { getaddress } from '@/api/home'
import { getItems ,setItems} from '@/utils/storage'
export default {
  created() {},
  data() {
    return {
      value: '',
      result:[],
    }
  },
  methods: {
    async onSearch(val) {
        this.getaddresss(val)
    },
    async getaddresss(val) {
        this.$toast.loading('加载中...')
      try {
       const {data}= await getaddress({
          name: val,
          id: getItems('currentitem').value,
        })
        this.$toast.success('加载成功')
        console.log(data);
        this.result=data.body
      } catch (e) {
        console.log(e)
        this.$toast.fail('加载失败，请稍后重试')
      }
    },
    getcommunityid(id){
        this.result.forEach((item,index) => {
            if(id==index){
                setItems('community',item)
            }
        })
        this.$router.back()
    }
  },
  computed: {},
  watch: {
      value(val){
          this.getaddresss(val)
      }
  },
  filters: {},
  components: {},
}
</script>

<style scoped lang="less"></style>
