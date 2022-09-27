const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";



// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", updatePlotly);

// This function is called when a dropdown menu item is selected
function updatePlotly() 
{


}


// Fetch the JSON data with promise
d3.json(url).then(function(data) 
{

  console.log(data);
  // data.samples[0].sample_values will be values of the bar chart
  // data.samples[0].otu_ids will be labels of the bar chart
  // data.samples[0].otu_labels will be hovertext of the bar chart

  //for (var i = 0; i < data.samples.length; i++)
  //{ 

    sampleValues = [];
    otuIds = [];
    hoverInfo = [];
    for (var x = 0; x < 10; x++)
    {
      sampleValues.push(data.samples[0].sample_values[x]);
      otuIds.push(`OTU ${data.samples[0].otu_ids[x]}`);
      hoverInfo.push(data.samples[0].otu_labels[x]);
    }

    console.log(hoverInfo);

    let trace = {
      x:sampleValues ,
      y: otuIds,
      type: 'bar',
      orientation: 'h',
      hovertext: hoverInfo
    };

    let barData = [trace];
      
    let layout = {
       title: "Belly Button Biodiversity"
    };
    
  //}


  Plotly.newPlot("bar", barData, layout);
  
});

