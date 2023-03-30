//create a varable for url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
//read in data 
function dropdown (){
    d3.json(url).then((data) => {

        console.log(data);
//create variable for data name and loop and append to list 
sample_names= data.names
let menu = d3.select("#selDataset")

sample_names.forEach((element) => {
    console.log(element);
menu.append("option").text(element)

});

//reading in data 
metatable(sample_names[0])
charts(sample_names[0])


    });

}
//reading in data 
function optionChanged(sample_id){

    metatable(sample_id)
    charts(sample_id)
}

//reading in data 
function metatable(sample_id){





}


//reading in data 
function charts(sample_id){






}













dropdown()