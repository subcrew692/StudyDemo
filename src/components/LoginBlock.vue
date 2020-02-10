<template>
    <div v-show="isLogin">
        <transition name="modal">
          <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-content" style="width:30%;">
                  <div class="modal-header">
                    <h2 class="modal-title" style="font-family:consolas">Log in</h2>
                  </div>
                  <div class="modal-body">
                    <input type="tel" class="form-control" v-model="mobile" placeholder="請輸入電話號碼" v-on:keyup.13="login()" v-focus/>
                  </div>
                  <div class="modal-footer">
                    <router-link :to="{ name: 'index' }" class="btn btn-default btn-sm">回上層 <i class="fa fa-reply"></i></router-link>
                    <button class="btn btn-primary btn-sm" @click="login" :style="{'display': mobile==='' ? 'none' : 'inline-block'}">
                    登入 <i class="fa fa-share-square"></i></button>
                  </div>
                </div>
            </div>
          </div>
        </transition>
    </div>
</template>

<script>
export default {
    name: 'TcsLoginBlock',
    data () {
        return {
            mobile: ''
        }
    },
    props: ['isLogin'],
    methods: {
        login() {
          this.$emit('login', this.mobile);
          this.mobile = '';
        }
    },
    directives: {
        focus: {
            update: function (el) {
                el.focus();
            }
        }
    }
}
</script>