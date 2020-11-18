<template>
<div>
  <div class="text-center">
  <button  class="btn primary action text-white"  @click="showAddressModal()"><i style="margin-right: 5px" class="fa fa-map-marker"></i>Scope Location</button>
  </div>
   <div class="modal fade" id="addAddressAccount" tabindex="-1" role="dialog"  aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Assign Location</h5>
            <button type="button" class="close" @click="hideAddressModal('#addAddressAccount')" aria-label="Close">
              <span aria-hidden="true" class="text-primary">&times;</span>
            </button>
          </div>
              <div class="modal-body card " v-for="item in scopeLocation" v-bind:key="item.id">
                <div class="form-group">
              <label>Scope Code</label>
              <input type="text" class="form-control form-control-custom" v-model="item.code" placeholder="Type code">
            </div>
            <div >
              <label>
                {{item.route + ', ' + item.region + ', ' + item.country}}
              </label>
            </div>
            </div>
        </div>
      </div>
    </div>
    </div>
</template>
<style scoped>
.action {
  width:40%;
}
.danger {
  background-color: #EB5757;;
}
.primary{
  background-color:#3F0050;
  margin:2%
}
.profile-preview-wrapper{
  width: 100%;
  float: left;
  min-height: 100px;
  overflow-y: hidden;
}
.modal-body{
  margin: 2%;
  overflow: auto;
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
      data: null,
      scopeLocation: null
    }
  },
  props: ['item'],
  components: {
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    showAddressModal(){
      this.APIRequest('location_scopes/retrieve').then(response => {
        if(response.data.length > 0){
          console.log('location', response.data)
          this.scopeLocation = response.data
        }else{
          this.scopeLocation = null
        }
        $('#addAddressAccount').modal('show')
      })
    },
    hideAddressModal(item){
      $('#addAddressAccount').modal('hide')
    },
    deleteLocationAddress(item){
      let param = {
        id: item.id
      }
      this.APIRequest('location_scopes/delete', param).then(response => {
        $('#loading').css({display: 'none'})
        this.retrieve(null, null)
      })
    }
  }

}
</script>
