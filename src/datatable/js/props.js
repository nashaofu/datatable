export default {
    // 表格渲染数据
    data : {
        type: Array,
        default() {
            return [];
        }
    },
    // 列配置
    columns : {
        type: Array,
        default() {
            return [];
        }
    },
    // 表格配置选项
    options : {
        type: Object,
        default() {
            return {
                // 排序
                sortable: false,
                // 搜索
                searchable: false,
                // 多选
                selectable: false,
                // 分页
                pageable: false
            };
        }
    },
    // 分页数据
    pagination : {
        type: Object,
        default() {
            return {
                // 总数据条数
                total: 0,
                // 当前页码
                current: 1,
                // 每页显示条数
                size: 10
            }
        }
    }
}