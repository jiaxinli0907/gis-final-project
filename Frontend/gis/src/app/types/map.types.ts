import { FeatureCollection } from 'geojson';
import * as L from 'leaflet';
import * as d3 from 'd3';
import * as Correlation from 'node-correlation';

import { min, max } from 'd3';
import { MapComponent } from "../map/map.component"
import { Component, OnInit ,Input} from '@angular/core';
class Overlay {

    name: string;
    featureCollection: FeatureCollection;
    @Input() mymap: L.Map;

    constructor(name: string, featureCollection: FeatureCollection) { //mymap: L.Map
        this.name = name;
        this.featureCollection = featureCollection;
        // this.mymap = mymap;
    }

    createOverlay() {
        return L.geoJSON(this.featureCollection);
    }

}

class Forestmap extends Overlay {

    constructor(name: string, featureCollection: FeatureCollection ) {
        super(name, featureCollection);
    }

    //delete the former output
    clearLineChart(){
        d3.select("#barChart").selectAll("*").remove();
        d3.select("#selection").selectAll("input").remove();
        d3.select("#selection").selectAll('label').remove();
        d3.select("#correlation").selectAll('*').remove();
        d3.select("#barChart2").selectAll('*').remove();

    }
  

    createXYZ(val: string){///####TODO##### ...
//######################################### 
        var newArr = this.featureCollection.features.map(d=>d.properties.y1990); 
        newArr.forEach(element => {
            //console.log(element);
        });

        const allData = this.featureCollection.features.map(d=>d.properties);
        console.log(allData)

       var numberData = new Array;
       var gdpData = new Array;
       var co2Data = new Array;
       var popData = new Array;
       var eduData = new Array;

        for (var k in allData) {
            if (allData[k]['name'] == val) {
               numberData[0] = parseFloat(allData[k]['y1990']);
               numberData[1] = parseFloat(allData[k]['y1995']);
               numberData[2] = parseFloat(allData[k]['y2000']);
               numberData[3] = parseFloat(allData[k]['y2005']);
               numberData[4] = parseFloat(allData[k]['y2010']);
               numberData[5] = parseFloat(allData[k]['y2015']);


               gdpData[0] = parseFloat(allData[k]['g1990']);
               gdpData[1] = parseFloat(allData[k]['g1995']);
               gdpData[2] = parseFloat(allData[k]['g2000']);
               gdpData[3] = parseFloat(allData[k]['g2005']);
               gdpData[4] = parseFloat(allData[k]['g2010']);
               gdpData[5] = parseFloat(allData[k]['g2015']);

               co2Data[0] = parseFloat(allData[k]['co1990']);
               co2Data[1] = parseFloat(allData[k]['co1995']);
               co2Data[2] = parseFloat(allData[k]['co2000']);
               co2Data[3] = parseFloat(allData[k]['co2005']);
               co2Data[4] = parseFloat(allData[k]['co2010']);
               co2Data[5] = parseFloat(allData[k]['co2015']);

               popData[0] = parseFloat(allData[k]['p1990']);
               popData[1] = parseFloat(allData[k]['p1995']);
               popData[2] = parseFloat(allData[k]['p2000']);
               popData[3] = parseFloat(allData[k]['p2005']);
               popData[4] = parseFloat(allData[k]['p2010']);
               popData[5] = parseFloat(allData[k]['p2015']);

               eduData[0] = parseFloat(allData[k]['e1990']);
               eduData[1] = parseFloat(allData[k]['e1995']);
               eduData[2] = parseFloat(allData[k]['e2000']);
               eduData[3] = parseFloat(allData[k]['e2005']);
               eduData[4] = parseFloat(allData[k]['e2010']);
               eduData[5] = parseFloat(allData[k]['e2015']);
               var mini = d3.min(numberData);
               var maxi= d3.max(numberData);
               var minGDP = d3.min(gdpData);
               var maxGDP= d3.max(gdpData);
               var minCO2 = d3.min(co2Data);
               var maxCO2= d3.max(co2Data);
               var minPOP = d3.min(popData);
               var maxPOP= d3.max(popData);
               var minEDU = d3.min(eduData);
               var maxEDU= d3.max(eduData);

               for (var index in allData) {
                   if (parseInt(index) < 6) {
                    numberData[index]=(numberData[index] - mini)/(maxi -mini);
                    gdpData[index]=(gdpData[index] - minGDP)/(maxGDP-minGDP);
                    co2Data[index]=(co2Data[index] - minCO2)/(maxCO2-minCO2);
                    popData[index]=(popData[index] - minPOP)/(maxPOP-minPOP);
                    eduData[index]=(eduData[index] - minEDU)/(maxEDU-minEDU);
                   } 
                
               }
               console.log(numberData);
               console.log(gdpData);
               console.log(popData);
               console.log(co2Data);
               console.log(eduData);
            }
        }
        



 /*   
        const allData = this.featureCollection.features.map(d=>d.properties);
        const datasss = this.featureCollection.features.map(d=>d.properties.y1995);
        console.log(this.featureCollection.features.map(d=>d.properties.y1995));
        console.log("arrayson ist:", allData);
   */ 
        //  Use the margin convention practice 
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = document.getElementById("barChart").getBoundingClientRect().width - margin.left - margin.right,
        height = document.getElementById("barChart").getBoundingClientRect().height - margin.top - margin.bottom;
    
    // The number of datapoints
    var n = numberData.length;
    
    //console.log(numberData, d3.min(numberData), d3.max(numberData));
    //  X scale
    var xScale = d3.scaleLinear()
      .domain([0, n-1]) // input
      .range([30, width]); // output

    //  Y scale 
    var yScale = d3.scaleLinear()
      .domain([ 0,1 ]) // input  d3.min(numberData), d3.max(numberData)
      .range([height, 5]); // output 
    
    //  d3's line generator
    var line = d3.line<any>()
      .x(function(d, i) { return xScale(i); } ) // set the x values for the line generator
      .y(function(d,i) {return yScale(numberData[i])}) // set the y values for the line generator 
      .curve(d3.curveMonotoneX) // apply smoothing to the line
    
      var line2 = d3.line<any>()
      .x(function(d, i) { return xScale(i); } ) // set the x values for the line generator
      .y(function(d,i) {return yScale(gdpData[i])}) // set the y values for the line generator 
      .curve(d3.curveMonotoneX) // apply smoothing to the line

      var line3 = d3.line<any>()
      .x(function(d, i) { return xScale(i); } ) // set the x values for the line generator
      .y(function(d,i) {return yScale(co2Data[i])}) // set the y values for the line generator 
      .curve(d3.curveMonotoneX) // apply smoothing to the line

      var line4 = d3.line<any>()
      .x(function(d, i) { return xScale(i); } ) // set the x values for the line generator
      .y(function(d,i) {return yScale(popData[i])}) // set the y values for the line generator 
      .curve(d3.curveMonotoneX) // apply smoothing to the line

      var line5 = d3.line<any>()
      .x(function(d, i) { return xScale(i); } ) // set the x values for the line generator
      .y(function(d,i) {return yScale(eduData[i])}) // set the y values for the line generator 
      .curve(d3.curveMonotoneX) // apply smoothing to the line
    
    //  An array of objects of length N. Each object has key -> value pair, the key being "y" and the value the dataset
    var dataset = d3.range(n).map(function(d) { return {"y": numberData ,"x":n } })
    var dataset2 = d3.range(n).map(function(d) { return {"y":gdpData  ,"x": n } })// bind to given data
    var dataset3 = d3.range(n).map(function(d) { return {"y":co2Data  ,"x": n } })// bind to given data
    var dataset4 = d3.range(n).map(function(d) { return {"y":popData  ,"x": n } })// bind to given data
    var dataset5 = d3.range(n).map(function(d) { return {"y":eduData  ,"x": n } })// bind to given data
    
    // Add the SVG to the page and employ #2
    var svg = d3.select("#barChart");

      var xXScale = d3.scaleLinear()
      .domain([1990, 2015]) // input
      .range([30, width]); // output
    // Call the x axis in a group tag
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale)
     // .tickValues([1990,1995,2015]) Chec Tickvalues ####TODO'#######
      .scale(xXScale).ticks(2));
    
    // Call the y axis in a group tag
    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", `translate(30,0)`)
      .call(d3.axisLeft(yScale) // Create an axis component with d3.axisLeft
      .scale(yScale).ticks(3));
    
    // Append the path, bind the data, and call the line generator 
    
    //####forest###
    svg.append("path")
      .datum(dataset) //  Binds data to the line 
      //.attr("class", "line") // Assign a class for styling 
      .style("fill", "none")
      .style("stroke", "#ffab00")
      .style("stroke-width","1")
      .attr("d", line); // Calls the line generator 

      svg.append("circle").attr("cx",340).attr("cy",70).attr("r", 3).style("fill", "#ffab00")
      svg.append("text").attr("x", 350).attr("y", 70).text("Forest Coverage").style("font-size", "8px").attr("alignment-baseline","middle")

      svg.append("circle").attr("cx",340).attr("cy",10).attr("r", 3).style("fill", "#33FFCC")
      svg.append("circle").attr("cx",340).attr("cy",25).attr("r", 3).style("fill", "#ff00b0")
      svg.append("circle").attr("cx",340).attr("cy",40).attr("r", 3).style("fill", "#99FF00")
      svg.append("circle").attr("cx",340).attr("cy",55).attr("r", 3).style("fill", "#3300cc")
      svg.append("text").attr("x", 350).attr("y", 10).text("Education").style("font-size", "8px").attr("alignment-baseline","middle")
      svg.append("text").attr("x", 350).attr("y", 25).text("GDP").style("font-size", "8px").attr("alignment-baseline","middle")
      svg.append("text").attr("x", 350).attr("y", 40).text("CO2").style("font-size", "8px").attr("alignment-baseline","middle")
      svg.append("text").attr("x", 350).attr("y", 55).text("Population").style("font-size", "8px").attr("alignment-baseline","middle")


//checkboxpart     #### in progress####
    d3.select("#selection").selectAll("input")
    .data(["Education", "GDP", "CO2", "Population"])
    .enter()
    .append('label')
        .attr('for',function(d,i){ return 'checkbox'+i; })
        .text(function(d) { return d; })   
    .append("input")
        //.attr("checked", false)
        .attr("type", "checkbox")
        .attr("id", function(d,i) { return "checkbox"+i; });
//####################################################################Checkbox color compareable to line color
        
        d3.select("#checkbox0").on("change",function update(){// 
            if (d3.select("#checkbox0").property("checked")) {
                //####Education###
                d3.select("#barChart").append("path")
                .datum(dataset5) // Binds data to the line 
                //.attr("class", "line") // Assign a class for styling 
                .style("fill", "none")
                .style("stroke", "#33FFCC")
                .style("stroke-width","1")
                .attr("id", "lineEdu")
                .attr("d", line5); // Calls the line generator
              //Correlation part 
                d3.select("#correlation")
                .append("p")
                .attr("id", "eduCor")
                .append("text")
                .text("The correlation with Education is:"+ Correlation.calc(numberData, eduData).toFixed(3));
                //console.log(Correlation.calc(numberData, eduData));
            } else {
                //delete the former output
                d3.select("#lineEdu").remove();
                d3.select("#eduCor").remove();
            }
    
            
        });

        d3.select("#checkbox1").on("change",function update(){// TODO  for all lines.... maybe switch case... else case (delete line)
            if (d3.select("#checkbox1").property("checked")) {
                //####Education###
                d3.select("#barChart").append("path")
                .datum(dataset2) // Binds data to the line 
                //.attr("class", "line") // Assign a class for styling 
                .style("fill", "none")
                .style("stroke", "#ff00b0")
                .style("stroke-width","1")
                .attr("id", "lineGDP")
                .attr("d", line2); // Calls the line generator

                //Correlation part 
                 d3.select("#correlation")
                    .append("p")
                    .attr("id", "gdpCor")
                    .append("text")
                    .text("The correlation with GDP is:"+ Correlation.calc(numberData, gdpData).toFixed(3));
            } else {
                //delete the former output
                d3.select("#lineGDP").remove();
                d3.select("#gdpCor").remove();
            }
            
        });

        d3.select("#checkbox2").on("change",function update(){// TODO  for all lines.... maybe switch case... else case (delete line)
            if (d3.select("#checkbox2").property("checked")) {
                //####CO2###
                d3.select("#barChart").append("path")
                .datum(dataset3) // Binds data to the line 
                //.attr("class", "line") // Assign a class for styling 
                .style("fill", "none")
                .style("stroke", "#99FF00")
                .style("stroke-width","1")
                .attr("id", "lineCo2")
                .attr("d", line3); // Calls the line generator

            //Correlation part 
              d3.select("#correlation")
                  .append("p")
                  .attr("id", "co2Cor")
                  .append("text")
                  .text("The correlation with CO2-Emission is:"+ Correlation.calc(numberData, co2Data).toFixed(3));
            } else {
                //delete the former output
                d3.select("#lineCo2").remove();
                d3.select("#co2Cor").remove();
            }
 
            
        });

        d3.select("#checkbox3").on("change",function update(){// TODO  for all lines.... maybe switch case... else case (delete line)
            if (d3.select("#checkbox3").property("checked")) {
                //####Population###
                d3.select("#barChart").append("path")
                .datum(dataset4) // Binds data to the line 
                //.attr("class", "line") // Assign a class for styling 
                .style("fill", "none")
                .style("stroke", "#3300cc")
                .style("stroke-width","1")
                .attr("id", "linePop")
                .attr("d", line4); // Calls the line generator

            //Correlation part 
                d3.select("#correlation")
                  .append("p")
                  .attr("id", "popCor")
                  .append("text")
                  .text("The correlation with Population is:"+ Correlation.calc(numberData, popData).toFixed(3));
            } else {
                //delete the former output
                d3.select("#linePop").remove();
                d3.select("#popCor").remove();
            }
  
            
        });

                   //###################2nd barchart######### placeholder###############
  var bcData = new Array;
  var bcDataName = new Array;

  for (var k in allData) {
    if (allData[k]['name'] == val) {
       bcData[0] = parseFloat(allData[k]['y1990']);
       bcData[1] = parseFloat(allData[k]['y1995']);
       bcData[2] = parseFloat(allData[k]['y2000']);
       bcData[3] = parseFloat(allData[k]['y2005']);
       bcData[4] = parseFloat(allData[k]['y2010']);
       bcData[5] = parseFloat(allData[k]['y2015']);

       bcDataName[0] = bcData[1]-bcData[0];
       bcDataName[1] = bcData[2]-bcData[1];
       bcDataName[2] = bcData[3]-bcData[2];
       bcDataName[3] = bcData[4]-bcData[3];
       bcDataName[4] = bcData[5]-bcData[4];
      
    }
}



// set the ranges
var x = d3.scaleLinear()
        .range([0, width]);
var y = d3.scaleLinear()
        .range([height, 0]);
        
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svgb = d3.select("#barChart2")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", 
        "translate(" + 10 + "," + 10 + ")");

// Scale the range of the data in the domains
x.domain([1990,2015]);//map oder 0-x
y.domain([d3.min(bcData, function(d) { return d; }), d3.max(bcData, function(d) { return d; })]);

// append the rectangles for the bar chart
svgb.selectAll(".bar")
    .data(bcData)
  .enter()
  .append("rect")
    .attr("class", "bar")
    .attr("x", function(d, i) { return (i * 50)+30 })
    .attr("width", "48")
    .attr("y", function(d) { if(height/2 - y(d) > 0) {return Math.round(height/2)-(height/2 - y(d));} else {return Math.round(height/2);} })
    .attr("height", function(d) { return Math.abs(height/2 - y(d)); })
    .attr("fill", function(d) {
        if(height/2 - y(d) > 0) {

        return "rgb(0," + (d*13) + ",0 )"
        } else {
        return "rgb(" + (d*13) +", 0,0 )"
        }
    
    } )
    .on("mouseover", function(d){
        d3.select(this)
            .style("fill","grey")


    })



    
    .on("mouseout", function(d,i){
        if(height/2 - y(d) > 0) {
            d3.select(this)
            .style("fill","rgb(0," + (d*13) + ",0 )")
        } else {
            d3.select(this)
            .style("fill","rgb(" + (d*13) +", 0,0 )")
        }
        
        })
    ;//color
  


// add the x Axis
svgb.append("g")
    .attr("transform", "translate(0," + height/2 + ")")
    .call(d3.axisBottom(x).scale(xXScale).ticks(3));

// add the y Axis
svgb.append("g")
    .attr("transform", `translate(25,0)`)
    .call(d3.axisLeft(y));


//###################2nd barchart######### placeholder###############



    }    

   

    createOverlay() {

       var y1990 = this.featureCollection.features.map(d=>d.properties.y1990)
       var y1995 = this.featureCollection.features.map(d=>d.properties.y1995)
       var y2000 = this.featureCollection.features.map(d=>d.properties.y2000)
       var y2005 = this.featureCollection.features.map(d=>d.properties.y2005)
       var y2010 = this.featureCollection.features.map(d=>d.properties.y2010)
       var y2015 = this.featureCollection.features.map(d=>d.properties.y2015)
       
    

        // calculate new color scale
        // .domain expects an array of [min, max] value
        // d3.extent returns exactly this array
        // const minMaxBars = d3.extent(this.featureCollection.features.map(d => d.properties.y1990));// this.featureCollection.features.map(d => d.properties.y1990)
        // const colorScale = d3.scaleSequential(d3.interpolateGreens).domain(minMaxBars);
  
        
        // console.log(this.featureCollection.features.map(d=>d.))
        // create tooltip
        const tooltip = d3.select('body')
        .append('div')
        .attr('id', 'comparision-tooltip')
        .attr('class', 'map-tooltip')
        .style('display', 'none');
  
        tooltip.append('h3').text('detail:');
        const nameP = tooltip.append('p');
        const year1 = tooltip.append('p');
        const year2 = tooltip.append('p');
  

        // create geojson layer (looks more complex than it is)
        let ForestmapLayer = L.geoJSON(this.featureCollection, {
            style: (feature) => {
                return {
                    fillColor: getColor(feature.properties.y1990), //feature.properties.y1990
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                };
            },
            
  
            onEachFeature: (feature, layer) => {
                layer.on({
                    // on mouseover update tooltip and highlight county
                    mouseover: (e: L.LeafletMouseEvent) => {
  
                        // set position and text of tooltip
                        tooltip.style('display', null);
                        tooltip.style('top', `${e.originalEvent.clientY - 75}px`);
                        tooltip.style('left', `${e.originalEvent.clientX + 25}px`);
                        nameP.text(`Country name: ${feature.properties.name}`);
                        year1.text(`Forest area in 1990: ${feature.properties.y1990}`);
                        year2.text(`Forest area in 2015: ${feature.properties.y2015}`); //${feature.properties.name}
                        // numpointP.text(`num of points: ${feature.properties.num_point}`); // ${feature.properties.num_bars}
                        // pointidP.text(`point_id: ${feature.properties.pointidP}`);
  
                        // set highlight style
                        const l = e.target;
                        l.setStyle({
                            weight: 5,
                            color: '#666',
                            dashArray: '',
                            fillOpacity: 0.7
                        });
  
                        l.bringToFront();
                    },
                    // on mouseover hide tooltip and reset county to normal sytle
                    mouseout: (e: L.LeafletMouseEvent) => {
                        tooltip.style('display', 'none');
                        e.target.setStyle({
                            weight: 2,
                            color: 'white',
                            dashArray: '3',
                            fillOpacity: 0.7
                        });
                        // ForestmapLayer.resetStyle(e.target);
                    },

           
                    click: (e: L.LeafletMouseEvent) => {
                        this.clearLineChart();
                        this.createXYZ(`${feature.properties.name}`);
        
                        d3.select('h2').text(`Country details: ${feature.properties.name}`);
                    }

                });
            }
        });


// change polygon color
        const geo = this.featureCollection
        var slider = document.getElementById('slide');
        slider.addEventListener('click', changeColor);

       function changeBarChart (){//cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc
 

        }
 
        function changeColor(){
            // alert('listening')
            var maxvalue = d3.select("#slide").attr("ng-reflect-high-value")
            var minvalue =  d3.select("#slide").attr("ng-reflect-value")
            switch(maxvalue){
                case "1990" :
                    var maxdata = y1990
                    break;
                case "1995" : 
                    var maxdata = y1995
                    break;
                case "2000" : 
                    var maxdata = y2000
                    break;
                case "2005" : 
                    var maxdata = y2005
                    break;
                case "2010" : 
                    var maxdata = y2010
                    break;
                default:
                    var maxdata = y2015
                    break;
    
            }
            switch(minvalue){
                case "1995" : 
                    var mindata:any[] = y1995
                    break;
                case "2000" : 
                    var mindata:any[] = y2000
                    break;
                case "2005" : 
                    var mindata:any[] = y2005
                    break;
                case "2010" : 
                    var mindata:any[] = y2010
                    break;
                case "2015" : 
                    var mindata:any[] = y2015
                    break;  
                default:
                    var mindata:any[] = y1990
                    break;
    
            }
            var diff  = maxdata.map((n,i)=> n - mindata[i]) 
    

            var i =0
            ForestmapLayer.eachLayer(
                function(l: L.FeatureGroup){
                l.setStyle({
                    fillColor: getColor(diff[i++])
            }) 
            // console.log('success!')   
        }
        )
    }
    function getColor(d){
        return d > 10  ? '#008000' : // green
        d > 5  ? '#228B22' : // forest green
        d > 4  ? '#32CD32' : // limegreen 
        d > 3  ? '#00FF00' : // lime
        d > 2  ? '#7CFC00' : // lawngreen
        d > 1  ? '#ADFF2F' : // green yellow
        d > 0  ? '#00FF7F' : //  spring green
        d == 0 ? '#F4F6F6 ': //gray
        d > -1  ? '#FA8072' : // salmon
        d > -2   ? '#F08080' : // red coral
        d > -3 ? '#CD5C5C' : // indian red
        d > -4 ? '#DC143C' : //crimson
        d > -5? '#FF0000' : // red
        d > -10 ? '#B22222' : // fire brick
                  '#800000'; // marron
    }
   
        return ForestmapLayer;
    }
  }

class ForestChange extends Overlay {

    constructor(name: string, featureCollection: FeatureCollection ) {
        super(name, featureCollection);
    }

    //delete the former output
    clearLineChart(){
        d3.select("#barChart").selectAll("*").remove();
        d3.select("#selection").selectAll("input").remove();
        d3.select("#selection").selectAll('label').remove();

    }
  


    createXYZ(val: string){///####TODO##### Checkboxes for input ... comparision correlation... coeff
//######################################### normalize data --> fix output problems
        var newArr = this.featureCollection.features.map(d=>d.properties.y1990); 
        newArr.forEach(element => {
            //console.log(element);
        });
      

    
        
        const allData = this.featureCollection.features.map(d=>d.properties);
        console.log(allData)

       var numberData = new Array;
       var gdpData = new Array;
       var co2Data = new Array;
       var popData = new Array;
       var eduData = new Array;

        for (var k in allData) {
            if (allData[k]['name'] == val) {
               numberData[0] = parseFloat(allData[k]['y1990']);
               numberData[1] = parseFloat(allData[k]['y1995']);
               numberData[2] = parseFloat(allData[k]['y2000']);
               numberData[3] = parseFloat(allData[k]['y2005']);
               numberData[4] = parseFloat(allData[k]['y2010']);
               numberData[5] = parseFloat(allData[k]['y2015']);


               gdpData[0] = parseFloat(allData[k]['g1990']);
               gdpData[1] = parseFloat(allData[k]['g1995']);
               gdpData[2] = parseFloat(allData[k]['g2000']);
               gdpData[3] = parseFloat(allData[k]['g2005']);
               gdpData[4] = parseFloat(allData[k]['g2010']);
               gdpData[5] = parseFloat(allData[k]['g2015']);

               co2Data[0] = parseFloat(allData[k]['co1990']);
               co2Data[1] = parseFloat(allData[k]['co1995']);
               co2Data[2] = parseFloat(allData[k]['co2000']);
               co2Data[3] = parseFloat(allData[k]['co2005']);
               co2Data[4] = parseFloat(allData[k]['co2010']);
               co2Data[5] = parseFloat(allData[k]['co2015']);

               popData[0] = parseFloat(allData[k]['p1990']);
               popData[1] = parseFloat(allData[k]['p1995']);
               popData[2] = parseFloat(allData[k]['p2000']);
               popData[3] = parseFloat(allData[k]['p2005']);
               popData[4] = parseFloat(allData[k]['p2010']);
               popData[5] = parseFloat(allData[k]['p2015']);

               eduData[0] = parseFloat(allData[k]['e1990']);
               eduData[1] = parseFloat(allData[k]['e1995']);
               eduData[2] = parseFloat(allData[k]['e2000']);
               eduData[3] = parseFloat(allData[k]['e2005']);
               eduData[4] = parseFloat(allData[k]['e2010']);
               eduData[5] = parseFloat(allData[k]['e2015']);
               var mini = d3.min(numberData);
               var maxi= d3.max(numberData);
               var minGDP = d3.min(gdpData);
               var maxGDP= d3.max(gdpData);
               var minCO2 = d3.min(co2Data);
               var maxCO2= d3.max(co2Data);
               var minPOP = d3.min(popData);
               var maxPOP= d3.max(popData);
               var minEDU = d3.min(eduData);
               var maxEDU= d3.max(eduData);

               for (var index in allData) {
                   if (parseInt(index) < 6) {
                    numberData[index]=(numberData[index] - mini)/(maxi -mini);
                    gdpData[index]=(gdpData[index] - minGDP)/(maxGDP-minGDP);
                    co2Data[index]=(co2Data[index] - minCO2)/(maxCO2-minCO2);
                    popData[index]=(popData[index] - minPOP)/(maxPOP-minPOP);
                    eduData[index]=(eduData[index] - minEDU)/(maxEDU-minEDU);
                   } 
                
               }
               console.log(numberData);
               console.log(gdpData);
               console.log(popData);
               console.log(co2Data);
               console.log(eduData);
            }
        }
        



 /*   
        const allData = this.featureCollection.features.map(d=>d.properties);
        const datasss = this.featureCollection.features.map(d=>d.properties.y1995);
        console.log(this.featureCollection.features.map(d=>d.properties.y1995));
        console.log("arrayson ist:", allData);
   */ 
        //  Use the margin convention practice 
    var margin = {top: 20, right: 20, bottom: 30, left: 50},
        width = document.getElementById("barChart").getBoundingClientRect().width - margin.left - margin.right,
        height = document.getElementById("barChart").getBoundingClientRect().height - margin.top - margin.bottom;
    
    // The number of datapoints
    var n = numberData.length;
    
    //console.log(numberData, d3.min(numberData), d3.max(numberData));
    //  X scale
    var xScale = d3.scaleLinear()
      .domain([0, n-1]) // input
      .range([30, width]); // output
    
    //  Y scale 
    var yScale = d3.scaleLinear()
      .domain([ 0,1 ]) // input  d3.min(numberData), d3.max(numberData)
      .range([height, 5]); // output 
    
    //  d3's line generator
    var line = d3.line<any>()
      .x(function(d, i) { return xScale(i); } ) // set the x values for the line generator
      .y(function(d,i) {return yScale(numberData[i])}) // set the y values for the line generator 
      .curve(d3.curveMonotoneX) // apply smoothing to the line
    
      var line2 = d3.line<any>()
      .x(function(d, i) { return xScale(i); } ) // set the x values for the line generator
      .y(function(d,i) {return yScale(gdpData[i])}) // set the y values for the line generator 
      .curve(d3.curveMonotoneX) // apply smoothing to the line

      var line3 = d3.line<any>()
      .x(function(d, i) { return xScale(i); } ) // set the x values for the line generator
      .y(function(d,i) {return yScale(co2Data[i])}) // set the y values for the line generator 
      .curve(d3.curveMonotoneX) // apply smoothing to the line

      var line4 = d3.line<any>()
      .x(function(d, i) { return xScale(i); } ) // set the x values for the line generator
      .y(function(d,i) {return yScale(popData[i])}) // set the y values for the line generator 
      .curve(d3.curveMonotoneX) // apply smoothing to the line

      var line5 = d3.line<any>()
      .x(function(d, i) { return xScale(i); } ) // set the x values for the line generator
      .y(function(d,i) {return yScale(eduData[i])}) // set the y values for the line generator 
      .curve(d3.curveMonotoneX) // apply smoothing to the line
    
    //  An array of objects of length N. Each object has key -> value pair, the key being "y" and the value is a random number
    var dataset = d3.range(n).map(function(d) { return {"y": numberData ,"x":n } })
    var dataset2 = d3.range(n).map(function(d) { return {"y":gdpData  ,"x": n } })// bind to given data
    var dataset3 = d3.range(n).map(function(d) { return {"y":co2Data  ,"x": n } })// bind to given data
    var dataset4 = d3.range(n).map(function(d) { return {"y":popData  ,"x": n } })// bind to given data
    var dataset5 = d3.range(n).map(function(d) { return {"y":eduData  ,"x": n } })// bind to given data
    
    // Add the SVG to the page and employ #2
    var svg = d3.select("#barChart")

      
    // Call the x axis in a group tag
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xScale)
     // .tickValues([1990,1995,2015]) Chec Tickvalues ####TODO'#######
      .scale(xScale).ticks(2));
    
    // Call the y axis in a group tag
    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", `translate(30,0)`)
      .call(d3.axisLeft(yScale) // Create an axis component with d3.axisLeft
      .scale(yScale).ticks(3));
    
    // Append the path, bind the data, and call the line generator 
    
    //####forest###
    svg.append("path")
      .datum(dataset) //  Binds data to the line 
      //.attr("class", "line") // Assign a class for styling 
      .style("fill", "none")
      .style("stroke", "#ffab00")
      .style("stroke-width","1")
      .attr("d", line); // Calls the line generator 


//checkboxpart     #### in progress####
    d3.select("#selection").selectAll("input")
    .data(["Education", "GDP", "CO2", "Population"])
    .enter()
    .append('label')
        .attr('for',function(d,i){ return 'checkbox'+i; })
        .text(function(d) { return d; })   
    .append("input")
        //.attr("checked", false)
        .attr("type", "checkbox")
        .attr("id", function(d,i) { return "checkbox"+i; });
//####################################################################
        
        d3.select("#checkbox0").on("change",function update(){// TODO  for all lines.... maybe switch case... else case (delete line)
            if (d3.select("#checkbox0").property("checked")) {
                //####Education###
                d3.select("#barChart").append("path")
                .datum(dataset5) // Binds data to the line 
                //.attr("class", "line") // Assign a class for styling 
                .style("fill", "none")
                .style("stroke", "#33FFCC")
                .style("stroke-width","1")
                .attr("id", "lineEdu")
                .attr("d", line5); // Calls the line generator
            } else {
                //delete the former output
                d3.select("#lineEdu").remove();
            }
    
            
        });

        d3.select("#checkbox1").on("change",function update(){// TODO  for all lines.... maybe switch case... else case (delete line)
            if (d3.select("#checkbox1").property("checked")) {
                //####Education###
                d3.select("#barChart").append("path")
                .datum(dataset2) // Binds data to the line 
                //.attr("class", "line") // Assign a class for styling 
                .style("fill", "none")
                .style("stroke", "#ff00b0")
                .style("stroke-width","1")
                .attr("id", "lineGDP")
                .attr("d", line2); // Calls the line generator
            } else {
                //delete the former output
                d3.select("#lineGDP").remove();
            }
            
        });

        d3.select("#checkbox2").on("change",function update(){// TODO  for all lines.... maybe switch case... else case (delete line)
            if (d3.select("#checkbox2").property("checked")) {
                //####CO2###
                d3.select("#barChart").append("path")
                .datum(dataset3) // Binds data to the line 
                //.attr("class", "line") // Assign a class for styling 
                .style("fill", "none")
                .style("stroke", "#99FF00")
                .style("stroke-width","1")
                .attr("id", "lineCo2")
                .attr("d", line3); // Calls the line generator
            } else {
                //delete the former output
                d3.select("#lineCo2").remove();
            }
 
            
        });

        d3.select("#checkbox3").on("change",function update(){// TODO  for all lines.... maybe switch case... else case (delete line)
            if (d3.select("#checkbox3").property("checked")) {
                //####Population###
                d3.select("#barChart").append("path")
                .datum(dataset4) // Binds data to the line 
                //.attr("class", "line") // Assign a class for styling 
                .style("fill", "none")
                .style("stroke", "#3300cc")
                .style("stroke-width","1")
                .attr("id", "linePop")
                .attr("d", line4); // Calls the line generator
            } else {
                //delete the former output
                d3.select("#linePop").remove();
            }
  
            
        });
//###################################################################
        
      //  d3.select("#selection").selectAll("input")
     //.append("br"); #######doesnt work########
    }    

   

    createOverlay() {

       var y1990 = this.featureCollection.features.map(d=>d.properties.y1990)
       var y1995 = this.featureCollection.features.map(d=>d.properties.y1995)
       var y2000 = this.featureCollection.features.map(d=>d.properties.y2000)
       var y2005 = this.featureCollection.features.map(d=>d.properties.y2005)
       var y2010 = this.featureCollection.features.map(d=>d.properties.y2010)
       var y2015 = this.featureCollection.features.map(d=>d.properties.y2015)
       
    

        // calculate new color scale
        // .domain expects an array of [min, max] value
        // d3.extent returns exactly this array
        // const minMaxBars = d3.extent(this.featureCollection.features.map(d => d.properties.y1990));// this.featureCollection.features.map(d => d.properties.y1990)
        // const colorScale = d3.scaleSequential(d3.interpolateGreens).domain(minMaxBars);
  
        
        // console.log(this.featureCollection.features.map(d=>d.))
        // create tooltip
        const tooltip = d3.select('body')
        .append('div')
        .attr('id', 'comparision-tooltip')
        .attr('class', 'map-tooltip')
        .style('display', 'none');
  
        tooltip.append('h3').text('detail:');
        const nameP = tooltip.append('p');
        const year1 = tooltip.append('p');
        const year2 = tooltip.append('p');
  

        // create geojson layer (looks more complex than it is)
        let ForestmapLayer = L.geoJSON(this.featureCollection, {
            style: (feature) => {
                return {
                    fillColor: getColor(feature.properties.y1990), //feature.properties.y1990
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                };
            },
            
  
            onEachFeature: (feature, layer) => {
                layer.on({
                    // on mouseover update tooltip and highlight county
                    mouseover: (e: L.LeafletMouseEvent) => {
  
                        // set position and text of tooltip
                        tooltip.style('display', null);
                        tooltip.style('top', `${e.originalEvent.clientY - 75}px`);
                        tooltip.style('left', `${e.originalEvent.clientX + 25}px`);
                        nameP.text(`Country name: ${feature.properties.name}`);
                        year1.text(`Forest area in 1990: ${feature.properties.y1990}`);
                        year2.text(`Forest area in 2015: ${feature.properties.y2015}`); 
                        
                        //${feature.properties.name}
                        // numpointP.text(`num of points: ${feature.properties.num_point}`); // ${feature.properties.num_bars}
                        // pointidP.text(`point_id: ${feature.properties.pointidP}`);
  
                        // set highlight style
                        const l = e.target;
                        l.setStyle({
                            weight: 5,
                            color: '#666',
                            dashArray: '',
                            fillOpacity: 0.7
                        });
  
                        l.bringToFront();
                    },
                    // on mouseover hide tooltip and reset county to normal sytle
                    mouseout: (e: L.LeafletMouseEvent) => {
                        tooltip.style('display', 'none');
                        e.target.setStyle({
                            weight: 2,
                            color: 'white',
                            dashArray: '3',
                            fillOpacity: 0.7
                        });
                        // ForestmapLayer.resetStyle(e.target);
                    },

                    // on mouseover hide tooltip and reset county to normal sytle
                    click: (e: L.LeafletMouseEvent) => {
                        this.clearLineChart();
                        this.createXYZ(`${feature.properties.name}`);
                        
                        d3.select('h2').text(`Country details: ${feature.properties.name}`);
                    }

                });
            }
        });


// change polygon color
        const geo = this.featureCollection
        var slider = document.getElementById('slide');
        slider.addEventListener('click', changeColor);
 
        function changeColor(){
            // alert('listening')
            var maxvalue = d3.select("#slide").attr("ng-reflect-high-value")
            var minvalue =  d3.select("#slide").attr("ng-reflect-value")
            switch(maxvalue){
                case "1990" :
                    var maxdata = y1990
                    break;
                case "1995" : 
                    var maxdata = y1995
                    break;
                case "2000" : 
                    var maxdata = y2000
                    break;
                case "2005" : 
                    var maxdata = y2005
                    break;
                case "2010" : 
                    var maxdata = y2010
                    break;
                default:
                    var maxdata = y2015
                    break;
    
            }
            // switch(minvalue){
            //     case "1995" : 
            //         var mindata:any[] = y1995
            //         break;
            //     case "2000" : 
            //         var mindata:any[] = y2000
            //         break;
            //     case "2005" : 
            //         var mindata:any[] = y2005
            //         break;
            //     case "2010" : 
            //         var mindata:any[] = y2010
            //         break;
            //     case "2015" : 
            //         var mindata:any[] = y2015
            //         break;  
            //     default:
            //         var mindata:any[] = y1990
            //         break;
    
            // }
            // var diff  = maxdata.map((n,i)=> n - mindata[i]) 
    

            var i =0
            ForestmapLayer.eachLayer(
                function(l: L.FeatureGroup){
                l.setStyle({
                    fillColor: getColor(maxdata[i++])
            }) 
            // console.log('success!')   
        }
        )
    }
    function getColor(d){
        return d > 10  ? '#008000' : // green
        d > 5  ? '#228B22' : // forest green
        d > 4  ? '#32CD32' : // limegreen 
        d > 3  ? '#00FF00' : // lime
        d > 2  ? '#7CFC00' : // lawngreen
        d > 1  ? '#ADFF2F' : // green yellow
        d > 0  ? '#00FF7F' : //  spring green
        d == 0 ? '#F4F6F6 ': //gray
        d > -1  ? '#FA8072' : // salmon
        d > -2   ? '#F08080' : // red coral
        d > -3 ? '#CD5C5C' : // indian red
        d > -4 ? '#DC143C' : //crimson
        d > -5? '#FF0000' : // red
        d > -10 ? '#B22222' : // fire brick
                  '#800000'; // marron
    }
   
        return ForestmapLayer;
    }
  }

class Highgdp extends Overlay {

    constructor(name: string, featureCollection: FeatureCollection ) {
        super(name, featureCollection);
    }

    //delete the former output
    

    createOverlay() {

       var y1990 = this.featureCollection.features.map(d=>d.properties.y1990)
       var y1995 = this.featureCollection.features.map(d=>d.properties.y1995)
       var y2000 = this.featureCollection.features.map(d=>d.properties.y2000)
       var y2005 = this.featureCollection.features.map(d=>d.properties.y2005)
       var y2010 = this.featureCollection.features.map(d=>d.properties.y2010)
       var y2015 = this.featureCollection.features.map(d=>d.properties.y2015)
       
    

        // calculate new color scale
        // .domain expects an array of [min, max] value
        // d3.extent returns exactly this array
        // const minMaxBars = d3.extent(this.featureCollection.features.map(d => d.properties.y1990));// this.featureCollection.features.map(d => d.properties.y1990)
        // const colorScale = d3.scaleSequential(d3.interpolateGreens).domain(minMaxBars);
  
        
        // console.log(this.featureCollection.features.map(d=>d.))
        // create tooltip
        const tooltip = d3.select('body')
        .append('div')
        .attr('id', 'comparision-tooltip')
        .attr('class', 'map-tooltip')
        .style('display', 'none');
  
        tooltip.append('h3').text('detail:');
        const nameP = tooltip.append('p');
        const year1 = tooltip.append('p');
        const year2 = tooltip.append('p');

        // create geojson layer (looks more complex than it is)
        let ForestmapLayer = L.geoJSON(this.featureCollection, {
            style: (feature) => {
                return {
                    fillColor: getColor(feature.properties.y1990), //feature.properties.y1990
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                };
            },
            
  
            onEachFeature: (feature, layer) => {
                layer.on({
                    // on mouseover update tooltip and highlight county
                    mouseover: (e: L.LeafletMouseEvent) => {
  
                        // set position and text of tooltip
                        tooltip.style('display', null);
                        tooltip.style('top', `${e.originalEvent.clientY - 75}px`);
                        tooltip.style('left', `${e.originalEvent.clientX + 25}px`);
                        nameP.text(`Country name: ${feature.properties.name}`);
                        year1.text(`Forest area in 1990: ${feature.properties.y1990}`);
                        year2.text(`Forest area in 2015: ${feature.properties.y2015}`); //${feature.properties.name}
                        // numpointP.text(`num of points: ${feature.properties.num_point}`); // ${feature.properties.num_bars}
                        // pointidP.text(`point_id: ${feature.properties.pointidP}`);
  
                        // set highlight style
                        const l = e.target;
                        l.setStyle({
                            weight: 5,
                            color: '#666',
                            dashArray: '',
                            fillOpacity: 0.7
                        });
  
                        l.bringToFront();
                    },
                    // on mouseover hide tooltip and reset county to normal sytle
                    mouseout: (e: L.LeafletMouseEvent) => {
                        tooltip.style('display', 'none');
                        e.target.setStyle({
                            weight: 2,
                            color: 'white',
                            dashArray: '3',
                            fillOpacity: 0.7
                        });
                        // ForestmapLayer.resetStyle(e.target);
                    },

                    // on mouseover hide tooltip and reset county to normal sytle

                });
            }
        });


// change polygon color
        const geo = this.featureCollection
        var slider = document.getElementById('slide');
        slider.addEventListener('click', changeColor);
 
        function changeColor(){
            // alert('listening')
            var maxvalue = d3.select("#slide").attr("ng-reflect-high-value")
            var minvalue =  d3.select("#slide").attr("ng-reflect-value")
            switch(maxvalue){
                case "1990" :
                    var maxdata = y1990
                    break;
                case "1995" : 
                    var maxdata = y1995
                    break;
                case "2000" : 
                    var maxdata = y2000
                    break;
                case "2005" : 
                    var maxdata = y2005
                    break;
                case "2010" : 
                    var maxdata = y2010
                    break;
                default:
                    var maxdata = y2015
                    break;
    
            }
            switch(minvalue){
                case "1995" : 
                    var mindata:any[] = y1995
                    break;
                case "2000" : 
                    var mindata:any[] = y2000
                    break;
                case "2005" : 
                    var mindata:any[] = y2005
                    break;
                case "2010" : 
                    var mindata:any[] = y2010
                    break;
                case "2015" : 
                    var mindata:any[] = y2015
                    break;  
                default:
                    var mindata:any[] = y1990
                    break;
    
            }
            var diff  = maxdata.map((n,i)=> n - mindata[i]) 
    

            var i =0
            ForestmapLayer.eachLayer(
                function(l:L.FeatureGroup){
                l.setStyle({
                    fillColor: getColor(diff[i++])
            }) 
            // console.log('success!')   
        }
        )
    }
    function getColor(d){
        return d > 10  ? '#008000' : // green
        d > 5  ? '#228B22' : // forest green
        d > 4  ? '#32CD32' : // limegreen 
        d > 3  ? '#00FF00' : // lime
        d > 2  ? '#7CFC00' : // lawngreen
        d > 1  ? '#ADFF2F' : // green yellow
        d > 0  ? '#00FF7F' : //  spring green
        d > -1 ? '#FA8072' : // salmon
        d == 0 ? '#F4F6F6 ': //gray
        d > -2 ? '#F08080' : // red coral
        d > -3 ? '#CD5C5C' : // indian red
        d > -4 ? '#DC143C' : //crimson
        d > -5? '#FF0000' : // red
        d > -10 ? '#B22222' : // fire brick
                  '#800000'; // marron
    }
   
        return ForestmapLayer;
    }
  }

class Lowgdp extends Overlay {

    constructor(name: string, featureCollection: FeatureCollection ) {
        super(name, featureCollection);
    }

    //delete the former output
    

    createOverlay() {

       var y1990 = this.featureCollection.features.map(d=>d.properties.y1990)
       var y1995 = this.featureCollection.features.map(d=>d.properties.y1995)
       var y2000 = this.featureCollection.features.map(d=>d.properties.y2000)
       var y2005 = this.featureCollection.features.map(d=>d.properties.y2005)
       var y2010 = this.featureCollection.features.map(d=>d.properties.y2010)
       var y2015 = this.featureCollection.features.map(d=>d.properties.y2015)
       
    

        // calculate new color scale
        // .domain expects an array of [min, max] value
        // d3.extent returns exactly this array
        // const minMaxBars = d3.extent(this.featureCollection.features.map(d => d.properties.y1990));// this.featureCollection.features.map(d => d.properties.y1990)
        // const colorScale = d3.scaleSequential(d3.interpolateGreens).domain(minMaxBars);
  
        
        // console.log(this.featureCollection.features.map(d=>d.))
        // create tooltip
        const tooltip = d3.select('body')
        .append('div')
        .attr('id', 'comparision-tooltip')
        .attr('class', 'map-tooltip')
        .style('display', 'none');
  
        tooltip.append('h3').text('detail:');
        const nameP = tooltip.append('p');
        const year1 = tooltip.append('p');
        const year2 = tooltip.append('p');

        // create geojson layer (looks more complex than it is)
        let ForestmapLayer = L.geoJSON(this.featureCollection, {
            style: (feature) => {
                return {
                    fillColor: getColor(feature.properties.y1990), //feature.properties.y1990
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                };
            },
            
  
            onEachFeature: (feature, layer) => {
                layer.on({
                    // on mouseover update tooltip and highlight county
                    mouseover: (e: L.LeafletMouseEvent) => {
  
                        // set position and text of tooltip
                        tooltip.style('display', null);
                        tooltip.style('top', `${e.originalEvent.clientY - 75}px`);
                        tooltip.style('left', `${e.originalEvent.clientX + 25}px`);
                        nameP.text(`Country name: ${feature.properties.name}`);
                        year1.text(`Forest area in 1990: ${feature.properties.y1990}`);
                        year2.text(`Forest area in 2015: ${feature.properties.y2015}`); //${feature.properties.name}
                        // numpointP.text(`num of points: ${feature.properties.num_point}`); // ${feature.properties.num_bars}
                        // pointidP.text(`point_id: ${feature.properties.pointidP}`);
  
                        // set highlight style
                        const l = e.target;
                        l.setStyle({
                            weight: 5,
                            color: '#666',
                            dashArray: '',
                            fillOpacity: 0.7
                        });
  
                        l.bringToFront();
                    },
                    // on mouseover hide tooltip and reset county to normal sytle
                    mouseout: (e: L.LeafletMouseEvent) => {
                        tooltip.style('display', 'none');
                        e.target.setStyle({
                            weight: 2,
                            color: 'white',
                            dashArray: '3',
                            fillOpacity: 0.7
                        });
                        // ForestmapLayer.resetStyle(e.target);
                    },

                    // on mouseover hide tooltip and reset county to normal sytle

                });
            }
        });


// change polygon color
        const geo = this.featureCollection
        var slider = document.getElementById('slide');
        slider.addEventListener('click', changeColor);
 
        function changeColor(){
            // alert('listening')
            var maxvalue = d3.select("#slide").attr("ng-reflect-high-value")
            var minvalue =  d3.select("#slide").attr("ng-reflect-value")
            switch(maxvalue){
                case "1990" :
                    var maxdata = y1990
                    break;
                case "1995" : 
                    var maxdata = y1995
                    break;
                case "2000" : 
                    var maxdata = y2000
                    break;
                case "2005" : 
                    var maxdata = y2005
                    break;
                case "2010" : 
                    var maxdata = y2010
                    break;
                default:
                    var maxdata = y2015
                    break;
    
            }
            switch(minvalue){
                case "1995" : 
                    var mindata:any[] = y1995
                    break;
                case "2000" : 
                    var mindata:any[] = y2000
                    break;
                case "2005" : 
                    var mindata:any[] = y2005
                    break;
                case "2010" : 
                    var mindata:any[] = y2010
                    break;
                case "2015" : 
                    var mindata:any[] = y2015
                    break;  
                default:
                    var mindata:any[] = y1990
                    break;
    
            }
            var diff  = maxdata.map((n,i)=> n - mindata[i]) 
    

            var i =0
            ForestmapLayer.eachLayer(
                function(l:L.FeatureGroup){
                l.setStyle({
                    fillColor: getColor(diff[i++])
            }) 
            // console.log('success!')   
        }
        )
    }
    function getColor(d){
        return d > 10  ? '#008000' : // green
        d > 5  ? '#228B22' : // forest green
        d > 4  ? '#32CD32' : // limegreen 
        d > 3  ? '#00FF00' : // lime
        d > 2  ? '#7CFC00' : // lawngreen
        d > 1  ? '#ADFF2F' : // green yellow
        d > 0  ? '#00FF7F' : //  spring green
        d == 0 ? '#F4F6F6 ': //gray
        d > -1 ? '#FA8072' : // salmon
        d > -2 ? '#F08080' : // red coral
        d > -3 ? '#CD5C5C' : // indian red
        d > -4 ? '#DC143C' : //crimson
        d > -5? '#FF0000' : // red
        d > -10 ? '#B22222' : // fire brick
                  '#800000'; // marron
    }
   
        return ForestmapLayer;
    }
  }

class Highpop extends Overlay {

    constructor(name: string, featureCollection: FeatureCollection ) {
        super(name, featureCollection);
    }

    //delete the former output
    

    createOverlay() {

       var y1990 = this.featureCollection.features.map(d=>d.properties.y1990)
       var y1995 = this.featureCollection.features.map(d=>d.properties.y1995)
       var y2000 = this.featureCollection.features.map(d=>d.properties.y2000)
       var y2005 = this.featureCollection.features.map(d=>d.properties.y2005)
       var y2010 = this.featureCollection.features.map(d=>d.properties.y2010)
       var y2015 = this.featureCollection.features.map(d=>d.properties.y2015)
       
    

        // calculate new color scale
        // .domain expects an array of [min, max] value
        // d3.extent returns exactly this array
        // const minMaxBars = d3.extent(this.featureCollection.features.map(d => d.properties.y1990));// this.featureCollection.features.map(d => d.properties.y1990)
        // const colorScale = d3.scaleSequential(d3.interpolateGreens).domain(minMaxBars);
  
        
        // console.log(this.featureCollection.features.map(d=>d.))
        // create tooltip
        const tooltip = d3.select('body')
        .append('div')
        .attr('id', 'comparision-tooltip')
        .attr('class', 'map-tooltip')
        .style('display', 'none');
  
        tooltip.append('h3').text('detail:');
        const nameP = tooltip.append('p');
        const year1 = tooltip.append('p');
        const year2 = tooltip.append('p');
  

        // create geojson layer (looks more complex than it is)
        let ForestmapLayer = L.geoJSON(this.featureCollection, {
            style: (feature) => {
                return {
                    fillColor: getColor(feature.properties.y1990), //feature.properties.y1990
                    weight: 2,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                };
            },
            
  
            onEachFeature: (feature, layer) => {
                layer.on({
                    // on mouseover update tooltip and highlight county
                    mouseover: (e: L.LeafletMouseEvent) => {
  
                        // set position and text of tooltip
                        tooltip.style('display', null);
                        tooltip.style('top', `${e.originalEvent.clientY - 75}px`);
                        tooltip.style('left', `${e.originalEvent.clientX + 25}px`);
                        nameP.text(`Country name: ${feature.properties.name}`);
                        year1.text(`Forest area in 1990: ${feature.properties.y1990}`);
                        year2.text(`Forest area in 2015: ${feature.properties.y2015}`); //${feature.properties.name}
                        // numpointP.text(`num of points: ${feature.properties.num_point}`); // ${feature.properties.num_bars}
                        // pointidP.text(`point_id: ${feature.properties.pointidP}`);
  
                        // set highlight style
                        const l = e.target;
                        l.setStyle({
                            weight: 5,
                            color: '#666',
                            dashArray: '',
                            fillOpacity: 0.7
                        });
  
                        l.bringToFront();
                    },
                    // on mouseover hide tooltip and reset county to normal sytle
                    mouseout: (e: L.LeafletMouseEvent) => {
                        tooltip.style('display', 'none');
                        e.target.setStyle({
                            weight: 2,
                            color: 'white',
                            dashArray: '3',
                            fillOpacity: 0.7
                        });
                        // ForestmapLayer.resetStyle(e.target);
                    },

                    // on mouseover hide tooltip and reset county to normal sytle

                });
            }
        });


// change polygon color
        const geo = this.featureCollection
        var slider = document.getElementById('slide');
        slider.addEventListener('click', changeColor);
 
        function changeColor(){
            // alert('listening')
            var maxvalue = d3.select("#slide").attr("ng-reflect-high-value")
            var minvalue =  d3.select("#slide").attr("ng-reflect-value")
            switch(maxvalue){
                case "1990" :
                    var maxdata = y1990
                    break;
                case "1995" : 
                    var maxdata = y1995
                    break;
                case "2000" : 
                    var maxdata = y2000
                    break;
                case "2005" : 
                    var maxdata = y2005
                    break;
                case "2010" : 
                    var maxdata = y2010
                    break;
                default:
                    var maxdata = y2015
                    break;
    
            }
            switch(minvalue){
                case "1995" : 
                    var mindata:any[] = y1995
                    break;
                case "2000" : 
                    var mindata:any[] = y2000
                    break;
                case "2005" : 
                    var mindata:any[] = y2005
                    break;
                case "2010" : 
                    var mindata:any[] = y2010
                    break;
                case "2015" : 
                    var mindata:any[] = y2015
                    break;  
                default:
                    var mindata:any[] = y1990
                    break;
    
            }
            var diff  = maxdata.map((n,i)=> n - mindata[i]) 
    

            var i =0
            ForestmapLayer.eachLayer(
                function(l:L.FeatureGroup){
                l.setStyle({
                    fillColor: getColor(diff[i++])
            }) 
            // console.log('success!')   
        }
        )
    }
    function getColor(d){
        return d > 10  ? '#008000' : // green
        d > 5  ? '#228B22' : // forest green
        d > 4  ? '#32CD32' : // limegreen 
        d > 3  ? '#00FF00' : // lime
        d > 2  ? '#7CFC00' : // lawngreen
        d > 1  ? '#ADFF2F' : // green yellow
        d > 0  ? '#00FF7F' : //  spring green
        d == 0 ? '#F4F6F6 ': //gray
        d > -1 ? '#FA8072' : // salmon
        d > -2 ? '#F08080' : // red coral
        d > -3 ? '#CD5C5C' : // indian red
        d > -4 ? '#DC143C' : //crimson
        d > -5? '#FF0000' : // red
        d > -10 ? '#B22222' : // fire brick
                  '#800000'; // marron
    }
   
        return ForestmapLayer;
    }
  }
export { Overlay, Forestmap, Highgdp,Highpop,Lowgdp, ForestChange};
