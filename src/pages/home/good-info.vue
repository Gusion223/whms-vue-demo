<template>
    <el-scrollbar style="padding-left: 20px; padding-right: 20px;">

<!--      // 顶部搜索栏-->
      <div class="top-search">
        <el-input v-model="nameSearch" placeholder="请输入要查询的商品名称"
                  style="width: 20%;" suffix-icon="search" @keyup.enter="loadData"/>
        <el-select v-model="gtypeSearch" placeholder="请选择商品类型"
                   @keyup.enter="loadData" style="width: 20%;">
<!--          <el-option :key="-1" :label="'请选择用户类型'" :value="-1"></el-option>-->
          <el-option v-for="item in gtypeDisplay" :key="item.value" :label="item.text" :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" style="margin-left: 5px" @click="loadData">查询</el-button>
        <el-button type="warning" style="margin-left: 5px" @click="resetTableData">重置</el-button>
        <el-button v-if="currentUser.userType!==2" type="success" style="margin-left: 5px" @click="openAddForm">增加记录</el-button>
      </div>

<!--      // 添加信息的表单-->
      <div>
        <el-dialog title="添加新商品" v-model="addFormVisible">
          <el-form :model="addForm" :rules="formRules" ref="addFormRef">
<!--            -->
            <el-form-item prop="gname" :label-width="addFormLabelWidth" label="商品名">
              <el-input v-model="addForm.userName"></el-input>
            </el-form-item>

            <el-form-item prop="gooid" :label-width="addFormLabelWidth" label="商品id">
              <el-input v-model="addForm.gid" ></el-input>
            </el-form-item>

            <el-form-item prop="gunitPrice" :label-width="addFormLabelWidth" label="商品价格">
              <el-input v-model="addForm.gunitPrice"></el-input>
            </el-form-item>

            <el-form-item prop="gtype" :label-width="addFormLabelWidth" label="商品类型">
              <el-select v-model="addForm.gtype">
                <el-option :key="-1" label="请选择种类" value=""></el-option>
                <el-option v-for="item in typeDisplay" :key="item.value" :label="item.text" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item prop="gunit" :label-width="addFormLabelWidth" label="商品单位">
              <el-input v-model="addForm.gunit" controls-position="right" style="width: 100%"></el-input>
            </el-form-item>
<!--            <el-form-item prop="phone" :label-width="addFormLabelWidth" label="电话号码">-->
<!--              <el-input v-model="addForm.phone" placeholder="电话号码"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item prop="userType" :label-width="addFormLabelWidth" label="角色">-->
<!--              <el-select v-model="addForm.userType">-->
<!--                <el-option :key="-1" label="请选择用户类型" :value="-1"></el-option>-->
<!--                <el-option v-for="item in userTypeDisplay" :key="item.value" :label="item.text" :value="item.value" />-->
<!--              </el-select>-->
<!--            </el-form-item>-->
            <el-button type="info" @click="addFormVisible=false">取消</el-button>
            <el-button  type="primary" @click="tryAdd">添加新的商品</el-button>
          </el-form>
        </el-dialog>
      </div>

<!--      // 修改信息的表单-->
      <div>
        <el-dialog title="修改商品信息" v-model="updateFormVisible">
          <el-form :model="updateForm" :rules="formRules" ref="updateFormRef">
            <el-form-item prop="gname" :label-width="updateFormLabelWidth" label="用户名">
              <el-input v-model="updateForm.gname" :disabled="updateExtraCfg.gname.lock"></el-input>
            </el-form-item>

            <el-form-item prop="gunitPrice" :label-width="updateFormLabelWidth" label="商品价格">
              <el-input v-model="updateForm.gunitPrice"></el-input>
            </el-form-item>

            <el-form-item prop="gtype" :label-width="updateFormLabelWidth" label="类别">
              <el-select v-model="updateForm.gtype">
                <el-option :key="-1" label="请选择类别" :value="-1"></el-option>
                <el-option v-for="item in typeDisplay" :key="item.value" :label="item.text" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item prop="gunit" :label-width="updateFormLabelWidth" label="单位">
              <el-input-number v-model="updateForm.gunit" controls-position="right" style="width: 100%"></el-input-number>
            </el-form-item>

            <el-form-item prop="gid" :label-width="updateFormLabelWidth" label="商品id">
              <el-input v-model="updateForm.gid" placeholder="商品id"></el-input>
            </el-form-item>

<!--            <el-form-item prop="userType" :label-width="updateFormLabelWidth" label="角色">-->
<!--              <el-select v-model="updateForm.userType">-->
<!--                <el-option :key="-1" label="请选择用户类型" :value="-1"></el-option>-->
<!--                <el-option v-for="item in userTypeDisplay" :key="item.value" :label="item.text" :value="item.value" />-->
<!--              </el-select>-->
<!--            </el-form-item>-->
            <el-button type="info" @click="updateFormVisible=false">取消</el-button>
            <el-button type="primary" @click="tryUpdate">修改当前商品信息</el-button>
          </el-form>

        </el-dialog>
      </div>


<!--      // 表格数据-->
      <el-table  :data="tableData" border style="width:100%">
<!--        <el-table-column prop="id" label="ID" />-->
        <el-table-column prop="gname" label="商品名" />
        <el-table-column prop="gunitPrice" label="商品价格" />
        <el-table-column prop="gooid" label="商品id" />
        <el-table-column prop="gunit" label="商品单位" />
        <el-table-column prop="gtype" label="类别">
          <template #default="scope">
              <el-tag :type="typeDisplay[scope.row.sex].type" :disable-transitions="true">
                {{typeDisplay[scope.row.gtype].text}}
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
  const nameSearch = ref("")
  const gtypeSearch = ref(null)

  // 添加表单
  const formDefaultValue = {
    gid:"",
    gunitPrice:"",
    gname:"",
    gtype:"",
    gunit:""

  }
  const formRules = ref({
    gname:[{required: true,  message:"请输入商品名", trigger:"blur"},{min:1, max:20,  message: "请输入商品名", trigger:'blur'}],
    gunitPrice:[{required: true,  message:"请输入商品类型", trigger:"blur"}],
    gid:[{required: true,  message:"请输入商品id", trigger:"blur"}],
    gtype:[{min:'1', required: true,  message:"请选择商品种类", trigger:"change"}],
    gunit:[{required: true,  message:"请输入商品单位", trigger:"blur"}],

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
    gname: {lock:true},
    gunitPrice: {lock:false},
    gid: {lock:true},
    sex:{lock:false},
    gunit:{lock:false},
    // phone:{lock:false},
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
          addForm.value.gname,
          addForm.value.gunitPrice,
          addForm.value.gid,
          // addForm.value.sex,
          addForm.value.gunit,
          // addForm.value.phone,
          addForm.value.userType
      )
      if(res.data.status!==200){
        ElMessage({message:res.data.msg, type:"warning"})
        return
      }
      // 关闭窗口
      addFormVisible.value=false
      ElMessage({message:`用户${addForm.value.gname}添加成功`, type:"success"})
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
          updateForm.value.gid,
          updateForm.value.gunitPrice,
          updateForm.value.gtype,
          updateForm.value.gunit,
          // updateForm.value.phone,
          // updateForm.value.userType
      )

      let res = await ApiUpdateUser(
          updateForm.value.gid,
          updateForm.value.gunitPrice,
          updateForm.value.gtype,
          updateForm.value.gunit,
          // updateForm.value.phone,
          // updateForm.value.userType
      )

      if(res.data.status!==200)
      {
        ElMessage({message:res.data.msg, type:"warning"})
        return
      }
      console.log("修改成功")
      updateFormVisible.value=false
      ElMessage({message:`商品${updateForm.value.gname}添加成功`, type:"success"})
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
        ElMessage({message: `成功删除用户${old_data.gname}}`, type: "success"})
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
      console.log(gtypeSearch.value, typeof(gtypeSearch.value))
      if(nameSearch.value!=="" || gtypeSearch.value!==-1)
      {
        res = await ApiGetUserWith(index, size, nameSearch.value, gtypeSearch.value)
      }else {
        res = await ApiGetUsers(index, size)
      }
      // console.log(res)
      // console.log(res.data)
      // console.log(res.data.data)
      console.log(tableData.value)
      tableData.value = res.data.data
      totalSize.value = res.data.total
    }catch (e){
      console.log(e)
    }
  }

  const resetTableData = async ()=>{
    nameSearch.value = ""
    gtypeSearch.value=-1
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