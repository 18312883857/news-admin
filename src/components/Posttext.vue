<template>
  <div class="box" style="padding:30px;width:500px">
    <!-- 标题 -->
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <!-- 类型 -->
      <el-form-item label="类型">
        <el-radio-group v-model="form.type">
          <el-radio :label="1">文章</el-radio>
          <el-radio :label="2">视频</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 多选内容 -->
      <el-checkbox-group v-model="form.categories" style="width:800px">
        <el-form-item label="栏目">
          <el-checkbox
            v-for="(item,index) in list"
            :key="index"
            :label="item.id"
            v-show="item.id !== 999"
          >{{item.name}}</el-checkbox>
        </el-form-item>
      </el-checkbox-group>
      <!-- 副文本框 -->
      <el-form-item label="内容" style="width:800px" v-if="form.type===1">
        <!-- <el-input type="textarea" v-model="form.content" rows="5"></el-input> -->
        <VueEditor :config="config" ref="vueEditor"/>
      </el-form-item>
      <!-- 视频 -->
      <el-form-item label="视频" style="width:300px" v-if="form.type===2">
        <!-- action：上传图片的链接
          list-type: 声明当前是上传多张图片
          on-success： 图片上传成功的函数
        on-remove: 移除图片函数-->
        <el-upload
          :action="`${$axios.defaults.baseURL}/upload`"
          list-type="picture-card"
          :on-success="handlePictureCardPreview"
          :on-remove="handleRemove"
          :headers="{ Authorization: token}"
          name="file"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        </el-form-item>
      <!-- 上传图片 -->
      <el-form-item label="封面" style="width:300px">
        <!-- action：上传图片的链接
          list-type: 声明当前是上传多张图片
          on-success： 图片上传成功的函数
        on-remove: 移除图片函数-->
        <el-upload
          :action="`${$axios.defaults.baseURL}/upload`"
          list-type="picture-card"
          :on-success="handlePictureCardPreview"
          :on-remove="handleRemove"
          :headers="{ Authorization: token}"
          name="file"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item>
      <!-- 提交 -->
      <el-button type="primary" @click="submitForm">提交</el-button>
    </el-form>
  </div>
</template>

<script>
import VueEditor from "vue-word-editor";
import "quill/dist/quill.snow.css";
export default {
  components : {
    VueEditor
  },
  data() {
    return {
      form: {
        title: "", //标题
        content: "", //文章的内容
        categories: [], //选中的栏目
        cover: [], //封面的图片
        type: 1 //类型 默认为1
      },
      // 栏目的数据
      list: [],
      // token
      token: JSON.parse(localStorage.getItem(`userdata`) || `{}`).token,
      // 副文本框的内置属性
      config: {
        // 上传图片的配置
        uploadImage: {
          url: this.$axios.defaults.baseURL+"/upload",
          name: "file",
          headers: {
          Authorization: JSON.parse(localStorage.getItem("userdata") || `{}`).token
        },
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess : (res, insert)=> {
            console.log(res)
            insert(this.$axios.defaults.baseURL + res.data.data.url);
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: this.$axios.defaults.baseURL+ "/upload",
          name: "file",
          uploadSuccess(res, insert) {
            insert(this.$axios.defaults.baseURL + res.data.url);
          }
        }
      }
    };
  },
  mounted() {
    this.$axios({
      url: "/category"
    }).then(res => {
      let { data } = res.data;
      this.list = data;
    });
  },
  methods: {
    // 删除文件时
    handleRemove(file, fileList) {
      let id = file.response.data.id;
      let arr = [];
      // 过滤循环
      this.form.cover = this.form.cover.filter(v => {
        return v.id !== id;
      });
      // this.form.cover.some((item,index)=>{
      //   if(item.id === id){
      //    this.form.cover.splice(index,1)
      //   }
      //   arr.push(item)
      // })
      // this.form.cover = arr
      // console.log(this.form.cover)
    },
    // 文件上传成功时
    handlePictureCardPreview(response, file, fileList) {
      // 将图片上传后的id存进空数组里
      this.form.cover.push({ id: response.data.id });
      // console.log(this.form.cover)
    },
    // 提交
    submitForm() {
      if(this.form.type===1){
         this.form.content=this.$refs.vueEditor.editor.root.innerHTML
      }
      // 为了匹配后台字段的要求，需要对响应的
      // 解构出来的是一个数组，需要遍历数组
      let { categories } = this.form;
      // 清空data的categories数组
      this.form.categories = [];
      categories.forEach(v => {
        this.form.categories.push({ id: v });
      });
      this.$axios({
        url: "/post",
        method: "post",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("userdata") || `{}`)
            .token
        },
        data: this.form
      }).then(res => {
        const { message } = res.data;
        this.$message.success(message);
        console.log(res);
      });
    }
  }
};
</script>

<style lang="less" scoped>
</style>