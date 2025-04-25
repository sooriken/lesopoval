const config = {
	mode: 'production',
	entry: {
		main   : './app/src/js/main.js',
		service: './app/src/js/service.js',
		header : './app/src/js/header.js'
	},
	output: {
		filename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};

module.exports = {
    //...
    resolve: {
        extensions: ['.js', '.jsx']
    }
};

module.exports = config;

