<template>
    <el-scrollbar style="padding-left: 20px; padding-right: 20px;">
      <div style="display: flex">
        <el-input v-model="nameInput" placeholder="请输入要查询的人员名称"
                  style="width: 20%;" suffix-icon="search" @keyup.enter="loadData"/>
        <el-select v-model="userTypeInput" placeholder="请选择用户类型"
                   @keyup.enter="loadData" style="width: 20%;">
          <el-option :key="-1" :label="'请选择用户类型'" :value="-1"></el-option>
          <el-option v-for="(value, key) in userTypeDisplay" :key="key" :label="value.text" :value="key">
          </el-option>
        </el-select>
        <el-button type="primary" style="margin-left: 5px" @click="loadData">查询</el-button>
        <el-button type="success" style="margin-left: 5px" @click="resetTableData">重置</el-button>
      </div>
      
      <el-table  :data="tableData" border style="width:100%">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="nickName" label="姓名" />
        <el-table-column prop="userName" label="账号" />
<!--        <el-table-column prop="password" label="密码" />-->
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="sex" label="性别">
          <template #default="scope">
              <el-tag :type="scope.row.sex === 0 ? 'success':'primary'" :disable-transitions="true">
                {{scope.row.sex === 0 ? '女':'男'}}
              </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="电话"/>       
        <el-table-column prop="userType" label="角色">
          <template #default="scope">
              <el-tag :type="userTypeDisplay[scope.row.userType].type" :disable-transitions="true">
                {{userTypeDisplay[scope.row.userType].text}}
              </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template #default="scope">
            <div style="display: flex;">
              <el-button size='small' type="success">修改</el-button>
              <el-button size='small' type="danger"
                         :disabled="disableDelBtn(scope.row.id, scope.row.userType)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="display: flex; justify-content: center; margin-top: 10px;">
        <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[2, 5, 10, 20]"
        :small="false"
        :disabled="false"
        :background="false"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalSize"
        @size-change="loadData"
        @current-change="loadData"
        />
      </div>
  </el-scrollbar>

</template>

<script setup>
  import {onMounted, ref} from "vue";
  import {ApiGetUsers, ApiGetUserWith} from "@/api/serviceApi";

  const tableData = ref([])
  const totalSize = ref(1)
  const currentPage = ref(1)
  const pageSize = ref(2)
  const nameInput = ref("")
  const userTypeInput = ref(-1)

  const userTypeDisplay=[
    {
      text:"系统管理员",
      type:"warning",
      value:0
    },
    {
      text:"仓管员",
      type:"primary",
      value:1
    },
    {
      text:"销售员",
      type:"success",
      value:2
    }
  ]

  const currentUser = JSON.parse(sessionStorage.getItem("CurrentUser"))

  const disableDelBtn = (id, userType)=>{
    if(currentUser && currentUser.id===id)
        return true
    if(userType===0)
        return true
    return false
  }

  const loadData = async ()=>{
    console.log("Start Loading UserData")
    let index, size;
    if(currentPage.value * (pageSize.value-1) > totalSize.value){
      index = 1
      size = pageSize.value
    }else{
      index = currentPage.value
      size = pageSize.value
    }

    try{
      let res;
      console.log(userTypeInput.value, typeof(userTypeInput.value))
      if(nameInput.value!=="" || userTypeInput.value!==-1)
      {
        // console.log("UserType:", userTypeInput.value)
        res = await ApiGetUserWith(index, size, nameInput.value, userTypeInput.value)
      }else {
        res = await ApiGetUsers(index, size)
      }
      console.log(res)
      tableData.value = res.data.data
      totalSize.value = res.data.total
    }catch (e){
      console.log(e)
    }
  }

  const resetTableData = async ()=>{
    nameInput.value = ""
    userTypeInput.value=-1
    await loadData()
  }


  onMounted(()=>{
    loadData()
  })
</script>

<style scoped>
.el-button
{
  margin:0
}
</style>