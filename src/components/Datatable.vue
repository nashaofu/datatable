<template>
    <div>
        <datatable
            :data="data"
            :columns="columns"
            :options="options"
            @sort="sort"
            @search="search"
            @select="select"
        >
        </datatable>
        <div>
            <button @click="changecols">改变显示列</button>
            <button @click="changesearch">搜索</button>
            <button @click="changesort">排序</button>
            <button @click="changeselect">选择</button>
        </div>
    </div>
</template>
<script>
    import _ from 'lodash';
    import Datatable from '../datatable';
    import columns from './columns';
    import data from './data';

    export default {
        name: 'data',
        data() {
            return {
                data: data,
                columns: _.cloneDeep(columns),
                options: {
                    searchable: true,
                    sortable: true,
                    selectable: true
                }
            }
        },
        components: {
            Datatable
        },
        created() {
            // this.$http.get('/api/user').then((res) => {
            //     this.data = res.data.data.data;
            //     console.log(res.data.data.data)
            // }, (res) => {

            // });
        },
        methods: {
            changecols(e) {
                if (!this.columns[0]) {
                    this.columns = _.cloneDeep(columns);
                } else {
                    this.columns = [];
                }
            },
            changesort() {
                this.options.sortable = !this.options.sortable;
            },
            changesearch() {
                this.options.searchable = !this.options.searchable;
            },
            changeselect() {
                this.options.selectable = !this.options.selectable;
            },
            sort(sort) {
                console.log(`sort:${JSON.stringify(sort)}`)
            },
            search(serach) {
                console.log(`serach:${JSON.stringify(serach)}`);
            },
            select(select) {
                console.log(`select:${JSON.stringify(select)}`);
            }
        }
    }
</script>