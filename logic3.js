const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

var age ;
var bbtype ;
var ethnicity ;
var gender ;
var id ;
var geo ;
var wfreq ; 
 
  
d3.json(url).then(function(data) 
{
    console.log(data);

    age = data.metadata[0].age;
    bbtype = data.metadata[0].bbtype;
    ethnicity = data.metadata[0].ethnicity;
    gender = data.metadata[0].gender;
    id = data.metadata[0].id;
    geo = data.metadata[0].location;
    wfreq = data.metadata[0].wfreq;

    /*
    console.log(age);
    console.log(bbtype);
    console.log(ethnicity);
    console.log(gender);
    console.log(id);
    console.log(geo);
    console.log(wfreq);
    */

    

});

