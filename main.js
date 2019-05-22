window.onload = function() {
    canvas.style.display = 'none';
    score.style.display = 'none';

}

let setDifficult = document.querySelector('.set_difficult');
let lose = document.querySelector('.repeat_or_back');
setDifficult.onclick = function(event) {
    if (event.target == easy) {
        difficult = 100;
        console.log(difficult);
    } else if (event.target == medium) {
        difficult = 90;
        console.log(difficult);
    } else if (event.target == hard) {
        difficult ==70;
        console.log(difficult);
    }
    if (event.target == easy ||event.target == medium || event.target == hard) {
        canvas.style.display = '';
        score.style.display = '';
        setDifficult.style.display = 'none'
        createFood();
        main();
        document.addEventListener('keydown', changeDirection)
    }
}

