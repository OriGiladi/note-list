import { createNote } from "./dom_interaction";;
import { LocalHostClear } from "./data_interaction";
import { displayNotesFunc } from "./dom_interaction";
import { hideConfirmationDialog } from "./dom_interaction";
import { showConfirmationDialog } from "./dom_interaction";
import { sortDropDown } from "./constants";
import { searchInput } from "./constants";
import { form } from "./constants";
import { colorDropDown } from "./constants";
import { confirmNoBtn } from "./constants";
import { confirmYesBtn } from "./constants";
import { btnClear } from "./constants";
import { doDueDateInput } from "./constants";
// //////////////////////////////////////////////////////////////////


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
