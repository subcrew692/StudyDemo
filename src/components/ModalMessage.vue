<template>
<div v-show="showModal">
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-content" style="width:30%;">
                    <div class="modal-header">
                    <button type="button" class="close" @click="resetModal()">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <h2 class="modal-title" style="font-family:consolas">Infomation</h2>
                    </div>
                    <div class="modal-body">
                    {{infoMsg}}
                    </div>
                    <div class="modal-footer">
                        sdf
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
            showModal: false
        }
    }
}
</script>