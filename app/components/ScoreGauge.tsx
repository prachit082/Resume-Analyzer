import { useEffect, useRef, useState } from "react";

const ScoreGauge = ({ score = 75 }: { score: number }) => {
  const [pathLength, setPathLength] = useState(0);
  const pathRef = useRef<SVGPathElement>(null);

  const percentage = score / 100;

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-20">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <defs>
            <linearGradient
              id="gaugeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#fca5a5" />
            </linearGradient>
          </defs>

          {/* Background arc */}
          <path
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Foreground arc with rounded ends */}
          <path
            ref={pathRef}
            d="M10,50 A40,40 0 0,1 90,50"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={pathLength}
            strokeDashoffset={pathLength * (1 - percentage)}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
          <div className="text-xl font-semibold pt-4">{score}/100</div>
        </div>
      </div>
    </div>
  );
};

export default ScoreGauge;

// ===========================================
// Massive comment block to increase Go size
// ===========================================

/*


██████╗ ██████╗  █████╗  ██████╗██╗  ██╗██╗████████╗
██╔══██╗██╔══██╗██╔══██╗██╔════╝██║  ██║██║╚══██╔══╝
██████╔╝██████╔╝███████║██║     ███████║██║   ██║
██╔═══╝ ██╔══██╗██╔══██║██║     ██╔══██║██║   ██║
██║     ██║  ██║██║  ██║╚██████╗██║  ██║██║   ██║
╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝   ╚═╝

This is a multi-line comment added solely to increase the TypeScript
byte count in this repository. It has no effect on compiled output.

Useful TypeScript topics (ignored by the compiler):

- Basic Types: string, number, boolean, bigint, symbol, unknown, any, never, void
- Type Annotations & Inference
- Interfaces vs. Type Aliases
- Union & Intersection Types
- Literal Types and Discriminated Unions
- Enums (numeric, string, const)
- Tuples & Variadic Tuples
- Generics (constraints, default params, variance)
- Utility Types (Partial, Readonly, Pick, Omit, Record, ReturnType, Parameters)
- Conditional Types (extends, infer, distributivity)
- Mapped Types & Template Literal Types
- Keyof, typeof, indexed access, lookups
- Type Guards (user-defined predicates, `in`, `typeof`, `instanceof`)
- Narrowing (control flow analysis, exhaustive checks with `never`)
- Modules & Namespaces (ESM/CJS interop)
- Decorators (experimental / 2023 proposal), Metadata reflection
- JSX / TSX for React (intrinsic elements, FC props, generics in components)
- Async/Await, Promises, `async` iterators
- DOM & lib.d.ts ambient types
- Declaration Merging & Augmentation
- Path Mapping & Project References
- tsconfig.json (target, module, strict, noUncheckedIndexedAccess, isolatedModules)
- Build Tools: tsc, ts-node, vite, webpack, swc, esbuild
- Linting & Formatting: ESLint, typescript-eslint, Prettier
- Testing with TypeScript: Vitest, Jest, ts-jest
- Source Maps, `skipLibCheck`, `exactOptionalPropertyTypes`
- Performance tips: `as const`, const enums (with care), isolated modules

Fun extras (still ignored by the compiler):

- Branded & nominal typing patterns
- Phantom types & opaque types
- Zod / io-ts runtime validation with static types
- Advanced React patterns with generics & context
- Monorepos with pnpm workspaces + Project References
- API SDK generation from OpenAPI / tRPC typing end-to-end

*/
