<template>
    <div class="container">
        <!-- Employee modify area -->
        <TcsModifyEmp :employeeList="empObjList" @modifyEmpEvent="onModifyEvent"></TcsModifyEmp>
        

        <!-- Details -->
        <TcsDesignInformation :employeeList="empObjList"></TcsDesignInformation>

        <!-- Data record -->
        <div class="panel panel-default" style="margin-bottom:0px;">
            <TcsSearchFilter @filterRecords="onFilterRecords"/>
        </div>
        <TcsViewAllRecords :dataRecordsList="dataRecords" :filterCondition="filterObj"/>
    </div>
</template>
<script>
import moment from 'moment'
import TcsModifyEmp from '@/components/ModifyEmployee'
import TcsDesignInformation from '@/components/DesignInformation'
import TcsSearchFilter from '@/components/SearchFilter'
import TcsViewAllRecords from '@/components/ViewAllRecords'

const empRef = firebase.database().ref('/employees/');
const customerRef = firebase.database().ref('/customers/');
var timer;

export default {
    name: 'TcsCustomerInfo',
    components: {
        TcsModifyEmp,
        TcsDesignInformation,
        TcsSearchFilter,
        TcsViewAllRecords
    },
    data() {
        return {
            today: new Date(),
            empObjList: [],
            modalInformation: {},
            dataRecords: [], // 消費紀錄
            filterObj: { // 過濾消費條件
                mobile: '',
                year: '',
                month: ''
            }
        }
    },
    methods: {
        // 員工異動
        onModifyEvent (modifyInfo) {
            console.log(modifyInfo);
            // 刪除
            if(modifyInfo.isDelete) {
                const designerName = modifyInfo.designerName;
                var designerId;
                const assistantName = modifyInfo.assistantName;
                var assistantId;
                var confirmMessage = '確定刪除';

                if(designerName) {
                    designerId = this.findEmpIdByName(designerName);
                    confirmMessage += ' 設計師: ' + designerName;
                }
                if(assistantName) {
                    assistantId = this.findEmpIdByName(assistantName);
                    confirmMessage += ' 助理: ' + assistantName;
                }

                if(confirm(confirmMessage)) {
                    if(designerId) {
                        const desRef = firebase.database().ref('/employees/' + designerId);
                        desRef.remove().then(() => { alert('設計師刪除成功') });
                    }
                    if(assistantId) {
                        const astRef = firebase.database().ref('/employees/' + assistantId);
                        astRef.remove().then(() => { alert('助理刪除成功') });
                    }
                }

            }
            // 新增
            else {
                empRef.push({
                    empName: modifyInfo.addEmpName,
                    empType: modifyInfo.addEmpType,
                    timeStamp: this.getTime()
                }).then(() => {
                    alert('新增成功');
                }).catch((err) => {
                    console.log(err.message);
                    alert('Error');
                });
            }
        },
        // 過濾搜尋條件
        onFilterRecords(filterConditions) {
            const mobile = filterConditions.mobile;
            const year = filterConditions.year;
            const month = filterConditions.month;
            this.filterObj.mobile = mobile;
            this.filterObj.year = year;
            this.filterObj.month = month;
        },
        findEmpIdByName (inputName) {
            const vm = this;
            if(inputName !== '' || inputName !== null || inputName.length > 0) {
                for(var i = 0; i < vm.empObjList.length; i++) {
                    if(vm.empObjList[i].empName === inputName) {
                        return vm.empObjList[i].id;
                    }
                }
            }
            return;
        },
        getTime() {
            const now = new Date();
            const year = now.getFullYear();
            const month = now.getMonth()+1;
            const date = now.getDate();
            return year+'-'+month+'-'+date;
        }
    },
    mounted() {
        const vm = this;
        // 員工資料
        empRef.on('value', function(snapshot) {
            const val = snapshot.val();
            const empData = val
                ? Object.keys(val).map(key => ({ id: key, ...val[key] }))
                : null
            vm.empObjList = empData;
        });

        // 消費紀錄
        customerRef.on('value', function(snapshot) {
            const val = snapshot.val();
            const costInfo = val
                ? Object.keys(val).map(key => ({ id: key, ...val[key] }))
                : null
            vm.dataRecords = costInfo;
        });
    }
}
</script>
