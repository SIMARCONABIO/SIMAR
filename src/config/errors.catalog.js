/**
 * Created by Fernando Torres on 10/11/2017.
 */
export default {
  401: {
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
      title: 'Petición no encontrada',
      description: 'No se encontró la petición en el servidor'
    },
    '99': {
      title: 'La carpeta ya existe',
      description: 'Existe una carpeta con el mismo nombre en esta ubicación'
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
      description: 'Hubo un error al tratar de ejecutar su operación'
    }
  }
}
