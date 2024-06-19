<template>
  <div class="login-bg">
    <div class="login-body">
      <div class="login-title">商品进销管理系统</div>
      <el-form :model="param" :rules="rules" ref="loginFormRef" label-width="0px" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="用户名" prefix-icon="user" autocomplete="off"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="param.password" placeholder="密码" prefix-icon="lock" autocomplete="off"/>
        </el-form-item>
        <el-form-item prop="usertype">
          <el-radio-group v-model="param.usertype">
            <el-radio value=2>销售员</el-radio>
            <el-radio value=1>仓管员</el-radio>
            <el-radio value=0>系统管理员</el-radio>
          </el-radio-group>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
  import {ref} from "vue";
  import {ElMessage} from "element-plus";
  import router from "@/router/router";
  import {ApiLogin} from "@/api/user";

  const param = ref({
    username:'Admin',
    password:'123456',
    usertype:-1
  })
  const rules = ref({
    username:[{required: true,  message:"请输入用户名", trigger:"blur"}],
    password:[{required: true, message:"请输入密码", trigger:"blur"}],
    usertype:[{required: true, message:"请选择登录的用户类型", trigger:'blur'}]
  })
  const loginFormRef = ref(null);

  const submitForm = async () =>{
    try{
      // 别管这个弱警告, 能运行就是了
      await loginFormRef.value.validate()
      // console.log(param)
      let res = await ApiLogin(param.value.username, param.value.password, param.value.usertype);
      if(res.data.status=="200"){
          console.log("CurrentUser:", res.data.data)
          sessionStorage.setItem("CurrentUser", JSON.stringify(res.data.data))
          await router.push("/home")
      }else{
        ElMessage({
          message:"登录校验失败,请检查用户名、密码、用户类型是否正确",
          type:"warning"
        })
      }

    }catch (error) {
      console.log("校验失败")
      ElMessage({
        message:"登录校验失败,请检查用户名、密码、用户类型是否正确",
        type:"warning"
      })
    }
  }


</script>


<style scoped>
.login-bg {
  position: absolute;
  width:100%;
  height:100%;
  background-size: 100%;
  background-color: #e8e8e8;
}
.login-title {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 20px;
  color: #393939;
  border-bottom: 1px solid #ddd;
}
.login-body {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 350px;
  margin: -190px 0 0 -175px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.3);
  overflow: hidden;
}
.login-form {
  padding: 30px 30px;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
}
.login-tips {
  font-size: 12px;
  line-height: 30px;
  color: #fff;
}
</style>
