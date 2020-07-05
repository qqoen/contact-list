class Spinner {
    private readonly el: HTMLElement;
    private readonly cssClass = 'spinner';
    private iconEl?: HTMLElement;

    constructor(selector: string) {
        this.el = document.querySelector(selector);
    }

    public start() {
        this.el.classList.add(this.cssClass);
        
        const iconEl = document.createElement('div');
        iconEl.classList.add('spinner-icon');
        document.body.append(iconEl);
        this.iconEl = iconEl;
    }

    public stop() {
        this.el.classList.remove(this.cssClass);

        if (this.iconEl != null) {
            this.iconEl.remove();
            this.iconEl = undefined;
        }
    }
}

export const spinner = new Spinner('#app');
