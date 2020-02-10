<template>
    <nav class="navbar navbar-inverse">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link :to="{ name: 'index' }" class="navbar-brand">T.C.S Hair</router-link>
            </div>
            <ul class="nav navbar-nav navbar-right">
                <li><span class="navbar-brand">{{today | dateFormat}}</span></li>
                <li><router-link :to="{ name: 'CustomerInfo' }" class="navbar-brand"><i class="fa fa-edit"></i> 顧客消費</router-link></li>
                <li><router-link :to="{ name: 'AssistantSalary' }" class="navbar-brand"><i class="fa fa-money"></i> 員工薪資</router-link></li>
            </ul>
        </div>
    </nav>
</template>
<script>
// console.log(location.hash);
import moment from 'moment'


export default {
    name: 'TcsTheHeader',
    data() {
        return {
            today: new Date(),
            timer: new Date()
        }
    },
    mounted() {
        const vm = this;
        this.timer = setInterval(() => {
            vm.today = new Date();
        }, 1000);
    },
    filters: {
        dateFormat: function(el) {
            return moment(el).format("HH:mm:ss");
        }
    }
}
</script>