'use strict';

import axios from 'axios';

import Global from './Global.jsx'
import EventProxy from './EventProxy.jsx'

const HttpRequest = {

    axios: undefined,

    init: function (okFunc, errorFunc) {
        let serverUrl = localStorage.getItem('server.url');
        if (serverUrl) {
            this.initURL(serverUrl, okFunc, errorFunc);
            return false;
        }
        //初始状态
        return true;
    },

    initURL: function (url, okFunc, errorFunc) {
        this.axios = axios.create({
            baseURL: 'http://' + url,
            timeout: 1000 * 3,
            crossDomain: true,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        this.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        this.checkURL(url, okFunc, errorFunc);
    },

    checkURL: function (url, okFunc, errorFunc) {
        //ui显示loading 和错误toastr 
        this.axios.get('/server').then(function () {
            localStorage.setItem("server.url", url);
            this.setCommonResponse();

            Global.Status.UserName = localStorage.getItem(Global.Const.LocalStorageKey_UserName);
            Global.Status.UserPassword = localStorage.getItem('user.password');
            Global.Status.UserLoginToken = localStorage.getItem('user.token');

            if (okFunc) {
                okFunc();
            }
            // Add a response interceptor 
        }.bind(this)).catch(function (error) {
            this.errorHandle(error);
            if (errorFunc) {
                errorFunc();
            }
        }.bind(this));
    },

    setCommonResponse: function () {
        this.axios.interceptors.response.use(function (response) {
            EventProxy.trigger(Global.Const.Event_DataLoading, Global.Const.Key_DataLoading_Finish);
            return response;
        }, function (error) {
            EventProxy.trigger(Global.Const.Event_DataLoading, Global.Const.Key_DataLoading_Finish);
            return this.errorHandle(error);
        }.bind(this));
    },

    errorHandle: function (error) {
        let response = error.response;
        let errorMessage = undefined;
        if (response) {
            let errorData = response.data;
            if (errorData) {
                if (errorData.error) {
                    //服务端发送异常
                    errorMessage = errorData.error;
                } else {
                    //ip错误
                    // errorMessage = errorData;
                }
            } else {
            }
        } else {
            //端口错误
            // errorMessage = error.message;
        }
        if (!errorMessage) {
            if (error.config) {
                errorMessage = error.config.url + ' can not connected.';
            } else {
                errorMessage = error;
            }
        }
        toastr.error(errorMessage);
        return Promise.reject(error);
    },

    axiosLoginRequestInterceptorId: 0,

    afterLogin: function (name, password, token) {
        localStorage.setItem(Global.Const.LocalStorageKey_UserName, name);
        //
        localStorage.setItem('user.password', password);
        localStorage.setItem('user.token', token);

        Global.Status.UserName = name;
        Global.Status.UserPassword = password;
        Global.Status.UserLoginToken = token;

        // Add a request interceptor
        this.axiosLoginRequestInterceptorId = this.axios.interceptors.request.use(function (config) {
            config.headers['Access-Token'] = token;
            return config;
        }, function (error) {
            return Promise.reject(error);
        });
    },

    afterLogout: function () {
        localStorage.removeItem(Global.Const.LocalStorageKey_UserName);
        //
        localStorage.removeItem('user.password');
        localStorage.removeItem('user.token');

        Global.Status.UserName = undefined;
        Global.Status.UserPassword = undefined;
        Global.Status.UserLoginToken = undefined;

        // Add a request interceptor
        this.axios.interceptors.request.eject(this.axiosLoginRequestInterceptorId);
    }

};

export default HttpRequest;