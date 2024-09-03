'use client';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from '@/components/ui/chart';
import { useRecoilValueLoadable } from 'recoil';
import { analyticsAtom } from '@/store/atoms';
import { TypewriterEffectSmooth } from '@/components/ui/typewriter-effect';

const chartData = [
    { status: 'Backlog', count: 186, mobile: 80 },
    { status: 'Progress', count: 305, mobile: 200 },
    { status: 'Todo', count: 237, mobile: 120 },
    { status: 'Done', count: 73, mobile: 190 }
];

const chartConfig = {
    count: {
        label: 'Count',
        color: '#2563eb'
    }
    // mobile: {
    //    label: "Mobile",
    //    color: "#60a5fa",
    //  },
} satisfies ChartConfig;

export function Component() {
    const { state, contents: AnalyticsData } =
        useRecoilValueLoadable(analyticsAtom);
    if (state == 'hasValue') {
        chartData[0].count = AnalyticsData?.Backlog;
        chartData[1].count = AnalyticsData?.Progress;
        chartData[2].count = AnalyticsData?.Todo;
        chartData[3].count = AnalyticsData?.Done;
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
                    dataKey="count"
                    fill="var(--color-count)"
                    radius={6}
                />
                {/* <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} /> */}
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
