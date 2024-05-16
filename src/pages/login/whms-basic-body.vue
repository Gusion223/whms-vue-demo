<template>
    <el-scrollbar>
      <el-table :data="tableData" border style="width=100%">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="no" label="账号" />
        <el-table-column prop="password" label="密码" />
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="sex" label="性别">
          <template #default="scope">
              <el-tag :type="scope.row.sex === 0 ? 'success':'primary'" :disable-transitions="true">
                {{scope.row.sex === 0 ? '女':'男'}}
              </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="电话"/>       
        <el-table-column prop="roldId" label="角色">
          <template #default="scope">
              <el-tag :type="scope.row.roleId === 0 ? 'warning':'primary'" :disable-transitions="true">
                {{scope.row.roleId === 0 ? '超级管理员':'管理员'}}
              </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <div style="display: flex;">
            <el-button size='small' type="success">修改</el-button>
            <el-button size='small' type="danger">删除</el-button>
          </div>
        </el-table-column>
      </el-table>
  </el-scrollbar>
</template>

<script setup>
  import { ref, toRefs, defineProps} from 'vue';
  const props = defineProps(["tableData"])
  let tableData = ref([])
  console.log("Message From Body SetUp")
  tableData = toRefs(props).tableData
  console.log(tableData.value)
</script>

<style scoped>
.el-button
{
  margin:0px
}
</style>