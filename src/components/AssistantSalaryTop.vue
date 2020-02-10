<template>
    <!-- 檢視日期 -->
    <div class="panel">
        <table width="100%">
            <tr>
                <td style="width:50%;text-align:left">
                    請選擇欲檢視的日期：
                    西元<select v-model="selectedYear" @change="onChange" class="form-control selectionAuto"><option v-for="year in allYears" :value="year" :key="year">{{year}}</option></select>年
                    <select v-model="selectedMonth" @change="onChange" class="form-control selectionAuto"><option v-for="month in allMonths" :value="month" :key="month">{{month}}</option></select>月
                </td>
                <td style="width:50%;text-align:right">
                    <h3><router-link :to="{ name: 'index' }">回首頁 <i class="fa fa-home"></i></router-link></h3>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'TcsAssistantSalaryTop',
    data () {
        return {
            selectedYear: new Date().getFullYear(),
            selectedMonth: new Date().getMonth() + 1,
            allYears: [],
            allMonths: [1,2,3,4,5,6,7,8,9,10,11,12]
        }
    },
    methods: {
        onChange() {
            const date = {
                year: this.selectedYear,
                month: this.selectedMonth
            }
            this.$emit('getDateRange', date)
        }
    },
    created() {
        // init year, month, date
        const now = new Date();
        const curYear = now.getFullYear();
        for(var i = 2015; i <= now.getFullYear(); i++) {
            this.allYears.unshift(i);
        }
    }
}
</script>