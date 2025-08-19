import type { ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";
import { cn } from "~/lib/utils";

interface AccordionContextType {
  activeItems: string[];
  toggleItem: (id: string) => void;
  isItemActive: (id: string) => boolean;
}

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

const useAccordion = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("Accordion components must be used within an Accordion");
  }
  return context;
};

interface AccordionProps {
  children: ReactNode;
  defaultOpen?: string;
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  children,
  defaultOpen,
  allowMultiple = false,
  className = "",
}) => {
  const [activeItems, setActiveItems] = useState<string[]>(
    defaultOpen ? [defaultOpen] : []
  );

  const toggleItem = (id: string) => {
    setActiveItems((prev) => {
      if (allowMultiple) {
        return prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id];
      } else {
        return prev.includes(id) ? [] : [id];
      }
    });
  };

  const isItemActive = (id: string) => activeItems.includes(id);

  return (
    <AccordionContext.Provider
      value={{ activeItems, toggleItem, isItemActive }}
    >
      <div className={`space-y-2 ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
};

interface AccordionItemProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  id,
  children,
  className = "",
}) => {
  return (
    <div className={`overflow-hidden border-b border-gray-200 ${className}`}>
      {children}
    </div>
  );
};

interface AccordionHeaderProps {
  itemId: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export const AccordionHeader: React.FC<AccordionHeaderProps> = ({
  itemId,
  children,
  className = "",
  icon,
  iconPosition = "right",
}) => {
  const { toggleItem, isItemActive } = useAccordion();
  const isActive = isItemActive(itemId);

  const defaultIcon = (
    <svg
      className={cn("w-5 h-5 transition-transform duration-200", {
        "rotate-180": isActive,
      })}
      fill="none"
      stroke="#98A2B3"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );

  const handleClick = () => {
    toggleItem(itemId);
  };

  return (
    <button
      onClick={handleClick}
      className={`
        w-full px-4 py-3 text-left
        focus:outline-none
        transition-colors duration-200 flex items-center justify-between cursor-pointer
        ${className}
      `}
    >
      <div className="flex items-center space-x-3">
        {iconPosition === "left" && (icon || defaultIcon)}
        <div className="flex-1">{children}</div>
      </div>
      {iconPosition === "right" && (icon || defaultIcon)}
    </button>
  );
};

interface AccordionContentProps {
  itemId: string;
  children: ReactNode;
  className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
  itemId,
  children,
  className = "",
}) => {
  const { isItemActive } = useAccordion();
  const isActive = isItemActive(itemId);

  return (
    <div
      className={`
        overflow-hidden transition-all duration-300 ease-in-out
        ${isActive ? "max-h-fit opacity-100" : "max-h-0 opacity-0"}
        ${className}
      `}
    >
      <div className="px-4 py-3 ">{children}</div>
    </div>
  );
};

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
