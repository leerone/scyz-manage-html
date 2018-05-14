<template>
    <div class="news-add-box">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="类型" prop="type">
                <Select v-model="formValidate.type" size="large" style="width:200px" class="type-select" @on-select="typeSelect">
                    <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="标题" prop="title">
                <Input v-model="formValidate.title" size="large" placeholder="标题"></Input>
            </FormItem>
            <FormItem label="简介" prop="title">
                <Input v-model="formValidate.description" size="large" placeholder="简介"></Input>
            </FormItem>
        </Form>
        <!-- <Input v-model="type" type="textarea" placeholder="富文本"></Input> -->
        <div class="editor-container">
            <UE :id=curEditor :defaultMsg=defaultMsg :config=config ref="ue"></UE>
        </div>

        <Button type="primary" @click="postNews('formValidate')">发布</Button>
        <Button type="primary" @click="backTo()">返回</Button>
    </div>
</template>

<script>
    import UE from '../../../components/ue/ue.vue'; //引入编辑器
    import { mapGetters } from 'vuex';
    export default {

        // props: ['newsmodifydata'],

        components: {
            UE
        },

        data () {
            return {
                curEditor: 'ue',
                defaultMsg: '',
                config: {
                  initialFrameWidth: null,
                  initialFrameHeight: 350
                },
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
                formValidate: {
                    type: '',
                    title: '',
                    description: ''
                },
                ruleValidate: {
                    type: [
                        { required: true, message: '新闻类型不能为空', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '新闻标题不能为空', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '新闻简介不能为空', trigger: 'blur' }
                    ],
                },
                content: '',
                
                // news: this.newsDo
                newsmodifydataid: ''
               
            }
        },

        computed: mapGetters({
            newsAddData: 'newsAddData',
            newsModifyData: 'newsModifyData',
            newsUpdateData: 'newsUpdateData'
        }),

        watch:{
            "newsAddData": function (val) {
                let me = this;
                // alert(val);
                if(val.data == 1){
                    me.$Notice.open({
                        title: '提醒',
                        desc: '新增新闻动态成功 '
                    });
                    me.backTo();
                }else {
                    me.$Notice.open({
                        title: '提醒',
                        desc: '新增新闻动态失败 '
                    });
                }
            },
            "newsUpdateData": function (val) {
                let me = this;
                if(val.data == 1){
                    me.$Message.success('更新新闻动态成功');
                    me.backTo();
                }else {
                    me.$Message.error('更新新闻动态失败');
                }
            },
        },

        mounted(){

        },

        methods: {
            typeSelect (type) {
                console.info(type);
            },
            getUEContent() {
                let me = this;
                me.content = me.$refs.ue.getUEContent();
            },
            postNews(name) {
                let me = this;
                me.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                        me.getUEContent();
                        me.news = {
                            id: me.newsmodifydataid,
                            content: me.content,
                            type: me.formValidate.type,
                            title: me.formValidate.title,
                            description: me.formValidate.description
                        }
                        me.$store.dispatch('updateNews', {reqData: me.news});
                    } else {
                        this.$Message.error('请填写完整信息!');
                    }
                })
            },
            backTo() {
                let me = this;
                me.$emit("eventFunc", 'back');
            },
            modifyevent (param) {
                console.info(param);
            }
        },

        created() {
            let me = this;
            me.modifyNewsData = me.$store.state.news.modifyNewsData;
            me.formValidate = me.modifyNewsData;
            me.defaultMsg = me.modifyNewsData.content;
            me.newsmodifydataid = me.modifyNewsData.id;
        }
    }
</script>

<style lang="less">
    .news-add-box {
        .type-select {
            position: relative;
            z-index: 2;
        }
        .editor-container {
            position: relative;
            z-index: 1;
            padding: 20px;
        }
        .ivu-form-item-label {
            width: 120px;
        }
    }
    
</style>
