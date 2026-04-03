'use client';

import WidgetCard from '@/components/molecules/WidgetCard';
import { type ChartConfig, ChartContainer } from '@/ui/chart';
import { FileBarChart } from 'lucide-react';
import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

export default function WidgetComplianceScore() {
  const score = 75;
  const chartData = [
    {
      name: 'Compliance',
      value: score,
      fill: '#3B82F6',
    },
  ];

  const chartConfig = {
    value: { label: 'Compliance' },
  } satisfies ChartConfig;

  return (
    <WidgetCard icon={FileBarChart} title='Compliance Score' className='items-center justify-center p-0'>
      <div className='flex flex-col items-center justify-center flex-1'>
        <ChartContainer config={chartConfig} className='h-44 w-44 mx-auto my-6'>
          <RadialBarChart
            width={176}
            height={176}
            data={chartData}
            innerRadius={80}
            outerRadius={110}
            startAngle={0}
            endAngle={270}
          >
            <PolarGrid
              gridType='circle'
              radialLines={false}
              stroke='none'
              className='first:fill-muted last:fill-background'
              polarRadius={[86, 74]}
            />

            <RadialBar dataKey='value' background cornerRadius={10} />

            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
                        <tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-4xl font-bold'>
                          {score}%
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground text-xs'>
                          Compliant
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </div>
      <p className='text-muted-foreground text-sm font-medium mt-auto pb-6'>Based on all tracked obligations</p>
    </WidgetCard>
  );
}
