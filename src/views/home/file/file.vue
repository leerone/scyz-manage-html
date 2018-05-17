<template>

    <div >
        <Upload
            :on-success="handleSuccess"
            multiple
            action="http://47.106.177.128:16666/file/uploadfile">
            <Button type="ghost" icon="ios-cloud-upload-outline">文档上传</Button>
        </Upload>

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

        computed: mapGetters({
            fileListData: 'fileListData',
            delFileData: 'delFileData',
            fileCountData: 'fileCountData',
        }),

        data () {
            return {
                columns: [
                    {
                        title: '文档名称',
                        key: 'name',
                    },
                    {
                        title: '路径',
                        key: 'url'
                    },
                    {
                        title: '文档类型',
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
                pagecount: 0,
                confirm: false,
                delparams: ''
            }
        },
        mounted(){
        },

        watch:{
            "fileListData": function (val) {
                let me = this;
                me.data = [];
                if(val && val.data){
                    let list = val.data;
                    list.map(it => {
                        let newname = it.name.split('=')[1];
                        it.name = newname;
                        me.data.push(it);
                    });
                }
            },
            "fileCountData": function (val) {
                let me = this;
                if(val && val.data){
                    me.pagecount = val.data;
                }
            },
            "delFileData": function (val) {
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
                let arr = param.row.url.split('/');
                let name = arr[arr.length-1];
                let src = 'http://47.106.177.128:16668/uploadfile/';
                let content = "<iframe src='https://view.officeapps.live.com/op/view.aspx?src=http://http://47.106.177.128:16668/uploadfile/'"+param.name+" width='1920px' height='1080px' frameborder='0'></iframe>"
                this.$Modal.success({
                    title: '预览',
                    width: '80%',
                    closable: true,
                    content: content
                })
            },
            remove (param) {
                let me = this;
                let id = param.row.id;
                me.$store.dispatch('delFile', {reqData: id});
            },
            initTable () {
                let me = this;
                me.$store.dispatch('getFileCount');
                me.$store.dispatch('getFileList', {reqData: {'page': 1}});
            },
            changePage(index) {
                let me = this;
                me.$store.dispatch('getFileList', {reqData: {'page': index}});
            },
            handleSuccess (res, file) {
                let me = this;
                me.initTable ();
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
