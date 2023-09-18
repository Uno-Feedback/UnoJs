import initialModal, {hideModal, showModal} from "../modal";
import optionsState from "../../shared/states";
import {attachmentIcon, avatarIcon, submitIcon} from "../../assets/svg";
import Observable from "../observable";
import {
  AppendFormToModalFunction,
  CreateContentFunction,
  CreateFooterFunction,
  CreateFormFunction,
  CreateInputFunction,
  CreateRadioFunction,
  CreateRadioWrapperFunction,
  CreateSenderInformationFunction,
  CreateTextAreaFunction,
  HandleSubmitFunction,
  InitialInnerElementsFunction,
  StoreInterface
} from "./type";
import request from "../request";
import { lang } from "../../shared/langs";

const storeValues: StoreInterface = {
  type: "1",
  priority: "3",
  subject: "",
  description: ""
};

const title = document.createElement("h1");
const content = document.createElement("div");
const submitButton = document.createElement("button");
const footer = document.createElement("div");
const attachment = document.createElement("div");
const attachmentIconElement = document.createElement("span");
const attachmentName = document.createElement("span");
const attachmentSize = document.createElement("span");
const form = document.createElement("div");
const formRow = document.createElement("div");

const onChangeValue = (event: Event): void => {
  const {name, value} = event.target as HTMLInputElement;
  storeValues[name] = value;
};
const disableButton = (element: HTMLButtonElement): void => {
  element.classList.add("disabled");
  element.disabled = true;
};
const enableButton = (element: HTMLButtonElement): void => {
  element.classList.remove("disabled");
  element.disabled = false;
};
const handleError = (element: HTMLElement): void => {
  element.style.border = "1px solid red";
  element.style.backgroundColor = "#F8D7DA";
};
const clearError = (element: HTMLElement): void => {
  element.style.borderColor = "#E1E1E1";
  element.style.backgroundColor = "#FFF";
};
const validateForm = (): boolean => {
  const subject = document.getElementById("subject") as HTMLInputElement;
  const description = document.getElementById("description") as HTMLInputElement;
  if (!storeValues.subject) {
    handleError(subject);
    return false;
  }
  if (!storeValues.description) {
    handleError(description);
    return false;
  }
  return true;
};
const handleSubmit: HandleSubmitFunction = (acceptButton, onSubmit) => {
  if (!validateForm()) return;
  onSubmit();
  disableButton(acceptButton);
  Observable.subscribe("enableButton", () => enableButton(acceptButton));
};
const createTitle = (): HTMLElement => {
  title.classList.add("uno-modal-title");
  title.innerText = lang.fa.requestForm.title;
  return title;
};
const createFooter: CreateFooterFunction = ({fileName, fileSize}, onSubmit) => {
  // Footer
  footer.classList.add("uno-form-footer");
  // - Attachment
  attachment.classList.add("uno-form-attachment");
  // - Attachment Icon
  attachmentIconElement.classList.add("uno-form-attachment-icon");
  attachmentIconElement.innerHTML = attachmentIcon;
  attachment.appendChild(attachmentIconElement);
  // - Attachment Name
  attachmentName.classList.add("uno-form-attachment-name");
  attachmentName.innerText = `${fileName}.mp4`;
  attachment.appendChild(attachmentName);
  // - Attachment Time
  attachmentSize.classList.add("uno-form-attachment-size");
  attachmentSize.innerText = fileSize;
  attachment.appendChild(attachmentSize);
  // - Append Attachment to Footer
  footer.appendChild(attachment);
  // - Submit Button
  submitButton.classList.add("uno-form-submit");
  const submitButtonText = document.createElement("span");
  const submitButtonIcon = document.createElement("span");
  submitButtonText.innerText = lang.fa.requestForm.submit;
  submitButtonIcon.innerHTML = submitIcon;
  submitButton.appendChild(submitButtonText);
  submitButton.appendChild(submitButtonIcon);
  submitButton.onclick = () => {
    handleSubmit(submitButton, onSubmit);
  };
  // - Append Submit Button to Footer
  footer.appendChild(submitButton);
};
const createInput: CreateInputFunction = (row, col, inputLabel, label, name, initialValue, hasPlaceholder) => {
  // Input
  const input = document.createElement("input") as HTMLInputElement;
  input.classList.add("uno-form-input");
  //// Input properties
  input.setAttribute("id", name);
  input.setAttribute("name", name);
  input.setAttribute("type", "text");
  if (hasPlaceholder) input.setAttribute("placeholder", label);
  input.onchange = event => onChangeValue(event);
  input.onfocus = () => clearError(input);
  if (initialValue) input.value = initialValue;
  // Label
  inputLabel.innerText = label;
  inputLabel.setAttribute("for", name);
  // Input and Label append to col
  col.appendChild(inputLabel);
  col.appendChild(input);
  // Col append to wrapper
  row.appendChild(col);
};
const createRadio: CreateRadioFunction = (row, col, options, active, label, name) => {
  // Create label
  const span = document.createElement("span");
  const groupLabel = span.cloneNode(true) as HTMLElement;
  groupLabel.classList.add("uno-form-radio-group-label");
  groupLabel.innerText = `${label}:`;

  // Create radio input
  const input = document.createElement("input");
  input.setAttribute("type", "radio");
  input.setAttribute("name", name);
  input.classList.add("uno-form-radio-input");
  input.onchange = onChangeValue;

  // Create radio label
  const radioLabel = document.createElement("label");
  radioLabel.classList.add("uno-form-radio-label");

  // Create badge
  const badge = span.cloneNode(true) as HTMLElement;
  badge.classList.add("uno-form-radio-badge");

  // Wrapper
  const radioWrapper = document.createElement("div") as HTMLElement;
  radioWrapper.classList.add("uno-form-radio-wrapper");
  radioWrapper.appendChild(groupLabel);

  // Reset all label styles to default
  const resetLabelsStyle = () => {
    options.forEach(item => {
      const label = document.querySelector(`label[for="id-${name}-${item.value}"]`) as HTMLElement;
      label.style.borderColor = "#D0D0D0";
    });
  };

  const changeLabelStyle = (input: HTMLInputElement, label: HTMLElement) => {
    if (input.checked) {
      label.style.borderColor = "#5150AE";
    } else {
      label.style.borderColor = "#D0D0D0";
    }
  };

  options.forEach((item, index) => {
    const cloneInput = input.cloneNode(true) as HTMLInputElement;
    cloneInput.value = item.value;
    cloneInput.onchange = onChangeValue;
    cloneInput.setAttribute("id", `id-${name}-${item.value}`);

    const cloneLabel = radioLabel.cloneNode(true) as HTMLElement;

    if (item.color) {
      const cloneBadge = badge.cloneNode(true) as HTMLInputElement;
      cloneBadge.style.backgroundColor = item.color;
      cloneLabel.appendChild(cloneBadge);
    }

    if (index === active ?? 0) {
      cloneInput.setAttribute("checked", "checked");
    }

    const cloneSpan = span.cloneNode(true) as HTMLElement;
    cloneSpan.innerText = item.label;

    cloneLabel.appendChild(cloneSpan);
    cloneLabel.setAttribute("for", `id-${name}-${item.value}`);

    radioWrapper.appendChild(cloneInput);
    radioWrapper.appendChild(cloneLabel);
    cloneInput.onclick = () => {
      resetLabelsStyle();
      changeLabelStyle(cloneInput, cloneLabel);
    };
  });

  col.appendChild(radioWrapper);
  // Col append to wrapper
  row.appendChild(col);
};
const createTextArea: CreateTextAreaFunction = (row, col, textAreaLabel, label, name, hasPlaceholder) => {
  /* todo add creators most return element for encapsulation */
  // TextArea
  const textArea = document.createElement("textarea");
  textArea.classList.add("uno-form-textarea");
  //// TextArea property
  textArea.setAttribute("id", name);
  textArea.setAttribute("name", name);
  textArea.setAttribute("rows", "6");
  if (hasPlaceholder) textArea.setAttribute("placeholder", label);
  textArea.onchange = onChangeValue;
  textArea.onfocus = () => clearError(textArea);
  // Label
  textAreaLabel.innerText = label;
  textAreaLabel.setAttribute("for", name);
  // TextArea and Label append to col
  col.appendChild(textAreaLabel);
  col.appendChild(textArea);
  // Col append to wrapper
  row.appendChild(col);
};
const createSenderInformation: CreateSenderInformationFunction = (row, col, label, {fullName, avatar, email}) => {
  const sender = document.createElement("div");
  sender.classList.add("uno-form-sender");
  const span = document.createElement("span");
  // Label
  const labelElement = span.cloneNode(true) as HTMLElement;
  labelElement.classList.add("uno-form-sender-label");
  labelElement.innerText = label + ":";
  // Avatar
  const localAvatar = avatarIcon;
  const avatarElement = document.createElement("img");
  avatarElement.classList.add("uno-form-sender-avatar");
  avatarElement.setAttribute("alt", "avatar");
  avatarElement.setAttribute("src", avatar ?? "data:image/svg+xml;base64," + btoa(localAvatar));
  // Information
  const infoElement = span.cloneNode(true) as HTMLElement;
  infoElement.classList.add("uno-form-sender-info");
  // Full name
  const fullNameElement = span.cloneNode(true) as HTMLElement;
  fullNameElement.classList.add("uno-form-sender-full-name");
  fullNameElement.innerText = fullName;
  // Email
  const emailElement = span.cloneNode(true) as HTMLElement;
  emailElement.classList.add("uno-form-sender-email");
  emailElement.innerText = email;

  infoElement.appendChild(emailElement);
  infoElement.appendChild(fullNameElement);

  sender.appendChild(labelElement);
  sender.appendChild(avatarElement);
  sender.appendChild(infoElement);

  col.appendChild(sender);
  row.appendChild(col);
};
const createRadioWrapper: CreateRadioWrapperFunction = (row, col) => {
  const div = document.createElement("div") as HTMLElement;
  const container = div.cloneNode(true);
  const buttonGroup = div.cloneNode(true) as HTMLElement;
  buttonGroup.style.display = "flex";
  buttonGroup.style.alignItems = "center";
  buttonGroup.style.justifyContent = "space-between";
  const innerCol = div.cloneNode(true);

  // Type
  ///// Bug: 1
  ///// Report: 2
  const typeOptions = [
    {label: lang.fa.requestForm.type.bug, value: "1", color: "#EF0303"},
    {label: lang.fa.requestForm.type.report, value: "2", color: "#0FE800"}
  ];
  createRadio(buttonGroup, innerCol.cloneNode(true) as HTMLElement, typeOptions, 0, "نوع بازخورد", "type");

  // Priority
  //// highest: 1
  //// high: 2
  //// medium: 3
  //// low: 4
  //// lowest: 5
  //// critical: 6
  const priorityOptions = [
    {label: lang.fa.requestForm.priority.low, value: "4", color: "#F79008"},
    {label: lang.fa.requestForm.priority.medium, value: "3", color: "#2A70FE"},
    {label: lang.fa.requestForm.priority.high, value: "2", color: "#E14EB6"}
  ];
  createRadio(buttonGroup, innerCol.cloneNode(true) as HTMLElement, priorityOptions, 1, "اولویت", "priority");
  container.appendChild(buttonGroup);
  col.appendChild(container);
  // Col append to buttonGroup
  row.appendChild(col);
};
const createForm: CreateFormFunction = ({fullName, email, avatar}) => {
  // Wrapper
  form.classList.add("uno-form");
  // Row
  formRow.classList.add("uno-form-row");
  form.appendChild(formRow);
  // Col
  const col = document.createElement("div");
  col.classList.add("uno-form-col");
  // Divider
  const divider = document.createElement("div");
  divider.classList.add("uno-form-divider");
  // Input Label
  const inputLabel = document.createElement("label");
  inputLabel.classList.add("uno-form-label");
  // Create sender information
  createSenderInformation(formRow, col.cloneNode(true) as HTMLElement, lang.fa.requestForm.sender, {
    fullName,
    avatar,
    email
  });
  formRow.appendChild(divider.cloneNode(true));
  createRadioWrapper(formRow, col.cloneNode(true) as HTMLElement);
  formRow.appendChild(divider.cloneNode(true));
  // Subject
  createInput(
    formRow,
    col.cloneNode(true) as HTMLElement,
    inputLabel.cloneNode(true) as HTMLElement,
    lang.fa.requestForm.subject,
    "subject",
    ""
  );
  formRow.appendChild(divider.cloneNode(true));
  // Description
  createTextArea(
    formRow,
    col.cloneNode(true) as HTMLElement,
    inputLabel.cloneNode(true) as HTMLElement,
    lang.fa.requestForm.description,
    "description"
  );
  return form;
};
const createContent: CreateContentFunction = ({fullName, email, avatar}) => {
  content.setAttribute("id", "uno-request-form");
  content.appendChild(createForm({fullName, email, avatar}));
};
const initialInnerElements: InitialInnerElementsFunction = (
  {fullName, email, avatar},
  {fileSize, fileName},
  onSubmit
) => {
  createContent({fullName, email, avatar});
  createFooter({fileSize, fileName}, onSubmit);
};

/**
 * Append Form to Modal
 * ////////////////////
 * **/

const appendFormToModal: AppendFormToModalFunction = ({fullName, email, avatar}, {fileSize, fileName}, onSubmit) => {
  initialModal(createTitle(), () => destroyRequestForm()).then(modalContent => {
    initialInnerElements({fullName, email, avatar}, {fileSize, fileName}, onSubmit);
    modalContent.appendChild(content).appendChild(footer);
    showModal();
  });
};

/**
 * Open Form Request Modal
 * ///////////////////////
 * **/
function formatBytes(bytes: number, decimals = 2): string {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function createName(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  let mm: number | string = now.getMonth() + 1; // Months start at 0
  let dd: number | string = now.getDate();
  let HH: number | string = now.getHours();
  let MM: number | string = now.getMinutes();
  let SS: number | string = now.getSeconds();

  if (dd < 10) dd = `0${dd}`;
  if (mm < 10) mm = `0${mm}`;
  if (HH < 10) HH = `0${HH}`;
  if (MM < 10) MM = `0${MM}`;
  if (SS < 10) SS = `0${SS}`;

  return `${yyyy}-${mm}-${dd}_-_${HH}:${MM}:${SS}`;
}

const closeRequestFormModal = (): void => {
  hideModal();
  destroyRequestForm();
  /* todo set loading false*/
};

const destroyRequestForm = () => {
  /**
   * Destroy Footer
   */
  submitButton.replaceChildren();
  attachment.replaceChildren();
  footer.remove();
  /**
   * Destroy Content
   */
  formRow.replaceChildren();
  form.replaceChildren();
  content.replaceChildren();
  content.remove();
};

const openRequestFormModal = (recordedBlob: Blob): void => {
  const fileSize = formatBytes(recordedBlob.size, 2);

  const {fullName, email, avatar} = optionsState.user;
  appendFormToModal({fullName, email, avatar}, {fileSize, fileName: createName()}, () => {
    /* todo set loading true */
    request(recordedBlob, createName(), storeValues)
      .then(response => {
        console.info(`[uno-js] Response: ${response.message}`);
        closeRequestFormModal();
      })
      .catch(error => {
        console.error(`[uno-js] ${error}`);
      });
  });
};

export default openRequestFormModal;
