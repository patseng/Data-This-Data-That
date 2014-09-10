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
        var color = typeof line == "string" ? line : "#000";
        return {
            bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
            line: this.path(path).attr({stroke: color, fill: "none"}),
            from: obj1,
            to: obj2
        };
    }
};

var el;
window.onload = function () {
  
    imgPath = document.getElementById("holder").className;
    multiple = document.getElementById("holder").title == "multiple";

    var dragger = function () {
        this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
        this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
        this.animate({"fill-opacity": .2}, 500);
    },
        move = function (dx, dy) {
            var att = this.type == "rect" ? {x: this.ox + dx, y: this.oy + dy} : {cx: this.ox + dx, cy: this.oy + dy};
            this.attr(att);
            if (!multiple) {
              for (var i = connections.length; i--;) {
                  r.connection(connections[i]);
              }
            } else {
              for (var i = overall_connections_arr.length; i--;) {
                for (var j = overall_connections_arr[i].length; j--;) {
                  r.connection(overall_connections_arr[i][j]);
                }
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

        var myImg = new Image;
        myImg.onload = function() {
          width = myImg.width;
          height = myImg.height;
          r.setSize(width + 200, height);
          //create the image with the obtained width and height:
          r.image(imgPath, 0, 0, width, height);
          
             connections = [],
              shapes = [  r.circle(190, 100, 20),
                          r.circle(300, 100, 20),
                          r.circle(300, 300, 20),
                          r.circle(190, 300, 20)
                      ];
                      
          var color = Raphael.getColor();
          for (var i = 0, ii = shapes.length; i < ii; i++) {
              shapes[i].attr({fill: color, stroke: color, "fill-opacity": 0.5, "stroke-width": 2, cursor: "move"});
              shapes[i].drag(move, dragger, up);
          }
          connections.push(r.connection(shapes[0], shapes[1], "#000"));
          connections.push(r.connection(shapes[1], shapes[2], "#000"));
          connections.push(r.connection(shapes[2], shapes[3], "#000"));
          connections.push(r.connection(shapes[3], shapes[0], "#000"));
          
          // Add title="multiple"
          if (multiple) {
            overall_shapes_arr = [];
            overall_connections_arr = [];
            overall_shapes_arr.push(shapes);
            overall_connections_arr.push(connections);
            
            // Define the New button
            var newButton = r.Button({x:width+50, y:height/2, str:'New'});
            newButton.onClick = function() {
              connections = [],
              shapes = [    r.circle(190, 100, 20),
                            r.circle(300, 100, 20),
                            r.circle(300, 300, 20),
                            r.circle(190, 300, 20)
                        ];

              var color = Raphael.getColor();
              for (var i = 0, ii = shapes.length; i < ii; i++) {
                  shapes[i].attr({fill: color, stroke: color, "fill-opacity": 0.5, "stroke-width": 2, cursor: "move"});
                  shapes[i].drag(move, dragger, up);
              }
              connections.push(r.connection(shapes[0], shapes[1], "#000"));
              connections.push(r.connection(shapes[1], shapes[2], "#000"));
              connections.push(r.connection(shapes[2], shapes[3], "#000"));
              connections.push(r.connection(shapes[3], shapes[0], "#000"));
              overall_connections_arr.push(connections);
              overall_shapes_arr.push(shapes);
            } // End newButton.onClick
            
            // Define the Remove Last button
            var removeButton = r.Button({x:width+50, y:height/2 + 40, str:'Remove'});
            removeButton.onClick = function() {
              if (overall_shapes_arr.length > 0) {
                toRemoveShapes = overall_shapes_arr.pop();
                for (var i = 0; i < toRemoveShapes.length; i++) {
                  toRemoveShapes[i].remove();
                }
                toRemoveConnections = overall_connections_arr.pop();
                for (var i = 0; i < toRemoveConnections.length; i++) {
                  toRemoveConnections[i].line.remove();
                }
              }
            }
            
          } // End multiple
        }
        myImg.src = imgPath;
        
};
