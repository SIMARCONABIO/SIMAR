export default {
  model: function () {
    return {
      username: null,
      password: null,
      rememberMe: false
    }
  },
  rules: {
    username: {
      required: true,
      message: 'El usuario es requerido'
    },
    password: {
      required: true,
      message: 'El password es requerido'
    }
  }
}
