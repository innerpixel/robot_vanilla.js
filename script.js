// Path: script.js

window.onload = function() {
    const canvas = document.getElementById('PNkCanvas');
    const ctx = canvas.getContext('2d'); // 2d context of the canvas
      
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const robotImages = [    
        bodyrobot = document.getElementById('bodyrobot').src,
        eye1 = document.getElementById('eye1').src,
        eye2 = document.getElementById('eye2').src,
        reflection = document.getElementById('reflection').src,
        detectorLight = document.getElementById('detectorLight').src,
        robotsprite = document.getElementById('robotsprite').src, 
        

    ] 
   
    class Robot {
        constructor(canvas, ctx, robotImages = []) {
            this.canvas = canvas;
            this.ctx = ctx;
            this.radius = 100;

            // position of the robot
            this.x = canvas.width / 2 * 1.5;   //   
            this.y = canvas.height / 2 * 1.3;
            this.angle = 0;
            

            // sprite of the robot
            this.spriteWidth = 370;
            this.spriteHeight = 393;
            this.frameX = 0;
            this.maxFrame = 75;

            // other robot options 
            this.maintenance = false ;
            this.speedOfTheRobot = 0.01 ;
            this.modes = ['maintenance', 'target']
            this.primaryTarget = {
                x: this.canvas.width / 2 , 
                y: this.canvas.height / 2
            }
            // mouse position and interactivity 
            this.mouse = {
                x: 0,
                y: 0
            }
            this.canvas.addEventListener('mousemove', (e) => {
                this.mouse.x = e.offsetX ;
                this.mouse.y = e.offsetY ;
                this.draw();
            }); 
            this.canvas.addEventListener('mouseleave', ()=>{
                this.scanning = true 
            })

            
            
        }
        
        draw() {
            ctx.clearRect(0,0, canvas.width, canvas.height);
            
            ctx.beginPath(); // robot body 
           

            this.bodyrobot = new Image();   
            this.bodyrobot.src = robotImages[0];            
            // ctx.drawImage(this.bodyrobot, this.x - this.bodyrobot.width * 0.5 + 65, this.y - this.bodyrobot.height * 0.5 - 53);
            

            this.robotsprite = new Image();
            this.robotsprite.src = robotImages[5];
            ctx.drawImage(this.robotsprite,this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x - this.bodyrobot.width * 0.5 + 65, this.y - this.bodyrobot.height * 0.5 - 53, this.spriteWidth, this.spriteHeight);   
            
            
            // inner eye 
            this.eye1 = new Image();
            this.eye1.src = robotImages[1];
            if(!this.draweyes){
            ctx.drawImage(this.eye1,this.x + Math.cos(this.angle) * this.eye1radius - this.eye1.width * 0.5, this.y + Math.sin(this.angle) * this.eye1radius - this.eye1.height * 0.5);    
            }
            this.eye2 = new Image();
            this.eye2.src = robotImages[2];
            if(!this.draweyes){
                ctx.drawImage(this.eye2,this.x + Math.cos(this.angle) * this.eye2radius - this.eye2.width * 0.5, this.y + Math.sin(this.angle) * this.eye2radius - this.eye2.height * 0.5);            
            }            
            // reflections image
            this.reflection = new Image();
            this.reflection.src = robotImages[3];
            ctx.drawImage(this.reflection,this.x - this.reflection.width * 0.5, this.y - this.reflection.height * 0.5);

            
            this.detectorLight = new Image();
            this.detectorLight.src = robotImages[4];
            if(this.maintenance){
                ctx.drawImage(this.detectorLight,this.x - this.detectorLight.width * 0.5, this.y - this.detectorLight.height * 0.5 + - 200 );
                this.draweyes = false ; 
            }
            
            ctx.closePath();
        }
        update() {

            // angle of eye of the robot
            const dx = this.mouse.x - this.x;
            const dy = this.mouse.y - this.y;
            this.angle = Math.atan2(dy, dx);
            const distance = Math.sqrt(dx * dx + dy * dy);


            // speed of the robot and behaviour 
            if(distance <= this.radius * 4 ){
                this.speedOfTheRobot -= 0.05 ;  
            }
            else{
                this.speedOfTheRobot +=  0.2
            }

            if (distance >= this.radius * 1.5 ) {
                this.eye1radius = this.radius *  0.4;       // larger eye
                this.eye2radius = this.radius *  0.6  ;  // smaller innet pupil eye 
                            
                this.eye1distance = this.eye1radius;
                this.eye2distance = this.eye2radius
    
               
                
                    // frames of the robotsprite
                    this.frameX >= this.maxFrame ? this.frameX = 0 : this.frameX++;

                    // movement of the robot
                    this.movementangle = Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x);
    
                    this.x += Math.cos(this.movementangle) * this.speedOfTheRobot;  // speed of the robot
                    this.y += Math.sin(this.movementangle) * this.speedOfTheRobot;  // speed of the robot
    
                    if (distance >= this.eye2distance * 2 ) {
                        // this.x += Math.cos(this.movementangle) * this.speedOfTheRobot * 5; // speed of the robot
                        // this.y += Math.sin(this.movementangle) * this.speedOfTheRobot * 5; // speed of the robot
                    }               
                    this.maintenance = false ; 
            }
            else{
            
                this.eye1radius = this.radius *  0.035;       // larger eye
                this.eye2radius = this.radius *  0.06     ;  // smaller innet pupil eye 
                            
                this.eye1distance = this.eye1radius;
                this.eye2distance = this.eye2radius
                
                if(distance * 2 === this.eye2radius ){
                    
                    this.movementangle = Math.atan2(this.mouse.y - this.y, this.mouse.x - this.x);
    
                    this.x += Math.cos(this.movementangle) * this.speedOfTheRobot;  // speed of the robot
                    this.y += Math.sin(this.movementangle) * this.speedOfTheRobot;  // speed of the robot
                }else{
                    // turn light off.
                    this.maintenance = true ; 
                    this.movementangle = Math.atan2(this.primaryTarget.y - this.y, this.primaryTarget.x - this.x);
    
                    this.x += Math.cos(this.movementangle) * this.speedOfTheRobot;  // speed of the robot
                    this.y += Math.sin(this.movementangle) * this.speedOfTheRobot;  // speed of the robot

                    this.eye1radius = this.radius *  -0.4;       // larger eye
                    this.eye2radius = this.radius *  -0.3     ;  // smaller innet pupil eye 
                    this.speedOfTheRobot = 0.01
                    
                
                }
                    
    
                    
    
            }                 

             

            this.draw();
        }
            
    }

    const robot = new Robot(canvas, ctx, robotImages);
    robot.draw();

    animate();
    function animate() {
        requestAnimationFrame(animate);
        robot.update();
    }
}
