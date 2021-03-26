<template>
  <div class="modal fade" id="addAddressAccount" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Assign Location</h5>
          <button type="button" class="close" @click="hideAddressModal()" aria-label="Close">
            <span aria-hidden="true" class="text-primary">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group" v-if="locationMessage !== null">
            <label>{{locationMessage}}</label>
          </div>
          <div class="form-group">
            <label>Scope Code</label>
            <input type="text" class="form-control form-control-custom" v-model="localCode" placeholder="Type code">
          </div>
          <div>
            <label>
              {{address}}
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="hideAddressModal()">Cancel</button>
          <button type="button" class="btn btn-primary" @click="submit()">dsfsdf</button>
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
      code: null,
      local: null,
      address: null,
      localCode: null,
      locationMessage: null
    }
  },
  props: ['item'],
  components: {
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    showAddressModal(item){
      this.selectedItem = item
      this.address = item.account.information.address
      this.retrieveLocation(item)
      this.locationMessage = null
      $('#addAddressAccount').modal('show')
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
    hideAddressModal(){
      this.selectedItem = null
      $('#addAddressAccount').modal('hide')
    },
    submit(){
      if(this.selectedItem === null){
        return
      }
      if(this.localCode === null){
        this.locationMessage = 'Please fill in the field.'
      }
      let parameter = {
        account_id: this.selectedItem.id,
        code: this.localCode
      }
      this.APIRequest('locations/updateCode', parameter).then(response => {
        if(response.data === true || response.data === 'true'){
          this.locationMessage = 'Successfully updated!'
          this.hideAddressModal()
        }else{
          this.locationMessage = 'Error update!'
        }
      })
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
