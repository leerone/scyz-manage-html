<template>
    <div class="news-add-box">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="类型" prop="type">
                <Select v-model="formValidate.type" size="large" style="width:200px" class="type-select" @on-select="typeSelect">
                    <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="职位" prop="name">
                <Input v-model="formValidate.name" size="large" placeholder="职位"></Input>
            </FormItem>
            <FormItem label="简介" prop="desc">
                <Input v-model="formValidate.description" size="large" placeholder="简介"></Input>
            </FormItem>
            <FormItem label="工作职责" prop="desc1">
                <Input v-model="formValidate.desc1" size="large" placeholder="工作职责"></Input>
            </FormItem>
            <FormItem label="职责要求" prop="desc2">
                <Input v-model="formValidate.desc2" size="large" placeholder="职责要求"></Input>
            </FormItem>
            <FormItem label="人数" prop="number">
                <Input v-model="formValidate.number" size="large" placeholder="人数"></Input>
            </FormItem>
            <FormItem label="地址" prop="address">
                <Input v-model="formValidate.address" size="large" placeholder="地址"></Input>
            </FormItem>

        </Form>
        <Button type="primary" @click="postHrs('formValidate')">提交</Button>
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
                formValidate: {
                    type: '',
                    name: '',
                    description: '',
                    desc1: '',
                    desc2: '',
                    number: '',
                    address: ''
                },
                ruleValidate: {
                    type: [
                        { required: true, message: '类型不能为空', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '名字不能为空', trigger: 'blur' }
                    ],
                    description: [
                        { required: true, message: '简介不能为空', trigger: 'blur' }
                    ],
                    desc1: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    desc2: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    number: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '不能为空', trigger: 'blur' }
                    ],
                },
                hrs: {
                    type: '',
                    title: '',
                    description: '',
                    desc1: '',
                    desc2: '',
                    number: '',
                    address: ''
                },
                modifyHrsData: '',
                hrsmodifydataid: ''

            }
        },

        computed: mapGetters({
            hrsAddData: 'hrsAddData',
            hrsUpdateData: 'hrsUpdateData'
            
        }),

        watch:{
            "hrsAddData": function (val) {
                let me = this;
                // alert(val);
                if(val.data == 1){
                    me.$Message.success('新增成功');
                    me.backTo();
                }else {
                    me.$Message.error('新增失败');
                }
            },
            "hrsUpdateData": function (val) {
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
            postHrs(name) {
                let me = this;
                me.$refs[name].validate((valid) => {
                    if (valid) {
                        me.hrs = {
                            id: me.hrsmodifydataid,
                            type: me.formValidate.type,
                            name: me.formValidate.name,
                            description: me.formValidate.description,
                            desc1: me.formValidate.desc1,
                            desc2: me.formValidate.desc2,
                            address: me.formValidate.address,
                            number: me.formValidate.number
                        }
                        me.$store.dispatch('updateHrs', {reqData: me.hrs});
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
            me.modifyHrsData = me.$store.state.hrs.modifyHrsData;
            console.info(me.modifyHrsData);
            me.formValidate = me.modifyHrsData;
            me.hrsmodifydataid = me.modifyHrsData.id;
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
