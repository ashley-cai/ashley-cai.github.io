const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
var width = vw, height = vh

console.log(width)

var numNodes1 = 192 //starting 1/8 trillions of the top 10%
var numNodes2 = 112 //starting 1/8 trillions of the top 10%
var nodes = d3.range(numNodes1).map(function(d) {
	return {
        radius: 5,
        group: 1,
        x: (Math.random()-.5)*5000,
        y: (Math.random()-.5)*5000,
    }
})

nodes = nodes.concat(d3.range(numNodes2).map(function(d) {
	return {
        radius: 5,
        group: 2,
        x: (Math.random()-.5)*5000,
        y: (Math.random()-.5)*5000,
    }
}))

console.log(nodes)

var simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(-5))
    .force('x', d3.forceX(width* 7/10))
    .force('y', d3.forceY(height / 2))
    .force('collision', d3.forceCollide().radius(function(d) {
        return d.radius
    }))
    .alphaDecay(0)
    .alpha(.6)
    .on('tick', ticked);

function add(number) {
    nodes = nodes.concat(d3.range(number).map(function(d) {
        return {
            radius: 5,
            group: 1,
            x: (Math.random()-.5)*5000,
            y: (Math.random()-.5)*5000,
        }
    }))
    simulation.nodes(nodes).on("tick", ticked);
}

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
            return 7/10*vw;
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

years = document.querySelectorAll(".year")

yearTrillions = [
    {
    year: "1989",
    trillionTop: "24.3",
    trillionBottom: "14.1"
    },
    {
        year: "1992",
        trillionTop: "23.1",
        trillionBottom: "13.6"
    },
    {
        year: "1995",
        trillionTop: "25.8",
        trillionBottom: "14.9"
    },
    {
        year: "1998",
        trillionTop: "33.8",
        trillionBottom: "18.7"
    },
    {
        year: "2001",
        trillionTop: "45.6",
        trillionBottom: "23.8"
    },
    {
        year: "2004",
        trillionTop: "51.2",
        trillionBottom: "26.6"
    },
    {
        year: "2007",
        trillionTop: "62.1",
        trillionBottom: "29.2"
    },
    {
        year: "2010",
        trillionTop: "56.7",
        trillionBottom: "25"
    },
    {
        year: "2013",
        trillionTop: "60.5",
        trillionBottom: "26.5"
    },
    {
        year: "2016",
        trillionTop: "78.8",
        trillionBottom: "30.8"
    },
    {
        year: "2019",
        trillionTop: "82.4",
        trillionBottom: "32.5"
    },
]

yearTrillions.forEach( function (element) {
    var div = document.createElement("div");
    div.classList = "subtext year"
    div.id = "y" + element.year;
    div.innerHTML = element.year;
    document.getElementById("year-container").appendChild(div);
})


//ADDING NODES
  //SCROLL TRIGGERS
  const wrapper = document.getElementById("intro-scroll-container");

  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: "#intro-split-trigger",
    markers: true,
    onEnter: () => split(),
  });

  ScrollTrigger.create({
    trigger: "#intro-gain-trigger-1989 ",
    markers: true,
    onEnter: () => add(37),
  });