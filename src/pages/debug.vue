<template>
  <div v-show="router.currentRoute.value.meta.showFather != null ? router.currentRoute.value.meta.showFather : true">
    <p >这里是组件测试界面,请选择要访问的组件 </p>
    <router-link to="/debug/dForm">动态表单</router-link>
  </div>
  <router-view></router-view>
</template>

<script setup>
  import router from "@/router/router";
  console.log(router.currentRoute.value.meta)
</script>