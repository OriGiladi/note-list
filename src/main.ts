import { createNote } from "./dom_interaction";;
import { LocalHostClear } from "./data_interaction";
import { displayNotesFunc } from "./dom_interaction";
import { hideConfirmationDialog } from "./dom_interaction";
import { showConfirmationDialog } from "./dom_interaction";
// //////////////////////////////////////////////////////////////////

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

// Define color type and initial note color
export type color = "red" | "blue" | "green" | "yellow" | "white";
export let noteColor: color = "red";

/////////////////////////////////////////////////////////////////////////
// Function to parse and format date
export function parseDate(today: Date): string {
    const dateObj = new Date(today);
    return `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
}

/////////////////////////////////////////////////////////////////////

// Event listeners
form.addEventListener("submit", (e) => {
    e.preventDefault();
    createNote();
});

sortDropDown.addEventListener("change", () => {
    const selectedSortWay: string = sortDropDown.value;
    displayNotesFunc(selectedSortWay, searchInput.value);
});

colorDropDown.addEventListener("change", () => {
    noteColor = colorDropDown.value as color;
});

// Initialize display on page load
displayNotesFunc("date", searchInput.value);

doDueDateInput.addEventListener("change", () => {
    console.log(new Date(doDueDateInput.value));
});

btnClear.addEventListener("click", () => {
    showConfirmationDialog();
});

confirmYesBtn.addEventListener("click", () => {
    LocalHostClear();
    hideConfirmationDialog();
});

confirmNoBtn.addEventListener("click", () => {
    hideConfirmationDialog();
});

searchInput.addEventListener("input", () => {
    displayNotesFunc(sortDropDown.value, searchInput.value);
});
