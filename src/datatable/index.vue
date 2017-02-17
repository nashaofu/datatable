<template>
    <div class="datatable">
        <div class="datatable-table">
            <table>
                <thead>
                    <tr>
                        <th v-if="selectable">
                            <label class="datatable-table-checkbox">
                                <input type="checkbox" v-model="selectall" @change="selectallchange">
                                <span class="checkbox" :class="{ checked: selectall }"></span>
                            </label>
                        </th>
                        <th
                            v-for="item in cols"
                            :class="{ 'datatable-table-sortable': sortable && item.sortable }"
                        >
                            <div class="datatable-table-title">{{ item.title }}</div>
                            <div
                                v-if="sortable && item.sortable && item.data && sortKeys[item.data]"
                                class="datatable-table-sortbutton"
                            >
                                <a
                                    href="javascript:void(0)"
                                    :class="{ 'datatable-table-sortbyasc': sortKeys[item.data].order === 'asc' }"
                                    @click="sort(item.data, 'asc')"
                                >
                                    <span class="angle-up"></span>
                                </a>
                                <a
                                    href="javascript:void(0)"
                                    :class="{ 'datatable-table-sortbydesc': sortKeys[item.data].order === 'desc' }"
                                    @click="sort(item.data, 'desc')"
                                >
                                    <span class="angle-down"></span>
                                </a>
                            </div>
                        </th>
                    </tr>
                    <tr v-if="searchable">
                        <th v-if="selectable">
                            <span>-</span>
                        </th>
                        <th
                            v-for="item in cols"
                            class="datatable-table-search"
                        >
                            <input
                                v-if="item.searchable && item.data && searchKeys[item.data]"
                                type="text"
                                :placeholder="item.title"
                                v-model="searchKeys[item.data].keyword"
                                @input="search"
                            >
                            <span v-else>-</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row,index) in rows">
                        <td v-if="selectable">
                            <label class="datatable-table-checkbox">
                                <input type="checkbox" v-model="selectKeys[index].select" @change="select">
                                <span class="checkbox" :class="{ checked: selectKeys[index].select }"></span>
                            </label>
                        </td>
                        <td v-for="col in cols">
                            {{ { row: row, col: col } | filter }}
                        </td>
                    </tr>
                    <tr v-if="!rows.length">
                        <td :colspan="{ cols: cols, selectable: selectable } | colspan">没有数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="datatable-pagination">
            <ul>
                <li v-for="item in pages">
                    <a href="#">{{ item }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'datatable',
        props: {
            data: {
                type: Array,
                default() {
                    return [];
                }
            },
            columns: {
                type: Array,
                default() {
                    return [];
                }
            },
            options: {
                type: Object,
                default() {
                    return {};
                }
            }
        },
        data() {
            return {
                sortKeys: {},
                searchKeys: {},
                selectKeys: {},
                selectall: false,
                pages: [1, 2, 3, 4, 5, 6, 7, 8],
                timer: null
            }
        },
        computed: {
            sortable() {
                return this.options.sortable;
            },
            searchable() {
                return this.options.searchable;
            },
            selectable() {
                return this.options.selectable;
            },
            rows() {
                return this.data;
            },
            cols() {
                if (this.columns.length) {
                    return this.columns;
                }
                const cols = [];
                const tmp = {};
                // 循环数据
                // 取出所有数据的下标(获取最长的下标)
                for (let i = 0, length = this.data.length; i < length; i++) {
                    for (let key in this.data[i]) {
                        if (!tmp[key]) {
                            tmp[key] = {
                                title: key,
                                default: '-',
                                data: key,
                                searchable: true,
                                sortable: true
                            }
                        }
                    }
                }
                // 把对象转换为数组
                for (let key in tmp) {
                    cols.push(tmp[key]);
                }
                return cols;
            },
            Getsort() {
                const tmp = [];
                for (let key in this.sortKeys) {
                    if (this.sortKeys[key].order) {
                        tmp.push(this.sortKeys[key]);
                    }
                }
                return tmp;
            },
            Getsearch() {
                const tmp = [];
                for (let key in this.searchKeys) {
                    if (this.searchKeys[key].keyword) {
                        tmp.push(this.searchKeys[key]);
                    }
                }
                return tmp;
            },
            Getselect() {
                const tmp = [];
                for (let key in this.selectKeys) {
                    if (this.selectKeys[key].select) {
                        tmp.push(this.selectKeys[key]);
                    }
                }
                return tmp;
            }
        },
        filters: {
            filter(value) {
                const row = value.row;
                const col = value.col;
                if (!col.data || !row[col.data]) {
                    return col.default;
                }
                // 限制最大长度
                if (col.maxlength && row[col.data].length > col.maxlength) {
                    return `${row[col.data].slice(0, col.maxlength)}...`;
                } else {
                    return row[col.data];
                }
            },
            colspan(value) {
                const cols = value.cols;
                const selectable = value.selectable;
                if (selectable) {
                    return cols.length + 1;
                }
                return cols.length;
            }
        },
        created() {
            // 初始化选择的数据
            const rows = this.rows;
            const selectKeys = {};
            // 有BUG数据更新后会仍然记住是否选择
            for (let i = 0, length = rows.length; i < length; i++) {
                selectKeys[i] = {
                    data: rows[i],
                    select: false
                }
            }
            this.selectKeys = selectKeys;

            // 初始化排序数据及其搜索数据
            const cols = this.cols;
            const sortKeys = {};
            const searchKeys = {};
            for (let i = 0, length = cols.length; i < length; i++) {
                if (cols[i].data) {
                    sortKeys[cols[i].data] = {
                        key: cols[i].data,
                        order: null
                    };
                    searchKeys[cols[i].data] = {
                        key: cols[i].data,
                        keyword: null
                    }
                }
            }
            this.sortKeys = sortKeys;
            this.searchKeys = searchKeys;
        },
        watch: {
            sortable(nVal, oVal) {
                if (!nVal) {
                    for (let key in this.sortKeys) {
                        this.sortKeys[key].order = null;
                    }
                    this.$emit('sort', this.Getsort);
                }
            },
            searchable(nVal, oVal) {
                if (!nVal) {
                    for (let key in this.searchKeys) {
                        this.searchKeys[key].keyword = null;
                    }
                    this.$emit('search', this.Getsearch);
                }
            },
            selectable(nVal, oVal) {
                if (!nVal) {
                    for (let key in this.selectKeys) {
                        this.selectall = false;
                        this.selectKeys[key].select = false;
                    }
                    this.$emit('select', this.Getselect);
                }
            },
            rows(nVal, oVal) {
                const rows = nVal;
                const selectKeys = {};
                // 有BUG数据更新后会仍然记住是否选择
                for (let i = 0, length = rows.length; i < length; i++) {
                    let select = this.selectKeys[i] && this.selectKeys[i].select;
                    selectKeys[i] = {
                        data: rows[i],
                        select: select || false
                    }
                }
                this.selectKeys = selectKeys;
            },
            cols(nVal, oVal) {
                const sortKeys = {};
                const searchKeys = {};
                const cols = nVal;
                for (let i = 0, length = cols.length; i < length; i++) {
                    if (cols[i].data) {
                        let order = this.sortKeys[cols[i].data] && this.sortKeys[cols[i].data].order;
                        sortKeys[cols[i].data] = {
                            key: cols[i].data,
                            order: order || null
                        };
                        let keyword = this.searchKeys[cols[i].data] && this.searchKeys[cols[i].data].keyword;
                        searchKeys[cols[i].data] = {
                            key: cols[i].data,
                            keyword: keyword || null
                        }
                    }
                }
                this.sortKeys = sortKeys;
                this.searchKeys = searchKeys;
            }
        },
        methods: {
            sort(key, order) {
                this.sortKeys[key] = {
                    key: key,
                    order: order
                }
                if (this.sortable) {
                    this.$emit('sort', this.Getsort);
                }
            },
            search() {
                // 防止一直发生
                this.timer && clearTimeout(this.timer);
                this.timer = setTimeout(() => {
                    if (this.searchable) {
                        this.$emit('search', this.Getsearch);
                    }
                }, 300);
            },
            select() {
                // IE下事件先发生，延时以兼容
                setTimeout(() => {
                    if (this.Getselect.length === this.rows.length) {
                        this.selectall = true;
                    } else {
                        this.selectall = false;
                    }
                    if (this.selectable) {
                        this.$emit('select', this.Getselect);
                    }
                }, 100);
            },
            selectallchange() {
                // IE下事件先发生，延时以兼容
                setTimeout(() => {
                    // 初始化选择的数据
                    const rows = this.rows;
                    const selectKeys = {};
                    // 有BUG数据(data)更新后会仍然记住是否选择
                    for (let i = 0, length = rows.length; i < length; i++) {
                        selectKeys[i] = {
                            data: rows[i],
                            select: this.selectall
                        }
                    }
                    this.selectKeys = selectKeys;
                    if (this.selectable) {
                        this.$emit('select', this.Getselect);
                    }
                }, 100);
            }
        }
    }
</script>
<style
    src="./datatable.less"
    lang="less"
></style>