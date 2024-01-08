export interface GeneratedReport {
    id: string | number;
    generationId: string;
    providerId: string;
    reportType: string;
    status: string;
    message?: string;
    providerName: string;
}

export interface GeneratedReports {
    generationId: string;
    generated: string;
    unixValue?: number;
    dateFrom: string;
    dateTo: string;
    type: string;
    status: string;
    reportFormat: string;
}
