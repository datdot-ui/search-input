const bel = require('bel')
const csjs = require('csjs-inject')
module.exports = searchInput

let isOpen = false
let searchContent = ''
let shortInfo = ''
function searchInput() {
    const searchArea = bel`
        <div contenteditable="true" 
             class=${css.textarea} 
             placeholder="Enter a keyword, contract name or code snippet" 
             onclick=${(e) => select(e, searchArea)}
             onkeyup=${(e) => trigger(e, searchArea)}
        ></div>
    `

    document.body.addEventListener('click', () => {
        isOpen = false
        searchArea.classList.remove(css.focus)
        searchArea.classList.add(css.ellipsis)
        // console.log("body clicked")
        searchArea.innerHTML = shortInfo
        console.log('info:' , shortInfo)
        console.log('content:', searchContent)
    })

    return searchArea
}

function select(el, searchArea) {
    // console.log(searchArea)
    isOpen = true
    el.stopPropagation()
    if (isOpen) {
        searchArea.classList.remove(css.ellipsis)
        
        if (searchArea.classList.contains(css.focus)) {

        } else {
            searchArea.classList.add(css.focus)
            searchArea.innerHTML = searchContent
        }
    }
}

function trigger(e, searchArea) {
    const keyCode = e.keyCode
    // console.log(keyCode)
    searchContent = searchArea.innerHTML
    shortInfo = searchArea.innerText.split('\n').shift()

    if (keyCode === 8 || keyCode == 46 ) {
        
        if (shortInfo === '' && searchArea.textContent == '') {
            searchArea.setAttribute('placeholder', 'Enter a keyword, contract name or code snippet')
            searchContent = ''
            return clearSearch(searchArea)
        } else {
            searchArea.setAttribute('placeholder', '')
        }

    }
}

function clearSearch (searchArea) {
    searchArea.innerHTML = ''
}

const css = csjs`
    body {
        height: calc(100vh - 16px);
    }
    .textarea {
        width: 500px;
        max-height: 20px;
        border: 1px solid #999;
        border-radius: 4px;
        padding: 8px 10px;
        outline: none;
        overflow: hidden;
        transition: max-height .6s ease-in-out;
    }
    [contenteditable=true]:empty::before {
        content: attr(placeholder);
        color: grey;
    }
    .focus {
        max-height: 250px;
        overflow-y: auto;
        white-space: pre-wrap;
    }
    .ellipsis {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
`