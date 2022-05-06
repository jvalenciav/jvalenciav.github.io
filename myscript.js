class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = "!<>-_\\/[]{}—=+*^?#________";
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => (this.resolve = resolve));

    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || "";
      const to = newText[i] || "";
      const start = Math.floor(Math.random() * 60);
      const end = Math.floor(Math.random() * 60) + start;
      this.queue.push({ from, to, start, end });
    }

    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = "";
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 1.00) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class='dud'>${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const phrases = [
  "Te quiero porque eres la novia mas preciosa del mundo",
  "Te quiero pprqie eres la chica mas valiente del mundo",
  "Te quiero porque JAMAS te rindes",
  "Te quiero porque me motivas",
  "Te quiero porque eres simplemente magnifica",
  "Te quiero porque nunca habia sentido esto por nadie",
  "Te quiero porque te has convertido en lo mas especial para mi",
  "Te quiero porque contigo todo es mejor",
  "Te quiero porque me siento bien a tu lado",
  "Te quiero porque contigo puedo ser yo mismo",
  "Te quiero porque te admiro",
  "Te quiero porque puedo contarte cualquier cosa",
  "Te quiero porque me apoyas en todo momento",
  "Te quiero porque veo un futuro a tu lado",
  "Te quiero porque me complementas",
  "Te quiero porque te preocupas por mí",
  "Te quiero porque eres apasionada",
  "Te quiero porque me haces ser mejor persona",
  "Te quiero porque eres lo primero que pienso en las mañanas",
  "Te quiero porque juntos somos invencibles",
  "Te quiero porque me siento bien a tu lado",
  "Te quiero porque no me imagino en estos momentos sin ti",
  "Te quiero de una manera que no te lo imaginas",
  "Te quiero porque apesar de todo NO TE RINDES",
  "Te quiero porque eres admirable",
  "No sabes lo especial que eres para mi",
  "Te quiero porque nunca habia sentido esto por nadie",
  "Te quiero por todo lo que provocas en mi "
  
  
];

const el = document.querySelector(".text");
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 1100);
  });
  counter = (counter + 1) % phrases.length;
};

next();
