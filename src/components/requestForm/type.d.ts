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
}

interface UserInfoInterface {
  fullName: string;
  email: string;
  avatar?: string | null;
}

type OnSubmitType = () => void
export type OnChangeValueFunction = (event: Event) => void;
export type DisableButtonFunction = (element: HTMLButtonElement) => void;
export type EnableButtonFunction = (element: HTMLButtonElement) => void;
export type HandleErrorFunction = (element: HTMLElement) => void;
export type ClearErrorFunction = (element: HTMLElement) => void;
export type ValidateFormFunction = () => boolean;
export type HandleSubmitFunction = (acceptButton: HTMLButtonElement, onSubmit: OnSubmitType) => void;
export type CreateTitleFunction = () => HTMLElement;
export type CreateFooterFunction = (fileInfo: FileInfoInterface, onSubmit: OnSubmitType) => void;
export type CreateInputFunction = (row: HTMLElement, col: HTMLElement, inputLabel: HTMLElement, label: string, name: string, initialValue?: string, hasPlaceholder?: boolean) => void;
export type CreateRadioFunction = (row: HTMLElement, col: HTMLElement, radioOptions: RadioOptionsInterface[], active: number, label: string, name: string) => void;
export type CreateTextAreaFunction = (row: HTMLElement, col: HTMLElement, textAreaLabel: HTMLElement, label: string, name: string, hasPlaceholder?: boolean) => void;
export type CreateSenderInformationFunction = (row: HTMLElement, col: HTMLElement, label: string, userInfo: UserInfoInterface) => void;
export type CreateRadioWrapperFunction = (row: HTMLElement, col: HTMLElement) => void;
export type CreateFormFunction = (userInfo: UserInfoInterface) => HTMLElement;
export type CreateContentFunction = (userInfo: UserInfoInterface) => HTMLElement;
export type InitialInnerElementsFunction = (userInfo: UserInfoInterface, fileInfo: FileInfoInterface, onSubmit: OnSubmitType) => void;
export type AppendFormToModalFunction = (userInfo: UserInfoInterface, fileInfo: FileInfoInterface, onSubmit: OnSubmitType) => void;