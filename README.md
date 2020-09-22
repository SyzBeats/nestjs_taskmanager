# Nest JS Application

## General about Nest JS

### What are Decorators

> Typescript features that allow annotation of functions or properties.
> Decorators can tell the runtime what a specific class or function is used for
> Nest uses them to apply already some base functionality to decorated functions

## NestJS Pipes

- pipes operate on the arguments to be processed - before the actual handler is called
- data transformation or validation
- They return data, original or modified
- throw exceptions
- can be async

### different types

- ValidationPipe (checks compatability)
- ParseIntPipe (e.g. string conversion)

### Custom Pipes

- annotated with @Injectiable()
- every Pipe needs a transform() method
  - value
  - metadata
