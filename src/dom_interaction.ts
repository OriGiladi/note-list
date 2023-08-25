import { searchInput, textInput } from "./constants";
import { titleInput } from "./constants";
import { doDueDateInput } from "./constants";
import { noteColor } from "./main";
import { DataInteraction } from "./data_interaction";
import { note_obj } from "./types";
import { parseDate } from "./main";
import { ListSort } from "./list_sort";
import { divGrid } from "./constants";
import { Note } from "./types";
import { gridDiv } from "./constants";
import { confirmationDialog } from "./constants";
import { sortDropDown } from "./constants";
import { errorDialog, pErrorDisplay } from "./constants";


///////////////////////////////////////////////////

let notes_list: Note[] = [];

// creates new note:
export function createNote(): void {
    const newNote: note_obj = {} as note_obj;
    const today: Date = new Date();
    newNote.creation_date = today;
    newNote.body = textInput.value;
    newNote.color = noteColor;
    newNote.do_to_date = new Date(doDueDateInput.value);
    const di = new DataInteraction(titleInput.value);
    const addingNoteResult: string = di.addNote(newNote);
    if (addingNoteResult !== "true")// the note isn't valid
    {
        pErrorDisplay.textContent = addingNoteResult;
        showErrorDialog();

    } 
    searchInput.value = "";
    displayNotesFunc(sortDropDown.value, searchInput.value);
}

// deletes a note
export function deleteNote(note_title: string): void {
    const di = new DataInteraction(note_title);
    console.log(di.delete());
    searchInput.value = "";
    displayNotesFunc(sortDropDown.value, searchInput.value);
}

//display all the notes by the sort choise and by inserted word
export function displayNotesFunc(
    selectedSortWay: string,
    searched: string
): void {
    while (divGrid.firstChild) {
        divGrid.removeChild(divGrid.firstChild);
    }
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
        const note: Note = {} as Note;
        note.title = key;
        note.content = JSON.parse(localStorage.getItem(key)!);
        notes_list.push(note);
    });

    const notes_list_filtered: Note[] = new DataInteraction(
        searched
    ).findSimilar(notes_list, searched);

    let displayNotes: Note[] = new ListSort(notes_list_filtered).SortByDate();
    if (selectedSortWay === "alphabet")
        displayNotes = new ListSort(notes_list_filtered).SortByAlphabet();
    else if (selectedSortWay === "do_to_date")
        displayNotes = new ListSort(notes_list_filtered).SortByDueToDate();
    notes_list = [];
    displayNotes.forEach((note) => {
        const noteDiv = document.createElement("div");
        noteDiv.classList.add("note");
        switch (note.content.color) {
            case "red":
                noteDiv.classList.add("red");
                break;
            case "blue":
                noteDiv.classList.add("blue");
                break;
            case "green":
                noteDiv.classList.add("green");
                break;
            case "yellow":
                noteDiv.classList.add("yellow");
                break;
            default:
                noteDiv.classList.add("white");
        }
        gridDiv.appendChild(noteDiv);
        render(note, noteDiv) // renders the structured note
    });
}
function render(note: Note, noteDiv: HTMLDivElement){ // renders the structured note
    const delete_btn: HTMLButtonElement = document.createElement("button");
        delete_btn.textContent = "🗑️";
        delete_btn.addEventListener("click", () => {
            deleteNote(note.title);
        });
        delete_btn.classList.add("delete");
        delete_btn.classList.add("btn");
        noteDiv.appendChild(delete_btn);

        const h3Title = document.createElement("h1");
        h3Title.textContent = ` ${note.title} `;
        noteDiv.appendChild(h3Title);

        const pBody = document.createElement("h3");
        pBody.textContent = `${note.content.body} `;
        noteDiv.appendChild(pBody);

        const lblDate = document.createElement("label");
        lblDate.textContent = `Creation Date: ${parseDate(
            note.content.creation_date
        )} `;
        noteDiv.appendChild(lblDate);
        if (note.content.do_to_date !== undefined) {
            if (note.content.do_to_date !== null) {
                const lblDoToDate = document.createElement("label");
                lblDoToDate.textContent = `Target Date: ${parseDate(
                    note.content.do_to_date
                )} `;
                noteDiv.appendChild(lblDoToDate);
            }
        }
}

export function showConfirmationDialog(): void  { // shows the clear note confirmation dialog
    confirmationDialog.style.display = "block";
}

export function hideConfirmationDialog(): void  {  // hides the clear note confirmation dialog
    confirmationDialog.style.display = "none";
}
function showErrorDialog(): void { // shows the adding form error dialog
    errorDialog.style.display = "block";
}

export function hideErrorDialog(): void {  // hides the adding form error dialog
    errorDialog.style.display = "none";
}

