import {crossIcon} from "../../assets/svg";

const fade = document.createElement("div");
const modal = document.createElement("div");
const header = document.createElement("div");
const closeButton = document.createElement("span");
const content = document.createElement("div");
const body = document.querySelector("body") as HTMLElement;

const initialInnerElements = (title: HTMLElement) => {
  // Fade
  fade.classList.add("uno-modal-fade");
  body.appendChild(fade);
  // Modal
  modal.classList.add("uno-modal");
  fade.appendChild(modal);
  // Header
  modal.classList.add("uno-modal-header");
  modal.appendChild(header);
  // Title
  header.appendChild(title);
  // Close Button
  closeButton.setAttribute("id", "uno-modal-close");
  closeButton.classList.add("uno-modal-close");
  closeButton.innerHTML = crossIcon;
  closeButton.onclick = () => hideModal();
  header.appendChild(closeButton);
  // Content
  content.classList.add("uno-modal-content");
  modal.appendChild(content);
  return content;
};

const initialModal = async (title: HTMLElement) => new Promise(resolve => resolve(initialInnerElements(title)));
export const showModal = () => {
  body.style.overflow = "hidden";
  fade.style.display = "block";
};
export const hideModal = () => {
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
