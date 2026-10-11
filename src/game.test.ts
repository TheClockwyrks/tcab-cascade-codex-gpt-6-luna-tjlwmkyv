import { describe, expect, it } from "vitest";
import { game } from "./game";
import type { CascadeState } from "./game";

async function start() {
  const registered: Record<string, (state: CascadeState) => unknown> = {};
  const [state, debug] = await game.initialize({
    input: { register() {}, layout: () => null },
    audio: { define() {}, load: async () => undefined },
    assets: {} as never,
    diagnostics: {
      register(name: string, source: (state: never) => unknown) {
        registered[name] = source as never;
      },
    },
    events: {} as never,
    viewport: () => ({}) as never,
  } as never);
  return { state, debug, registered };
}

describe("Cascade core", async () => {
  it("starts with a complete title state and diagnostic reads", async () => {
    const { state, debug, registered } = await start();
    expect(debug.snapshot(state).screen).toBe("title");
    expect(state.tableau).toHaveLength(7);
    expect(state.foundations).toHaveLength(4);
    expect(Object.keys(registered)).toHaveLength(17);
  });

  it("deals 52 unique cards and turns three stock cards as a set", async () => {
    const { state, debug } = await start();
    const dealt = debug.deal(state);
    const snapshot = debug.snapshot(dealt);
    expect(snapshot.tableau.map((column) => column.length)).toEqual([
      1, 2, 3, 4, 5, 6, 7,
    ]);
    expect(snapshot.stock).toHaveLength(24);
    const turned = debug.turnStock(dealt);
    expect(debug.snapshot(turned).wasteSets).toEqual([3]);
    expect(debug.snapshot(turned).wasteVisibleCount).toBe(3);
  });

  it("accepts an ace to an empty foundation and preserves identity", async () => {
    const { state, debug } = await start();
    const ace = debug.addCard(state, "tableau", 0, "hearts", 1, true);
    const id = ace.tableau[0]![0]!.id;
    const [next, moved] = debug.move(ace, "tableau", 0, 0, "foundation", 2);
    expect(moved).toBe(true);
    expect(next.foundations[2]![0]!.id).toBe(id);
    expect(next.tableau[0]).toHaveLength(0);
  });
});
