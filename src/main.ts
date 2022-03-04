import './style.css';

const app = document.querySelector<HTMLDivElement>('#app')!;

let delayInMilliseconds = 1000; //1 second
let form = document.querySelector('form')!;
let input = document.getElementById('inputURL')!;
function domAnimation() {
  for (let index = 0; index < 10; index++) {
    setTimeout(function () {
      let title = document.createElement('button');
      title.innerText = 'hello';
      title.style = 'width: 100px';
      app.appendChild(title);
    }, delayInMilliseconds * index);
  }
}

form.onsubmit = (e) => {
  e.preventDefault();
  console.log(input.value);
  buildDom(exampleHTML);
};

let exampleHTML =
  '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport"content="width=device-width, initial-scale=1.0"><title>Document</title></head><body>Hello World</body></html>';

function buildDom(rawHTML: string) {
  let htmlElements = rawHTML.split('>');
  for (let i = 0; i < htmlElements.length; i++) {
    console.log(htmlElements[i]);
    for (let j = 0; j < htmlElements[i].length; j++) {}
  }
}
app.innerHTML = `
 
`;
