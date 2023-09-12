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

export interface IActionConfig {
    id: string;
    iconName: string;
    tooltip?:string;
    actionEnableField?:string;
    action?: (item:any, index?:any)=>void;
}
