<template>
  <div class="profile-preview-wrapper" v-if="item !== null">
    <profile-header :item="item" v-if="item.account !== null" :location="localCode"></profile-header>
    <br>
    <br>
    <div style="margin-right: 15%; margin-left: 15%;">
      <center>
        <button v-if="localCode === null" class="btn btn-primary" style="margin-top: 3%; margin-bottom: 3%" @click="location(item)">Scope Location</button>
        <button v-if="item.status != 'BLOCKED'" class="btn btn-danger" style="margin-top: 3%; margin-bottom: 3%" @click="verify(item, message = 'a')">Block Account</button>
        <button v-else class="btn btn-danger" style="margin-top: 3%; margin-bottom: 3%" @click="verify(item, message = 'c')">Unblock Account</button>
        <button class="btn btn-primary" style="margin-top: 3%; margin-bottom: 3%" v-if="item.status !== 'GRANTED' && item.status !== 'BLOCKED'" @click="verify(item, message = 'b')">Verify Account</button>
      </center>
    </div>
    <basic :item="item"></basic>
    <ids :item="uploadImage"></ids>
    <br>
    <!-- <educations :data="item.educations" v-if="item.educations !== null"></educations>
    <works :data="item.works" v-if="item.works !== null"></works> -->
    <!-- <ids :data="item.cards" v-if="item.cards !== null"></ids> -->
    <!-- <payments :data="item.cards" v-if="item.cards !== null"></payments> -->
    <!-- <comakers :data="item.comakers" v-if="item.comakers !== null && item.payload === 'request'"></comakers>
    <guarantors :data="item.guarantors" v-if="item.guarantors !== null"></guarantors> -->
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
      :title="'Message'"
      :message="message === 'a' ? 'Are you sure you want to block this user?' : message === 'c' ? 'Are you sure you want to unblock this user?': 'Are you sure you want to validate this account?'"
      @onConfirm="message === 'a' ? blockUser($event) : message === 'c' ? unblockUser($event) : verifyUser($event)"
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
      uploadImage: [],
      localCode: null,
      message: null
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
    'view-modal': require('modules/request/ViewIdModal.vue'),
    Confirmation
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    verify(item, message){
      this.$refs.confirm.show(item, message)
    },
    verifyUser(data){
      this.$parent.$parent.update(data)
    },
    unblockUser(data){
      this.$parent.$parent.updateStat(data)
    },
    blockUser(data){
      this.$parent.$parent.updateUserStatus(data)
    },
    location(item){
      this.$refs.locate.showAddressModal(item)
    },
    viewId(item){
      this.$refs.upload.showModal(item)
    },
    retrieveLocation(item){
      let parameter = {
        condition: [{
          value: item.id,
          column: 'account_id',
          clause: '='
        }]
      }
      this.APIRequest('locations/retrieve', parameter).then(response => {
        if(response.data.length > 0){
          this.localCode = response.data[0].code
        }else{
          this.localCode = null
        }
      })
    },
    retrieveImage(item){
      this.uploadImage = []
      let parameter = {
        account_id: item.id,
        payload: 'upload_image'
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('account_cards/retrieve', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          response.data[0].content.forEach(element => {
            this.uploadImage.push(element)
          })
        }else{
          this.uploadImage = []
        }
      })
    }
  }
}
</script>
