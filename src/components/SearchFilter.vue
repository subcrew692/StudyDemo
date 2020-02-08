<template>
    <div class="panel-heading" style="background-color:azure;">
      <div class="row">
        <div class="col-sm-6" style="text-align:left;">
          <!-- <div :style="{'display':(bossMobile === mobile && confirmLogIn ? 'inline' : 'none')}"> -->
          <div style="display:inline">
          <i class="fa fa-phone"></i>以電話號碼搜尋
          <input type="text" class="form-control selectionAuto circle" placeholder="Search by mobile..." v-model="filterByMobile" />
          </div>
        </div>
        <div class="col-sm-6" style="text-align:right;">
          <input type="checkbox" name="2" value="filterByDate" id="filterByDate" v-model="filterByDate">
          <label for="filterByDate"><span></span>使用日期搜尋</label>

          <select v-model="searchYear" class="form-control selectionAuto" :disabled="filterByDate.length === 0" @change="combineFilter">
            <option v-for="year in allYears" :key="year">{{year}}</option>
          </select>年
          <select v-model="searchMonth" class="form-control selectionAuto" :disabled="filterByDate.length === 0" @change="combineFilter">
            <option v-for="month in allMonths" :key="month">{{month}}</option>
          </select>月
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name: 'TcsSearchFilter',
    data () {
        return {
            filterByMobile: '', 
            filterByDate: [],
            searchYear: new Date().getFullYear(),   // 消費年
            searchMonth: new Date().getMonth() + 1, // 消費月
            allYears: [],
            allMonths: []
        }
    },
    methods: {
      combineFilter() {
        var filterConditions = {
          mobile: '',
          year: '',
          month: ''
        };
        if(this.filterByDate.length > 0) {
          filterConditions.year = this.searchYear;
          filterConditions.month = this.searchMonth;
        }
        filterConditions.mobile = this.filterByMobile;
        console.log(filterConditions);
        this.$emit('filterRecords', filterConditions);
      }
    },
    created() {
        for(var i = 2015; i <= new Date().getFullYear(); i++) {
            this.allYears.unshift(i);
        }
        for(var i = 1; i <= 12; i++) {
            this.allMonths.push(i);
        }
    },
    watch: {
      filterByMobile: 'combineFilter',
      filterByDate: 'combineFilter'
    }
}
</script>
