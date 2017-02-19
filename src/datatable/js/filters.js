export default {
    // 过滤单元格显示文字
    filter(value) {
        const row = value.row;
        const col = value.col;
        if (!col.key || !row[col.key]) {
            return col.default;
        }
        return row[col.key];
    },
    // 当没有数据时计算表格td所占列数
    colspan(value) {
        const cols = value.cols;
        const selectable = value.selectable;
        if (selectable) {
            return cols.length + 1;
        }
        return cols.length;
    }
}