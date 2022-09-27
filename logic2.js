sampleValues = [];
otuIds = [];
hoverInfo = [];
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

d3.json(url).then(function(data) 
{
    console.log(data)

   
    sampleValues = data.samples[0].sample_values;
    otuIds = data.samples[0].otu_ids;
    hoverInfo = data.samples[0].otu_labels;
          
    //console.log(sampleValues);
    //console.log(otuIds);
    //console.log(hoverInfo);


    var trace1 = {
        x: otuIds,
        y: sampleValues,
        text: hoverInfo,
        mode: 'markers',
        marker: {
        color: otuIds,
        size: sampleValues
        }
    };
    
    var data = [trace1];
    
    var layout = {
        title: 'Belly Button Biodiversity',
        showlegend: false,
        height: 600,
        width: 1200
    };
    
    Plotly.newPlot('bubble', data, layout);
    
});