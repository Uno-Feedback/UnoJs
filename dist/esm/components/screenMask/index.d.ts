declare class ScreenMask {
    private moved;
    private clicked;
    private startPosition;
    private element;
    constructor();
    createElement: () => HTMLDivElement;
    removeElement: (element: HTMLDivElement) => void;
    removeAllElements: () => void;
    mousedownListener: (event: MouseEvent) => void;
    mousemoveListener: (event: MouseEvent) => void;
    mouseupListener: () => void;
    addMouseEvents: () => void;
    removeMouseEvents: () => void;
    start: () => void;
    stop: () => void;
}
export default ScreenMask;
