<template>
    <div class="panel panel-default">
        <div class="panel-heading">
            <table width="100%">
                <tr>
                    <td style="width:50%;text-align:left;">員工薪資列表</td>
                    <td style="width:50%;text-align:right;">日期區間: {{salaryAmountDate}}</td>
                </tr>
            </table>
        </div>

        <div class="panel-body">
            <!-- Nav tabs -->
            <ul class="nav nav-tabs">
                <li class="" v-for="emp in employeeList" :key="emp.id">
                <a :href="'#'+emp.empName" data-toggle="tab" aria-expanded="false">{{emp.empName}}</a></li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
                <div v-for="emp in employeeList" class="tab-pane fade" :id="emp.empName" :key="emp.id">
                    <!-- 助理月薪 -->
                    <div v-for="per in astEveryMonthSalary" style="text-align:right;">
                        <h3 v-if="emp.empName === per.name">{{emp.empName}}薪水{{dateRange.month}}月份：{{per.totalSalary}}</h3>
                    </div>
                    <!-- 設計師月付 -->
                    <div v-for="per in desEveryMonthSalary" style="text-align:right;">
                        <h3 v-if="emp.empName === per.name">{{emp.empName}}&nbsp;&nbsp;{{dateRange.month}}月份需支付：{{per.designerPay}}</h3>
                    </div>
                    <table width="100%" class="table table-striped table-bordered table-hover dataTable no-footer dtr-inline" id="dataTables-example" role="grid" aria-describedby="dataTables-example_info" style="width: 100%;">
                        <thead>
                            <tr role="row">
                            <th class="sorting_asc" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" style="width: 205px;" 
                            aria-label="Rendering engine: activate to sort column descending" aria-sort="ascending">日期</th>

                            <th class="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" 
                            aria-label="Browser: activate to sort column ascending" style="width: 248px;">助理</th>

                            <th class="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" 
                            aria-label="Platform(s): activate to sort column ascending" style="width: 227px;">內容</th>
                            
                            <th class="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" 
                            aria-label="Engine version: activate to sort column ascending" style="width: 179px;">金額</th>
                            
                            <th class="sorting" tabindex="0" aria-controls="dataTables-example" rowspan="1" colspan="1" 
                            aria-label="CSS grade: activate to sort column ascending" style="width: 135px;">由誰給付</th></tr>
                        </thead>
                        <tbody>
                        <!-- 設計師內容 -->
                        <tr v-for="(salary, index) in arrangedDBData" v-if="salary.designer === emp.empName"
                        v-bind:class="{'gradeA odd': (index + 1) % 2 === 0, 'gradeA even': (index + 1) % 2 !== 0}">
                            <td class="center">{{salary.date}}</td>
                            <td class="center">{{salary.assistant}}</td>
                            <td class="center">{{salary.detail}}</td>
                            <td class="center">{{salary.totalMoney}}</td>
                            <td class="center">{{salary.designer}}</td>
                        </tr>
                        <!-- 助理內容 -->
                        <tr v-for="(salary, index) in arrangedDBData" v-if="salary.assistant === emp.empName"
                        v-bind:class="{'gradeA odd': (index + 1) % 2 === 0, 'gradeA even': (index + 1) % 2 !== 0}">
                            <td class="center">{{salary.date}}</td>
                            <td class="center">{{salary.assistant}}</td>
                            <td class="center">{{salary.detail}}</td>
                            <td class="center">{{salary.totalMoney}}</td>
                            <td class="center">{{salary.designer}}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'TcsPaymentSalary',
    props:['employeeList', 'dateRange', 'assistantList'],
    data () {
        return {

        }
    },
    methods: {
        isString(obj) {
            return (Object.prototype.toString.call(obj) === 'String' ||
            Object.prototype.toString.call(obj) === 'string' || 
            typeof(obj) === 'string') ? true : false;
        },
    },
    computed: {
        salaryAmountDate: function() {
            const vm = this;
            const startDate = new Date(this.dateRange.year, this.dateRange.month - 1);
            const endDate = new Date(this.dateRange.year, this.dateRange.month).addDays(-1);
            return startDate.yyyymmddBySlash() + ' 至 ' + endDate.yyyymmddBySlash();
        },
        /** 整理每月份助理資料並帶入table */
        arrangedDBData: function() {
            const vm = this;
            const rtnArr = [];
            if(true) {
            // if(vm.loginPermit) {
                vm.allSalaryData.forEach(item => {
                    Object.keys(item).forEach(key => {
                        // 若key為id則跳過，只塞object
                        if(!vm.isString(item[key])) {
                            const year = new Date(item[key].date).getFullYear();
                            const month = new Date(item[key].date).getMonth() + 1;
                            if(month === this.dateRange.month && year === this.dateRange.year) {
                                rtnArr.push(item[key]);
                            }
                        }
                    });
                });
            }
            return rtnArr;
        },
        /** 整理每月份助理資料並帶入table */
        arrangedDBData: function() {
            const vm = this;
            const rtnArr = [];
            if(true) {
            // if(vm.loginPermit) {
                vm.assistantList.forEach(item => {
                    Object.keys(item).forEach(key => {
                        // 若key為id則跳過，只塞object
                        if(!vm.isString(item[key])) {
                            const year = new Date(item[key].date).getFullYear();
                            const month = new Date(item[key].date).getMonth() + 1;
                            if(month === this.dateRange.month && year === this.dateRange.year) {
                                rtnArr.push(item[key]);
                            }
                        }
                    });
                });
            }
            return rtnArr;
        },
        /** 整理每月份助理薪水並帶入table */
        astEveryMonthSalary: function() {
            const vm = this;
            const allSalaryData = vm.assistantList;
            let rtnArr = [];
            if(true) {
            // if(vm.loginPermit) {
                if(allSalaryData !== null && allSalaryData.length > 0) {
                    allSalaryData.forEach(item => {
                        const name = item.id;
                        let totalSalary = 0;
                        Object.keys(item).forEach(key => {
                            if(!vm.isString(item[key])) {
                                const year = new Date(item[key].date).getFullYear();
                                const month = new Date(item[key].date).getMonth() + 1;
                                if(month === this.dateRange.month && year === this.dateRange.year) {
                                    totalSalary += item[key].totalMoney;
                                }
                            }
                        });
                        rtnArr.push({name: name, totalSalary: totalSalary});
                    });
                }
            }
            return rtnArr;
        },
        desEveryMonthSalary: function() {
            const vm = this;
            let rtnArr = [];
            if(true) {
            // if(vm.loginPermit) {
                if(vm.arrangedDBData) {
                    vm.employeeList.filter(obj => obj.empType == 1).forEach(emp => {
                        let designerPay = 0;
                        vm.arrangedDBData.filter(arranged => arranged.designer === emp.empName).forEach(item => {
                            designerPay += item.totalMoney;
                        });
                        rtnArr.push({name: emp.empName, designerPay: designerPay});
                    });
                }
            }
            return rtnArr;
        }
    }
}
</script>