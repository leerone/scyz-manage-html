/**
 * Created by tangyue on 2017-10-23.
 */
import axios from 'axios'
import * as CommonConst from '../CommonConst'
import Qs from 'qs'

const state = {
    // hrs start
    hrsAddData: '',
    hrsListData: '',
    hrsCountData: '',
    modifyHrsData: '',
    hrsUpdateData: '',
    delHrsData: '',
    // hrs end
};

const getters = {

    // news start
    hrsAddData:state => state.hrsAddData,
    hrsListData:state => state.hrsListData,
    hrsCountData:state => state.hrsCountData,
    hrsUpdateData:state => state.hrsUpdateData,
    delHrsData:state => state.delHrsData,
    modifyHrsData:state => state.modifyHrsData,
    // news end
};

const actions = {

    getHrsList({commit}, {reqData}){
        axios.get(CommonConst.HRS_LIST_DATA_URL+'?type='+reqData.type+'&page='+reqData.page)
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.HRS_LIST_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.HRS_LIST_DATA, {resData: []});
            });
    },

    addHrs({commit}, {reqData}){
        axios.post(CommonConst.ADD_HRS_DATA_URL, Qs.stringify(reqData))
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.ADD_HRS_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.ADD_HRS_DATA, {resData: []});
            });
    },
    updateHrs({commit}, {reqData}){
        axios.post(CommonConst.UPDATE_HRS_DATA_URL, Qs.stringify(reqData))
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.UPDATE_HRS_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.UPDATE_HRS_DATA, {resData: []});
            });
    },

    getHrsCount({commit}, {reqData}){
        axios.get(CommonConst.HRS_COUNT_DATA_URL+'?type='+reqData)
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.HRS_COUNT_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.HRS_COUNT_DATA, {resData: []});
            });
    },

    delHrs({commit}, {reqData}){
        axios.get(CommonConst.DEL_HRS_URL+'?id='+reqData)
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.DEL_HRS_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.DEL_HRS_DATA, {resData: []});
            });
    },

    propHrsModifyData({commit}, {reqData}){
        let commitData = reqData;
        commit(CommonConst.MODIFY_HRS_DATA, {resData: commitData});
    },
    
};

const mutations = {
    [CommonConst.ADD_HRS_DATA](state, {resData}) {
        state.hrsAddData = resData;
    },
    [CommonConst.HRS_LIST_DATA](state, {resData}) {
        state.hrsListData = resData;
    },
    [CommonConst.HRS_COUNT_DATA](state, {resData}) {
        state.hrsCountData = resData;
    },
    [CommonConst.DEL_HRS_DATA](state, {resData}) {
        state.delHrsData = resData;
    },
    [CommonConst.MODIFY_HRS_DATA](state, {resData}) {
        state.modifyHrsData = resData;
    },
    [CommonConst.UPDATE_HRS_DATA](state, {resData}) {
        state.hrsUpdateData = resData;
    },
    
};

export default {
    state,
    actions,
    getters,
    mutations
}
