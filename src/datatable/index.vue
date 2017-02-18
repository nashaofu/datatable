<template>
    <div class="datatable">
        <div class="datatable-table">
            <table>
                <thead>
                    <tr>
                        <th v-if="selectable">
                            <label class="datatable-table-checkbox">
                                <input type="checkbox" v-model="selectall" @click="select">
                                <span class="checkbox" :class="{ checked: selectall }"></span>
                            </label>
                        </th>
                        <th
                            v-for="item in cols"
                            :class="{ 'datatable-table-sortable': sortable && item.sortable }"
                        >
                            <div class="datatable-table-title">{{ item.title }}</div>
                            <div
                                v-if="sortable && item.sortable && item.data && sortKeys[item.data]"
                                class="datatable-table-sortbutton"
                            >
                                <a
                                    href="javascript:void(0)"
                                    :class="{ 'datatable-table-sortbyasc': sortKeys[item.data].order === 'asc' }"
                                    @click="sort(item.data, 'asc')"
                                >
                                    <span class="angle-up"></span>
                                </a>
                                <a
                                    href="javascript:void(0)"
                                    :class="{ 'datatable-table-sortbydesc': sortKeys[item.data].order === 'desc' }"
                                    @click="sort(item.data, 'desc')"
                                >
                                    <span class="angle-down"></span>
                                </a>
                            </div>
                        </th>
                    </tr>
                    <tr v-if="searchable">
                        <th v-if="selectable">
                            <span>-</span>
                        </th>
                        <th
                            v-for="item in cols"
                            class="datatable-table-search"
                        >
                            <input
                                v-if="item.searchable && item.data && searchKeys[item.data]"
                                type="text"
                                :placeholder="item.title"
                                v-model="searchKeys[item.data].keyword"
                            >
                            <span v-else>-</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row,index) in rows">
                        <td v-if="selectable">
                            <label class="datatable-table-checkbox">
                                <input type="checkbox" v-model="selectKeys[index].select">
                                <span class="checkbox" :class="{ checked: selectKeys[index].select }"></span>
                            </label>
                        </td>
                        <td v-for="col in cols">
                            {{ { row: row, col: col } | filter }}
                        </td>
                    </tr>
                    <tr v-if="!rows.length">
                        <td :colspan="{ cols: cols, selectable: selectable } | colspan">没有数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="datatable-pagination">
            <ul>
                <li
                    v-for="item in pagination"
                    @click="page"
                >
                    <a href="javascript:void(0)">{{ item }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import props from './js/props';
    import data from './js/data';
    import computed from './js/computed';
    import watch from './js/watch';
    import filters from './js/filters';
    import created from './js/created';
    import methods from './js/methods';
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