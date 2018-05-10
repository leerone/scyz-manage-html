<template>

    <div >
        新闻动态
       <Select v-model="type" size="large" style="width:100px" @on-select="typeSelect">
            <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <button @click="getUEContent()">获取内容</button>
        <Input v-model="type" size="large" placeholder="标题"></Input>
        <!-- <Input v-model="type" type="textarea" placeholder="富文本"></Input> -->
        <div class="editor-container">
            <UE :id=curEditor :defaultMsg=defaultMsg :config=config ref="ue"></UE>
        </div>
    </div>
</template>

<script>
    import UE from '../../components/ue/ue.vue'; //引入编辑器
    export default {
        components: {
            UE
        },

        data () {
            return {
                curEditor: 'ue',
                defaultMsg: '这里是UE测试',
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
                type: '',
            }
        },

        computed: {
          
        },

        mounted(){

        },

        methods: {
           typeSelect (type){
                console.info(type);
           },
           getUEContent() {
                let content = this.$refs.ue.getUEContent();
                alert(content);
                console.log(content)
          }
        },

        created() {
            let me = this;
        }
    }
</script>

<style lang="less">
    .editor-container {
        padding-top: 20px;
    }
</style>
