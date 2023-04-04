
//creating variable for site 
url="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//creating function for drop down menu 
function drop_down_menu(){
    
let drop_down_menu=d3.select("#selDataset")

d3.json(url).then((data) => {
// creating names for each element in the drop down 
console.log(data)
let names=data.names
names.forEach((element) => {
    console.log({ element });
    drop_down_menu.append("option")
    .text(element)
  });
  //creating varables for table and charts with names by index
  table(names[0])
  charts(names[0])
})

}
//change function to sample_id 
function optionChanged(sample_id){
    table(sample_id)
    charts(sample_id)


}
//create function for demographic table 
function table(sample_id){

//select metadata from html and print data with filter 
let table=d3.select("#sample-metadata")
    d3.json(url).then((data) => {

        console.log(data)
        let metadata=data.metadata
        result = metadata.filter(x => x.id == sample_id)[0];

table.html("")

       // pair keys and values together 
          Object.entries(result).forEach(entry => {
            const [key, value] = entry;
            console.log(key, value);
            table.append("h5")
            .text(` ${key}: ${value}`)
          });


        
        })
}
//create function for bargraph
function charts(sample_id){
    //import data 
    d3.json(url).then((data) => {
        //print data and filter 
        console.log(data)
        let samplesdata=data.samples
        result = samplesdata.filter(x => x.id == sample_id)[0];

        sample_values=result.sample_values
        //set variables for otu labels and ids
        otu_ids=result.otu_ids
        
        otu_labels=result.otu_labels

        //input data on bar graph 
        var bardata = [{
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map((index) => `otu ${index}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            name: 'SF Zoo',
            orientation: 'h',
            marker: {
              color: 'rgba(55,128,191,0.6)',
              width: 1
            },
            type: 'bar'
          }];
          
          
          // set layout of bargraph 
          var barlayout = {
            title: 'Colored Bar Chart',
          }
          
          Plotly.newPlot('bar', bardata, barlayout);
          // format bubble graph and input data from html/url
          var bubbledata = [{
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
              color: otu_ids,
              colorscale: 'Earth',
              size: sample_values
            }
          }];
          
          
          //create layout for bubble chart layout 
          var bubblelayout = {
            title: 'Marker Size and Color',
            
          };
          
          Plotly.newPlot('bubble', bubbledata, bubblelayout);
        
        })

}




drop_down_menu()



