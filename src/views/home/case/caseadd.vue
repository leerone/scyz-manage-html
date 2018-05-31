<template>
    <div class="news-add-box">

        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="类型">
                <Select v-model="formValidate.type" size="large" style="width:200px" class="type-select" @on-change="typeSelect">
                    <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Select v-model="formValidate.subtype" size="large" style="width:200px" class="type-select" v-show="isShowSubtype" on-change="subtypeSelect">
                    <Option v-for="item in sublist" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="项目名称" prop="name">
                <Input v-model="formValidate.name" size="large" placeholder="项目名称"></Input>
            </FormItem>

            <FormItem label="项目标题" prop="title">
                <Input v-model="formValidate.title" size="large" placeholder="项目标题"></Input>
            </FormItem>

            <FormItem label="项目子标题" prop="subtitle">
                <Input v-model="formValidate.subtitle" size="large" placeholder="项目子标题"></Input>
            </FormItem>
            <FormItem label="简介图片" prop="descimg">
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
                <Modal title="预览" v-model="visible">
                    <img :src="'http://47.106.177.128:16668/uploadimage/' + imgName" v-if="visible" style="width: 100%">
                </Modal>
            </FormItem>

            <FormItem label="项目简介" prop="content">
                <Input v-model="formValidate.content" type="textarea" :rows="4" placeholder="项目简介"></Input>
            </FormItem>
            <FormItem label="总建筑高度" prop="height">
                <Input v-model="formValidate.height" size="large" placeholder="总建筑高度"></Input>
            </FormItem>
            <FormItem label="项目建成时间" prop="finishtime">
                <Input v-model="formValidate.finishtime" size="large" placeholder="项目建成时间"></Input>
            </FormItem>
            <FormItem label="总建筑面积" prop="coverage">
                <Input v-model="formValidate.coverage" size="large" placeholder="总建筑面积"></Input>
            </FormItem>
            <FormItem label="设计范围" prop="scale">
                <Input v-model="formValidate.scale" size="large" placeholder="设计范围"></Input>
            </FormItem>
            <FormItem label="地区" prop="location">
                <Input v-model="formValidate.location" size="large" placeholder="地区"></Input>
            </FormItem>
            <FormItem label="位置" prop="address">
                <Input v-model="formValidate.address" size="large" placeholder="地址"></Input>
            </FormItem>
            <FormItem label="项目详情" prop="address">
            <div class="editor-container">
                <UE :id=curEditor :defaultMsg=defaultMsg  ref="ue"></UE>
            </div>
            </FormItem>
        </Form>

        <div class="page-btm-btn">
            <Button type="primary" @click="postCase('formValidate')">提交</Button>
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
                isShowSubtype: false,
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
                sublist: [
                    {
                        value: 'ld',
                        label: '泸定县'
                    },
                    {
                        value: 'kd',
                        label: '康定市'
                    },
                    {
                        value: 'db',
                        label: '丹巴县'
                    },
                    {
                        value: 'sd',
                        label: '色达县'
                    },
                    {
                        value: 'jl',
                        label: '九龙县'
                    },
                    {
                        value: 'yj',
                        label: '雅江县'
                    },
                    {
                        value: 'lt',
                        label: '理塘县'
                    },
                    {
                        value: 'dc',
                        label: '稻城县'
                    },
                    {
                        value: 'xc',
                        label: '乡城县'
                    },
                    {
                        value: 'dr',
                        label: '得荣县'
                    },
                    {
                        value: 'bt',
                        label: '巴塘县'
                    },
                    {
                        value: 'df',
                        label: '道孚县'
                    },
                    {
                        value: 'lh',
                        label: '炉霍县'
                    },
                    {
                        value: 'gz',
                        label: '甘孜县'
                    },
                    {
                        value: 'dg',
                        label: '德格'
                    },
                    {
                        value: 'sq',
                        label: '石渠县'
                    },
                    {
                        value: 'by',
                        label: '白玉县'
                    },
                    {
                        value: 'xl',
                        label: '新龙县'
                    },
                ],
                formValidate: {
                    type: '',
                    subtype: '',
                    name: '',
                    title: '',
                    subtitle: '',
                    content: '',
                    height: '',
                    finishtime: '',
                    coverage: '',
                    location: '',
                    address: '',
                    scale:''
                },
                ruleValidate: {
                    type: [
                        { required: true, message: '类型不能为空', trigger: 'blur' }
                    ],
                    subtype: [
                        { required: false, message: '类型不能为空', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '名字不能为空', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                    ],
                    subtitle: [
                        { required: false, message: '标题不能为空', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '简介不能为空', trigger: 'blur' }
                    ],
                    height: [
                        { required: false, message: '不能为空', trigger: 'blur' }
                    ],
                    finishtime: [
                        { required: false, message: '不能为空', trigger: 'blur' }
                    ],
                    coverage: [
                        { required: false, message: '不能为空', trigger: 'blur' }
                    ],
                    location: [
                        { required: false, message: '不能为空', trigger: 'blur' }
                    ],
                    address: [
                        { required: false, message: '不能为空', trigger: 'blur' }
                    ],
                    scale: [
                        { required: false, message: '不能为空', trigger: 'blur' }
                    ],
                },
                case: {
                    type: '',
                    subtitle: '',
                    subtype: '',
                    name: '',
                    title: '',
                    subtitle: '',
                    content: '',
                    height: '',
                    finishtime: '',
                    coverage: '',
                    location: '',
                    address: '',
                    scale:''
                },
                defaultList: [
                    
                ],
                imgName: '',
                visible: false,
                uploadList: [],
                content: ''
            }
        },

        computed: mapGetters({
            caseAddData: 'caseAddData',
        }),

        watch:{
            "caseAddData": function (val) {
                let me = this;
                if(val.data == 1){
                    me.$Message.success('新增成功');
                    me.backTo();
                }else {
                    me.$Message.error('新增失败');
                }
            }
        },

        mounted(){
            this.uploadList = this.$refs.upload.fileList;
        },

        methods: {
            typeSelect (type) {
                let me = this;
                me.formValidate.type = type;
                switch (type) {
                    case 'ganzi':
                        me.isShowSubtype = true;
                        break;
                    case 'chuannei':
                        me.isShowSubtype = false;
                        me.formValidate.subtype = '';
                        break;
                    case 'chuanwai':
                        me.isShowSubtype = false;
                        me.formValidate.subtype = '';
                        break;
                    default:
                        break;
                }

            },
            subtypeSelect (type) {
                let me = this;
                me.formValidate.subtype = type;
            },
            postCase(name) {
                let me = this;
                // 拿到图片做循环 然后插入到case表中, 插入成功后取出url, update file表做关联.
                var arr=new Array();
                me.uploadList.map(it => {
                    arr.push(it.name);
                });
                if(me.uploadList.length == 0){
                    this.$Message.error('请上传简介图片!');
                    return;
                }
                let urls = arr.join(',');
                me.$refs[name].validate((valid) => {
                    if (valid) {

                        me.getUEContent();

                        me.case = {
                            type: me.formValidate.type,
                            subtype: me.formValidate.subtype,
                            name: me.formValidate.name,
                            title: me.formValidate.title,
                            subtitle: me.formValidate.subtitle,
                            content: me.formValidate.content,
                            height: me.formValidate.height,
                            finishtime: me.formValidate.finishtime,
                            coverage: me.formValidate.coverage,
                            location: me.formValidate.location,
                            address: me.formValidate.address,
                            scale: me.formValidate.scale,
                            url: urls,
                            richtext: me.content
                        }
                        me.$store.dispatch('addCase', {reqData: me.case});
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
                        title: '简介图片只允许上传一张, <div>更多图片请在项目详情中添加！</div>'
                    });
                }
                return check;
            },
            getUEContent() {
                let me = this;
                me.content = me.$refs.ue.getUEContent();
            },
        },

        created() {
            let me = this;
        }
    }
</script>

<style lang="less">
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
    
</style>
