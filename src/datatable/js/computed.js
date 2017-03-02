export default {
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
        // 循环数据 取出所有数据的下标(获取最长的下标)
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
    // 内部分页信息
    pager() {
        const total = Math.ceil(this.pagination.total / this.pagination.size) || 0;
        const current = this.pagination.current;
        const size = this.pagination.size;
        const pagination = {
            total: total,
            current: current,
            size: size
        }
        return pagination;
    }
}