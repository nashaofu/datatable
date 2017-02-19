export default {
    // 是否有排序按钮
    sortable() {
        return this.options.sortable || false;
    },
    // 是否支持搜索
    searchable() {
        return this.options.searchable || false;
    },
    // 是否支持多选
    selectable() {
        return this.options.selectable || false;
    },
    pageable() {
        return this.options.pageable || false;
    },
    // 表格行的数据信息
    rows() {
        return this.data;
    },
    // 表格列的数据信息
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
                        key: key,
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
    // 获取排序的字段及其排序方式
    Getsort() {
        const tmp = [];
        for (let key in this.sortKeys) {
            if (this.sortKeys[key].order) {
                // 完全拷贝
                tmp.push({
                    key: this.sortKeys[key].key,
                    order: this.sortKeys[key].order
                });
            }
        }
        return tmp;
    },
    // 获取搜索的字段及其搜索内容
    Getsearch() {
        const tmp = [];
        for (let key in this.searchKeys) {
            if (this.searchKeys[key].keyword) {
                // 完全拷贝
                tmp.push({
                    key: this.searchKeys[key].key,
                    keyword: this.searchKeys[key].keyword
                });
            }
        }
        return tmp;
    },
    // 获取选中的行及其数据
    Getselect() {
        const tmp = [];
        for (let key in this.selectKeys) {
            if (this.selectKeys[key].select) {
                // 拷贝select
                tmp.push({
                    data: this.selectKeys[key].data,
                    select: this.selectKeys[key].select
                });
            }
        }
        return tmp;
    },
    // 分页信息总页数
    pagertotal() {
        return Math.ceil(this.pagination.total / this.pagination.size) || 0;
    },
    // 分页信息当前页
    pagercurrent() {
        return this.pagination.current || 1;
    },
    // 分页信息分页大小
    pagersize() {
        return this.pagination.size || 10;
    },
    // 获取当前页码
    Getpagercurrent() {
        return this.pager.current;
    },
    // 获取当前分页大小
    Getpagersize() {
        return this.pager.size;
    }
}