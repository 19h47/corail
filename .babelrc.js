const presets = [
	[
		require.resolve('@babel/preset-env'),
		{
			targets: '>0.25%',
		},
	],
];

const plugins = [
	require.resolve('@babel/plugin-proposal-class-properties'),
	require.resolve('@babel/plugin-proposal-object-rest-spread'),
	require.resolve('@babel/plugin-syntax-dynamic-import'),
	require.resolve('@babel/plugin-transform-parameters'),
	require.resolve('@babel/plugin-transform-runtime'),
	require.resolve('@babel/plugin-transform-spread'),
];

module.exports = { presets, plugins };
