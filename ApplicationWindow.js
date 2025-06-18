class ApplicationWindow {
    appContainer;

    constructor () {
        const desktop = document.getElementById('win10-desktop');

        this.appContainer = document.createElement('div');
        this.appContainer.className = 'win10-app-window';

        this.appContainer.style.top = '150px';
        this.appContainer.style.left = '100px';
        this.appContainer.style.width = '600px';
        this.appContainer.style.height = '400px';

        let titleBar = document.createElement('div');

        let minimizeBtn = document.createElement('button');
        minimizeBtn.innerHTML = '--'

        let maximizeBtn = document.createElement('button');
        maximizeBtn.innerHTML = '[ ]'

        let closeBtn = document.createElement('button');
        closeBtn.innerHTML = 'X'
        closeBtn.className = "win10-app-window-closebtn"
        closeBtn.onclick = () => desktop.removeChild(this.appContainer);
        
        titleBar.appendChild(closeBtn);
        titleBar.appendChild(maximizeBtn);
        titleBar.appendChild(minimizeBtn);

        let embed = document.createElement('object');
        embed.type = 'text/html';
        embed.data = 'assets/appdata/testing-app/index.html';

        this.appContainer.appendChild(titleBar);
        this.appContainer.appendChild(embed);
        desktop.appendChild(this.appContainer);
    }

    close () {
        //document.getElementById('win10-desktop').removeChild(this.appContainer);
        this.appContainer.remove();
    }
}