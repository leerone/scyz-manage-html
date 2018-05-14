<template>
    <div >
        <Select v-model="hrstype" size="large" style="width:200px" class="type-select" @on-change="hrsTypeSelect">
            <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
    
        <Table border :columns="columns" :data="data"></Table>
        <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="pagecount" :current="1" @on-change="changePage"></Page>
        </div>
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
            hrsListData: 'hrsListData',
            delHrsData: 'delHrsData',
            hrsCountData: 'hrsCountData',
        }),

        data () {
            return {
                list: [
                    {
                        value: 'sheji',
                        label: '设计类'
                    },
                    {
                        value: 'sale',
                        label: '销售类'
                    },
                    {
                        value: 'manage',
                        label: '管理类'
                    }
                ],
                hrstype: '',
                pagecount: 0,
                columns: [
                    {
                        title: '职位',
                        key: 'name',
                    },
                    {
                        title: '地址',
                        key: 'address'
                    },
                    {
                        title: '简介',
                        key: 'desc1'
                    },
                    {
                        title: '详情',
                        key: 'desc'
                    },
                    {
                        title: '人数',
                        key: 'number'
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
                                            this.remove(params)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data: [
                    
                ]
            }
        },

       

        mounted(){

        },

        watch:{
            "hrsListData": function (val) {
                let me = this;
                me.data = [];
                if(val && val.data){
                    let list = val.data;
                    list.map(it => {
                        me.data.push(it);
                    });
                }
            },
            "hrsCountData": function (val) {
                let me = this;
                if(val && val.data){
                    me.pagecount = val.data;
                }
            },
            "delHrsData": function (val) {
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
                    content: param.row.desc
                })
            },
            modify (param) {
                let me = this;
                me.$emit("eventFunc", 'modify', param);
            },
            remove (param) {
                let me = this;
                let id = param.row.id;
                me.$store.dispatch('delHrs', {reqData: id});
            },
            newsTypeSelect (type) {
                let me = this;
                me.$store.dispatch('getHrsList', {reqData: {'type': me.newstype, 'page': 1}});
            },
            changePage(index) {
                let me = this;
                me.$store.dispatch('getHrsList', {reqData: {'type': me.newstype, 'page': index}});
            },
            initTable () {
                let me = this;
                me.$store.dispatch('getHrsCount', {reqData: me.newstype});
                me.$store.dispatch('getHrsList', {reqData: {'type': me.newstype, 'page': 1}});
            }
        },

        created() {
            let me = this;
            me.initTable();
        }
    }
</script>

<style lang="less">
 
</style>
