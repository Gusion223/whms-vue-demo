<template>
  <div class="err404">
    <el-result icon="error" title="404"
               sub-title="您访问了不存在的网页"></el-result>
    <router-link to="/home">点击此处访问主界面</router-link>
    <p></p>
    <router-link to="/">点击此处进入登入界面</router-link>
  </div>
</template>


<script setup>

</script>

<style>
.err404{
  position: relative;
  min-width: 100px;
  margin: 300px auto;
  height: 256px;
  //border: grey 1px solid
}

.err404 h4{
  font-size: 24px;
  color: #191919;
  padding-bottom: 16px;
}


</style>

