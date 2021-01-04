<template>
  <div v-if="datas !== null">
    <div class="summary-container-item" v-for="(item, index) in datas" :key="index">
      <span class="header">{{item.created_at_human}}</span>
      <span class="body">
        <label>
          {{item.description}}
        </label>
        <label v-bind:class="{'text-danger': parseFloat(item.amount) <= 0, 'text-primary': parseFloat(item.amount) > 0}" class="pull-right amount"><b>+ {{auth.displayAmountWithCurrency(item.amount, item.currency)}}</b></label>
      </span>
      <span class="footer" v-if="item.payload !== null">
        <label style="padding: 10px 0px 10px 0px;">
          Transaction ID:
        </label>
        <label style="padding: 10px 10px 10px 0px;" class="text-primary action-link">
          <!--  @click="redirect((item.payload === 'request' ? '/requests/' : '/peer_charge/') + item.payload_value)" -->

          {{item.payment_payload}}
        </label>
      </span>
    </div>
    <div class="icnre-row text-center" v-if="datas !== null">
      <span class="view-more" @click="redirect('/ledgers')">View more</span>
    </div>
    <empty v-if="datas === null" :title="'Looks like your ledger is empty!'" :action="'Deposit now or start requesting money.'"></empty>
  </div>
</template>
<style lang="scss" scoped>
  @import "~assets/style/colors.scss";
.text-primary {
  color: $primary !important;
}
.amount {
  font-size: 17px;
}
.view-more {
  background-color: $primary !important;
  color: white;
}
.summary-container-item{
  width: 100%;
  float: left;
  border-radius: 5px;
  min-height: 50px;
  overflow-y: hidden;
  border: solid 1px #ddd;
  margin-top: 10px;
  padding-left: 10px;
}
.summary-container-item .header{
  width: 100%;
  float: left;
  height: 50px;
  line-height: 50px;
  color: #555;
}
.summary-container-item .body{
  width: 100%;
  float: left;
  min-height: 10px;
  overflow-y: hidden;
  padding-right: 10px;
}

.summary-container-item .amount{
}

.view-more{
  height: 50px;
  line-height: 50px;
  border: solid 1px #ddd;
  padding-right: 25px;
  padding-left: 25px;
  padding-top: 10px;
  padding-bottom: 10px;
}

.view-more:hover{
  cursor: pointer;
}
</style>
<script>
import ROUTER from '../../router'
import AUTH from '../../services/auth'
import CONFIG from '../../config.js'
export default{
  mounted(){
    this.retrieve({column: 'created_at', value: 'desc'}, {column: 'created_at', value: ''})
  },
  data(){
    return {
      user: AUTH.user,
      auth: AUTH,
      datas: []
    }
  },
  props: ['data'],
  components: {
    'empty': require('components/increment/generic/empty/Empty.vue')
  },
  methods: {
    redirect(params){
      ROUTER.push(params)
    },
    showInvestments(item){
      console.log(item)
    },
    retrieve(sort, filter){
      let parameter = {
        account_id: this.user.userID,
        account_code: this.user.subAccount.account_id,
        offset: 0,
        limit: 5,
        sort: sort,
        value: filter.value + '%',
        column: filter.column
      }
      console.log('parameter', parameter)
      $('#loading').css({display: 'block'})
      this.APIRequest('ledger/summary_ledger', parameter).then(response => {
        this.datas = response.data
        console.log('response', response)
        $('#loading').css({display: 'none'})
      })
    }
  }
}
</script>
