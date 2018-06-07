(function (window) {
    function Game(map) {
        this.food = new Food(map);
        this.food.random();
        this.snake = new Snake(map);
    }

    Game.prototype.start = function () {
        var game = this;
        // 开启定时器，移动蛇
        var timerId = setInterval(function () {
            var gameOver = game.snake.move(game.food);
            if (gameOver) {
                alert('游戏结束');
                clearInterval(timerId);
            }
        }, 100);

        document.onkeydown = function (e) {
            // 37 左 38 上 39 右 40 下
            console.log(e.keyCode);
            switch (e.keyCode) {
                case 37:
                    if (game.snake.direction === 'right') {
                        return;
                    }
                    game.snake.direction = 'left';
                    break;
                case 38:
                    if (game.snake.direction === 'bottom') {
                        return;
                    }
                    game.snake.direction = 'top';
                    break;
                case 39:
                    if (game.snake.direction === 'left') {
                        return;
                    }
                    game.snake.direction = 'right';
                    break;
                case 40:
                    if (game.snake.direction === 'top') {
                        return;
                    }
                    game.snake.direction = 'bottom';
                    break;
            }
        }
    }

    window.Game = Game;
})(window);