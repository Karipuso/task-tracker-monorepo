import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { LegendComponent, TooltipComponent } from "echarts/components";

echarts.use([TooltipComponent, LegendComponent, PieChart, CanvasRenderer]);

const Pie = ({
  data,
  name,
}: {
  data: { value: number; name: string }[];
  name: string;
}) => {
  const option = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name,
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        padAngle: 5,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data,
      },
    ],
  };

  return (
    <div className="flex flex-1 flex-col rounded-2xl border border-1 min-w-[300px] pt-4">
      <p className="ml-4">{name}</p>

      <div className="w-full">
        <ReactEChartsCore
          echarts={echarts}
          option={option}
          notMerge={true}
          lazyUpdate={true}
        />
      </div>
    </div>
  );
};

export default Pie;
