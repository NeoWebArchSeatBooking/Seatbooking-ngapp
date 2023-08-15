import { IColumnDefinition } from "../interfaces/icolumn-definition";

export class ColumnDefintionModel implements IColumnDefinition {
    field!:string ;
    label!: string;
    type!: string;

    constructor(data: IColumnDefinition) {
        Object.assign(this, data);
    }

    getDispalyedColumn() {
        return this.field;
    }
}
