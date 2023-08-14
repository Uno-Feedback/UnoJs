import state from "./../../state";

const {autoSecretDataAttribute} = state;

export interface ElementInterface {}

const setBlur = (element: HTMLElement): void => {
  element.style.transition = "all 0.3s ease-in-out";
  element.style.filter = "blur(5px)";
  element.style.background = "#CCC";
  element.style.color = "#CCC";
};
const removeBlur = (element: HTMLElement): void => {
  element.style.transition = "";
  element.style.filter = "";
  element.style.background = "";
  element.style.color = "";
};
export const startSecret = (): void => {
  const secretAttributes = document.querySelectorAll(`[data-${autoSecretDataAttribute}]`);
  console.log({secretAttributes});
  console.log({secretKey: `[data-${autoSecretDataAttribute}]`});
  if (!autoSecretDataAttribute || !secretAttributes) {
    console.warn("Auto secret attribute is not set!");
    return;
  }
  secretAttributes.forEach(secretAttribute => {
    const element = secretAttribute as HTMLElement;
    setBlur(element);
    secretAttribute.addEventListener("mouseover", () => {
      removeBlur(element);
    });
    secretAttribute.addEventListener("mouseout", () => {
      setBlur(element);
    });
  });
};
export const endSecret = (): void => {
  const secretAttributes = document.querySelectorAll(`[data-${autoSecretDataAttribute}]`);
  console.log({secretAttributes});
  console.log({secretKey: `[data-${autoSecretDataAttribute}]`});
  if (!autoSecretDataAttribute || !secretAttributes) return;
  secretAttributes.forEach(secretAttribute => {
    const element = secretAttribute as HTMLElement;
    removeBlur(element);
  });
};
