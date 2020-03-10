<template>
  <div>
    <div>
      <h3>修改密码</h3>
    </div>
    <div class="el-form-change">
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
            <el-form-item label="旧密码">
              <el-input v-model="passwordForm.oldPassword"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col span="18">
            <el-form-item label="新密码">
              <el-input v-model="passwordForm.newPassword"></el-input>
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
        <div class="confirm-change">
          <el-form-item>
            <el-button type="primary" @click="confirmChange">确认修改</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <div class="el-btn-change">
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
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                }
            }
        },
        methods: {
            toHome() {
                this.$router.push("/home");
            },
            changePassword() {
                this.$axios.post("api/changePassword",
                    {"userName": this.passwordForm.username, "newPassword": this.passwordForm.newPassword}
                ).then(res => {
                    console.log("前端已提交")
                })
            },
            confirmChange() {
                const UserMap = new Map()
                this.$axios.get("api/login").then(res => {
                    for (var x = 0; x < res.data.length; x++)
                        UserMap.set(res.data[x].userName, res.data[x].userPassword)
                    var username = this.passwordForm.username;
                    var oldPassword = this.passwordForm.oldPassword;
                    var newPassword = this.passwordForm.newPassword;
                    var confirmPassword = this.passwordForm.confirmPassword;
                    if (username == '' || oldPassword == '' || newPassword == '' || confirmPassword == '') {
                        this.$notify({
                            type: 'error',
                            message: '请将表单填写完整',
                            showClose: true
                        })
                    } else {
                        if (UserMap.has(username)) {
                            if (UserMap.get(username) == oldPassword) {
                                console.log("密码正确")
                                if (newPassword==confirmPassword) {
                                    console.log("填写正确")
                                    this.changePassword()
                                    this.$alert('修改成功', {
                                        confirmButtonText: '确定',
                                    });
                                    this.passwordForm={
                                        username:'',
                                        oldPassword: '',
                                        newPassword: '',
                                        confirmPassword: ''
                                    }
                                } else {
                                    this.$notify({
                                        type: 'error',
                                        message: '确认密码不一致',
                                        showClose: true
                                    })
                                }
                            } else {
                                this.$notify({
                                    type: 'error',
                                    message: '密码错误',
                                    showClose: true
                                })
                            }
                        } else {
                            this.$notify({
                                type: 'error',
                                message: '用户不存在',
                                showClose: true
                            })
                        }
                    }
                })
            }
        }
    }
</script>

<style>
  .el-form-change {
    position: absolute; /*绝对定位*/
    width: 520px;
    height: 200px;
    text-align: center; /*(让div中的内容居中)*/
    top: 50%;
    left: 50%;
    margin-top: -300px;
    margin-left: -100px;
  }

  .confirm-change {
    position: absolute; /*绝对定位*/
    width: 370px;
    height: 200px;
  }

  .el-btn-change {
    position: absolute; /*绝对定位*/
    top: 680px;
    left: 750px;
    margin: -200px -70px;
  }
</style>
