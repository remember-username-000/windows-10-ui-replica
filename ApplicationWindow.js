class ApplicationWindow {
    _appContainer;
    prevDragPosX;
    prevDragPosY;
    _top;
    _left;
    _width;
    _height;

    constructor () {
        const desktop = document.getElementById('win10-desktop');

        this.prevDragPosX = 0;
        this.prevDragPosY = 0;

        this._appContainer = document.createElement('div');
        this._appContainer.className = 'win10-app-window';

        this.top = 150;
        this.left = 100;
        this.width = 600;
        this.height = 400;

        let titleBar = document.createElement('div');

        titleBar.addEventListener(
            'mousedown', 
            (function (e) {
                this.prevDragPosX = e.clientX;
                this.prevDragPosY = e.clientY;
                embed.style.pointerEvents = 'none';

                let handleMouseMove = (function (e) {
                    this.top = this._top + (e.clientY - this.prevDragPosY);
                    this.left = this._left + (e.clientX - this.prevDragPosX);
                    this.prevDragPosX = e.clientX;
                    this.prevDragPosY = e.clientY;
                }).bind(this);
                let handleMouseUp = function (e) {
                    embed.style.pointerEvents = 'auto';
                    window.removeEventListener('mousemove', handleMouseMove);
                    window.removeEventListener('mouseup', handleMouseUp);
                }
                window.addEventListener(
                    'mousemove',
                    handleMouseMove
                );
                window.addEventListener(
                    'mouseup',
                    handleMouseUp
                );
            })
            .bind(this)
        );

        let minimizeBtn = document.createElement('button');
        minimizeBtn.innerHTML = '--'

        let maximizeBtn = document.createElement('button');
        maximizeBtn.innerHTML = '[ ]'

        let closeBtn = document.createElement('button');
        closeBtn.innerHTML = 'X'
        closeBtn.className = "win10-app-window-closebtn"
        closeBtn.onclick = () => desktop.removeChild(this._appContainer);
        
        titleBar.appendChild(closeBtn);
        titleBar.appendChild(maximizeBtn);
        titleBar.appendChild(minimizeBtn);

        let embed = document.createElement('object');
        embed.type = 'text/html';
        embed.data = 'assets/appdata/testing-app/index.html';

        this._appContainer.appendChild(titleBar);
        this._appContainer.appendChild(embed);
        desktop.appendChild(this._appContainer);
    }

    close () {
        //document.getElementById('win10-desktop').removeChild(this._appContainer);
        this._appContainer.remove();
    }

    set top(val) {
        this._top = val;
        this._appContainer.style.top = val + 'px';
    }
    set left(val) {
        this._left = val;
        this._appContainer.style.left = val + 'px';
    }
    set width(val) {
        this._width = val;
        this._appContainer.style.width = val + 'px';
    }
    set height(val) {
        this._height = val;
        this._appContainer.style.height = val + 'px';
    }
}