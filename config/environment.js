const development = {
    name : 'development',
    port : 3000,
    db_path :'./config/mongoose',
    passport_path : './config/passport-local-strategy',
    customMware_path : './config/middleware',
    assets_path : './assets',
    api_path :'https://remotive.com/api/remote-jobs'
}

const production = {
    name : 'production',
    port : 8080
}


module.exports = development;
