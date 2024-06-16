<template>
    <el-scrollbar style="padding-left: 20px; padding-right: 20px;">

<!--      // 顶部搜索栏-->
      <div class="top-search">
        <el-input v-model="nameSearch" placeholder="请输入要查询的人员名称"
                  style="width: 20%;" suffix-icon="search" @keyup.enter="loadData"/>
        <el-select v-model="userTypeSearch" placeholder="请选择用户类型"
                   @keyup.enter="loadData" style="width: 20%;">
          <el-option :key="-1" :label="'请选择用户类型'" :value="-1"></el-option>
          <el-option v-for="item in userTypeDisplay" :key="item.value" :label="item.text" :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" style="margin-left: 5px" @click="loadData">查询</el-button>
        <el-button type="warning" style="margin-left: 5px" @click="resetTableData">重置</el-button>
        <el-button type="success" style="margin-left: 5px" @click="openAddForm">增加用户</el-button>
      </div>

<!--      // 添加信息的表单-->
      <div>
        <el-dialog title="添加新用户" v-model="addFormVisible">
          <el-form :model="addForm" :rules="formRules" ref="addFormRef">
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
            <el-button type="info" @click="addFormVisible=false">取消</el-button>
            <el-button type="primary" @click="tryAdd">添加新的用户</el-button>
          </el-form>
        </el-dialog>
      </div>

<!--      // 修改信息的表单-->
      <div>
        <el-dialog title="修改用户信息" v-model="updateFormVisible">
          <el-form :model="updateForm" :rules="formRules" ref="updateFormRef">
            <el-form-item prop="userName" :label-width="updateFormLabelWidth" label="用户名">
              <el-input v-model="updateForm.userName" :disabled="updateExtraCfg.userName.lock"></el-input>
            </el-form-item>
            <el-form-item prop="nickName" :label-width="updateFormLabelWidth" label="用户昵称">
              <el-input v-model="updateForm.nickName"></el-input>
            </el-form-item>
            <el-form-item prop="sex" :label-width="updateFormLabelWidth" label="性别">
              <el-select v-model="updateForm.sex">
                <el-option :key="-1" label="请选择性别" :value="-1"></el-option>
                <el-option v-for="item in sexDisplay" :key="item.value" :label="item.text" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item prop="age" :label-width="updateFormLabelWidth" label="年龄">
              <el-input-number v-model="updateForm.age" controls-position="right" style="width: 100%"></el-input-number>
            </el-form-item>
            <el-form-item prop="phone" :label-width="updateFormLabelWidth" label="电话号码">
              <el-input v-model="updateForm.phone" placeholder="电话号码"></el-input>
            </el-form-item>
            <el-form-item prop="userType" :label-width="updateFormLabelWidth" label="角色">
              <el-select v-model="updateForm.userType">
                <el-option :key="-1" label="请选择用户类型" :value="-1"></el-option>
                <el-option v-for="item in userTypeDisplay" :key="item.value" :label="item.text" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-button type="info" @click="updateFormVisible=false">取消</el-button>
            <el-button type="primary" @click="tryUpdate">修改当前用户信息</el-button>
          </el-form>
        </el-dialog>
      </div>


<!--      // 表格数据-->
      <el-table  :data="tableData" border style="width:100%">
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="userName" label="用户名" />
        <el-table-column prop="nickName" label="用户昵称" />
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
              <el-button size='small' type="success" @click="openUpdateForm(scope.row)">修改</el-button>
              <el-button size='small' type="danger"
                         :disabled="disableDelBtn(scope.row.id, scope.row.userType)"
                         @click="tryDelete(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

<!--      // 分页-->
      <div style="display: flex; justify-content: center; margin-top: 10px;">
        <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="pageSizes"
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
  import {ApiGetUsers, ApiGetUserWith, ApiAddUser, ApiUpdateUser, ApiDeleteUser} from "@/api/serviceApi";
  import {ElMessage} from "element-plus";

  // 表格信息
  const tableData = ref([])
  const totalSize = ref(1)
  const currentPage = ref(1)
  const pageSize = ref(5)
  const pageSizes = ref([5, 10, 20])
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
  const nameSearch = ref("")
  const userTypeSearch = ref(-1)

  // 添加表单
  const formDefaultValue = {
    userName:"",
    nickName:"",
    password:"",
    sex:-1,
    age:20,
    phone:"",
    userType:-1
  }
  const formRules = ref({
    userName:[{required: true,  message:"请输入用户名", trigger:"blur"},{min:1, max:20, pattern:/^[A-Za-z0-9]+$/, message: "情输入1-20英文数字字符作为用户名", trigger:'blur'}],
    nickName:[{required: true,  message:"请输入用户昵称", trigger:"blur"}],
    password:[{required: true,  message:"请输入用户密码", trigger:"blur"}],
    sex:[{type:"number" ,min: 0, max: 1, required: true,  message:"请选择用户性别", trigger:"change"}],
    age:[{required: true,  message:"请输入用户年龄", trigger:"blur"}],
    phone:[{required: true,  message:"请输入用户电话号码", trigger:"blur"}],
    userType:[{type:"number", min:0, max:2, required: true,  message:"请选择用户类型", trigger:"change"}]
  })

  const addFormVisible = ref(false)
  // emm 深拷贝比较逆天就是了
  const addForm = ref(JSON.parse(JSON.stringify(formDefaultValue)))
  const addFormRef = ref(null)
  const addFormLabelWidth=ref("6em")

  // 修改表单
  const updateFormVisible = ref(false)
  const updateForm = ref(JSON.parse(JSON.stringify(formDefaultValue)))
  const updateFormRef = ref(null)
  const updateExtraCfg = ref({
    userName: {lock:true},
    nickName: {lock:false},
    password: {lock:true},
    sex:{lock:false},
    age:{lock:false},
    phone:{lock:false},
    userType:{lock:false}
  })
  const currentUser = JSON.parse(sessionStorage.getItem("CurrentUser"))


  const updateFormLabelWidth=ref("6em")

  const openAddForm = ()=>{
    console.log("打开添加表单")
    addForm.value = JSON.parse(JSON.stringify(formDefaultValue))
    addFormVisible.value=true
  }
  const openUpdateForm = (rowData)=>{
    updateForm.value = JSON.parse(JSON.stringify(rowData))
    updateFormVisible.value = true

  }
  const disableDelBtn = (id, userType)=>{
    if(currentUser && currentUser.id===id)
      return true
    if(userType===0)
      return true
    return false
  }
  const tryAdd = async ()=>{
    console.log("尝试提交添加表单")
    try{
      let passValidate = await addFormRef.value.validate()
      if(!passValidate){
        return
      }
      // api处理
      let res = await ApiAddUser(
          addForm.value.userName,
          addForm.value.nickName,
          addForm.value.password,
          addForm.value.sex,
          addForm.value.age,
          addForm.value.phone,
          addForm.value.userType
      )
      if(res.data.status!==200){
        ElMessage({message:res.data.msg, type:"warning"})
        return
      }
      // 关闭窗口
      addFormVisible.value=false
      ElMessage({message:`用户${addForm.value.userName}添加成功`, type:"success"})
      await loadData()
    }catch(e){
      console.log(e)
    }
  }
  const tryUpdate = async ()=>{
    try{
      let passValidate = await updateFormRef.value.validate()
      if(!passValidate){
        // ElMessage({message:"用户表单未通过校验要求", type:'warning'})
        return
      }
      console.log(
          updateForm.value.id,
          updateForm.value.nickName,
          updateForm.value.sex,
          updateForm.value.age,
          updateForm.value.phone,
          updateForm.value.userType
      )

      let res = await ApiUpdateUser(
          updateForm.value.id,
          updateForm.value.nickName,
          updateForm.value.sex,
          updateForm.value.age,
          updateForm.value.phone,
          updateForm.value.userType
      )

      if(res.data.status!==200)
      {
        ElMessage({message:res.data.msg, type:"warning"})
        return
      }
      console.log("修改成功")
      updateFormVisible.value=false
      ElMessage({message:`用户${updateForm.value.userName}添加成功`, type:"success"})
      await loadData()
    }catch(e){
      // ElMessage({message:"用户表单未通过校验要求", type:'warning'})
      return
    }
  }

  const tryDelete = async (old_data) => {
    try {
      let res = await ApiDeleteUser(old_data.id)
      if (res.data.status !== 200)
        ElMessage({message: res.data.msg, type: "warning"})
      else{
        ElMessage({message: `成功删除用户${old_data.userName}`, type: "success"})
        await loadData()
      }
    } catch (e) {
      ElMessage({message: e.message, type: "warning"})
    }
  }





  const loadData = async ()=>{
    console.log("Start Loading UserData")
    console.log(currentPage.value)
    let index, size;
    if((currentPage.value-1)* (pageSize.value) > totalSize.value){
      index = 1
      size = pageSize.value
    }else{
      index = currentPage.value
      size = pageSize.value
    }

    try{
      let res;
      console.log(userTypeSearch.value, typeof(userTypeSearch.value))
      if(nameSearch.value!=="" || userTypeSearch.value!==-1)
      {
        res = await ApiGetUserWith(index, size, nameSearch.value, userTypeSearch.value)
      }else {
        res = await ApiGetUsers(index, size)
      }
      console.log(tableData.value)
      tableData.value = res.data.data
      totalSize.value = res.data.total
    }catch (e){
      console.log(e)
    }
  }

  const resetTableData = async ()=>{
    nameSearch.value = ""
    userTypeSearch.value=-1
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