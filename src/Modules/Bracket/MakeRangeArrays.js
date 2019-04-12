function MakeRangeArrays(obj) {
    if (obj !== undefined){
        const range = (start, end) => {
            const length = end - start;
            return Array.from({ length }, (_, i) => start + i);
        }
        obj.rowIdxs = range(1, obj.rows + 1)
        obj.colIdxs = range(1, obj.columns + 1)
    }
    return obj
}

export default MakeRangeArrays