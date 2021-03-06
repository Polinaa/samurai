import * as axios from "axios";

const instance = axios.create(
    {
        withCredentials: true,
        baseURL: 'https://social-network.samuraijs.com/api/1.0/',
        headers: {
            "API-KEY": 'f571d269-4fe6-4431-b2d0-f960087ea118'
        }
    }
);

export const UsersApi = {
    getUsers(pageNumber = 1, pageSize = 10) {
        return (instance.get(`users?page=${pageNumber}&count=${pageSize}`)
            .then(response => response.data));
    },
    follow(userId) {
        return (instance.post(`follow/${userId}`)
            .then(response => response.data));
    },
    unfollow(userId) {
        return (instance.delete(`follow/${userId}`)
            .then(response => response.data));
    }
}

export const ProfileApi = {
    getProfile(userId) {
        return (instance.get(`profile/${userId}`)
            .then(response => response.data));
    },
    getStatus(userId) {
        return (instance.get(`profile/status/${userId}`)
            .then(response => response.data));
    },
    updateStatus(status) {
        return (instance.put(`profile/status`, {status: status}));
    },
    loadPhoto(image) {
        const formData = new FormData();
        formData.append("image", image);
        return (instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }));
    },
    updateProfile(profile) {
        return (instance.put(`profile`, profile));
    }
}

export const AuthApi = {
    authMe() {
        return (instance.get(`auth/me`)
            .then(response => response.data));
    },
    login(email, password, rememberMe = false, captcha) {
        return (instance.post(`auth/login`, {email, password, rememberMe, captcha})
            .then(response => response.data));
    },
    logout() {
        return (instance.delete(`auth/login`)
            .then(response => response.data));
    },
    getCaptcha() {
        return (instance.get(`security/get-captcha-url`)
            .then(response => response.data));
    }
}
