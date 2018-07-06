// import AsyncValidations from '@/helpers/async-validations'

export default {
  model (resource) {
    return Object.assign({
      name: '',
      lastName: '',
      password: '',
      email: ''
    }, resource)
  },

  rules () {
    return {
      // username: [
      //   {
      //     validator: (rule, value, callback) => {
      //       if (value === '') {
      //         callback(new Error('El usuario es requerido'))
      //       } else {
      //         callback()
      //         /* AsyncValidations.unique('users', 'username', value)
      //           .then(() => {
      //             callback()
      //           })
      //           .catch(e => {
      //             callback(new Error(`El usuario "${value}" ya fue tomado`))
      //           }) */
      //       }
      //     },
      //     trigger: 'change'
      //   }
      // ],
      name: {required: true, message: 'El nombre es requerido', trigger: 'blur'},
      lastName: {required: true, message: 'El apellido es requerido', trigger: 'blur'},
      email: [
        {type: 'email', trigger: ['blur'], message: 'El correo es incorrecto.'},
        {
          validator: (rule, value, callback) => {
            if (value.trim() === '') {
              callback(new Error('El email es requerido'))
            } else {
              callback()
              /* AsyncValidations.unique('users', 'email', value)
                .then(() => {
                  callback()
                })
                .catch(e => {
                  callback(new Error(`El email "${value}" ya fue tomado`))
                }) */
            }
          },
          trigger: 'blur'
        }
      ],
      password: [
        {required: true, message: 'La contraseña es requerida', trigger: 'blur'},
        {min: 3, max: 255, message: 'La contraseña debe ser entre 3 y 255 carácteres', trigger: 'blur'}
      ]
    }
  }
}
