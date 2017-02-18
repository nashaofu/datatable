export default {
    sort(key, order) {
        this.sortKeys[key] = {
            key: key,
            order: order
        }
    },
    // 全选按钮click事件
    // change事件在IE上会先执行change事件后改变值
    // 所以不使用change事件
    select(nVal, oVal) {
        // 初始化选择的数据
        const selectKeys = {};
        // 有BUG数据(data)更新后会仍然记住是否选择
        for (let i = 0, length = this.rows.length; i < length; i++) {
            selectKeys[i] = {
                data: this.rows[i],
                select: this.selectall
            }
        }
        this.selectKeys = selectKeys;
    },
    pageprev() {
        if (this.pager.current > 1) {
            this.pager.current--;
        }
    },
    pagenext() {
        if (this.pager.current < this.pager.total) {
            this.pager.current++;
        }
    },
    page(page) {
        if (page >= 1 && page <= this.pager.total) {
            this.pager.current = page;
        }
    }
}