// import { form } from "./main";
import { searchInput, textInput } from "./main";
import { titleInput } from "./main";
import { do_to_date_Input } from "./main";
import { noteColor } from "./main";
import { DataInteraction } from "./data_interaction";
import { note_obj } from "./main";
// import { searchInput } from "./main";
// import { searchDiv } from "./main";
// import { pDeleted } from "./main";
import { parseDate } from "./main";
import { ListSort } from "./list_sort";
import { divGrid } from "./main";
import { Note } from "./main";
import { gridDiv } from "./main";
// import { divContainer } from "./main";
import { confirmationDialog } from "./main";
import { sortDropDown } from "./main";

///////////////////////////////////////////////////

let notes_list: Note[] = [];

// creates new note:
export function createNote(): void {
    const new_note: note_obj = {} as note_obj;
    const today: Date = new Date();
    new_note.creation_date = today;
    new_note.body = textInput.value;
    new_note.color = noteColor;
    new_note.do_to_date = new Date(do_to_date_Input.value);
    console.log(new_note.do_to_date);
    const di = new DataInteraction(titleInput.value);
    if (di.addNote(new_note))
        console.log(`title: ${di.getTitle()}, body:  ${di.search()}`);
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
        render()
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
    });
}
function render(){
    // const delete_btn: HTMLButtonElement = document.createElement("button");
    //     delete_btn.textContent = "🗑️";
    //     delete_btn.addEventListener("click", () => {
    //         deleteNote(note.title);
    //     });
    //     delete_btn.classList.add("delete");
    //     delete_btn.classList.add("btn");
    //     noteDiv.appendChild(delete_btn);

    //     const h3Title = document.createElement("h1");
    //     h3Title.textContent = ` ${note.title} `;
    //     noteDiv.appendChild(h3Title);

    //     const pBody = document.createElement("h3");
    //     pBody.textContent = `${note.content.body} `;
    //     noteDiv.appendChild(pBody);

    //     const lblDate = document.createElement("label");
    //     lblDate.textContent = `Creation Date: ${parseDate(
    //         note.content.creation_date
    //     )} `;
    //     noteDiv.appendChild(lblDate);
    //     if (note.content.do_to_date !== undefined) {
    //         if (note.content.do_to_date !== null) {
    //             const lblDoToDate = document.createElement("label");
    //             lblDoToDate.textContent = `Target Date: ${parseDate(
    //                 note.content.do_to_date
    //             )} `;
    //             noteDiv.appendChild(lblDoToDate);
    //         }
    //     }
}

export function showConfirmationDialog() {
    confirmationDialog.style.display = "block";
}

export function hideConfirmationDialog() {
    confirmationDialog.style.display = "none";
}

export function clearNote() {
    localStorage.clear();
}
