export class Button extends HTMLElement {
    private shadow
    // public myProp: any

    public onClick: any
    // private name

    constructor() {
        super()

        this.shadow = this.attachShadow({ mode: 'open' })

        // console.log(this.getAttribute('test'))

        // this.observedAttributes()
        // this.name = this.getAttribute('name')
        // this.render()
    }

    connectedCallback() {
        this.render()
        const btn = this.shadow.querySelector('#button')
        // if (btn) {}
        // btn.myThing = { a: 13}
        // btn?.addEventListener('click', () => {
        //     // console.log('click')
        //     // console.log(this.getAttribute('name'))
        //     this.myProp()
        //     // this.dispatchEvent(new CustomEvent('event name', {bubbles: true, detail: {name: 'asdfad'}});
        // })
    }

    render() {
        this.shadow.innerHTML = `
            <button id="button" type="button">Click Me!</button>
        `
    }
}
