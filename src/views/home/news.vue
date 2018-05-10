<template>

    <div >
        新闻动态
       <Select v-model="type" size="large" style="width:100px" @on-select="typeSelect">
            <Option v-for="item in list" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Input v-model="type" size="large" placeholder="标题"></Input>
        <!-- <Input v-model="type" type="textarea" placeholder="富文本"></Input> -->
        <quill-editor v-model="infoForm.a_content"
                        ref="myQuillEditor"
                        class="editer"
                        :options="editorOption" @ready="onEditorReady($event)">
        </quill-editor>
    </div>
</template>

<script>
    import { quillEditor } from 'vue-quill-editor' //调用编辑器
    export default {
        components: {
            "quill-editor": quillEditor
        },

        data () {
            return {
                infoForm: {
                  a_title: '',
                  a_source: '',
                  a_content:'',
                  editorOption: {}
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
          editor() {
            return this.$refs.myQuillEditor.quill
          }
        },

        mounted(){

        },

        methods: {
           typeSelect (type){
                console.info(type);
           },
           onEditorReady(editor) {

           }
        },

        created() {
            let me = this;
        }
    }
</script>

<style lang="less">
 
</style>
