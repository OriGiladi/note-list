// HTML form and input elements
export const form: HTMLFormElement = document.getElementById("createNote") as HTMLFormElement;
export const titleInput: HTMLInputElement = document.getElementById("titleInput") as HTMLInputElement;
export const textInput: HTMLTextAreaElement = document.getElementById("textInput") as HTMLTextAreaElement;
export const searchInput: HTMLInputElement = document.getElementById("txtSearch") as HTMLInputElement;
export const btnClear: HTMLButtonElement = document.getElementById("clear") as HTMLButtonElement;
export const confirmationDialog: HTMLDivElement = document.querySelector(".confirmation-dialog") as HTMLDivElement;
export const confirmYesBtn: HTMLButtonElement = document.getElementById("confirmYes") as HTMLButtonElement;
export const confirmNoBtn: HTMLButtonElement = document.getElementById("confirmNo") as HTMLButtonElement;

// Error dialog elements
export const errorDialog: HTMLDivElement = document.querySelector(".error-dialog") as HTMLDivElement;
export const errorDialogOK: HTMLButtonElement = document.getElementById("confirm") as HTMLButtonElement;
export const pErrorDisplay: HTMLButtonElement = document.getElementById("error-display") as HTMLButtonElement;

// Dropdowns and input elements
export const sortDropDown: HTMLSelectElement = document.getElementById("sordDD") as HTMLSelectElement;
export const colorDropDown: HTMLSelectElement = document.getElementById("colorDD") as HTMLSelectElement;
export const doDueDateInput: HTMLInputElement = document.getElementById("do_to_date") as HTMLInputElement;

// Grid and container elements
export let divGrid: HTMLDivElement = document.getElementById("grid") as HTMLDivElement;
export const gridDiv: HTMLDivElement = document.getElementById("grid") as HTMLDivElement;
export const divContainer: HTMLDivElement = document.getElementById("form-container") as HTMLDivElement;
