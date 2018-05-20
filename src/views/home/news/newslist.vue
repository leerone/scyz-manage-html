<template>
    <div >
        <Select v-model="newstype" size="large" style="width:200px;padding:10px;" class="type-select" @on-change="newsTypeSelect">
            <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
    
        <Table border :columns="columns" :data="data"></Table>
        <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="pagecount" :current="1" @on-change="changePage"></Page>
        </div>

        <Modal
            v-model="confirm"
            title="提示"
            @on-ok="ok"
            @on-cancel="cancel">
            <p>确认是否删除?</p>
        </Modal>

    </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {

        components: {
            UE
        },

        computed: mapGetters({
            newsListData: 'newsListData',
            delNewsData: 'delNewsData',
            newsCountData: 'newsCountData',
        }),

        data () {
            return {
                list: [
                    {
                        value: 'hangye',
                        label: '行业新闻'
                    },
                    {
                        value: 'qiye',
                        label: '企业新闻'
                    },
                    {
                        value: 'biao',
                        label: '中标公告'
                    },
                    {
                        value: 'notes',
                        label: '通知公告'
                    },
                ],
                newstype: '',
                pagecount: 0,
                columns: [
                    {
                        title: '标题',
                        key: 'title',
                    },
                    {
                        title: '简介',
                        key: 'description',
                        ellipsis: true
                    },
                    {
                        title: '发布时间',
                        key: 'time'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params)
                                        }
                                    }
                                }, '预览'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.modify(params)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            let me = this;
                                            me.confirm = true;
                                            me.delparams = params;
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data: [
                    
                ],
                confirm: false,
                delparams: ''
            }
        },

       

        mounted(){

        },

        watch:{
            "newsListData": function (val) {
                let me = this;
                me.data = [];
                if(val && val.data){
                    console.info(val);
                    let list = val.data;
                    list.map(it => {
                        me.data.push(it);
                    });
                }
            },
            "newsCountData": function (val) {
                let me = this;
                if(val && val.data){
                    me.pagecount = val.data;
                }
            },
            "delNewsData": function (val) {
                let me = this;
                if(val.data == 1){
                    me.$Notice.open({
                        title: '提醒',
                        desc: '删除新闻成功 '
                    });
                    me.initTable();
                }else {
                    me.$Notice.open({
                        title: '提醒',
                        desc: '删除新闻失败 '
                    });
                }
            },

        },

        methods: {
            show (param) {
                this.$Modal.success({
                    title: '预览',
                    width: '80%',
                    closable: true,
                    content: param.row.content
                })
            },
            modify (param) {
                let me = this;
                me.$emit("eventFunc", 'modify', param);
            },
            remove (param) {
                let me = this;
                let id = param.row.id;
                me.$store.dispatch('delNews', {reqData: id});
            },
            newsTypeSelect (type) {
                let me = this;
                me.$store.dispatch('getNewsCount', {reqData: me.newstype});
                me.$store.dispatch('getNewsList', {reqData: {'type': me.newstype, 'page': 1}});
            },
            changePage(index) {
                let me = this;
                me.$store.dispatch('getNewsList', {reqData: {'type': me.newstype, 'page': index}});
            },
            initTable () {
                let me = this;
                me.$store.dispatch('getNewsCount', {reqData: me.newstype});
                me.$store.dispatch('getNewsList', {reqData: {'type': me.newstype, 'page': 1}});
            },
            ok () {
                let me = this;
                console.info(me.delparams);
                me.remove(me.delparams);
            },
            cancel () {
                let me = this;
                me.$Message.info('取消');
            }
        },

        created() {
            let me = this;
            me.initTable();
        }
    }
</script>

<style lang="less">
    .editor-container {
        padding-top: 20px;
    }
</style>
