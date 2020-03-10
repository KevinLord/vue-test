<template>
  <div>
    <div>
      <h3>新建用户</h3>
    </div>
    <div class="el-form-add">
      <el-form ref="form" :model="passwordForm" label-width="80px">
        <el-row>
          <el-col span="18">
            <el-form-item label="用户名">
              <el-input v-model="passwordForm.username"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="18">
            <el-form-item label="密码">
              <el-input v-model="passwordForm.password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="18">
            <el-form-item label="确认密码">
              <el-input v-model="passwordForm.confirmPassword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="confirm-add">
          <el-form-item>
            <el-button type="primary" @click="addUser">确认提交</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="el-btn-add">
      <el-button style="width: 300px; margin:20px 5px 20px 25px;" type="primary" @click="toHome">返回</el-button>
    </div>
  </div>

</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                passwordForm: {
                    username: '',
                    password: '',
                    confirmPassword: ''
                },
            }
        },
        methods: {
            toHome() {
                this.$router.push("/home");
            },
            addUser() {
                this.created()
            },
            created() {
                if (this.passwordForm.username=='' || this.passwordForm.password=='' || this.passwordForm.confirmPassword=='')
                {
                    console.log(this.passwordForm.username)
                    this.$notify({
                        type: 'error',
                        message: '请将表单填写完整',
                        showClose: true
                    })
                }
                else
                    {
                    if (this.passwordForm.password!=this.passwordForm.confirmPassword)
                        this.$notify({
                            type: 'error',
                            message: '密码不一致',
                            showClose: true
                        })
                    else
                    {
                        this.$axios.post("api/addUser",
                            {"userName": this.passwordForm.username, "userPassword": this.passwordForm.password}
                        ).then(res => {
                            this.$alert('新建成功', '标题名称', {
                                confirmButtonText: '确定',
                            });
                            this.passwordForm={
                                username:'',
                                password: '',
                                confirmPassword: ''
                            }
                        })
                    }
                }
            },
        }
    }
</script>

<style>
  .el-form-add {
    position: absolute; /*绝对定位*/
    width: 520px;
    height: 200px;
    text-align: center; /*(让div中的内容居中)*/
    top: 50%;
    left: 50%;
    margin-top: -300px;
    margin-left: -100px;
  }

  .confirm-add {
    position: absolute; /*绝对定位*/
    width: 370px;
    height: 200px;
  }

  .el-btn-add {
    position: absolute; /*绝对定位*/
    top: 680px;
    left: 750px;
    margin: -200px -70px;
  }
</style>
