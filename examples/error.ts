import { Effect, Data } from "effect";

class HttpError extends Data.TaggedError("HttpError") {}

class ParseError extends Data.TaggedError("ParseError") {}

const failWithHttpError = () => Effect.fail(new HttpError());
const failWithParseError = () => Effect.fail(new ParseError());

const program = () =>
  Effect.succeed(undefined).pipe(
    Effect.flatMap(failWithHttpError),
    Effect.flatMap(failWithParseError),
    // 統一處理所有錯誤
    Effect.catchAll(() => Effect.succeed("fail")),
  );

Effect.runPromise(program());
