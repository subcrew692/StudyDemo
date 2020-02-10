<template>
    <!-- change member area -->
      <div class="col-xs-12">
        <table width="100%">
          <tr>
            <td style="width:30%;text-align:left" v-if="bossLogin">老闆您好！</td>
            <td style="width:30%;text-align:left" v-else>客人：{{user}}</td>
            <td style="width:40%;text-align:center"><img src="../assets/TCS_logo.jpg" style="width:100px;height:100px;" /></td>
            <td style="width:30%;text-align:right"><button class="btn btn-default btn-sm" @click="changeMember()">切換會員</button></td>
          </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'TcsChangeMember',
    data () {
      return {

      }
    },
    props: [ 'user', 'bossLogin' ],
    methods: {
      changeMember() {
        this.$emit('changeUser');
      }
    }
}
</script>