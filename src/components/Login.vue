<template>
  <div class="login-box">
    <!-- 通过:rules="loginFormRules"来绑定输入内容的校验规则 -->
    <el-form :rules="loginFormRules" ref="loginForm" :model="loginForm" label-position="right" label-width="auto"
             show-message>
      <span class="login-title">道交一体化数据融合处理平台</span>
      <div style="margin-top: 20px"></div>
      <el-form-item label="用户名" prop="loginName">
        <el-col :span="22">
          <el-input type="text" v-model="loginForm.loginName"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码" prop="loginPassword">
        <el-col :span="22">
          <el-input type="password" v-model="loginForm.loginPassword"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-col :span="18">
          <el-button type="primary" @click="loginSubmit()">登录</el-button>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
    export default {
        name: "login",
        data() {
            return {
                loginForm: {
                    loginName: '',
                    loginPassword: ''
                },
                // 表单验证，需要在 el-form-item 元素中增加 prop 属性
                loginFormRules: {
                    loginName: [
                        {required: true, message: '账号不可为空', trigger: 'blur'}
                    ],
                    loginPassword: [
                        {required: true, message: '密码不可为空', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            loginSubmit() {
                const UserMap = new Map()
                this.$axios.get("api/login").then(res => {
                    for (var x=0; x<res.data.length; x++)
                        UserMap.set(res.data[x].userName,res.data[x].userPassword)
                    var LoginName = this.loginForm.loginName;
                    var LoginPassword = this.loginForm.loginPassword;
                    if (UserMap.has(LoginName)) {
                        if (UserMap.get(LoginName)==LoginPassword)
                        {
                            this.$notify({
                                type: 'success',
                                message: '欢迎你,' + LoginName + '!',
                                duration: 3000
                            })
                            this.$router.replace('/home')
                        }
                        else
                        {
                            this.$message({
                                type: 'error',
                                message: '密码错误',
                                showClose: true
                            })
                        }
                    } else {
                        this.$message({
                            type: 'error',
                            message: '用户不存在',
                            showClose: true
                        })
                    }
                })
                this.toLog()
            },
            toLog()
            {
                var dd = new Date();
                var date=dd.getFullYear()+'年'+dd.getMonth()+'月'+dd.getDate()+'日'
                console.log(date)
                var time=dd.getHours()+':'+dd.getMinutes()+':'+dd.getSeconds()
                console.log(time)
                this.$axios.post("api/AddLog",
                    {"userName": this.loginForm.loginName,"date": date,"time": time}
                ).then(res => {
                    console.log(res)
                })
            }
        }
    }
</script>
<style scoped>
  .login-box {
    border: 1px solid black;
    width: 350px;
    margin: 180px auto;
    padding: 35px 35px 15px 35px;
    border-radius: 5px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
  }

  .login-title {
    text-align: center;
    margin: 0 auto 40px auto;
    color: steelblue;
    font-size: 25px;
    font-weight: bold;
  }
</style>
