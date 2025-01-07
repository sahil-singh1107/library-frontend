import { Label, Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useEffect, useMemo, useState } from "react"
import axios from "axios"

const chartConfig = {
    books: {
        label: "Books",
        color: "white"
    },
    pending: {
        label: "Pending",
        color: "hsl(var(--chart-1))"
    },
    returned: {
        label: "Returned",
        color: "hsl(var(--chart-2))",
    },
    approved: {
        label: "Approved",
        color: "hsl(var(--chart-3))",
    },
} satisfies ChartConfig

const BookChart = () => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchChartData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/v1/getStats");
                setChartData(response.data);
                console.log(chartData)
            } catch (error) {
                console.error("Error fetching chart data:", error);
            } 
        };
        fetchChartData();
    }, []);

   

    return (
        <Card className="flex flex-col bg-transparent border-none">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-white font-title2 text-xl">Library Statistics</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="books"
                            nameKey="request"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                               
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Books
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default BookChart
