<template>
  <div>
    <div class="ledgers-container-item text-center bg-secondary" v-for="(item, index) in data" :key="index"> 
<!--       <div class="dropdown">
        <i class="fas fa-ellipsis-v -toggle pull-right text-white" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="margin-right: 3%; margin-top: 3%; cursor: pointer;"></i>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <a class="dropdown-item text-white" @click="showDepositModal(data)">Deposit</a>
          <a class="dropdown-item secondary text-white" @click="redirect('/withdrawals')">Withdraw</a>
        </div>
      </div> -->
      <label style="font-size: 11px;" class="text-white">Available Balance</label>
      <label style="font-size: 18px;" class="text-white"><b>{{auth.displayAmountWithCurrency(item.available_balance, item.currency)}}</b></label>
      <label style="font-size: 11px;" class="text-white">Current Balance: {{auth.displayAmountWithCurrency(item.current_balance, item.currency)}}</label>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "~assets/style/colors.scss";
.dropdown-item{
  background-color: $secondary;
}
.ledgers-container-item{
  width: 100%;
  float: left;
  min-height: 50px;
  overflow-y: hidden;
  border: solid 1px #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
}
.ledgers-container-item label, .ledgers-container-item span{
  width: 96%;
  float: left;
  height: 40px;
  line-height: 40px;
  margin-left: 2%;
  margin-right: 2%;
  padding: 0px;
  margin-bottom: 0px;
}
.rl-container-item{
  width: 100%;
  float: left;
  border-radius: 5px;
  min-height: 50px;
  overflow-y: hidden;
  border: solid 1px #ddd;
  margin-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
}

.bg-secondary{
  background-color: $secondary !important;
}
</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
export default{
  data(){
    return {
      user: AUTH.user,
      auth: AUTH,
      size: null,
      selecteditem: null,
      config: CONFIG,
      activePage: 0
    }
  },
  props: ['data'],
  components: {
  },
  methods: {
    redirect(params){
      ROUTER.push(params)
    },
    showRequestModal(){
      $('#createRequestModal').modal('show')
    },
    showDepositModal(item){
      this.selecteditem = item
      $('#createDepositModal').modal('show')
    }
  }
}
</script>
