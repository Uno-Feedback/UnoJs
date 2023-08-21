/**
 * This component provides a way to blur elements with the `autoSecretKey` attribute.\
 * The `autoSecretKey` attribute is a way to mark elements that should be blurred when the user hovers over them.\
 * The `startSecret()` function starts blurring all elements with the autoSecretKey attribute.\
 * The `endSecret()` function stops blurring all elements with the autoSecretKey attribute.
 */

import optionsState from "./../../state";

const setBlur = (element: HTMLElement): void => {
  // Set the blur effect on the element.
  element.style.transition = "all 0.3s ease-in-out";
  element.style.filter = "blur(5px)";
  element.style.background = "#CCC";
  element.style.color = "#CCC";
};

const removeBlur = (element: HTMLElement): void => {
  // Remove the blur effect on the element.
  element.style.transition = "";
  element.style.filter = "";
  element.style.background = "";
  element.style.color = "";
};

export const startSecret = (): void => {
  // Get all elements with the autoSecretKey attribute.
  const secretAttributes = document.querySelectorAll(`[data-${optionsState.autoSecretKey}]`);
  // If the `autoSecretKey` attribute is not set, or there are no elements with the attribute, return.
  if (!optionsState.autoSecretKey || !secretAttributes) {
    console.warn("Auto secret attribute is not set!");
    return;
  }
  // For each element with the `autoSecretKey` attribute, set the blur effect.
  secretAttributes.forEach(secretAttribute => {
    const element = secretAttribute as HTMLElement;
    setBlur(element);
    // Add a mouseenter event listener to the element to remove the blur effect when the mouse enters the element.
    secretAttribute.addEventListener("mouseover", () => {
      removeBlur(element);
    });
    // Add a mouseout event listener to the element to add the blur effect back when the mouse leaves the element.
    secretAttribute.addEventListener("mouseout", () => {
      setBlur(element);
    });
  });
};
export const endSecret = (): void => {
  // Get all elements with the `autoSecretKey` attribute.
  const secretAttributes = document.querySelectorAll(`[data-${optionsState.autoSecretKey}]`);
  // If the autoSecretKey attribute is not set, or there are no elements with the attribute, return.
  if (!optionsState.autoSecretKey || !secretAttributes) return;

  // For each element with the autoSecretKey attribute, remove the blur effect.
  secretAttributes.forEach(secretAttribute => {
    const element = secretAttribute as HTMLElement;
    removeBlur(element);
  });
};
