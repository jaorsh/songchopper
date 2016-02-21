  var output = [];
  var tracks = [];
  var loop = 0;
  var freq = [4, 8, 12, 16];
  var myAudio, ranAudio, bank;
  var soundBank = {
    a: [],
    as: [],
    b: [],
    c: [],
    cs: [],
    d: [],
    ds: [],
    e: [],
    f: [],
    fs: [],
    g: [],
    gs: []
  }

  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // files is a FileList of File objects. List some properties.
    console.log(files);

    for (var i = 0, f; f = files[i]; i++) {
      if (f.webkitRelativePath.startsWith('output/as')) {
        soundBank.as.push(f.webkitRelativePath);
      } else if (f.webkitRelativePath.startsWith('output/cs')) {
        soundBank.cs.push(f.webkitRelativePath);
      } else if (f.webkitRelativePath.startsWith('output/ds')) {
        soundBank.ds.push(f.webkitRelativePath);
      } else if (f.webkitRelativePath.startsWith('output/fs')) {
        soundBank.fs.push(f.webkitRelativePath);
      } else if (f.webkitRelativePath.startsWith('output/gs')) {
        soundBank.gs.push(f.webkitRelativePath);
      } else if (f.webkitRelativePath.startsWith('output/a')) {
        soundBank.a.push(f.webkitRelativePath);
      } else if (f.webkitRelativePath.startsWith('output/b')) {
        soundBank.b.push(f.webkitRelativePath);
      } else if (f.webkitRelativePath.startsWith('output/c')) {
        soundBank.c.push(f.webkitRelativePath);
      } else if (f.webkitRelativePath.startsWith('output/d')) {
        soundBank.d.push(f.webkitRelativePath);
      } else if (f.webkitRelativePath.startsWith('output/e')) {
        soundBank.e.push(f.webkitRelativePath);
      } else if (f.webkitRelativePath.startsWith('output/f')) {
        soundBank.f.push(f.webkitRelativePath);
      } else if (f.webkitRelativePath.startsWith('output/g')) {
        soundBank.g.push(f.webkitRelativePath);
      }
      tracks.push('<li><strong>', escape(f.name), '</strong> (', f.type ||
        'n/a',
        ') - ',
        f.size, ' bytes, last modified: ',
        f.lastModifiedDate ? f.lastModifiedDate.toLocaleDateString() : 'n/a',
        '</li>');
      output.push(f.name);
    }
    document.getElementById('list').innerHTML = '<ul>' + tracks.join('') +
      '</ul>';
  }

  document.getElementById('files').addEventListener('change', handleFileSelect,
    false);


  function init() {

    bank = soundBank[pickRandomProperty(soundBank)];
    var rand = bank[Math.floor(Math.random() * bank.length)];
    setInterval(function() {
      var a = new Audio("../" + rand);
      a.play();

    }, 500);

  }

  function addSample() {
    var rand = output[Math.floor(Math.random() * output.length)];
    ranAudio = new Audio("../input/" + rand);
    ranAudio.play();
  }

  function stop() {

    myAudio.pause();
    ranAudio.pause();
    bank.pause();

  }

  function loadSample(note) {
    var bank = soundBank[note];
    if (bank) {

      var start = function(counter) {
        if (counter < bank.length) {
          setTimeout(function() {
            counter++;
            var b = bank[counter];
            ranAudio = new Audio("../" + b);
            ranAudio.play();

            start(counter);
          }, 200);
        }
      }
      start(0);

    }
    /*var rand = bank[Math.floor(Math.random() * bank.length)];
    ranAudio = new Audio("../" + rand);

    var pGo = setInterval(function() {

      var rand = bank[Math.floor(Math.random() * bank.length)];
      ranAudio = new Audio("../" + rand);
      ranAudio.play();

    }, 500);



    ranAudio.play();*/

  }



  function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
      if (Math.random() < 1 / ++count)
        result = prop;
    return result;
  }


  /*

  myAudio = new Audio("../input/" +
    output[0]);

  myAudio.addEventListener('ended', function() {
    loop++;
    if (loop % 4 === 0) {
      addSample();
    }
    this.currentTime = 0;
    this.play();
  }, false);

  myAudio.play();

  */
