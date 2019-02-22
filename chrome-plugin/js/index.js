const list = document.querySelector('#list')
const form = document.querySelector('#form')
const keyword = document.querySelector('#keyword')
const textMaxLength = 70

//主函数
function getBookByKeyword(word) {
    const keywords = word.toLowerCase()
    //这方法是异步的
    chrome.bookmarks.getTree(function (bookmarkArray) {
        let result = []
        keywords.split(' ').map((keyword) => {
            result = result.concat(traverse(bookmarkArray, keyword))
        })
        //不存在搜索结果
        if (!result.length && keywords) {
            const li = createLi({
                text: '找不到哦，用百度试试吧',
                className: 'baidu',
                keywords: keywords
            })
            list.appendChild(li)
            return 
        }
        //按时间排序
        result.sort((a, b) => {
            return b.dateAdded - a.dateAdded
        })
        //去重
        const tmp = []
        result = result.filter((item) => {
            if (tmp.includes(item.id)) {
                return false
            } else {
                tmp.push(item.id)
                return true
            }
        })
        const liArray = result.map((item) => {
            let className = ''
            return createLi({
                text: item.title,
                url: item.url,
                className: className,
                keywords: keywords
            })
        })
        //再次排序，按搜索到最多关键词排序
        const reg = /class="word"/img
        liArray.sort((a, b) => {
            return b.innerHTML.match(reg).length - a.innerHTML.match(reg).length
        })
        liArray.map((item, index)=>{
            let className = ''
            switch (index) {
                case 0:
                    className = 'first'
                    break;
                case 1:
                    className = 'second'
                    break;
                case 2:
                    className = 'third'
                    break;
                default:
                    break;
            }
            item.className = item.className + ' ' + className
            list.appendChild(item)
        })
    })
}

//搜索遍历书签树
function traverse(data, keyword) {
    let result = []
    if (keyword == ' ' || keyword == '') return result
    data.map((item) => {
        if (item.title.toLowerCase().includes(keyword)) {
            const tmp = JSON.parse(JSON.stringify(item))
            // tmp.keyword = keyword
            result.push(tmp)
        }
        if (item.children && Array.isArray(item.children)) {
            result = result.concat(traverse(item.children, keyword))
        }
    })
    return result
}

//创建每个li标签
function createLi({ text = '', url = '', className = '', keywords = '' }) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    const img = document.createElement('img')
    if (!url) {
        url = 'https://www.baidu.com/s?wd=' + keywords
    }
    let tmpText = text
    keywords.split(' ').map((keyword) => {
        if (keyword == ' ' || keyword == '') return
        //关键字在textMaxLength之后
        const position = tmpText.toLowerCase().indexOf(keyword.toLowerCase())
        if (keyword.length + position > textMaxLength) {
            tmpText = tmpText.substr(position - textMaxLength / 2, textMaxLength) + '...'
        } else if (text.length > textMaxLength) {
            tmpText = tmpText.substr(0, textMaxLength) + '...'
        }
        //给关键字给一个className
        tmpText = tmpText.replace(new RegExp(keyword, 'img'), function (a0, index, text) {
            const span = `<span class="word">${a0}</span>`
            return span
        })
    })

    li.className = className
    const urlResult = url.match(/(http:|https:)\/\/(.*?)\//)
    if(urlResult && urlResult.length){
        img.src = 'chrome://favicon/' + urlResult[0]
    }else{
        img.src = '../images/star.png'
    }
    li.appendChild(img)
    a.innerHTML = tmpText
    a.href = url
    a.target = '_blank'
    li.appendChild(a)
    return li
}

//监听回车，提交事件
form.addEventListener('submit', function (e) {
    const word = keyword.value
    if (keyword == ' ' || keyword == '') return
    list.innerHTML = ''
    getBookByKeyword(word)
    console.log('form submit')
    /*但是我们测试的时候我们会发现IE下能够阻止表单提交，但是FF、chrome等浏览器并不能阻止表单提交
    原因是：Object EventListener：This is an ECMAScript function reference. This method has no return value. The parameter is a Event object.
    可见，listener是没有返回值的（写了也不会认）
    return false*/
    e.preventDefault()
})

//监听输入的值变化
keyword.addEventListener('input', function (e) {
    const word = e.target.value
    if (keyword == ' ' || keyword == '') return
    list.innerHTML = ''
    getBookByKeyword(word)
    console.log('input onchange')
    e.preventDefault()
})
