const babel = nodeRequire('babel-core');
const types = nodeRequire('babel-types');

class ActvityComponentCleanPlugin {
    constructor() {}

    apply(compiler) {
        compiler.plugin("compilation", (compilation) => {
            compilation.plugin("optimize-chunk-assets", (chunks, callback) => {
                const files = [];
				chunks.forEach((chunk) => files.push.apply(files, chunk.files));
				files.push.apply(files, compilation.additionalChunkAssets);
                files.filter((file) => /\.js$/.test(file)).forEach((file) => {
                    if(/vendor/.test(file)) return;
                    let asset = compilation.assets[file];
                    let result = babel.transform(asset.source(), {
                        compact: false,
                        plugins: [
                            [{
                                visitor: {
                                    ObjectProperty: function ObjectProperty(path) {
                                        var key = path.node.key;
                                        var name = '';
                                        if (types.isIdentifier(key)) {
                                            name = key.name;
                                        } else if (types.isStringLiteral(key)) {
                                            name = key.value;
                                        }
                                        if (/^\$rule$/.test(name)) {
                                            path.remove();
                                        }
                                    }
                                }
                            }]
                            //['transform-remove-props', {regex: /^\$rule$/}]
                        ]
                    });
                    asset.source = ()=> result.code;
                    asset.size = ()=> result.code.length;
                });
                callback();
            });
        });
    }   
}

export default ActvityComponentCleanPlugin;