class ESDocPlugin {

	onStart(ev) {
		console.log(ev.data);
	}

	onHandlePlugins(ev) {
		// modify plugins
		// ev.data.plugins = ...;
	}

	onHandleConfig(ev) {
		// modify config
		console.log('onHandleConfig', ev.data.config);
		// ev.data.config.title = ...;
	}

	onHandleCode(ev) {
		// modify code
		console.log('onHandleCode', ev.data.code);
	}

	onHandleCodeParser(ev) {
		// modify parser
		console.log('onHandleCodeParser', ev.data.parser);
		// ev.data.parser = function(code){ ... };
	}

	onHandleAST(ev) {
		// modify AST
		console.log('onHandleAST', ev.data.ast);
		// ev.data.ast = ...;
	}

	onHandleDocs(ev) {
		// modify docs
		console.log('onHandleDocs', ev.data.docs);
		// ev.data.docs = ...;
	};

	onPublish(ev) {
		// write content to output dir
		ev.data.writeFile(filePath, content);

		// copy file to output dir
		ev.data.copyFile(src, dest);

		// copy dir to output dir
		ev.data.copyDir(src, dest);

		// read file from output dir
		ev.data.readFile(filePath);
	};

	onHandleContent(ev) {
		// modify content
		console.log('onHandleContent', ev.data.content);
		// ev.data.content = ...;
	};

	onComplete(ev) {
		// complete
	};
}

// exports plugin
module.exports = new ESDocPlugin();
