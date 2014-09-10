Raphael.fn.connection = function (obj1, obj2, line, bg) {
    if (obj1.line && obj1.from && obj1.to) {
        line = obj1;
        obj1 = line.from;
        obj2 = line.to;
    }
    var p = [{x: obj1.attr("cx"), y: obj1.attr("cy")},
        {x: obj1.attr("cx"), y: obj1.attr("cy")},
        {x: obj1.attr("cx"), y: obj1.attr("cy")},
        {x: obj1.attr("cx"), y: obj1.attr("cy")},
        {x: obj2.attr("cx"), y: obj2.attr("cy")},
        {x: obj2.attr("cx"), y: obj2.attr("cy")},
        {x: obj2.attr("cx"), y: obj2.attr("cy")},
        {x: obj2.attr("cx"), y: obj2.attr("cy")}],
        d = {}, dis = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x),
                dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }
    if (dis.length == 0) {
        var res = [0, 4];
    } else {
        res = d[Math.min.apply(Math, dis)];
    }
    var x1 = p[res[0]].x,
        y1 = p[res[0]].y,
        x4 = p[res[1]].x,
        y4 = p[res[1]].y;
    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
    var path = ["M", x1.toFixed(3), y1.toFixed(3), "L", x4.toFixed(3), y4.toFixed(3)].join(",");
    if (line && line.line) {
        line.bg && line.bg.attr({path: path});
        line.line.attr({path: path});
    } else {
        return {
            bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
            line: this.path(path).attr({stroke: "#00f", fill: "none", "stroke-width": hslider.getVal(), "opacity": 0.2}),
            from: obj1,
            to: obj2
        };
    }
};

var el;
window.onload = function () {
  
    imgPath = "/assets/images/letters.jpg";

    var dragger = function () {
        this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
        this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
        this.animate({"fill-opacity": .2}, 500);
    },
        move = function (dx, dy) {
            var att = this.type == "rect" ? {x: this.ox + dx, y: this.oy + dy} : {cx: this.ox + dx, cy: this.oy + dy};
            this.attr(att);
            for (var i = overall_connections_arr.length; i--;) {
              for (var j = overall_connections_arr[i].length; j--;) {
                r.connection(overall_connections_arr[i][j]);
              }
            }
            r.safari();
            if (this.ox + dx >= width) {
              this.attr("cx", width);
            }
            if (this.ox + dx <= 0) {
              this.attr("cx", 0);
            }
            if (this.oy + dy >= height) {
              this.attr("cy", height);
            }
            if (this.oy + dy <= 0) {
              this.attr("cy", 0);
            }
        },
        up = function () {
            this.animate({"fill-opacity": 0.5}, 500);
            console.log(shapes[0].getBBox());
        },
        
        r = Raphael("holder", 800, 800);
        color = Raphael.getColor();

        var myImg = new Image;
        myImg.onload = function() {
          width = myImg.width;
          height = myImg.height;
          r.setSize(width + 250, height);
          //create the image with the obtained width and height:
          r.image(imgPath, 0, 0, width, height);
          
          // Define the function to create connected circles on clicks
          var clickCatcher = r.rect(0, 0, width, height);
          clickCatcher.attr("fill", Raphael.getColor());
          clickCatcher.attr("fill-opacity", 0.0);
          clickCatcher.click(function (e){
            var newShape = r.ellipse(e.x-10, e.y-50, 10, 10);
            newShape.attr({fill: color, stroke: color, "fill-opacity": 0.5, "stroke-width": 2, cursor: "move"});
            newShape.drag(move, dragger, up);
            shapes.push(newShape);
            if(shapes.length > 1) {
              connections.push(r.connection(shapes[shapes.length-2], shapes[shapes.length-1], "#000"));
              shapes[shapes.length-2].toFront();
            }
            newShape.toFront();
          })
          
          // Define the slider to get the height
          hslider = r.Slider(null,{x:width + 10,y:height - 10, val1:1, val2:200, initVal:30}); 
          var tr = r.TextBox({ 
          x:hslider.getX()-20, y:hslider.getY()-32, width:40, height:22, str:Math.round(hslider.getVal()), textAttrs:{'font-size':20}}); 
          hslider.onmove = function() { 
            tr.x=hslider.getX()-20; 
            tr.setStr(Math.round(hslider.getVal()));
            for (var i = 0, ii = connections.length; i < ii; i++) {
              connections[i].line.attr("stroke-width", hslider.getVal());
            } 
          }
          
          // Define the next button
          var nextButton = r.Button({x:width + 120, y:height - 150, str:'Next'});
          nextButton.onClick = function() {
            for (var j = connections.length; j--;) { // Change previous highlight to gray
              connections[j].line.attr("stroke", "#000");
            }
            currSet += 1;
            if (currSet < overall_shapes_arr.length) { // Navigating forward to existing set
              shapes = overall_shapes_arr[currSet];
              connections = overall_connections_arr[currSet];
              color = overall_color_arr[currSet];
            } else { // New set
              shapes = [];
              connections = [];
              color = Raphael.getColor();
              overall_shapes_arr.push(shapes); // Contents of overall set updated when modifying local sets
              overall_connections_arr.push(connections);
              overall_color_arr.push(color);
            }
            for (var j = connections.length; j--;) { // Change next highlight to blue
               connections[j].line.attr("stroke", "#00f");
             }
          }
          
          // Define the back button
          var backButton = r.Button({x:width + 10, y:height - 150, str:'Back'});
          backButton.onClick = function() {
            if (currSet != 0) {
              for (var j = connections.length; j--;) { // Change previous highlight to gray
                 connections[j].line.attr("stroke", "#000");
              }
              currSet -= 1;
              shapes = overall_shapes_arr[currSet];
              connections = overall_connections_arr[currSet];
              color = overall_color_arr[currSet];
              for (var j = connections.length; j--;) { // Change next highlight to blue
                 connections[j].line.attr("stroke", "#00f");
              }
            }
          }
          
          // Define the undo button
          var undoButton = r.Button({x:width + 60, y:height - 190, str:'Undo'});
          undoButton.onClick = function() {
            if (shapes.length > 0) {
              if (connections.length > 0) {
                connections.pop().line.remove();
              }
              shapes.pop().remove();
            }            
          }
          
          currSet = 0,
          overall_shapes_arr = [],
          overall_connections_arr = [],
          overall_color_arr = [],
          connections = [],
          shapes = [];
          // Add first set
          overall_shapes_arr.push(shapes);
          overall_connections_arr.push(connections);
          overall_color_arr.push(color);
        };
        myImg.src = imgPath;
        
};