<template>
    <div >
        <Select v-model="hrstype" size="large" style="width:200px;" class="type-select" @on-change="hrsTypeSelect">
            <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
    
        <Table border :columns="columns" :data="data"></Table>
        <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="pagecount" :current="1" @on-change="changePage"></Page>
        </div>
    </div>

    <Modal
        v-model="confirm"
        title="提示"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>确认是否删除?</p>
    </Modal>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {

        components: {
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
                        title: '工作时间',
                        key: 'jobtime'
                    },
                    {
                        title: '地址',
                        key: 'address'
                    },
                    {
                        title: '简介',
                        key: 'description',
                    },
                    {
                        title: '详情',
                        key: 'desc1',
                        ellipsis: true
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
                                            let me = this;
                                            // this.remove(params);
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
            "hrsListData": function (val) {
                let me = this;
                me.data = [];
                if(val && val.data){
                    let list = val.data;
                    list.map(it => {
                        if(it.jobtime=='fulltime') {
                            it.jobtime = '全职';
                        }else if(it.jobtime=='parttime'){
                            it.jobtime = '兼职';
                        }
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
                    closable: true,
                    width: '80%',
                    content: '<p>职位: ' + param.row.name + '</p>' 
                            +'<p>简介: ' + param.row.description + '</p>'
                            +'<p>地址: ' + param.row.address + '</p>'
                            +'<p>招聘人数: ' + param.row.number + '</p>'
                            +'<p>工作职责: ' + param.row.desc1 + '</p>'
                            +'<p>职责要求: ' + param.row.desc2 + '</p>'
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
            hrsTypeSelect  (type) {
                let me = this;
                me.$store.dispatch('getHrsList', {reqData: {'type': me.hrstype, 'page': 1}});
            },
            changePage(index) {
                let me = this;
                me.$store.dispatch('getHrsList', {reqData: {'type': me.hrstype, 'page': index}});
            },
            initTable () {
                let me = this;
                me.$store.dispatch('getHrsCount', {reqData: me.hrstype});
                me.$store.dispatch('getHrsList', {reqData: {'type': me.hrstype, 'page': 1}});
            },
            ok () {
                let me = this;
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
 
</style>
