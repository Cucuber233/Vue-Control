import Cookit from 'cookie_js';

const adminToKen = 'admin_token';
const adminUserName = 'admin_username';

export function getToken() {
    return Cookit.get('admin_token')
}

export function  setToken(value) { 
    return Cookit.set( adminToKen ,value)
    
}

export function  removeToken(value) {
    return Cookit.remove( adminToKen ,value)
}

export function setUserName(value) {
    return Cookit.set( adminUserName ,value)
}

export function getUserName() {
    return Cookit.get(adminUserName)
}