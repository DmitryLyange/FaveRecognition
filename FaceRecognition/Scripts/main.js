async function trainFirst(event) {
    try {
        //get the response data by algorigth name
        const responseData = await apiCall('Api/Algorithm/PCA');
        //create new card by reseved algorithm data
        createNewStatisticsCard(responseData);
    } catch (e) {
        console.log(e);
    } 
}

function trainSecond (event) {

}

function trainThird (event) {

}

function createGraph(event) {
    drawGrapt();
}

async function apiCall(url) {
    const data = await fetch(url,
        {
            method: 'get',
            contentType: "json",
            dataType: "json"
        });
    if (data) {
        //here goes the response
        //TODO apply JSON.parse(data.text())
        return await data.text();
    } else {
        throw new Error('FIX YOUR GD DMN SRVR... 1..2..3..4..');
    }
}

function createNewStatisticsCard(plot) {
    const nodePrototype = document.getElementById('prototypeCard');
    const clonedElement = nodePrototype.cloneNode(true);
    try {
        //set up the card values
        clonedElement['fce'].value = "New value";
        clonedElement['sce'].value = "New value";
        clonedElement['speed'].value = "New value";
        clonedElement['accuracy'].value = "New value";
    } catch (e) {

    } 
    //add card to the container
    document.getElementById('cardContainer').appendChild(clonedElement);
    //show new card
    clonedElement.style.display = 'block';
}

function drawGrapt() {
    //here goes grath data
    //now it is letter for x-axis, and frequency for y-axis
    const data = [
        {
            letter: 'A',
            frequency: '0.08167'
        }, {
            letter: 'B',
            frequency: '0.1492'
        }
    ];
    //technical staff
    var svg = d3.select("svg"),
        margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom;

    var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //parse data to axis
    x.domain(data.map(d => d.letter));
    y.domain([0, d3.max(data, d => d.frequency)]);
    
    //technical staff
    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10, "%"))
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

    g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.letter); })
        .attr("y", function(d) { return y(d.frequency); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.frequency); });
}