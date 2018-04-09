<template>
  <section>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item  v-for="(item,index) in $router.options.routes" v-if="item.menuShow==true" :id="item.path" :key="index">
        	<div>
              <img :src="'static/img/'+item.iconCls" alt="" style="width: 32px;"/>
          </div>
        	<div>
            {{item.name}}
          </div>
      </mt-tab-item>
    </mt-tabbar>
  </section>
</template>
<script>
export default {
  name: 'Tabbar',
  data () {
    return {
      selected:''
    }
  },
  watch:{
    selected:function(val, oldVal){
      
      this.$router.push({path:val});
    }
  },
  mounted(){
    this.selected=this.$route.path;
  }
}
</script>