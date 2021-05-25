//version 0.0.1
//author G.Mohan teja
//status : under devlopment
//dependencies : p5js
//code starts
//declaring gloabal variables//
//global variable to hold the chart image
let chart;
//global variable to hold the the 2nd canvas
let movetrail;
//varibale to hold quaterwave image
let qw;
//determining the the size of the image
size = 700;
//the buffer to work on actual required area on image
buffer = size * 55 / 700;
//size of the working area
s = size - 2 * buffer;
//values to store zn values globally
px = 0.0;
py = 0.0;
//boolean varibles to hold the initail conditions of the button
runquaterwave = false;
//setting up initial values
function setup() {
    //creating a canvas at windowwidth and window height
    cnv = createCanvas(windowWidth, windowHeight);
    //set the canvas position as 0,0 so that there are no margins on html or css affecting this
    cnv.position(0, 0, 'fixed');
    //cnv.style('cursor', 'none')//uncomment if u dont want a cursor to be displayed
    //loading images
    chart = loadImage('chart.svg');
    qw = loadImage('quaterwave.png');
    //creating inputs
    //real value input with default value of 10
    real_input = createInput("10");
    //at positin of image size +30 and 200 px
    real_input.position(size + 30, 200);
    //set the size to 35
    real_input.size(35);
    //if the input values are changed call a function called update
    real_input.changed(update);
    //imaginary value input with a default of 30
    img_input = createInput("30");
    //at position size+90 and 200
    img_input.position(size + 90, 200);
    //at size 35
    img_input.size(35);
    //call the function update on values change
    img_input.changed(update);
    //create another input to hold zo value with 50
    zo = createInput("50.0");
    //at position sixe +90 and 230
    zo.position(size + 90, 230);
    //at size 35
    zo.size(35);
    //when changed call the function update
    zo.changed(update);
    //call the function update to apply initial values
    update();
    //create a new graphics canvas to draw trials upon
    movetrail = createGraphics(windowWidth, windowHeight);
    //make it transparent
    movetrail.clear();
    //create a drop down menu
    sel = createSelect();
    //at this position
    sel.position(size + 190, 230);
    //with this option name
    sel.option("Quaterwave");
    //and when changed the function to call
    sel.changed(updatesel);
    //call the function to apply initial values given
    updatesel();
}
//update function called when ever a input value is changed 
function update() {
    //update the global zn values px and py from input values
    //note the input here is in form of string so we have to conver it to a float 
    //by using parse float
    px = parseFloat(real_input.value()) / parseFloat(zo.value())
    py = parseFloat(img_input.value()) / parseFloat(zo.value())
}
//function is runned when the selection is updated
function updatesel() {
    //if the selection is quaterwave then set bool run the quater wave to true
    if (sel.value() == "Quaterwave") {
        runquaterwave = true
    }
}
//this is where the actual front end happens
function draw() {
    //drawing the background as rgb 255,255,255 ie white
    background(255, 255, 255);
    //drawing the image on top of background
    image(chart, 0, 0, size, size);
    //set the stroke weight to 1
    strokeWeight(1);
    //text size to 20
    textSize(20);
    //set the fill color to black
    fill(0, 0, 0);
    //adding texts
    text("Zl -", size + 1, 220)
    text("Zo -", size + 55, 245)
    text("i", size + 140, 220)
    text("+", size + 75, 220)
    text("Zn - " + c_r(mouseX, mouseY, 1).toString() + " + (" + c_i(mouseX, mouseY, 1).toString() + ") i \n(from mouse location)", size + 10, 100)
        //if quater wave is selected run the quaterwave function
    if (runquaterwave) {
        quaterwave()
    }
}
// if the window is resized resize the canvas as well
// function windowResized() {
//     resizeCanvas(windowWidth, windowHeight);
//     movetrail.resize(windowWidth, windowHeight)
// }

//function to find length of a vector
function mod(arr) {
    return Math.sqrt(arr[0] ** 2 + arr[1] ** 2)
}

//funtion to find normalized dot of 2 vectors
function dotn(arr1, arr2) {
    return ((arr1[0] * arr2[0] + arr1[1] * arr2[1]) / (mod(arr1) * mod(arr2)))
}

function quaterwave() {
    strokeWeight(10);
    xx = s_c(px, py)
    point(xx[0], xx[1])
    abcd = [0, 0]
    abcd[0] = xx[0] - t(s / 2)
    abcd[1] = xx[1] - t(s / 2)
    pppp = [0, 0]
    pppp[0] = t(s) - t(s / 2)
    pppp[1] = 0
    length = Math.acos(dotn(abcd, pppp)) / (2 * Math.PI)
    noFill()
    strokeWeight(2)
    real(px)
    imaginary(py)
    kkkk = (find_real(px, py) * parseFloat(zo.value())) / (Math.sqrt(find_real(px, py)) * parseFloat(zo.value()))
    move_r(kkkk, 0, find_real(px, py))
    l = find_real(kkkk, 0, -1)
    move_r(l, 0, 1, 0.001, false)
    image(movetrail, 0, 0)
    textSize(20);
    strokeWeight(1);
    length = Math.round(length * 100 * 0.5) / 100
    if (py < 0) {
        length = 0.5 - Math.round(length * 100 * 0.5) / 100
    }
    text("L = " + length.toString() + " λ", size + 55, 275)
    image(qw, size + 10, 285)
    textSize(15)
    text("First plot Zn in smith chart u find Zn by dividing Zl by Z0\nie  Zn = " +
        real_input.value() + " + " + img_input.value() + " i" + " / " + zo.value() +
        " = " + px.toString() + " + " + py.toString() +
        " i\n" + "with 1+0 i on smith chart as center and from there Zn as radius draw a circle \n" +
        "move clock wise on that circle until u reach the real line and then mark that point as re then\n" +
        "find vswr(new Zo = sqrt(Zin*Zo) ie sqrt((Zo*re)*Zo) normalize Zin = (old Zo)*re with new Zo to get vswr)\nof quater wave transformer and move to that point from there do a quater wave\n" +
        "transfrom to reach real axis again from there u can reach 1+0j" +
        "to find length draw a line from center(1+0j) to outside circle and find the length differnce from to 0.25 λ to get l", size + 55, 485)
}

function t(x) {
    return x + buffer
}



function real(rr) {
    d = s / (1 + rr)
    stroke(0, 0, 0, 200)
    ellipse(t(s) - d / 2, t(s / 2), d, d)
}

function imaginary(rr) {
    stroke(0, 0, 0, 200)
    if (rr != 0) {
        d = s / (rr)
        ellipse(t(s), t(s / 2) - d / 2, Math.abs(d), Math.abs(d))
    }
    if (rr == 0) {
        line(t(0), t(s / 2), t(s), t(s / 2))
    }
}

function test(x, y) {
    if ((x - (buffer + s / 2)) ** 2 + (y - (buffer + s / 2)) ** 2 < (s / 2) ** 2) {
        return true
    }
    return false
}

function c_r(x, y, p = 2) {
    if (test(x, y) == true) {
        k = buffer + s;
        l = buffer + s / 2;
        xx = (x - k) ** 2
        yy = (y - l) ** 2
        r = Math.abs((xx + yy) / (2 * (x - k)))
        rr = (s / (2 * r)) - 1
        return Math.round(rr * (10 ** p)) / (10 ** p)
    }
    return NaN
}

function c_i(x, y, p = 2) {
    if (test(x, y) == true) {
        if (y == buffer + s / 2) {
            return 0
        }
        if (y > buffer + s / 2) {
            k = buffer + s;
            l = buffer + s / 2;
            xx = (x - k) ** 2
            yy = (y - l) ** 2
            r = Math.abs((xx + yy) / (2 * (l - y)))
            rr = -(s / (2 * r))
            return Math.round(rr * (10 ** p)) / (10 ** p)
        }
        k = buffer + s;
        l = buffer + s / 2;
        xx = (x - k) ** 2
        yy = (y - l) ** 2
        r = Math.abs((xx + yy) / (2 * (y - l)))
        rr = (s / (2 * r))
        return Math.round(rr * (10 ** p)) / (10 ** p)
    }
    return NaN;
}

function s_c(r, i) {
    if (r != 0 && i != 0) {
        d1 = s / (1 + r)
        d2 = s / (i)
        r1 = d1 / 2
        r2 = d2 / 2
        crx = t(s) - r1;
        cry = t(s / 2)
        cix = t(s)
        ciy = t(s / 2) - r2
        return intersection(crx, cry, Math.abs(r1), cix, ciy, Math.abs(r2))
    } else if (r == 0) {
        crx = t(s / 2)
        cry = t(s / 2)
        d2 = s / (i)
        r2 = d2 / 2
        r1 = s / 2
        cix = t(s)
        ciy = t(s / 2) - r2
        return intersection(crx, cry, Math.abs(r1), cix, ciy, Math.abs(r2))
    } else if (i == 0) {
        d = s / (1 + r)
        x1 = (t(s) - d)
        y1 = t(s / 2)
        return [x1, y1]
    }
}


function intersection(x0, y0, r0, x1, y1, r1) {
    var a, dx, dy, d, h, rx, ry;
    var x2, y2;
    dx = x1 - x0;
    dy = y1 - y0;
    d = Math.sqrt((dy * dy) + (dx * dx));
    if (d > (r0 + r1)) {
        return false;
    }
    if (d < Math.abs(r0 - r1)) {
        return false;
    }
    a = ((r0 * r0) - (r1 * r1) + (d * d)) / (2.0 * d);
    x2 = x0 + (dx * a / d);
    y2 = y0 + (dy * a / d);
    h = Math.sqrt((r0 * r0) - (a * a));
    rx = -dy * (h / d);
    ry = dx * (h / d);
    var xi = x2 + rx;
    var xi_prime = x2 - rx;
    var yi = y2 + ry;
    var yi_prime = y2 - ry;
    if (Math.round(xi) == 645) {
        return [xi_prime, yi_prime];
    } else {
        return [xi, yi]
    }
}

// function mouseClicked() {
//     console.log(mouseX, mouseY)
//         // prevent default
//     return false;
// }

function move_i(r, i, ni, sen = 0.001, clear = true) {
    movetrail.clear()
    for (k = i; k < ni; k += sen) {
        kk = s_c(r, k)
        movetrail.strokeWeight(3)
        movetrail.fill(0, 0, 0)
        movetrail.point(kk[0], kk[1])
    }

}

function move_r(r, i, nr, sen = 0.001, clear = true) {
    if (clear) {
        movetrail.clear()
    }
    for (k = r; k < nr; k += sen) {
        kk = s_c(k, i)
        movetrail.strokeWeight(5)
        movetrail.fill(0, 0, 0)
        movetrail.point(kk[0], kk[1])
    }

}

function find_real(r, i, k = 1) {
    kk = s_c(r, i)
    r = Math.sqrt((kk[0] - t(s / 2)) ** 2 + (kk[1] - t(s / 2)) ** 2)
    noFill()
    strokeWeight(2)
    stroke(255, 0, 0)
    ellipse(t(s / 2), t(s / 2), 2 * r)
    stroke(0, 0, 0)
    fill(0)
    strokeWeight(10)
    point(t(s / 2) + k * r, t(s / 2))
    return c_r(t(s / 2) + k * r, t(s / 2))
}
