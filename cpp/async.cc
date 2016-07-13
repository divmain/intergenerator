/*********************************************************************
 * NAN - Native Abstractions for Node.js
 *
 * Copyright (c) 2016 NAN contributors
 *
 * MIT License <https://github.com/nodejs/nan/blob/master/LICENSE.md>
 ********************************************************************/

#include <string.h>
#include <map>
#include <iostream>
#include <nan.h>
#include <nan-marshal.h>
#include "rapidjson/document.h"
#include "generator.h"  // NOLINT(build/include)
#include "async.h"  // NOLINT(build/include)

using namespace rapidjson;
using v8::Function;
using v8::Local;
using v8::Number;
using v8::Value;
using v8::Object;
using v8::String;
using Nan::AsyncQueueWorker;
using Nan::AsyncWorker;
using Nan::Callback;
using Nan::HandleScope;
using Nan::New;
using Nan::Null;
using Nan::To;
using Nan::Get;
using std::cout;
using std::endl;

struct CodePoint {
  int line;
  int column;
};

struct CodeLocation {
  std::string filename;
  CodePoint start;
  CodePoint end;
};

struct SourceMapping {
  std::string source;
  CodePoint original;
  CodePoint generated;
};

struct NodeAccumulator {
  std::string code;
  std::vector<SourceMapping> mappings;
  int position;
};

enum NodeType {
  Program,
  FunctionDeclaration,
  Identifier,
  BlockStatement,
  ExpressionStatement,
  CallExpression,
  MemberExpression,
  VariableDeclaration,
  VariableDeclarator,
  ArrayExpression,
  StringLiteral,
  NumericLiteral,
  NullLiteral
};

static std::map<std::string, NodeType> nodeTypeMap = {
  {"Program", Program},
  {"FunctionDeclaration", FunctionDeclaration},
  {"Identifier", Identifier},
  {"BlockStatement", BlockStatement},
  {"ExpressionStatement", ExpressionStatement},
  {"CallExpression", CallExpression},
  {"MemberExpression", MemberExpression},
  {"VariableDeclaration", VariableDeclaration},
  {"VariableDeclarator", VariableDeclarator},
  {"ArrayExpression", ArrayExpression},
  {"StringLiteral", StringLiteral},
  {"NumericLiteral", NumericLiteral},
  {"NullLiteral", NullLiteral}
};

NodeType typeOfNode(rapidjson::Value& node)
{
  // TODO: horribly unsafe!
  auto stringType = node.GetObject().FindMember("type")->value.GetString();
  return nodeTypeMap[std::string(stringType, strlen(stringType))];
}


std::vector<SourceMapping> getMappings(CodeLocation loc, int position)
{
  return std::vector<SourceMapping> {
    SourceMapping {
      .source=loc.filename,
      .original=loc.start,
      .generated=CodePoint{
        .line=1,
        .column=position + 1
      }
    }
  };
}

CodeLocation getLocationFromNode(rapidjson::Value& node)
{
  auto nodeJSON = node.GetObject();
  auto locJSON = nodeJSON.FindMember("loc")->value.GetObject();
  auto startJSON = locJSON.FindMember("start")->value.GetObject();

  auto filename = locJSON.FindMember("filename")->value.GetString();

  return CodeLocation {
    .filename=filename,
    .start=CodePoint{
      .line=startJSON.FindMember("line")->value.GetInt(),
      .column=startJSON.FindMember("column")->value.GetInt()
    }
  };
}

NodeAccumulator generate(rapidjson::Value node, int position)
{
  NodeAccumulator (*gen)(rapidjson::Value, int);

  switch (typeOfNode(node)) {
    case Program:
      break;
    case FunctionDeclaration:
      break;
    case Identifier:
      break;
    case BlockStatement:
      break;
    case ExpressionStatement:
      break;
    case CallExpression:
      break;
    case MemberExpression:
      break;
    case VariableDeclaration:
      break;
    case VariableDeclarator:
      break;
    case ArrayExpression:
      break;
    case StringLiteral:
      break;
    case NumericLiteral:
      break;
    case NullLiteral:
      break;
  }
}

NodeAccumulator genNumericLiteral(rapidjson::Value& node, int position)
{
  auto loc = getLocationFromNode(node);

  auto mappings = getMappings(loc, position);

  auto code = std::to_string(
    *node.GetObject().FindMember("value")->value.GetString()
  );
  position += code.length();

  return NodeAccumulator {
    .code=code,
    .mappings=std::vector<SourceMapping>(mappings),
    .position=position
  };
}

NodeAccumulator genNullLiteral(rapidjson::Value& node, int position)
{
  auto const mappings = std::vector<SourceMapping>();
  auto const code = "null";
  position += 4;
  return NodeAccumulator{
    .code=code,
    .mappings=mappings,
    .position=position
  };
}

NodeAccumulator generateChildren(
  rapidjson::Value children,
  int position,
  std::string separator = ""
) {

}

NodeAccumulator generateProgram(rapidjson::Value node, int position)
{
  auto body = node.GetObject().FindMember("body")->value.GetObject();
  return generateChildren(body, position);
}

class GeneratorWorker : public AsyncWorker {
 public:
  GeneratorWorker(Callback *callback, std::string astString)
    : AsyncWorker(callback), astString(astString) {}
  ~GeneratorWorker() {}

  void Execute () {
    Document ast;
    ast.Parse(astString.c_str());
    auto program = ast.GetObject().FindMember("program")->value.GetObject();
    auto code = generateProgram(program, 0);
  }

  void HandleOKCallback () {
    HandleScope scope;

    Local<v8::Value> argv[] = {
        Null(),
        Null()
    };

    callback->Call(2, argv);
  }

 private:
  std::string astString;
};

NAN_METHOD(GenerateAsync) {
  auto astLocalString = To<String>(info[0]).ToLocalChecked();
  Nan::Utf8String astUTF8String(astLocalString);
  auto astString = std::string(*astUTF8String);

  auto callback = new Callback(info[1].As<Function>());

  AsyncQueueWorker(new GeneratorWorker(callback, astString));
}
