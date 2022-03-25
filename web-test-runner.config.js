export default {
	files: './test/**/*.test.js',
	nodeResolve: true,
	testFramework: {
		config: {
			ui: 'bdd',
			timeout: '10000',
		}
	},
	testRunnerHtml: testFramework =>
		`<html>
			<body>
				<script src="node_modules/@brightspace-ui/core/tools/resize-observer-test-error-handler.js"></script>
				<script type="module" src="${testFramework}"></script>
			</body>
		</html>`
};
