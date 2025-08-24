// src/__mocks__/supabase.ts
// Lightweight manual mock for supabase used only in Jest tests.
// We avoid using jest.fn here to keep this file plain and TS-friendly.

type SelectResult = { data: any[] | null; error: any | null };

// results used for `select()` when not chained
const SELECT_ALL_RESULT: SelectResult = { data: [], error: null };

// helper to create a "thenable" object so `await supabase.from(...).select()` works
function makeSelectResult(result: SelectResult) {
  // A thenable object: has .then so `await obj` works.
  const thenable: any = {
    eq: (_col: string, _val: any) => {
      return {
        single: async () => ({ data: null, error: null }),
      };
    },
    single: async () => result,
    // make it awaitable
    then: (resolve: (v: any) => any) => Promise.resolve(result).then(resolve),
    catch: (fn: (e: any) => any) => Promise.resolve(result).catch(fn),
  };
  return thenable;
}

export const supabase = {
  from: (_table: string) => ({
    // supabase.from('products').select('*') -> awaitable
    select: (_cols?: string) => makeSelectResult(SELECT_ALL_RESULT),
    // support direct chaining style if code ever does: supabase.from(...).select().eq(...).single()
    // the .eq is provided by the object returned by select()
  }),
};
