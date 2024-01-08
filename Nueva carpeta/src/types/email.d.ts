export interface EmailsData {
    id: string | number;
    providerName: string;
    generationId: string;
    status: string;
    message: string;
    generationType: string;
}

export interface ProviderEmailData {
    groupName: string;
    emailList: string;
}
