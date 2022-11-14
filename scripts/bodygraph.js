var numNodes3 = 10 //starting 1/8 trillions of the top 10%
var numNodes4 = 10 //starting 1/8 trillions of the top 10%
bodyradius = 3;

var bodynodes = d3.range(numNodes3).map(function(d) {
	return {
        radius: bodyradius,
        group: 1,
        x: (Math.random()-.5)*5000,
        y: (Math.random()-.5)*5000,
    }
})

bodynodes = bodynodes.concat(d3.range(numNodes4).map(function(d) {
	return {
        radius: bodyradius,
        group: 2,
        x: (Math.random()-.5)*5000,
        y: (Math.random()-.5)*5000,
    }
}))

console.log(bodynodes)

var bodysimulation = d3.forceSimulation(bodynodes)
    .force('charge', d3.forceManyBody().strength(-8))
    .force('x', d3.forceX(width* 6/10))
    .force('y', d3.forceY(height / 2))
    .force('collision', d3.forceCollide().radius(function(d) {
        return d.radius
    }))
    .alphaDecay(0)
    .alpha(.6)
    .on('tick', bodyticked);

function bodyticked() {
	var u = d3.select('.body-svg')
		.selectAll('circle')
		.data(bodynodes)
		.join('circle')
        .attr("class", "body-circle")
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