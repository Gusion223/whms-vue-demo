<template>
    <el-scrollbar style="padding-left: 20px; padding-right: 20px;">

<!--      // 顶部搜索栏-->
      <div class="top-search">
        <el-input v-model="nameSearch" placeholder="请输入要查询的仓库名称"
                  style="width: 20%;" suffix-icon="search" @keyup.enter="loadData"/>

        <el-button type="primary" style="margin-left: 5px" @click="loadData">查询</el-button>
        <el-button type="warning" style="margin-left: 5px" @click="resetTableData">重置</el-button>
        <el-button type="success" style="margin-left: 5px" @click="openAddForm">添加仓库</el-button>
      </div>

<!--      // 添加信息的表单-->
      <div>
        <el-dialog title="添加仓库" v-model="addFormVisible">
          <el-form :model="addForm" :rules="formRules" ref="addFormRef">
<!--            <el-form-item prop="wid" :label-width="addFormLabelWidth" label="仓库id">-->
<!--              <el-input v-model="addForm.wid"></el-input>-->
<!--            </el-form-item>-->
            <el-form-item prop="wname" :label-width="addFormLabelWidth" label="仓库名称">
              <el-input v-model="addForm.wname"></el-input>
            </el-form-item>
            <el-form-item prop="waddr" :label-width="addFormLabelWidth" label="仓库地址">
              <el-input v-model="addForm.waddr"></el-input>
            </el-form-item>


            <el-button type="info" @click="addFormVisible=false">取消</el-button>
            <el-button type="primary" @click="tryAdd">添加新的供货条目</el-button>
          </el-form>
        </el-dialog>
      </div>

<!--      // 修改信息的表单-->
      <div>
        <el-dialog title="修改仓库信息" v-model="updateFormVisible">
          <el-form :model="updateForm" :rules="formRules" ref="updateFormRef">
            <el-form-item prop="wid" :label-width="updateFormLabelWidth" label="仓库id">
              <el-input v-model="updateForm.wid" disabled></el-input>
            </el-form-item>
            <el-form-item prop="wname" :label-width="updateFormLabelWidth" label="仓库名字">
              <el-input v-model="updateForm.wname"></el-input>
            </el-form-item>
            <el-form-item prop="waddr" :label-width="updateFormLabelWidth" label="仓库地址">
              <el-input v-model="updateForm.waddr"></el-input>
            </el-form-item>

            <el-button type="info" @click="updateFormVisible=false">取消</el-button>
            <el-button type="primary" @click="tryUpdate">修改当前供货条目信息</el-button>
          </el-form>
        </el-dialog>
      </div>


<!--      // 表格数据-->
      <el-table  :data="tableData" border style="width:100%">
        <el-table-column prop="wid" label="仓库ID" />
        <el-table-column prop="wname" label="仓库名称" />
        <el-table-column prop="waddr" label="仓库地址" />

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
  import {ElMessage} from "element-plus";
  import {ApiAddWarehouse,ApiDeleteWarehouse,ApiGetWarehouse,ApiUpdateWarehouse} from "@/api/warehouse";

  // 表格信息
  const tableData = ref([])
  const totalSize = ref(1)
  const currentPage = ref(1)
  const pageSize = ref(5)
  const pageSizes = ref([5, 10, 20])


  // 搜索框相关
  const nameSearch = ref("")

  // 添加表单
  const formDefaultValue = {

    wid:"",
    wname:"",
    waddr:"",

  }
  const formRules = ref({
    wid:[{required: true,  message:"请输入仓库id", trigger:"blur"}],
    wname:[{required: true,  message:"请输入仓库名称", trigger:"blur"}],
    waddr:[{required: true,  message:"请输入仓库地址", trigger:"blur"}],



    // userType:[{type:"number", min:0, max:2, required: true,  message:"请选择用户类型", trigger:"change"}]
  })

  const addFormVisible = ref(false)
  // emm 深拷贝比较逆天就是了
  const addForm = ref(JSON.parse(JSON.stringify(formDefaultValue)))
  const addFormRef = ref(null)
  const addFormLabelWidth=ref("8em")

  // 修改表单
  const updateFormVisible = ref(false)
  const updateForm = ref(JSON.parse(JSON.stringify(formDefaultValue)))
  const updateFormRef = ref(null)

  // const currentUser = JSON.parse(sessionStorage.getItem("CurrentUser"))


  const updateFormLabelWidth=ref("8em")

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
      let res = await ApiAddWarehouse(
          addForm.value.wname,
          addForm.value.waddr,

      )
      if(res.data.status!==200){
        ElMessage({message:res.data.msg, type:"warning"})
        return
      }
      // 关闭窗口
      addFormVisible.value=false
      ElMessage({message:`供货条目${addForm.value.sid}添加成功`, type:"success"})
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


      let res = await ApiUpdateWarehouse(
          updateForm.value.wid,
          updateForm.value.wname,
          updateForm.value.waddr
      )

      if(res.data.status!==200)
      {
        ElMessage({message:res.data.msg, type:"warning"})
        return
      }
      console.log("修改成功")
      updateFormVisible.value=false
      ElMessage({message:res.data.msg, type:"success"})
      await loadData()
    }catch(e){
      // ElMessage({message:"用户表单未通过校验要求", type:'warning'})
      return
    }
  }

  const tryDelete = async (old_data) => {
    try {
      let res = await ApiDeleteWarehouse(old_data.wid)
      if (res.data.status !== 200)
        ElMessage({message: res.data.msg, type: "warning"})
      else{
        ElMessage({message: `成功删除供货条目${old_data.wname}}`, type: "success"})
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

      res = await ApiGetWarehouse(index,size,nameSearch.value)

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