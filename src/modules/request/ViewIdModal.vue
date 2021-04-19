<template>
  <div class="modal fade" id="viewIdModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Uploaded ID</h5>
          <button type="button" class="close" @click="hideModal()" aria-label="Close">
            <span aria-hidden="true" class="text-primary">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group" v-if="uploadImage !== null">
             <img :src="config.BACKEND_URL + uploadImage">
          </div>
          <div class="form-group" v-if="uploadImage === null">
            <label>{{uploadMessage}}</label>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="hideModal()">Cancel</button>
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
      config: CONFIG,
      uploadImage: null,
      uploadMessage: 'No Uploaded ID'
    }
  },
  props: ['item'],
  methods: {
    redirect(parameter){
      ROUTER.push(parameter)
    },
    showModal(item){
      this.retrieve(item)
      $('#viewIdModal').modal('show')
    },
    hideModal(){
      $('#viewIdModal').modal('hide')
    },
    retrieve(item){
      let parameter = {
        account_id: item.id,
        payload: 'upload_image'
      }
      $('#loading').css({display: 'block'})
      this.APIRequest('account_cards/retrieve', parameter).then(response => {
        this.uploadImage = response.data[0].content[0].payload_value
        $('#loading').css({display: 'none'})
      })
    }
  }
}
</script>
