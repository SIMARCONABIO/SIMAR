/**
* Created by ferto
* Marciano Digital Agency
* www.marciano.com.mx
* Date: 17/11/2017.
*
* form-input Vue Component
*/
<template>
  <div
    class="form-group"
    :class="{'has-danger':validator.$error}"
  >
    <label
      v-if="label"
      :for="formId"
    >
      {{ label }}
      <sup
        class="required"
        v-if="isRequired"
      >*</sup>
    </label>
    <textarea
      v-if="type === 'textarea'"
      :class="{'is-invalid':validator.$error}"
      :id="formId"
      class="form-control"
      :placeholder="placeholder"
      :required="isRequired"

      :readonly="readonly"
      :disabled="disabled"
      :aria-describedby="helpTextId"
      :value="value"
      @input="onInput"
      @blur="onBlur"
    />
    <input
      v-else
      :type="type"
      :id="formId"
      :step="step"
      class="form-control"
      :class="{'is-invalid':validator.$error}"
      :placeholder="placeholder"
      :list="list"
      :required="isRequired"
      :readonly="readonly"
      :disabled="disabled"
      :min="minValue"
      :max="minValue"
      :aria-describedby="helpTextId"
      :value="value"
      @input="onInput"
      @blur="onBlur"
    >
    <div
      v-if="validator.$error"
      class="invalid-feedback animated fadeIn"
    >
      {{ errorMessage }}
    </div>
    <small
      v-if="helpText"
      :id="helpTextId"
      class="form-text text-muted"
    >
      {{ helpText }}
    </small>
  </div>
</template>

////////////////////////////////////////////
//                                  SCRIPT
////////////////////////////////////////////
<script>
import UuidV4 from '@/utils/uuidv4'
import inputError from './input.errors'

export default {
  name: 'FormGroup',
  props: {
    id: {
      type: String,
      default: null
    },
    validator: {
      type: Object,
      required: true,
      validator (value) {
        return value !== undefined
      }
    },
    validationDelay: {
      type: Number,
      required: false,
      default: 0
    },
    value: {
      type: [Number, String, Boolean],
      required: false,
      default: null
    },
    step: {
      type: Number,
      required: false,
      default: 1
    },
    label: {
      type: String,
      required: true,
      default: 'Error! Label not defined'
    },
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false
    },
    list: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    helpText: {
      type: String,
      default: null
    }
  },
  watch: {
    validator: {
      handler: function (newValue) {
        this.setErrorMessage()
      },
      deep: true
    }
  },
  data () {
    return {
      errorMessage: '',
      timeoutInstance: null,
      formId: this.id || UuidV4()
    }
  },
  computed: {
    helpTextId () {
      return this.helpText ? UuidV4() : null
    },
    minValue () {
      return this.validator.$params.hasOwnProperty('min')
    },
    maxValue () {
      return this.validator.$params.hasOwnProperty('max')
    },
    isRequired () {
      return this.validator.hasOwnProperty('required')
    }
  },
  methods: {
    setErrorMessage () {
      for (let e in this.validator) {
        if (e.indexOf('$') >= 0) {
          return
        } else if (this.validator[e] === false) {
          this.errorMessage = inputError(this.label, this.validator.$params[e])
          return
        }
      }
    },
    update () {
      this.validator.$touch()
    },
    onBlur (event) {
      this.update()
      this.$emit('input', event.target.value)
      window.clearTimeout(this.timeoutInstance)
    },
    onInput (event) {
      window.clearTimeout(this.timeoutInstance)
      this.timeoutInstance = window.setTimeout(() => {
        this.update()
        this.$emit('input', event.target.value)
      }, this.validationDelay || 0)
    }
  }
}
</script>

////////////////////////////////////////////
//                                   STYLE
////////////////////////////////////////////
<style
  lang="scss"
  scoped
>
  .form-control {
    border-radius: 0;
    box-shadow: none !important;
  }
</style>
