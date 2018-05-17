<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.username" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {

	computed: mapGetters({
        loginData: 'loginData',
    }),

    data () {
        return {
            form: {
                username: 'admin',
                password: '123456'
            },
            rules: {
                username: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    watch: {
    	"loginData": function (val) {
            let me = this;
            if(val.data){
            	localStorage.setItem('username', val.data.username);
            	me.$router.push({
	                path: '/index'
	            });
            }else {
            	me.$Message.success('账户密码输入错误');
            	me.password = '';
            	
            }
        }
    },
    methods: {
        handleSubmit () {
        	let me = this;
            me.$refs.loginForm.validate((valid) => {
                if (valid) {
                    me.$store.dispatch('login', {reqData: me.form});
                }
            });
        },
    }
};
</script>

<style>
.login{
    width: 100%;
    height: 100%;
    background-image: url('../images/bg.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    &-con{
        position: absolute;
        right: 160px;
        top: 50%;
        transform: translateY(-60%);
        width: 300px;
        &-header{
            font-size: 16px;
            font-weight: 300;
            text-align: center;
            padding: 30px 0;
        }
        .form-con{
            padding: 10px 0 0;
        }
        .login-tip{
            font-size: 10px;
            text-align: center;
            color: #c3c3c3;
        }
    }
}
</style>
