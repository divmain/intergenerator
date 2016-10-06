#[macro_use]
extern crate neon;

use neon::vm::{Call, JsResult, Module};
use neon::js::{JsString, JsNumber, JsObject, Object, JsArray};



fn generate(scope: &T, node: JsObject) -> Result<JsObject> {
    let node_type = try!(node.get(scope, "type"));

    let &sub_generator = match node_type {
        "Program" => genProgram,
        "FunctionDeclaration" => genFuncDeclaration,
        "Identifier" => genIdentifier,
        "BlockStatement" => genBlockStmt,
        "ExpressionStatement" => genExprStmt,
        "CallExpression" => genCallExpr,
        "MemberExpression" => genMemberExpr,
        "VariableDeclaration" => genVariableDeclaration,
        "VariableDeclarator" => genVariableDeclarator,
        "ArrayExpression" => genArrayExpr,
        "StringLiteral" => genStringLiteral,
        "NumericLiteral" => genNumericLiteral,
        "NullLiteral" => genNullLiteral,
        _ => return Err("Unknown node type.")
    };

    Ok(try!(sub_generator(scope, node)))
}


fn startGenerate(call: Call) -> JsResult<JsObject> {
    let scope = call.scope;

    let arg = try!(try!(call.arguments.require(scope, 0)).check::<JsObject>());
    // let props = try!(arg.get_own_property_names(scope));
    // println!("number of keys: {}", props.len());

    Ok(props)
}

register_module!(m, {
    m.export("generate", startGenerate)
});
