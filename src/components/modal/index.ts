import {crossIcon} from "../../assets/svg";

const fade: HTMLDivElement = document.createElement("div");
const modal: HTMLDivElement = document.createElement("div");
const header: HTMLDivElement = document.createElement("div");
const closeButton: HTMLSpanElement = document.createElement("span");
const content: HTMLDivElement = document.createElement("div");
const body: HTMLElement = document.querySelector("body") as HTMLElement;

const initialInnerElements = (title: HTMLElement) => {
  // Fade
  fade.classList.add("uno-modal-fade");
  body.appendChild(fade);
  // Modal
  modal.classList.add("uno-modal");
  modal.setAttribute("id", "uno-modal");
  fade.appendChild(modal);
  // Header
  header.classList.add("uno-modal-header");
  modal.appendChild(header);
  // Title
  header.appendChild(title);
  // Close Button
  closeButton.setAttribute("id", "uno-modal-close");
  closeButton.classList.add("uno-modal-close");
  closeButton.innerHTML = crossIcon;
  header.appendChild(closeButton);
  // Content
  content.classList.add("uno-modal-content");
  modal.appendChild(content);
  return content;
};

const initialModal = async (title: HTMLElement, onCloseCallback: () => void) => {
  // Close modal
  closeButton.onclick = () => {
    onCloseCallback();
    hideModal();
  };
  return new Promise<HTMLDivElement>(resolve => resolve(initialInnerElements(title)));
};
export const showModal = (): void => {
  body.style.overflow = "hidden";
  fade.style.display = "block";
};
export const hideModal = (): void => {
  body.style.overflow = "";
  fade.remove();
  modal.remove();
  header.innerHTML = "";
  header.remove();
  closeButton.remove();
  content.innerHTML = "";
  content.remove();
};
export default initialModal;
