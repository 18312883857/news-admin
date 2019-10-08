<template>
  <div>
    <!-- 内容表单 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index+1}}</span>
        </template>
      </el-table-column>
      
      <el-table-column label="标题" width="300">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.title}}</span>
        </template>
      </el-table-column>

      <el-table-column label="显示" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.open === 1?'打开':'关闭'}}</span>
        </template>
      </el-table-column>

      <el-table-column label="类型" width="180">
        <template slot-scope="scope">
          <span>{{scope.row.type === 1?'文章':'视频'}}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- scope.$index,是表格每一项的索引值 scope.row 是表单的内容 -->
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      pageIndex: 1,
      pageSize: 5
    };
  },
  mounted(){
    this.$axios({
      url : `/post?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`,
    }).then(res=>{
      let {data} = res.data
      console.log(data)
      this.tableData = data
    })
  },
  methods: {
    // 编辑按钮
    handleEdit(index, row) {
      // 参数分别是每一项的索引值和每一项的内容
      console.log(index, row);
    },
    // 删除按钮
    handleDelete(index, row) {
      // 参数分别是每一项的索引值和每一项的内容
      console.log(index, row);
    },
    // 分页器
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less" scoped>
.el-table{
  padding: 20px;
}
.block{
  margin: 20px;
  border: 1px #ffffff solid;
  background: #ffffff;
}
</style>