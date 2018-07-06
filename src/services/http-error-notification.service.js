import {Notification} from 'element-ui'

const errorsCatalog = {
  401: {
    'DEFAULT': {
      title: 'No autenticado',
      description: 'No se encuentra autenticado para realizar peticiones al API'
    },
    'NO_AUTH_TOKEN': {
      title: 'Petición sin token',
      description: 'La petición no cuenta con token de autenticación'
    },
    'AUTH_TOKEN_COMPROMISED': {
      title: 'Sesión comprometida',
      description: 'Se han utilizado sus credenciales para iniciar sesión desde otro equipo.'
    },
    'AUTH_TOKEN_REVOKED': {
      title: 'Sesión cerrada',
      description: 'Debe de autenticarse nuevamente para utilizar la plataforma.'
    },
    'AUTH_TOKEN_EXPIRED': {
      title: 'Sesión expirada',
      description: 'Su sesión ha expirado. Debe de autenticarse nuevamente para utilizar la plataforma.'
    },
    'AUTH_TOKEN_INVALID': {
      title: 'Sesión incorrecta',
      description: 'No reconocemos su sesión. Debe de autenticarse nuevamente para utilizar la plataforma.'
    }
  },
  403: {
    'DEFAULT': {
      title: 'Sin permisos',
      description: 'No tienes permisos para ejecutar esta acción'
    },
    'NOT_ALLOWED': {
      title: 'No permitido',
      description: 'No tienes permisos para ejecutar esta acción'
    }
  },
  404: {
    'DEFAULT': {
      title: 'Petición no encontrada',
      description: 'No se encontró la petición en el servidor'
    },
    'NOT_FOUND': {
      title: 'Petición no encontrada',
      description: 'No se encontró la petición en el servidor'
    }
  },
  406: {
    'DEFAULT': {
      title: 'Operación no permitida',
      description: 'No se encontró la petición en el servidor'
    },
    '99': {
      title: 'La carpeta ya existe',
      description: 'Existe una carpeta con el mismo nombre en esta ubicación'
    },
    'INVALID_TOKEN': {
      title: 'Token invalido',
      description: 'El token es invalido o ya fue utilizado'
    }
  },
  422: {
    'DEFAULT': {
      title: 'Errores de validación',
      description: 'Existen errores de validación en la forma'
    },
    '100': {
      title: 'Errores de validación',
      description: 'Existen errores de validación en la forma'
    }
  },
  500: {
    'DEFAULT': {
      title: 'Error Desconocido',
      description: 'Hubo un error al tratar de ejecutar su operación en el servidor'
    }
  }
}

export default (httpErrorResponse) => {
  let notification = {
    title: 'Error en el servidor',
    message: 'Sucedió un error al contactar al servidor, favor de intentar nuevamente.',
    type: 'error'
  }
  if (httpErrorResponse === undefined) {
    notification.message = 'No tiene acceso a internet o el servidor no responde'
  } else {
    let errorCode = httpErrorResponse.data.code || 'DEFAULT'
    if (errorsCatalog[httpErrorResponse.status]) {
      if (errorsCatalog[httpErrorResponse.status][errorCode]) {
        notification.title = errorsCatalog[httpErrorResponse.status][errorCode].title
        notification.message = errorsCatalog[httpErrorResponse.status][errorCode].description
      } else if (errorsCatalog[httpErrorResponse.status]['DEFAULT']) {
        notification.title = errorsCatalog[httpErrorResponse.status]['DEFAULT'].title
        notification.message = errorsCatalog[httpErrorResponse.status]['DEFAULT'].description
      }
    }
  }
  Notification(notification)
}
