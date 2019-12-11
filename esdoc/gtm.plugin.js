module.exports = {
	onHandleContent(event) {
		const code = event.data.option.code;
		// console.log('onHandleContent', event.data.option.code);

		const trackingCode = `
	<!-- Google Tag Manager -->
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','${code}');</script>
	<!-- End Google Tag Manager -->
	<!-- Google Tag Manager (noscript) -->
	<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${code}"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<!-- End Google Tag Manager (noscript) -->
	  `;
		event.data.content = event.data.content.replace('</head>', trackingCode + '</head>');

		const trackingScript = `
	<!-- Google Tag Manager (noscript) -->
	<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${code}"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<!-- End Google Tag Manager (noscript) -->
	`;
		event.data.content = event.data.content.replace('<body class="layout-container" data-ice="rootContainer">', '<body class="layout-container" data-ice="rootContainer">' + trackingScript);

		event.data.content = event.data.content.replace(/\<footer(.|\n|\r|\s)*?<\/footer>/g, '');
	}
};
