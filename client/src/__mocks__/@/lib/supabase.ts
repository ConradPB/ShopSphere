// Lightweight TypeScript-friendly mock for Jest tests.
// - avoids `any` by using `unknown` and explicit types
// - uses `void varName` to mark unused params as used (no eslint unused-vars warning)
// - returns a small sample product list when querying "products"

type SelectResult = { data: unknown[] | null; error: Error | null };

interface ThenableSelect {
  eq: (col: string, val: unknown) => { single: () => Promise<SelectResult> };
  single: () => Promise<SelectResult>;
  then: (onfulfilled: (res: SelectResult) => unknown) => Promise<unknown>;
  catch: (onrejected: (err: unknown) => unknown) => Promise<unknown>;
}

function makeSelectResult(result: SelectResult): ThenableSelect {
  return {
    eq: (_col: string, _val: unknown) => {
      // use the args to avoid "defined but never used"
      void _col;
      void _val;
      return { single: async () => result };
    },
    single: async () => result,
    then: (onfulfilled) => Promise.resolve(result).then(onfulfilled),
    catch: (onrejected) => Promise.resolve(result).catch(onrejected),
  };
}

// a small sample product list (useful for Home / Product Grid tests)
const SAMPLE_PRODUCTS: SelectResult = {
  data: [
    {
      id: "1",
      title: "Mock Product",
      price: 9.99,
      image: "/fallback-image.jpg",
      description: "A mock product",
      category: "Mocks",
    },
    {
      id: "2",
      title: "Another Product",
      price: 14.5,
      image: "/fallback-image.jpg",
      description: "Another mock product",
      category: "Mocks",
    },
  ],
  error: null,
};

export const supabase = {
  from: (table: string) => {
    // mark table used (silences unused-vars eslint)
    void table;

    return {
      // support typical pattern: await supabase.from('products').select('*')
      select: (_cols?: string) => {
        void _cols;
        // return product list only for the products table; empty otherwise
        if (table === "products") {
          return makeSelectResult(SAMPLE_PRODUCTS);
        }
        return makeSelectResult({ data: [], error: null });
      },
      // If code calls chaining: supabase.from(...).select(...).eq(...).single()
      // our makeSelectResult provides eq() and single()
    };
  },
};
