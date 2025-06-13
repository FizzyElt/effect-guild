---
# You can also start simply with 'default'
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
# some information about your slides (markdown enabled)
title: Welcome to Slidev
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# apply unocss classes to the current slide
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: fade-out
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
# open graph
# seoMeta:
#  ogImage: https://cover.sli.dev
---

# Effect-TS 介紹

---

# 目錄

- Effect-TS 的由來與 fp-ts 的關係
- Effect-TS 概觀
- Effect 的特色
- 前端不適合應用 Effect
- Effect-TS 標準函式庫的應用

---

# Effect-TS 的由來與 fp-ts 的關係

1. 2023 年初 Effect-TS 誕生
2. 2024 年初 首次發布第一個版本
3. 2025 年預計發布一個大版本(4.0)

如果你用過 fp-ts 你會發現兩者風格非常像，因為 Effect-TS 標準函式庫是由 fp-ts 作者負責的

所以你可以說 Effect-ts 算是 fp-ts 的另一個版本

---

# Effect-TS 概觀

```mermaid
flowchart TB

  subgraph effect [Effect]
    direction TB
    
    Effect
    Layer
    Context
    Schedule
    Stream
  end

  subgraph STD [Standard Lib]
    direction TB
    
    Either
    Option
    Array
    BigInt
    String
    Number
  end

  effect --> STD
```

---

# Effect 是什麼？

Effect 專門用來處理各式各樣的副作用（IO、錯誤、資源引用），一個 Effect 的型別涵蓋了三樣東西，結果、錯誤、需求資源，每個 Effect 都可以視為一個 program

```typescript
         ┌─── Produces a value of type number
         │       ┌─── Fails with an Error
         │       │      ┌─── Requires no dependencies
         ▼       ▼      ▼
Effect<number, Error, never>
```

而每個 Effect 又可以與其他 Effect 重組

```typescript
const init = Effect.succeed(2)

const double = (n: number) => Effect.succeed(n * 2)

const program = () => init.pipe(Effect.flatMap(double), Effect.flatMap(double))

Effect.runPromise(program()).then(console.log)
// > 8
```

--- 

# 顯性的錯誤與處理

Effect 在型別層面更加明確地表達可能錯誤的情況，而不像 Promise 只告知成功的執行結果

````md magic-move
```typescript
import { Effect, Data } from "effect";

class HttpError extends Data.TaggedError("HttpError") {}

class ParseError extends Data.TaggedError("ParseError") {}

const failWithHttpError = () => Effect.fail(new HttpError());
const failWithParseError = () => Effect.fail(new ParseError());

const program = () =>
	Effect.succeed("").pipe(
		Effect.flatMap(failWithHttpError),
		Effect.flatMap(failWithParseError),
	);

Effect.runPromise(program());
```

```typescript
import { Effect, Data } from "effect";

class HttpError extends Data.TaggedError("HttpError") {}

class ParseError extends Data.TaggedError("ParseError") {}

const failWithHttpError = () => Effect.fail(new HttpError());
const failWithParseError = () => Effect.fail(new ParseError());

const program = () =>
	Effect.succeed("").pipe(
		Effect.flatMap(failWithHttpError),
		Effect.flatMap(failWithParseError),
        // 處理特定錯誤
		Effect.catchTag("HttpError", () => Effect.succeed("HttpError")),
	);

Effect.runPromise(program());
```

```typescript
import { Effect, Data } from "effect";

class HttpError extends Data.TaggedError("HttpError") {}

class ParseError extends Data.TaggedError("ParseError") {}

const failWithHttpError = () => Effect.fail(new HttpError());
const failWithParseError = () => Effect.fail(new ParseError());

const program = () =>
	Effect.succeed("").pipe(
		Effect.flatMap(failWithHttpError),
		Effect.flatMap(failWithParseError),
		// 處理多個錯誤
		Effect.catchTags({
			HttpError: () => Effect.succeed("http error"),
			ParseError: () => Effect.succeed("parse error"),
		}),
	);

Effect.runPromise(program());
```

```typescript
import { Effect, Data } from "effect";

class HttpError extends Data.TaggedError("HttpError") {}

class ParseError extends Data.TaggedError("ParseError") {}

const failWithHttpError = () => Effect.fail(new HttpError());
const failWithParseError = () => Effect.fail(new ParseError());

const program = () =>
	Effect.succeed("").pipe(
		Effect.flatMap(failWithHttpError),
		Effect.flatMap(failWithParseError),
		// 統一處理所有錯誤
		Effect.catchAll(() => Effect.succeed("fail")),
	);

Effect.runPromise(program());
```
````



--- 

# 資源的引用提示

---

# 前端不適合應用 Effect

---

# Effect-TS 標準函式庫的應用

