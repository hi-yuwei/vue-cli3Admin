<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  name: "VBreadcrumb"
};
</script>
<style lang="scss" scoped>
.breadcrumb {
  padding: 10px 20px;
  border-bottom:1px solid #ebeef5;
}
</style>
