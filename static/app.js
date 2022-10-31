const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";



// Call updatePlotly() when a change takes place to the DOM
d3.selectAll("#selDataset").on("change", update);

// This function is called when a dropdown menu item is selected
function update() {
  // use d3 to select the dropdown menu 
  let dropMenu = d3.select("#selDataset");

  // assign the value of the dropdown menu option to variable 
  // (this would be the sample, whos data we want displayed)
  let dataset = dropMenu.property("value");
  

  d3.json(url).then((data) => {

    desiredID = "";
    for (var i = 0; i < data.samples.length; i++) {
      if (data.samples[i].id == dataset) {
        desiredID = i;
      }
    }

    sampleValues = []
    otuIds = []
    otuIdStrings = []
    hoverInfo = []



    for (var x = 0; x < data.samples[desiredID].sample_values.length; x++) {

      sampleValues.push(data.samples[desiredID].sample_values[x]);
      otuIdStrings.push(`OTU ${data.samples[desiredID].otu_ids[x]}`);
      otuIds.push(data.samples[desiredID].otu_ids[x]);
      hoverInfo.push(data.samples[desiredID].otu_labels[x]);

    }
    for (var x = 0; x < 10; x++) {
      otuIdStrings.push(`OTU ${data.samples[desiredID].otu_ids[x]}`);
    }

    // set x and y equal to relevant sample data for graph
    y = otuIdStrings
    x = sampleValues.slice(0, 11)

    Plotly.restyle("bar", "x", [x]);
    Plotly.restyle("bar", "y", [y]);

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

    var Bubbledata = [trace1];

    var layout = {
      title: 'Belly Button Biodiversity',
      showlegend: false,
      height: 600,
      width: 1200
    };

    Plotly.newPlot('bubble', Bubbledata, layout);

    // save metaData attributes into variables
    age = data.metadata[desiredID].age;
    bbtype = data.metadata[desiredID].bbtype;
    ethnicity = data.metadata[desiredID].ethnicity;
    gender = data.metadata[desiredID].gender;
    id = data.metadata[desiredID].id;
    geo = data.metadata[desiredID].location;
    wfreq = data.metadata[desiredID].wfreq;

    // when refering html attributes using d3 use "#" for id and "." class
    metaDataText = d3.select(".panel-body");

    // add data to metData panel body
    d3.select("#id").text(`id: ${id}`);
    d3.select("#eth").text(`ethnicity: ${ethnicity}`);
    d3.select("#gen").text(`gender: ${gender}`);
    d3.select("#age").text(`age: ${age}`);
    d3.select("#loc").text(`location: ${geo}`);
    d3.select("#bbt").text(`bbtype: ${bbtype}`);
    d3.select("#wfreq").text(`wfreq: ${wfreq}`);

  });


}

function initialize()
{
  console.log("Initializing...")

  // populate dropdown with sample ids
  var selectC = d3.select("#selDataset");
  d3.json(url).then((data) => {
    let sampleNames = data.names; //array of events
    //console.log(eventNames);
    //use a for each to create options
    sampleNames.forEach((sample) => {
      selectC.append("option")
        .text(sample)
        .property("value", sample);
    });

    // console.log(data);

    // init bar graph 
    sampleValues = [];
    otuIds = [];
    hoverInfo = [];
    for (var x = 0; x < 10; x++) {
      sampleValues.push(data.samples[0].sample_values[x]);
      otuIds.push(`OTU ${data.samples[0].otu_ids[x]}`);
      hoverInfo.push(data.samples[0].otu_labels[x]);
    }

    

    let trace = {
      x: sampleValues,
      y: otuIds,
      type: 'bar',
      orientation: 'h',
      hovertext: hoverInfo
    };

    let barData = [trace];

    let layout = {
      title: "Belly Button Biodiversity"
    };

    Plotly.newPlot("bar", barData, layout);

    // init Bubble Chart

    sampleValues = data.samples[0].sample_values;
    otuIds = data.samples[0].otu_ids;
    hoverInfo = data.samples[0].otu_labels;


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
    
    var Bubbledata = [trace1];
    
    var layout2 = {
        title: 'Belly Button Biodiversity',
        showlegend: false,
        height: 600,
        width: 1200
    };
    
    Plotly.newPlot('bubble', Bubbledata, layout2);


    // init demographics

    // save metaData attributes into variables
    age = data.metadata[0].age;
    bbtype = data.metadata[0].bbtype;
    ethnicity = data.metadata[0].ethnicity;
    gender = data.metadata[0].gender;
    id = data.metadata[0].id;
    geo = data.metadata[0].location;
    wfreq = data.metadata[0].wfreq;

    // when refering html attributes using d3 use "#" for id and "." class
    metaDataText = d3.select(".panel-body");

    // add data to metData panel body
    d3.select("#id").text(`id: ${id}`);
    d3.select("#eth").text(`ethnicity: ${ethnicity}`);
    d3.select("#gen").text(`gender: ${gender}`);
    d3.select("#age").text(`age: ${age}`);
    d3.select("#loc").text(`location: ${geo}`);
    d3.select("#bbt").text(`bbtype: ${bbtype}`);
    d3.select("#wfreq").text(`wfreq: ${wfreq}`);
  });


  
}

initialize();




