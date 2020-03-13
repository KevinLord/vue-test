<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-row>
        <el-col span="8">
          <el-form-item label="当事人A">
            <el-input v-model="form.name1"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="责任概率">
            <el-input v-model="form.probability1"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col span="8">
          <el-form-item label="当事人B">
            <el-input v-model="form.name2"></el-input>
          </el-form-item>
        </el-col>
        <el-col span="8">
          <el-form-item label="责任概率">
            <el-input v-model="form.probability2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="result">计算</el-button>
      </el-form-item>

      <el-col span="18">
        <el-form-item label="融合结果" >
          <el-input type="textarea" v-model="jisuan"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    name1: '',
                    name2: '',
                    probability1: 0,
                    probability2: 0,
                },
                flag: 0,
                people:''
            };

        },
        methods: {
            result() {
                this.flag =1;
            },
        },
        computed: {
            jisuan() {
                if (this.form.probability1 == 0 || this.form.probability2 == 0 || this.form.name1 == '' || this.form.name2 == '') {
                    this.flag = 0
                    this.$notify({
                        type: 'error',
                        message: '请填写完整',
                        showClose: true
                    })
                }
                if (this.flag == 1) {
                    if (this.form.probability1 > this.form.probability2) {
                        this.people = this.form.name1
                    } else {
                        this.people = this.form.name2
                    }
                    return this.form.name1 + "的责任为" + this.form.probability1 + "," + this.form.name2 + "的责任为" + this.form.probability2 + "," + "数据融合结果为：" + (parseInt(this.form.probability1) * parseInt(this.form.probability2))
                        + "。\n" + "是"+this.people+"的责任";
                } else
                    return null
            }
        }
    }
</script>
