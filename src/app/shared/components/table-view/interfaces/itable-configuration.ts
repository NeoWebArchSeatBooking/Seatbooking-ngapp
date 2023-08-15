export interface ITableConfiguration {
    disableFullTextSearch?:boolean;
    add?:boolean;
    actionConfig?:IActionConfig[];
    masterData?: Record<string, any>
    hidePagination?: boolean;
    serverRender?:boolean;
}

export interface IActionConfig {
    id: string;
    iconName: string;
    tooltip?:string;
    action?: (item:any, index?:any)=>void;
}
