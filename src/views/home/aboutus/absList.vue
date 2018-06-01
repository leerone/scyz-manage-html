<template>
    <div>
        <Select v-model="absType" size="large" style="width:200px;" class="type-select" @on-change="absTypeSelect">
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
            absListData: 'absListData',
            delAbsData: 'delAbsData',
            absCountData: 'absCountData'
        }),

        data () {
            return {
                list: [
                    {
                        value: 'active',
                        label: '员工活动'
                    },
                    {
                        value: 'honour',
                        label: '奖励与荣耀'
                    },
                    {
                        value: 'training',
                        label: '学习与培训'
                    }
                ],
                absType: '',
                pagecount: 0,
                columns: [
                    {
                        title: '标题',
                        key: 'title',
                    },
                    {
                        title: '详情',
                        key: 'content',
                        ellipsis: true
                    },
                    {
                        title: '文章来源',
                        key: 'reference'
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
            "absListData": function (val) {
                let me = this;
                me.data = [];
                if(val && val.data) {
                    let list = val.data;
                    list.map(it => {
                        me.data.push(it);
                    });
                }
            },
            "absCountData": function (val) {
                let me = this;
                if(val && val.data){
                    me.pagecount = val.data;
                }
            },
            "delAbsData": function (val) {
                let me = this;
                if(val.data == 1) {
                    me.$Notice.open({
                        title: '提醒',
                        desc: '删除成功 '
                    });
                    me.initTable();
                } else {
                    me.$Notice.open({
                        title: '提醒',
                        desc: '删除失败 '
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
                me.$store.dispatch('delAbs', {reqData: id});
            },
            absTypeSelect (type) {
                let me = this;
                me.$store.dispatch('getAbsCount', {reqData: me.absType});
                me.$store.dispatch('getAbsList', {reqData: {'type': me.absType, 'page': 1}});
            },
            changePage(index) {
                let me = this;
                me.$store.dispatch('getAbsList', {reqData: {'type': me.absType, 'page': index}});
            },
            initTable () {
                let me = this;
                me.$store.dispatch('getAbsCount', {reqData: me.absType});
                me.$store.dispatch('getAbsList', {reqData: {'type': me.absType, 'page': 1}});
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
    .editor-container {
        padding-top: 20px;
    }
</style>
