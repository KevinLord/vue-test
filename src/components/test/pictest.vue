<template>
  <div>
    <el-upload style="margin-left: -100px;"
               action="http://localhost:8080/api/pic"
               list-type="picture-card"
               :on-preview="handlePictureCardPreview"
               :on-remove="handleRemove"
               :on-success="onSuccess"
               :name="imgUrl"
               :ref="upload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>

    <!--<el-form ref="form" :model="image" label-width="80px">

      <el-form-item style="margin-left: -180px;margin-top: 50px;">
        <el-button type="primary" @click="result">图像识别</el-button>
      </el-form-item>
      <el-row>
        <el-col span="18">
          <el-form-item label="案件描述" style="margin-left: 120px;margin-top: 30px;">
            <el-input type="textarea" :rows="5" v-model="imageProcess"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
-->
    <div>
      <input type="button" value="保存" class="yes" @click="submit2">
      <router-link to="/action/index">
        <input type="button" value="返回" class="no">
      </router-link>
    </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                file: '',
                dialogImageUrl: '',
                dialogVisible: false,
                imgUrl: '',
                userId: '',
                uid: '',

                // 上传图片时附带的额外参数userId
                resData: {
                    userId: window.localStorage["userId"]
                },
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

            // 点击保存按钮上传图片
            submit2: function (res) {
                this.$refs.upload.submit();
                console.log(res)
            },

            // 图片上传成功后，后台返回图片的路径
            onSuccess: function (res) {
                // console.log(res);
                if (res.status == 200) {
                    this.imgUrl = res.data.imgUrl;
                }
            },
        },
        computed: {
            imageProcess() {
                return "图像识别结果";
            }
        }
    }
</script>

