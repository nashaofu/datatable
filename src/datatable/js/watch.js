export default {
    sortable(nVal, oVal) {
        if (!nVal) {
            for (let key in this.sortKeys) {
                this.sortKeys[key].order = null;
            }
        }
    },
    searchable(nVal, oVal) {
        if (!nVal) {
            for (let key in this.searchKeys) {
                this.searchKeys[key].keyword = null;
            }
        }
    },
    selectable(nVal, oVal) {
        if (!nVal) {
            for (let key in this.selectKeys) {
                this.selectall = false;
                this.selectKeys[key].select = false;
            }
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
    },
    Getsort(nVal, oVal) {
        // 判断是否新旧值相等
        // watcher只能够比较基本类型的数据值
        // 防止初始化时触发事件及其误触发
        if (JSON.stringify(nVal) === JSON.stringify(oVal)) {
            return;
        }
        this.$emit('sort', nVal);
    },
    Getsearch(nVal, oVal) {
        // 判断是否新旧值相等
        // watcher只能够比较基本类型的数据值
        // 防止初始化时触发事件及其误触发
        if (JSON.stringify(nVal) === JSON.stringify(oVal)) {
            return;
        }
        // 防止一直发生
        this.timer && clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.$emit('search', nVal);
        }, 300);
    },
    Getselect(nVal, oVal) {
        // 判断是否全选
        if (nVal.length === this.rows.length) {
            this.selectall = true;
        } else {
            this.selectall = false;
        }
        // 判断是否新旧值相等
        // watcher只能够比较基本类型的数据值
        // 防止初始化时触发事件及其误触发
        if (JSON.stringify(nVal) === JSON.stringify(oVal)) {
            return;
        }
        this.$emit('select', nVal);
    }
}