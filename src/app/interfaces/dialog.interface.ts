export interface IDialog {
    message: string;
    buttonText: IButtonText;
}

interface IButtonText {
    confirmLabel: string;
    cancelLabel: string;
};