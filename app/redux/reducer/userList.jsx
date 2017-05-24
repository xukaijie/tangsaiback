
import {LOGINOK,LOGOUT} from 'actionPath/userAction.jsx';

import {fExportSetCookieMes} from 'cmPath/common.jsx';

import {USERID,TOKEN} from 'cmPath/config.jsx';

const initialstate={

    header:require('imgPath/header.png')
}

export default function taskList(state= initialstate, action) {

    switch (action.type) {

        case LOGINOK:
            fExportSetCookieMes(USERID,action.data.user_id);
            fExportSetCookieMes(TOKEN,action.data.token);

            return state

        default:
            return state
    }
}

