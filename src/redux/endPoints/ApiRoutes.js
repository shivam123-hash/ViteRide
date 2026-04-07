const API_ROUTES = {
    LOGIN_AUTH: '/api/auth/login',
    REGISTER_AUTH: '/api/auth/register',
    LOGOUT_AUTH: '/api/auth/logout',
    VERIFY_OTP: "/api/auth/otp/verify",
    GET_USER_PROFILE: '/api/users/me',
    EDIT_USER_PROFILE: '/api/users/me',
    BECOME_DRIVER: '/api/driver/apply',
    DRIVER_STATUS_ONLINE: '/api/driver/online',
    DRIVER_STATUS_OFFLINE: '/api/driver/offline',
    GET_DRIVER_STATUS: '/api/driver/status'
}
export default API_ROUTES;