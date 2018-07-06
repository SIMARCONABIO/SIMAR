import MSAuth from '@/utils/ms-auth'

const authService = new MSAuth(process.env.API_BASE_URL + 'auth/token', {name: 'dashboard'})

export default authService
