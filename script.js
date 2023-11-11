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
  

let selectedNode = null;


  
// Define dimensions of the SVG container
const width = 900;
const height = 900;  

const svg = d3.select("#tree-container")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(50, 50)"); // Adjust the margins as needed


//////////////////////////////////////////////////
//Initial Load
//////////////////////////////////////////////////

// Create a container for the links and nodes
const linkContainer = svg.append("g");
const nodeContainer = svg.append("g");
// Create a tree layout
const tree = d3.tree().size([width - 100, height - 100]);
// Create a hierarchical data structure
const root = d3.hierarchy(data);
// Calculate the tree layout
tree(root);

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
  // .attr('transform', d => `translate(${d.x},${d.y})`)
  // .style("z-index", 10); // Set a higher z-index for the circles

// Create lines for the links
const linktest01 = d3.linkHorizontal()
.x(function(d) { return d.y; })
.y(function(d) { return d.x; });

linkContainer
  .selectAll("path")
  // .data(links)
  .data(root.links())
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

  TreeEnter(data)



}, 3000000);

//////////////////////////
//EXIT
//////////////////////////
setTimeout(()=>{
  console.log("Hello world 2.");

  let index = 1;
  data.children.splice(index, 1);

  TreeExit(data);


}, 6000000);

//////////////////////////
//UPDATE
//////////////////////////
setTimeout(()=>{
  console.log("Hello world 3.");
  let index = 1;
  let newItem = { name: "Child XXX" }
  data.children[index] = newItem;

  TreeUpdate(data);

}, 9000000);










function TreeEnter(dataNodes){  
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
  selectedNode = d;
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

$(".zh-btn-delete-Node").click(function(e){
  console.log("clicked delete node: ")
  let nodeNameDelete = selectedNode.data.name
  deleteNodeByName(data, nodeNameDelete)
  TreeExit(data)

  traverseAndPrint(data)
});


$(".zh-btn-addnode-Node").click(function(e){
  console.log("clicked add node: ")
  let nodeNameDelete = selectedNode.data.name
  addNodeAsChild(data, nodeNameDelete, {name: "Added "+getRandomInt(100), children: []})
  TreeEnter(data)
  traverseAndPrint(data)
});

$(".zh-btn-update-Node").click(function(e){
  console.log("clicked add node: ")
  let nodeNameToUpdate = selectedNode.data.name
  changeNodeName(data, nodeNameToUpdate, "updated " + getRandomInt(100))
  TreeEnter(data)
  traverseAndPrint(data)  
});




function changeNodeName(root, currentNodeName, newName) {
  if (root.name === currentNodeName) {
    // Found the target node, change its name
    root.name = newName;
    return;
  }

  if (root.children) {
    // If the current node has children, recursively search within its subtree
    for (const child of root.children) {
      changeNodeName(child, currentNodeName, newName);
    }
  }
}


function deleteNodeByName(root, nodeNameToDelete) {
  root.children = root.children.filter((child) => {
    if (child.name === nodeNameToDelete) {
      return false; // Exclude the node with the specified name
    } else if (child.children) {
      // If the child has children, recursively delete within its subtree
      deleteNodeByName(child, nodeNameToDelete);
      return true;
    } else {
      return true; // Keep nodes without the specified name
    }
  });
}

function addNodeAsChild(root, parentNodeName, newNode) {
  if (root.name === parentNodeName) {
    // Found the target parent node, add the new node as its child
    if (!root.children) {
      root.children = [];
    }
    root.children.push(newNode);
    return;
  }

  if (root.children) {
    // If the current node has children, recursively search within its subtree
    for (const child of root.children) {
      addNodeAsChild(child, parentNodeName, newNode);
    }
  }
}


function traverseAndPrint(node, depth = 0) {
  console.log("  ".repeat(depth) + node.name);

  if (node.children) {
    node.children.forEach((child) => {
      traverseAndPrint(child, depth + 1);
    });
  }
}


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}



const zoom = d3.zoom().on("zoom", function (event) {
  svg.attr("transform", event.transform);
});

function zoomIn() {
  svg.transition().duration(500).call(zoom.scaleBy, 1.2);
}

function zoomOut() {
  svg.transition().duration(500).call(zoom.scaleBy, 0.8);
}  

