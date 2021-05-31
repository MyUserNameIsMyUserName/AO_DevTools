let WelcomePage = {
    elemId: "aoDevToolsPanel",
    title: `<svg width="60" height="60" viewBox="0 0 33 33">
    <polygon class="triangle" fill="none" stroke="#58f311" stroke-width="1" points="16,1 32,32 1,32" />
</svg><h2>/<span>A^O_Dev</span>/ Welcome<span class='blink'>_</span></h2>`,
    content: `<div class='half'><img src="https://cdn0.iconfinder.com/data/icons/web-development-47/64/demo-web-design-mockup-custom-template-512.png"/></div><div class='half'><h2>Easy way to say WTF is going on...</h2><h1>A^O_Developer Debugging Tool</h1></div>`,
    footer: `<p>A^O_DevTools - 2021</p>`,
    print() {
        document.querySelector(
            "#" + this.elemId + " .panel_title"
        ).innerHTML = this.title;
        document.querySelector(
            "#" + this.elemId + " .panel_content"
        ).innerHTML = this.content;
        document.querySelector(
            "#" + this.elemId + " .panel_footer"
        ).innerHTML = this.footer;
        console.log("printing");
    }
};

window.onload = WelcomePage.print();
