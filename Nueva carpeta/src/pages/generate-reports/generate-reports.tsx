import { useCallback, useEffect, useMemo, useState } from 'react';
import SearchBar from '../../components/search-bar/search-bar';
import { formats, generateByData } from '../../data/shared/data-for-select';
import OptionSelect from '../../components/option-select/option-select';
import { useMutation, useQuery } from '@apollo/client';
import { GET_GROUPS } from '../../graphql/queries/groups';
import { Box, Button, Grid } from '@mui/material';
import {
    months,
    quarters,
    years,
} from '../../data/generate-reports/data-for-select';
import Loading from '../loading/loading';
import {
    GENERATE_BY_BILLING_GROUP,
    GENERATE_BY_FUND_GROUP,
} from '../../graphql/mutations/reports';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useUIControlContext } from '../../context/ui-control-context';
import { Group } from '../../types/group';
import { IFormInputs } from '../../types/shared';
import { useDataProcessingContext } from '../../context/data-processing-context';
import dayjs from 'dayjs';
import { columns } from '../../data/columns/generate-reports';
import CustomTable from '../../components/custom-table/custom-table';
import ErrorPage from '../error/error-page';
import Toast from '../../components/toast/toast';
import SimpleBackdrop from '../../components/backdrop/backdrop';
import { buttonGroupData } from '../../data/generate-reports/data-for-button-group';
import ButtonGroup from '../../components/button-group/button-group';

function GenerateReports() {
    document.title = `${document.title} - Generate Reports`;
    const { selected, setSelected } = useDataProcessingContext();
    const {
        alertSeverity,
        setAlertSeverity,
        alertMessage,
        setAlertMessage,
        openToast,
        handleOpenToast,
        handleCloseToast,
        openBackdrop,
        handleOpenBackdrop,
        handleCloseBackdrop,
    } = useUIControlContext();

    const {
        handleSubmit,
        control,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IFormInputs>({
        defaultValues: {
            type: 'BillingGroup',
            year: '2024',
            month: 'January',
            quarter: '',
            format: 'STANDARD',
            searchValue: '',
            monthly: 'monthly',
        },
    });

    const type = watch('type');
    const monthly = watch('monthly');
    const searchValue = watch('searchValue');

    const { data: allGroupsData, loading: loadingGroups } =
        useQuery(GET_GROUPS);

    const [
        generateByBillingGroupMutation,
        { loading: loadingGenerateByBillingGroup },
    ] = useMutation(GENERATE_BY_BILLING_GROUP);

    const [
        generateByFundGroupMutation,
        { loading: loadingGenerateByFundGroup },
    ] = useMutation(GENERATE_BY_FUND_GROUP);

    const [groupData, setGroupData] = useState<Group[]>([]);

    const [filteredGroupData, setFilteredGroupData] = useState<Group[]>([]);

    const calculateMonthRange = useCallback(
        (year: string | number, month: string | number) => {
            const startDate = dayjs(
                `${year}-${String(month).padStart(2, '0')}`
            );
            const endDate = startDate
                .endOf('month')
                .set('hour', 23)
                .set('minute', 59)
                .set('second', 59)
                .set('millisecond', 999);

            return { startDate, endDate };
        },
        []
    );

    const calculateQuarterRange = useCallback(
        (year: string | number, quarter: string) => {
            const quarterStartMonth = ['01', '04', '07', '10'][
                parseInt(quarter.slice(1)) - 1
            ];
            const quarterEndMonth = ['03', '06', '09', '12'][
                parseInt(quarter.slice(1)) - 1
            ];

            const startDate = dayjs(`${year}-${quarterStartMonth}`);
            const endDate = dayjs(`${year}-${quarterEndMonth}`)
                .endOf('month')
                .set('hour', 23)
                .set('minute', 59)
                .set('second', 59)
                .set('millisecond', 999);

            return { startDate, endDate };
        },
        []
    );

    const calculateDateRange = useCallback(
        (year: string | number, month: string | number, quarter: string) => {
            if (!year) {
                throw new Error('Year must be provided.');
            }

            let startDate, endDate;

            if (month) {
                ({ startDate, endDate } = calculateMonthRange(year, month));
            } else if (quarter) {
                ({ startDate, endDate } = calculateQuarterRange(year, quarter));
            }

            return {
                dateFrom: startDate?.format('YYYY-MM-DDTHH:mm:ss'),
                dateTo: endDate?.format('YYYY-MM-DDTHH:mm:ss'),
            };
        },
        [calculateMonthRange, calculateQuarterRange]
    );

    const filterReports = useCallback(() => {
        if (!searchValue) {
            setFilteredGroupData(groupData);
            return;
        }
        const filteredData = groupData.filter((item) => {
            const emailAddresses: string[] | undefined =
                item.contact?.split(';');

            return (
                item.iBillingGroupCode
                    ?.toString()
                    .includes(searchValue.toLowerCase().replace(/\s+/g, '')) ||
                item.sBillingGroupName
                    ?.toString()
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(searchValue.toLowerCase()) ||
                emailAddresses?.some((email) =>
                    email
                        .toLowerCase()
                        .replace(/\s+/g, '')
                        .includes(searchValue.toLowerCase())
                )
            );
        });
        setFilteredGroupData(filteredData);
    }, [groupData, searchValue]);

    const onSubmit: SubmitHandler<IFormInputs> = useCallback(
        async ({ type, format, year, month, quarter }) => {
            if (selected.length > 0 && Object.keys(errors).length === 0) {
                const startDate = calculateDateRange(
                    year as string,
                    month as string,
                    quarter as string
                ).dateFrom;
                const endDate = calculateDateRange(
                    year as string,
                    month as string,
                    quarter as string
                ).dateTo;

                const input = {
                    dateFrom: startDate,
                    dateTo: endDate,
                    fileFormat: format,
                    ids: selected,
                };
                handleOpenBackdrop();
                try {
                    if (type === 'BillingGroup') {
                        await generateByBillingGroupMutation({
                            variables: {
                                request: input,
                            },
                        });
                    } else {
                        await generateByFundGroupMutation({
                            variables: {
                                request: input,
                            },
                        });
                    }

                    handleCloseBackdrop();
                    setAlertSeverity('success');
                    setAlertMessage('Report(s) generated successfully');
                    handleOpenToast();
                } catch (error) {
                    handleCloseBackdrop();
                    setAlertSeverity('error');
                    setAlertMessage(
                        'There was an unexpected error generating a report'
                    );
                    handleOpenToast();
                }
            } else {
                setAlertSeverity('error');
                setAlertMessage('You need to select a report');
                handleOpenToast();
            }
        },
        [
            calculateDateRange,
            errors,
            generateByBillingGroupMutation,
            generateByFundGroupMutation,
            handleCloseBackdrop,
            handleOpenBackdrop,
            handleOpenToast,
            selected,
            setAlertMessage,
            setAlertSeverity,
        ]
    );

    const rows = useMemo(() => {
        return filteredGroupData.map(
            ({
                iBillingGroupCode,
                sBillingGroupName,
                sContactList,
                codFundGroup,
                fundGroupName,
                contact,
            }) => {
                return {
                    id:
                        type === 'BillingGroup'
                            ? iBillingGroupCode
                            : codFundGroup,
                    name:
                        type === 'BillingGroup'
                            ? sBillingGroupName
                            : fundGroupName,
                    contact:
                        type === 'BillingGroup'
                            ? sContactList?.replace(/;/g, ', ')
                            : contact?.replace(/;/g, ', '),
                };
            }
        );
    }, [filteredGroupData, type]);

    const selectData = useMemo(
        () => [
            {
                control: control,
                name: 'type',
                data: generateByData,
                labelId: 'select-type-label',
                label: true,
                selectId: 'select-type',
                labelName: 'Type',
            },
            {
                control: control,
                name: 'format',
                data: formats,
                labelId: 'select-status-label',
                label: true,
                selectId: 'select-format',
                labelName: 'Format',
                error: !!errors.format,
            },
            {
                control: control,
                name: 'year',
                data: years,
                labelId: 'select-year-label',
                label: true,
                selectId: 'select-year',
                labelName: 'Year',
                error: !!errors.year,
            },
        ],
        [control, errors.format, errors.year]
    );

    useEffect(() => {
        try {
            if (allGroupsData) {
                if (type === 'BillingGroup') {
                    setGroupData(allGroupsData.billingGroups);
                } else {
                    setGroupData(allGroupsData.fundGroups);
                }
            }
        } catch (error) {
            console.log('error-getting-generate-reports', error);
        }
    }, [allGroupsData, type]);

    useEffect(() => {
        filterReports();
    }, [filterReports, groupData, searchValue]);

    useEffect(() => {
        if (monthly === 'monthly') {
            setValue('month', '');
        } else {
            setValue('quarter', '');
        }
    }, [monthly, setValue]);

    if (loadingGroups) return <Loading />;

    return (
        <Box
            onSubmit={handleSubmit(onSubmit)}
            component={'form'}
            sx={{ width: '100%' }}
        >
            <>
                {groupData.length > 0 ? (
                    <Grid container item gap={2}>
                        {selectData?.map(
                            ({
                                control,
                                name,
                                data,
                                labelId,
                                label,
                                selectId,
                                labelName,
                                error,
                            }) => (
                                <Grid
                                    key={name}
                                    item
                                    container
                                    gap={2}
                                    sx={{ width: '150px' }}
                                >
                                    <OptionSelect
                                        control={control}
                                        name={name}
                                        data={data}
                                        labelId={labelId}
                                        label={label}
                                        selectId={selectId}
                                        labelName={labelName}
                                        error={error}
                                    />
                                </Grid>
                            )
                        )}

                        <Grid item>
                            <ButtonGroup
                                control={control}
                                name={'monthly'}
                                data={buttonGroupData}
                            />
                        </Grid>

                        <Grid item sx={{ width: 180 }}>
                            <OptionSelect
                                control={control}
                                name={
                                    monthly === 'monthly' ? 'month' : 'quarter'
                                }
                                data={monthly === 'monthly' ? months : quarters}
                                labelId={`select-${
                                    monthly === 'monthly' ? 'month' : 'quarter'
                                }-label`}
                                label={true}
                                selectId={`select-${
                                    monthly === 'monthly' ? 'month' : 'quarter'
                                }`}
                                labelName={
                                    monthly === 'monthly' ? 'Month' : 'Quarter'
                                }
                                error={
                                    !!errors[
                                        monthly === 'monthly'
                                            ? 'month'
                                            : 'quarter'
                                    ]
                                }
                            />
                        </Grid>

                        <Grid item>
                            <Button
                                disabled={
                                    loadingGenerateByBillingGroup ||
                                    loadingGenerateByFundGroup
                                }
                                type='submit'
                                color='success'
                                variant='contained'
                                size='large'
                            >
                                Generate
                            </Button>
                        </Grid>

                        <Grid
                            item
                            sx={{
                                width: '100%',
                                marginBottom: -3,
                                marginTop: 2,
                            }}
                        >
                            <SearchBar
                                label={'Search by id, name or contact'}
                                icon={false}
                                control={control}
                            />
                        </Grid>

                        {filteredGroupData && filteredGroupData.length > 0 && (
                            <Grid item sx={{ width: '100%' }}>
                                <CustomTable
                                    useCheckbox
                                    selected={selected}
                                    setSelected={setSelected}
                                    columns={columns}
                                    rows={rows}
                                />
                            </Grid>
                        )}

                        {filteredGroupData?.length === 0 && (
                            <ErrorPage
                                errorMessage={'There are no reports to show'}
                            />
                        )}
                    </Grid>
                ) : (
                    <ErrorPage errorMessage={'There are no reports to show'} />
                )}
            </>
            <Toast
                handleCloseToast={handleCloseToast as () => void}
                openToast={openToast as boolean}
                severity={alertSeverity}
                message={alertMessage}
            />

            <SimpleBackdrop
                handleCloseBackdrop={handleCloseBackdrop as () => void}
                openBackdrop={openBackdrop as boolean}
            />
        </Box>
    );
}

export default GenerateReports;
