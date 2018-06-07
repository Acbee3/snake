(function (window) {
    function Food(map) {
        this.left = 0;
        this.top = 0;
        this._div = document.createElement('div');
        this._div.className = 'food';
        map.appendChild(this._div);
        this._map = map;

        // 生成随机位置
        this.random();
    }
    Food.prototype.random = function () {
        var maxY = this._map.clientHeight / 20 - 1;
        var maxX = this._map.clientWidth / 20 - 1;
        this.left = getRandom(0, maxX) * 20;
        this.top = getRandom(0, maxY) * 20;

        this._div.style.left = this.left + 'px';
        this._div.style.top = this.top + 'px';
    }

    /**
     * 生成min到max之间的随机整数，范围[min, max]
     * @param {Number} min 
     * @param {Number} max 
     */
    function getRandom(min, max) { 
        return parseInt(Math.random() * (max - min + 1)  + min);
    }

    // 10, 100 
    // 10, (100-10+1) + 10 = 101
    window.Food = Food;
})(window);