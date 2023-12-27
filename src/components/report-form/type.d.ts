interface FileInfoInterface {
  fileName: string;
  fileSize: string;
}

export interface StoreInterface {
  [key: string | number | symbol]: string;

  type: string;
  priority: string;
  subject: string;
  description: string;
}

interface RadioOptionsInterface {
  label: string;
  value: string;
  color?: string;
  icon?: string;
}

interface UserInfoInterface {
  fullName: string;
  email: string;
  avatar?: string | null;
}

type OnSubmitType = () => void;

export type HandleSubmitFunction = (acceptButton: HTMLButtonElement, onSubmit: OnSubmitType) => void;
export type CreateFooterFunction = (fileInfo: FileInfoInterface, onSubmit: OnSubmitType) => void;
export type CreateInputFunction = (
  row: HTMLElement,
  col: HTMLElement,
  inputLabel: HTMLElement,
  label: string,
  name: string,
  initialValue?: string,
  hasPlaceholder?: boolean,
  isRequired?: boolean
) => void;
export type CreateSelectFunction = (
  row: HTMLElement,
  col: HTMLElement,
  selectLabel: HTMLElement,
  options: RadioOptionsInterface[],
  label: string,
  name: string,
  active?: number
) => void;
export type CreateRadioFunction = (
  row: HTMLElement,
  col: HTMLElement,
  radioOptions: RadioOptionsInterface[],
  active: number,
  label: string,
  name: string,
  isRequired?: boolean
) => void;
export type CreateTextAreaFunction = (
  row: HTMLElement,
  col: HTMLElement,
  textAreaLabel: HTMLElement,
  label: string,
  name: string,
  hasPlaceholder?: boolean,
  isRequired?: boolean
) => void;
export type CreateSenderInformationFunction = (
  row: HTMLElement,
  col: HTMLElement,
  label: string,
  userInfo: UserInfoInterface
) => void;
export type CreateRadioWrapperFunction = (row: HTMLElement, col: HTMLElement) => void;
export type CreateFormFunction = (fileInfo: FileInfoInterface) => HTMLElement;
export type CreateContentFunction = (fileInfo: FileInfoInterface) => void;
export type InitialInnerElementsFunction = (
  userInfo: UserInfoInterface,
  fileInfo: FileInfoInterface,
  onSubmit: OnSubmitType
) => void;
export type AppendFormToModalFunction = (
  userInfo: UserInfoInterface,
  fileInfo: FileInfoInterface,
  onSubmit: OnSubmitType
) => void;
