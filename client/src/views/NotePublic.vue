<template>
    <div class="note-publish">
        <div class="editor">
            <QuillEditor 
            theme="snow" 
            placeholder="输入日记内容"
            v-model:content="state.content"
            contentType="html" />
        </div>
        <div class="note-wrap">
            <div class="note-cell">
                <van-field v-model="state.title" label="标题" placeholder="请输入标题" />
            </div>
            <div class="note-cell">
                <van-field  label="上传图片">
                    <template #input>
                        <van-uploader 
                        :after-read="afterRead" 
                        v-model="state.img"
                        maxCount="1" />
                    </template>
                </van-field>
                
            </div>
            <div class="note-cell">
                <div class="sort" @click="state.sortShow = true">
                    <span>选择分类</span>
                    <span>{{state.note_type}}<van-icon name="arrow" /></span>
                </div>
                <van-action-sheet 
                v-model:show="state.sortShow" 
                :actions="actions" 
                @select="onSelect" />
            </div>
        </div>
        <div class="btn">
            <van-button  type="default" block @click="notePublish">保存日记</van-button>
        </div>
    </div>
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { reactive } from 'vue';
import axios from '../api';
import { useRouter } from 'vue-router';

const router = useRouter()
const state = reactive({
    title: '',
    content: '',
    img: [],
    sortShow:false,
    note_type: '每天学习25h'
})

//分类数组
const actions = [
      { name: '每天学习25h' },
      { name: '吃吃吃' },
      { name: '刷抖音' },
      { name: '写文章' },
      { name: '画画' }
    ];

//图片显示
const afterRead = () => {
    console.log('拿到图片了', state.img);
}

//笔记分类选择
const onSelect = (item) => {
    state.sortShow = false;
    state.note_type = item.name;
    console.log(item);
}

//后端接口
const notePublish = () => [
    axios.post('/note-publish',{
        title:state.title,
        note_type:state.note_type,
        head_img:state.img.length ? state.img[0].content : '',
        note_content: state.content,
        nickname: JSON.parse(localStorage.getItem('userInfo')).nickname,
        user_id: JSON.parse(localStorage.getItem('userInfo')).id
    }).then(res => {
        router.push({
            path: '/noteList'
        })
    })
]
</script>

<style lang="less" scoped>
.note-publish {
    min-height: 100vh;

    :deep(.ql-container) {
        height: 200px;
    }

    .note-cell {
        border-bottom: 1px solid #e9ecf1;

        .sort {
            display: flex;
            justify-content: space-between;
            line-height: 3;
            padding: 10px 16px;
            font-size: 14px;
            color: #323233;
        }
    }

    .btn{
        width: 80%;
        margin: 0 auto;
        margin-top: 2rem;
    }
}
</style>