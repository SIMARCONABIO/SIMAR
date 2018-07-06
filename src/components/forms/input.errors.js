/**
 * Created by Fernando Torres on 18/11/2017.
 */

const errors = {
  required: '{field} es requerido',
  requiredIf: '{field} es requerido',
  requiredUnless: '{field} es requerido',
  email: '{field} debe de ser un email',
  alpha: '{field} solo debe contener letras',
  alphaNum: '{field} solo debe contener letras y números',
  numeric: '{field} solo debe contener números',
  minLength: '{field} debe tener al menos {min} caracteres',
  maxLength: '{field} debe tener como máximo {max} caracteres',
  minValue: '{field} debe de ser mayor que {min}',
  maxValue: '{field} debe de ser menor que {max}',
  between: '{field} debe de ser entre {min} y {max}',
  url: '{field} debe de ser una URL',
  macAddress: '{field} debe de ser una dirección MAC',
  ipAddress: '{field} debe de ser una dirección IP',
  sameAs: '{field} debe de ser igual a {eq}',
  default: '{field} es inválido'
}

/**
 * Returns the error message for an input validation
 * @param validator The validation type that fails
 * @param field The field name of the input
 */
export default (field, validator) => {
  validator.field = field
  let str = errors[validator.type] || errors.default
  for (let key in validator) {
    return str.replace(/({([^}]+)})/g, function (i) {
      let key = i.replace(/{/, '').replace(/}/, '')
      if (!validator[key]) {
        return i
      }
      return validator[key]
    })
  }
}
