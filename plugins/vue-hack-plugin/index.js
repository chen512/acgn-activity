const template = nodeRequire('babel-template');
const t = nodeRequire('babel-types');
export default {
    visitor: {
        BlockStatement(path) {
            if(t.isFunctionDeclaration(path.parent) && path.parent.id.name == 'updateChildComponent') {                           
                let buildExpression = 
                    template(`vm._updateFromParent&&vm._updateFromParent(propsData, listeners, parentVnode, renderChildren)`);
                let ast = buildExpression({});
                path.unshiftContainer('body', ast);
            }
        }
    }
}