window.addEventListener('load', function () {
    var imgIndex = 0;
    var flag = true;
    var arrow_l = this.document.querySelector('.arrow_l');
    var arrow_r = this.document.querySelector('.arrow_r');
    var focus = this.document.querySelector('.focus');
    // 增加按钮显示隐藏功能
    focus.addEventListener('mouseenter', function () {
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        // 鼠标移入取消自动播放
        clearInterval(timer);
        timer = null;
    });
    focus.addEventListener('mouseleave', function () {
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        // 鼠标离开继续自动播放
        timer = setInterval(() => {
            arrow_r.click();
        }, 2000);
    });

    // 动态生成小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    for (var i = 0; i < ul.children.length-1; i++) {
        const li = document.createElement('li');
        var index = 0;
        li.addEventListener('click', function (e) {
            for (var i = 0; i < ol.children.length; i++) {

                ol.children[i].className = '';
                if (ol.children[i] == this) {
                    index = i;
                }
            }
            this.className = 'current';
            // 移动图片
            imgIndex = index;
            animate(ul, -focus.offsetWidth * index);
        });
        ol.appendChild(li);

    }
    ol.firstElementChild.className = 'current';
    // 轮播图手动翻页
    
    arrow_r.addEventListener('click', function (e) {
        if (flag){
            flag = false;
            imgIndex++;
            animate(ul, -imgIndex * focus.offsetWidth, function () {
                if (imgIndex == ul.children.length - 1) {
                    imgIndex = 0;
                    ul.style.left = 0;
                }
                circleChange();
                flag = true;
            });
        }
    });
    arrow_l.addEventListener('click', function (e) {
        if (flag){
            flag = false;
            if (imgIndex == 0){
                imgIndex = ul.children.length - 1;
                ul.style.left = -imgIndex * focus.offsetWidth +'px';
            }
            imgIndex--;
            animate(ul, -imgIndex * focus.offsetWidth, function () {
                
                circleChange();
                flag = true;
            });
        }
    });
    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[imgIndex].className = 'current';
    }
    // 自动播放
    var timer = setInterval(() => {
        arrow_r.click();
    }, 2000);
});

