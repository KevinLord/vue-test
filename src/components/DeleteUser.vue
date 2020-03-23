<template>
  <div id="app">
    <!--表格数据及操作-->
    <el-table :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 50%;left: 300px;" stripe ref="multipleTable" tooltip-effect="dark">

      <el-table-column prop="user" label="用户" width="380">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页条-->
    <div style="text-align: center;margin-top: 30px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="current_change">
      </el-pagination>
    </div>


  </div>
</template>
<script>
    export default {
        data() {
            return {
                dialogCreateVisible: false,
                //表格数据
                table: [],
                //导航条默认选项
                activeIndex: '1',
                activeIndex2: '1',
                userIndex: 0,
                total: 0,
                pagesize:10,
                currentPage:1
            }
        },
        created: function () {
            this.AddDb();
        },
        methods: {
            current_change:function(currentPage){
                this.currentPage = currentPage;
            },
            indexMethod(index) {
                return index;
            },
            handleClose(done) {
                this.$confirm('确认关闭？')
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {
                    });
            },
            del(row, idx) {
                this.$confirm('确认删除？')
                    .then(_ => {
                        this.table.splice(idx, 1);
                        /*删除数据库中数据*/
                        var data = {userName: row.user}
                        this.$axios.delete("api/deleteUser", {data: data}
                        ).then(res => {
                            console.log(res)
                        })
                    })
                    .catch(_ => {
                    });
            },
            AddDb() {
                this.$axios.get("api/login").then(res => {
                    var data = [];
                    for (var x = 0; x < res.data.length; x++) {
                        var obj = {};
                        obj.user = res.data[x].userName;
                        data[x] = obj;
                    }
                    this.table = data;
                    this.total = data.length
                })
            }
        }
    }
</script>
