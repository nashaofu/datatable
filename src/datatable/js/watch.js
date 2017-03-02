// 搜索延时优化
let timer = null;

export default {
    // 列表行数据
    rows(nVal, oVal) {
        const rows = nVal;
        const select = [];
        // 有BUG数据更新后会仍然记住是否选择
        for (let i = 0, length = rows.length; i < length; i++) {
            let selected = this.select[i] && this.select[i].select;
            select.push({
                data: rows[i],
                select: selected || false
            });
        }
        this.select = select;
    },
    // 列表列数据
    cols(nVal, oVal) {
        const sort = {};
        const search = {};
        const cols = nVal;
        for (let i = 0, length = cols.length; i < length; i++) {
            if (cols[i].key) {
                let order = this.sort[cols[i].key] && this.sort[cols[i].key].order;
                sort[cols[i].key] = {
                    key: cols[i].key,
                    order: order || null
                };
                let keyword = this.search[cols[i].key] && this.search[cols[i].key].keyword;
                search[cols[i].key] = {
                    key: cols[i].key,
                    keyword: keyword || null
                }
            }
        }
        this.sort = sort;
        this.search = search;
    }
}