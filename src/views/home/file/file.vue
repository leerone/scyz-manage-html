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
                        title: '标题',
                        key: 'name',
                    },
                    {
                        title: '路径',
                        key: 'url'
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
                                            this.remove(params)
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
                console.info(name);
                let src = 'http://47.106.177.128:16668/uploadfile/'
                this.$Modal.success({
                    title: '预览',
                    width: '80%',
                    closable: true,
                    content: '<img src="'+src+name+'"></img>'
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
        },
        created() {
            let me = this;
            me.initTable();
        }
    }
</script>

<style lang="less">
 
</style>
