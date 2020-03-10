<template>
  <div>
    <h3>权限分配</h3>

    <el-button style="width: 300px; margin:20px 5px 20px 25px;" type="primary" @click="toHome">返回</el-button>
  </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {}
        },
        methods: {
            toHome() {
                this.$router.push("/home");
            },

        }
    }
</script>
