import { Note } from "./main"
export class ListSort{
    private dataList: Note[];
    constructor(dataList: Note[]){
        this.dataList = dataList;
    }

    SortByAlphabet() : Note[]{
        const copyed_data_list: Note[] = [...this.dataList];
        const sorted: Note[] = copyed_data_list.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            if (titleA < titleB) return -1;
            if (titleA > titleB) return 1;
            return 0;
        });
        return sorted;
    }

    SortByDate(): Note[]{
        const copyed_data_list: Note[] = [...this.dataList];
        const sorted: Note[] = copyed_data_list.sort((a, b) =>
        new Date(b.content.creation_date).getTime() - new Date(a.content.creation_date).getTime());
        return sorted;
    }
    SortByDueToDate(): Note[]{
        const copyed_data_list: Note[] = [...this.dataList];
        let filtered_data_list: Note[] = []
        for(let item in copyed_data_list)
        {
            if(copyed_data_list[item].content.do_to_date !== undefined)
            {
                if(copyed_data_list[item].content.do_to_date !== null)
                    filtered_data_list.push(copyed_data_list[item]);
            }         
        }
        const sorted: Note[] = filtered_data_list.sort((a, b) => {
            const dateA: number = new Date(a.content.do_to_date as Date).getTime();
            const dateB: number = new Date(b.content.do_to_date as Date).getTime();
            return  dateA - dateB;
            });
        return sorted;
    }
}