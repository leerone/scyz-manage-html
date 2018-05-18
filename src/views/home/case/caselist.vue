<template>
    <div >
        <Select v-model="casetype" size="large" style="width:200px" class="type-select" @on-change="caseTypeSelect">
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
            caseListData: 'caseListData',
            delCaseData: 'delCaseData',
            caseCountData: 'caseCountData',
        }),

        data () {
            return {
                list: [
                    {
                        value: 'ganzi',
                        label: '甘孜'
                    },
                    {
                        value: 'chuanwai',
                        label: '川外'
                    },
                    {
                        value: 'chuannei',
                        label: '川内'
                    },
                ],
                casetype: '',
                pagecount: 0,
                columns: [
                    {
                        title: '项目名称',
                        key: 'name',
                    },
                    {
                        title: '地址',
                        key: 'address'
                    },
                    // {
                    //     title: '设计内容',
                    //     key: 'content'
                    // },
                    {
                        title: '地区',
                        key: 'location'
                    },
                    {
                        title: '项目位置',
                        key: 'address'
                    },
                    {
                        title: '总建筑面积',
                        key: 'coverage'
                    },
                    {
                        title: '总建筑高度',
                        key: 'height'
                    },
                    {
                        title: '项目建成时间',
                        key: 'finishtime'
                    },
                    {
                        title: '类型',
                        key: 'type'
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
            "caseListData": function (val) {
                let me = this;
                me.data = [];
                if(val && val.data){
                    let list = val.data;
                    list.map(it => {
                        me.data.push(it);
                    });
                }
            },
            "caseCountData": function (val) {
                let me = this;
                if(val && val.data){
                    me.pagecount = val.data;
                }
            },
            "delCaseData": function (val) {
                let me = this;
                if(val.data == 1){
                    me.$Notice.open({
                        title: '提醒',
                        desc: '删除成功 '
                    });
                    me.initTable();
                }else {
                    me.$Notice.open({
                        title: '提醒',
                        desc: '删除失败 '
                    });
                }
            },

        },

        methods: {
            show (param) {
                let arr = param.row.url.split(',');
                let imgarr = new Array();
                arr.map(it => {
                    var src = 'http://47.106.177.128:16668/uploadimage/'+it;
                    imgarr.push('<img src="'+src+'"</img>');
                })
                this.$Modal.success({
                    title: '预览',
                    width: '80%',
                    closable: true,
                    content: '<p>项目名称: ' + param.row.name + '</p>' 
                            +'<p>设计内容: ' + param.row.content + '</p>'
                            +'<p>项目位置: ' + param.row.address + '</p>'
                            +'<p>地区: ' + param.row.location + '</p>'
                            +'<p>总建筑面积: ' + param.row.coverage + '</p>'
                            +'<p>总建筑高度: ' + param.row.height + '</p>'
                            +'<p>项目建成时间: ' + param.row.finishtime + '</p>'
                            +'<p>类型: ' + param.row.type + '</p>'
                            + imgarr
                })
            },
            modify (param) {
                let me = this;
                me.$emit("eventFunc", 'modify', param);
            },
            remove (param) {
                let me = this;
                let id = param.row.id;
                me.$store.dispatch('delCase', {reqData: id});
            },
            caseTypeSelect  (type) {
                let me = this;
                me.$store.dispatch('getCaseList', {reqData: {'type': me.casetype, 'page': 1}});
            },
            changePage(index) {
                let me = this;
                me.$store.dispatch('getCaseList', {reqData: {'type': me.casetype, 'page': index}});
            },
            initTable () {
                let me = this;
                me.$store.dispatch('getCaseCount', {reqData: me.casetype});
                me.$store.dispatch('getCaseList', {reqData: {'type': me.casetype, 'page': 1}});
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
 
</style>
