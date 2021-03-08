$(function () {

    var i = 0;

    var $btn = $('.section-btn li'),

        $wrap = $('.section-wrap'),

        $arrow = $('.arrow');

    /*当前页面赋值*/

    function up() {
        i++;
        if (i == $btn.length) {
            i = $btn.length - 1
        };
    }

    function down() {
        i--;
        if (i < 0) {
            i = 0
        };
    }

    /*页面滑动*/

    function run() {

        $btn.eq(i).addClass('on').siblings().removeClass('on');

        $wrap.attr("class", "section-wrap").addClass(function () {
            return "put-section-" + i;
        }).find('.section').eq(i).find('.title').addClass('active');
        setTimeout(function(){
            if (i == $btn.length - 1) {
                $arrow.addClass('in');
            }else{
                $arrow.removeClass('in');
            }    
        },1000)
    };

    /*右侧按钮点击*/

    $btn.each(function (index) {

        $(this).click(function () {

            i = index;

            run();

        })

    });

    /*翻页按钮点击*/

    $arrow.one('click', go);

    function go() {
        i++;
        if (i == $btn.length) {
            i = 0;
        };
        run();
        setTimeout(function () {
            $arrow.one('click', go)
        }, 1000);
    };

    /*响应鼠标*/

    $wrap.one('mousewheel', mouse_);

    function mouse_(event) {

        if (event.deltaY < 0) {
            up()
        } else {
            down()
        }

        run();

        setTimeout(function () {
            $wrap.one('mousewheel', mouse_)
        }, 1000)

    };

    /*响应键盘上下键*/

    $(document).one('keydown', k);

    function k(event) {

        var e = event || window.event;

        var key = e.keyCode || e.which || e.charCode;

        switch (key) {

            case 38:
                down();
                run();

                break;

            case 40:
                up();
                run();

                break;

        };

        setTimeout(function () {
            $(document).one('keydown', k)
        }, 1000);

    }
});