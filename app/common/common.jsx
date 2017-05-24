import * as apiConfig from './config'


const format = (obj,fmt)=>{
    var o = {
        "M+": obj.getMonth() + 1, //月份
        "d+": obj.getDate(), //日
        "h+": obj.getHours(), //小时
        "m+": obj.getMinutes(), //分
        "s+": obj.getSeconds(), //秒
        "q+": Math.floor((obj.getMonth() + 3) / 3), //季度
        "S": obj.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (obj.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

export const dataFormat = (formatStr, ctime)=>{

    var now = new Date(parseInt(ctime) * 1000);

    var dateformat = format(now,formatStr);

    return dateformat;
}


export const uuid = () => {
    return Math.random().toString(36).substring(3, 8)
};

export const fGetSig = (name, url, body, version) => {
    let sig = "";
    let key_values = url.substring(url.indexOf('?') + 1).split('&');
    let keys = [];
    let map = {};
    for (let i = 0; i < key_values.length; i++) {
        let k_p = key_values[i].split('=');
        keys[i] = k_p[0];
        map[k_p[0]] = k_p[1];
    }
    keys.sort();
    let sigStr = '';
    for (let i = 0; i < keys.length; i++) {
        sigStr = sigStr + keys[i] + '=' + map[keys[i]] + "&";
    }
    sigStr = version + name + "?" + sigStr;

    if (body == "" || body == null || body == "null") {
        sig = hex_sha1(fUtf16to8(sigStr + fGetCookieMes(apiConfig.TOKEN)));
    } else {
        sig = hex_sha1(fUtf16to8(sigStr + body + "&" + fGetCookieMes(apiConfig.TOKEN)));
    }
    return sig;

};




export const fGetLocalTime = () => {

    return Date.parse(new Date()) / 1000;
}


export const fGetUrl = (dict, state = 1) => {//state为是否登录,登录状态为1,未登录状态为0

    let url = '';
    for (let keys in dict) {
        if (dict.hasOwnProperty(keys)) {

            if (keys == 'name') {
                url = dict['name'] + '?'
            } else {
                url = url + keys + '=' + dict[keys] + '&'
            }

        }
    }


    let user_id = fGetCookieMes(apiConfig.USERID);
    let ts = fGetTs();

    let nonce = fGetNonce();

    if (state) {
        url = url + 'user_id=' + user_id + '&ts=' + ts + '&nonce=' + nonce;
    } else {
        url = url + 'ts=' + ts + '&nonce=' + nonce;
    }
    return url
};



export const fGetCookieMes = (key) => {
    let strCookie = document.cookie;
    strCookie = strCookie.replace(/\s/g, "");
    let arrCookie = strCookie.split(';');
    for (let i = 0; i < arrCookie.length; i++) {
        let arr = arrCookie[i].split("=");
        if (key == arr[0] && arr[1] != '') {
            return arr[1];
        }
    }

    return ""
};


const fSetCookieMes = (key, val) => {

    var date = new Date();
    var expiresDays = 30;
    //将date设置为10天以后的时间
    date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);
    //将userId和userName两个cookie设置为10天后过期
    document.cookie = key + "=" + val + ";expires=" + date.toGMTString();
}
export const fExportGetCookieMes = (key) => {

    let strCookie = document.cookie;
    strCookie = strCookie.replace(/\s/g, "");
    let arrCookie = strCookie.split(';');
    for (let i = 0; i < arrCookie.length; i++) {
        let arr = arrCookie[i].split("=");
        if (key == arr[0] && arr[1] != '') {
            return arr[1];
        }
    }

    return ""
};

export const fExportSetCookieMes = (key, val) => {

    var date = new Date();
    var expiresDays = 30;
    //将date设置为10天以后的时间
    date.setTime(date.getTime() + expiresDays * 24 * 3600 * 1000);
    //将userId和userName两个cookie设置为10天后过期
    document.cookie = key + "=" + val + ";expires=" + date.toGMTString();
};

export const fGetNonce = () => {
    let nonce = '';
    for (let i = 0; i < 6; i++) {
        nonce = nonce + Math.floor(Math.random() * 10);
    }
    return nonce;
};

export const fExportGetNonce = () => {
    let nonce = '';
    for (let i = 0; i < 6; i++) {
        nonce = nonce + Math.floor(Math.random() * 10);
    }
    return nonce;
};

export const fGetTs = () => {
    let getTs = fGetCookieMes('ts') || 0;
    return parseInt(new Date().getTime() / 1000 - getTs);
};

export const fUtf16to8 = (str) => {
    let out, i, len, c;
    out = "";
    len = str.length;
    for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
            out += str.charAt(i);
        } else if (c > 0x07FF) {
            out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
            out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
            out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
            out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
    }
    return out;
};




export const getProArray = function (data) {
    var array = [];
    for (var i = 0; i < data.length; i++) {
        array.push(data[i]["name"]);
    }
    return array;
};

export const getCityArray = function (p, data) {

    for (var i = 0; i < data.length; i++) {
        if (p == data[i]["name"]) {
            var array = [];
            for (var j = 0; j < data[i]["city"].length; j++) {
                array.push(data[i]["city"][j]["name"]);
            }
            if (array.length != 0) {
                return array;
            } else {
                array.push(p);
                return array;
            }

        }
    }

};


export const getAreaArray = function (p, c,data) {
    for (var i = 0; i < data.length; i++) {
        if (p == data[i]["name"]) {
            var array = [];
            for (var j = 0; j < data[i]["city"].length; j++) {
                if (c == data[i]["city"][j]["name"]) {
                    var area_array = [];
                    for (var k = 0; k < data[i]["city"][j]['area'].length; k++) {
                        area_array.push(data[i]["city"][j]['area'][k]);
                    }
                    if (area_array.length != 0) {
                        return area_array;
                    } else {
                        area_array.push(c);
                        return area_array;
                    }
                }
            }
        }
    }
};


export const checkTelePhone = (s) => {


    var reg = /^1[3|4|5|7|8][0-9]{9}$/;

    return reg.test(s);
};

export const checkEmail = (email) => {
    let emailPatten = new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/);

    if (!email) {
        return 1
    } else if (!emailPatten.test(email)) {
        return 2
    } else {
        return 0;
    }
};


export const clearCookieAll = () => {

    fSetCookieMes(apiConfig.TOKEN, '');
    fSetCookieMes(apiConfig.USERID, '');

}

