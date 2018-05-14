<template>
    <div class="news-add-box">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="类型" prop="type">
                <Select v-model="formValidate.type" size="large" style="width:200px" class="type-select" @on-select="typeSelect">
                    <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="项目名称" prop="name">
                <Input v-model="formValidate.name" size="large" placeholder="职位"></Input>
            </FormItem>
            <FormItem label="项目简介" prop="content">
                <Input v-model="formValidate.content" size="large" placeholder="简介"></Input>
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
            <FormItem label="地址" prop="address">
                <Input v-model="formValidate.address" size="large" placeholder="地址"></Input>
            </FormItem>

        </Form>
        <Button type="primary" @click="postCase('formValidate')">提交</Button>
        <Button type="primary" @click="backTo()">返回</Button>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        components: {
        },

        data () {
            return {
                list: [
                    {
                        value: 'ganzi',
                        label: '甘孜'
                    },
                    {
                        value: 'chuanwai',
                        label: '川内'
                    },
                    {
                        value: 'chuannei',
                        label: '川外'
                    },
                ],
                formValidate: {
                    type: '',
                    name: '',
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
                    name: [
                        { required: true, message: '名字不能为空', trigger: 'blur' }
                    ],
                    content: [
                        { required: true, message: '简介不能为空', trigger: 'blur' }
                    ],
                    height: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    finishtime: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    coverage: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    location: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                },
                case: {
                    type: '',
                    name: '',
                    content: '',
                    height: '',
                    finishtime: '',
                    coverage: '',
                    location: '',
                    address: '',
                    scale:''
                },
                modifyCaseData: '',
                casemodifydataid: ''

            }
        },

        computed: mapGetters({
            caseAddData: 'caseAddData',
            caseUpdateData: 'caseUpdateData'
            
        }),

        watch:{
            "caseAddData": function (val) {
                let me = this;
                // alert(val);
                if(val.data == 1){
                    me.$Message.success('新增成功');
                    me.backTo();
                }else {
                    me.$Message.error('新增失败');
                }
            },
            "caseUpdateData": function (val) {
                let me = this;
                if(val.data == 1){
                    me.$Message.success('更新成功');
                    me.backTo();
                }else {
                    me.$Message.error('更新失败');
                }
            },
        },

        mounted(){

        },

        methods: {
            typeSelect (type) {
                console.info(type);
            },
            postCase(name) {
                let me = this;
                me.$refs[name].validate((valid) => {
                    if (valid) {
                        me.case = {
                            type: me.formValidate.type,
                            name: me.formValidate.name,
                            content: me.formValidate.content,
                            height: me.formValidate.height,
                            finishtime: me.formValidate.finishtime,
                            coverage: me.formValidate.coverage,
                            location: me.formValidate.location,
                            address: me.formValidate.address,
                            scale: me.formValidate.scale
                        }
                        me.$store.dispatch('updateCase', {reqData: me.case});
                    } else {
                        this.$Message.error('请填写完整信息!');
                    }
                })
            },
            backTo() {
                let me = this;
                me.$emit("eventFunc", 'back');
            }
        },

        created() {
            let me = this;
            me.modifyCaseData = me.$store.state.cases.modifyCaseData;
            me.formValidate = me.modifyCaseData;
            me.casemodifydataid = me.modifyCaseData.id;
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
