window.addEventListener('load', function () {
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');

    // 当鼠标经过图片 显示或隐藏放大镜
    preview_img.addEventListener('mouseover', function () {
        mask.style.display = 'block';
        big.style.display = 'block';
    });
    preview_img.addEventListener('mouseout', function () {
        mask.style.display = 'none';
        big.style.display = 'none';
    });

    preview_img.addEventListener('mousemove', function (e) {
        // 计算鼠标在盒子内的坐标
        var x = e.pageX - this.offsetLeft - mask.offsetWidth / 2;
        var y = e.pageY - this.offsetTop - mask.offsetHeight / 2;
        if (x < 0) {
            x = 0;
        }
        if (y < 0) {
            y = 0;
        }
        // mask 最大移动距离
        var maxWidth = preview_img.offsetWidth - mask.offsetWidth;
        var maxHeight = preview_img.offsetHeight - mask.offsetHeight;
        if (x > maxWidth) {
            x = maxWidth;
        }
        if (y > maxHeight) {
            y = maxHeight;
        }
        mask.style.left = x + 'px';
        mask.style.top = y + 'px';

        var bigImg = document.querySelector(".bigImg");
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        var bigX = x*bigMax / maxWidth;
        var bigY = y*bigMax / maxHeight;

        bigImg.style.left = -bigX + 'px';
        bigImg.style.top = -bigY + 'px';
    });
})