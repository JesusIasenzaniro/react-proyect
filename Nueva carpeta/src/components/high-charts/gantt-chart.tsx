import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import Highcharts from 'highcharts/highcharts-gantt';
import HighchartsExporting from 'highcharts/modules/exporting';
import HighchartsReact, {
    HighchartsReactRefObject,
} from 'highcharts-react-official';

interface TaskData {
    start: number;
    end: number;
    name: string;
    y: number;
}

interface Props {
    verticalInsightFundHistoricalStatus: string[];
    tasksData: TaskData[];
}

function GanttChart({ verticalInsightFundHistoricalStatus, tasksData }: Props) {
    HighchartsExporting(Highcharts);
    const chartComponentRef = useRef<HighchartsReactRefObject>(null);
    const [quarters, setQuarters] = useState<number[]>([]);

    const getQuarterStarts = useCallback(
        (startYear: number, endYear: number) => {
            const quarters = [];
            for (let year = startYear; year <= endYear; year++) {
                for (let quarter = 0; quarter < 4; quarter++) {
                    quarters.push(Date.UTC(year, quarter * 3, 1));
                }
            }
            return quarters;
        },
        []
    );

    const options: Highcharts.Options = useMemo(
        () => ({
            chart: {
                height: '500px',
            },
            credits: {
                enabled: false,
            },
            series: [
                {
                    type: 'gantt',
                    data: tasksData,
                },
            ],
            yAxis: {
                categories: verticalInsightFundHistoricalStatus,
                opposite: true,
            },
            xAxis: [
                {
                    tickInterval: 1000 * 60 * 60 * 24 * 365,
                    min: Date.UTC(2013, 0, 1),
                    max: Date.UTC(2023, 11, 31),
                    labels: {
                        format: '{value:%Y}',
                    },
                },
                {
                    linkedTo: 0,
                    tickPositions: quarters,
                    labels: {
                        formatter: function () {
                            const date = new Date(this.value);
                            const quarter =
                                Math.floor(date.getUTCMonth() / 3) + 1;
                            return 'Q' + quarter;
                        },
                    },
                },
            ],
        }),
        [verticalInsightFundHistoricalStatus, tasksData, quarters]
    );

    useEffect(() => {
        setQuarters(getQuarterStarts(2013, 2024));
    }, [setQuarters, getQuarterStarts]);

    return (
        <HighchartsReact
            highcharts={Highcharts}
            constructorType={'ganttChart'}
            options={options}
            ref={chartComponentRef}
        />
    );
}

export default GanttChart;
