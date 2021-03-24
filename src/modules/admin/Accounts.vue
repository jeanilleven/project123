<template>
  <div class="ledger-summary-container">
    <div class="incre-row">
    </div>
    <basic-filter 
      v-bind:category="category" 
      :activeCategoryIndex="0"
      :activeSortingIndex="0"
      @changeSortEvent="retrieve($event.sort, $event.filter)"
      @changeStyle="manageGrid($event)"
      :grid="['list', 'th-large']"></basic-filter>
    
    <table class="table table-bordered table-responsive" v-if="data !== null">
      <thead>
        <tr>
          <td>Date</td>
          <td>Username</td>
          <td>Email</td>
          <td>Type</td>
          <!-- <td>Country & Region</td>
          <td>Localities</td> -->
          <td>Status</td>
          <!-- <td>Actions</td> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <td>{{item.created_at}}</td>
          <td>
            <label class="action-link text-primary" @click="showProfileModal(item)">{{item.username}}</label>
          </td>
          <td>{{item.email}}</td>
          <td>
            <label v-if="editTypeIndex !== index">{{item.account_type}}</label>
            <i class="fa fa-pencil text-primary" style="margin-left: 10px;" @click="setEditTypeIndex(index, item)" v-if="editTypeIndex !== index"></i>
            <span v-if="editTypeIndex === index">
              <select class="form-control" v-model="newAccountType" style="float: left; width: 70%;">
                <option v-if="user.type === 'ADMIN'" v-for="(typeItem, typeIndex) in ['USER', 'PARTNER', 'ACCOUNTANT', 'MARKETING', 'INVESTOR', 'ADMIN']" :key="typeIndex">{{typeItem}}</option>
                <option v-else v-for="(typeItem, typeIndex) in ['USER', 'PARTNER', 'ACCOUNTANT', 'MARKETING', 'INVESTOR']" :key="typeIndex">{{typeItem}}</option>
              </select>
              <i class="fa fa-check text-primary" style="margin-left: 5px; float: left;" @click="updateType(item, index)"></i>
              <i class="fa fa-times text-danger" style="margin-left: 5px; float: left;" @click="setEditTypeIndex(index, item)"></i>
            </span>
          </td>
          <!-- <td>
            <label v-if="item.partner_locations !== null">
              {{item.partner_locations.country}} / {{item.partner_locations.region}}
            </label>
          </td> -->
          <!-- <td>
            <label v-if="item.partner_locations !== null">
              <button class="btn btn-secondary" style="margin-right: 5px;" v-for="(itemLocation, indexLocation) in item.partner_locations.result" :key="indexLocation">
                {{itemLocation.locality}}
                <i class="fa fa-pencil text-primary" style="padding-left: 5px; padding-right: 5px;"  @click="showIncrementModal('update', itemLocation)"></i>
                <i class="fa fa-trash text-danger" style="padding-left: 5px; padding-right: 5px;" @click="deleteLocation(itemLocation.id)"></i>
              </button>
            </label>
            <button class="btn btn-primary" @click="showIncrementModal('create', item)">
              <i class="fas fa-plus"></i>
            </button>
          </td> -->
          <td>{{item.status}}</td>
          <!-- <td>
            <button class="btn btn-primary" @click="update(item)">Grant</button>
          </td> -->
        </tr>
      </tbody>
    </table>

     <Pager
      :pages="numPages"
      :active="activePage"
      :limit="limit"
      v-if="data !== null"
    />

    <empty v-if="data === null" :title="'No accounts available!'" :action="'Keep growing.'"></empty>
    <profile :item="selecteditem"></profile>
    <increment-modal :property="scopeLocation"></increment-modal>
  </div>
</template>
<style scoped>
.ledger-summary-container{
  width: 100%;
  float: left;
  height: auto;
  margin-bottom: 100px;
  margin-top: 25px;
}

.ledger-summary-container-header{
  width: 100%;
  float: left;
  height: 70px;
  border: solid 1px #ddd;
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
  min-height: 50px;
  overflow-y: hidden;
  padding-right: 10px;
}

td i {
  padding-right: 0px !important;
  padding-left: 0px !important;
}

@media (max-width: 992px){
  .ledger-summary-container{
    width: 100%;
  }
}

.card{
  margin:2%
}

</style>
<script>
import ROUTER from 'src/router'
import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import PartnerLocation from './CreatePartnerLocations.js'
import ScopeLocation from './ScopeLocation.js'
import Pager from 'src/components/increment/generic/pager/Pager.vue'
export default{
  mounted(){
    $('#loading').css({display: 'block'})
    this.retrieve({created_at: 'desc'}, {column: 'created_at', value: ''})
  },
  data(){
    return {
      user: AUTH.user,
      data: null,
      auth: AUTH,
      selecteditem: null,
      config: CONFIG,
      limit: 5,
      activePage: 1,
      numPages: null,
      category: [{
        title: 'Sort by',
        sorting: [{
          title: 'Username ascending',
          payload: 'username',
          payload_value: 'asc'
        }, {
          title: 'Username descending',
          payload: 'username',
          payload_value: 'desc'
        }, {
          title: 'Email ascending',
          payload: 'email',
          payload_value: 'asc'
        }, {
          title: 'Email descending',
          payload: 'email',
          payload_value: 'desc'
        }, {
          title: 'Type ascending',
          payload: 'status',
          payload_value: 'asc'
        }, {
          title: 'Type descending',
          payload: 'status',
          payload_value: 'desc'
        }, {
          title: 'Created ascending',
          payload: 'created_at',
          payload_value: 'asc'
        }, {
          title: 'Created descending',
          payload: 'created_at',
          payload_value: 'desc'
        }]
      }],
      filter: null,
      sort: null,
      partnerLocation: PartnerLocation,
      scopeLocation: ScopeLocation,
      selectedLocation: null,
      editTypeIndex: null,
      newAccountType: null,
      selectedAccount: null
    }
  },
  components: {
    'empty': require('components/increment/generic/empty/Empty.vue'),
    'basic-filter': require('components/increment/generic/filter/Basic.vue'),
    'profile': require('modules/request/Profile.vue'),
    'increment-modal': require('components/increment/generic/modal/Modal.vue'),
    Pager

  },
  methods: {
    setEditTypeIndex(index, item){
      if(index === this.editTypeIndex){
        this.editTypeIndex = null
        this.newAccountType = null
      }else{
        this.selectedAccount = item
        this.editTypeIndex = index
        this.newAccountType = item.account_type
      }
    },
    updateType(item, index){
      if(this.newAccountType === null || this.newAccountType === item.account_type){
        this.setEditTypeIndex(index, item)
        return
      }
      let parameter = {
        id: item.id,
        account_type: this.newAccountType
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('accounts/update_account_type', parameter).then(response => {
        $('#loading').css({display: 'none'})
        this.setEditTypeIndex(index, item)
        this.retrieve(null, null)
      })
    },
    showProfileModal(item){
      this.selecteditem = item
      this.selecteditem['payload'] = 'account'
      $('#profileModal').modal('show')
    },
    redirect(params){
      ROUTER.push(params)
    },
    retrieve(sort, filter){
      if(sort !== null){
        this.sort = sort
      }
      if(filter !== null){
        this.filter = filter
      }
      if(sort === null && this.sort !== null){
        sort = this.sort
      }
      if(filter === null && this.filter !== null){
        filter = this.filter
      }
      let parameter = {
        condition: [{
          value: filter.value + '%',
          column: filter.column,
          clause: 'like'
        }],
        sort: sort,
        limit: this.limit,
        offset: (this.activePage > 0) ? ((this.activePage - 1) * this.limit) : this.activePage
      }
      this.APIRequest('accounts/retrieve_accounts', parameter).then(response => {
        $('#loading').css({display: 'none'})
        if(response.data.length > 0){
          this.data = response.data
          this.numPages = parseInt(response.size / this.limit) + (response.size % this.limit ? 1 : 0)
        }else{
          this.data = null
          this.numPages = null
        }
      })
    },
    update(item){
      if(item.status !== 'NOT_VERIFIED'){
        let parameter = {
          id: item.id,
          status: 'GRANTED'
        }
        $('#loading').css({display: 'block'})
        this.APIRequest('accounts/update_verification', parameter).then(response => {
          $('#loading').css({display: 'none'})
          this.retrieve(null, null)
        })
        $('#profileModal').modal('hide')
      }else{
        alert('Not Allowed!')
      }
    },
    showIncrementModal(action, item){
      switch(action){
        case 'create':
          this.scopeLocation = {...ScopeLocation}
          let inputs = this.scopeLocation.inputs
          inputs.map(input => {
            input.value = null
          })
          let params = this.scopeLocation.params
          // params.map(param => {
          //   if(param.variable === 'account_id'){
          //     param.value = item.id
          //   }
          // })
          break
        case 'update':
          let modalData = {...this.scopeLocation}
          let parameter = {
            title: 'Update Location',
            route: 'investor_locations/update',
            button: {
              left: 'Cancel',
              right: 'Update'
            },
            sort: null,
            params: [{
              variable: 'id',
              value: item.id
            }]
          }
          modalData = {...modalData, ...parameter}
          modalData.inputs.map(data => {
            if(data.variable === 'country'){
              data.value = item.country
            }
            if(data.variable === 'region'){
              data.value = item.region
            }
            if(data.variable === 'locality'){
              data.value = item.locality
            }
          })
          this.scopeLocation = {...modalData}
          break
      }
      $('#scopeLocatioModal').modal('show')
    },
    deleteLocation(id){
      let parameter = {
        id: id
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('investor_locations/delete', parameter).then(response => {
        $('#loading').css({display: 'none'})
        this.retrieve(null, null)
      })
    }
  }
}
</script>
