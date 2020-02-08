<template>
<div class="panel" style="text-align:left;">
    <div class="panel-heading">
        <div class="row">
            <div class="col-md-3">
                <i class="far fa-calendar-alt"></i>日期
                <select v-model="designYear" @change="changeDay()" class="form-control selectionAuto"><option v-for="year in allYears" :key="year">{{year}}</option></select>/
                <select v-model="designMonth" @change="changeDay()" class="form-control selectionAuto"><option v-for="month in allMonths" :key="month">{{month}}</option></select>/
                <select v-model="designDate" class="form-control selectionAuto"><option v-for="date in allDates" :key="date">{{date}}</option></select>
            </div>

            <div class="col-md-3">
                <i class="fa fa-dollar"></i>總金額:
            </div>

            <div class="col-md-3">
                <i class="fa fa-scissors"></i>設計師
                <select v-model="workDesignerName" class="form-control selectionAuto">
                <option value="none">請選擇</option>
                <option v-for="emp in employeeList" :key="emp.id" :value="emp.empName" v-show="emp.empType == '1'">{{emp.empName}}</option>
                </select>
            </div>

            <div class="col-md-3">
                <i class="fa fa-book"></i>助理
                <select v-model="workAssistantName" class="form-control selectionAuto">
                <option value="none">請選擇</option>
                <option v-for="emp in employeeList" :key="emp.id" :value="emp.empName" v-show="emp.empType == '2'">{{emp.empName}}</option>
                </select>
            </div>
        </div>
    </div>
    <div class="panel-heading">
        <div class="row">
            <TcsDesignHairStyle :hairStyleInput="hairStyle.cut" />
            <TcsDesignHairStyle :hairStyleInput="hairStyle.dye" />
            <TcsDesignHairStyle :hairStyleInput="hairStyle.burn" />
            <TcsDesignHairStyle :hairStyleInput="hairStyle.wash" />
        </div>
    </div>
</div>
</template>

<script>
import TcsDesignHairStyle from '@/components/DesignHairStyle'

export default {
    name: 'TcsDesignInfomation',
    data() {
        return {
            designYear: new Date().getFullYear(), // 預設年
            designMonth: new Date().getMonth()+1, // 預設月
            designDate: new Date().getDate(), // 預設日
            allYears: [],
            allMonths: [1,2,3,4,5,6,7,8,9,10,11,12],
            monthDates: [31,28,31,30,31,30,31,31,30,31,30,31],
            allDates: [],
            workDesignerName: 'none',
            workAssistantName: 'none',
            hairStyle: {
                cut: { name: '剪', value: ''},
                dye: { name: '染', value: ''},
                burn: { name: '燙', value: ''},
                wash: { name: '洗', value: ''}
            }
        }
    },
    components: { TcsDesignHairStyle },
    props: ['employeeList'],
    methods: {
        /** 日期調整 */
        changeDay() {
            const vm = this;
            const curYear = vm.designYear;
            const curMonth = vm.designMonth;
            if(curMonth === '2') {
                vm.monthDates[1] = vm.checkLeapYear(curYear);
            }
            // 先重置天數
            vm.allDates = [];
            for(var i = 1; i <= vm.monthDates[curMonth-1]; i++) {
                vm.allDates.push(i);
            }
        },
        /** 檢查閏月 */
        checkLeapYear(year) {
            return (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) ? 29 : 28;
        },
    },
    created() {
        // init year, month, date
        const now = new Date();
        const curYear = now.getFullYear();
        for(var i = 2015; i <= now.getFullYear(); i++) {
            this.allYears.unshift(i);
        }

        const curMonth = this.designMonth; // 取得目前月份
        var dates = this.monthDates[curMonth - 1]; // 取得該月天數
        dates = curMonth === 2 ? this.checkLeapYear(curYear) : dates; // 若2月，檢查閏月

        for(var i = 1; i<= dates; i++) {
            this.allDates.push(i);
        }
    }
}
</script>
