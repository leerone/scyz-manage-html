<template>
    <div class="news-add-box">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
            <FormItem label="类型" prop="type">
                <Select v-model="formValidate.type" size="large" style="width:200px" class="type-select" @on-select="typeSelect">
                    <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            
            <FormItem label="标题" prop="title">
                <Input v-model="formValidate.title" size="large" placeholder="标题"></Input>
            </FormItem>

            <FormItem label="文章来源" prop="reference">
                <Input v-model="formValidate.reference" placeholder="文章来源"></Input>
            </FormItem>

            <FormItem label="时间" prop="time">
                <DatePicker type="datetime" style="width: 200px" format="yyyy-MM-dd  HH:mm:ss" v-model="formValidate.time" @on-change="timechage"></DatePicker>
            </FormItem>

            <FormItem label="详情" prop="newDetail">
                <div class="editor-container">
                    <UE :id=curEditor :defaultMsg=defaultMsg ref="ue"></UE>
                </div>
            </FormItem>
        </Form>
        
        <div class="page-btm-btn">
            <Button type="primary" @click="postAboutus('formValidate')">发布</Button>
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
                formValidate: {
                    type: '',
                    title: '',
                    desc: '',
                    time: '',
                    reference: ''
                },
                ruleValidate: {
                    type: [
                        { required: true, message: '类型不能为空', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '标题不能为空', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '详情不能为空', trigger: 'blur' }
                    ],
                },
                content: '',
                
                abs: {
                    content: '',
                    title: '',
                    time: '',
                    type: '',
                    reference: ''
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
            absAddData: 'absAddData',
            
        }),

        watch:{
            "absAddData": function (val) {
                let me = this;
                if (val.data == 1) {
                    me.$Message.success('新增成功');
                    me.backTo();
                } else {
                    me.$Message.error('新增失败');
                }
            }
        },

        mounted(){
            
        },

        methods: {
            timechage() {
                let me = this;
                me.formValidate.time = me.formatDate(new Date(me.formValidate.time),'yyyy-MM-dd hh:mm:ss');
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
            postAboutus(name) {
                let me = this;
                me.$refs[name].validate((valid) => {
                    if (valid) {
                        me.getUEContent();
                        me.abs = {
                            content: me.content,
                            time: me.formValidate.time,
                            type: me.formValidate.type,
                            title: me.formValidate.title,
                            reference: me.formValidate.reference
                        }
                        me.$store.dispatch('addAbs', {reqData: me.abs});
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
