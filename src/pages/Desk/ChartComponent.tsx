import { useState, useEffect, useRef } from "react";
import Highcharts, { Options } from "highcharts";
import HCExporting from "highcharts/modules/exporting";
import HCExportData from "highcharts/modules/export-data";
import moment from "moment";

// type
import { Commodity } from "../../libs/type/commodity";

// 初始化
HCExporting(Highcharts);
HCExportData(Highcharts);

interface Props {
  commodity?: Commodity;
  symbol: string;
  kline: number[][];
}

function over1Minute(lastTimestamp: number) {
  return Date.now() - lastTimestamp >= 1000 * 60;
}

function getLastNumber(kline: number[][]) {
  return kline[kline.length - 1];
}

function getLastPoint(chart: Highcharts.Chart) {
  let series = chart.series[0];
  return series.data[series.data.length - 1];
}

function getX(chart: Highcharts.Chart) {
  return (
    chart.plotLeft +
    chart.plotWidth -
    (chart.renderer.text(" ", 0, -9999).getBBox().width || 0) -
    0
  );
}

function getY(chart: Highcharts.Chart, value: number) {
  return chart.yAxis[0].toPixels(value, false) - 0;
}

const ChartComponent = ({ commodity, symbol, kline }: Props) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const [chart, setChart] = useState<Highcharts.Chart | null>(null);
  const [label, setLabel] = useState<Highcharts.SVGElement | null>(null);
  const [ts, setTs] = useState(0);

  useEffect(() => {
    if (commodity && chart) {
      if (over1Minute(ts)) {
        setTs(Date.now());
        chart.series[0].removePoint(0);
        chart.series[0].addPoint([commodity.ts! * 1000 || Date.now(), commodity.lastclose]);
      }

      if (label !== null) {
        let y = getY(chart, commodity.lastclose);
        let text = commodity.lastclose
          .toString()
          .toDigital(commodity.floatdigit);
        label.attr({ text, y });
      }

      let point = getLastPoint(chart);
      point.update([point.x, commodity.lastclose]);
    }
  }, [commodity]);

  useEffect(() => {
    if (kline.length && chartRef.current) {
      const chart: Highcharts.Chart = Highcharts.chart(chartRef.current, {
        chart: {
          zoomType: "x",
          backgroundColor: "black",
        },
        title: {
          text: "", // title文字, UI沒有所以設為空字串
          align: "left",
        },
        subtitle: {
          text: document.ontouchstart === undefined ? "" : "", // 副標題, UI沒有所以設定空字串
          align: "left",
        },
        xAxis: {
          type: "datetime",
          dateTimeLabelFormats: {
            second: "%H:%M:%S", // 時間格式
          },
          labels: {
            style: {
              color: "white", // X軸文字顏色
            },
          },
        },
        yAxis: {
          title: {
            text: "",
          },
          labels: {
            style: {
              color: "white", // Ｙ軸文字顏色
            },
          },
          opposite: true,
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
          area: {
            fillColor: {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 0,
                y2: 1,
              },
              stops: [
                [0, "rgba(255, 215, 0, 1)"],
                [1, "rgba(255, 215, 0, 0)"],
              ],
            },
            lineColor: "#FFD700",
            marker: {
              radius: 2,
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1,
              },
            },
            threshold: null,
          },
        },
        series: [
          {
            type: "area",
            name: symbol,
            data: kline,
            animation: false,
          },
        ],
        exporting: {
          enabled: false,
        },
        credits: {
          enabled: false,
        },
        time: {
          timezoneOffset: -moment().utcOffset(),
        }
      } as Options);

      let v = getLastNumber(kline)[1];
      let x = getX(chart);
      let y = getY(chart, v);
      const label = chart.renderer
        .label(v.toString(), x, y)
        .attr({
          zIndex: 10,
          fill: "#f17107",
        })
        .css({
          color: "white",
        })
        .add();
      setChart(chart);
      setLabel(label);
    }
  }, [kline]);

  return <div className="h-[calc(100vh-22rem)]" ref={chartRef} />;
};

export default ChartComponent;
