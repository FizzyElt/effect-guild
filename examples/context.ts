import { Context, Effect, pipe } from "effect";

class EnvContext extends Context.Tag("EnvContext")<
  EnvContext,
  {
    apiKey: string;
  }
>() {}

const program = pipe(
  EnvContext,
  Effect.flatMap(({ apiKey }) => Effect.succeed(apiKey)),
);

const providedProgram = program.pipe(
  Effect.provideService(EnvContext, { apiKey: "123" }),
);

Effect.runPromise(providedProgram).then(console.log);
