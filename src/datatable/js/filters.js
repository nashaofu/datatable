export default {
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
}