class ApplicationWindow {
    _appContainer;
    prevDragPosX;
    prevDragPosY;
    _top;
    _left;
    _width;
    _height;

    maximizeBtnState;
    prevWindowSize;

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

        this.maximizeBtnState = 'maximize';
        this.prevWindowSize = {
            t: this.top,
            l: this.left,
            w: this.width,
            h: this.height,
        };

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
        minimizeBtn.addEventListener(
            'click',
            (function (e) {
                this.minimize();
            }).bind(this)
        );

        let maximizeBtn = document.createElement('button');
        maximizeBtn.innerHTML = '[ ]'
        maximizeBtn.addEventListener(
            'click',
            (function (e) {
                if (this.maximizeBtnState === 'maximize') {
                    this.maximize();
                } else if (this.maximizeBtnState === 'restore') {
                    this.restore();
                } else {
                    console.log('invalid maximizeButton state');
                }
            }).bind(this)
        );

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
    maximize () {
        this.prevWindowSize.t = this._top,
        this.prevWindowSize.l = this._left,
        this.prevWindowSize.w = this._width,
        this.prevWindowSize.h = this._height,

        this.top = 0;
        this.left = 0;
        //full width and height
        this.width = getComputedStyle(this._appContainer.parentElement).width.slice(0, -2);
        this.height = getComputedStyle(this._appContainer.parentElement).height.slice(0, -2);

        this.maximizeBtnState = 'restore';
        maximizeBtn.innerHTML = '[]-';
    }
    restore () {
        this.top = this.prevWindowSize.t;
        this.left = this.prevWindowSize.l;
        this.width = this.prevWindowSize.w;
        this.height = this.prevWindowSize.h;

        this.maximizeBtnState = 'maximize';
        maximizeBtn.innerHTML = '[ ]';
    }
    minimize () {
        this._appContainer.style.display = 'none';
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