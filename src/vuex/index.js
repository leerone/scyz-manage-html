import Vue from 'vue'
/* vuex 数据状态管理器 */
import Vuex from 'vuex'
/* 通用组件 Vuex对象 */

/* 具体业务模块 */
/* 首页的获得用户权限 */
import news from './modules/news'
import hrs from './modules/hrs'
import cases from './modules/case'
import file from './modules/file'

/* Vue加载状态管理器实例 */
Vue.use(Vuex);
/* 实例化Vuex状态管理器对象 */
export default new Vuex.Store({
    modules: {
        news,
        hrs,
        cases,
        file,
    },
    strict: false
});