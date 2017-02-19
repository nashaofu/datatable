export default {
    filter(value) {
        const row = value.row;
        const col = value.col;
        if (!col.data || !row[col.data]) {
            return col.default;
        }
        return row[col.data];
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