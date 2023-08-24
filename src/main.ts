import { createNote } from "./dom_interaction";
// import { searchNote } from "./dom_interaction";
import { LocalHostClear } from "./data_interaction";
// import { deleteNote } from "./dom_interaction";
import { displayNotesFunc } from "./dom_interaction";
import { hideConfirmationDialog } from "./dom_interaction";
import { showConfirmationDialog } from "./dom_interaction";
//////////////////////////////////////////////////////////////////

export const form: HTMLFormElement = document.getElementById(
    "createNote"
) as HTMLFormElement;

export const titleInput: HTMLInputElement = document.getElementById(
    "titleInput"
) as HTMLInputElement;

export const textInput: HTMLTextAreaElement = document.getElementById(
    "textInput"
) as HTMLTextAreaElement;

export const searchInput: HTMLInputElement = document.getElementById(
    "txtSearch"
) as HTMLInputElement;

// const btnSearch: HTMLButtonElement = document.getElementById('search') as HTMLButtonElement;

// const btnDelete: HTMLButtonElement = document.getElementById('delete') as HTMLButtonElement;

export const btnClear: HTMLButtonElement = document.getElementById(
    "clear"
) as HTMLButtonElement;
export const confirmationDialog: HTMLDivElement = document.querySelector(
    ".confirmation-dialog"
) as HTMLDivElement;
export const confirmYesBtn: HTMLButtonElement = document.getElementById(
    "confirmYes"
) as HTMLButtonElement;
export const confirmNoBtn: HTMLButtonElement = document.getElementById(
    "confirmNo"
) as HTMLButtonElement;

export const errorDialog: HTMLDivElement = document.querySelector(
    ".error-dialog"
) as HTMLDivElement;
export const errorDialogOK: HTMLButtonElement = document.getElementById(
    "confirm"
) as HTMLButtonElement;
export const pErrorDisplay: HTMLButtonElement = document.getElementById(
    "error-display"
) as HTMLButtonElement;


export const sortDropDown: HTMLSelectElement = document.getElementById(
    "sordDD"
) as HTMLSelectElement;
export const colorDropDown: HTMLSelectElement = document.getElementById(
    "colorDD"
) as HTMLSelectElement;

// const btnRed: HTMLButtonElement = document.getElementById('red') as HTMLButtonElement;
// const btnBlue: HTMLButtonElement = document.getElementById('blue') as HTMLButtonElement;
// const btnGreen: HTMLButtonElement = document.getElementById('green') as HTMLButtonElement;
// const btnYellow: HTMLButtonElement = document.getElementById('yellow') as HTMLButtonElement;
// const btnWhite: HTMLButtonElement = document.getElementById('white') as HTMLButtonElement;

// export const pDeleted: HTMLParagraphElement = document.getElementById('p_deleted') as HTMLParagraphElement;

export const do_to_date_Input: HTMLInputElement = document.getElementById(
    "do_to_date"
) as HTMLInputElement;

export let divGrid: HTMLDivElement = document.getElementById(
    "grid"
) as HTMLDivElement;

type color = "red" | "blue" | "green" | "yellow" | "white";
export let noteColor: color = "red";

export const gridDiv: HTMLDivElement = document.getElementById(
    "grid"
) as HTMLDivElement;

export const divContainer: HTMLDivElement = document.getElementById(
    "form-container"
) as HTMLDivElement;

/////////////////////////////////////////////////////////////////////////

export interface Note {
    title: string;
    content: note_obj;
}

export type note_obj = {
    body: string;
    creation_date: Date;
    do_to_date?: Date;
    color: color;
};

export function parseDate(today: Date): string {
    const dateObj = new Date(today);
    return `${dateObj.getDate()}/${
        dateObj.getMonth() + 1
    }/${dateObj.getFullYear()}`;
}

/////////////////////////////////////////////////////////////////////

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
displayNotesFunc("date", searchInput.value);

do_to_date_Input.addEventListener("change", () => {
    console.log(new Date(do_to_date_Input.value));
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
