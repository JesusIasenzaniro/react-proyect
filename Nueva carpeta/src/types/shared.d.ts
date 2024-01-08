import { OverridableStringUnion } from '@mui/types';
import { ChipPropsColorOverrides } from '@mui/material';
import { FileList } from 'react';

export interface ReturnChipStatus {
    label: string | undefined;
    color:
        | OverridableStringUnion<
              | 'default'
              | 'primary'
              | 'secondary'
              | 'error'
              | 'info'
              | 'success'
              | 'warning',
              ChipPropsColorOverrides
          >
        | undefined;
}

export interface Columns {
    headerName: string;
    field: keyof ColumnsName | string;
}

export interface Rows {
    id?: string | number;
    name?: string;
    contact?: string;
    type?: string;
    dateFrom?: string;
    dateTo?: string;
    generated?: string;
    status?: string;
    format?: string;
    groupName?: string;
    emailList?: string;
    uploadFileName?: string;

    //for risk list only// when we use resal data change it
    // riskId?: string;
    // riskName?: string;
    // riskProductType?: string;
    productType?: string;
    //for risk list file upload only// when we use resal data change it
    informationEffectiveDate?: string;
    authors?: string;

    //for research list  only// when we use resal data change it
    fundFamily?: string;
    isin?: string;
    peerGroup?: string;
    asset?: string;
    factsheetDate?: string;
    afbStatus?: string;
}

export interface ItemUrlData {
    key: string;
    value: string;
}

export interface IFormInputs {
    dateTimeReportsList?: Dayjs | null;
    monthly?: string;
    format?: string;
    status?: string;
    type?: string;
    year?: string;
    month?: string;
    quarter?: string;
    addEmail?: string;
    searchValue?: string;
    userName?: string;
    password?: string;
    category?: string;
    referenceDate: Dayjs | null;
    companyInceptionDate: Dayjs | null;
    structuralDescription?: string;
    amhOverview?: string;
    productSegmentationDate?: Dayjs | null;
    moneyMarket?: string;
    fixedIncome?: string;
    balance?: string;
    alternatives?: string;
    equity?: string;
    fundOfFunds?: string;
    othersProductSegmentation?: string;
    totalProductSegmentation?: string;
    retail?: string;
    institutional?: string;
    captive?: string;
    othersClientSegmentation?: string;
    totalClientSegmentation?: string;
    yOne?: string;
    yTwo?: string;
    yThree?: string;
    yFour?: string;
    yFive?: string;
    securitiesLendingProgram?: string;
    syntheticProgram?: string;
    swingFactors?: string;
    aumConcentration?: string;
    externalAuditor?: string;
    aumStability?: string;
    administrator?: string;
    custodian?: string;
    assetManagerDSLinkedToTheReport?: string;
    sendToConnect?: boolean;
    independentRisk?: string;
    oecdRegulator?: string;
    independentAdmin?: string;
    independentCustodian?: string;
    thirdPartyProvidersStability?: string;
    governanceStability?: string;
    bigFourAuditor?: string;
    esgPolicy?: string;
    donations?: string;
    unpriSignatory?: string;
    uploadedFiles?: FileList[];
    dateOfUploadFile?: Dayjs | null;
    dueDiligence?: string;
    searchByDateOfUploadedFile?: Dayjs | null;
    showDueDiligence?: string;
    family?: string;
    peerGroup?: string;
    afbStatus?: string;
    analyst?: string;
    insightFunds?: boolean;
    fundIsin?: string;
    fundFamilyName?: string;
    belongsToInsightList?: string;
    applyAllFamilyFunds?: boolean;
    factsheetDate?: Dayjs | null;
    inceptionDate?: Dayjs | null;
    manager?: string;
    peerGroupGeneralInfo?: string;
    benchmark?: string;
    profile?: string;
    afbStatusGeneralInfo?: string;
    underReview?: boolean;
    fundDescription?: string;
    assessment?: string;
    teamStars?: number;
    team?: string;
    investmentProcessStars?: number;
    investmentProcess?: string;
    entityType?: string;
    entityName?: string;
}

export interface ColumnsName {
    id: string;
    name: string;
    contact: string;
    type: string;
    dateFrom: string;
    dateTo: string;
    generated: string;
    status: string;
    format: string;
    action: string;
    providerId: string;
    reportType: string;
    providerName: string;
    groupName: string;
    emailList: string;
    generationId: string;
    message: string;
    riskName: string;
    riskProductType: string;
    riskId: string;
    uploadFileName: string;
    fileDate: string;
    author: string;
    fundFamily: string;
    isin: string;
    peerGroup: string;
    asset: string;
    factsheetDate: string;
    afbStatus: string;

    //for risk list only
    // riskId: string;
    // riskName: string;
    // riskProductType: string;
    productType: string;
    //for risk list file upload only only
    informationEffectiveDate: string;
    authors: string;
    //for research list  only// when we use resal data change it
    fundFamily: string;
    isin: string;
    peerGroup: string;
    asset: string;
    factsheetDate: string;
    afbStatus: string;
}

export interface ControlProps {
    control: Control<IFormInputs>;
}

export interface Data {
    control: Control<IFormInputs>;
    name: string;
    labelName?: string;
}

export interface UploadFilesArray {
    id: string | number;
    name: string;
    fileDate: string;
    author: string;
    dueDiligence?: string;
}
