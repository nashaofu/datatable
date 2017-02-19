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
            <template scope="data">
                <div v-if="data.col.data">{{ data.row[data.col.data] }}</div>
                <div v-else-if="!data.col.data && data.col.title==='操作'">
                    <button @click="show(data)">查看</button>
                </div>
            </template>
        </datatable>
        <div>
            <button @click="changecols">改变显示列</button>
            <button @click="changesearch">搜索</button>
            <button @click="changesort">排序</button>
            <button @click="changeselect">选择</button>
            <button @click="changepagination">页数</button>
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
                },
                pagination: {
                    total: 500,
                    current: 1,
                    size: 10
                }
            }
        },
        components: {
            Datatable
        },
        created() {
            this.getdata(1);
        },
        methods: {
            getdata(page) {
                const data = {
                    page: page,
                    per_page: this.pagination.size
                }
                this.$http.get('/api/user', {
                    params: {
                        data: JSON.stringify(data)
                    }
                }).then((res) => {
                    this.data = res.data.data.data;
                    this.pagination = {
                        total: res.data.data.total,
                        current: res.data.data.current_page,
                        size: res.data.data.per_page
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
            changepagination() {
                this.pagination.current = Math.random() > 0.5 ? 5 : 3;
                this.pagination.total = Math.ceil(Math.random() * 900) + 100;
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
                this.getdata(pager.current);
                console.log(`pager:${JSON.stringify(pager)}`);
            },
            show(sds) {
                console.log(sds)
            }
        }
    }
</script>