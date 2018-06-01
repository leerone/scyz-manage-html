<template>
    <div class="page-bx">
        <div class="btns-bx">
            <Button class='page-btn' type="primary" @click="addAboutUs" v-show="isShowAddBtn">新增</Button>
            <i-button class="page-btn" type="primary" icon="arrow-return-left"  @click="eventFunc('back')" ></i-button>
        </div>
        <component :is="nowComp" @eventFunc="eventFunc"></component>
    </div>
</template>

<script>
    
    import absAdd from "./absAdd.vue";
    import absModify from "./absModify.vue";
    import absList from "./absList.vue";

    export default {
        components: {
            'absAdd': absAdd,
            'absModify': absModify,
            'absList': absList,
        },

        data () {
            return {
                nowComp: 'absList',
                isShowAddBtn: true,
                absmodifydata: {

                }
            }
        },

        computed: {
          
        },

        mounted(){

        },

        methods: {
            addAboutUs() {
                let me = this;
                me.nowComp = 'absAdd'
                me.isShowAddBtn = false;
            },
            eventFunc(type, obj, param) {
                let me = this;
                switch (type) {
                    case 'back':
                        me.nowComp = "absList";
                        me.isShowAddBtn = true;
                        break;
                    case 'modify':
                        me.isShowAddBtn = false;
                        me.absmodifydata = obj.row;
                        me.$store.dispatch('propAbsModifyData', {reqData: me.absmodifydata});
                        me.nowComp = "absModify";
                        break;
                    default:
                        break;
                }
            },
        },

        created() {
            let me = this;
        }
    }
</script>

<style lang="less">
    .editor-container {
        padding-top: 0px;
    }
</style>