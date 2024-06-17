<template>
    <el-scrollbar style="padding-left: 20px; padding-right: 20px;">

<!--      // 顶部搜索栏-->
      <div class="top-search">
        <el-input v-model="nameSearch" placeholder="请输入要查询的供货商名称"
                  style="width: 20%;" suffix-icon="search" @keyup.enter="loadData"/>

        <el-button type="primary" style="margin-left: 5px" @click="loadData">查询</el-button>
        <el-button type="warning" style="margin-left: 5px" @click="resetTableData">重置</el-button>
        <el-button type="success" style="margin-left: 5px" @click="openAddForm">供货商信息注册</el-button>
      </div>

<!--      // 添加信息的表单-->
      <div>
        <el-dialog title="添加新供货商" v-model="addFormVisible">
          <el-form :model="addForm" :rules="formRules" ref="addFormRef">
            <el-form-item prop="sname" :label-width="addFormLabelWidth" label="供货商名">
              <el-input v-model="addForm.sname"></el-input>
            </el-form-item>

<!--            <el-form-item prop="cid" :label-width="addFormLabelWidth" label="顾客id">-->
<!--              <el-input v-model="addForm.cid"></el-input>-->
<!--            </el-form-item>-->


            <el-form-item prop="saddr" :label-width="addFormLabelWidth" label="供货商地址">
              <el-input v-model="addForm.saddr"></el-input>
            </el-form-item>

<!--            <el-form-item prop="password" :label-width="addFormLabelWidth" label="密码">-->
<!--              <el-input v-model="addForm.password" ></el-input>-->
<!--            </el-form-item>-->

<!--            <el-form-item prop="csex" :label-width="addFormLabelWidth" label="性别">-->
<!--              <el-select v-model="addForm.csex">-->
<!--                <el-option :key="-1" label="请选择性别" :value="-1"></el-option>-->
<!--                <el-option v-for="item in csexDisplay" :key="item.value" :label="item.text" :value="item.value" />-->
<!--              </el-select>-->
<!--            </el-form-item>-->
            <el-form-item prop="sdesc" :label-width="addFormLabelWidth" label="供货商信息描述">
              <el-input v-model="addForm.sdesc" controls-position="right" style="width: 100%"></el-input>
            </el-form-item>
            <el-form-item prop="sphone" :label-width="addFormLabelWidth" label="电话号码">
              <el-input v-model="addForm.sphone" placeholder="电话号码"></el-input>
            </el-form-item>

            <el-button type="info" @click="addFormVisible=false">取消</el-button>
            <el-button type="primary" @click="tryAdd">添加新的供货商</el-button>
          </el-form>
        </el-dialog>
      </div>

<!--      // 修改信息的表单-->
      <div>
        <el-dialog title="修改供货商信息" v-model="updateFormVisible">
          <el-form :model="updateForm" :rules="formRules" ref="updateFormRef">
            <el-form-item prop="sname" :label-width="updateFormLabelWidth" label="供货商名">
              <el-input v-model="updateForm.sname" ></el-input>
            </el-form-item>
            <el-form-item prop="saddr" :label-width="updateFormLabelWidth" label="供货商地址">
              <el-input v-model="updateForm.saddr"></el-input>
            </el-form-item>
<!--            <el-form-item prop="csex" :label-width="updateFormLabelWidth" label="性别">-->
<!--              <el-select v-model="updateForm.csex">-->
<!--                <el-option :key="-1" label="请选择性别" :value="-1"></el-option>-->
<!--                <el-option v-for="item in csexDisplay" :key="item.value" :label="item.text" :value="item.value" />-->
<!--              </el-select>-->
<!--            </el-form-item>-->
            <el-form-item prop="sdesc" :label-width="updateFormLabelWidth" label="供货商信息描述">
              <el-input v-model="updateForm.sdesc" controls-position="right" style="width: 100%"></el-input>
            </el-form-item>
            <el-form-item prop="sphone" :label-width="updateFormLabelWidth" label="电话号码">
              <el-input v-model="updateForm.sphone" placeholder="电话号码"></el-input>
            </el-form-item>

            <el-button type="info" @click="updateFormVisible=false">取消</el-button>
            <el-button type="primary" @click="tryUpdate">修改当前供货商信息</el-button>
          </el-form>
        </el-dialog>
      </div>


<!--      // 表格数据-->
      <el-table  :data="tableData" border style="width:100%">
        <el-table-column prop="sid" label="供货商ID" />
        <el-table-column prop="sname" label="供货商名" />
        <el-table-column prop="sphone" label="电话"/>
        <el-table-column prop="saddr" label="供货商地址" />
<!--        <el-table-column prop="password" label="密码" />-->

        <el-table-column prop="sdesc" label="供货商信息描述" />
<!--        <el-table-column prop="csex" label="性别">-->
<!--&lt;!&ndash;          <template #default="scope">&ndash;&gt;-->
<!--&lt;!&ndash;              <el-tag :type="csexDisplay[scope.row.csex].type" :disable-transitions="true">&ndash;&gt;-->
<!--&lt;!&ndash;                {{csexDisplay[scope.row.csex].text}}&ndash;&gt;-->
<!--&lt;!&ndash;              </el-tag>&ndash;&gt;-->
<!--&lt;!&ndash;          </template>&ndash;&gt;-->
<!--        </el-table-column>-->

<!--        <el-table-column prop="userType" label="角色">-->
<!--          <template #default="scope">-->
<!--              <el-tag :type="userTypeDisplay[scope.row.userType].type" :disable-transitions="true">-->
<!--                {{userTypeDisplay[scope.row.userType].text}}-->
<!--              </el-tag>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column prop="operate" label="操作">
          <template #default="scope">
            <div style="display: flex;">
              <el-button size='small' type="success" @click="openUpdateForm(scope.row)">修改</el-button>
              <el-button size='small' type="danger"
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

  const nameSearch = ref("")
  // const userTypeSearch = ref(-1)

  // 添加表单
  const formDefaultValue = {
    sname:"",
    sid:"",
    saddr:"",
    // password:"",
    // csex:-1,
    // cage:20,
    sdesc:"",
    sphone:"",

  }
  const formRules = ref({
    sname:[{required: true,  message:"请输入供货商名", trigger:"blur"},{min:1, max:20,  trigger:'blur'}],
    saddr:[{required: true,  message:"请输入供货商地址", trigger:"blur"}],
    // password:[{required: true,  message:"请输入用户密码", trigger:"blur"}],
    // csex:[{type:"number" ,min: 0, max: 1, required: true,  message:"请选择用户性别", trigger:"change"}],
    sdesc:[{required: true,  message:"请输入供货商信息描述", trigger:"blur"}],
    sphone:[{required: true,  message:"请输入顾客电话号码", trigger:"blur"}],
    // userType:[{type:"number", min:0, max:2, required: true,  message:"请选择用户类型", trigger:"change"}]
  })

  const addFormVisible = ref(false)
  // emm 深拷贝比较逆天就是了
  const addForm = ref(JSON.parse(JSON.stringify(formDefaultValue)))
  const addFormRef = ref(null)
  const addFormLabelWidth=ref("10em")

  // 修改表单
  const updateFormVisible = ref(false)
  const updateForm = ref(JSON.parse(JSON.stringify(formDefaultValue)))
  const updateFormRef = ref(null)
  const updateExtraCfg = ref({
    sname: {lock:true},
    saddr: {lock:false},
    // password: {lock:true},
    // csex:{lock:false},
    sdesc:{lock:false},
    sphone:{lock:false},

    sid:{lock:false}
    // userType:{lock:false}
  })
  // const currentUser = JSON.parse(sessionStorage.getItem("CurrentUser"))


  const updateFormLabelWidth=ref("10em")

  const openAddForm = ()=>{
    console.log("打开添加表单")
    addForm.value = JSON.parse(JSON.stringify(formDefaultValue))
    addFormVisible.value=true
  }
  const openUpdateForm = (rowData)=>{
    updateForm.value = JSON.parse(JSON.stringify(rowData))
    updateFormVisible.value = true

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
          addForm.value.sid,
          addForm.value.sname,
          addForm.value.saddr,
          // addForm.value.password,
          // addForm.value.csex,
          addForm.value.sdesc,
          addForm.value.sphone,
          // addForm.value.userType
      )
      if(res.data.status!==200){
        ElMessage({message:res.data.msg, type:"warning"})
        return
      }
      // 关闭窗口
      addFormVisible.value=false
      ElMessage({message:`供货商${addForm.value.cname}添加成功`, type:"success"})
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
          updateForm.value.sid,
          updateForm.value.saddr,
          // updateForm.value.csex,
          updateForm.value.sdesc,
          updateForm.value.sphone,
          updateForm.value.sname,
          // updateForm.value.userType
      )

      let res = await ApiUpdateUser(
          updateForm.value.sid,
          updateForm.value.saddr,
          // updateForm.value.csex,
          updateForm.value.sdesc,
          updateForm.value.sphone,
          updateForm.value.sname,
          // updateForm.value.userType
      )

      if(res.data.status!==200)
      {
        ElMessage({message:res.data.msg, type:"warning"})
        return
      }
      console.log("修改成功")
      updateFormVisible.value=false
      ElMessage({message:`供货商${updateForm.value.cname}添加成功`, type:"success"})
      await loadData()
    }catch(e){
      // ElMessage({message:"用户表单未通过校验要求", type:'warning'})
      return
    }
  }

  const tryDelete = async (old_data) => {
    try {
      let res = await ApiDeleteUser(old_data.sid)
      if (res.data.status !== 200)
        ElMessage({message: res.data.msg, type: "warning"})
      else{
        ElMessage({message: `成功删除供货商${old_data.sname}}`, type: "success"})
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

      if(nameSearch.value!=="" )
      {
        res = await ApiGetUserWith(index, size, nameSearch.value )
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
    // userTypeSearch.value=-1
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