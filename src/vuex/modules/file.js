
import axios from 'axios'
import * as CommonConst from '../CommonConst'
import Qs from 'qs'

const state = {
    fileListData: '',
    fileCountData: '',
    delFileData: '',
    fileCommentList: '',
    delCommentData: '',
};

const getters = {
    fileListData:state => state.fileListData,
    fileCountData:state => state.fileCountData,
    delFileData:state => state.delFileData,
    fileCommentList:state => state.fileCommentList,
    delCommentData:state => state.delCommentData
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
    // 评论
    getFileCommentList({commit}, {reqData}){
        axios.get(CommonConst.FILE_COMMENT_LIST_URL+'?fileid='+reqData)
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.FILE_COMMENT_LIST, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.FILE_COMMENT_LIST, {resData: []});
            });
    },
    // 删评论
    delComment({commit}, {reqData}){
        axios.get(CommonConst.DEL_COMMENT_URL+'?id='+reqData)
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.DEL_COMMENT_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.DEL_COMMENT_DATA, {resData: []});
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
    [CommonConst.FILE_COMMENT_LIST](state, {resData}) {
        state.fileCommentList = resData;
    },
    [CommonConst.DEL_COMMENT_DATA](state, {resData}) {
        state.delCommentData = resData;
    },
};

export default {
    state,
    actions,
    getters,
    mutations
}
