<template>
    <el-scrollbar style="padding-left: 20px; padding-right: 20px;">

<!--      // 顶部搜索栏-->
      <div class="top-search">
        <el-input v-model="snameSearch" placeholder="请输入要查询的供货商名称"
                  style="width: 20%;" suffix-icon="search" @keyup.enter="loadData"/>

        <el-select v-model="gtypeSearch" placeholder="请选择商品类型"
                   @keyup.enter="loadData" style="width: 20%;">
          <el-option v-for="item in gtypeDisplay" :key="item.value" :label="item.text" :value="item.value">
          </el-option>
        </el-select>

        <el-button type="primary" style="margin-left: 5px" @click="loadData">查询</el-button>
        <el-button type="warning" style="margin-left: 5px" @click="resetTableData">重置</el-button>
        <el-button type="success" style="margin-left: 5px" @click="openAddForm">添加供货条目</el-button>
      </div>

<!--      // 添加信息的表单-->
      <div>
        <el-dialog title="添加新供货条目" v-model="addFormVisible">
          <el-form :model="addForm" :rules="formRules" ref="addFormRef">
]
            <el-form-item prop="sid" label="供货商" :label-width="addFormLabelWidth">
              <el-select v-model="addForm.sid" filterable>
                <el-option v-for="item in suppliers" :key="item.sid" :label="item.sname" :value="item.sid" />
              </el-select>
            </el-form-item>
            <el-form-item prop="gname" :label-width="addFormLabelWidth" label="商品名称">
              <el-select v-model="addForm.gid" filterable>
                <el-option v-for="item in goods" :key="item.gid" :label="item.gname" :value="item.gid" />
              </el-select>
            </el-form-item>
            <el-form-item prop="gtype" :label-width="addFormLabelWidth" label="商品类型">
              <el-select v-model="addForm.gtype">
                <el-option :key="-1" label="请选择种类" value=""></el-option>
                <el-option v-for="item in typeDisplay" :key="item.value" :label="item.text" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item prop="gunitCost" :label-width="addFormLabelWidth" label="价格">
              <el-input v-model="addForm.gunitCost" controls-position="right" style="width: 100%"></el-input>
            </el-form-item>


            <el-button type="info" @click="addFormVisible=false">取消</el-button>
            <el-button type="primary" @click="tryAdd">添加新的供货条目</el-button>
          </el-form>
        </el-dialog>
      </div>

<!--      // 修改信息的表单-->
      <div>
        <el-dialog title="修改供货条目信息" v-model="updateFormVisible">
          <el-form :model="updateForm" :rules="formRules" ref="updateFormRef">
            <el-form-item prop="sid" :label-width="updateFormLabelWidth" label="供货商">
              <el-input :model-value="updateForm.sname" disabled />
            </el-form-item>

            <el-form-item prop="gid" :label-width="updateFormLabelWidth" label="商品id">
              <el-input :model-value="updateForm.gname" disabled />
            </el-form-item>

            <el-form-item prop="gunitCost" :label-width="updateFormLabelWidth" label="价格">
              <el-input v-model="updateForm.gunitCost" controls-position="right" style="width: 100%"></el-input>
            </el-form-item>

            <el-button type="info" @click="updateFormVisible=false">取消</el-button>
            <el-button type="primary" @click="tryUpdate">修改当前供货条目信息</el-button>
          </el-form>
        </el-dialog>
      </div>


<!--      // 表格数据-->
      <el-table  :data="tableData" border style="width:100%">
        <el-table-column prop="sid" label="供货商ID" />
        <el-table-column prop="sname" label="供货商名称" />
        <el-table-column prop="gid" label="商品id" />
        <el-table-column prop="gname" label="商品名称" />
        <el-table-column prop="gtype" label="类别" >
          <template #default="scope">
            {{scope.row.gtype}}
          </template>
        </el-table-column>
        <el-table-column prop="gunitCost" label="价格"/>
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
  import {ApiGetUsers} from "@/api/serviceApi";
  import {ElMessage} from "element-plus";
  import {ApiGetSG, ApiAddSG, ApiUpdateSG, ApiDeleteSG, ApiListSGGood} from "@/api/sg";
  import {ApiListSupplier} from "@/api/supplier";
  import {ApiListGood} from "@/api/good";
  import router from "@/router/router";

  // 表格信息
  const tableData = ref([])
  const totalSize = ref(1)
  const currentPage = ref(1)
  const pageSize = ref(5)
  const pageSizes = ref([5, 10, 20])
  const gtypeDisplay=[
    {
      text:"日用品",
      value:"日用品"
    },
    {
      text:"电子产品",
      value:"电子产品"
    },
    {
      text:"食品饮料",
      value:"食品饮料"
    }
  ]
  const typeDisplay=[
    {
      text:"日用品",
      value:"日用品"
    },
    {
      text:"电子产品",
      value:"电子产品"
    },
    {
      text:"食品饮料",
      value:"食品饮料"
    }

  ]

  // 搜索框相关
  const snameSearch = ref("")
  const gtypeSearch = ref(null)

  // 添加表单
  const formDefaultValue = {

    sid:"",
    gid:"",
    gunitCost:"",
    gname:"",
    sname:"",
    gtype:""
    // password:"",
    // csex:-1,
    // cage:20,


  }
  const formRules = ref({
    sid:[{required: true,  message:"请输入供货商id", trigger:"blur"}],
    // sname:[{required: true,  message:"请输入供货商名称", trigger:"blur"}],
    gid:[{required: true,  message:"请输入商品id", trigger:"blur"}],
    // gname:[{required: true,  message:"请输入商品名称", trigger:"blur"}],
    gtype:[{min:1, required: true,  message:"请选择商品种类", trigger:"change"}],
    gunitCost:[{required: true,  message:"请输入价格", trigger:"blur"}],


    // userType:[{type:"number", min:0, max:2, required: true,  message:"请选择用户类型", trigger:"change"}]
  })

  const suppliers = ref([])
  const goods = ref([])
  const addFormVisible = ref(false)
  // emm 深拷贝比较逆天就是了
  const addForm = ref(JSON.parse(JSON.stringify(formDefaultValue)))
  const addFormRef = ref(null)
  const addFormLabelWidth=ref("8em")

  // 修改表单
  const updateFormVisible = ref(false)
  const updateForm = ref(JSON.parse(JSON.stringify(formDefaultValue)))
  const updateFormRef = ref(null)
  const updateExtraCfg = ref({
    sid: {lock:false},
    // password: {lock:true},
    // csex:{lock:false},
    gid:{lock:false},
    gunitCost:{lock:false},
    gname:{lock:false},
    sname:{lock:false},
    gtype:{lock:false},




    // userType:{lock:false}
  })
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
      let res = await ApiAddSG(
          addForm.value.sid,
          addForm.value.gid,
          addForm.value.gunitCost
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
        ElMessage({message:"用户表单未通过校验要求", type:'warning'})
        return
      }
      console.log(
          updateForm.value.sid,
          updateForm.value.gid,
          // updateForm.value.csex,
          updateForm.value.gunitCost,
          updateForm.value.gname,
          updateForm.value.sname,
          updateForm.value.gtype

      )

      let res = await ApiUpdateSG(
          updateForm.value.sid,
          updateForm.value.gid,
          updateForm.value.gunitCost
      )

      if(res.data.status!==200)
      {
        ElMessage({message:res.data.msg, type:"warning"})
        return
      }
      console.log("修改成功")
      updateFormVisible.value=false
      ElMessage({message:`供货条目${updateForm.value.sid}添加成功`, type:"success"})
      await loadData()
    }catch(e){
      // ElMessage({message:"用户表单未通过校验要求", type:'warning'})
      return
    }
  }

  const tryDelete = async (old_data) => {
    try {
      let res = await ApiDeleteSG(old_data.sid,old_data.gid)
      if (res.data.status !== 200)
        ElMessage({message: res.data.msg, type: "warning"})
      else{
        ElMessage({message: `成功删除供货条目${old_data.sid}}`, type: "success"})
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

      res = await ApiGetSG(index,size,snameSearch.value, gtypeSearch.value)

      console.log(tableData.value)
      tableData.value = res.data.data
      totalSize.value = res.data.total
    }catch (e){
      console.log(e)
    }
  }
  const resetTableData = async ()=>{
    snameSearch.value=null
    gtypeSearch.value=null
    await loadData()
  }

  const loadSuppliers = async ()=>{
    try{
      let res = await ApiListSupplier()
      suppliers.value = res.data.data
    }catch (e){
      console.log(e)
    }
  }

  const loadGoods = async ()=>{
    try{
      let res = await ApiListGood()
      console.log(res)
      goods.value = res.data.data
    }catch (e){
      console.log(e)
    }
  }


  onMounted(()=>{
    if(router.currentRoute.value.query.sname != null)
        snameSearch.value = router.currentRoute.value.query.sname
    loadSuppliers()
    loadGoods()
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