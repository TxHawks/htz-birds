#!/usr/bin/env node
const fs = require('fs');
const fetch = require('isomorphic-unfetch');

const url = "https://www.haaretz.co.il/papi/magazine/.premium-MAGAZINE-1.7900255";

fetch(url)
  .then(response => response.json())
  .then(data => {

    const origBody = data.slots.article
      .filter(item => Array.isArray(item.body))[0].body;

    const stringifiedBody = origBody
      .map(node => {
        return isNestableElement(node)
          ? stringifyTopLevelElement(node)
          : (node.kind === 'image' || node.inputTemplate === 'com.htz.MagazineArticleQuote')
            ? node
            : null
      })
      .filter(item => item != null);

    delete data.slots;
    data.body = stringifiedBody;

    const dataFilePath = './data/data.json';
    const dataFileExists = fs.existsSync(dataFilePath);

    if (dataFileExists) fs.unlinkSync(dataFilePath);
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  });

const topLevelElementsMap = {
  p: 'p',
  h3: 'h2',
  h2: 'h2',
  ul: 'ul',
  li: 'li',
};

function isNestableElement(node) {
  const topLevelElementsWhiteList = Object.keys(topLevelElementsMap);
  return node.tag && topLevelElementsWhiteList.includes(node.tag);
}

function stringifyTopLevelElement(element) {
  const tag = topLevelElementsMap[element.tag];

  return {
    kind: 'htmlString',
    tag,
    // attrs: stringifyAttrs(element.attributes),
    attrs: getAttrsObj(element.attributes),
    content: stringifyNestedElement(element),
  };
}

function stringifyNestedElement(element) {
  const htmlTagMap = {
    '#text': 'text',
    a: 'a',
    b: 'strong',
    br: 'br',
    u: 'u',
    em: 'em',
    h3: 'h2',
    i: 'em',
    li: 'li',
    mark: 'mark',
    ol: 'ol',
    p: 'p',
    span: 'span',
    strong: 'strong',
    ul: 'ul',
  };

  if (typeof element.content === 'string') return element;

  const content = (element.content || element).reduce((elementHtmlString, node) => {
    switch (node.tag) {
      case '#text':
        return elementHtmlString + node.attributes[0].value;

      // remove manual line breaks
      case 'br':
        return elementHtmlString;
        // return elementHtmlString + '<br />';

      default:
        const tag = node.tag;
        return elementHtmlString + `<${tag}${stringifyAttrs(node.attributes)}>${stringifyNestedElement(node.content)}</${tag}>`;
    }
  }, '');

  return content;
}

const attrWhiteList = [ /* 'class',*/ 'href', 'target', 'id', 'name', ];

function getAttrsObj(attrs) {
  if (!Array.isArray(attrs)) return {};

  return attrs.reduce((result, attr) => {
    if (attrWhiteList.includes(attr.key)) {
      result[attr.key] = attr.value;
    }

    return result;
  }, {});
}
function stringifyAttrs(attrs) {
  if (!Array.isArray(attrs)) return '';


  const attrsString = attrs.reduce((result, attr) => {
    return attrWhiteList.includes(attr.key)
      ? `${result} ${attr.key}="${attr.value}"`
      : result;

  }, '');

  return attrsString || '';
}
