<template>
  <div>
    <el-upload style="margin-left: -100px;"
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <el-form ref="form" :model="image" label-width="80px">

      <el-form-item style="margin-left: -180px;margin-top: 50px;">
        <el-button type="primary" @click="result">图像识别</el-button>
      </el-form-item>
      <el-row>
        <el-col span="18">
          <el-form-item label="识别结果" style="margin-left: 120px;margin-top: 30px;">
            <el-input type="textarea" :rows="5" v-model="imageProcess"></el-input>
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
                image: {},
                dialogImageUrl: '',
                dialogVisible: false,
                flag: 0,
                result:''
            };
        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            result() {
                this.flag = 1;
                this.post();
                this.get()
            },
            post() {
                this.$axios.post("api/page2",
                    {
                        "file": this.dialogImageUrl
                    }
                ).then(res => {
                    console.log("前端已提交")
                })
            },
            get(){
                this.$axios.get("api/page2").then(res => {
                    this.result = res.data.result;
                })
            }
        },
        computed: {
            imageProcess() {
                if (this.flag == 1)
                    return this.result;
                else
                    return null
            }
        }
    }
</script>
