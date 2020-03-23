<template>
  <div id="app">
    <!--表格数据及操作-->
    <el-table :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%" stripe ref="multipleTable" tooltip-effect="dark">

      <el-table-column prop="date" label="日期" width="140">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="120">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="280">
      </el-table-column>
      <el-table-column prop="event" label="事件" width="300">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row,scope.$index)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row,scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

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
                form: {
                    date: '',
                    name: '',
                    address: '',
                    event: '',
                },
                dialogCreateVisible: false,
                //表格数据
                table: [],
                dialogVisible: false,
                editObj: {
                    date: '',
                    name: '',
                    address: '',
                    event: '',
                },
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
            this.AddDb();
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
            created() {
                this.$axios.post("api/page1",
                    {
                        "date": this.form.date,
                        "name": this.form.name,
                        "address": this.form.address,
                        "event": this.form.event
                    }
                ).then(res => {
                    console.log(res)
                })
            },
            del(row,idx) {
                this.$confirm('确认删除？')
                    .then(_ => {
                        this.table.splice(idx, 1);
                        var data = {name: row.name}
                        this.$axios.delete("api/deletePage1", {data: data}
                        ).then(res => {
                            console.log(res)
                        })
                    })
                    .catch(_ => {
                    });
            },
            AddDb() {
                this.$axios.get("api/page1").then(res => {
                    var data = [];
                    for (var x = 0; x < res.data.length; x++) {
                        var obj = {};
                        obj.date = res.data[x].date;
                        obj.name = res.data[x].name;
                        obj.address = res.data[x].address;
                        obj.event = res.data[x].event;
                        data[x] = obj;
                    }
                    this.table = data;
                    this.total = data.length
                    console.log(this.total)
                })
            }
        }
    }
</script>
