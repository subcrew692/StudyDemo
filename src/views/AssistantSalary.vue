<template>
<div class="container">
    <TcsAssistantSalaryTop @getDateRange="onGetDateRange" />
    <TcsPaymentSalary :employeeList="empObjList" :dateRange="dateObject" :assistantList="allSalaryData"/>
</div>
    
</template>

<script>
import TcsAssistantSalaryTop from '@/components/AssistantSalaryTop'
import TcsPaymentSalary from '@/components/PaymentSalary'

const bossRef = firebase.database().ref('/bossPassword/');
const empRef = firebase.database().ref('/employees');
const salaryRef = firebase.database().ref('/salary/');
Date.prototype.yyyymmddBySlash = function() {
	var yyyy = this.getFullYear();
	var mm = this.getMonth() < 9 ? "0" + (this.getMonth() + 1) : (this.getMonth() + 1); // getMonth() is zero-based
	var dd  = this.getDate() < 10 ? "0" + this.getDate() : this.getDate();
	return "".concat(yyyy).concat('/').concat(mm).concat('/').concat(dd);
};
Date.prototype.addDays = function(days) {
    this.setDate(this.getDate() + days);
    return this;
};

export default {
    name: 'TcsAssistantSalary',
    data () {
        return {
            empObjList: [],
            allSalaryData: [],
            dateObject: {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1
            }
        }
    },
    components: {
        TcsAssistantSalaryTop,
        TcsPaymentSalary
    },
    methods: {
        onGetDateRange(dateRange) {
            this.dateObject = dateRange;
        }
    },
    mounted() {
        const vm = this;
        
        empRef.on('value', function(snapshot) {
            const val = snapshot.val();
            const empData = val
                ? Object.keys(val).map(key => ({ id: key, ...val[key] }))
                : null
            // 只帶出助理
            // vm.empObjList = empData.filter(emp => emp.empType === '2');
            vm.empObjList = empData;
        });

        salaryRef.on('value', function(snapshot) {
            const val = snapshot.val();
            const salaryData = val
                ? Object.keys(val).map(key => ({ id: key, ...val[key] }))
                : null;
            vm.allSalaryData = salaryData;
        });
    }
}
</script>