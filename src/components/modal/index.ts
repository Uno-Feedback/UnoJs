/**
 * This file contains functions for creating and managing a modal dialog.
 * The `initialModal()` function creates a new modal dialog and returns a promise that resolves to the content element of the dialog.
 * The `showModal()` function shows the modal dialog.
 * The `hideModal()` function hides the modal dialog.
 * */

import {crossIcon} from "../../assets/svg";

/**
 * Create the necessary HTML elements for the modal.
 */
const fade: HTMLDivElement = document.createElement("div");
const modal: HTMLDivElement = document.createElement("div");
const header: HTMLDivElement = document.createElement("div");
const closeButton: HTMLSpanElement = document.createElement("span");
const content: HTMLDivElement = document.createElement("div");
const body: HTMLElement = document.querySelector("body") as HTMLElement;

/**
 * Initialize the initial inner elements of the modal.
 *
 * @param title - The title element for the modal.
 * @returns contet - The content element of the modal.
 */

const initialInnerElements = (title: HTMLElement) => {
  // Fade
  fade.classList.add("uno-modal-fade");
  fade.setAttribute("id", "uno-modal");
  body.appendChild(fade);

  // Modal
  modal.classList.add("uno-modal");
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
export const createTitle = (text: string): HTMLElement => {
  const title = document.createElement("h1");
  title.classList.add("uno-modal-title");
  title.innerHTML = text;
  return title;
};

/**
 * Initialize the modal and set up the close capability.
 *
 * @param title - The title element for the modal.
 * @param onCloseCallback - Callback function to be called when the modal is closed.
 * @returns prmise - A promise that resolves to the content element of the modal.
 */
const initialModal = async (title: HTMLElement, onCloseCallback: () => void) => {
  // Close modal
  closeButton.onclick = () => {
    onCloseCallback();
    hideModal();
  };
  hideModal();
  return new Promise<HTMLDivElement>(resolve => resolve(initialInnerElements(title)));
};

/**
 * Show the modal by adjusting styles.
 */
export const showModal = (): void => {
  body.style.overflow = "hidden";
  fade.style.display = "block";
};

/**
 * Hide the modal and remove associated elements.
 */
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

// Export the initialModal function as the default export.
export default initialModal;
