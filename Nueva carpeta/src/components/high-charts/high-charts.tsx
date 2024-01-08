import React, { useMemo, useRef } from 'react';
import HighchartsReact, {
    HighchartsReactRefObject,
} from 'highcharts-react-official';
import * as Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';
import { Box } from '@mui/system';

interface Props {
    barChartsValue: number[];
    categories: string[];
    dataForYAxis: number[];
    isXAxisVisible: boolean;
    height: string;
    chartType: Highcharts.SeriesOptionsType['type'];
    showLabelIcon: boolean;
    tooltipEndLabelText: string;
}

function HighChartsComponent({
    barChartsValue,
    categories,
    dataForYAxis,
    isXAxisVisible,
    height,
    chartType,
    showLabelIcon,
    tooltipEndLabelText,
}: Props) {
    HighchartsExporting(Highcharts);
    const chartComponentRef = useRef<HighchartsReactRefObject>(null);

    const options: Highcharts.Options = useMemo(
        () => ({
            chart: {
                height: height,
            },

            title: {
                style: {
                    display: 'none',
                },
            },
            series: [
                {
                    type: chartType as 'bar' | 'area',
                    data: barChartsValue,
                },
            ],

            tooltip: {
                shared: true,
                useHTML: true,
                headerFormat:
                    '<table><th colspan="2" style="font-weight: normal">{point.key}:</th>',
                pointFormat:
                    '<td style="display:none">{series.name}' +
                    `<td style="text-align: right"><b>{point.y} ${tooltipEndLabelText}</b></td></tr>`,
                footerFormat: '</table>',
                valueDecimals: 0,
            },

            xAxis: {
                visible: isXAxisVisible,
                categories: categories,
            },

            yAxis: {
                title: {
                    style: {
                        display: 'none',
                    },
                },
                tickPositions: dataForYAxis,
                showLastLabel: true,

                labels: {
                    formatter: function () {
                        return `${this.value}${showLabelIcon ? '%' : ''}`;
                    },
                },
            },

            legend: {
                enabled: false,
            },
            credits: {
                enabled: false,
            },
            exporting: {
                enabled: true,
                buttons: {
                    contextButton: {
                        menuItems: [
                            'downloadPNG',
                            'downloadJPEG',
                            'downloadPDF',
                            'downloadSVG',
                        ],
                    },
                },
            },
        }),
        [barChartsValue]
    );

    return (
        <Box sx={{ width: '100%' }}>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                ref={chartComponentRef}
            />
        </Box>
    );
}

export default HighChartsComponent;
