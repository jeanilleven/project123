<template>
  <div class="profile-preview-wrapper" v-if="item !== null">
    <profile-header :item="item" v-if="item.account !== null"></profile-header>
    <br>
    <br>
    <div style="margin-right: 15%; margin-left: 15%;">
      <center>
        <button class="btn btn-primary" style="margin-top: 3%; margin-bottom: 3%" @click="location(item)">Scope Location</button>
        <button class="btn btn-primary" style="margin-top: 3%; margin-bottom: 3%" v-if="item.status !== 'GRANTED'" @click="verify(item)">Verify Account</button>
      </center>
    </div>
    <basic :item="item" v-if="item.account !== null"></basic>
    <educations :data="item.educations" v-if="item.educations !== null"></educations>
    <works :data="item.works" v-if="item.works !== null"></works>
    <ids :data="item.cards" v-if="item.cards !== null"></ids>
    <!-- <payments :data="item.cards" v-if="item.cards !== null"></payments> -->
    <comakers :data="item.comakers" v-if="item.comakers !== null && item.payload === 'request'"></comakers>
    <guarantors :data="item.guarantors" v-if="item.guarantors !== null"></guarantors>
<!--     <reviews :item="item" v-if="item.account !== null"></reviews> -->
    <!-- <div class="text-center">
      <button class="btn danger action p-3 text-white">Decline</button>
      <button class="btn success action p-3 text-white">Accept</button> -->
      <!-- <button class="btn danger action p-3">Remove</button> -->
    <!-- </div> -->

    <view-location
     ref="locate"
    ></view-location>
    <Confirmation
      ref="confirm"
      :title="'Validation'"
      :message="'Are you sure you want to validate this account?'"
      @onConfirm="verifyUser($event)"
    ></Confirmation>
  </div>
</template>
<style scoped>
.action {
  width:40%;
}
.danger {
  background-color: #EB5757;;
}
.success{
  background-color: #22B173;
}
.profile-preview-wrapper{
  width: 100%;
  float: left;
  min-height: 100px;
  overflow-y: hidden;
}
@media (max-width: 992px){
}

</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import Confirmation from 'src/components/increment/generic/modal/Confirmation.vue'
export default{
  mounted(){
  },
  data(){
    return {
      user: AUTH.user,
      data: null,
      sample: [],
      datum: null
    }
  },
  props: ['item'],
  components: {
    'profile-header': require('modules/profile/Header.vue'),
    'basic': require('modules/profile/Basic.vue'),
    'works': require('modules/profile/Works.vue'),
    'ids': require('modules/profile/Ids.vue'),
    'reviews': require('modules/profile/Reviews.vue'),
    'educations': require('modules/profile/Educations.vue'),
    'payments': require('modules/profile/Payments.vue'),
    'comakers': require('modules/profile/CoMakers.vue'),
    'guarantors': require('modules/profile/Guarantors.vue'),
    'view-location': require('modules/request/ViewLocation.vue'),
    Confirmation
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    verify(item){
      this.$refs.confirm.show(item)
    },
    verifyUser(data){
      this.$parent.$parent.update(data)

    },
    location(item){
      this.$refs.locate.showAddressModal(item)
    }
  }
}
</script>
