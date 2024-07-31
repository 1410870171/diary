<template>
        <div class="note-class-wrapper">
            <div class="note-class" :class="{'hide': isShowMenu}">
                <header >
                    <div @click="isShowMenu = true">
                        <van-icon name="wap-nav" />
                    </div>
                    <div>
                        <van-icon name="edit" @click="goNotePublish"/>
                        <van-icon name="like-o" />
                        <van-icon name="search" />
                    </div>
                </header>
                <section>
                    <div class="note-item" 
                    v-for="(item, index) in noteClassList" 
                    :key="index"
                    :style="{backgroundColor: item.bgColor}"
                    @click="goNoteList(item.title)">
                        <span class="title" >{{item.title}}</span>
                    </div>
                </section>
            </div>
            <!-- menu -->
            <!-- 子向父通讯，3.父绑定事件 -->
             <Menu class="menu" @hidden="handle" :class="{ 'show': isShowMenu }"/>
        </div>
</template>

<script setup>
import Menu from '@/components/Menu.vue'
import { useRouter } from 'vue-router';
import { ref } from 'vue'
const router = useRouter()

const noteClassList = [
  { bgColor: '#f0aa84', title: '每天学习25h' },
  { bgColor: '#dcf189', title: '吃吃吃' },
  { bgColor: '#e0c2f1', title: '刷抖音' },
  { bgColor: '#c2ebf1', title: '写文章' },
  { bgColor: '#949c9d', title: '画画' }
]
const isShowMenu = ref(false)
const goNoteList = (title) => {
  router.push({path: '/noteList', query: { title: title }})
}

// 子向父通讯
//4.父拿到传的变量
const handle = (e) => {
  isShowMenu.value = e
}

const goNotePublish = () => {
  router.push({path: '/notePublish'})
}
</script>

<style lang="less" scoped>
.note-class-wrapper {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;

    .note-class{
        position: absolute;
        width: 100%;
        height: 100%;
        padding: 0 0.5866rem;
        box-sizing: border-box;
        overflow-y: scroll;
        transform: translateX(0%);
        transition: transform 0.3s;
        &.hide{
            transform: translateX(100%);
        }

        header{
            display: flex;
            justify-content: space-between;
            height: 1.2rem;
            //y轴居中
            align-items: center;
            margin: 10px 0;
            
            .van-icon{
                font-size: 24px;
                margin: 0, 5px
            }
        }

        section{
            width: 100%;

            .note-item{
                height: 3.2rem;
                border-radius: 0.3rem;
                margin-bottom: 0.64rem;
                box-shadow: 0 0 10px 1.5px #c3c2c2;
                overflow: hidden;

                .title{
                    display: block;
                    margin-top: 0.5333rem;
                    text-align: center;
                    font-size: 0.5333rem;
                    color: #fff;
                }
            }
        }

        
    }
    .menu{
            width: 100%;
            height: 100%;
            position: absolute;
            transform: translateX(-100%);
            transition: all 0.3s;
            &.show{
                transform: translateX(0%);
            }
        }
}
</style>