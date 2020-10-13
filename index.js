var express = require('express');
var app = express();

const config = {
    portServer: 8089
}	

var server = require('http').Server(app);

app.use(express.json())

app.post('/watchman', function (req, res) {
    let response = watchman(req.body);
    res.send(response.toString());
});  

app.post('/badlyOrderedPairs', function (req, res) {
    let response = badlyOrderedPairs(req.body.pairs);
    res.send(response.toString());
});  

app.post('/horse', function (req, res) {
    let response = horse(req.body);
    res.send(response.toString());
});  

server.listen(config.portServer, function () {
    console.log("Server running on port: ", config.portServer);
});

function watchman(body) {
    let array = new Array(body.m+1); 
    let response = 0;
    for (let i = 0; i < body.n; i++) {
        for (let j = body.a[i]; j <= body.b[i]; j++) {
            array[j] = '';           
        }
    }
    array.forEach(element => {
        if (element != null) {
            response++;
        }
    });
    return response;
}

function badlyOrderedPairs(pairs) {
    let cont = 0;
    for (let i = 0; i < pairs.length; i++) {
        for (let j = 0; j < pairs.length; j++) {
            if ((i < j) && (pairs[i] > pairs[j])) {
                cont++;
            }
        }
    }
    return cont;
}

function horse(body) {
    let a = body.a, b = body.b, c = body.c, d = body.d;
    let cDiffA = ((c-a)>0) ? (c-a) : ((c-a)*-1);
    let dDiffB = ((d-b)>0) ? (d-b) : ((d-b)*-1);
    let first = true;
    let cont = 0;
    let exit = false;
    do {
        if (cDiffA > dDiffB) {
            a += (a<c) ? 2 : -2; 
            b += (b<=d) ? 1 : -1;
        } else if (dDiffB > cDiffA) {
            a += (a<=c) ? 1 : -1; 
            b += (b<d) ? 2 : -2;
        } else {
            if (((a+1) == c) && ((b-1) == d)) {
                a += 2;
                b += 1;
            } else if (((a-1) == c) && ((b-1) == d)) {
                a += -2;
                b += 1;
            } else if (((a-1) == c) && ((b+1) == d)) {
                a += -2;
                b += -1;
            } else if (((a+1) == c) && ((b+1) == d)) {
                a += 2;
                b += -1;
            } else {
                a += (first) ? ((a<c) ? 1 : -1) : ((a<c) ? 2 : -2); 
                b += (first) ? ((b<d) ? 2 : -2) : ((b<d) ? 1 : -1);
            }
        }
        cDiffA = ((c-a)>0) ? (c-a) : ((c-a)*-1); 
        dDiffB = ((d-b)>0) ? (d-b) : ((d-b)*-1);
        first = !first;
        cont++;
        console.log(a + ',' + b);
        exit = ((a==c) && (b==d));
    } while (!exit);
    return cont;
}