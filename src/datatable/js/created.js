export default function () {
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
}