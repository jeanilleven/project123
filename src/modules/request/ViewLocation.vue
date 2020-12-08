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
          <div v-if="local === null">
            <label>Search location</label>
            <google-autocomplete-location
              :property="googleProperty"
              ref="location"
              @onFinish="manageLocation($event)"
            ></google-autocomplete-location>
          </div>
          <div v-if="local !== null">
            <label>
              {{local.route + ', ' + locality + ', ' + local.country}}
            </label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="hideAddressModal()">Cancel</button>
          <button type="button" class="btn btn-primary" @click="submit()">Submit</button>
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
    this.manageLocation(location)
  },
  data(){
    return {
      user: AUTH.user,
      code: null,
      local: null,
      location: null,
      locality: null,
      localCode: null,
      scopeLocation: null,
      googleProperty: {
        style: {
          height: '45px !important'
        },
        GOOGLE_API_KEY: CONFIG.GOOGLE_API_KEY,
        results: {
          style: {
          }
        },
        placeholder: 'Type Location'
      },
      locationFlag: 'autocomplete',
      selectedLocation: null,
      locationMessage: null
    }
  },
  props: ['item'],
  components: {
    'google-autocomplete-location': require('src/components/increment/generic/location/GooglePlacesAutoComplete.vue')
  },
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    showAddressModal(item){
      this.selectedItem = item
      this.retrieveLocation(item)
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
      this.APIRequest('location_scopes/retrieve').then(response => {
        if(response.data.length > 0){
          this.local = response.data[0]
          this.localCode = response.data[0].code
          this.locality = this.local.city + ', ' + this.local.region
        }else{
          this.local = null
          this.localCode = null
        }
      })
    },
    hideAddressModal(){
      this.selectedItem = null
      this.local = null
      $('#addAddressAccount').modal('hide')
    },
    manageLocation(location){
      console.log('lcoation', location)
      this.location = location
    },
    submit(){
      let parameter = null
      let route = null
      if(this.selectedItem === null){
        return
      }
      if(this.local === null){
        parameter = {
          ...this.location,
          account_id: this.selectedItem.id,
          code: this.localCode
        }
        route = 'location_scopes/create'
      }else{
        parameter = {
          id: this.local.id,
          code: this.localCode
        }
        route = 'location_scopes/update'
      }
      console.log('location', parameter)
      this.APIRequest(route, parameter).then(response => {
        if(response.data){
          this.locationMessage = 'Successfully updated!'
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
