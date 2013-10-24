const doc = document;

doc.onreadystatechange = function() {

  if (doc.readyState === 'complete') {

    var c = 0;
    var spans = [];

    const targ = doc.getElementsByClassName('c')[0];
    const pøem = [
        '“Thrøugh the darkness øƒ ƒuture past,'
      , 'The magician løngs tø see…'
      , 'Ønce chants øut between twø wørlds:'
      , 'ƒire, walk with me.”'
    ];

    const randPos = function() {
      const min = -2000;
      const max = 2000;
      return Math.round( Math.random() * ( max - min + 1 ) + min );
    }

    const setup = function() {
      pøem.forEach(function(p,i) {
        const div = doc.createElement('div');
        p.split(' ').forEach(function(item,j) {
          const span = doc.createElement('span');
          spans.push(span);
          const txt = doc.createTextNode(item);
          
          span.style.left = Math.floor(Math.random()*randPos())+'px';
          span.style.top = Math.floor(Math.random()*randPos())+'px';
          span.appendChild(txt);
          
          div.appendChild(span);
        });
        targ.appendChild(div);
      });

      animate();

      setTimeout(function() {
        const fire = doc.createElement('audio');
        fire.setAttribute('src', 'audio/fire.ogg');
        fire.play();
        fire.addEventListener('ended', function() {
          targ.style.opacity = 0;
          setTimeout(function() {
            const body = doc.body;
            const scream = doc.createElement('audio');
            scream.setAttribute('src', 'audio/scream.ogg');
            scream.setAttribute('loop', 'true');
            scream.play();
            body.style.backgroundImage = 'url(img/bob.gif)';
          }, 2000);
        });
      }, 2000);
    }
    
    const animate = function() {
      spans[c].style.left = spans[c].style.top = 0;
      spans[c].style.opacity = 1;
      c++;
      if( c < spans.length ) {
        requestAnimFrame(animate);
      }
    }

    window.requestAnimFrame = (function(window) {
      var suffix = 'equestAnimationFrame',
        rAF = ['r', 'webkitR', 'mozR', 'msR', 'oR'].filter(function(val) {
          return val + suffix in window;
        })[0] + suffix;

      return window[rAF]  || function(callback) {
        window.setTimeout(function() {
          callback(+new Date());
        }, 1000 / 60);
      };
    })(window);
    
    setup();
  }
}
