import initialModal, {createTitle, hideModal, showModal} from "../modal";
import optionsState from "../../shared/states";
import {attachmentIcon, /*avatarIcon,*/ submitIcon} from "../../assets/svg";
import Observable from "../observable";
import {
  AppendFormToModalFunction,
  CreateContentFunction,
  CreateFooterFunction,
  CreateFormFunction,
  CreateInputFunction,
  CreateRadioFunction,
  CreateRadioWrapperFunction,
  CreateSelectFunction,
  // CreateSenderInformationFunction,
  CreateTextAreaFunction,
  HandleSubmitFunction,
  InitialInnerElementsFunction,
  StoreInterface
} from "./type";
import request from "../request";
import {lang} from "../../shared/langs";

const storeValues: StoreInterface = {
  type: "1",
  priority: "3",
  subject: "",
  description: ""
};

const content = document.createElement("div");
const contentInner = document.createElement("div");
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
  element.classList.add("uno-form-input-error");
};
const clearError = (element: HTMLElement): void => {
  element.classList.remove("uno-form-input-error");
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
const handleSubmit: HandleSubmitFunction = (acceptButton, onSubmit): void => {
  if (!validateForm()) return;
  onSubmit();
  disableButton(acceptButton);
  Observable.subscribe("enableButton", () => enableButton(acceptButton));
};

const createFooter: CreateFooterFunction = ({fileName, fileSize}, onSubmit): void => {
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
const createInput: CreateInputFunction = (
  row,
  col,
  inputLabel,
  label,
  name,
  initialValue,
  hasPlaceholder,
  isRequired
) => {
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
  inputLabel.innerHTML = `${label}${isRequired ? "<span>*</span>" : ""}`;
  inputLabel.setAttribute("for", name);
  // Error Message
  const span = document.createElement("span");
  span.innerText = `${label} ${lang.en.reportForm.errorMessage}`;
  span.classList.add("uno-form-input-error-message");
  // Input and Label append to col
  col.appendChild(inputLabel);
  col.appendChild(input);
  if (isRequired) col.appendChild(span);
  // Col append to wrapper
  row.appendChild(col);
};
const createSelect: CreateSelectFunction = (row, col, selectLabel, options, label, name) => {
  // Select
  const select = document.createElement("select");
  select.classList.add("uno-form-select");
  //// Select property
  select.setAttribute("id", name);
  select.setAttribute("name", name);
  select.onchange = onChangeValue;
  // Options
  const option = document.createElement("option");
  options.forEach(item => {
    const clone = option.cloneNode(true) as HTMLOptionElement;
    clone.value = item.value;
    clone.innerText = item.label;
    select.appendChild(clone);
  });
  // Label
  selectLabel.innerHTML = `${label}<span>*</span>`;
  selectLabel.setAttribute("for", name);
  // Select and Label append to col
  col.appendChild(selectLabel);
  col.appendChild(select);
  // Col append to wrapper
  row.appendChild(col);
};
const createRadio: CreateRadioFunction = (row, col, options, active, label, name) => {
  // Create label
  const span = document.createElement("span");
  const groupLabel = span.cloneNode(true) as HTMLElement;
  groupLabel.classList.add("uno-form-radio-group-label");
  groupLabel.innerHTML = `${label}<span>*</span>`;

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
      label.style.borderColor = "#7F56D9";
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
const createTextArea: CreateTextAreaFunction = (row, col, textAreaLabel, label, name, hasPlaceholder, isRequired) => {
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
  textAreaLabel.innerHTML = `${label}${isRequired ? "<span>*</span>" : ""}`;
  textAreaLabel.setAttribute("for", name);
  // Error Message
  const span = document.createElement("span");
  span.innerText = `${label} ${lang.en.reportForm.errorMessage}`;
  span.classList.add("uno-form-input-error-message");
  // TextArea and Label append to col
  col.appendChild(textAreaLabel);
  col.appendChild(textArea);
  if (isRequired) col.appendChild(span);
  // Col append to wrapper
  row.appendChild(col);
};
const createRadioWrapper: CreateRadioWrapperFunction = (row, col) => {
  const div = document.createElement("div") as HTMLElement;
  const container = div.cloneNode(true);
  const buttonGroup = div.cloneNode(true) as HTMLElement;
  buttonGroup.classList.add("uno-form-button-group");
  const innerCol = div.cloneNode(true);
  const inputLabel = document.createElement("label");
  inputLabel.classList.add("uno-form-select-label");

  // Type
  ///// Bug: 1
  ///// Report: 2
  const typeOptions = [
    {label: lang.en.reportForm.type.bug, value: "1", color: "#F04438"},
    {label: lang.en.reportForm.type.report, value: "2", color: "#F79009"},
    {label: lang.en.reportForm.type.feature, value: "3", color: "#17B26A"}
  ];
  createRadio(
    buttonGroup,
    innerCol.cloneNode(true) as HTMLElement,
    typeOptions,
    0,
    lang.en.reportForm.type.label,
    "type"
  );

  // Priority
  //// highest: 1
  //// high: 2
  //// medium: 3
  //// low: 4
  //// lowest: 5
  //// critical: 6
  const priorityOptions = [
    {label: lang.en.reportForm.priority.low, value: "4", color: "#F79008"},
    {label: lang.en.reportForm.priority.medium, value: "3", color: "#2A70FE"},
    {label: lang.en.reportForm.priority.high, value: "2", color: "#E14EB6"}
  ];
  createSelect(
    buttonGroup,
    innerCol.cloneNode(true) as HTMLElement,
    inputLabel.cloneNode(true) as HTMLLabelElement,
    priorityOptions,
    lang.en.reportForm.priority.label,
    "priority"
  );
  container.appendChild(buttonGroup);
  col.appendChild(container);
  // Col append to buttonGroup
  row.appendChild(col);
};
const createForm: CreateFormFunction = (/*{fullName, email, avatar}*/) => {
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
  createRadioWrapper(formRow, col.cloneNode(true) as HTMLElement);
  formRow.appendChild(divider.cloneNode(true));
  // Subject
  createInput(
    formRow,
    col.cloneNode(true) as HTMLElement,
    inputLabel.cloneNode(true) as HTMLElement,
    lang.en.reportForm.subject,
    "subject",
    "",
    false,
    true
  );
  formRow.appendChild(divider.cloneNode(true));
  // Description
  createTextArea(
    formRow,
    col.cloneNode(true) as HTMLElement,
    inputLabel.cloneNode(true) as HTMLElement,
    lang.en.reportForm.description,
    "description",
    false,
    true
  );
  return form;
};
const createInfo = (): HTMLElement => {
  const infoWrapper = document.createElement("div");
  infoWrapper.classList.add("uno-info");
  const OS = () => {
    if (navigator.appVersion.indexOf("Win") != -1) return "Windows";
    if (navigator.appVersion.indexOf("Mac") != -1) return "MacOS";
    if (navigator.appVersion.indexOf("X11") != -1) return "UNIX";
    if (navigator.appVersion.indexOf("Linux") != -1) return "Linux";
    return "Unknown OS";
  };
  const information = [
    {
      label: `${lang.en.reportForm.info.url}:`,
      data: window.location.href
    },
    {
      label: `${lang.en.reportForm.info.captured}:`,
      data: createName()
    },
    {
      label: `${lang.en.reportForm.info.deviceInfo}:`,
      data: navigator.userAgent
    },
    {
      label: `${lang.en.reportForm.info.OS}:`,
      data: OS()
    },
    {
      label: `${lang.en.reportForm.info.windowSize}:`,
      data: `${window.innerWidth} x ${window.innerHeight}`
    }
  ];
  information.forEach(info => {
    const infoRow = document.createElement("div");
    infoRow.classList.add("uno-info-row");
    const label = document.createElement("span");
    label.classList.add("uno-info-label");
    label.innerHTML = info.label;
    const value = document.createElement("span");
    value.classList.add("uno-info-value");
    value.innerHTML = info.data as string;
    infoRow.appendChild(label);
    infoRow.appendChild(value);
    infoWrapper.appendChild(infoRow);
  });
  return infoWrapper;
};
const createContent: CreateContentFunction = ({fullName, email, avatar}) => {
  content.setAttribute("id", "uno-report-form");
  contentInner.classList.add("uno-content");
  contentInner.appendChild(createForm({fullName, email, avatar}));
  contentInner.appendChild(createInfo());
  content.appendChild(contentInner);
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
  initialModal(createTitle(lang.en.reportForm.title), () => destroyRequestForm()).then(modalContent => {
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

  return `${yyyy}/${mm}/${dd} at ${HH}:${MM}:${SS}`;
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

const openReportFormModal = (recordedBlob: Blob): void => {
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

export default openReportFormModal;
