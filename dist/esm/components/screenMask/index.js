import { crossIcon } from "../../assets/svg";
class ScreenMask {
    constructor() {
        this.createElement = () => {
            // Create elements
            const element = document.createElement("div");
            const close = document.createElement("div");
            close.classList.add("close");
            close.innerHTML = crossIcon;
            // Set attributes
            element.setAttribute("id", `mask-element-${Math.random().toString(16).slice(2)}`);
            // Add event listener to close
            close.addEventListener("click", () => this.removeElement(element));
            // Append close to element
            element.appendChild(close);
            // Append element to body
            document.body.appendChild(element);
            return element;
        };
        this.removeElement = (element) => element.remove();
        this.removeAllElements = () => {
            const elements = document.querySelectorAll(`[id^='mask-element-']`);
            elements.forEach(element => element.remove());
        };
        this.mousedownListener = (event) => {
            const x = event.pageX;
            const y = event.pageY;
            this.startPosition = { x, y };
            this.clicked = true;
        };
        this.mousemoveListener = (event) => {
            var _a;
            const x = event.pageX;
            const y = event.pageY;
            const innerWidth = window.innerWidth;
            const innerHeight = window.innerHeight;
            if (this.clicked) {
                event.preventDefault();
                if (!this.moved)
                    this.element = this.createElement();
                if (!this.element)
                    return;
                //// Position of element
                let right = this.startPosition.x < x ? this.startPosition.x : x > innerWidth ? innerWidth - 5 : x;
                let left = x < 5 ? 5 : x < this.startPosition.x ? x : this.startPosition.x;
                //////// Get direction of page
                const body = document.querySelector("body");
                const direction = (_a = getComputedStyle(body).direction) !== null && _a !== void 0 ? _a : "ltr";
                if (direction === "rtl") {
                    right = x < this.startPosition.x ? innerWidth - this.startPosition.x : x < innerWidth ? innerWidth - x : 0;
                    left = x < this.startPosition.x ? innerWidth - x : innerWidth - this.startPosition.x;
                }
                this.element.style.top = `${this.startPosition.y < y ? this.startPosition.y : y < 5 ? 5 : y}px`;
                this.element.style.bottom = `${y < this.startPosition.y ? this.startPosition.y : y > innerHeight ? innerHeight - 5 : y}px`;
                this.element.style.right = `${right}px`;
                this.element.style.left = `${left}px`;
                //// Width and height of element
                this.element.style.width = `${this.startPosition.x > x
                    ? x < 0
                        ? this.startPosition.x - 5
                        : this.startPosition.x - x
                    : x > innerWidth
                        ? innerWidth - this.startPosition.x - 5
                        : x - this.startPosition.x}px`;
                this.element.style.height = `${this.startPosition.y > y
                    ? y < 0
                        ? this.startPosition.y - 5
                        : this.startPosition.y - y
                    : y > innerHeight
                        ? innerHeight - this.startPosition.y - 5
                        : y - this.startPosition.y}px`;
                this.moved = true;
            }
        };
        this.mouseupListener = () => {
            this.moved = false;
            this.clicked = false;
        };
        this.addMouseEvents = () => {
            document.addEventListener("mousedown", this.mousedownListener);
            document.addEventListener("mousemove", this.mousemoveListener);
            document.addEventListener("mouseup", this.mouseupListener);
        };
        this.removeMouseEvents = () => {
            // release memory
            document.removeEventListener("mousedown", this.mousedownListener);
            document.removeEventListener("mousemove", this.mousemoveListener);
            document.removeEventListener("mouseup", this.mouseupListener);
        };
        this.start = () => {
            this.addMouseEvents();
        };
        this.stop = () => {
            this.removeMouseEvents();
        };
        this.moved = false;
        this.clicked = false;
        this.startPosition = { x: 0, y: 0 };
        this.element = null;
    }
}
export default ScreenMask;
//# sourceMappingURL=index.js.map