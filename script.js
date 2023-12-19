var pling = new Audio('snd_pling.m4a');
pling.loop = false;

var swearlength = document.getElementById("wordamount");
var warning = document.getElementById("warn");
swearlength.onchange = ({target}) => {
  let value = parseInt(target.value);
  if(!value || value === NaN || value <= 0){
    target.value = "2"
  }else if(value > 999) target.value = "999";
}

var container = document.getElementById("swear-container");
var segments = ["bub", " clungo ", "kus ", "key ", "shrim", "gus ", "fun", "bun", "plum", "dim", "winkle ", "pito ", "bim", "flum", " bibflam ", " flumflam ", " glockenspiel ", " winkleflam ", "dinkle", "shrinkle", "ton ", "gub ", "glub", "shrub", "gub", "zim ", "ular ", "fling", "go ", "shmumb", "bum", "winkle", "waddle ", ""];
function generate(clear){
  var playSound = false;
  var length = parseInt(swearlength.value);
  if(length && length !== NaN && length > 0){
    var product = "";
    warn.hidden = true;
    for(let generated = 0; generated < 10; generated++){
      let current = "";
      assemble: for(let i = 0; i<length; i++){
        let word = ""
        makeWord: { //lel
          //looking for first syllable/part
          while(true){
            let part = chooseSegment();
            if(word.trim().endsWith(part.trim()) || current.trim().endsWith(part.trim())) continue;
            if(part.startsWith(" ") && part.endsWith(" ")){
              if(product.includes(part.trim())) continue;
              word = part.trim();
              break makeWord;
            }else if(part.endsWith(" ")) continue;
            else{
              word = part;
              break;
            }
          }
          //looking for second syllable/part
          while(true){
            let part2 = chooseSegment();
            if(part2.startsWith(" ")) continue;
            if(part2.endsWith(" ")){
              word = word + part2.trim();
              break;
            }
          }
        }
        current += " " + (word === "bubkey" ? "<strong>" + word.trim() + "</strong>" : word.trim());
        if(word === "bubkey") playSound = true;
      }
      current = current.trim();
      product += generated == 0 ? current : (length >= 15 ? "<br><br>" + current : "<br>" + current);
    }
    if(clear){
      container.innerHTML = product;
    }else {
      container.innerHTML = container.innerHTML + product;
    }
    container.hidden = false;
    if(playSound && Math.random() < 0.1) pling.play();
  }else{
    warning.hidden = false;
  }
}

function chooseSegment(){
  return segments[Math.floor(Math.random() * segments.length)]
}