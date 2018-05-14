/**
 * Created by tangyue on 2017-10-23.
 */
import axios from 'axios'
import * as CommonConst from '../CommonConst'
import Qs from 'qs'

const state = {
    caseAddData: '',
    caseListData: '',
    caseCountData: '',
    modifyCaseData: '',
    caseUpdateData: '',
    delCaseData: '',
};

const getters = {

    // news start
    caseAddData:state => state.caseAddData,
    caseListData:state => state.caseListData,
    caseCountData:state => state.caseCountData,
    caseUpdateData:state => state.caseUpdateData,
    delCaseData:state => state.delCaseData,
    modifyCaseData:state => state.modifyCaseData,
    // news end
};

const actions = {

    getCaseList({commit}, {reqData}){
        axios.get(CommonConst.CASE_LIST_DATA_URL+'?type='+reqData.type+'&page='+reqData.page)
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.CASE_LIST_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.CASE_LIST_DATA, {resData: []});
            });
    },

    addCase({commit}, {reqData}){
        axios.post(CommonConst.ADD_CASE_DATA_URL, Qs.stringify(reqData))
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.ADD_CASE_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.ADD_CASE_DATA, {resData: []});
            });
    },
    updateCase({commit}, {reqData}){
        axios.post(CommonConst.UPDATE_CASE_DATA_URL, Qs.stringify(reqData))
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.UPDATE_CASE_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.UPDATE_CASE_DATA, {resData: []});
            });
    },

    getCaseCount({commit}, {reqData}){
        axios.get(CommonConst.CASE_COUNT_DATA_URL+'?type='+reqData)
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.CASE_COUNT_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.CASE_COUNT_DATA, {resData: []});
            });
    },

    delCase({commit}, {reqData}){
        axios.get(CommonConst.DEL_CASE_URL+'?id='+reqData)
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.DEL_CASE_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.DEL_CASE_DATA, {resData: []});
            });
    },

    propCaseModifyData({commit}, {reqData}){
        let commitData = reqData;
        commit(CommonConst.MODIFY_CASE_DATA, {resData: commitData});
    },
    
};

const mutations = {
    [CommonConst.ADD_CASE_DATA](state, {resData}) {
        state.caseAddData = resData;
    },
    [CommonConst.CASE_LIST_DATA](state, {resData}) {
        state.caseListData = resData;
    },
    [CommonConst.CASE_COUNT_DATA](state, {resData}) {
        state.caseCountData = resData;
    },
    [CommonConst.DEL_CASE_DATA](state, {resData}) {
        state.delCaseData = resData;
    },
    [CommonConst.MODIFY_CASE_DATA](state, {resData}) {
        state.modifyCaseData = resData;
    },
    [CommonConst.UPDATE_CASE_DATA](state, {resData}) {
        state.caseUpdateData = resData;
    },
    
};

export default {
    state,
    actions,
    getters,
    mutations
}
