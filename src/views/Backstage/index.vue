<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
import BackNav from './component/BackNav.vue';
import BackFooetr from './component/BackFooetr.vue';

</script>

<template>

  <BackNav />
  <RouterView /><!--二及路由出口-->
  <!--添加key 破坏复用机制 强制销毁重建-->
  <!--<RouterView :key="$route.fullPath" />-->
  <BackFooetr />
</template>