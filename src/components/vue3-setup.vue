<template>
  <div>{{res}}</div>
  <div>{{m}}</div>
  <div v-for="(item, index) in arr" :key="index">
    <h1>{{ item }}</h1>
  </div>
  <button @click="btn">点击</button>
</template>

<script>
export default {
  data(){
    return {
      m:"890"
    }
  },
  setup(){
    const btn = ()=>{
        console.log("+++++++++")
    }
    console.log("current port: 8080");
    const res = 123;
    const arr = [3,2,1];
    console.log(res);
    return {res, arr, btn};  
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
