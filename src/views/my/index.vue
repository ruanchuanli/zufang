<template>
  <div class="main">
    <div class="box">
      <div class="bgimg">
        <van-image
          src="http://liufusong.top:8080/img/profile/bg.png"
        ></van-image>
      </div>
      <div class="user">
        <div class="nei" v-if="userinfo">
          <van-image
            class="avator"
            :src="'http://liufusong.top:8080' + userinfo.avatar"
          ></van-image>
          <div class="name">{{ userinfo.nickname }}</div>
          <van-button @click='exit'>退出</van-button>
          <p class='edituser'>编辑个人资料 <van-icon name="play" color="#999"></van-icon> </p>
        </div>
        <div class="nei nei0" v-else>
          <van-image
            class="avator"
            src="http://liufusong.top:8080/img/profile/avatar.png"
          ></van-image>
          <div class="name">游客</div>
          <van-button @click='$router.push("/login")'>去登录</van-button>
        </div>
      </div>
    </div>
    <van-grid :column-num="3" :border="false">
      <van-grid-item icon="star-o" text="我的收藏" @click="tocllect"/>
      <van-grid-item icon="home-o" text="我的出租" @click="torent"/>
      <van-grid-item icon="clock-o" text="看房记录" />
      <van-grid-item icon="paid" text="成为房主" />
      <van-grid-item icon="user-o" text="个人资料" />
      <van-grid-item icon="service-o" text="联系我们" />
    </van-grid>
    <van-image class='join'
          src="http://liufusong.top:8080/img/profile/join.png"
        ></van-image>
  </div>
</template>

<script>
import { userinfo } from '@/api/user'
import {removeItems} from '@/utils/storage'
export default {
  created() {
    this.userinfos()
  },
  data() {
    return {
      result: [],
      userinfo: null,
    }
  },
  methods: {
    async userinfos() {
      const { data } = await userinfo()
      console.log('userinfo')
      console.log(data)
      this.userinfo = data.body
    },
    exit(){
      this.userinfo=null
      removeItems('zufangtoken')
    },
    tocllect(){
      if(this.userinfo){
        this.$router.push('/mycllect')
      }else{
        this.$toast('请先登录')
        this.$router.push('/login')
      }
    },
     torent(){
      if(this.userinfo){
        this.$router.push('/myrent')
      }else{
        this.$toast('请先登录')
        this.$router.push('/login')
      }
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {},
}
</script>

<style scoped lang="less">
.edituser {
  font-size: 13px;
  color: #999
}
.join {
  padding: 5px 10px;
}
.main {
  background: #fff;
}
/deep/ .van-grid {
  background-color: #fff;
}
.box {
  width: 100%;
  height: 190px;
  position: relative;
  margin-bottom: 110px;
  .bgimg {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .user {
    box-shadow: 0 0 10px #aaa;
    position: relative;
    top: -60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 165px;
    width: 320px;
    background-color: #fff;
    text-align: center;
    .nei {
      position: absolute;
      top: -30px;
      left: 50%;
      transform: translate(-50%);
    }
    .avator {
      height: 70px;
      width: 70px;
      /deep/ img {
        height: 70px;
        width: 70px;
      }
    }
    margin: 0 auto;
    .van-button {
      width: 69px;
      height: 30px;
      background-color: #4eb979;
      border-radius: 6px;
      /deep/ .van-button__text {
        font-size: 12px;
      }
      color: #fff;
    }
    .name {
      font-size: 12px;
      margin: 8px 0;
    }
  }
}
</style>
