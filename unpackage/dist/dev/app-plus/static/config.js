let BaseApi = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    BaseApi = ''
}else{
    // 生产环境
    BaseApi = 'http://39.108.123.243:5000'
}

export default BaseApi