export default {
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
                // 完全拷贝
                tmp.push({
                    key: this.sortKeys[key].key,
                    order: this.sortKeys[key].order
                });
            }
        }
        return tmp;
    },
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
    pagertotal() {
        return Math.ceil(this.pagination.total / this.pagination.size);
    },
    pagercurrent() {
        return this.pagination.current;
    },
    pagersize() {
        return this.pagination.size;
    },
    Getpagercurrent() {
        return this.pager.current;
    },
    Getpagersize() {
        return this.pager.size;
    }
}