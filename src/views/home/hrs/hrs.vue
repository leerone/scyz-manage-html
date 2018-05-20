<template>

    <div class="page-bx">
        <Button type="primary" class='page-btn' @click="addhrs" v-show="isShowAddBtn">新增招聘信息</Button>
        <component :is="nowComp" @eventFunc="eventFunc"></component>
    </div>
</template>

<script>
    
    import hrsadd from "./hrsadd.vue";
    import hrsmodify from "./hrsmodify.vue";
    import hrslist from "./hrslist.vue";

    export default {

        components: {
            'hrsadd': hrsadd,
            'hrsmodify': hrsmodify,
            'hrslist': hrslist,
        },

        data () {
            return {
                nowComp: 'hrslist',
                isShowAddBtn: true,
                hrsmodifydata: {

                }
            }
        },
        mounted(){
        },
        methods: {
            addhrs() {
                let me = this;
                me.nowComp = 'hrsadd'
                me.isShowAddBtn = false;
            },
            eventFunc(type, obj, param) {
                let me = this;
                switch (type) {
                    case 'back':
                        me.nowComp = "hrslist";
                        me.isShowAddBtn = true;
                        break;
                    case 'modify':
                        me.isShowAddBtn = false;
                        me.hrsmodifydata = obj.row;
                        me.$store.dispatch('propHrsModifyData', {reqData: me.hrsmodifydata});
                        me.nowComp = "hrsmodify";
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
    .page-bx {
        position: relative;
        >.page-btn {
            position: absolute;
            top: 12px;
            right: 50px;
        }
    }
</style>
