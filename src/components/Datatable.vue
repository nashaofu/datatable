<template>
    <div>
        <datatable
            :data="data"
            :columns="columns"
            :options="options"
            :pagination="pagination"
            @sort="sort"
            @search="search"
            @select="select"
            @page="page"
        >
            <template
                slot="buttons"
                scope="row"
            >
                <button @click="show(row)">查看</button>
                <button @click="alert(row)">alert</button>
            </template>
        </datatable>
        <div>
            <button @click="changecols">改变显示列</button>
            <button @click="changesearch">搜索</button>
            <button @click="changesort">排序</button>
            <button @click="changeselect">选择</button>
            <button @click="changepageable">分页</button>
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
                data: [],
                columns: _.cloneDeep(columns),
                options: {
                    searchable: true,
                    sortable: true,
                    selectable: true,
                    pageable: true
                },
                pagination: {
                    total: 0,
                    current: 1,
                    size: 5
                }
            }
        },
        components: {
            Datatable
        },
        created() {
            this.getdata();
        },
        methods: {
            getdata() {
                const data = {
                    current: this.pagination.current,
                    size: this.pagination.size
                }
                this.$http.get('/api/user/', {
                    params: data
                }).then((res) => {
                    this.data = res.data.data;
                    this.pagination = {
                        total: res.data.total,
                        current: res.data.current,
                        size: res.data.size
                    }
                }, (res) => {
                    console.log(res);
                });
            },
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
            changepageable() {
                this.options.pageable = !this.options.pageable;
            },
            sort(sort) {
                console.log(`sort:${JSON.stringify(sort)}`)
            },
            search(serach) {
                console.log(`serach:${JSON.stringify(serach)}`);
            },
            select(select) {
                console.log(`select:${JSON.stringify(select)}`);
            },
            page(pager) {
                this.pagination.current = pager.current;
                this.pagination.size = pager.size;
                this.getdata();
            },
            show(row) {
                console.log(row)
            },
            alert(row) {
                alert(JSON.stringify(row));
            }
        }
    }

</script>