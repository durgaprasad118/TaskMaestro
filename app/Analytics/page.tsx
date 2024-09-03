'use client';
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from '@/components/ui/chart';
import { analyticsAtom } from '@/store/atoms';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { useRecoilValueLoadable } from 'recoil';
const chartData = [
    { status: 'Backlog', taskCount: 186, subTaskCount: 80 },
    { status: 'Progress', taskCount: 305, subTaskCount: 200 },
    { status: 'Todo', taskCount: 237, subTaskCount: 120 },
    { status: 'Done', taskCount: 73, subTaskCount: 190 }
];

const chartConfig = {
    taskCount: {
        label: 'taskCount',
        color: '#2563eb'
    },
    subTaskCount: {
        label: 'subTaskCount',
        color: '#60a5fa'
    }
} satisfies ChartConfig;

export function Component() {
    const { state, contents: AnalyticsData } =
        useRecoilValueLoadable(analyticsAtom);
    if (state == 'hasValue') {
        chartData[0].taskCount = AnalyticsData?.Backlog[0];
        chartData[0].subTaskCount = AnalyticsData?.Backlog[1];
        chartData[1].taskCount = AnalyticsData?.Progress[0];
        chartData[1].subTaskCount = AnalyticsData?.Progress[1];
        chartData[2].taskCount = AnalyticsData?.Todo[0];
        chartData[2].subTaskCount = AnalyticsData?.Todo[1];
        chartData[3].taskCount = AnalyticsData?.Done[0];
        chartData[3].subTaskCount = AnalyticsData?.Done[1];
    }
    return (
        <ChartContainer
            config={chartConfig}
            className="min-h-[400px] w-[500px]"
        >
            <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="status"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) => value}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                    className="flex gap-10"
                    dataKey="taskCount"
                    fill="var(--color-taskCount)"
                    radius={6}
                />
                <Bar
                    className="flex gap-10"
                    dataKey="subTaskCount"
                    fill="var(--color-subTaskCount)"
                    radius={6}
                />
            </BarChart>
        </ChartContainer>
    );
}
const View = () => {
    return (
        <main className="flex h-[80vh] w-[100vw]  flex-col items-center justify-center ">
            <div className="my-4">
                <h2 className="my-10 text-xl text-center sm:text-4xl dark:text-white text-black">
                    Analytics
                </h2>
            </div>

            <Component />
        </main>
    );
};

export default View;
