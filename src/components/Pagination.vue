<template>
    <nav aria-label="Page navigation">
        <ul class="pagination">
            <li class="page-item disabled">
                <a class="page-link" href="#" tabindex="-1">Previous</a>
            </li>
            <li :class="['page-item', pageActive]" v-for="page in allPages" :key="page">
                <a class="page-link">{{page}}</a>
            </li>
            <li class="page-item">
                <a class="page-link" href="#">Next</a>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'TcsPagination',
    props: ['dataRecordsLength'],
    data () {
        return {
            currentPage: 1,
            pageActive: 'active'
        }
    },
    computed: {
        allPages() {
            return Math.floor(this.dataRecordsLength / 10) + 1;
        }
    }
}
</script>