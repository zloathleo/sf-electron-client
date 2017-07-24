'use strict';

import axios from 'axios';

import Const from '../Const.jsx'
import EventProxy from '../EventProxy.jsx'

const HttpRequest = {

    axios: undefined,

    init: function (url) {
        this.axios = axios.create({
            baseURL: 'http://' + url,
            timeout: 1000 * 10,
            crossDomain: true,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        this.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

        if (url) {
            localStorage.setItem("server.url", url);
        }

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
            errorMessage = error.config.url + ' can not connected.'
        }
        toastr.error(errorMessage);
        return Promise.reject(error);
    },

    cahceUserToken: function (name, password, token) {
        localStorage.setItem("user.name", name);
        localStorage.setItem("user.password", password);
        localStorage.setItem("user.token", token);

        // Add a request interceptor
        this.axios.interceptors.request.use(function (config) {
            config.headers['access_token'] = token;
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        // Add a response interceptor
        this.axios.interceptors.response.use(function (response) {
            EventProxy.trigger(Const.Event_DataLoading, 1);
            return response;
        }, function (error) {
            EventProxy.trigger(Const.Event_DataLoading, 1);
            return this.errorHandle(error);
        }.bind(this));


    }

};

export default HttpRequest;