<template>
    <div class="note-list">
        <ul>
            <li v-for="item in noteList" 
            :key="item.id" 
            @click="goNoteDetail(item.id)">
                <div class="img">
                    <img :src="item.head_img" alt="">
                </div>
                <div class="time">{{item.m_time}}</div>
                <div class="title">{{item.title}}</div>
            </li>
        </ul>
    </div>
</template>

<script setup>
import axios from '../api'
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const route = useRoute()
const noteList = ref([])
const router = useRouter()
async function getData(){
    //向后端请求某分类下的日记列表数据
    const res = await axios.get('/findNoteListByType', {
        params: {
            title: route.query.title
        }   
    })
    //console.log(res);
    noteList.value = res.data
}
getData()

const goNoteDetail = (id) => {
    router.push({path: '/noteDetail', query: { id: id }})
}



// await axios.get('/findNoteListByType', {
//     params: {
//         title: route.query.title
//     }   
// })
// .then(res => {
//     console.log(res);
// })



</script>

<style lang="less" scoped>
.note-list{
    width: 100%;
    padding: 1rem 0.667rem 0;
    box-sizing: border-box;

    ul{
        //网格布局，等比两列
        display: grid;
        grid-template-columns: 1fr 1fr;
        //列距，行距
        grid-column-gap: 40px;
        grid-row-gap: 20px;

        li{
            field-sizing: 0.37rem;
            img{
                width: 100%;
                height: 4rem;
                border-radius: 0.27rem;
            }
      
            .title{
                margin-top:5px;
            }
        }
    }
}
</style>