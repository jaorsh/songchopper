  var output = [];
  var tracks = [];
  var loop = 0;
  var freq = [4, 8, 12, 16];
  var myAudio;
  var ranAudio;
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
      if (f.webkitRelativePath.startsWith('input/as')) {
        soundBank.as.push(f.webkitRelativePath);
      } else if (f.webkitRelativePath.startsWith('input/cs')) {
        soundBank.cs.push(f.webkitRelativePath);
      } else if (f.webkitRelativePath.startsWith('input/ds')) {
        soundBank.ds.push(f.webkitRelativePath);
      } else if (f.webkitRelativePath.startsWith('input/fs')) {
        soundBank.fs.push(f.webkitRelativePath);
      } else if (f.webkitRelativePath.startsWith('input/gs')) {
        soundBank.gs.push(f.webkitRelativePath);
      } else if (f.webkitRelativePath.startsWith('input/a')) {
        soundBank.a.push(f.webkitRelativePath);
      } else if (f.webkitRelativePath.startsWith('input/b')) {
        soundBank.b.push(f.webkitRelativePath);
      } else if (f.webkitRelativePath.startsWith('input/c')) {
        soundBank.c.push(f.webkitRelativePath);
      } else if (f.webkitRelativePath.startsWith('input/d')) {
        soundBank.d.push(f.webkitRelativePath);
      } else if (f.webkitRelativePath.startsWith('input/e')) {
        soundBank.e.push(f.webkitRelativePath);
      } else if (f.webkitRelativePath.startsWith('input/f')) {
        soundBank.f.push(f.webkitRelativePath);
      } else if (f.webkitRelativePath.startsWith('input/g')) {
        soundBank.a.push(g.webkitRelativePath);
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

  }

  function addSample() {
    var rand = output[Math.floor(Math.random() * output.length)];
    ranAudio = new Audio("../input/" + rand);
    ranAudio.play();
  }

  function stop() {

    myAudio.pause();
    ranAudio.pause();

  }

  function loadSample(note) {
    console.log(note);
    var bank = soundBank[note];
    if (bank) {
      for (var i = 0; i < bank.length; i++) {
        var rand = bank[Math.floor(Math.random() * bank.length)];
        ranAudio = new Audio("../" + rand);
        ranAudio.play();
      }
    }



  }
