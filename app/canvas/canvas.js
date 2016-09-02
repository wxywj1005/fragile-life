app.controller('canvasCtrl',['$scope',function ($scope) {
    var SMALL = 5;//不加px,因为画布.lineWidth属性值是没有px的
    var MIDDLE = 15;
    var LARGE = 25;
    var XLARGE = 40;
    var canvas;
    var canvas_2d;
    var pen = {
        state : false,
        size : SMALL,
        color : 'black'
    };
    var eraser = {
        state : false,
        size : SMALL
    };
        canvas = $('.canvas_containter').get(0);
        canvas.width = "800px";
        canvas = $('#myCanvas').get(0);
    console.log(canvas)
    canvas = document.getElementById('myCanvas')

    canvas.width = $('.canvas_containter').width();
    canvas.height = $('.canvas_containter').height();
    canvas_2d = canvas.getContext("2d");
    canvas_2d.lineCap = 'round';
    canvas_2d.lineWidth = pen.size;
    function toggleLeftBar() {
        var leftBar = $('.left_bar')
        if (leftBar.css("width")!=0+'px') {
            leftBar.animate({'width' : 0+'px'}, 'slow');
        }
        else
            leftBar.animate({'width': 13+'%'},'slow');
    }
    /*选择橡皮*/
    function eraserClick(event) {
        /*如果点击之前橡皮擦处于被选中状态，先取消其状态*/
        if (pen.state) {
            pen.state = !pen.state;
        }
        if (!eraser.state) {
            eraser.state = !eraser.state;
        }
    };
    /*选择画笔*/
    function penClick(event) {
        /*如果点击之前橡皮擦处于被选中状态，先取消其状态*/
        if (eraser.state) {
            eraser.state = !eraser.state;
        }
        if (!pen.state) {
            pen.state = !pen.state;
        }
    }
    $(document).ready(function() {


        /*添加触摸事件*/
        document.addEventListener('touchstart', touched,false);
        document.addEventListener('touchmove', touched,false);
        document.addEventListener('touchend', touched,false);
        /*触摸事件*/
        var c_x;
        var c_y;
        var c_now_x;
        var c_now_y;
        function touched(e) {
            if(e.touches.length==1){
                switch (e.type) {
                    case 'touchstart':
                        if(e.changedTouches[0].clientX>$('.show_icon').width()){
                            e.preventDefault();
                            c_x = e.changedTouches[0].clientX;
                            c_y = e.changedTouches[0].clientY;
                        }
                        break;
                    case 'touchmove':
                        if (pen.state) {
                            c_now_x = e.changedTouches[0].clientX;
                            c_now_y = e.changedTouches[0].clientY;
                            canvas_2d.beginPath();
                            canvas_2d.moveTo(c_x, c_y);
                            canvas_2d.lineTo(c_now_x,c_now_y);
                            canvas_2d.stroke();
                            canvas_2d.closePath();
                            c_x = c_now_x;
                            c_y = c_now_y;
                            break;
                        }
                        if(eraser.state){
                            c_x_now = e.changedTouches[0].clientX;
                            c_y_now = e.changedTouches[0].clientY;
                            canvas_2d.clearRect(c_x,c_y,eraser.size*2,eraser.size*2);
                            c_x = c_x_now;//一次迭代后讲当前的瞬间坐标值赋给上次鼠标坐标值
                            c_y = c_y_now;
                            break;
                        }
                }	}
        }
    });
    /*大小切换*/
    function sizeToggle(e) {
        switch (e.id) {
            case 'sm':
                if(pen.state){
                    pen.size = SMALL;
                    canvas_2d.lineWidth = pen.size
                }
                else
                if (eraser.state) {
                    eraser.size = SMALL;
                    canvas_2d.lineWidth = eraser.size
                }
                break;
            case 'md':
                if(pen.state){
                    pen.size = MIDDLE;
                    canvas_2d.lineWidth = pen.size
                }
                else
                if (eraser.state) {
                    eraser.size = MIDDLE;
                    canvas_2d.lineWidth = eraser.size
                }
                break;
            case 'lg':
                if(pen.state){
                    pen.size = LARGE;
                    canvas_2d.lineWidth = pen.size
                }
                else
                if (eraser.state) {
                    eraser.size = LARGE;
                    canvas_2d.lineWidth = eraser.size
                }
                break;
            case 'xl':
                if(pen.state){
                    pen.size = XLARGE;
                    canvas_2d.lineWidth = pen.size
                }
                else
                if (eraser.state) {
                    eraser.size = XLARGE;
                    canvas_2d.lineWidth = eraser.size
                }
                break;
            default:
// statements_def
                break;
        }
    }
}]);