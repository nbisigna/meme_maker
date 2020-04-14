let ctx = document.getElementById('canvas').getContext('2d');
var title = '';
var h = 0;
var w = 300;
var x = 0;
var y = 300;

function download() {
  let png = document.getElementById('canvas').toDataURL('image/png');
  let link = document.createElement('a');
  link.setAttribute('href', png);
  link.download = 'meme';
  let event = new MouseEvent('click');
  link.dispatchEvent(event);
}

function upload(e) {
  var files = e.target.files;
  var image = files[0];
  var itype = image['type'];
  if (itype.split('/')[0] === 'image') {
    var img = new Image();

    img.src = URL.createObjectURL(image);
    img.onload = function () {
      var ratio = img.height / img.width;
      if (ratio > 0.66) {
        h = 200;
        y = 100;
        w = ratio * h;
        x = (300 - w) / 2;
      } else {
        h = ratio * 300;
        y = 300 - h;
        w = 300;
        x = 0;
      }
      ctx.clearRect(0, 0, 300, 300);
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, 300, 300);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(300, y);
      ctx.stroke();
      ctx.drawImage(img, x, y, w, h);
      draw();
    };
  }
}

function draw() {
  ctx.clearRect(0, 0, 300, y);
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 300, y);
  ctx.font = '24px Neue Helvetica';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  var chunks = title.match(/.{1,30}/g);
  if (!chunks) return;
  for (var i = 0; i < chunks.length; i++)
    ctx.fillText(
      chunks[i],
      150,
      y / 2 - (chunks.length - 1) * 10 + i * 24,
      292
    );
}

function caption(e) {
  title = e.target.value;
  draw();
}
