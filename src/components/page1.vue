<template>
  <div id="app">
    <!--表格数据及操作-->
    <el-table :data="table.slice((currentPage-1)*pagesize,currentPage*pagesize)" border style="width: 100%" stripe ref="multipleTable" tooltip-effect="dark">
      <!--索引-->
      <el-table-column label="序号" width="100">
        <template slot-scope="scope">
          {{(currentPage-1)*pagesize+scope.$index+1}}
        </template>
      </el-table-column>

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
    <br>
    <!--新增按钮-->
    <el-col :span="1" class="grid">
      <el-button type="success" icon="el-icon-circle-plus-outline" size="mini" round
                 @click="dialogCreateVisible = true">新增
      </el-button>
    </el-col>
    <br>

    <div style="text-align: center;margin-top: 30px;">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        @current-change="current_change">
      </el-pagination>
    </div>

    <el-dialog
      title="新建案例"
      :visible.sync="dialogCreateVisible"
      width="30%"
      :before-close="handleClose">
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-row>
            <el-col :span="18">
              <el-form-item label="日期">
                <el-input v-model="form.date" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="form.name" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="地址">
                <el-input v-model="form.address" placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="事件">
                <el-input v-model="form.event" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCreateVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div>
        <el-form ref="form" :model="editObj" label-width="80px">
          <el-form-item label="日期">
            <el-input v-model="editObj.date"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="editObj.name"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="editObj.address"></el-input>
          </el-form-item>
          <el-form-item label="事件">
            <el-input v-model="editObj.event"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>

    </el-dialog>

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
            onSubmit() {
                console.log('submit!');
                this.dialogCreateVisible = false;
                this.created()
                this.add();
                /*this.AddDb();*/
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
            add() {
                this.table.push(this.form);
                this.form = {
                    date: '',
                    name: '',
                    address: '',
                    event: '',
                };
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
            edit(item, idx) {
                this.userIndex = idx;
                this.editObj = {
                    date: item.date,
                    name: item.name,
                    address: item.address,
                    event: item.event,
                };
                this.dialogVisible = true;
                this.oldName = item.name

            },
            confirm() {
                this.dialogVisible = false;
                this.table.splice(this.userIndex, 1, this.editObj);
                this.editPage1()
                this.AddDb()
            },
            editPage1() {
                this.$axios.post("api/changePage1",
                    {
                        "date": this.editObj.date,
                        "name": this.editObj.name,
                        "address": this.editObj.address,
                        "event": this.editObj.event,
                        "oldName": this.oldName
                    }
                ).then(res => {
                    console.log("前端已提交")
                })
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
