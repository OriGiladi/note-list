import { note_obj } from "./main";
import { Note } from "./main";
export class DataInteraction {
  private title: string;

  constructor(title: string) {
    this.title = title;
  }

  addNote(note: note_obj): boolean {
    if (note.body === "") {
      console.log("there's no note body");
      return false;
    } else if (localStorage.getItem(this.title) !== null) {
      return false;
    } else {
      localStorage.setItem(this.title, JSON.stringify(note));
      return true;
    }
  }

  getTitle(): string {
    return this.title;
  }
  search(): string {
    const noteBody = localStorage.getItem(this.title);
    if (noteBody !== null) return noteBody;
    else return "";
  }
  delete(): string {
    const noteBody = localStorage.getItem(this.title);
    if (noteBody !== null) {
      localStorage.removeItem(this.title);
      return ``;
    } else return `There's no note named ${this.title}`;
  }
  findSimilar(note_list: Note[], input: string): Note[] {
    let result: Note[] = [];
    note_list.forEach((note) => {
      const regex = new RegExp(input, "g");
      if (note.title.match(regex)) result.push(note);
    });
    return result;
  }
}
