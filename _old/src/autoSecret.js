import initialState from './initialState';

const setBlur = (element) => {
  element.style.transition = 'all 0.3s ease-in-out';
  element.style.filter = 'blur(5px)';
  element.style.webkitFilter = 'blur(5px)';
  element.style.mozFilter = 'blur(5px)';
  element.style.oFilter = 'blur(5px)';
  element.style.msFilter = 'blur(5px)';
  element.style.background = '#CCC';
  element.style.color = '#CCC';
};
const removeBlur = (element) => {
  element.style.transition = '';
  element.style.filter = '';
  element.style.webkitFilter = '';
  element.style.mozFilter = '';
  element.style.oFilter = '';
  element.style.msFilter = '';
  element.style.background = '';
  element.style.color = '';
};
export const startSecret = () => {
  const secretAttributes = document.querySelectorAll(`[data-${initialState.info.autoSecretDataAttribute}]`);
  console.log({secretAttributes});
  console.log({secretKey: `[data-${initialState.info.autoSecretDataAttribute}]`});
  if (!initialState.info.autoSecretDataAttribute || !secretAttributes) {
    console.warn('Auto secret attribute is not set!');
    return;
  }
  secretAttributes.forEach(secretAttribute => {
    setBlur(secretAttribute);
    secretAttribute.addEventListener('mouseover', () => {
      removeBlur(secretAttribute);
    });
    secretAttribute.addEventListener('mouseout', () => {
      setBlur(secretAttribute);
    });
  });
};
export const endSecret = () => {
  const secretAttributes = document.querySelectorAll(`[data-${initialState.info.autoSecretDataAttribute}]`);
  console.log({secretAttributes});
  console.log({secretKey: `[data-${initialState.info.autoSecretDataAttribute}]`});
  if (!initialState.info.autoSecretDataAttribute || !secretAttributes) return;
  secretAttributes.forEach(secretAttribute => {
    removeBlur(secretAttribute);
  });
};
