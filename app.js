function buildBarChart(sample) {

  // using d3.json get data to build the bar chart
  d3.json("samples.json").then((data) => {
        samples_rec = data.samples;

        var filtered_recs = samples_rec.filter(sample_object => sample_object.id == sample);
        var selection = filtered_recs[0];
        var otu_ids = selection.otu_ids;
        var sample_values = selection.sample_values;

        var trace_bar = [{
          x: sample_values.slice(0, 10).reverse(),
          y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
        
          type: "bar",
          orientation: "h"
        }];
        Plotly.newPlot("bar", trace_bar);        
  }); 
}; 



function buildBubbleChart(sample) {
  console.log(sample);
  var curr_rec = sample;
  // using d3.json get data to build the bubble chart
  d3.json("samples.json").then((data) => {
        samples_rec = data.samples;

        var filtered_recs = samples_rec.filter(sample_object => sample_object.id == sample);
        var selection = filtered_recs[0];
        var otu_ids = selection.otu_ids;
        var sample_values = selection.sample_values;
        var otu_labels = selection.otu_labels;

        var trace_bubble = {
          x: otu_ids,
          y: sample_values,
          text: otu_labels,
          mode: `markers`,
          marker: { size: sample_values,
                    color: otu_ids,
                  }
        }; 
        var data = [trace_bubble];
        var layout = { title: "Belly Button Bacteria",
        xaxis: { title: "OTU ID "}
      };         

        Plotly.newPlot("bubble", data, layout);        
  }); 
}; 


function demo_info(first_rec){
    // using d3.json get data to build the Demographic Info Section 
    d3.json("samples.json").then((data) => {

       sample_metadata = data.metadata;
       var filtered_data= sample_metadata.filter(object => object.id == first_rec);
       var records= filtered_data[0];
       var panel = d3.select("#sample-metadata"); 
      
       //clean previous entries and populate panel data 
       panel.html("");        
       Object.entries(records).forEach(([key, value]) => {
          panel.append("h5").text(`${key}:${value}`);
       });
    });   
};


function dropdown() {
// use d3 to select the corresponding html id element
  var selector = d3.select("#selDataset");
  console.log(selector);

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
      var samplesData = data.names;
      samplesData.forEach((sample) => {
          selector
              .append("option")
              .text(sample)
              .property("value", sample);
      }); //ends the sampleNames.forEach...
      const first_rec = samplesData[0];
      console.log(first_rec);
      buildBarChart(first_rec);
      buildBubbleChart(first_rec);
      demo_info(first_rec);

  }); 
};

function optionChanged (sample) {
   buildBarChart(sample);
   buildBubbleChart(sample);
   demo_info(sample);   
};   


dropdown();

