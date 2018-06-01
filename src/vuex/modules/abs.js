
import axios from 'axios'
import * as CommonConst from '../CommonConst'
import Qs from 'qs'

const state = {
    absAddData: '',
    absListData: '',
    absCountData: '',
    modifyAbsData: '',
    absUpdateData: '',
    delAbsData: ''
};

const getters = {
    absAddData:state => state.absAddData,
    absListData:state => state.absListData,
    absCountData:state => state.absCountData,
    absUpdateData:state => state.absUpdateData,
    delAbsData:state => state.delAbsData
};

const actions = {
    
    addAbs({commit}, {reqData}){
        axios.post(CommonConst.ADD_ABS_DATA_URL, Qs.stringify(reqData))
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.ADD_ABS_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.ADD_ABS_DATA, {resData: []});
            });
    },
    getAbsList({commit}, {reqData}){
        axios.get(CommonConst.ABS_LIST_DATA_URL+'?type='+reqData.type+'&page='+reqData.page)
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.ABS_LIST_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.ABS_LIST_DATA, {resData: []});
            });
    },
    getAbsCount({commit}, {reqData}){
        axios.get(CommonConst.ABS_COUNT_DATA_URL+'?type='+reqData)
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.ABS_COUNT_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.ABS_COUNT_DATA, {resData: []});
            });
    },
    delAbs({commit}, {reqData}){
        axios.get(CommonConst.DEL_ABS_URL+'?id='+reqData)
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.DEL_ABS_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.DEL_ABS_DATA, {resData: []});
            });
    },
    propAbsModifyData({commit}, {reqData}) {
        let commitData = reqData;
        commit(CommonConst.MODIFY_ABS_DATA, {resData: commitData});
    },
    updateAbs({commit}, {reqData}){
        axios.post(CommonConst.UPDATE_ABS_DATA_URL, Qs.stringify(reqData))
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.UPDATE_ABS_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.UPDATE_ABS_DATA, {resData: []});
            });
    },
};

const mutations = {
    [CommonConst.ADD_ABS_DATA](state, {resData}) {
        state.absAddData = resData;
    },
    [CommonConst.ABS_LIST_DATA](state, {resData}) {
        state.absListData = resData;
    },
    [CommonConst.ABS_COUNT_DATA](state, {resData}) {
        state.absCountData = resData;
    },
    [CommonConst.MODIFY_ABS_DATA](state, {resData}) {
        state.modifyAbsData = resData;
    },
    [CommonConst.UPDATE_ABS_DATA](state, {resData}) {
        state.absUpdateData = resData;
    },
    [CommonConst.DEL_ABS_DATA](state, {resData}) {
        state.delAbsData = resData;
    },
};

export default {
    state,
    actions,
    getters,
    mutations
}