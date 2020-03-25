<template>     
  <div style="background-color: #EBEBEB;min-height:900px">
    <div style="width:100%;background-color: #636363; overflow: hidden; margin-top: -30px">
            <span class="demonstration" style="float:left;padding-top:10px;color:black;margin-left:1%">
                道交一体化数据融合处理平台
            </span>

      <span class="safety" style="float:right;padding-top:10px;margin-right:1%">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link" style="color:darkblue">
                    安全管理<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="log">日志管理</el-dropdown-item>
                    <el-dropdown-item @click.native="system">关于系统</el-dropdown-item>
                    <el-dropdown-item @click.native="login">退出系统</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </span>
      <span class="user" style="float:right;padding-top:10px;margin-right:1%">
                <el-dropdown trigger="click">
                  <span class="el-dropdown-link" style="color:darkblue">
                    用户管理<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="AddUser">新建用户</el-dropdown-item>
                    <el-dropdown-item @click.native="ChangePassword">密码修改</el-dropdown-item>
                    <el-dropdown-item @click.native="DeleteUser">删除用户</el-dropdown-item>
                    <el-dropdown-item @click.native="DistributeAuthority">权限分配</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            </span>
    </div>

    <div style="margin-top:5px">
      <el-row :gutter="10">
        <el-col :xs="4" :sm="4" :md="4" :lg="4">
          <div>
            <el-menu default-active="1" class="el-menu-vertical-demo" background-color="#909399" text-color="black" active-text-color="white"
                     style="min-height:900px" @select="handleSelect">
              <el-menu-item index="1"><i class="el-icon-data capture"></i>道交事故数据采集</el-menu-item>
              <el-menu-item index="2"><i class="el-icon-image capture"></i>图像采集</el-menu-item>
              <el-menu-item index="3"><i class="el-icon-data integration"></i>数据整合关联</el-menu-item>
              <el-menu-item index="4"><i class="el-icon-data fusion"></i>数据融合处理</el-menu-item>
            </el-menu>
          </div>
        </el-col>
        <el-col :xs="20" :sm="20" :md="20" :lg="20">
          <div>
            <div
              style="border: 1px solid #A6A6A6; border-radius:6px; padding:5px; height:30px; width:120px; margin:30px; background-color: lightskyblue">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item style="font-size:130%; line-height:160%; text-align:center; margin-left: 20px;"
                                    v-for="item in breadcrumbItems">{{item}}
                </el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </div>

          <div style="margin-top:10px">
            <router-view></router-view>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                searchCriteria: '',
                breadcrumbItems: ['道交一体化'],
            }
        },

        methods: {
            login() {
                this.$router.push('/')
            },
            log() {
                this.$router.push('/log')
                this.breadcrumbItems = ['日志管理']
            },
            system() {
                this.$router.push('/system')
                this.breadcrumbItems = ['系统信息']
            },
            AddUser() {
                this.$router.push('/adduser')
                this.breadcrumbItems = ['新建用户']
            },
            ChangePassword() {
                this.$router.push('/changepassword')
                this.breadcrumbItems = ['修改密码']
            },
            DeleteUser() {
                this.$router.push('/deleteuser')
                this.breadcrumbItems = ['删除用户']
            },
            DistributeAuthority() {
                this.$router.push('/distributeauthority')
                this.breadcrumbItems = ['权限分配']
            },

            handleSelect(key, keyPath) {
                switch (key) {
                    case '1':
                        this.$router.push('/Page1');
                        this.breadcrumbItems = ['数据采集']
                        break;
                    case '2':
                        this.$router.push('/Page2')
                        this.breadcrumbItems = ['图像采集']
                        break;
                    case '3':
                        this.$router.push('/Page3')
                        this.breadcrumbItems = ['数据整合']
                        break;
                    case '4':
                        this.$router.push('/Page4')
                        this.breadcrumbItems = ['数据融合']
                        break;
                }
            },
        },
    }
</script>

