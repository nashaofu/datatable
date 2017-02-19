export default function () {
    return {
        // 可排序的列
        sortKeys: {},
        // 可搜索的列
        searchKeys: {},
        // 可选择的行
        selectKeys: {},
        // 选择全部
        selectall: false,
        // 页码信息
        pager: {
            total: 0,
            current: 1,
            size: 10
        }
    }
}