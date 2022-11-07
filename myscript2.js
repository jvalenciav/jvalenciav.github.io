class Heart {
    constructor(id) {
      const heart = document.getElementById(id);
      const text = heart.querySelector('.heart-text');
      const sayings = [
      'Eres Preciosa',
      'Eres la mas pro',
      'Diosaaaaaaaa',
      'Eres un 100 :3',
           'Te amito',
                'Te adoro',

'Mi Fer :3',
      'Mi Reyna',
      'Me encantas',
      'Nos casamos?',
      'Te amo',
      'Tu&Yo-Que rico',
      'Bellaa',
      'Princesaaa',
      'Mi bebita',
      'Mi ruca',
      'Mi vieja',
      'Me encantas',
      'Orgulloso de ti',
      'Eres miaa,ok?',
      'Mi todo',
      'Mi paz ',
      'Mi Hogar'];
  
  
      heart.addEventListener('click', () => {
        this.addText(text, sayings);
      });
    }
  
    getText(sayings) {
      const selection = parseInt(Math.random() * sayings.length);
      return sayings[selection];
    }
  
    addText(container, sayings) {
      const str = this.getText(sayings);
      const words = str.split(' ');
  
      container.innerHTML = '';
  
      words.forEach(word => {
        const span = document.createElement('span');
        span.innerHTML = word;
        container.appendChild(span);
      });
  
      return container;
    }}
  
  
  const heartContainer = new Heart('heart-container');
