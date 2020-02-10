<template>
<div class="panel" style="text-align:left;">
    <TcsModalMessage :modalInfomation="messageModal" @modalResponse="onModalResponse"/>
    <div class="panel-heading">
        <div class="row">
            <div class="col-md-3">
                <i class="far fa-calendar-alt"></i>日期
                <select v-model="designYear" @change="changeDay()" class="form-control selectionAuto"><option v-for="year in allYears" :key="year">{{year}}</option></select>/
                <select v-model="designMonth" @change="changeDay()" class="form-control selectionAuto"><option v-for="month in allMonths" :key="month">{{month}}</option></select>/
                <select v-model="designDate" class="form-control selectionAuto"><option v-for="date in allDates" :key="date">{{date}}</option></select>
            </div>

            <div class="col-md-2">
                <i class="fa fa-dollar"></i>總金額: {{ total }}
            </div>

            <div class="col-md-3">
                <i class="fa fa-scissors"></i>設計師
                <select v-model="workDesignerName" class="form-control selectionAuto">
                <option value="">請選擇</option>
                <option v-for="emp in employeeList" :key="emp.id" :value="emp.empName" v-show="emp.empType == '1'">{{emp.empName}}</option>
                </select>
            </div>

            <div class="col-md-3">
                <i class="fa fa-book"></i>助理
                <select v-model="workAssistantName" class="form-control selectionAuto">
                <option value="">請選擇</option>
                <option v-for="emp in employeeList" :key="emp.id" :value="emp.empName" v-show="emp.empType == '2'">{{emp.empName}}</option>
                </select>
            </div>

            <div class="col-md-1">
                <button class="btn btn-success btn-sm" :disabled="!total" @click="addNewRecord">新增資料</button>
            </div>
        </div>
    </div>
    <div class="panel-heading">
        <div class="row">
            <TcsDesignHairStyle :chtType="hairStyle.cut.chinese" :type="hairStyle.cut.type" @getDetails="onGetDetails" :hasAssistant="(workAssistantName)">剪</TcsDesignHairStyle>
            <TcsDesignHairStyle :chtType="hairStyle.dye.chinese" :type="hairStyle.dye.type" @getDetails="onGetDetails" :hasAssistant="(workAssistantName)">染</TcsDesignHairStyle>
            <TcsDesignHairStyle :chtType="hairStyle.burn.chinese" :type="hairStyle.burn.type" @getDetails="onGetDetails" :hasAssistant="(workAssistantName)">燙</TcsDesignHairStyle>
            <TcsDesignHairStyle :chtType="hairStyle.wash.chinese" :type="hairStyle.wash.type" @getDetails="onGetDetails" :hasAssistant="(workAssistantName)">洗</TcsDesignHairStyle>

            <!-- <TcsDesignHairStyle hairStyleChinese="剪" :hairStyleDetails="hairStyle.cut" @getDetails="onGetDetails" />
            <TcsDesignHairStyle hairStyleChinese="染" :hairStyleDetails="hairStyle.dye" @getDetails="onGetDetails"/>
            <TcsDesignHairStyle hairStyleChinese="燙" :hairStyleDetails="hairStyle.burn" @getDetails="onGetDetails"/>
            <TcsDesignHairStyle hairStyleChinese="洗" :hairStyleDetails="hairStyle.wash" @getDetails="onGetDetails"/> -->
        </div>
    </div>
</div>
</template>

<script>
import TcsDesignHairStyle from '@/components/DesignHairStyle'
import TcsModalMessage from '@/components/ModalMessage'

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
            workDesignerName: '',
            workAssistantName: '',
            hairStyle: {
                cut: { money: 0, withAssistant: false, type: 'cut', chinese: '剪' },
                dye: { money: 0, withAssistant: false, type: 'dye', chinese: '染' },
                burn: { money: 0, withAssistant: false, type: 'burn', chinese: '燙' },
                wash: { money: 0, withAssistant: false, type: 'wash', chinese: '洗' },
                designer: '',
                assistant: '',
                totalCost: 0,
                date: ''
            },
            messageModal: {
                show: false,
                message: '',
                type: '',
                category: ''
            }
        }
    },
    components: { TcsDesignHairStyle, TcsModalMessage },
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
        onGetDetails(details) {
            this.hairStyle[details.type] = details;
        },
        // Call modal
        callModal(message, type, category, infoObject) {
            this.messageModal.show = true;
            this.messageModal.message = message;
            this.messageModal.type = type;
            this.messageModal.category = category;
            this.messageModal.modifyInfo = infoObject;
        },
        // Modal response
        onModalResponse(modalObject) {
            this.messageModal = {
                show: false,
                type: '',
                message: '',
                response: false,
                category: ''
            };
        },
        addNewRecord () {
            if(!this.workDesignerName) {
                this.callModal('請選擇設計師', '', '', {});
            }
            if(this.workAssistantName) { // 選助理但助理沒有協助項目
                var hasAssistant = false;
                // 先把剪染燙洗的物件抓出來
                const hairDesignArray = Object.keys(this.hairStyle).filter(key => typeof this.hairStyle[key] === 'object');
                // 判斷是否有助理協助
                for(var i = 0; i < hairDesignArray.length; i++) {
                    const withAssistant = this.hairStyle[hairDesignArray[i]].withAssistant;
                    if(withAssistant) {
                        hasAssistant = true;
                        break;
                    }
                }

                if(!hasAssistant) {
                    this.callModal('有選擇助理，請選擇協助項目', '', '', {});
                }else {
                    this.hairStyle.designer = this.workDesignerName;
                    this.hairStyle.assistant = this.workAssistantName;
                    this.hairStyle.date = this.designYear + '/' + this.designMonth + '/' + this.designDate;
                    this.$emit('addNewRecord', this.hairStyle);
                }
            }else {
                this.hairStyle.designer = this.workDesignerName;
                this.hairStyle.assistant = this.workAssistantName;
                this.hairStyle.date = this.designYear + '/' + this.designMonth + '/' + this.designDate;
                this.$emit('addNewRecord', this.hairStyle);
            }
        }
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
    },
    computed: {
        total: function() {
            this.hairStyle.totalCost = this.hairStyle.cut.money + this.hairStyle.dye.money + this.hairStyle.burn.money + this.hairStyle.wash.money;
            return this.hairStyle.totalCost;
        }
    }
}
</script>
