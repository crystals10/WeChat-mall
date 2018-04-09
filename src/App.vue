<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
    margin: 0;
    padding: 0;
}
a{
    text-decoration:none;
}
.clearfix:after{
    content:'';
    display: block;
    clear:both;
    height:0;
    visibility: hidden;
}
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
 font-family: '华文细黑', 'microsoft yahei', Verdana, Arial, Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
.el-checkbox-group{
  font-size:14px !important;
}
</style>
