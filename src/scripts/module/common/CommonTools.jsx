const CommonTools = {

    getCharForNumber(i) {
        return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".substring(i, i + 1);
    },

    renderColor(_status) {
        switch (_status) {
            case 0: {
                //无火
                return '#8BC34A';
            }
            case 1: {
                //有火
                return '#f44336';
            }
            case 2: {
                //报警
                return '#FFEB3B';
            }
            case 3: {
                //离线
                return '#9E9E9E';
            }
        }
    }

}

export default CommonTools;