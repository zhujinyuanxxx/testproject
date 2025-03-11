import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import piePatternSrc from '../photograph/docker.webp';
// import bgPatternSrc from '../photograph/docker.webp';
import bgPatternSrc from '../photograph/bodyImg.webp';

// 定义Option类型
type EChartOption = echarts.EChartsOption;

const Overview: React.FC = () => {
    const [option, setOption] = useState<EChartOption | null>(null);

    useEffect(() => {
        const piePatternImg = new Image();
        piePatternImg.src = piePatternSrc;
        const bgPatternImg = new Image();
        bgPatternImg.src = bgPatternSrc;

        piePatternImg.onload = () => {
            bgPatternImg.onload = () => {
                setOption({
                    backgroundColor: {
                        image: bgPatternImg,
                        repeat: 'repeat'
                    },
                    title: {
                        text: 'Demo',
                        textStyle: {
                            color: '#235894'
                        }
                    },
                    tooltip: {},
                    series: [
                        {
                            name: 'pie',
                            type: 'pie',
                            selectedMode: 'single',
                            selectedOffset: 30,
                            clockwise: true,
                            label: {
                                fontSize: 18,
                                color: '#235894'
                            },
                            labelLine: {
                                lineStyle: {
                                    color: '#235894'
                                }
                            },
                            data: [
                                // { value: 1048, name: 'Received' },
                                { value: 735, name: 'Retrieved' },
                                { value: 580, name: 'NotRetrieved' },
                            ],
                            itemStyle: {
                                opacity: 0.7,
                                color: {
                                    image: piePatternImg,
                                    repeat: 'repeat'
                                },
                                borderWidth: 3,
                                borderColor: '#235894'
                            }
                        }
                    ]
                });
            };
        };
    }, []);

    return option ? (
        <ReactECharts option={option} style={{ height: '400px' }} />
    ) : (
        <div>Loading...</div>
    );
};

export default Overview;
