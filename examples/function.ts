import { Array, String, pipe, Match, Either } from "effect";

// 12345678 => 1,234,567
const formatNumberWithCommas = (n: number) =>
	pipe(
		n.toString(),
		String.split(""),
		Array.reverse,
		Array.chunksOf(3),
		Array.map((chunk) => pipe(chunk, Array.reverse, Array.join(""))),
		Array.reverse,
		Array.join(","),
	);

console.log(formatNumberWithCommas(1234567));

type Hex = {
	type: "hex";
	code: string;
};

type Rgb = {
	r: number;
	g: number;
	b: number;
};

const rgbToName = Match.type<Rgb>().pipe(
	Match.withReturnType<string>(),
	Match.when({ r: 255, g: 0, b: 0 }, () => "red"),
	Match.when({ r: 0, g: 0, b: 255 }, () => "blue"),
	Match.when({ r: 0, g: 255, b: 0 }, () => "green"),
	Match.orElse(() => "unknown"),
);
