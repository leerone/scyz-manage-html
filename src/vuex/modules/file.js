/**
 * Created by tangyue on 2017-10-23.
 */
import axios from 'axios'
import * as CommonConst from '../CommonConst'
import Qs from 'qs'

const state = {
    fileListData: '',
    fileCountData: '',
    delFileData: '',
};

const getters = {

    // news start
    fileListData:state => state.fileListData,
    fileCountData:state => state.fileCountData,
    delFileData:state => state.delFileData,
    // news end
};

const actions = {

    getFileList({commit}, {reqData}){
        axios.get(CommonConst.FILE_LIST_DATA_URL+'?page='+reqData.page)
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.FILE_LIST_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.FILE_LIST_DATA, {resData: []});
            });
    },

    
    getFileCount({commit}){
        axios.get(CommonConst.FILE_COUNT_DATA_URL)
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.FILE_COUNT_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.FILE_COUNT_DATA, {resData: []});
            });
    },

    delFile({commit}, {reqData}){
        axios.get(CommonConst.DEL_FILE_DATA_URL+'?id='+reqData)
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.DEL_FILE_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.DEL_FILE_DATA, {resData: []});
            });
    },
};

const mutations = {
    [CommonConst.FILE_LIST_DATA](state, {resData}) {
        state.fileListData = resData;
    },
    [CommonConst.FILE_COUNT_DATA](state, {resData}) {
        state.fileCountData = resData;
    },
    [CommonConst.DEL_FILE_DATA](state, {resData}) {
        state.delFileData = resData;
    },
};

export default {
    state,
    actions,
    getters,
    mutations
}
