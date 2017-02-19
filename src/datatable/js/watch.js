// 搜索延时优化
let timer = null;

export default {
    // 排序
    sortable(nVal, oVal) {
        if (!nVal) {
            for (let key in this.sortKeys) {
                this.sortKeys[key].order = null;
            }
        }
    },
    // 搜索
    searchable(nVal, oVal) {
        if (!nVal) {
            for (let key in this.searchKeys) {
                this.searchKeys[key].keyword = null;
            }
        }
    },
    // 选择
    selectable(nVal, oVal) {
        if (!nVal) {
            for (let key in this.selectKeys) {
                this.selectall = false;
                this.selectKeys[key].select = false;
            }
        }
    },
    // 列表行数据
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
    // 列表列数据
    cols(nVal, oVal) {
        const sortKeys = {};
        const searchKeys = {};
        const cols = nVal;
        for (let i = 0, length = cols.length; i < length; i++) {
            if (cols[i].key) {
                let order = this.sortKeys[cols[i].key] && this.sortKeys[cols[i].key].order;
                sortKeys[cols[i].key] = {
                    key: cols[i].key,
                    order: order || null
                };
                let keyword = this.searchKeys[cols[i].key] && this.searchKeys[cols[i].key].keyword;
                searchKeys[cols[i].key] = {
                    key: cols[i].key,
                    keyword: keyword || null
                }
            }
        }
        this.sortKeys = sortKeys;
        this.searchKeys = searchKeys;
    },
    // 排序数据变化
    Getsort(nVal, oVal) {
        // 判断是否新旧值相等
        // watcher只能够比较基本类型的数据值
        // 防止初始化时触发事件及其误触发
        if (JSON.stringify(nVal) === JSON.stringify(oVal)) {
            return;
        }
        this.$emit('sort', nVal);
    },
    // 搜索数据变化
    Getsearch(nVal, oVal) {
        // 判断是否新旧值相等
        // watcher只能够比较基本类型的数据值
        // 防止初始化时触发事件及其误触发
        if (JSON.stringify(nVal) === JSON.stringify(oVal)) {
            return;
        }
        // 防止一直发生
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
            this.$emit('search', nVal);
        }, 300);
    },
    // 选中数据变化
    Getselect(nVal, oVal) {
        // 判断是否全选
        if (nVal.length && nVal.length === this.rows.length) {
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
    },
    // 页码总数变化
    pagertotal(nVal, oVal) {
        this.pager = {
            total: nVal,
            current: this.pagercurrent,
            size: this.pagersize
        }
    },
    // 当前页码变化
    pagercurrent(nVal, oVal) {
        this.pager = {
            total: this.pagertotal,
            current: nVal,
            size: this.pagersize
        }
    },
    // 分页大小变化
    pagersize(nVal, oVal) {
        this.pages = {
            total: this.pagestotal,
            current: this.pagercurrent,
            size: nVal
        }
    },
    // 获取当前页的数据变化处理
    Getpagercurrent(nVal, oVal) {
        this.$emit('page', {
            current: this.pager.current,
            size: this.pager.size
        });
    },
    // 获取当前分页大小的数据变化处理
    Getpagersize(nVal, oVal) {
        this.$emit('page', {
            current: this.pager.current,
            size: this.pager.size
        });
    }
}