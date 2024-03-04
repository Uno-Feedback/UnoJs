import initialModal, {createTitle, hideModal, showModal} from "../modal";
import optionsState from "../../shared/states";
import {submitIcon} from "../../assets/svg";
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
  CreateTextAreaFunction,
  HandleSubmitFunction,
  InformationInterface,
  InitialInnerElementsFunction,
  StoreInterface
} from "./type";
import request from "../request";
import {lang} from "../../shared/langs";

const storeValues: StoreInterface = {
  type: "Uno-Bug",
  priority: "High",
  sendTo: "1",
  subject: "",
  description: ""
};
const OS = () => {
  if (navigator.appVersion.indexOf("Win") != -1) return "Windows";
  if (navigator.appVersion.indexOf("Mac") != -1) return "MacOS";
  if (navigator.appVersion.indexOf("X11") != -1) return "UNIX";
  if (navigator.appVersion.indexOf("Linux") != -1) return "Linux";
  return "Unknown OS";
};
const information: InformationInterface[] = [
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

const content = document.createElement("div");
const contentInner = document.createElement("div");
const submitButton = document.createElement("button");
const footer = document.createElement("div");
const attachment = document.createElement("div");
const attachmentName = document.createElement("span");
const attachmentSize = document.createElement("span");
const form = document.createElement("div");
const formRow = document.createElement("div");
const aside = document.createElement("aside");

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
  let isValid = true;
  const values = {subject: storeValues["subject"], description: storeValues["description"]} as Record<string, string>;
  Object.keys(values).forEach(name => {
    const value = values[name];
    if (!value) {
      const element = document.getElementById(name) as HTMLInputElement;
      handleError(element);
      isValid = false;
    }
  });
  return isValid;
};
const handleSubmit: HandleSubmitFunction = (acceptButton, onSubmit): void => {
  if (!validateForm()) return;
  onSubmit();
  disableButton(acceptButton);
  Observable.subscribe("enableButton", () => enableButton(acceptButton));
};

const createFooter: CreateFooterFunction = ({}, onSubmit): void => {
  // Footer
  footer.classList.add("uno-form-footer");
  // - Submit Button
  submitButton.classList.add("uno-form-submit");
  const submitButtonText = document.createElement("span");
  const submitButtonIcon = document.createElement("span");
  submitButtonIcon.classList.add("uno-form-submit-icon");
  submitButtonText.innerText = lang.en.reportForm.submit;
  submitButtonIcon.innerHTML = submitIcon;
  submitButton.appendChild(submitButtonText);
  submitButton.appendChild(submitButtonIcon);
  submitButton.onclick = () => {
    handleSubmit(submitButton, onSubmit);
  };
  // - Send To
  const sendToWrapper = document.createElement("div");
  sendToWrapper.classList.add("uno-form-send-wrapper");
  const buttonGroup = document.createElement("div");
  buttonGroup.classList.add("uno-form-send-button-group");
  const sendOptions = [
    {
      label: "Jira",
      value: "1",
      icon: '<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.7719 9.41726L9.89484 0.919678L9.13695 0.0999756L3.22031 6.49912L0.512104 9.41726C0.444809 9.48985 0.391417 9.57609 0.354987 9.67103C0.318557 9.76598 0.299805 9.86777 0.299805 9.97056C0.299805 10.0734 0.318557 10.1751 0.354987 10.2701C0.391417 10.365 0.444809 10.4513 0.512104 10.5239L5.92347 16.3875L9.13695 19.8685L15.0662 13.4639L15.1572 13.3655L17.7719 10.5348C17.8407 10.462 17.8954 10.3751 17.9327 10.2791C17.9701 10.1832 17.9893 10.0801 17.9893 9.97602C17.9893 9.87192 17.9701 9.76887 17.9327 9.67291C17.8954 9.57696 17.8407 9.49004 17.7719 9.41726V9.41726ZM9.13695 12.9065L6.43379 9.98286L9.13695 7.05925L11.8401 9.98286L9.13695 12.9065Z" fill="#2684FF"/><path d="M9.1367 7.05927C8.29051 6.1379 7.81561 4.89195 7.81561 3.5933C7.81561 2.29464 8.29051 1.04869 9.1367 0.127319L3.20996 6.5128L6.42849 9.99381L9.1367 7.05927Z" fill="url(#paint0_linear_517_236)"/><path d="M11.8525 9.96375L9.13672 12.9065C9.5599 13.3633 9.89563 13.9059 10.1247 14.5032C10.3538 15.1005 10.4717 15.7408 10.4717 16.3875C10.4717 17.0341 10.3538 17.6744 10.1247 18.2718C9.89563 18.8691 9.5599 19.4117 9.13672 19.8685L15.0736 13.4557L11.8525 9.96375Z" fill="url(#paint1_linear_517_236)"/><defs><linearGradient id="paint0_linear_517_236" x1="8.65922" y1="4.10014" x2="4.58962" y2="7.86289" gradientUnits="userSpaceOnUse"><stop offset="0.18" stop-color="#0052CC"/><stop offset="1" stop-color="#2684FF"/></linearGradient><linearGradient id="paint1_linear_517_236" x1="9.65967" y1="15.8301" x2="13.7213" y2="12.0722" gradientUnits="userSpaceOnUse"><stop offset="0.18" stop-color="#0052CC"/><stop offset="1" stop-color="#2684FF"/></linearGradient></defs></svg>'
    },
    {
      label: "Confluence",
      value: "2",
      icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2.81138 17.025C2.60738 17.358 2.37638 17.748 2.19338 18.057C2.11322 18.1973 2.09 18.363 2.12853 18.5199C2.16705 18.6768 2.26437 18.8128 2.40038 18.9L6.50138 21.432C6.57249 21.4761 6.65165 21.5055 6.73426 21.5187C6.81687 21.5318 6.90127 21.5284 6.98253 21.5085C7.0638 21.4887 7.1403 21.4529 7.20758 21.4032C7.27485 21.3535 7.33156 21.2909 7.37438 21.219C7.53938 20.943 7.74938 20.586 7.97438 20.205C9.60038 17.535 11.2474 17.862 14.1904 19.263L18.2584 21.195C18.3346 21.2315 18.4173 21.2523 18.5017 21.2562C18.5861 21.26 18.6704 21.2469 18.7497 21.2175C18.8289 21.1881 18.9013 21.1431 18.9628 21.0851C19.0243 21.0271 19.0734 20.9574 19.1074 20.88L21.0604 16.47C21.1267 16.3204 21.1326 16.1509 21.0766 15.9971C21.0207 15.8433 20.9073 15.7171 20.7604 15.645C19.9024 15.24 18.1954 14.445 16.6654 13.695C11.1004 11.007 6.40538 11.184 2.81138 17.025Z" fill="url(#paint0_linear_517_247)"/><path d="M21.2009 7.00199C21.4079 6.66899 21.6389 6.27899 21.8189 5.96999C21.9024 5.82739 21.9263 5.65755 21.8853 5.49743C21.8443 5.33732 21.7417 5.19987 21.5999 5.11499L17.5049 2.58299C17.4338 2.53894 17.3546 2.50948 17.272 2.49634C17.1894 2.48321 17.105 2.48665 17.0237 2.50648C16.9425 2.52631 16.8659 2.56212 16.7987 2.61183C16.7314 2.66153 16.6747 2.72414 16.6319 2.79599C16.4699 3.07199 16.2569 3.42899 16.0319 3.80999C14.3999 6.49199 12.7679 6.16499 9.82187 4.76399L5.75687 2.83199C5.68159 2.79503 5.59968 2.77347 5.51595 2.76857C5.43223 2.76368 5.34837 2.77555 5.26929 2.80349C5.19022 2.83143 5.11751 2.87488 5.05545 2.93129C4.99339 2.9877 4.94321 3.05594 4.90787 3.13199L2.95487 7.55399C2.8876 7.70395 2.88129 7.87419 2.93727 8.02872C2.99326 8.18324 3.10715 8.30993 3.25487 8.38199C4.11587 8.78699 5.82287 9.58199 7.34987 10.332C12.8999 13.02 17.6099 12.843 21.2009 7.00199Z" fill="url(#paint1_linear_517_247)"/><defs><linearGradient id="paint0_linear_517_247" x1="20.9374" y1="22.743" x2="8.52938" y2="15.612" gradientUnits="userSpaceOnUse"><stop stop-color="#0052CC"/><stop offset="0.92" stop-color="#2380FB"/><stop offset="1" stop-color="#2684FF"/></linearGradient><linearGradient id="paint1_linear_517_247" x1="3.07487" y1="1.28099" x2="15.4859" y2="8.41199" gradientUnits="userSpaceOnUse"><stop stop-color="#0052CC"/><stop offset="0.92" stop-color="#2380FB"/><stop offset="1" stop-color="#2684FF"/></linearGradient></defs></svg>'
    }
  ];
  createRadio(sendToWrapper, buttonGroup, sendOptions, 0, lang.en.reportForm.sendTo.label, "sendTo", false);
  // - Append the 'Send To' to Footer.
  // footer.appendChild(sendToWrapper);
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
const createSelect: CreateSelectFunction = (row, col, selectLabel, options, label, name, active) => {
  // Select
  const select = document.createElement("select");
  select.classList.add("uno-form-select");
  //// Select property
  select.setAttribute("id", name);
  select.setAttribute("name", name);
  select.onchange = onChangeValue;
  // Options
  const option = document.createElement("option");
  options.forEach((item, index) => {
    const clone = option.cloneNode(true) as HTMLOptionElement;
    clone.value = item.value;
    clone.innerText = item.label;
    select.appendChild(clone);
    if (index === active) {
      storeValues[name] = item.value;
      select.value = item.value;
    }
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
const createRadio: CreateRadioFunction = (row, col, options, active, label, name, isRequired) => {
  // Create label
  const span = document.createElement("span");
  const groupLabel = span.cloneNode(true) as HTMLElement;
  groupLabel.classList.add("uno-form-radio-group-label");
  groupLabel.innerHTML = `${label}${isRequired ? "<span>*</span>" : ""}`;

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

  // Create icon
  const icon = span.cloneNode(true) as HTMLElement;
  icon.classList.add("uno-form-radio-icon");

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
      const cloneBadge = badge.cloneNode(true) as HTMLSpanElement;
      cloneBadge.style.backgroundColor = item.color;
      cloneLabel.appendChild(cloneBadge);
    }

    if (item.icon) {
      const cloneIcon = icon.cloneNode(true) as HTMLSpanElement;
      cloneIcon.innerHTML = item.icon;
      cloneLabel.appendChild(cloneIcon);
    }

    if (index === active ?? 0) {
      cloneInput.setAttribute("checked", "checked");
      cloneLabel.style.borderColor = "#7F56D9";
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
  /////// [
  ///////   {
  ///////     "id": "12101",
  ///////     "name": "Uno-Bug"
  ///////   },
  ///////   {
  ///////     "id": "12305",
  ///////     "name": "Uno-Report"
  ///////   }
  /////// ]
  const typeOptions = [
    {label: lang.en.reportForm.type.bug, value: "Uno-Bug", color: "#F04438"},
    {label: lang.en.reportForm.type.report, value: "Uno-Report", color: "#F79009"}
    // {label: lang.en.reportForm.type.feature, value: "3", color: "#17B26A"}
  ];
  createRadio(
    buttonGroup,
    innerCol.cloneNode(true) as HTMLElement,
    typeOptions,
    0,
    lang.en.reportForm.type.label,
    "type",
    true
  );

  // Priority
  //// highest: 1
  //// high: 2
  //// medium: 3
  //// low: 4
  //// lowest: 5
  //// critical: 6
  ////// [
  //////   {
  //////     "id": "1",
  //////     "name": "Highest"
  //////   },
  //////   {
  //////     "id": "2",
  //////     "name": "High"
  //////   },
  //////   {
  //////     "id": "3",
  //////     "name": "Medium"
  //////   },
  //////   {
  //////     "id": "4",
  //////     "name": "Low"
  //////   },
  //////   {
  //////     "id": "10100",
  //////     "name": "Critical"
  //////   }
  ////// ]
  const priorityOptions = [
    {label: "Highest", value: "Highest"},
    {label: "High", value: "High"},
    {label: "Medium", value: "Medium"},
    {label: "Low", value: "Low"},
    {label: "Critical", value: "Critical"}
  ];
  createSelect(
    buttonGroup,
    innerCol.cloneNode(true) as HTMLElement,
    inputLabel.cloneNode(true) as HTMLLabelElement,
    priorityOptions,
    lang.en.reportForm.priority.label,
    "priority",
    1
  );

  container.appendChild(buttonGroup);
  col.appendChild(container);
  // Col append to buttonGroup
  row.appendChild(col);
};
const createForm: CreateFormFunction = ({fileName, fileSize}) => {
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
  formRow.appendChild(divider.cloneNode(true));
  const attachmentCol = col.cloneNode(true) as HTMLElement;
  attachmentCol.classList.add("last");
  const fileTitle = document.createElement("div");
  fileTitle.classList.add("uno-form-attachment-title");
  fileTitle.innerText = lang.en.reportForm.fileTitle;
  attachmentCol.appendChild(fileTitle);
  // - Attachment
  attachment.classList.add("uno-form-attachment");
  // - Attachment Name
  attachmentName.classList.add("uno-form-attachment-name");
  attachmentName.innerText = `${fileName}.mp4`;
  attachment.appendChild(attachmentName);
  // - Attachment Time
  attachmentSize.classList.add("uno-form-attachment-size");
  attachmentSize.innerText = `(${fileSize})`;
  attachment.appendChild(attachmentSize);
  // - Append Attachment to Footer
  attachmentCol.appendChild(attachment);
  formRow.appendChild(attachmentCol);
  return form;
};
const createInfo = (): HTMLElement => {
  aside.classList.add("uno-info");
  // - Tabs
  // Tab Element
  const tabsWrapper = document.createElement("div");
  tabsWrapper.classList.add("uno-info-tabs");
  const tab: HTMLDivElement = document.createElement("div");
  tab.classList.add("uno-info-tab");
  // Text Element
  const text: HTMLSpanElement = document.createElement("span");
  text.classList.add("uno-info-tab-text");
  const tabs = [
    {title: lang.en.reportForm.info.info},
    {title: lang.en.reportForm.info.network},
    {title: lang.en.reportForm.info.console}
  ];
  tabs.forEach((tabInfo, index) => {
    const cloneTab = tab.cloneNode(true) as HTMLElement;
    if (index === 0) cloneTab.classList.add("active");
    const cloneText = text.cloneNode(true) as HTMLSpanElement;
    cloneText.innerText = tabInfo.title;
    cloneTab.appendChild(cloneText);
    tabsWrapper.appendChild(cloneTab);
  });
  aside.appendChild(tabsWrapper);
  // - Info
  const infoWrapper = document.createElement("div");
  infoWrapper.classList.add("uno-info-list");
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
  // - Append Info to Aside
  aside.appendChild(infoWrapper);
  return aside;
};
const createContent: CreateContentFunction = ({fileSize, fileName}) => {
  content.setAttribute("id", "uno-report-form");
  contentInner.classList.add("uno-content");
  contentInner.appendChild(createForm({fileSize, fileName}));
  contentInner.appendChild(createInfo());
  content.appendChild(contentInner);
};
const initialInnerElements: InitialInnerElementsFunction = ({}, {fileSize, fileName}, onSubmit) => {
  createContent({fileSize, fileName});
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
  Observable.fire("enableButton");
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
  aside.replaceChildren();
  aside.remove();
  content.replaceChildren();
  content.remove();
};

const openReportFormModal = (recordedBlob: Blob): void => {
  const fileSize = formatBytes(recordedBlob.size, 2);

  const {fullName, email, avatar} = optionsState.user;
  appendFormToModal({fullName, email, avatar}, {fileSize, fileName: createName()}, () => {
    /* todo set loading true */
    request(recordedBlob, createName(), {storeValues, information})
      .then(response => {
        console.info(`[uno-js] Response: ${response.message}`);
        closeRequestFormModal();
      })
      .catch(error => {
        console.error(`[uno-js] ${error}`);
        Observable.fire("enableButton");
      });
  });
};

export default openReportFormModal;
