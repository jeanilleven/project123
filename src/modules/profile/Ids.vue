<template>
  <div class="incre-row">
    <label class="title"><b>IDENTIFICATION CARDS</b></label>
    <div class="incre-row">
      <div class="item" v-if="item.length > 0" v-for="(npx, index) in item" :key="index">
        <!-- <i class="fas fa-id-card"></i> {{item.title}}
        <i class="fas fa-check text-primary pull-right" v-if="item.verified === true"></i> -->
        <img :src="config.BACKEND_URL + npx.payload_value" style="width: 100%; height: auto">
      </div>
      <div class="item" v-else>
        <!-- <i class="fas fa-id-card"></i> -->
        <p>No Image Attached</p>
      </div>
    </div>
  </div>
</template>
<style scoped>
.fa-id-card {
  font-size: 2em;
}
.incre-row .title{
  width: 100%;
  float: left;
  height: 50px;
  line-height: 50px;
  color: #555;
  border-top: solid 1px #ddd;
  border-bottom: solid 1px #ddd;
  margin-bottom: 25px;
}

.incre-row{
  margin-bottom: 25px;
  min-height: 50px;
}

.item{
  width: 49%;
  min-height: 50px;
  margin-right: 1%;
  float: left;
  line-height: 50px;
  border: solid 1px #ddd;
  padding: 0px 10px;
  text-transform: capitalize;
  margin-bottom: 10px;
  overflow-y: hidden;
}
.item i{
  line-height: 50px;
}

.borderless td, .borderless th {
    border: none;
}
@media (max-width: 992px){
}

</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
export default{
  mounted(){
  },
  data(){
    return {
      user: AUTH.user,
      config: CONFIG
    }
  },
  props: ['item'],
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    }
  }
}
</script>
