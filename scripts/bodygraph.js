var numNodes3 = 35 //percent of all US workers belonging to unions, 1954
var numNodes4 = 11 //percent of all US workers belonging to unions, 2013
//https://www.pewresearch.org/fact-tank/2014/02/20/for-american-unions-membership-trails-far-behind-public-support/
bodyradius = 4;

var bodynodes;

console.log(bodynodes)

var bodysimulation = d3.forceSimulation(bodynodes)
    .force('charge', d3.forceManyBody().strength(-8))
    .force('x', d3.forceX(function(d) {
        if (d.group == 1) {
            return 4/10*width;
        } else {
            return 5/10*width;
        }
    }))
    .force('y', d3.forceY(function(d) {
        if (d.group == 1) {
            return 1.7/10*height;
        } else {
            return 5/10*height;
        }
    }))
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

graphheader = document.querySelector(".body-header")
function unionMembership() {

    var numNodes3 = 35 //percent of all US workers belonging to unions, 1954
    var numNodes4 = 11 //percent of all US workers belonging to unions, 2013
    //https://www.pewresearch.org/fact-tank/2014/02/20/for-american-unions-membership-trails-far-behind-public-support/

    bodynodes = d3.range(numNodes3).map(function(d) {
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

    bodysimulation.nodes(bodynodes).on('tick', bodyticked);

    graphtitle = document.querySelector("#graph-title")
    graphtitle.innerHTML = "Percent of all U.S. workers belonging to a union over time"
    toplabel = document.querySelector("#graph-label-top")
    toplabel.innerHTML = "1954"
    bottomlabel = document.querySelector("#graph-label-bottom")
    bottomlabel.innerHTML = "2013"
}

function laborShareofIncome() {
    var numNodes3 = 65 //labor share of income, 1973
    var numNodes4 = 57 //labor share of income, 2017
    //https://www.brookings.edu/research/thirteen-facts-about-wage-growth/

    bodynodes = d3.range(numNodes3).map(function(d) {
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

    bodysimulation.nodes(bodynodes).on('tick', bodyticked);
}

function laborShareofIncome() {
    var numNodes3 = 21 //labor share of income, 1973
    var numNodes4 = 12 //labor share of income, 2017
    //https://money.cnn.com/2016/12/22/news/economy/us-inequality-worse/index.html

    bodynodes = d3.range(numNodes3).map(function(d) {
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

    bodysimulation.nodes(bodynodes).on('tick', bodyticked)
    .force('x', d3.forceX(function(d) {
        if (d.group == 1) {
            return 4/10*width;
        } else {
            return 5/10*width;
        }
    }));

    graphtitle = document.querySelector("#graph-title")
    graphtitle.innerHTML = "Percent share of income of bottom 50% over time"
    toplabel = document.querySelector("#graph-label-top")
    toplabel.innerHTML = "1969"
    bottomlabel = document.querySelector("#graph-label-bottom")
    bottomlabel.innerHTML = "2014"
}

//https://www.bls.gov/opub/btn/volume-3/what-can-labor-productivity-tell-us-about-the-us-economy.htm

function productivity() {
    var numNodes3 = 20 //Productivity index, 1947
    var numNodes4 = 108 //Productivity index, 2013
    //https://www.bls.gov/opub/btn/volume-3/what-can-labor-productivity-tell-us-about-the-us-economy.htm

    bodynodes = d3.range(numNodes3).map(function(d) {
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

    bodysimulation.nodes(bodynodes).on('tick', bodyticked)
    .force('x', d3.forceX(function(d) {
        if (d.group == 1) {
            return 4/10*width;
        } else {
            return 5.5/10*width;
        }
    }));

    graphtitle = document.querySelector("#graph-title")
    graphtitle.innerHTML = "BLS Labor Productivity Index over time"
    toplabel = document.querySelector("#graph-label-top")
    toplabel.innerHTML = "1947"
    bottomlabel = document.querySelector("#graph-label-bottom")
    bottomlabel.innerHTML = "2013"
}

function wageGrowth() {
    document.querySelector(".body-graph-container").style.display = "block";

    var numNodes3 = 20 //Productivity index, 1947
    var numNodes4 = 23 //Productivity index, 2013
    //https://www.epi.org/publication/americas-slow-motion-wage-crisis-four-decades-of-slow-and-unequal-growth-2/

    bodynodes = d3.range(numNodes3).map(function(d) {
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

    bodysimulation.nodes(bodynodes).on('tick', bodyticked)    
    .force('x', d3.forceX(function(d) {
        if (d.group == 1) {
            return 4/10*width;
        } else {
            return 5/10*width;
        }
    }));

    graphtitle = document.querySelector("#graph-title")
    graphtitle.innerHTML = "Wage change for the bottom 50% over time"
    toplabel = document.querySelector("#graph-label-top")
    toplabel.innerHTML = "1947"
    bottomlabel = document.querySelector("#graph-label-bottom")
    bottomlabel.innerHTML = "2013"
}

function disappear() {
    document.querySelector(".body-graph-container").style.display = "none";
}

steps = document.querySelectorAll(".steps")

console.log(steps)

steps.forEach( function (element, index) {
    ScrollTrigger.create({
      trigger: "#body-graph" + (index+1),
      onEnter: () => bodygraph(index),
      onLeaveBack: () => bodygraph(index-1),
    })
  })

function bodygraph(i) {
    if (i == 1) {
        unionMembership();
    } else if (i == 2) {
        laborShareofIncome()
    }
    else if (i == 3) {
        productivity();
    }
    else if (i==4) {
        wageGrowth();
    }
}

ScrollTrigger.create({
    trigger: "#trigger-end",
    onEnter: () => disappear(),
    onLeaveBack: () => bodygraph(4),
  })

  ScrollTrigger.create({
    trigger: "#body-graph1",
    onEnter: () => unfade(graphheader),
    onEnterBack: () => fade(graphheader),
  })


