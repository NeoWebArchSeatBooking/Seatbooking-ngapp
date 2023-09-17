import { ActionType } from "../enums/column-type";

export interface ITableConfiguration {
    disableFullTextSearch?:boolean;
    add?:boolean;
    addConfig?:IAddConfig;
    actionConfig?:IActionConfig[];
    masterData?: Record<string, any>
    hidePagination?: boolean;
    serverRender?:boolean;
}

export interface IAddConfig {
    label?: string;
    tooltip?: string;
}

export interface IActionConfig{
    id: string;
    type?: ActionType;
    label?: string;
    iconName?: string;
    tooltip?:string;
    disableOptions?:IActionDisableOptions;
    actionEnableField?:string;
    action?: (item:any, index?:any)=>void;
}

export interface IActionDisableOptions {
    field: string;
    value: any;
    label? : string;
    iconName?: string;
}
