(function (window) {
    function Snake(map) {
        // 蛇运动的方向
        this.direction = 'right';
        // 第一个元素是蛇头
        this.body = [];
        this._map = map;

        // 初始化的时候，map上没有蛇，需要来创建蛇身体和蛇头
        for (var i = 0; i < 3; i++) {
            this.insertHead(this.headLocation());
        }
    }
    Snake.prototype.insertHead = function (location) {
        // 1. 获取当前的蛇头，标记为身体
        var head = this.body[0] || {};
        // 因为要插入一个蛇头，所以这节该为body
        head.className = 'snake-body';
        // 2. 创建新的蛇头
        var newHead = document.createElement('div');
        newHead.className = 'snake-head';
        newHead.style.top = location.top + 'px';
        newHead.style.left = location.left + 'px';
        this._map.appendChild(newHead);

        // 把元素插入到数组的第一个位置
        this.body.unshift(newHead);
    }

    Snake.prototype.headLocation = function () {
        // 1. 如果蛇的body属性长度为0，第一个放进入的认为是蛇头
        if (this.body.length === 0) {
            return {left: 0, top: 0};
        }
        
        // 2. 如果蛇不为空，取出蛇头的位置
        var head = this.body[0];
        var left = head.offsetLeft;
        var top = head.offsetTop;
        var step = 20;

        // 3. 判断蛇运动的方向
        switch (this.direction) {
            case 'right': 
                left += 20;
                break;
            case 'left':
                left -= 20;
                break;
            case 'top': 
                top -= 20;
                break;
            case 'bottom':
                top += 20;
                break;
        }
        return {left: left, top: top};
    }

    // 移动蛇
    /**
     * 
     * @param {*} food 
     * @returns 返回值 布尔类型，true 游戏结束，false 游戏不结束
     */
    Snake.prototype.move = function (food) {
        // 获取蛇头的新位置
        var location = this.headLocation();
        // 1. 判断蛇是否死亡
        if (this.isDead(location)) {
            return true;
        }

        // 2. 蛇移动的过程中判断是否吃到食物
        if (location.left === food.left && location.top === food.top) {
            // 吃到食物，加蛇肉，重新生成食物的位置
            this.insertHead(location);
            food.random();
            return false;
        }

        // 3. 蛇移动
        var currentHead = this.body[0];
        currentHead.className = 'snake-body';

        var currentTail = this.body.pop();
        currentTail.className = 'snake-head';
        currentTail.style.left = location.left + 'px';
        currentTail.style.top = location.top + 'px';
        this.body.unshift(currentTail);
        return false;
    }

    // 判断蛇是否死亡
    Snake.prototype.isDead = function (location) {
        return (location.left < 0 || 
            location.top < 0 || 
            location.left >= 800 || 
            location.top >= 600
        );
    }
    window.Snake = Snake;
})(window);