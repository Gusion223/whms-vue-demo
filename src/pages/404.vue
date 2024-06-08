<template>
  <div class="err404">
    <h4>您访问的页面不见了！</h4>
    <div>
      <router-link to="/home">点击此处访问主界面</router-link>
      <p></p>
      <router-link to="/">点击此处进入登入界面</router-link>
    </div>
  </div>
</template>


<script setup>

</script>

<style>
.err404{
  position: relative;
  width: 100%;
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

