const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
var width = vw, height = vh

console.log(width)

var numNodes1 = 96 //starting 1/8 trillions of the top 10%
var numNodes2 = 56 //starting 1/8 trillions of the top 10%
var nodes = d3.range(numNodes1).map(function(d) {
	return {
        radius: 5,
        group: 1
    }
})

var nodes = nodes.concat(d3.range(numNodes2).map(function(d) {
	return {
        radius: 5,
        group: 2
    }
}))

console.log(nodes)

var simulation = d3.forceSimulation(nodes)
	.force('charge', d3.forceManyBody().strength(-5))
	.force('center', d3.forceCenter(width*7 / 10, height / 2))
    .force('x', d3.forceX(width*7 / 10))
    .force('y', d3.forceY(height / 2))
	.force('collision', d3.forceCollide().radius(function(d) {
		return d.radius
	}))
	.on('tick', ticked);

function ticked() {
	var u = d3.select('.svg-1')
		.selectAll('circle')
		.data(nodes)
		.join('circle')
		.attr('r', function(d) {
			return d.radius
		})
		.attr('cx', function(d) {
			return d.x
		})
		.attr('cy', function(d) {
			return d.y
		})
}

function split() {
    simulation.force('x', d3.forceX(function(d) {
        if (d.group == 1) {
            return 1/10*vw;
        } else {
            return 2.5/10*vw;
        }
    }))
        .force('y', d3.forceY(function(d) {
            if (d.group == 1) {
                return 1/10*vh;
            } else {
                return 6/10*vh;
            }
        }))
    }

    split()

var nodesToAdd = []

for (let i = 0; i < 100; i++) {
    nodesToAdd.push({
      // initial position of nodes
      x: (width * Math.sin(Math.random() * (2 * Math.PI))),
      y: (width * Math.cos(Math.random() * (2 * Math.PI))),
      delay: Math.random() * (10 * 1000),
      // new position of nodes
      targetX: width*7 / 10,
      targetY : height / 2,
      group: 1
    });
  }

// const wd = 500
// const ht = 500

// d3.select(".container")
// .style("text-align", "center")

// const svgC = d3.select('.container').append("svg")
// .attr("height", ht)
// .attr("width", wd)
// .style("background-color", "none")
// .style("overflow", "hidden")
// ;

// const svgVB = d3.select("divC").append("svg")
// .attr("preserveAspectRatio","xMidYMid meet")
// .attr("viewBox", "0 0 100 100")
// .classed("svg-content", true);

// let colsC 
// let rnf = Math.random()

// if(rnf < 0.25) {
//   colsC = d3.interpolateMagma
// }else{
//   if (rnf< 0.5) {
//     colsC = d3.interpolateViridis
//   }else{
//     if( rnf < 0.75 ) {
//       colsC = d3.interpolateTurbo
//     }else{
//       colsC = d3.interpolateRainbow
//     }
//   }
// }

// const numnodes = 350

// let rScale = d3.scaleLinear()
// .range([3,20, 80]) //scale of the radisu of the circles
// .domain([0,0.8,2]);

// let colScale = d3.scaleLinear()
// .range(["yellow","#ff2222","#ff55ff", "pink", "#fffcc3","#eeffbb"])
// .domain([3,8,15,30,73,80]);

// const lineFunc = d3.line()
// .x(d=>d.x)
// .y(d=>d.y)

// let nodes = []
// let nx, ny, rd, elem

// let stars = []

// for (j=0; j<100 ; j++) { //how many paths

//   let pathData = []

//   let pointNum = 5 + Math.floor(Math.random()*10)

// let x = 50
// let y = 50

// let cx = x/2
// let cy = y/2
// let r = d3.max([cx,cy])

// let rOne = r -  r*Math.random()*0.3 
// let rTwo = r*Math.random()*0.3 + (r*0.3)

// for (i=0;i<pointNum;i++) { //how many spikes


//   let nx = cx + rOne * Math.cos(2 * Math.PI * i/pointNum);
//   let ny = cy + rOne * Math.sin(2 * Math.PI * i/pointNum);

//   pathData.push({x: nx, y:ny})
//   let nx2 = cx + rTwo * Math.cos(2 * Math.PI * (i/pointNum + (1/pointNum/2)  )) ;
//   let ny2 = cy + rTwo * Math.sin(2 * Math.PI * (i/pointNum + (1/pointNum/2)  ));

//   pathData.push({x: nx2, y:ny2})
// }

// pathData.push(pathData[0])
// let newPath = lineFunc(pathData)

// stars.push({
//   path:newPath,
//   rad: rOne,
//   col: colsC(Math.random())
// })

// }
// console.log(stars)


// for (i=0;i<numnodes;i++) {
// nx = Math.abs(normal())
// rd = rScale(nx)
// elem = {rd:rd}
// nodes.push(elem)
// };

// const force = d3.forceSimulation(stars)
//         .force("charge", d3.forceManyBody().strength(0.5))
//         .force("center", d3.forceCenter(wd*0.5,ht*0.5))
//         .force("collision", d3.forceCollide().radius(function(d) {
//           return d.rad + 0.5
//         }))
//         .on("tick", ticked);

// force.velocityDecay(0.5).alphaDecay(0.005)

// function ticked() {
//   let u = svgC
//   .selectAll("path")
//   .data(stars)

//   u.enter()
//   .append("path")
//   .attr("d", function(d) {
//     return d.path
//   })
//   .merge(u)
//   .attr("transform", (d)=>{
//     return "translate(" + d.x +", " + d.y + ")"
//   })
//   .attr("fill", "none")
//   .attr("stroke",function(d){
//     return d.col
//   })
//   .attr("stroke-width", "1.5px");

//   u.exit().remove()
// }

// // from http://bl.ocks.org/mbostock/4349187
// // Sample from a normal distribution with mean 0, stddev 1.
// function normal() {
//     let x = 0,
//         y = 0,
//         rds, c;
//     do {
//         x = Math.random() * 2 - 1;
//         y = Math.random() * 2 - 1;
//         rds = x * x + y * y;
//     } while (rds == 0 || rds > 1);
//     c = Math.sqrt(-2 * Math.log(rds) / rds); // Box-Muller transform
//     return x * c; // throw away extra sample y * c
// }
