'use strict';

import axios from 'axios';

const HttpRequest = {

    axios: undefined,

    init: function (url) {
        this.axios = axios.create({
            baseURL: 'http://' + url,
            timeout: 1000 * 30,
            crossDomain: true,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        this.axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    }

};

export default HttpRequest;