<template>

    <div >
        <Button type="primary" @click="addcase" v-show="isShowAddBtn">新增项目案例</Button>
        <component :is="nowComp" @eventFunc="eventFunc"></component>
    </div>
</template>

<script>
    
    import caseadd from "./caseadd.vue";
    import casemodify from "./casemodify.vue";
    import caselist from "./caselist.vue";

    export default {

        components: {
            'caseadd': caseadd,
            'casemodify': casemodify,
            'caselist': caselist,
        },

        data () {
            return {
                nowComp: 'caselist',
                isShowAddBtn: true,
                casemodifydata: {

                },
            }
        },
        mounted(){
        },
        methods: {
            addcase() {
                let me = this;
                me.nowComp = 'caseadd'
                me.isShowAddBtn = false;
            },
            eventFunc(type, obj, param) {
                let me = this;
                switch (type) {
                    case 'back':
                        me.nowComp = "caselist";
                        me.isShowAddBtn = true;
                        break;
                    case 'modify':
                        me.isShowAddBtn = false;
                        me.casemodifydata = obj.row;
                        me.$store.dispatch('propCaseModifyData', {reqData: me.casemodifydata});
                        me.nowComp = "casemodify";
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
 
</style>
