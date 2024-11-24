module.exports = {
    async rewrites() {
    return [
        {
        source: '/api/:path*',
        destination: 'http://3.107.207.24:8080/api/:path*'
        }
    ];
    }
};
