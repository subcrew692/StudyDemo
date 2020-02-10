<template>
<div v-show="modalInfomation.show">
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-content" style="width:30%;">
                    <div class="modal-header">
                    <button type="button" class="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h2 class="modal-title" style="font-family:consolas">Infomation</h2>
                    </div>
                    <div class="modal-body">
                        {{modalInfomation.message}}
                    </div>
                    <div class="modal-footer" v-if="modalInfomation.type === 'delete'">
                        <button type="button" class="btn btn-danger" @click="confirmDelete">刪除</button>
                        <button type="button" class="btn btn-default" @click="cancelAction">取消</button>
                    </div>
                    <div class="modal-footer" v-else-if="modalInfomation.type === 'add'">
                        <button type="button" class="btn btn-primary" @click="confirmAdd">確認</button>
                        <button type="button" class="btn btn-default" @click="cancelAction">取消</button>
                    </div>
                    <div class="modal-footer" v-else>
                        <button type="button" class="btn btn-primary" @click="cancelAction">確認</button>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
export default {
    name: 'TcsModalMessage',
    data () {
        return {

        }
    },
    props:['modalInfomation'],
    methods: {
        cancelAction() {
            const returnObj = this.modalInfomation;
            returnObj.show = true; // 不關閉，由父元件來關閉
            returnObj.message = '';
            returnObj.type = '';
            returnObj.response = false;
            this.$emit('modalResponse', returnObj);
        },
        confirmAdd() {
            const returnObj = this.modalInfomation;
            returnObj.show = true; // 不關閉，由父元件來關閉
            returnObj.message = '';
            returnObj.type = 'add';
            returnObj.response = true;
            this.$emit('modalResponse', returnObj);
        },
        confirmDelete() {
            const returnObj = this.modalInfomation;
            returnObj.show = true; // 不關閉，由父元件來關閉
            returnObj.message = '';
            returnObj.type = 'delete';
            returnObj.response = true;
            this.$emit('modalResponse', returnObj);
        }
    }
}
</script>