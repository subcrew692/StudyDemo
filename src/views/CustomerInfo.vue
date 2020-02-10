<template>
    <div class="container">
        <!-- Change member area -->
        <TcsChangeMember :bossLogin="isBoss" :user="currentUser" @changeUser="onChangeUser"/>

        <!-- Login Block -->
        <TcsLoginBlock @login="onLogin" :isLogin="showLoginModal" />
        <!-- Modal Message -->
        <TcsModalMessage :modalInfomation="messageModal" @modalResponse="onModalResponse" />

        <!-- Employee modify area -->
        <TcsModifyEmp :employeeList="empObjList" @modifyEmpEvent="onModifyEvent" ></TcsModifyEmp>
        

        <!-- Details -->
        <TcsDesignInformation :employeeList="empObjList" @addNewRecord="onAddNewRecord"></TcsDesignInformation>

        <!-- Data record -->
        <div class="panel panel-default" style="margin-bottom:0px;">
            <TcsSearchFilter @filterRecords="onFilterRecords" :showPhoneFilter="isBoss"/>
        </div>
        <TcsViewAllRecords :customer="currentUser" :showAllRecords="isBoss" :dataRecordsList="dataRecords" :filterCondition="filterObj" @deleteRecord="onDeleteRecord"/>
    </div>
</template>
<script>
import moment from 'moment'
import TcsModifyEmp from '@/components/ModifyEmployee'
import TcsDesignInformation from '@/components/DesignInformation'
import TcsSearchFilter from '@/components/SearchFilter'
import TcsViewAllRecords from '@/components/ViewAllRecords'
import TcsLoginBlock from '@/components/LoginBlock'
import TcsChangeMember from '@/components/ChangeMember'
import TcsModalMessage from '@/components/ModalMessage'

const empRef = firebase.database().ref('/employees/');
const customerRef = firebase.database().ref('/customers/');
const salaryRef = firebase.database().ref('/salary/');
const bossRef = firebase.database().ref('/bossMobile/');
var timer;

export default {
    name: 'TcsCustomerInfo',
    components: {
        TcsLoginBlock,
        TcsModifyEmp,
        TcsDesignInformation,
        TcsSearchFilter,
        TcsViewAllRecords,
        TcsChangeMember,
        TcsModalMessage
    },
    data() {
        return {
            bossMobile: '',
            showLoginModal: true,
            today: new Date(),
            empObjList: [],
            dataRecords: [], // 消費紀錄
            filterObj: { // 過濾消費條件
                mobile: '',
                year: '',
                month: ''
            },
            salaryDataForDeleteUse: [],
            isBoss: false,
            currentUser: '',
            messageModal: {
                show: false,
                type: 'info',
                message: '',
                response: false
            }
        }
    },
    methods: {
        // 登入
        onLogin(userMobile) {
            this.showLoginModal = false;
            console.log(userMobile);
            if(userMobile === this.bossMobile) {
                this.isBoss = true;
                this.currentUser = userMobile;
            }else {
                this.isBoss = false;
                this.currentUser = userMobile;
            }
        },
        // 切換會員
        onChangeUser() {
            this.currentUser = '';
            this.isBoss = false;
            this.showLoginModal = true;
        },
        // 員工異動
        onModifyEvent (modifyInfo) {
            // 刪除所需
            if(modifyInfo.isDelete) {
                const designerName = modifyInfo.designerName;
                const assistantName = modifyInfo.assistantName;
                var confirmMessage = '確定刪除';

                if(designerName) {
                    modifyInfo.designerId = this.findEmpIdByName(designerName);
                    confirmMessage += ' 設計師: ' + designerName;
                }
                if(assistantName) {
                    modifyInfo.assistantId = this.findEmpIdByName(assistantName);
                    confirmMessage += ' 助理: ' + assistantName;
                }

                this.callModal(confirmMessage, 'delete', 'employee', modifyInfo);
            }
            // 新增
            else {
                const message = `確定新增${modifyInfo.addEmpType == '1' ? '設計師' : '助理'} ${modifyInfo.addEmpName} 嗎?`;
                this.callModal(message, 'add', 'employee', modifyInfo);
            }
        },
        // Call modal
        callModal(message, type, category, infoObject) {
            this.messageModal.show = true;
            this.messageModal.message = message;
            this.messageModal.type = type;
            this.messageModal.category = category;
            this.messageModal.modifyInfo = infoObject;
        },
        // 確認刪除員工
        deleteEmployee(modifyInfo) {
            if(modifyInfo.designerId) {
                const desRef = firebase.database().ref('/employees/' + modifyInfo.designerId);
                desRef.remove().then(() => { this.callModal('設計師刪除成功', '', '', {}) });
            }
            if(modifyInfo.assistantId) {
                const astRef = firebase.database().ref('/employees/' + modifyInfo.assistantId);
                astRef.remove().then(() => { this.callModal('助理刪除成功', '', '', {}) });
            }
        },
        // 確認新增員工
        addEmployee(modifyInfo) {
            console.log(modifyInfo);
            empRef.push({
                empName: modifyInfo.addEmpName,
                empType: modifyInfo.addEmpType,
                timeStamp: this.getTime()
            }).then(() => {
                this.callModal('新增成功', '', '', {});
            }).catch((err) => {
                console.log(err.message);
                alert('Error');
            });
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
        // 以Name去找ID
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
        },
        // Modal message
        onModalResponse(modalObject) {
            if(modalObject.response) {
                if(modalObject.type === 'add') {
                    if(modalObject.category === 'employee') {
                        this.addEmployee(modalObject.modifyInfo);
                    }
                }else if(modalObject.type === 'delete'){
                    if(modalObject.category === 'employee') {
                        this.deleteEmployee(modalObject.modifyInfo);
                    }else {

                    }
                }
            }
            this.messageModal = {
                show: false,
                type: '',
                message: '',
                response: false,
                category: ''
            };
        },
        // 新增紀錄
        onAddNewRecord(recordObj) {
            console.log(recordObj);
            const cost = recordObj.totalCost;
            const des = recordObj.designer;
            const ast = recordObj.assistant;
            const date = recordObj.date;
            const cut = recordObj.cut.money > 0 ? '剪: ' + recordObj.cut.money : '';
            const dye = recordObj.dye.money > 0 ? '染: ' + recordObj.dye.money : '';
            const burn = recordObj.burn.money > 0 ? '燙: ' + recordObj.burn.money : '';
            const wash = recordObj.wash.money > 0 ? '洗: ' + recordObj.wash.money : '';
            const detail = cut + dye + burn + wash;

            const firebaseKey = customerRef.push({
                mobile: this.currentUser,
                date: date,
                totalCost: cost,
                designer: des,
                assistant: ast,
                cut: cut,
                dye: dye,
                burn: burn,
                wash: wash,
                detail: detail
            }).getKey();
            
            this.calculateAssistantHelps(firebaseKey, recordObj);
        },
        calculateAssistantHelps(firebaseKey, record) {
            var hasAssistant = false;
            var assistantEarn = 0;
            var serveStr = '';
            var assistantList = {
                date: record.date,
                assistant: record.assistant,
                recordKey: firebaseKey,
                detail: '',
                totalMoney: 0,
                designer: record.designer
            };

            // 先把剪染燙洗的物件抓出來
            const hairDesignArray = Object.keys(record).filter(key => typeof record[key] === 'object');
            // 判斷是否有助理協助
            hairDesignArray.forEach(styleName => {
                const withAssistant = record[styleName].withAssistant;
                if(withAssistant) {
                    hasAssistant = true;
                    // 助理抽成
                    if(assistantList[styleName] === 'wash') { // 洗頭一顆30
                        assistantList.wash = 30;
                        assistantEarn += 30;
                    }else {
                        assistantList[styleName] = Math.floor(record[styleName].money / 10);
                        assistantEarn += assistantList[styleName];
                    }
                    
                    serveStr += `${record[styleName].chinese}: ${record[styleName].money}`; // 剪: 30染: 500
                }
            });
            // 沒助理直接return 不用insert資料到DB
            if(!hasAssistant) { 
                this.callModal('紀錄新增成功', '', '', {});
                return ; 
            }

            assistantList.totalMoney = assistantEarn;
            assistantList.detail = serveStr;
            console.log(assistantList);
            salaryRef.child(assistantList.assistant).push(assistantList);
            this.callModal('紀錄新增成功', '', '', {});
        },   
        // 刪除紀錄
        onDeleteRecord(deleteObj) {
            const id = deleteObj.id;
            const ast = deleteObj.assistant;
            
            const delRef = firebase.database().ref('/customers/' + id);
            delRef.remove().then(() => {
                if(ast) { // 有助理的話，連同助理薪資那邊的紀錄也要刪除
                    /** json格式如下
                     * salary: {
                     *  Eason: [{key: {rec: }, {key: {rec: }}],
                     *  Amber: [{key: {rec: }, {key: {rec: }}]
                     * }
                     */
                    // 先filter找出該筆刪除資料的助理的所有紀錄
                    const deleteDataAst = this.salaryDataForDeleteUse.filter(item => {
                        console.log(`${item.id} === ${ast} : ${item.id === ast}`);
                        return item.id === ast;
                    });
                    console.log(deleteDataAst);

                    // 找出當初新增資料塞的對應key
                    const delKey = Object.keys(deleteDataAst[0]).find(key =>  {
                        // console.log(deleteDataAst[0][key]);
                        return deleteDataAst[0][key].recordKey === id;
                    });

                    const salaryDelRef = firebase.database().ref('/salary/' + ast + '/' + delKey);
                    salaryDelRef.remove();
                }
                this.callModal('紀錄成功刪除', '', '', {});
            });
        }
    },
    mounted() {
        const vm = this;

        bossRef.on('value', function(snapshot) {
            const val = snapshot.val();
            vm.bossMobile = val;
        });

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

        // 員工薪資(給刪除用)
        salaryRef.on('value', function(snapshot) {
            const val = snapshot.val();
            const data = val
                ? Object.keys(val).map(key => ({ id: key, ...val[key] }))
                : null
            vm.salaryDataForDeleteUse = data;
        });
    }
}
</script>
