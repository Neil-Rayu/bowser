import './style.css';
import type { htmlNode } from './types';

const app = document.querySelector<HTMLDivElement>('#app')!;
const domTree = document.querySelector('#dom-tree')!;
console.log(domTree);

let userUrl: string;
let delayInMilliseconds = 1000; //1 second
const form = document.querySelector<HTMLFormElement>('form')!;
const input = document.querySelector<HTMLInputElement>('#inputURL')!;
function domAnimation() {
  for (let index = 0; index < 10; index++) {
    setTimeout(function () {
      let title = document.createElement('button');
      title.innerText = 'hello';
      title.style.setProperty('width', '100px');
      app.appendChild(title);
    }, delayInMilliseconds * index);
  }
}

form.onsubmit = (e) => {
  e.preventDefault();
  userUrl = input.value;
  buildDom(htmlElements);
};

//Test HTML will be replaced by function that dynamically fetches HTML
//PRE-Process: trim end and remove first two tags (Doctype, lang = "en") and last (/html)
//Todo: add in inside tag style (i.e style = "width: 100px;")

let exampleHTML =
  '<head><title>Document</title></head><body><span>Hello World</span></body></html';

function htmlParser(html: string[]): htmlNode[] {
  let htmlElements = [];
  for (let index = 0; index < html.length; index++) {
    const element = html[index];
    if (element.substring(0, 2) == '</') {
      htmlElements.push({
        tagName: element.substring(2),
        isAttr: false,
        isEndTag: true,
        childNodes: [],
      });
    } else if (element.startsWith('<')) {
      htmlElements.push({
        tagName: element.substring(1),
        isAttr: false,
        isEndTag: false,
        childNodes: [],
        htmlTag: document.createElement('div'),
      });
    } else {
      const splitMainAttr = element.split('<');
      htmlElements.push({
        tagName: splitMainAttr[0],
        isAttr: true,
        isEndTag: false,
        childNodes: [],
      });
      htmlElements.push({
        tagName: splitMainAttr[1].substring(1),
        isAttr: false,
        isEndTag: true,
        childNodes: [],
        htmlTag: document.createElement('div'),
      });
    }
  }
  return htmlElements;
}
let htmlElements = htmlParser(exampleHTML.split('>'));
console.log('htmlElements: ', htmlElements);

/**
 * @param  {htmlNode[]} elements
 * Recursive Function
 * Loops through raw html to build a dom that will later be displayed with renderComponent()
 *
 * 0:   {tagName: '!DOCTYPE html',  isAttr: false, isEndTag: false, childNodes: Array(0), htmlTag: div}
 * 1:   {tagName: 'html lang="en"', isAttr: false, isEndTag: false, childNodes: Array(0), htmlTag: div}
 * 2:   {tagName: 'head',           isAttr: false, isEndTag: false, childNodes: Array(0), htmlTag: div}
 * 3:   {tagName: 'title',          isAttr: false, isEndTag: false, childNodes: Array(0), htmlTag: div}
 * 4:   {tagName: 'Document',       isAttr: true,  isEndTag: false, childNodes: Array(0), htmlTag: div}
 * 5:   {tagName: 'title',          isAttr: false, isEndTag: true,  childNodes: Array(0), htmlTag: div}
 * 6:   {tagName: 'head',           isAttr: false, isEndTag: true,  childNodes: Array(0), htmlTag: div}
 * 7:   {tagName: 'body',           isAttr: false, isEndTag: false, childNodes: Array(0), htmlTag: div}
 * 8:   {tagName: 'span',           isAttr: false, isEndTag: false, childNodes: Array(0), htmlTag: div}
 * 9:   {tagName: 'Hello World',    isAttr: true,  isEndTag: false, childNodes: Array(0), htmlTag: div}
 * 10:  {tagName: 'span',           isAttr: false, isEndTag: true,  childNodes: Array(0), htmlTag: div}
 * 11:  {tagName: 'body',           isAttr: false, isEndTag: true,  childNodes: Array(0), htmlTag: div}
 * 12:  {tagName: 'html',           isAttr: false, isEndTag: true,  childNodes: Array(0), htmlTag: div}
 *
 * TODO: Remove end tags from the dom render
 */

function buildDom(elements: htmlNode[]) {
  let level = 0;
  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    if (
      !element.isEndTag
      // !(
      //   element.tagName === '!DOCTYPE html' ||
      //   element.tagName === 'html lang="en"' ||
      //   element.tagName === 'head' ||
      //   element.tagName === 'body' ||
      //   element.tagName === 'html' ||
      //   element.isAttr
      // )
    ) {
      //element.htmlTag = document.createElement(element.tagName);
      level++;
      element['level'] = level;
      renderComponent(element);
    } else if (element.isAttr) {
      level -= 2;
      element['level'] = level;
      renderComponent(element);
    } else {
      level--;
      element['level'] = level;
    }

    // element['level'] = level;
    // renderComponent(element);
  }
  console.log('element: ', elements);
}

// Adds visual element to the (id: dom-tree) div (the styles are stored in css class dom-element)
/**
 * @param  {htmlNode} child
 */
function renderComponent(child: htmlNode) {
  let domLevel = document.getElementById('' + child.level)!;
  let domHolder = document.createElement('div')!;
  domHolder.className = 'dom-element';
  domHolder.innerText = child.tagName;
  domLevel.append(domHolder);
}
