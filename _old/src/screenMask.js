class ScreenMask {
  moved;
  clicked;
  startPosition;
  element;
  createElement = () => {
    // Create elements
    const element = document.createElement('div');
    element.style.borderRadius = '6px';
    const close = document.createElement('div');
    element.addEventListener('mouseover', () => {
      close.style.visibility = 'visible';
      close.style.opacity = '1';
    });
    element.addEventListener('mouseout', () => {
      close.style.visibility = 'hidden';
      close.style.opacity = '0';
    });
    close.style.position = 'absolute';
    close.style.top = '0';
    close.style.right = '0';
    close.style.width = '16px';
    close.style.height = '16px';
    close.style.transform = 'translate(6px, -6px)';
    close.style.cursor = 'pointer';
    close.style.color = 'black';
    close.style.border = '1px solid black';
    close.style.backgroundColor = 'white';
    close.style.borderRadius = '50%';
    close.style.fontSize = '7px';
    close.style.display = 'flex';
    close.style.alignItems = 'center';
    close.style.justifyContent = 'center';
    close.style.visibility = 'hidden';
    close.style.opacity = '0';
    close.style.transition = 'all 0.3s ease';
    close.innerText = '✖';
    // Set attributes
    element.setAttribute('id', `mask-element-${Math.random().toString(16).slice(2)}`);
    // Add event listener to close
    close.addEventListener('click', () => this.removeElement(element));
    // Append close to element
    element.appendChild(close);
    // Append element to body
    document.body.appendChild(element);
    return element;
  };
  removeElement = (element) => element.remove();
  removeAllElements = () => {
    const elements = document.querySelectorAll(`[id^='mask-element-']`);
    elements.forEach(element => element.remove());
  };
  mousedownListener = (event) => {
    const x = event.pageX;
    const y = event.pageY;
    this.startPosition = {x, y};
    this.clicked = true;
  };
  mousemoveListener = (event) => {
    const x = event.pageX;
    const y = event.pageY;
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    if (this.clicked) {
      event.preventDefault();
      if (!this.moved) this.element = this.createElement();
      if (!this.element) return;
      // Style
      //// Background color of element
      this.element.style.backgroundColor = 'black';
      //// CSS position of element
      this.element.style.position = 'absolute';
      //// Position of element
      let right = this.startPosition.x < x ? this.startPosition.x : (x > innerWidth ? innerWidth - 5 : x);
      let left = x < 5 ? 5 : (x < this.startPosition.x ? x : this.startPosition.x);
      //////// Get direction of page
      const direction = getComputedStyle(document.querySelector('body')).direction;
      if (direction === 'rtl') {
        right = x < this.startPosition.x ? (innerWidth - this.startPosition.x) : (x < innerWidth ? innerWidth - x : 0);
        left = x < this.startPosition.x ? (innerWidth - x) : (innerWidth - this.startPosition.x);
      }
      this.element.style.top = `${this.startPosition.y < y ? this.startPosition.y : (y < 5 ? 5 : y)}px`;
      this.element.style.bottom = `${y < this.startPosition.y ? this.startPosition.y : (y > innerHeight ? innerHeight - 5 : y)}px`;
      this.element.style.right = `${right}px`;
      this.element.style.left = `${left}px`;
      //// Width and height of element
      this.element.style.width = `${this.startPosition.x > x ? (x < 0 ? this.startPosition.x - 5 : this.startPosition.x - x) : (x > innerWidth ? innerWidth - this.startPosition.x - 5 : x - this.startPosition.x)}px`;
      this.element.style.height = `${this.startPosition.y > y ? (y < 0 ? this.startPosition.y - 5 : this.startPosition.y - y) : (y > innerHeight ? innerHeight - this.startPosition.y - 5 : y - this.startPosition.y)}px`;
      this.moved = true;
    }
  };
  mouseupListener = () => {
    this.moved = false;
    this.clicked = false;
  };
  addMouseEvents = () => {
    document.addEventListener('mousedown', this.mousedownListener);
    document.addEventListener('mousemove', this.mousemoveListener);
    document.addEventListener('mouseup', this.mouseupListener);
  };
  removeMouseEvents = () => {
    // release memory
    document.removeEventListener('mousedown', this.mousedownListener);
    document.removeEventListener('mousemove', this.mousemoveListener);
    document.removeEventListener('mouseup', this.mouseupListener);
  };
  init = (initial) => {
    if (!initial) {
      this.removeMouseEvents();
      return;
    }
    this.addMouseEvents();
  };
}

export default ScreenMask;