<template>
      <!-- 老闆瀏覽所有紀錄 -->
      <table border="1" class="table table-striped table-bordered table-hover">
        <tbody>
          <tr>
              <td style="text-align: center;"><span  @click="sortByDate=false;sortFromBigToSmall=!sortFromBigToSmall" style="cursor:pointer">
              會員電話 <i class="fa fa-sort"></i></span></td>
              <td style="text-align: center;"><span @click="sortByDate=true;sortFromBigToSmall=!sortFromBigToSmall" style="cursor:pointer">
              日期 <i class="fa fa-sort"></i></span></td>
            <td style="text-align: center;">消費金額</td>
            <td style="text-align: center;">設計師</td>
            <td style="text-align: center;">助理</td>
            <td style="text-align: center;">設計內容</td>
            <td style="text-align: center;">刪除紀錄</td>
          </tr>
          <tr v-for="record in sortRecords" :key="record.id">
            <template>
              <td>{{record.mobile}}</td>
              <td>{{record.date}}</td>
              <td>{{record.totalCost}}</td>
              <td>{{record.designer}}</td>
              <td>{{record.assistant === 'none' ? '' : record.assistant}}</td>
              <td>{{record.detail}}</td>
              <td><i class="fa fa-times" style="cursor:pointer;color:red;" @click="delRecord(record.id, record.date, record.totalCost, record.assistant)"></i></td>
            </template>
          </tr>
        </tbody>
      </table>
</template>

<script>
export default {
    name: 'TcsViewAllRecords',
    data () {
        return {
            filterMobile: '',
            filterYear: '',
            filterMonth: '',
            sortByDate: true, // 是否為日期排序
            sortFromBigToSmall: true // 排序由大到小
        }
    },
    props: [ 'dataRecordsList', 'filterCondition' ],
    methods: {
        
    },
    computed: {
        sortRecords() {
            this.filterMobile = this.filterCondition.mobile;
            this.filterYear = this.filterCondition.year;
            this.filterMonth = this.filterCondition.month;
            var sortResult = this.dataRecordsList;
            if(this.dataRecordsList) {
                /* 過濾條件 */
                if(this.filterMobile) {
                    sortResult = sortResult.filter(consume => consume.mobile.indexOf(this.filterMobile) !== -1);
                }
                if(this.filterYear && this.filterMonth) {
                    sortResult = sortResult.filter(consume => this.filterByDate(consume.date));
                }

                /* 排序 */
                sortResult.sort((a, b) => {
                    // 依照日期排序
                    if(this.sortByDate) {
                        return this.sortFromBigToSmall ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date);
                    }
                    // 依照電話排序
                    else {
                        return this.sortFromBigToSmall ? b.mobile - a.mobile : a.mobile - b.mobile;
                    }
                });
            }
            return sortResult;
        }
    },
    methods: {
        // 過濾相同日期
        filterByDate(date) {
            const viewDate = new Date(date);
            const sameYear = viewDate.getFullYear() === parseInt(this.filterYear);
            const sameMonth = viewDate.getMonth() + 1 === parseInt(this.filterMonth);
            return sameYear && sameMonth;
        }
    }
}
</script>