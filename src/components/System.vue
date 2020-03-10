<template>
  <div>
    <h3>系统信息</h3>
    <div>
      系统名称：道交一体化数据融合处理平台
    </div>
    <div>
      系统版本：v1.0
    </div>
    <el-button style="width: 300px; margin:20px 5px 20px 25px;" type="primary" @click="toHome">返回</el-button>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    data(){
      return {}
    },
    methods: {
      toHome() {
        this.$router.push("/home");
      }
    }
  }
</script>
