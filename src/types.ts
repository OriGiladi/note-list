import { color } from "./main";
///////////////////////////////////////////////////

// Note interface and note object type
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
