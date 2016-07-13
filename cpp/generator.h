#ifndef EXAMPLES_ASYNC_PI_ESTIMATE_PI_EST_H_
#define EXAMPLES_ASYNC_PI_ESTIMATE_PI_EST_H_

#include <map>
#include <string>
#include <thread>
#include <future>
#include <iostream>
#include <nan-marshal.h>
#include <nan.h>
#include "boost/boost/variant.hpp"

using v8::Function;
using v8::Local;
using v8::Number;
using v8::Value;
using v8::Object;
using v8::Array;
using v8::String;
using Nan::AsyncQueueWorker;
using Nan::AsyncWorker;
using Nan::Callback;
using Nan::HandleScope;
using Nan::New;
using Nan::Null;
using Nan::To;
using Nan::Get;

typedef boost::make_recursive_variant<
  bool,
  double,
  std::string,
  Local<Value>,
  std::vector<boost::recursive_variant_>,
  std::map<std::string, boost::recursive_variant_>
>::type JSObject;

struct ASTVisitor : public boost::static_visitor<JSObject>
{
  JSObject operator()(bool value) const
  {
    return value;
  }

  JSObject operator()(double value) const
  {
    return value;
  }

  JSObject operator()(std::string value) const
  {
    return value;
  }

  JSObject operator()(std::vector<JSObject>& value) const
  {
    return value;
  }

  JSObject operator()(std::map<std::string, JSObject>& value) const
  {
    return value;
  }

  JSObject operator()(Local<Value> value) const
  {
    if (value->IsBoolean()) {
//      std::cout << "was boolean" << std::endl;
      return value->BooleanValue();
    }

    if (value->IsNumber()) {
//      std::cout << "was number" << std::endl;
      return value->NumberValue();
    }

    if (value->IsString()) {
//      std::cout << "was string" << std::endl;
      Nan::Utf8String string(value->ToString());
      return std::string(*string);
    }

    if (value->IsArray()) {
//      std::cout << "was array" << std::endl;
      auto array = Local<Array>::Cast(value);
      std::vector<JSObject> newArray;

      for (uint32_t i = 0; i < array->Length(); i++) {
        JSObject child = array->Get(i);
        newArray.push_back(boost::apply_visitor(ASTVisitor{}, child));
      }

      return array;
    }

    if (value->IsObject()) {
//      std::cout << "was object" << std::endl;
      auto object = To<Object>(value).ToLocalChecked();
      auto rawKeys = Nan::GetOwnPropertyNames(object).ToLocalChecked();
      auto keys = Nan::Marshal<std::vector<std::string>>(rawKeys);

      std::map<std::string, JSObject> newObject;
      for (auto const key: keys) {
        auto jsKey = Nan::New<String>(key).ToLocalChecked();
        JSObject child = Nan::Get(object, jsKey).ToLocalChecked();
        newObject[key] = boost::apply_visitor(ASTVisitor{}, child);
      }

      return newObject;
    }

//    std::cout << "unserializable JS value:" << std::endl;
//    Nan::Utf8String string(value->ToString());
//    std::cout << std::string(*string) << std::endl;
    return value;
  }
};

#endif  // EXAMPLES_ASYNC_PI_ESTIMATE_PI_EST_H_
