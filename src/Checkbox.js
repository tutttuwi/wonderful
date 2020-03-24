exports.Checkbox = class Checkbox {
  constructor(config) {
    if (!config) config = {};
    this.targetClass = config.targetClass || undefined;
    this.isStack = config.isStack || false;

    this.config = {};
    this.config.bfFontClass =
      config.bfFontClass || this.isStack ? 'far fa-square fa-stack-1x' : 'far fa-square';
    this.config.bfFontClassStacked = config.bfFontClassStacked || 'far fa-square fa-stack-1x';
    this.config.bfColor = config.bfColor || 'black';
    this.config.bfColorStacked = config.bfColorStacked || 'black';
    this.config.bfSize = config.bfSize || '1.5rem';
    this.config.bfSizeStacked = config.bfSizeStacked || '1.5rem';
    this.config.bfWeight = config.bfWeight || '1rem';
    this.config.bfMarginRight = config.bfMarginRight || '8px';

    this.config.afFontClass =
      config.afFontClass || this.isStack ? 'far fa-square fa-stack-1x' : 'far fa-check-square';
    this.config.afFontClassStacked = config.afFontClassStacked || 'fas fa-check fa-stack-1x';
    this.config.afColor = config.afColor || 'black';
    this.config.afColorStacked = config.afColorStacked || 'black';
    this.config.afSize = config.afSize || '1.5rem';
    this.config.afSizeStacked = config.afSizeStacked || '1.5rem';
    this.config.afWeight = config.afWeight || '1rem';
    this.config.afMarginRight = config.afMarginRight || '8px';

    this.config.labelSize = config.labelSize || '1rem';
  }
  init() {
    let targetElements = document.querySelectorAll('input[type=checkbox]');
    if (this.targetClass)
      targetElements = document.querySelectorAll(`input[type=checkbox].${this.targetClass}`);
    if (!targetElements) {
      throw new Error('ERROR: input not founded!!');
    }
    for (let i = 0; i < targetElements.length; i++) {
      let targetLabel = targetElements[i].nextElementSibling;
      if (!targetLabel && targetLabel.nodeName === 'LABEL') {
        console.log('WARN: label not founded!!' + targetElements[i].innerHTML);
        continue;
      }
      targetElements[i].style.display = 'none';

      targetLabel.style['align-items'] = 'center';
      targetLabel.style.display = 'flex';
      targetLabel.style.cursor = 'pointer';
      targetLabel.style['font-size'] = this.config.labelSize;

      let bfFontElement = document.createElement('i');
      bfFontElement.classList = this.config.bfFontClass;
      bfFontElement.style.color = this.config.bfColor;
      bfFontElement.style['font-size'] = this.config.bfSize;
      bfFontElement.style['margin-right'] = this.config.bfMarginRight;
      let bfFontStackedElement = document.createElement('i');
      bfFontStackedElement.classList = this.config.bfFontClassStacked;
      bfFontStackedElement.style.color = this.config.bfColorStacked;
      bfFontStackedElement.style['font-size'] = this.config.bfSizeStacked;
      let bfStackSpanElement = document.createElement('span');
      bfStackSpanElement.classList = 'fa-stack';
      bfStackSpanElement.style.height = '1em';
      bfStackSpanElement.style['line-height'] = '1em';
      bfStackSpanElement.style.width = '2.0em';
      bfStackSpanElement.appendChild(bfFontElement);
      bfStackSpanElement.appendChild(bfFontStackedElement);

      let afFontElement = document.createElement('i');
      afFontElement.classList = this.config.afFontClass;
      afFontElement.style.color = this.config.afColor;
      afFontElement.style['font-size'] = this.config.afSize;
      afFontElement.style['margin-right'] = this.config.afMarginRight;
      let afFontStackedElement = document.createElement('i');
      afFontStackedElement.classList = this.config.afFontClassStacked;
      afFontStackedElement.style.color = this.config.afColorStacked;
      afFontStackedElement.style['font-size'] = this.config.afSizeStacked;
      let afStackSpanElement = document.createElement('span');
      afStackSpanElement.classList = 'fa-stack';
      afStackSpanElement.style.height = '1em';
      afStackSpanElement.style['line-height'] = '1em';
      afStackSpanElement.style.width = '2.0em';
      afStackSpanElement.appendChild(afFontElement);
      afStackSpanElement.appendChild(afFontStackedElement);

      removeElement(targetLabel);
      if (this.isStack) {
        targetLabel.insertAdjacentElement('afterBegin', bfStackSpanElement);
      } else {
        targetLabel.insertAdjacentElement('afterBegin', bfFontElement);
      }

      targetElements[i].addEventListener('change', e => {
        removeElement(targetLabel);
        if (!e.target.checked) {
          // OFF
          if (this.isStack) {
            targetLabel.insertAdjacentElement('afterBegin', bfStackSpanElement);
          } else {
            targetLabel.insertAdjacentElement('afterBegin', bfFontElement);
          }
        } else {
          // ON
          if (this.isStack) {
            targetLabel.insertAdjacentElement('afterBegin', afStackSpanElement);
          } else {
            targetLabel.insertAdjacentElement('afterBegin', afFontElement);
          }
        }
      });
      targetElements[i].dispatchEvent(new Event('change'));
    }

    return;
  }
};

/**
 * チェックボックスのchecked属性の変更を検知して変更前のアイコンを削除する処理<br/>
 * @param {Element} targetLabel
 */
function removeElement(targetLabel) {
  if (targetLabel.getElementsByTagName('span')[0]) {
    targetLabel.getElementsByTagName('span')[0].remove();
  }
  if (targetLabel.getElementsByTagName('i')[0]) {
    targetLabel.getElementsByTagName('i')[0].remove();
  }
}

// /**
//  * 文字列置換フォーマット関数
//  * @param {String} tmpl
//  * @param {Object} obj
//  */
// function format(tmpl, obj) {
//   if (!obj) return;
//   let keys = Object.keys(obj);
//   keys.forEach(key => {
//     const tarStr = '/{' + key + '}/g';
//     tmpl = tmpl.replace(tarStr, obj[key]);
//   });
//   return tmpl;
// }

// /**
//  * ヘッダーにスタイル要素を追加<br/>
//  * 疑似要素のスタイルを追加する用
//  * @param {String} css
//  */
// function pseudo(css) {
//   const id = 'wonderful-pseudoStyle';
//   var element = document.getElementById(id);
//   if (element == null) {
//     let styleTag = document.createElement('style');
//     styleTag.id = id;
//     styleTag.innerHTML = css;
//     document.getElementsByTagName('head')[0].appendChild(styleTag);
//   } else {
//     element.innerHTML += css;
//   }
// }
