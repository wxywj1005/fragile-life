app.filter('rankFilter',function () {
    return function (rank) {
        switch (rank){
            case 1 : return "必须做";
            case 2 : return "非常重要";
            case 3 : return "重要";
            case 4 : return "可更换时间";
            case 5 : return "可选择性做";
        }
    }
})
    .filter('rankToColor',function () {
        return function (rank) {
            switch (rank){
                case 1 : return "#ff9999";
                case 2 : return "#ffff00";
                case 3 : return "#ffffb3";
                case 4 : return "#c6ffb3";
                case 5 : return "#ccffff";
            }
        }
    })


;