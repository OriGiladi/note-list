import { Note } from "./main"
export class ListSort{
    private dataList: Note[];
    constructor(dataList: Note[]){
        this.dataList = dataList;
    }

    SortByAlphabet() : Note[]{ // Sorts the list of notes alphabetically by their titles
        const copyedDataList: Note[] = this.getCopiedDataList();
        const sorted: Note[] = copyedDataList.sort((a, b) => {
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
            if (titleA < titleB) return -1;
            if (titleA > titleB) return 1;
            return 0;
        });
        return sorted;
    }

    SortByDate(): Note[]{   // Sorts the list of notes by their creation dates in descending order
        const copyedDataList: Note[] = this.getCopiedDataList();
        const sorted: Note[] = copyedDataList.sort((a, b) =>
        new Date(b.content.creation_date).getTime() - new Date(a.content.creation_date).getTime());
        return sorted;
    }
    SortByDueToDate(): Note[]{     // Sorts the list of notes by their due-to dates in ascending order,
        // filtering out notes with undefined or null due-to dates
        const copyedDataList: Note[] = this.getCopiedDataList();
        let filteredDataList: Note[] = []
        for(let item in copyedDataList)
        {
            if(copyedDataList[item].content.do_to_date !== undefined)
            {
                if(copyedDataList[item].content.do_to_date !== null)
                    filteredDataList.push(copyedDataList[item]);
            }         
        }
        const sorted: Note[] = filteredDataList.sort((a, b) => {
            const dateA: number = new Date(a.content.do_to_date as Date).getTime();
            const dateB: number = new Date(b.content.do_to_date as Date).getTime();
            return  dateA - dateB;
            });
        return sorted;
    }
    getCopiedDataList(){ // just copies the dataList
        return  [...this.dataList];
    } 
}