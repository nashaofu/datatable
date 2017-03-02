<template>
    <div class="datatable">
        <!--数据表格-->
        <div class="datatable-table">
            <table>
                <thead>
                    <tr>
                        <!--全选按钮-->
                        <th v-if="options.selectable && cols.length">
                            <label class="datatable-table-checkbox">
                                <input type="checkbox" v-model="selectall" @click="selecthandle">
                                <span class="checkbox" :class="{ checked: selectall }"></span>
                            </label>
                        </th>
                        <!--字段标题及其排序-->
                        <th
                            v-for="item in cols"
                            :class="{ 'datatable-table-sortable': options.sortable && item.sortable }"
                        >
                            <!--字段标题-->
                            <div class="datatable-table-title">{{ item.title }}</div>
                            <!--排序-->
                            <div
                                v-if="options.sortable && item.sortable && item.key && sort[item.key]"
                                class="datatable-table-sortbutton"
                            >
                                <!--排序ASC-->
                                <a
                                    href="javascript:void(0)"
                                    :class="{ 'datatable-table-sortbyasc': sort[item.key].order === 'ASC' }"
                                    @click="sorthandle(item.key, 'asc')"
                                >
                                    <span class="angle-up"></span>
                                </a>
                                <!--排序DESC-->
                                <a
                                    href="javascript:void(0)"
                                    :class="{ 'datatable-table-sortbydesc': sort[item.key].order === 'DESC' }"
                                    @click="sorthandle(item.key, 'desc')"
                                >
                                    <span class="angle-down"></span>
                                </a>
                            </div>
                        </th>
                    </tr>
                    <tr v-if="options.searchable">
                        <!--如果有选择按钮,则第一列显示为空-->
                        <th v-if="options.selectable && cols.length">
                            <span>-</span>
                        </th>
                        <!--搜索框-->
                        <th
                            v-for="item in cols"
                            class="datatable-table-search"
                        >
                            <input
                                v-if="item.searchable && item.key && search[item.key]"
                                type="text"
                                :placeholder="item.title"
                                v-model="search[item.key].keyword"
                            >
                            <span v-else>-</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row,index) in rows">
                        <!--显示选择按钮-->
                        <td v-if="options.selectable">
                            <label class="datatable-table-checkbox">
                                <input type="checkbox" v-model="select[index].select">
                                <span class="checkbox" :class="{ checked: select[index].select }"></span>
                            </label>
                        </td>
                        <!--显示数据的单元格-->
                        <td v-for="col in cols">
                            <slot
                                :name="col.key"
                                :row="row"
                            >
                                {{ { row: row, col: col } | filter }}
                            </slot>
                        </td>
                    </tr>
                    <!--没有数据时显示效果-->
                    <tr v-if="!rows.length">
                        <td
                            class="datatable-table-empty"
                            :colspan="{ cols: cols, selectable: options.selectable } | colspan"
                        >
                            <span>:(</span>
                            <span>没有数据</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--分页信息-->
        <div
            class="datatable-pagination"
            v-if="options.pageable"
        >
            <!--分页统计-->
            <div class="datatable-pagination-total">
                <span>共 {{ pagination.total || 0 }} 条</span>
                <span>{{ pager.size }} 条/页</span>
            </div>
            <!--分页按钮-->
            <ul class="datatable-pagination-pager">
                <!--上一页-->
                <li
                    :class="{ disabled: pager.current <= 1 }"
                    @click="pagehandle('prev')"
                >
                    <a href="javascript:void(0)">上一页</a>
                </li>
                <!--第一页-->
                <li
                    :class="{ active: pager.current === 1 }"
                    @click="pagehandle(1)"
                >
                    <a href="javascript:void(0)">1</a>
                </li>
                <!--中间过渡页码-->
                <li v-if="pager.current - 3 > 1">
                    <a href="javascript:void(0)">...</a>
                </li>
                <!--当前页的前面第2页-->
                <li
                    v-if="pager.current - 2 > 1"
                    @click="pagehandle(pager.current - 2)"
                >
                    <a href="javascript:void(0)">{{ pager.current - 2 }}</a>
                </li>
                <!--当前页的前一页-->
                <li
                    v-if="pager.current - 1 > 1"
                    @click="pagehandle(pager.current - 1)"
                >
                    <a href="javascript:void(0)">{{ pager.current - 1 }}</a>
                </li>
                <!--当前页-->
                <li
                    v-if="pager.current != 1 && pager.current != pager.total"
                    class="active"
                >
                    <a href="javascript:void(0)">{{ pager.current }}</a>
                </li>
                <!--当前页的后一页-->
                <li
                    v-if="pager.current + 1 < pager.total"
                    @click="pagehandle(pager.current + 1)"
                >
                    <a href="javascript:void(0)">{{ pager.current + 1 }}</a>
                </li>
                <!--当前页的后面第2页-->
                <li
                    v-if="pager.current + 2 < pager.total"
                    @click="pagehandle(pager.current + 2)"
                >
                    <a href="javascript:void(0)">{{ pager.current + 2 }}</a>
                </li>
                <!--中间过渡页码-->
                <li v-if="pager.current + 3 < pager.total">
                    <a href="javascript:void(0)">...</a>
                </li>
                <!--最后一页-->
                <li v-if="pager.total > 1"
                    :class="{ active: pager.current === pager.total }"
                    @click="pagehandle(pager.total)"
                >
                    <a href="javascript:void(0)">{{ pager.total }}</a>
                </li>
                <!--下一页-->
                <li
                    :class="{ disabled: pager.current >= pager.total }"
                    @click="pagehandle('next')"
                >
                    <a href="javascript:void(0)">下一页</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    // props参数
    import props from './js/props';
    // data监控数据
    import data from './js/data';
    // 计算属性
    import computed from './js/computed';
    // watcher监控数据
    import watch from './js/watch';
    // 过滤器
    import filters from './js/filters';
    // 组件创建事件
    import created from './js/created';
    // 组建方法
    import methods from './js/methods';

    // 组件数据
    export default {
        name: 'datatable',
        props,
        data,
        computed,
        watch,
        filters,
        created,
        methods
    }

</script>
<style
    src="./datatable.less"
    lang="less"
></style>