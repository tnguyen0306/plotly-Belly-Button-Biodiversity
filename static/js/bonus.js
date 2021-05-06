// Create function to create gauge chart
function gaugeChart(id) {

    // Read samples.json
    d3.json("samples.json").then (sampleData =>{

        // Retrieve meta data info by chosen id
        var metaData = sampleData.metadata.filter(meta => meta.id.toString() === id)[0];
        var data = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: metaData.wfreq,
                title: { text: "Belly Button Washing Frequency"},
                type: "indicator",
                mode: "gauge",
                gauge: {
                    axis: { range: [0, 9] },
                    steps: [
                        { range: [0, 1], color: "#f4f8f8" },
                        { range: [1, 2], color: "#e9f2f2" },
                        { range: [2, 3], color: "#d4e5e5" },
                        { range: [3, 4], color: "#bed9d8" },
                        { range: [4, 5], color: "#a8cccc" },
                        { range: [5, 6], color: "#92bfc0" },
                        { range: [6, 7], color: "#7bb3b3" },
                        { range: [7, 8], color: "#64a5a6" },
                        { range: [8, 9], color: "#4b9a9a" }
                    ]
                }
            }
        ];
        
        var layout = { width: 450, height: 375, margin: { t: 0, b: 0 } };
        
        Plotly.newPlot('gauge', data, layout);
    
    });
}

