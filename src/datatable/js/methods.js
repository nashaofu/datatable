export default {
    // 排序按钮点击
    sorthandle(key, order) {
        this.sort[key] = {
            key: key,
            order: order
        }
    },
    // 全选按钮click事件 change事件在IE上会先执行change事件后改变值 所以不使用change事件
    selecthandle(nVal, oVal) {
        // 初始化选择的数据
        const selectKeys = [];
        // 有BUG数据(data)更新后会仍然记住是否选择
        for (let i = 0, length = this.rows.length; i < length; i++) {
            selectKeys.push({data: this.rows[i], select: this.selectall});
        }
        this.select = selectKeys;
    },
    // 分页按钮点击事件
    pagehandle(page) {
        let current = this.pager.current;
        const total = this.pager.total;
        const size = this.pager.size;
        if ('number' === typeof page) {
            if (page >= 1 && page <= total) {
                current = page;
            }
        } else {
            // 上一页
            if (page === 'prev' && current > 1) {
                current--;
            }
            // 下一页
            if (page === 'next' && current < total) {
                current++;
            }
        }
        if (current !== this.pager.current) {
            this.$emit('page', {
                total: total,
                current: current,
                size: size
            });
        }
    }
}