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
      <!-- <el-checkbox-group v-model="form.categories" style="width:800px">
        <el-form-item label="栏目">
          <el-checkbox
            v-for="(item,index) in list"
            :key="index"
            :label="item.id"
            v-show="item.id !== 999"
          >{{item.name}}</el-checkbox>
        </el-form-item>
      </el-checkbox-group>-->
      <!-- 副文本框 -->
      <el-form-item label="内容" style="width:800px" v-if="form.type===1">
        <!-- <el-input type="textarea" v-model="form.content" rows="5"></el-input> -->
        <VueEditor :config="config" ref="vueEditor" />
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
          :file-list="form.cover"
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
  components: {
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
          url: this.$axios.defaults.baseURL + "/upload",
          name: "file",
          headers: {
            Authorization: JSON.parse(localStorage.getItem("userdata") || `{}`)
              .token
          },
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess: (res, insert) => {
            console.log(res);
            insert(this.$axios.defaults.baseURL + res.data.data.url);
          }
        },
        // 上传视频的配置
        uploadVideo: {
          url: this.$axios.defaults.baseURL + "/upload",
          name: "file",
          uploadSuccess(res, insert) {
            insert(this.$axios.defaults.baseURL + res.data.url);
          }
        }
      }
    };
  },
  mounted() {
    //   获取当前页面url地址栏的id
    let id = this.$route.params.id;
    this.$axios({
      url: "/post/" + id
    }).then(res => {
      let { data } = res.data;
      this.form = {
        title: data.title,
        content: "",
        type: data.type,
        cover: []
      };
      data.cover.forEach(v => {
        // 判断url是否有http地址
        if (v.url.indexOf("http") === -1) {
          v.url = this.$axios.defaults.baseURL + v.url;
        }
        this.form.cover.push(v);
      });
      //   将content内容赋值到富文本框里面
      this.$refs.vueEditor.editor.clipboard.dangerouslyPasteHTML(
        0,
        data.content
      );
    });
  },
  methods: {
    // 删除文件时
    handleRemove(file, fileList) {
      console.log(file, fileList);
      this.form.cover = fileList;
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
    handlePictureCardPreview(res, file) {
      console.log(res, file);
      // 把文章的内容回显到表单中
      this.form.cover.push({
        id: res.data.id,
        uid: res.data.uid,
        url: this.$axios.defaults.baseURL + res.data.url
      });
    },
    // 提交
    submitForm() {
      if (this.form.type === 1) {
        this.form.content = this.$refs.vueEditor.editor.root.innerHTML;
      }
      let id = this.$route.params.id;
      this.$axios({
        url: "/post_update/" + id,
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