/**
 * Created by tangyue on 2017-10-23.
 */
import axios from 'axios'
import * as CommonConst from '../CommonConst'
import Qs from 'qs'

const state = {
    testData: '',

    // news start
    newsAddData: '',
    newsListData: '',
    newsCountData: '',
    modifyNewsData: '',
    newsUpdateData: '',
    delNewsData: '',
    // news end
};

const getters = {
    testData:state => state.testData,

    // news start
    newsAddData:state => state.newsAddData,
    newsListData:state => state.newsListData,
    newsCountData:state => state.newsCountData,
    newsUpdateData:state => state.newsUpdateData,
    delNewsData:state => state.delNewsData,
    // news end

};

const actions = {
    
    test({commit}, {reqData}){
        axios.get(CommonConst.TEST_DATA_URL)
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.TEST_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.TEST_DATA, {resData: []});
            });
    },

    addNews({commit}, {reqData}){
        axios.post(CommonConst.ADD_NEWS_DATA_URL, Qs.stringify(reqData))
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.ADD_NEWS_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.ADD_NEWS_DATA, {resData: []});
            });
    },
    getNewsList({commit}, {reqData}){
        axios.get(CommonConst.NEWS_LIST_DATA_URL+'?type='+reqData.type+'&page='+reqData.page)
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.NEWS_LIST_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.NEWS_LIST_DATA, {resData: []});
            });
    },
    getNewsCount({commit}, {reqData}){
        axios.get(CommonConst.NEWS_COUNT_DATA_URL+'?type='+reqData)
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.NEWS_COUNT_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.NEWS_COUNT_DATA, {resData: []});
            });
    },
    delNews({commit}, {reqData}){
        axios.get(CommonConst.DEL_NEWS_URL+'?id='+reqData)
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.DEL_NEWS_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.DEL_NEWS_DATA, {resData: []});
            });
    },
    propNewsModifyData({commit}, {reqData}){
        let commitData = reqData;
        commit(CommonConst.MODIFY_NEWS_DATA, {resData: commitData});
    },
    updateNews({commit}, {reqData}){
        axios.post(CommonConst.UPDATE_NEWS_DATA_URL, Qs.stringify(reqData))
            .then(resData => {
                let commitData = resData;
                commit(CommonConst.UPDATE_NEWS_DATA, {resData: commitData});
            })
            .catch(e => {
                commit(CommonConst.UPDATE_NEWS_DATA, {resData: []});
            });
    },
};

const mutations = {
    [CommonConst.TEST_DATA](state, {resData}) {
        state.testData = resData;
    },
    [CommonConst.ADD_NEWS_DATA](state, {resData}) {
        state.newsAddData = resData;
    },
    [CommonConst.NEWS_LIST_DATA](state, {resData}) {
        state.newsListData = resData;
    },
    [CommonConst.NEWS_COUNT_DATA](state, {resData}) {
        state.newsCountData = resData;
    },
    [CommonConst.MODIFY_NEWS_DATA](state, {resData}) {
        state.modifyNewsData = resData;
    },
    [CommonConst.UPDATE_NEWS_DATA](state, {resData}) {
        state.newsUpdateData = resData;
    },
    [CommonConst.DEL_NEWS_DATA](state, {resData}) {
        state.delNewsData = resData;
    },
};

export default {
    state,
    actions,
    getters,
    mutations
}
