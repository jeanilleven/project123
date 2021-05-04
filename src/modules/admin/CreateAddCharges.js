import AUTH from 'src/services/auth'
import CONFIG from 'src/config.js'
import COMMON from 'src/common.js'
var currencies = []
var options = []
COMMON.payments.map(item => {
  var object = {
    label: item.title,
    value: item.title
  }
  options.push(object)
})
COMMON.currencies.map(item => {
  var object = {
    label: item.title,
    value: item.value
  }
  currencies.push(object)
})
export default {
  id: 'createAddChargesModal',
  size: 'modal-md',
  title: 'Add Transfer Fee Charges',
  background: null,
  inputs: [{
    row: 'full',
    label: 'Effective Date',
    variable: 'effective_date',
    placeholder: 'Effective Date',
    value: null,
    required: true,
    id: 'effective_date',
    type: 'PastDateLimit',
    inputType: 'date',
    validation: {
      size: 1,
      type: 'date'
    }
  }, {
    row: 'full',
    label: 'Scope',
    variable: 'scope',
    placeholder: 'Scope',
    value: null,
    required: true,
    id: 'scope',
    type: 'input',
    inputType: 'text',
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'Destination',
    variable: 'destination',
    placeholder: 'Destination',
    value: null,
    required: true,
    id: 'destination',
    type: 'input',
    inputType: 'text',
    validation: {
      size: 1,
      type: 'text'
    }
  }, {
    row: 'full',
    label: 'Currency',
    variable: 'currency',
    value: null,
    required: true,
    id: 'type',
    type: 'select_specified',
    options: currencies
  }, {
    row: 'full',
    label: 'Minimum Amount',
    variable: 'min_amount',
    placeholder: 'Enter minimum amount',
    value: null,
    required: true,
    id: 'minAmount',
    type: 'input',
    inputType: 'number',
    validation: {
      size: 1,
      type: 'number'
    }
  }, {
    row: 'full',
    label: 'Maximum Amount',
    variable: 'max_amount',
    placeholder: 'Enter maximum amount',
    value: null,
    required: true,
    id: 'maxAmount',
    type: 'input',
    inputType: 'number',
    validation: {
      size: 1,
      type: 'number'
    }
  }, {
    row: 'full',
    label: 'Charge',
    variable: 'charge',
    placeholder: 'Enter charge',
    value: null,
    required: true,
    id: 'charge',
    type: 'input',
    inputType: 'number',
    validation: {
      size: 1,
      type: 'number'
    }
  }],
  route: 'fund_transfer_charges/create',
  button: {
    left: 'Cancel',
    right: 'Submit'
  },
  sort: {
    column: 'created_at',
    value: 'desc'
  },
  params: []
}
