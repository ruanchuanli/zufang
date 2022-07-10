<template>
  <div>
    <van-nav-bar title="账号登录">
      <van-icon
        slot="left"
        name="arrow-left"
        @click="$router.back()"
      ></van-icon>
    </van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        placeholder="请填写账号"
        :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="请填写密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import {login} from '@/api/user'
import {setItems} from '@/utils/storage'
export default {
  created() {},
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
   async onSubmit(values) {
     this.$toast.loading('登录中...')
      try{
        const {data} = await login(values)
      console.log(data);
      setItems('zufangtoken',data.body.token)
      this.$toast.success('登录成功')
      this.$router.push('/my')
      }catch(e){
        this.$toast.fail('登录失败，请稍后重试')
        console.log(e);
      }
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
/deep/ .van-button {
   background-color: #4eb979;
   border: none;
}
</style>
