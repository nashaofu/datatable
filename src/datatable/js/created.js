export default function () {
    // 初始化选择的数据
    const rows = this.rows;
    const select = {};
    /************************************************************
     *          +++有BUG数据更新后会仍然记住是否选择+++         *
     *        -------------------------------------------       *
     ************************************************************/
    for (let i = 0, length = rows.length; i < length; i++) {
        select[i] = {
            data: rows[i],
            select: false
        }
    }
    // 获取可选择的数据
    this.select = select;

    // 初始化排序数据及其搜索数据
    const cols = this.cols;
    const sort = {};
    const search = {};
    for (let i = 0, length = cols.length; i < length; i++) {
        if (cols[i].key) {
            // 可排序的列
            sort[cols[i].key] = {
                key: cols[i].key,
                order: null
            };
            // 可搜索的列
            search[cols[i].key] = {
                key: cols[i].key,
                keyword: null
            }
        }
    }
    this.sort = sort;
    this.search = search;
}