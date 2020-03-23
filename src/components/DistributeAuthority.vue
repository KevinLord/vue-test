<template>
  <div id="app">
    <!--表格数据及操作-->
    <el-table :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 60%;left: 200px;" stripe ref="multipleTable" tooltip-effect="dark">

      <!--索引-->
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">
          {{scope.$index+1}}
        </template>
      </el-table-column>

      <el-table-column prop="userName" label="用户" width="150">
      </el-table-column>
      <el-table-column prop="authority" label="权限" width="270">
      </el-table-column>

      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="setAdmin(scope.row,scope.$index)">权限切换</el-button>
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
                table: [],
                dialogVisible: false,
                //导航条默认选项
                activeIndex: '1',
                activeIndex2: '1',
                userIndex: 0,
                oldName: '',
                total: 0,
                pagesize:10,
                currentPage:1
            }
        },
        created: function () {
            this.loadTable();
        },
        methods: {
            current_change:function(currentPage){
                this.currentPage = currentPage;
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
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
            setAdmin(item, idx) {
                this.userIndex = idx;
                this.dialogVisible = true;
                if (item.authority =='admin' )
                    item.authority='user'
                else
                    item.authority='admin'

                this.$axios.post("api/authority",
                    {
                        "userName": item.userName,
                        "authority": item.authority,
                    }
                ).then(res => {
                })

                this.loadTable()
            },

            loadTable() {
                this.$axios.get("api/login").then(res => {
                    var data = [];
                    for (var x = 0; x < res.data.length; x++) {
                        var obj = {};
                        obj.userName = res.data[x].userName;
                        obj.authority = res.data[x].authority;
                        data[x] = obj;
                    }
                    this.table = data;
                    this.total = data.length
                })
            }
        }
    }
</script>
