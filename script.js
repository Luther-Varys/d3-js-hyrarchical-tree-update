// --- whatch these tutorals as reference ---
//https://www.youtube.com/watch?v=ZOeWdkq-L90
//https://www.youtube.com/watch?v=AYPTVwRaYiI
//https://www.youtube.com/watch?v=gKl7KJSwSQw
//https://www.youtube.com/watch?v=PNzbk0M_woQ
//---- How to and Bexier Curve links --------
//https://stackoverflow.com/questions/55431818/change-d3-force-layout-link-style-to-match-d3-tree-look

//---- How chat gpt says to move the cirles layer level above the links ----
//I apologize for the confusion. The z-index property 
//is not applicable to SVG elements. To achieve the 
//effect of hiding links under shapes in a D3.js hierarchy 
//tree, you can control the rendering order by carefully 
//ordering the SVG elements within the <g> container. Here's how you can achieve this effect:


// Define the data in a hierarchical format
const data = {
    name: "Root",
    children: [
      {
        name: "Child 1",
        children: [
          { name: "Grandchild 1" },
          { name: "Grandchild 2" },
        ],
      },
      { name: "Child 2" },
    ],
  };
  

  
  // Define dimensions of the SVG container
  // const width = 800;
  // const height = 400;
  const width = 900;
  const height = 900;  
  
  const svg = d3.select("#tree-container")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(50, 50)"); // Adjust the margins as needed
  
  // Create a tree layout
  const tree = d3.tree().size([width - 100, height - 100]);
  
  // Create a hierarchical data structure
  const root = d3.hierarchy(data);
  
  // Calculate the tree layout
  tree(root);
  
  // Create links (edges) between nodes
  const links = root.links();
  
  const linkContainer = svg.append("g");

  // Create a container for the nodes
  const nodeContainer = svg.append("g");


  // Create nodes (circles) for the tree
  const nodes = nodeContainer
    .selectAll("circle")
    .data(root.descendants())
    .enter()
    .append("circle")
    .attr("cx", (d) => {
      var resp = d.y;
      return resp;
    })
    .attr("class", "wpnode")
    .attr("cy", (d) => {return d.x;})
    .attr("r", 10)
    .on("click", function(e, d){
      clicked(e, d);
      toggleSelection(e);
    })
    .attr("data-id", (d)=>{return d.data.name;})
    .classed("circle-node", true)
    // .style("z-index", 10); // Set a higher z-index for the circles
  
  // Create lines for the links
  const linktest01 = d3.linkHorizontal()
  .x(function(d) { return d.y; })
  .y(function(d) { return d.x; });

  linkContainer
    .selectAll("path")
    // .data(links)
    .data(links)
    .enter()
    .append("path")
    .style("z-index", 111)
    .attr("d", linktest01);
  
  // Add labels to the nodes
  nodeContainer
    .selectAll("text")
    .data(root.descendants())
    .enter()
    .append("text")
    .text((d) => d.data.name)
    .attr("x", (d) => d.y)
    .attr("y", (d) => d.x - 20)
    .attr("text-anchor", "middle");
  


//////////////////////////
//ENTER
//////////////////////////
setTimeout(()=>{
  console.log("Hello world 1.");

  data.children[0].children.push({ name: "Child 3" });
  data.children.push({ name: "Child 4" });
  data.children.push({ name: "Child 5" });
  data.children.push({ name: "Child 6" });

  TreeAdd(data)



}, 3000);

//////////////////////////
//EXIT
//////////////////////////
setTimeout(()=>{
  console.log("Hello world 2.");

  let index = 1;
  data.children.splice(index, 1);

  TreeExit(data);


}, 6000);

//////////////////////////
//UPDATE
//////////////////////////
setTimeout(()=>{
  console.log("Hello world 3.");
  let index = 1;
  let newItem = { name: "Child XXX" }
  data.children[index] = newItem;

  TreeUpdate(data);

}, 9000);










function TreeAdd(dataNodes){  
    const root = d3.hierarchy(dataNodes);
    tree(root);
    
    //NODES
    nodes
      .data(root.descendants())
      .attr("cx", (d) => d.y)
      .attr("cy", (d) => d.x);  
  
      nodeContainer
      .selectAll("circle")
      .data(root.descendants())
      .enter()
      .append("circle")
        .attr("cx", (d) => {
          var resp = d.y;
          return resp;
        })
        .attr("class", "wpnode")
        .attr("cy", (d) => {return d.x;})
        .attr("r", 10)
        .attr("data-id", (d)=>{return d.data.name;})
        .classed("circle-node", true)
        .on("click", function(e, d){
          clicked(e, d);
          toggleSelection(e);
        });
  
    //LINKS
    const linktest01 = d3.linkHorizontal()
    .x(function(d) { return d.y; })
    .y(function(d) { return d.x; });
  
    linkContainer.selectAll("path").remove();
    linkContainer
      .selectAll("path")
      .data(root.links())
      .enter()
      .append("path")
        .attr("d", (d) => {
          return `M${d.source.x},${d.source.y} L${d.target.x},${d.target.y}`;
        })
      .attr("d", linktest01);    
  
    //TEXT
    nodeContainer.selectAll("text").remove();
    nodeContainer
      .selectAll("text")
      .data(root.descendants())
      .enter()
      .append("text")
        .text((d) => d.data.name)
        .attr("x", (d) => d.y)
        .attr("y", (d) => d.x - 20)
        .attr("text-anchor", "middle");
}

function TreeExit(dataNodes){


  const root = d3.hierarchy(dataNodes);
  tree(root);

  //NODES
  nodes
    .data(root.descendants())
    .attr("cx", (d) => d.y)
    .attr("cy", (d) => d.x);  

    nodeContainer.selectAll("circle").remove();
    nodeContainer
    .selectAll("circle")
    .data(root.descendants())
    .enter()
    .append("circle")
      .attr("cx", (d) => {
        var resp = d.y;
        return resp;
      })
      .attr("class", "wpnode")
      .attr("cy", (d) => {return d.x;})
      .attr("r", 10)
      .attr("data-id", (d)=>{return d.data.name;})
      .classed("circle-node", true)
      .on("click", function(e, d){
        clicked(e, d);
        toggleSelection(e);
      })      

  const linktest01 = d3.linkHorizontal()
  .x(function(d) { return d.y; })
  .y(function(d) { return d.x; });
  //LINKS
  linkContainer.selectAll("path").remove();
  linkContainer
    .selectAll("path")
    .data(root.links())
    .enter()
    .append("path")
      .attr("d", (d) => {
        return `M${d.source.x},${d.source.y} L${d.target.x},${d.target.y}`;
      })
    .attr("d", linktest01);    

  //TEXT
  nodeContainer.selectAll("text").remove();
  nodeContainer
    .selectAll("text")
    .data(root.descendants())
    .enter()
    .append("text")
      .text((d) => d.data.name)
      .attr("x", (d) => d.y)
      .attr("y", (d) => d.x - 20) 
      .attr("text-anchor", "middle");
}

function TreeUpdate(dataNodes){
  const root = d3.hierarchy(dataNodes);
  tree(root);

  //NODES
  nodes
    .data(root.descendants())
    .attr("cx", (d) => d.y)
    .attr("cy", (d) => d.x);  

    nodeContainer
    .selectAll("circle")
    .data(root.descendants())
    //.exit()
    .enter()
    .append("circle")
      .attr("cx", (d) => {
        var resp = d.y;
        return resp;
      })
      .attr("cy", (d) => {return d.x;})
      .attr("r", 10)
      .attr("class", "wpnode")
      .on("click", function(e, d){
        clicked(e, d);
        toggleSelection(e);
      })
      // .style("z-index", 10)
      .attr("data-id", (d)=>{return d.data.name;})
      .classed("circle-node", true);

  //LINKS
  const linktest01 = d3.linkHorizontal()
  .x(function(d) { return d.y; })
  .y(function(d) { return d.x; });  
  linkContainer.selectAll("path").remove();
  linkContainer
    .selectAll("path")
    .data(root.links())
    .enter()
    .append("path")
      .attr("d", (d) => {
        return `M${d.source.x},${d.source.y} L${d.target.x},${d.target.y}`;
      })
    .attr("d", linktest01);;    

  //TEXT
  nodeContainer.selectAll("text").remove();
  nodeContainer
    .selectAll("text")
    .data(root.descendants())
    .enter()
    .append("text")
      .text((d) => d.data.name)
      .attr("x", (d) => d.y)
      .attr("y", (d) => d.x - 20)
      .attr("text-anchor", "middle");  
}










$(".wpnode").click(function(e){
  //your logic on click
  console.log("clicked wpnode");
  console.log(e);
})

function clicked(e, d) {
  console.log("ON clicked");
  console.log(e);
  console.log(d);

  $(".selected-node-nmae").text(d.data.name);
}

function toggleSelection(e) {
  let isSelected = $(e.srcElement).hasClass("selected");

  if(isSelected === true){
    $("circle").removeClass("selected");
  }
  else{
    $("circle").removeClass("selected");
    $(e.srcElement).addClass("selected")
  }
}