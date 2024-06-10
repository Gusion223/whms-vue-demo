<template>
    <el-scrollbar style="padding-left: 20px; padding-right: 20px;">

<!--      // 顶部搜索栏-->
      <div class="top-search">
        <el-input v-model="nameInput" placeholder="请输入要查询的人员名称"
                  style="width: 20%;" suffix-icon="search" @keyup.enter="loadData"/>
        <el-select v-model="userTypeInput" placeholder="请选择用户类型"
                   @keyup.enter="loadData" style="width: 20%;">
          <el-option :key="-1" :label="'请选择用户类型'" :value="-1"></el-option>
          <el-option v-for="item in userTypeDisplay" :key="item.value" :label="item.text" :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" style="margin-left: 5px" @click="loadData">查询</el-button>
        <el-button type="warning" style="margin-left: 5px" @click="resetTableData">重置</el-button>
        <el-button type="success" style="margin-left: 5px" @click="openAddForm">增加用户</el-button>
      </div>

<!--      // 添加信息的窗口-->
      <el-dialog title="添加用户" v-model="addFormVisible" class="formDialog">
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef">
          <el-form-item prop="userName" :label-width="addFormLabelWidth" label="用户名">
              <el-input v-model="addForm.userName"></el-input>
          </el-form-item>
          <el-form-item prop="nickName" :label-width="addFormLabelWidth" label="用户昵称">
            <el-input v-model="addForm.nickName"></el-input>
          </el-form-item>
          <el-form-item prop="password" :label-width="addFormLabelWidth" label="密码">
            <el-input v-model="addForm.password" ></el-input>
          </el-form-item>
          <el-form-item prop="sex" :label-width="addFormLabelWidth" label="性别">
            <el-select v-model="addForm.sex">
              <el-option :key="-1" label="请选择性别" :value="-1"></el-option>
              <el-option v-for="item in sexDisplay" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-form-item prop="age" :label-width="addFormLabelWidth" label="年龄">
            <el-input-number v-model="addForm.age" controls-position="right" style="width: 100%"></el-input-number>
          </el-form-item>
          <el-form-item prop="phone" :label-width="addFormLabelWidth" label="电话号码">
            <el-input v-model="addForm.phone" placeholder="电话号码"></el-input>
          </el-form-item>
          <el-form-item prop="userType" :label-width="addFormLabelWidth" label="角色">
            <el-select v-model="addForm.userType">
              <el-option :key="-1" label="请选择用户类型" :value="-1"></el-option>
              <el-option v-for="item in userTypeDisplay" :key="item.value" :label="item.text" :value="item.value" />
            </el-select>
          </el-form-item>
          <el-button type="primary" @click="tryAdd">添加新的用户</el-button>
        </el-form>
      </el-dialog>

<!--      // 表格数据-->
      <el-table  :data="tableData" border style="width:100%">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="nickName" label="用户昵称" />
        <el-table-column prop="userName" label="用户名" />
<!--        <el-table-column prop="password" label="密码" />-->
        <el-table-column prop="age" label="年龄" />
        <el-table-column prop="sex" label="性别">
          <template #default="scope">
              <el-tag :type="sexDisplay[scope.row.sex].type" :disable-transitions="true">
                {{sexDisplay[scope.row.sex].text}}
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

<!--      // 分页-->
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
  import {ElMessage} from "element-plus";

  // 表格信息
  const tableData = ref([])
  const totalSize = ref(1)
  const currentPage = ref(1)
  const pageSize = ref(2)
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
  const sexDisplay=[
    {
      text:"女",
      type:'danger',
      value:0
    },
    {
      text:"男",
      type:"primary",
      value:1
    }

  ]

  // 搜索框相关
  const nameInput = ref("")
  const userTypeInput = ref(-1)

  // 添加表单
  const addFromDefaultValue = {
    userName:"",
    nickName:"",
    password:"",
    sex:-1,
    age:20,
    phone:"",
    userType:-1
  }
  const addFormVisible = ref(true)
  // emm 深拷贝比较逆天就是了
  const addForm = ref(JSON.parse(JSON.stringify(addFromDefaultValue)))
  const addFormRules = ref({
        userName:[{required: true,  message:"请输入用户名", trigger:"blur"}],
        nickName:[{required: true,  message:"请输入用户昵称", trigger:"blur"}],
        password:[{required: true,  message:"请输入用户密码", trigger:"blur"}],
        sex:[
          {type:"number" ,min: 0, max: 1, required: true,  message:"请选择用户性别", trigger:"change"},
        ],
        age:[{required: true,  message:"请输入用户年龄", trigger:"blur"}],
        phone:[{required: true,  message:"请输入用户电话号码", trigger:"blur"}],
        userType:[
          {type:"number", min:0, max:2, required: true,  message:"请选择用户类型", trigger:"change"}
        ]

  })
  const addFormRef = ref(null)
  const addFormLabelWidth=ref("6em")
  const tryAdd = async ()=>{
    try{
      let pass = await addFormRef.value.validate()
      if(!pass)
        ElMessage({message:"错误", type:'warning'})
      else
        addFormVisible.value=false
    }catch(e){
      ElMessage({message:"错误", type:'warning'})
    }
  }


  const openAddForm = ()=>{
    addFormVisible.value=true
    addForm.value = JSON.parse(JSON.stringify(addFromDefaultValue))
  }

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
.top-search{
  display: flex;
  margin-bottom: 5px;
}
:deep(.el-dialog){
  width: 400px;
}
</style>