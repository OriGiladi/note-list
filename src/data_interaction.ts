import { note_obj } from "./types";
import { Note } from "./types";

export function LocalHostClear() { // clears all the notes
  localStorage.clear();
}
export class DataInteraction {
  private title: string;

  constructor(title: string) {
    this.title = title;
  }

  LocalHostGet(): string | null{   // Get a note from localStorage based on the current title
    return localStorage.getItem(this.title)
  }
  LocalHostSet(note: note_obj): void{ // Store a note in localStorage using the current title
    localStorage.setItem(this.title, JSON.stringify(note))
  }
  LocalHostDelete(): void{ // Delete a note from localStorage using the current title
    localStorage.removeItem(this.title);
  }



  addNote(note: note_obj): string { // Add a new note if body is not empty and note with the current title doesn't exist
    if (note.body === "") { //the note is empty
      return "Your note's body is empty";
    } else if (this.LocalHostGet() !== null) { // there is already such title
      return "Your note needs a distinctive title";
    } else {
      this.LocalHostSet(note);
      return "true";
    }
  }

  getTitle(): string {  // Get the current title
    return this.title;
  }
  search(): string {  // Search for and retrieve the body of the note with the current title
    const noteBody = this.LocalHostGet();
    if (noteBody !== null) return noteBody;
    else return "";
  }
  delete(): string { // Delete the note with the current title if it exist
    const noteBody = this.LocalHostGet();
    if (noteBody !== null) {
      this.LocalHostDelete();
      return ``;
    } else return `There's no note named ${this.title}`;
  }
  findSimilar(note_list: Note[], input: string): Note[] { //finds notes that consists of the input given 
    let result: Note[] = [];
    note_list.forEach((note) => {
      const regex = new RegExp(input);
      if (note.title.match(regex)) result.push(note);
    });
    return result;
  }
}
