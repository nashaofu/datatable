export default {
    data: {
        type: Array,
        default() {
            return [];
        }
    },
    columns: {
        type: Array,
        default() {
            return [];
        }
    },
    options: {
        type: Object,
        default() {
            return {};
        }
    },
    pagination: {
        type: Object,
        default() {
            return {
                total: 0,
                current: 1,
                size: 10
            }
        }
    }
}