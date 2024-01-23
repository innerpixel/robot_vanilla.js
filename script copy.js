// Path: script.js

window.onload = function() {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = 600;
    canvas.height = 600;

    // center the origin
    const offset = {
        x: canvas.width / 2, 
        y: canvas.height / 2 
    };
   
    const A  = {x: 0, y: 0};    
    const B  = {x: 90, y: 120};
    const C  = {x: B.x, y: 0};

    const c = distance(A,B)
    const a = distance(B,C)
    const b = distance(C,A)
    
    
    ctx.translate(offset.x, offset.y)

    update();
    
    document.addEventListener('mousemove', (e) => {
        // console.log(e);
        B.x = e.offsetX - offset.x;
        B.y = e.offsetY  - offset.y;
        C.x = B.x;
        update();
    })

    function distance(A, B) {
        return Math.sqrt((B.x - A.x)**2 + (B.y - A.y)**2);
    }

    function avarage(A, B) {
        return {
            x: (A.x + B.x) / 2,
            y: (A.y + B.y) / 2
        }
    }

    function update() {
        const c = distance(A,B)
        const a = distance(B,C)
        const b = distance(C,A)

        const sin = a / c ; 
        const cos = b / c ;
        const tan = a / b ;
        const theta = Math.asin(sin);

        
        const textleft1  = {x: -offset.x / 2, y: offset.y * 0.7 };
        const textleft2  = {x: -offset.x / 2, y: offset.y * 0.6 };
        const textleft3  = {x: -offset.x / 2, y: offset.y * 0.5 };

        const textright1  = {x: offset.x / 2, y: offset.y * 0.7 };
        // const textright2  = {x: offset.x / 2, y: offset.y * 0.7 };
        // const textright3  = {x: offset.x / 2, y: offset.y * 0.7 };
        
        
        ctx.clearRect(-offset.x, -offset.y, canvas.width, canvas.height);
        // drawCoordSystem( offset)
        
        drawText('sin(θ) a/c = ' + sin.toFixed(2), textleft3, 'red');
        drawText('cos(θ) b/c = ' + cos.toFixed(2), textleft2, 'blue');
        drawText('tan(θ) a/b = ' + tan.toFixed(2), textleft1, 'black');
        
        drawText("(θ) = " + theta.toFixed(2) + " (" + Math.round( toDeg(theta)) + ") ", textright1, 'blue');
        
     
        



        drawline(A, B, 'black');
        drawText('c', avarage(A,B), 'black');
        drawline(A, C, 'blue');
        drawText('b', avarage(A,C), 'blue');
        drawline(C, B);
        drawText('a', avarage(B, C ), 'red');

        drawText('θ', A, 'brown');

        ctx.beginPath();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;

        const start = B.x > A.x ? 0 : Math.PI;
        const clockwise = B.y < C.y ^ B.x>A.x;

        let end = B.y < C.y ? -theta : theta;

        if (B.x < A.x) {
            end = Math.PI - end ;
        }

        
        

        ctx.arc(0, 0, 20,start, end, !clockwise);
        ctx.stroke();
        ctx.closePath();


    }
       
    function toDeg( radians ) {
        return radians * (180 / Math.PI);
    }

    function drawText(text, loc, color='black') {
        ctx.fillStyle = color;
        ctx.strokeStyle = color
        ctx.textAlign = 'center';
        ctx.textbaseline = 'middle';
        ctx.font = 'bold 18px Courier';
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 7;
        ctx.strokeText(text, loc.x , loc.y);
        ctx.fillText(text, loc.x , loc.y);
        

    }

    function drawPoint(loc, color='red', size=5) {

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.strokeStyle = color ;
        ctx.arc(loc.x, loc.y, size, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        
    }

    function drawline(A, B, color = 'red') {
        ctx.beginPath();
        ctx.moveTo(A.x, A.y);
        ctx.lineTo(B.x, B.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.stroke();
    }
    function drawCoordSystem(offset){
        // draw coordinate lines 
            ctx.beginPath();
            ctx.moveTo(-offset.x, 0);
            ctx.lineTo(offset.x, 0);
            ctx.moveTo(0, -offset.y);
            ctx.lineTo(0, offset.y);    
            ctx.strokeStyle = 'gray';
            ctx.lineWidth = 2;
    
            ctx.stroke();
    }   

}