// --- whatch these tutorals as reference ---
//https://www.youtube.com/watch?v=ZOeWdkq-L90
//https://www.youtube.com/watch?v=AYPTVwRaYiI
//https://www.youtube.com/watch?v=gKl7KJSwSQw
//https://www.youtube.com/watch?v=PNzbk0M_woQ



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
  const width = 800;
  const height = 400;
  
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
  
  // Create nodes (circles) for the tree
  const nodes = svg
    .selectAll("circle")
    .data(root.descendants())
    .enter()
    .append("circle")
    .attr("cx", (d) => {
      var resp = d.x;
      return resp;
    })
    .attr("class", "wpnode")
    .attr("cy", (d) => {return d.y;})
    .attr("r", 10)
    .on("click", clicked)
    .attr("data-id", (d)=>{return d.data.name;});
  
  // Create lines for the links
  svg
    .selectAll("path")
    .data(links)
    .enter()
    .append("path")
    .attr("d", (d) => {
      return `M${d.source.x},${d.source.y} L${d.target.x},${d.target.y}`;
    });
  
  // Add labels to the nodes
  svg
    .selectAll("text")
    .data(root.descendants())
    .enter()
    .append("text")
    .text((d) => d.data.name)
    .attr("x", (d) => d.x)
    .attr("y", (d) => d.y - 20)
    .attr("text-anchor", "middle");
  


//////////////////////////
//ENTER
//////////////////////////
setTimeout(()=>{
  // alert("Hello worldd");
  console.log("Hello world 1.");

  // data.children[0].children.push({ name: "Child 3" });
  data.children[0].children.push({ name: "Child 3" });
  data.children.push({ name: "Child 4" });
  data.children.push({ name: "Child 5" });
  data.children.push({ name: "Child 6" });

  const root = d3.hierarchy(data);
  tree(root);
  
  //NODES
  nodes
    .data(root.descendants())
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y);  

  svg
    .selectAll("circle")
    .data(root.descendants())
    .enter()
    .append("circle")
      .attr("cx", (d) => {
        var resp = d.x;
        return resp;
      })
      .attr("class", "wpnode")
      .attr("cy", (d) => {return d.y;})
      .attr("r", 10)
      .on("click", clicked)
      .attr("data-id", (d)=>{return d.data.name;});

  //LINKS
  svg.selectAll("path").remove();
  svg
    .selectAll("path")
    .data(root.links())
    .enter()
    .append("path")
      .attr("d", (d) => {
        return `M${d.source.x},${d.source.y} L${d.target.x},${d.target.y}`;
      });    

  //TEXT
  svg.selectAll("text").remove();
  svg
    .selectAll("text")
    .data(root.descendants())
    .enter()
    .append("text")
      .text((d) => d.data.name)
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y - 20)
      .attr("text-anchor", "middle");




}, 2000);


//////////////////////////
//EXIT
//////////////////////////
setTimeout(()=>{
  console.log("Hello world 2.");

  let index = 1;
  data.children.splice(index, 1);

  const root = d3.hierarchy(data);
  tree(root);

  //NODES
  nodes
    .data(root.descendants())
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y);  

    svg.selectAll("circle").remove();
    svg
    .selectAll("circle")
    .data(root.descendants())
    .enter()
    .append("circle")
      .attr("cx", (d) => {
        var resp = d.x;
        return resp;
      })
      .attr("class", "wpnode")
      .on("click", clicked)
      .attr("cy", (d) => {return d.y;})
      .attr("r", 10)
      .attr("data-id", (d)=>{return d.data.name;});

  //LINKS
  svg.selectAll("path").remove();
  svg
    .selectAll("path")
    .data(root.links())
    .enter()
    .append("path")
      .attr("d", (d) => {
        return `M${d.source.x},${d.source.y} L${d.target.x},${d.target.y}`;
      });    

  //TEXT
  svg.selectAll("text").remove();
  svg
    .selectAll("text")
    .data(root.descendants())
    .enter()
    .append("text")
      .text((d) => d.data.name)
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y - 20)
      .attr("text-anchor", "middle");


}, 4000);




//////////////////////////
//UPDATE
//////////////////////////
setTimeout(()=>{
  console.log("Hello world 3.");
  let index = 1;
  let newItem = { name: "Child XXX" }
  data.children[index] = newItem;

  const root = d3.hierarchy(data);
  tree(root);

  //NODES
  nodes
    .data(root.descendants())
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y);  

    //svg.selectAll("circle").remove();
    svg
    .selectAll("circle")
    .data(root.descendants())
    //.exit()
    .enter()
    .append("circle")
      .attr("cx", (d) => {
        var resp = d.x;
        return resp;
      })
      .attr("cy", (d) => {return d.y;})
      .attr("r", 10)
      .attr("class", "wpnode")
      .on("click", clicked)
      .attr("data-id", (d)=>{return d.data.name;});

  //LINKS
  svg.selectAll("path").remove();
  svg
    .selectAll("path")
    .data(root.links())
    .enter()
    .append("path")
      .attr("d", (d) => {
        return `M${d.source.x},${d.source.y} L${d.target.x},${d.target.y}`;
      });    

  //TEXT
  svg.selectAll("text").remove();
  svg
    .selectAll("text")
    .data(root.descendants())
    .enter()
    .append("text")
      .text((d) => d.data.name)
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y - 20)
      .attr("text-anchor", "middle");  

}, 6000);

$(".wpnode").click(function(e){
  //your logic on click
  console.log("clicked wpnode");
  console.log(e);
})


function clicked(e, d) {
  console.log("ON clicked");
  console.log(e);
  console.log(d);
}