export interface IColumnDefinition {
    id?: string;
    field: string;
    label: string;
    type : string;
    readOnly?: boolean;
    idField?: string;
    labelField?: string;
}
