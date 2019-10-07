<template>
  <el-row class="header-all" type="flex" align="middle" justify="center">
    <el-col class="header-info">
      <h2>登录</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input type="username" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      //   定义一个规则
      rules: {
        // required代表是否必填, 错误时候的提示,trigger什么时候触发
        //   如果不输入内容 username.reqeired会发出警告，因为是false
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      // validate方法是element的表单才有的 里面是一个回调函数
      this.$refs.ruleForm.validate(valid => {
        // 返回的是一个布尔类型
        if (valid) {
          // 发送端口请求
          this.$axios({
            url: "/login",
            method: "post",
            data: this.ruleForm
          }).then(res => {
            let { message, data } = res.data;
            if (message === "用户不存在") {
              this.$message.error(message);
            }
            // 登录成功
            this.$message.success(message);
            // 将roken和id存储到本地
            localStorage.setItem("userdata", JSON.stringify(data));
            // 登录成功后跳转到投胎主页
            setTimeout(()=>{
                this.$router.push('/')
            },2000)
          });
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.header-all {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background: #f2f2f2;
  .header-info {
    width: 500px;
    height: 500px;
    h2 {
      text-align: center;
      margin: 20px 0px;
    }
    .demo-ruleForm {
      width: 500px;
      padding: 30px;
      box-sizing: border-box;
      background: #ffffff;
      border: 1px #ffffff solid;
    }
  }
}
</style>