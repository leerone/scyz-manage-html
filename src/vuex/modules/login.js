
import axios from 'axios'
import * as CommonConst from '../CommonConst'
import Qs from 'qs'

const state = {
    loginData: '',
    curUserData: ''
};

const getters = {
    loginData:state => state.loginData,
    curUserData:state => state.curUserData
};

const actions = {
    // 登陆
    login({commit}, {reqData}){
        axios.get(CommonConst.LOGIN_URL+'?username='+reqData.username+'&password='+reqData.password)
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.LOGIN_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.LOGIN_DATA, {resData: []});
            });
    },
    getCurUser({commit}, {reqData}){
        axios.get(CommonConst.CUR_USER_DATA_URL+'?id='+reqData.userId)
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.CUR_USER_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.CUR_USER_DATA, {resData: []});
            });
    }
};

const mutations = {
    [CommonConst.LOGIN_DATA](state, {resData}) {
        state.loginData = resData;
    },
    [CommonConst.CUR_USER_DATA](state, {resData}) {
        state.curUserData = resData;
    }
};

export default {
    state,
    actions,
    getters,
    mutations
}