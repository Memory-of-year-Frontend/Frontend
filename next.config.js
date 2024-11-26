module.exports = {
    async rewrites() {
    return [
        {
        source: '/api/:path*',
        destination: 'http://52.63.140.24:8080/api/:path*'
        }
    ];
    }
};
