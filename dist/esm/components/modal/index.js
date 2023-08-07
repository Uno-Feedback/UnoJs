var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { crossIcon } from "../../assets/svg";
const fade = document.createElement("div");
const modal = document.createElement("div");
const header = document.createElement("div");
const closeButton = document.createElement("span");
const content = document.createElement("div");
const body = document.querySelector("body");
const initialInnerElements = (title) => {
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
const initialModal = (title) => __awaiter(void 0, void 0, void 0, function* () { return new Promise(resolve => resolve(initialInnerElements(title))); });
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
//# sourceMappingURL=index.js.map