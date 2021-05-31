  const SCROLL_SPEED = 0.3;
  const NOISE_SPEED = 0.004;
  const NOISE_AMOUNT = 5;
  const CANVAS_WIDTH = 1400;

  const bubblesEl = document.querySelector('.bubbles');
  const bubbleSpecs = [
    { s: .3, x: 354, y: 45, z:"https://medium.com/atanetwork/witness-is-now-live-on-ethereum-and-bsc-2b0f61a6eb69" }, //BSC
    { s: .4, x: 620, y: 21, z:"https://medium.com/atanetwork/our-partnership-with-crust-c7edeb501998" }, //Crust 
    { s: .4, x: 81, y: 72, z:"https://medium.com/atanetwork/our-partnership-with-clover-finance-7494f3402a6d" }, //Clover
    { s: .3, x: 1259, y: 79, z:"https://medium.com/atanetwork/our-partnership-with-celer-network-65b436e8a47c" },
    { s: .3, x: 224, y: 0, z:"https://medium.com/atanetwork/our-partnership-with-plasm-56605d6f2d16" }, //Plasm
    { s: .4, x: 971, y: 56, z:"https://medium.com/atanetwork/our-partnership-with-mathwallet-5fd7fe7255d6" }, //MathWallet
    { s: .7, x: 795,  y: 26, z:"https://medium.com/atanetwork/witness-is-now-live-on-ethereum-and-bsc-2b0f61a6eb69" }, //BSC
    { s: .6, x: 1134, y: 45, z:"https://medium.com/atanetwork/our-partnership-with-bounce-17a2fe3cd352" }, //Bounce
    { s: .7, x: 470, y: 1, z:"https://youtu.be/SIRdyYz-vxM" }  //Polkadot
    // Can Append Same Format Here
  ];

  class Bubbles {
    constructor(specs) {
      this.bubbles = [];

      specs.forEach((spec, index) => {
        this.bubbles.push(new Bubble(index, spec));
      })
      
      requestAnimationFrame(this.update.bind(this));
    }
    
    update() {
      this.bubbles.forEach(bubble => bubble.update());
      this.raf = requestAnimationFrame(this.update.bind(this))
    }  
  }


  class Bubble {
    constructor(index, {x, y, s = 1, z=""}) {
      this.index = index;
      this.x = x;
      this.y = y;
      this.scale = s;
      this.z = z;

      this.noiseSeedX = Math.floor(Math.random() * 64000);
      this.noiseSeedY = Math.floor(Math.random() * 64000);
        
      this.el = document.createElement("a");
      this.el.href= z ;
      this.el.target="_blank";
      this.el.className = `bubble logo${this.index + 1}`;
      bubblesEl.appendChild(this.el);
    }
    
    update() {
      this.noiseSeedX += NOISE_SPEED;
      this.noiseSeedY += NOISE_SPEED;
      let randomX = noise.simplex2(this.noiseSeedX, 0);
      let randomY = noise.simplex2(this.noiseSeedY, 0);
       
      this.x -= SCROLL_SPEED;
      this.xWithNoise = this.x + (randomX * NOISE_AMOUNT);
      this.yWithNoise = this.y + (randomY * NOISE_AMOUNT)
      
      if (this.x <  -200) {
        this.x = CANVAS_WIDTH;
      }
      
      this.el.style.transform = `translate(${this.xWithNoise}px, ${this.yWithNoise}px) scale(${this.scale})`;
    }
  }

  // For perlin noise
  noise.seed(Math.floor(Math.random() * 64000));

  const bubbles = new Bubbles(bubbleSpecs);
