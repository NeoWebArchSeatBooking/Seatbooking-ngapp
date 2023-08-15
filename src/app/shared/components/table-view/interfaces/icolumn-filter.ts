import { columnFilterConditon } from "../enums/table-view";

export interface IColumnFilter {
    key: string;
    value : string;
    condition?: columnFilterConditon
}


