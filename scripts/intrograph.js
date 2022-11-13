const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
var width = vw, height = vh
var radius = 5;

var numNodes1 = 243 //starting 1/8 trillions of the top 10%
var numNodes2 = 14 //starting 1/8 trillions of the top 10%
var nodes = d3.range(numNodes1).map(function(d) {
	return {
        radius: radius,
        group: 1,
        x: (Math.random()-.5)*5000,
        y: (Math.random()-.5)*5000,
    }
})

nodes = nodes.concat(d3.range(numNodes2).map(function(d) {
	return {
        radius: radius,
        group: 2,
        x: (Math.random()-.5)*5000,
        y: (Math.random()-.5)*5000,
    }
}))

console.log(nodes)

var simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(-12))
    .force('x', d3.forceX(width* 6/10))
    .force('y', d3.forceY(height / 2))
    .force('collision', d3.forceCollide().radius(function(d) {
        return d.radius
    }))
    .alphaDecay(0)
    .alpha(.6)
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

//ADDING YEARS DATA - FROM CBO - https://www.cbo.gov/publication/57598
yearTrillions = [
    {
    year: "1989",
    trillionTop: "24.3",
    trillionBottom: "1.4",
    trillion90: "14.1"
    },
    {
        year: "1992",
        trillionTop: "23.1",
        trillionBottom: "1.4",
        trillion90: "13.6"
    },
    {
        year: "1995",
        trillionTop: "25.8",
        trillionBottom: "1.7",
        trillion90: "14.9"
    },
    {
        year: "1998",
        trillionTop: "33.8",
        trillionBottom: "1.9",
        trillion90: "18.7"
    },
    {
        year: "2001",
        trillionTop: "45.6",
        trillionBottom: "2.2",
        trillion90: "23.8"
    },
    {
        year: "2004",
        trillionTop: "51.2",
        trillionBottom: "2.2",
        trillion90: "26.6"
    },
    {
        year: "2007",
        trillionTop: "62.1",
        trillionBottom: "2.7",
        trillion90: "29.2"
    },
    {
        year: "2010",
        trillionTop: "56.7",
        trillionBottom: "1.4",
        trillion90: "25"
    },
    {
        year: "2013",
        trillionTop: "60.5",
        trillionBottom: "1.5",
        trillion90: "26.5"
    },
    {
        year: "2016",
        trillionTop: "78.8",
        trillionBottom: "1.9",
        trillion90: "30.8"
    },
    {
        year: "2019",
        trillionTop: "82.4",
        trillionBottom: "2.3",
        trillion90: "32.5"
    },
]

yearTrillions.forEach( function (element) {
    var div = document.createElement("div");
    div.classList = "subtext year"
    div.id = "y" + element.year;
    div.innerHTML = element.year;
    document.getElementById("year-container").appendChild(div);
})

years = document.querySelectorAll(".year")

//SCROLL TRIGGERS
  const wrapper = document.getElementById("intro-scroll-container");

  gsap.registerPlugin(ScrollTrigger);


  ScrollTrigger.create({
    trigger: "#intro-reverse-split-trigger",
    onEnterBack: () => reverseSplit(),
  });

  ScrollTrigger.create({
    trigger: "#intro-split-trigger",
    onEnter: () => split(),
    onEnterBack: () => changeBackward(0),
  });

yearTrillions.forEach( function (element, index) {
    var div = document.createElement("div");
    div.classList = "intro-trigger-timeline";
    div.id = "intro-trigger-" + element.year;
    div.style.position = "absolute";
    div.style.transform = "translateY(" + (index*50+200) + "vh)"
    document.getElementById("intro-container").appendChild(div);
})

ScrollTrigger.create({
    trigger: "#intro-trigger-1989",
    onEnterBack: () => changeBackward(1),
  })

yearTrillions.slice(1).forEach( function (element, index) {
  ScrollTrigger.create({
    trigger: "#intro-trigger-" + element.year,
    onEnter: () => changeForward(index+1),
    onEnterBack: () => changeBackward(index+2),
  })
})

const endSticky = document.getElementById("end-intro-scroll-trigger");

ScrollTrigger.create({
    trigger: "#end-intro-scroll-trigger",
    onEnter: () => function() { endSticky.style.position = "relative" },
  });

//ANIMATED CHANGES
  function split() {
    simulation.force('x', d3.forceX(function(d) {
        if (d.group == 1) {
            return 6/10*vw;
        } else {
            return 8/10*vw;
        }
    }))
    .force('y', d3.forceY(function(d) {
            if (d.group == 1) {
                return 4/10*vh;
            } else {
                return 8/10*vh;
            }
        }))

    var slash = document.querySelector(".slash");
    unfade(slash);

    var p2 = document.getElementById("intro-p2");
    unfade(p2);
}

function reverseSplit() {
    simulation.force('x', d3.forceX(width* 6/10))
    .force('y', d3.forceY(height / 2))

    var slash = document.querySelector(".slash");
    fade(slash);

    var p2 = document.getElementById("intro-p2");
    fade(p2);
}

function unfade(element) {
    var op = 0.1;  // initial opacity
    var timer = setInterval(function () {
        if (op >= 1){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 10);
}

function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.01){
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 10);
}

//CHANGE FOR EACH YEAR
function changeForward(i) {
    console.log("forward" + i)
    triltop = (yearTrillions[i].trillionTop - yearTrillions[i-1].trillionTop) * 10
    trilbot = (yearTrillions[i].trillionBottom - yearTrillions[i-1].trillionBottom) * 10

    if(triltop > 0) {
        nodes = addNodes(triltop, 1)
    } else {
        nodes = removeNodes(triltop*-1, 1)
    }

    if(trilbot > 0) {
        nodes = addNodes(trilbot, 2)
    } else {
        nodes = removeNodes(trilbot*-1, 2)
    }

    simulation.nodes(nodes).on("tick", ticked)
    .force('x', d3.forceX(function(d) {
        if (d.group == 1) {
            return (6/10-(i/100))*vw;
        } else {
            return (8/10-(i/100))*vw;
        }
    }))
    .force('y', d3.forceY(function(d) {
        if (d.group == 1) {
            return 4/10*vh;
        } else {
            return (8/10-(i/100))*vh;
        }
    }))

    year = document.getElementById("y"+yearTrillions[i].year)
    year.style.opacity = 1;
    oldYear = document.getElementById("y"+yearTrillions[i-1].year)
    oldYear.style.opacity = 0;

    yearspan = document.getElementById("year-span")
    yearspan.innerHTML = yearTrillions[i].year;

}

function changeBackward(i) {
    console.log("backward" + i)

    if (i < yearTrillions.length-1) {
        triltop = (yearTrillions[i].trillionTop - yearTrillions[i+1].trillionTop) * 10
        trilbot = (yearTrillions[i].trillionBottom - yearTrillions[i+1].trillionBottom) * 10

        console.log("triltop" + triltop)

        if(triltop > 0) {
            nodes = addNodes(triltop, 1)
        } else {
            nodes = removeNodes(triltop*-1, 1)
        }

        if(trilbot > 0) {
            nodes = addNodes(trilbot, 2)
        } else {
            nodes = removeNodes(trilbot*-1, 2)
        }

        simulation.nodes(nodes).on("tick", ticked)
        .force('x', d3.forceX(function(d) {
            if (d.group == 1) {
                return (6/10-(i/100))*vw;
            } else {
                return (8/10-(i/100))*vw;
            }
        }))
        .force('y', d3.forceY(function(d) {
            if (d.group == 1) {
                return 4/10*vh;
            } else {
                return (8/10-(i/100))*vh;
            }
        }))

        year = document.getElementById("y"+yearTrillions[i].year)
        year.style.opacity = 1;
        oldYear = document.getElementById("y"+yearTrillions[i+1].year)
        oldYear.style.opacity = 0;

        yearspan = document.getElementById("year-span")
        yearspan.innerHTML = yearTrillions[i].year;
    }

}

function addNodes(i, group) {
    newNodes = nodes.concat(d3.range(i).map(function(d) {
        return {
            radius: radius,
            group: group,
            x: (Math.random()-.5)*5000,
            y: (Math.random()-.5)*5000,
        }
    }))
    return newNodes;
}

function removeNodes(i, group) {
    j = 0;
    newNodes = nodes.filter(
        function(ele){ 
        if (j < i && ele.group == group) {
            j++;
        } else {
            return ele;
        }
    });
    return newNodes;
}

