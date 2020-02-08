<template>
    <div>
        <div class="panel-heading" style="text-align:left;">
            <span style="cursor:pointer;" @click="modifyEmpArea = !modifyEmpArea">
                <strong><i class="fa fa-user"></i> 員工異動 </strong>
                <i class="fa fa-chevron-down" v-if="modifyEmpArea"></i>
                <i class="fa fa-chevron-up" v-else></i>
            </span>
        </div>
        <transition name="fade">
            <div class="panel-body" v-if="modifyEmpArea">
                <div>
                    <div class="col-md-6" style="text-align:left;">
                        <div class="input-group">
                            <span class="input-group-addon">新增
                                <input type="radio" name="r" value="1" v-model="addEmpType" />設計師
                                <input type="radio" name="r" value="2" v-model="addEmpType" />助理
                            </span>
                            <input class="form-control" type="text" placeholder="請輸入名字" v-model="addEmpName" />
                            <div class="input-group-btn">
                                <button class="btn btn-primary" v-if="(addEmpName)" @click="modify(false)">新增</button>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6" style="text-align:right;">
                        刪除
                        設計師:
                        <select v-model="delDesignerName" class="form-control" style="width:auto;display:inline;">
                            <option value="none">請選擇</option>
                            <option v-for="emp in employeeList" :key="emp.id" :value="emp.empName" v-show="emp.empType == '1' && emp.empName !== 'Sunny'">
                            {{emp.empName}}</option>
                        </select>
                        助理:
                        <select v-model="delAssistantName" class="form-control" style="width:auto;display:inline;">
                            <option value="none">請選擇</option>
                            <option v-for="emp in employeeList" :key="emp.id" :value="emp.empName" v-show="emp.empType == '2'">{{emp.empName}}</option>
                        </select>
                        <button class="btn btn-danger" v-if="showDelBtn" @click="modify(true)">刪除</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>

export default {
    name: 'TcsModifyEmp',
    data() {
        return {
            addEmpType: '1',
            addEmpName: '',
            delDesignerName: 'none',
            delAssistantName: 'none',
            modifyEmpArea: false
        }
    },
    props: ['employeeList'],
    methods: {
        modify(isDelete) {
            let modifyInfo = {
                isDelete: isDelete
            }

            if(isDelete) {
                if(this.delDesignerName !== 'none') {
                    modifyInfo.designerName = this.delDesignerName;
                }
                if(this.delAssistantName !== 'none') {
                    modifyInfo.assistantName = this.delAssistantName;
                }
            }else {
                if(this.addEmpName === '' || this.addEmpName === null) {
                    alert('No input');
                }else {
                    modifyInfo.addEmpType = this.addEmpType;
                    modifyInfo.addEmpName = this.addEmpName;
                }
            }
            
            this.$emit('modifyEmpEvent', modifyInfo);
            this.resetInput();
        },
        resetInput() {
            this.addEmpType = '1';
            this.addEmpName = '';
            this.delDesignerName = 'none';
            this.delAssistantName = 'none';
            this.modifyEmpArea = false;
        }
    },
    computed: {
        showDelBtn() {
            return this.delDesignerName !== 'none' || this.delAssistantName !== 'none' ? true : false;
        }
    }
}
</script>
