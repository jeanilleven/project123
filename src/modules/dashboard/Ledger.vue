<template>
  <div class="ledgers-container-item" > 
    <div class="dropdown">
      <i class="fas fa-ellipsis-v -toggle pull-right" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style="margin-right: 3%; margin-top: 3%; cursor: pointer;"></i>
      <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" @click="showDepositModal(data)">Deposit</a>
        <a class="dropdown-item secondary" @click="redirect('/withdrawals')">Withdraw</a>
      </div>
    </div>
    <label style="margin-top: -4%;" ><b>Account Balance</b></label>
    <label>{{auth.displayAmountWithCurrency(auth.user.ledger.amount, auth.user.ledger.currency)}}</label>
    <!-- <span style="margin-bottom: 5px;">
      <button class="btn btn-primary pull-left" style="margin-top: 4px;">Withdraw</button>
      <button class="btn btn-primary pull-right" style="margin-top: 4px;">Deposit</button>
    </span> -->
    <deposit :item="selecteditem"></deposit>
    <withdraw :item="selecteditem"></withdraw>
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
    'deposit': require('modules/dashboard/Deposit.vue'),
    'withdraw': require('modules/transfer/Withdraw.vue'),
    'profile': require('modules/request/Profile.vue'),
    'report': require('modules/request/Report.vue'),
    'request-filter': require('modules/request/Filter.vue'),
    'ratings': require('components/increment/generic/rating/DirectRatings.vue'),
    'empty': require('components/increment/generic/empty/EmptyDynamicIcon.vue')
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
