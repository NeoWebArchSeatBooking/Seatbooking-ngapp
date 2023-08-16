export interface IAPIConfiguration {
    key?: string,
    group?: string;
    isMock?: boolean;
    muteNotifyError?: boolean;
    overrideBaseURL?:string;
    overrideResourcePath?: string;
}