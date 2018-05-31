<template>
    <div class="news-add-box">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="新闻类型" prop="type">
                <Select v-model="formValidate.type" size="large" style="width:200px" class="type-select" @on-select="typeSelect">
                    <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>

            <FormItem label="新闻时间" prop="time">
                <DatePicker type="date" style="width: 200px" format="yyyy-MM-dd" v-model="formValidate.time" @on-change="timechage"></DatePicker>
            </FormItem>
            
            <FormItem label="新闻标题" prop="title">
                <Input v-model="formValidate.title" size="large" placeholder="标题"></Input>
            </FormItem>
            <FormItem label="简介图片" prop="pic">
                <div class="demo-upload-list" v-for="item in uploadList">
                    <template v-if="item.status === 'finished'">
                        <img :src="item.url">
                        <div class="demo-upload-list-cover">
                            <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                            <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                        </div>
                    </template>
                    <template v-else>
                        <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                    </template>
                </div>
                <Upload
                    ref="upload"
                    :show-upload-list="false"
                    :default-file-list="defaultList"
                    :on-success="handleSuccess"
                    :format="['jpg','jpeg','png']"
                    :max-size="2048"
                    :on-format-error="handleFormatError"
                    :on-exceeded-size="handleMaxSize"
                    :before-upload="handleBeforeUpload"
                    multiple
                    type="drag"
                    action="http://47.106.177.128:16666/file/uploadimage"
                    style="display: inline-block;width:58px;">
                    <div style="width: 58px;height:58px;line-height: 58px;">
                        <Icon type="camera" size="20"></Icon>
                    </div>
                </Upload>
            </FormItem>
            <FormItem label="新闻简介" prop="title">
                <Input v-model="formValidate.desc" type="textarea" :rows="4" placeholder="简介"></Input>
            </FormItem>
            <FormItem label="新闻详情" prop="newDetail">
                <div class="editor-container">
                    <UE :id=curEditor :defaultMsg=defaultMsg ref="ue"></UE>
                </div>
            </FormItem>
        </Form>
        
        <div class="page-btm-btn">
            <Button type="primary" @click="postNews('formValidate')">发布</Button>
            <Button type="primary" @click="backTo()">返回</Button>
        </div>
    </div>
</template>

<script>
    import UE from '../../../components/ue/ue.vue'; //引入编辑器
    import { mapGetters } from 'vuex';
    export default {
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
                    desc: '',
                    time: ''
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
                
                news: {
                    content: '',
                    title: '',
                    time: '',
                    type: '',
                    description: ''
                },
                defaultList: [
                    
                ],
                imgName: '',
                visible: false,
                uploadList: [],
                imgUrl: ''
            }
        },

        computed: mapGetters({
            newsAddData: 'newsAddData',
            
        }),

        watch:{
            "newsAddData": function (val) {
                let me = this;
                // alert(val);
                if(val.data == 1){
                    me.$Message.success('新增新闻动态成功');
                    me.backTo();
                }else {
                    me.$Message.error('新增新闻动态失败');
                }
            }
        },

        mounted(){
            this.uploadList = this.$refs.upload.fileList;
        },

        methods: {
            timechage() {
                let me = this;
                me.formValidate.time = me.formatDate(new Date(me.formValidate.time),'yyyy-MM-dd');
                console.info(me.formValidate.time);
            },
            formatDate(date, fmt) {
                if (/(y+)/.test(fmt)) {
                    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
                }
                let o = {
                    'M+': date.getMonth() + 1,
                    'd+': date.getDate(),
                    'h+': date.getHours(),
                    'm+': date.getMinutes(),
                    's+': date.getSeconds()
                };
                for (let k in o) {
                    if (new RegExp(`(${k})`).test(fmt)) {
                        let str = o[k] + '';
                        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
                    }
                }
                return fmt;
            },
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
                        // this.$Message.success('Success!');
                        me.getUEContent();
                        me.news = {
                            content: me.content,
                            time: me.formValidate.time,
                            type: me.formValidate.type,
                            title: me.formValidate.title,
                            description: me.formValidate.desc,
                            url: me.imgUrl
                        }
                        me.$store.dispatch('addNews', {reqData: me.news});
                    } else {
                        this.$Message.error('请填写完整信息!');
                    }
                })
            },
            backTo() {
                let me = this;
                me.$emit("eventFunc", 'back');
            },
            handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
                let me = this;
                file.url = 'http://47.106.177.128:16668/uploadimage/'+res;
                file.name = res;
                me.imgName = res;
                me.imgUrl = file.url;
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: '文件格式错误',
                    desc: '文件 ' + file.name + ' 格式错误, 请选择 jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: '超过文件大小限制',
                    desc: '文件  ' + file.name + ' 太大, 请不要超过 2M.'
                });
            },
            handleBeforeUpload () {
                const limit = 1; //简介图片只允许上传一张
                const check = this.uploadList.length < limit;
                if (!check) {
                    this.$Notice.warning({
                        title: '简介图片只允许上传一张，<div> 更多图片请在新闻详情中添加!</div>'
                    });
                }
                return check;
            },
        },

        created() {
            let me = this;
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
            padding: 0px;
        }
        .ivu-form-item-label {
            width: 120px;
        }
    }
    
</style>
