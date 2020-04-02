<template>
  <div>
    <el-form ref="form" :model="formInput" label-width="80px">
      <el-row>
        <el-col span="18">
          <el-form-item label="案件描述">
            <el-input type="textarea" :rows="5" v-model="formInput.detail"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item style="margin-left: -200px;">
        <el-button type="primary" @click="result">数据挖掘</el-button>
      </el-form-item>
    </el-form>

    <el-form ref="form" :model="formResult" label-width="80px"  style="margin-left: 200px;margin-top: 100px">
      <el-row>
        <el-col span="8">
          <el-form-item label="人员">
            <el-input v-model="renyuan"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="描述">
            <el-input v-model="miaoshu"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="8">
          <el-form-item label="类型">
            <el-input v-model="leixing"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="挖掘结果">
            <el-input v-model="jieguo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                formInput: {
                    detail: ''
                },
                formResult: {},
                flag: 0,
                result:{
                    ruanyuan:'',
                    miaoshu:'',
                    leixing:'',
                    jieguo:''
                }
            };

        },
        methods: {
            result() {
                if (this.formInput.detail=='')
                {
                    this.$notify({
                        type: 'error',
                        message: '请填写案件描述',
                        showClose: true
                    })
                }
                else
                {
                    this.flag = 1;
                    this.post();
                    this.get()
                }
            },
            post() {
                this.$axios.post("api/page3",
                    {
                        "detail": this.formInput.detail
                    }
                ).then(res => {
                    console.log("前端已提交")
                })
            },
            get(){
                this.$axios.get("api/page3").then(res => {
                    this.result = res.data.result;
                })
            }
        },
        computed: {
            renyuan() {
                if (this.flag == 1)
                    return this.result.renyuan;
                else
                    return null
            },
            miaoshu() {
                if (this.flag == 1)
                    return this.result.miaoshu;
                else
                    return null
            },
            leixing() {
                if (this.flag == 1)
                    return this.result.leixing;
                else
                    return null
            },
            jieguo() {
                if (this.flag == 1)
                    return this.result.jieguo;
                else
                    return null
            },
        }
    }
</script>
