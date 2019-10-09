<template>
  <div>
    <el-container class="container">
      <el-aside width="200px">
        <h1>黑马头条</h1>
        <!-- 侧边导航栏 -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>文章管理</span>
            </template>
            <el-menu-item-group>
              <router-link to="/Postlist">
                <el-menu-item index="1-1">文章列表</el-menu-item>
              </router-link>
              <router-link to="/Posttext">
                <el-menu-item index="1-2">发布文章</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!-- 头部区域 -->
        <el-header>
          <img :src="$axios.defaults.baseURL + list.user.head_img" alt />
          <span>{{list.user.nickname}}</span>
          <em style="cursor:pointer">退出</em>
        </el-header>
        <!-- 这是子页面要展示的区域 -->
        <el-main>
          <!-- 子组件展示的内容 -->
          <div class="breaks">{{breaks}}</div>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: {
        user: {}
      }
    };
  },
  mounted() {
    this.list = JSON.parse(localStorage.getItem("userdata"));
  },
  computed:{
    breaks(){
      const {matched} = this.$route
      let arr = []
      matched.forEach(item=>{
        arr.push(item.meta)
      })
      return arr.join('/')
    }
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background-color: #333333;
  color: #333;
  text-align: center;
  line-height: 60px;
  text-align: right;
  * {
    vertical-align: middle;
    font-size: 14px;
  }
  img {
    width: 37px;
    height: 37px;
    border-radius: 50px;
    margin-right: 5px;
  }
  em {
    margin-right: 150px;
    color: #ffffff;
    padding-left: 10px;
  }
  span {
    color: #ffffff;
  }
}

.el-aside {
  background-color: #000000;
  color: #333;
  text-align: center;
  line-height: 200px;
  position: relative;
  h1 {
    height: 60px;
    width: 200px;
    line-height: 60px;
    text-align: center;
    font-size: 18px;
    color: #eee;
  }
}

.el-main {
  background-color: #ffffff;
  color: #333;
  text-align: center;
//   line-height: 160px;
.breaks{
  text-align: left;
}
}

.container {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>