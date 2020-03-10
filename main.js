// 原生AJAX
myButton.addEventListener('click', (e)=>{
    let request = new XMLHttpRequest()    // 创建一个请求对象
    request.open('POST', '/xxxx')    // 配置参数
    request.setRequestHeader('frank', '18')    // 这个参数需要设置在open和send之间
    request.onreadystatechange = ()=>{
        if(request.readyState === 4){
            console.log('请求响应都结束了')

            if(request.status >=200 && request.status < 300){
                console.log('请求成功。')
                console.log(request.getAllResponseHeaders())    // 获取响应头
                console.log(request.statusText)    // 获取状态文本
                console.log(request.getResponseHeader('Content-Type'))    // 获取指定响应头
                console.log(request.responseText)    // 读取响应的第四部分
                console.log(typeof request.responseText)    // String

                let string = request.responseText
                // 把符合JSON语法的字符串转换成JS对应的值
                let object = window.JSON.parse(string)
                console.log(typeof object)
                console.log(object.note)
                console.log(object.note.from)

            }else if(request.status >= 400){
                console.log('请求失败。')
            }
        }
    }
    
    request.send('我偏要设置第四部分')    // 发送请求
})

window.jQuery = {}

// 封装在jQuery
window.jQuery.ajax = function({url,method,body,successFn,failFn}){
    let request = new XMLHttpRequest()    // 创建一个请求对象
    request.open(method, url)    // 配置参数
    request.onreadystatechange = ()=>{
        if(request.readyState === 4){
            if(request.status >=200 && request.status < 300){
                successFn.call(undefined, request.responseText)
            }else if(request.status >= 400){
                failFn.call(undefined, request)
            }
        }
    }
    request.send(body)    // 发送请求
}


myButton.addEventListener('click', (e)=>{
    window.jQuery.ajax({
        url: '/xxx',
        method: 'get',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'frank': '18'
        }
    }).then(
        (text)=>{console.log(text)},
        (request)=>{console.log(request)}
    )
})



// 封装在jQuery，并自行使用Promise
window.jQuery.ajax = function({url,method}){
    return new Promise(function(resolve, reject){
        let request = new XMLHttpRequest()    // 创建一个请求对象
        request.open(method, url)    // 配置参数
        request.onreadystatechange = ()=>{
            if(request.readyState === 4){
                if(request.status >=200 && request.status < 300){
                    resolve.call(undefined, request.responseText)
                }else if(request.status >= 400){
                    reject.call(undefined, request)
                }
            }
        }
        request.send()    // 发送请求
    })  
}

myButton.addEventListener('click', (e)=>{
    window.jQuery.ajax({
        url: '/xxx',
        method: 'get',
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'frank': '18'
        }
    }).then(
        (text)=>{console.log(text)},
        (request)=>{console.log(request)}
    )
})





// 使用真实的jQuery
myButton.addEventListener('click', (e)=>{
    window.jQuery.ajax({
        url: '/xxx',
        method: 'get',
        success: (x)=>{
            f1.call(undefined, x)
            f2.call(undefined, x)
        },
        error: (x)=>{
            console.log(x)
            console.log(x.status)
            console.log(x.responseText)
        }
    })
})

// 使用jQuery来操作ajax并使用promise
myButton.addEventListener('click', (e)=>{
    $.ajax({
        url: '/xxxx',
        method: 'get'
    }).then(
        (responseText)=>{console.log(responseText); return '成功'},    // 这个函数没有将成功打出来
        (request)=>{console.log('error'); return '已经处理了'}
    ).then(
        // 这里的responseText就是上面返回的成功，也就是我们可以对responseText进行加工，如果上面返回的就是responseText的话
        // 第一个成功函数，return回来的值会作为第二个成功函数的responseText
        (responseText)=>{console.log(responseText)},
        (request)=>{console.log('error2')}
    )
})
