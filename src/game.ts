import type {
  Game,
  InitApi,
  RenderApi,
  UpdateApi,
} from "@clockwyrks/simple-2d";
import type { DeepReadonly } from "ts-essentials";
import * as K from "./constants";

export type Screen = "title" | "howto" | "playing" | "won";
export type Suit = "spades" | "hearts" | "diamonds" | "clubs";
export type PileKind = "stock" | "waste" | "foundation" | "tableau";
export interface CardState {
  readonly id: number;
  readonly suit: Suit;
  readonly rank: number;
  readonly faceUp: boolean;
}
export interface DragState {
  readonly cards: readonly CardState[];
  readonly fromPile: "waste" | "foundation" | "tableau";
  readonly fromIndex: number;
  readonly x: number;
  readonly y: number;
}
export interface DropTargetState {
  readonly pile: "foundation" | "tableau";
  readonly index: number;
}
export interface PointerState {
  readonly x: number;
  readonly y: number;
  readonly down: boolean;
}
export interface PressState {
  readonly x: number;
  readonly y: number;
  readonly at: number;
}
export interface FlyerState {
  readonly id: number;
  readonly suit: Suit;
  readonly rank: number;
  readonly x: number;
  readonly y: number;
  readonly vx: number;
  readonly vy: number;
}
export interface CascadeState {
  readonly screen: Screen;
  readonly menuIndex: number;
  readonly titleIndex: number;
  readonly stock: readonly CardState[];
  readonly waste: readonly CardState[];
  readonly wasteSets: readonly number[];
  readonly foundations: readonly (readonly CardState[])[];
  readonly tableau: readonly (readonly CardState[])[];
  readonly drag: DragState | null;
  readonly dropTarget: DropTargetState | null;
  readonly pointer: PointerState;
  readonly lastPress: PressState | null;
  readonly autoFlip: boolean;
  readonly winDetect: boolean;
  readonly launching: boolean;
  readonly trailPainting: boolean;
  readonly launchClock: number;
  readonly launched: number;
  readonly flyers: readonly FlyerState[];
  readonly cascadeDone: boolean;
  readonly trailStamps: number;
  readonly nextId: number;
  readonly simTime: number;
  readonly muted: boolean;
}
type Snapshot = {
  version: number;
  screen: Screen;
  menuIndex: number;
  titleIndex: number;
  dealMode: string;
  turnCount: number;
  dealModeLabel: string;
  muted: boolean;
  autoFlip: boolean;
  winDetect: boolean;
  launching: boolean;
  trailPainting: boolean;
  stock: readonly unknown[];
  waste: readonly unknown[];
  wasteSets: readonly number[];
  wasteVisibleCount: number;
  foundations: readonly (readonly unknown[])[];
  tableau: readonly (readonly unknown[])[];
  drag: DragState | null;
  dropTarget: DropTargetState | null;
  pointer: PointerState;
  lastPress: PressState | null;
  launchClock: number;
  launched: number;
  flyers: readonly FlyerState[];
  cascadeDone: boolean;
  trailStamps: number;
  simTime: number;
};
export interface CascadeDebugApi {
  readonly version: number;
  reset(): CascadeState;
  snapshot(s: DeepReadonly<CascadeState>): Snapshot;
  reconcile(s: DeepReadonly<CascadeState>): CascadeState;
  menuItemRect(
    s: DeepReadonly<CascadeState>,
    index: number,
  ): { x: number; y: number; w: number; h: number } | null;
  setScreen(s: DeepReadonly<CascadeState>, v: Screen): CascadeState;
  setMenuIndex(s: DeepReadonly<CascadeState>, v: number): CascadeState;
  setTitleIndex(s: DeepReadonly<CascadeState>, v: number): CascadeState;
  addCard(
    s: DeepReadonly<CascadeState>,
    p: PileKind,
    i: number,
    suit: Suit,
    rank: number,
    faceUp: boolean,
  ): CascadeState;
  removeCard(s: DeepReadonly<CascadeState>, id: number): CascadeState;
  setCardFaceUp(
    s: DeepReadonly<CascadeState>,
    id: number,
    v: boolean,
  ): CascadeState;
  clearPile(
    s: DeepReadonly<CascadeState>,
    p: PileKind,
    i: number,
  ): CascadeState;
  clearTable(s: DeepReadonly<CascadeState>): CascadeState;
  addWasteSet(s: DeepReadonly<CascadeState>, count: number): CascadeState;
  clearWasteSets(s: DeepReadonly<CascadeState>): CascadeState;
  deal(s: DeepReadonly<CascadeState>): CascadeState;
  turnStock(s: DeepReadonly<CascadeState>): CascadeState;
  move(
    s: DeepReadonly<CascadeState>,
    from: "waste" | "foundation" | "tableau",
    fromIndex: number,
    row: number,
    to: "foundation" | "tableau",
    toIndex: number,
  ): [CascadeState, boolean];
  autoMove(
    s: DeepReadonly<CascadeState>,
    p: "waste" | "tableau",
    i: number,
  ): [CascadeState, boolean];
  pointerDown(
    s: DeepReadonly<CascadeState>,
    x: number,
    y: number,
  ): CascadeState;
  pointerMove(
    s: DeepReadonly<CascadeState>,
    x: number,
    y: number,
  ): CascadeState;
  pointerUp(s: DeepReadonly<CascadeState>, x: number, y: number): CascadeState;
  setAutoFlip(s: DeepReadonly<CascadeState>, v: boolean): CascadeState;
  setWinDetect(s: DeepReadonly<CascadeState>, v: boolean): CascadeState;
  setLaunching(s: DeepReadonly<CascadeState>, v: boolean): CascadeState;
  setTrailPainting(s: DeepReadonly<CascadeState>, v: boolean): CascadeState;
  addFlyer(
    s: DeepReadonly<CascadeState>,
    suit: Suit,
    rank: number,
    x: number,
    y: number,
    vx: number,
    vy: number,
  ): CascadeState;
  setFlyerPosition(
    s: DeepReadonly<CascadeState>,
    id: number,
    x: number,
    y: number,
  ): CascadeState;
  setFlyerVelocity(
    s: DeepReadonly<CascadeState>,
    id: number,
    vx: number,
    vy: number,
  ): CascadeState;
  removeFlyer(s: DeepReadonly<CascadeState>, id: number): CascadeState;
  clearFlyers(s: DeepReadonly<CascadeState>): CascadeState;
  setLaunchClock(s: DeepReadonly<CascadeState>, v: number): CascadeState;
  clearTrail(s: DeepReadonly<CascadeState>): CascadeState;
  drawLaunchVx(): number;
}
export const BACKGROUND = "#123d31";
const empty = (): CascadeState => ({
  screen: "title",
  menuIndex: 0,
  titleIndex: 0,
  stock: [],
  waste: [],
  wasteSets: [],
  foundations: [[], [], [], []],
  tableau: [[], [], [], [], [], [], []],
  drag: null,
  dropTarget: null,
  pointer: { x: 0, y: 0, down: false },
  lastPress: null,
  autoFlip: true,
  winDetect: true,
  launching: true,
  trailPainting: true,
  launchClock: 0,
  launched: 0,
  flyers: [],
  cascadeDone: false,
  trailStamps: 0,
  nextId: 1,
  simTime: 0,
  muted: false,
});
const color = (s: Suit) =>
  s === "hearts" || s === "diamonds" ? "red" : "black";
const pile = (
  s: DeepReadonly<CascadeState>,
  p: PileKind,
  i: number,
): readonly CardState[] =>
  p === "stock"
    ? s.stock
    : p === "waste"
      ? s.waste
      : p === "foundation"
        ? (s.foundations[i] ?? [])
        : (s.tableau[i] ?? []);
function setPile(
  s: CascadeState,
  p: PileKind,
  i: number,
  c: readonly CardState[],
): CascadeState {
  if (p === "stock") return { ...s, stock: c };
  if (p === "waste") return { ...s, waste: c };
  if (p === "foundation")
    return {
      ...s,
      foundations: s.foundations.map((x, n) => (n === i ? c : x)),
    };
  return { ...s, tableau: s.tableau.map((x, n) => (n === i ? c : x)) };
}
function validRef(p: PileKind, i: number) {
  if (
    ((p === "stock" || p === "waste") && i !== 0) ||
    (p === "foundation" && (i < 0 || i > 3)) ||
    (p === "tableau" && (i < 0 || i > 6))
  )
    throw Error("Invalid pile address");
}
function isRun(a: readonly CardState[]) {
  return (
    a.length > 0 &&
    a.every(
      (c, i) =>
        i === 0 ||
        (a[i - 1]!.rank === c.rank + 1 &&
          color(a[i - 1]!.suit) !== color(c.suit)),
    )
  );
}
function accepts(
  s: DeepReadonly<CascadeState>,
  cards: readonly CardState[],
  p: "foundation" | "tableau",
  i: number,
) {
  if (!isRun(cards)) return false;
  const lead = cards[0]!;
  if (p === "tableau") {
    const col = s.tableau[i];
    if (!col) return false;
    if (!col.length) return lead.rank === 13;
    const top = col[col.length - 1]!;
    return (
      top.faceUp &&
      top.rank === lead.rank + 1 &&
      color(top.suit) !== color(lead.suit)
    );
  }
  if (cards.length !== 1) return false;
  const f = s.foundations[i];
  if (!f) return false;
  return f.length
    ? f[f.length - 1]!.suit === lead.suit &&
        f[f.length - 1]!.rank + 1 === lead.rank
    : lead.rank === 1;
}
function isPlayable(
  s: DeepReadonly<CascadeState>,
  p: "waste" | "foundation" | "tableau",
  i: number,
  row: number,
) {
  const a =
    p === "waste"
      ? s.waste
      : p === "foundation"
        ? s.foundations[i]
        : s.tableau[i];
  if (!a?.length) return false;
  if (p === "waste") return s.wasteSets.length > 0 && row === a.length - 1;
  if (p === "foundation") return row === a.length - 1;
  if (row < 0 || row >= a.length) return false;
  return a[row]!.faceUp;
}
function move(
  s: CascadeState,
  from: "waste" | "foundation" | "tableau",
  fi: number,
  row: number,
  to: "foundation" | "tableau",
  ti: number,
): [CascadeState, boolean, string[]] {
  const src =
    from === "waste"
      ? s.waste
      : from === "foundation"
        ? s.foundations[fi]
        : s.tableau[fi];
  if (!src || row < 0 || row >= src.length || !isPlayable(s, from, fi, row))
    return [s, false, []];
  const cards = from === "tableau" ? src.slice(row) : [src[row]!];
  if (!accepts(s, cards, to, ti)) return [s, false, []];
  let n = setPile(s, from, fi, src.slice(0, row));
  const dest = pile(n, to, ti);
  n = setPile(n, to, ti, [...dest, ...cards]);
  if (from === "waste") {
    const sets = [...n.wasteSets];
    for (let x = sets.length - 1; x >= 0; x--)
      if (sets[x]! > 0) {
        sets[x] = sets[x]! - 1;
        break;
      }
    n = { ...n, wasteSets: sets.filter((x) => x > 0) };
  }
  const cues = [to === "foundation" ? "home" : "drop"];
  if (from === "tableau" && n.tableau[fi]?.length) {
    const col = [...n.tableau[fi]!],
      top = col[col.length - 1]!;
    if (!top.faceUp && n.autoFlip) {
      col[col.length - 1] = { ...top, faceUp: true };
      n = { ...n, tableau: n.tableau.map((v, j) => (j === fi ? col : v)) };
      cues.push("flip");
    }
  }
  if (n.winDetect && n.foundations.reduce((z, x) => z + x.length, 0) === 52) {
    n = { ...n, screen: "won", launchClock: K.LAUNCH_INTERVAL };
    cues.push("win");
  }
  return [n, true, cues];
}
function deal(s: CascadeState): CascadeState {
  const d: CardState[] = [];
  for (const suit of K.SUITS)
    for (let rank = 1; rank <= 13; rank++)
      d.push({ id: 0, suit, rank, faceUp: false });
  for (let i = d.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [d[i], d[j]] = [d[j]!, d[i]!];
  }
  let id = s.nextId,
    at = 0;
  const t = d.slice(0, 28).map((c) => ({ ...c, id: id++ }));
  const cols: CardState[][] = [];
  for (let i = 0; i < 7; i++) {
    cols.push(
      t.slice(at, at + i + 1).map((c, j) => ({ ...c, faceUp: j === i })),
    );
    at += i + 1;
  }
  const stock = d.slice(28).map((c) => ({ ...c, id: id++ }));
  return {
    ...s,
    stock,
    waste: [],
    wasteSets: [],
    foundations: [[], [], [], []],
    tableau: cols,
    drag: null,
    dropTarget: null,
    launched: 0,
    launchClock: 0,
    flyers: [],
    cascadeDone: false,
    trailStamps: 0,
    nextId: id,
  };
}
function turn(s: CascadeState): [CascadeState, string | null] {
  if (s.stock.length) {
    const n = Math.min(K.TURN_COUNT, s.stock.length),
      cards = s.stock
        .slice(-n)
        .reverse()
        .map((c) => ({ ...c, faceUp: true }));
    return [
      {
        ...s,
        stock: s.stock.slice(0, -n),
        waste: [...s.waste, ...cards],
        wasteSets: [...s.wasteSets, n],
      },
      "turn",
    ];
  }
  if (s.waste.length)
    return [
      {
        ...s,
        stock: [...s.waste].reverse().map((c) => ({ ...c, faceUp: false })),
        waste: [],
        wasteSets: [],
      },
      "recycle",
    ];
  return [s, null];
}
function rectFor(s: DeepReadonly<CascadeState>, index: number) {
  if (s.screen === "title")
    return index >= 0 && index < 2
      ? { x: 490, y: 390 + index * 64, w: 300, h: 52 }
      : null;
  if (s.screen === "howto")
    return index === 0 ? { x: 490, y: 594, w: 300, h: 52 } : null;
  if (s.screen === "playing")
    return index >= 0 && index < 3
      ? { x: 380 + index * 180, y: 680, w: 160, h: 36 }
      : null;
  return null;
}
function pileAt(
  x: number,
  y: number,
  s: DeepReadonly<CascadeState>,
): DropTargetState | null {
  if (y >= 24 && y < 164) {
    if (x >= 590 && x < 690) return { pile: "foundation", index: 0 };
    if (x >= 712 && x < 812) return { pile: "foundation", index: 1 };
    if (x >= 834 && x < 934) return { pile: "foundation", index: 2 };
    if (x >= 956 && x < 1056) return { pile: "foundation", index: 3 };
    return null;
  }
  if (y >= 180 && y <= 676) {
    for (let i = 0; i < 7; i++)
      if (
        x >= K.COLUMN_X[i]! &&
        x < K.COLUMN_X[i]! + 100 &&
        y <= Math.max(320, 180 + (s.tableau[i]?.length ?? 0) * 34)
      )
        return { pile: "tableau", index: i };
  }
  return null;
}
function down(s: CascadeState, x: number, y: number): CascadeState {
  const pointer = { x, y, down: true };
  if (s.screen === "won")
    return {
      ...deal({ ...s, screen: "playing", menuIndex: 0 }),
      screen: "playing",
    };
  if (s.screen !== "playing") {
    const i = Array.from(
      { length: s.screen === "title" ? 2 : 1 },
      (_, j) => j,
    ).find((j) => {
      const r = rectFor(s, j);
      return !!r && x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h;
    });
    return i === undefined
      ? { ...s, pointer }
      : { ...activate({ ...s, pointer }, i), pointer };
  }
  let st: CascadeState = { ...s, pointer };
  const last = s.lastPress,
    dbl =
      !!last &&
      s.simTime - last.at <= K.DOUBLE_CLICK_WINDOW &&
      Math.hypot(x - last.x, y - last.y) <= K.DOUBLE_CLICK_SLOP;
  st = { ...st, lastPress: { x, y, at: s.simTime } };
  if (x >= K.STOCK_X && x < K.STOCK_X + 100 && y >= 24 && y < 164) return st;
  let source: "waste" | "foundation" | "tableau" | null = null,
    idx = 0,
    row = -1,
    card: CardState | undefined,
    px = 0,
    py = 0;
  if (y >= 24 && y < 164) {
    if (x >= 346 && x < 446) {
      const count = s.wasteSets[s.wasteSets.length - 1] ?? 0;
      row = s.waste.length - 1;
      card = count && row >= 0 ? s.waste[row] : undefined;
      if (card) {
        source = "waste";
        idx = 0;
        px = 346 + (count - 1) * 26;
      }
    } else
      for (let i = 0; i < 4; i++)
        if (x >= K.FOUNDATION_X[i]! && x < K.FOUNDATION_X[i]! + 100) {
          const a = s.foundations[i]!;
          card = a[a.length - 1];
          if (card) {
            source = "foundation";
            idx = i;
            row = a.length - 1;
            px = K.FOUNDATION_X[i]!;
          }
        }
  } else
    for (let i = 0; i < 7; i++)
      if (x >= K.COLUMN_X[i]! && x < K.COLUMN_X[i]! + 100) {
        let yy = 180;
        const a = s.tableau[i]!;
        for (let j = 0; j < a.length; j++) {
          if (y >= yy && y < yy + 140) {
            card = a[j];
            row = j;
            source = "tableau";
            idx = i;
            px = K.COLUMN_X[i]!;
            py = yy;
            break;
          }
          yy += a[j]!.faceUp ? 34 : 24;
        }
        break;
      }
  if (card && source) {
    if (
      dbl &&
      (source === "waste" ||
        (source === "tableau" &&
          row === s.tableau[idx]!.findIndex((c) => c.faceUp)))
    ) {
      const [n, ok] = move(
        st,
        source,
        idx,
        row,
        "foundation",
        s.foundations.findIndex(
          (f) =>
            !f.length ||
            (f[f.length - 1]!.suit === card!.suit &&
              f[f.length - 1]!.rank + 1 === card!.rank),
        ),
      );
      if (ok) return { ...n, pointer };
      return st;
    }
    const a =
      source === "waste"
        ? st.waste
        : source === "foundation"
          ? st.foundations[idx]!
          : st.tableau[idx]!;
    const cards = source === "tableau" ? a.slice(row) : [card];
    const next = setPile(st, source, idx, a.slice(0, row));
    return {
      ...next,
      drag: { cards, fromPile: source, fromIndex: idx, x: px, y: py },
      dropTarget: null,
    };
  }
  return st;
}
function movePointer(s: CascadeState, x: number, y: number): CascadeState {
  if (!s.drag) return { ...s, pointer: { x, y, down: true } };
  const dx = x - s.pointer.x,
    dy = y - s.pointer.y;
  const d = { ...s.drag, x: s.drag.x + dx, y: s.drag.y + dy };
  const centerX = d.x + 50,
    centerY = d.y + 70,
    target = pileAt(centerX, centerY, s);
  return {
    ...s,
    pointer: { x, y, down: true },
    drag: d,
    dropTarget:
      target && accepts(s, d.cards, target.pile, target.index) ? target : null,
  };
}
function up(s: CascadeState, x: number, y: number): CascadeState {
  if (s.screen === "playing" && s.drag) {
    const d = s.drag,
      far = s.lastPress
        ? Math.hypot(x - s.lastPress.x, y - s.lastPress.y) > K.DRAG_THRESHOLD
        : false;
    let n: CascadeState = {
      ...s,
      pointer: { x, y, down: false },
      drag: null,
      dropTarget: null,
    };
    if (far) {
      const target = pileAt(d.x + 50, d.y + 70, s);
      if (target) {
        const [m, ok] = move(
          n,
          d.fromPile,
          d.fromIndex,
          0,
          target.pile,
          target.index,
        );
        if (ok) n = m;
        else
          n = setPile(n, d.fromPile, d.fromIndex, [
            ...pile(n, d.fromPile, d.fromIndex),
            ...d.cards,
          ]);
      } else
        n = setPile(n, d.fromPile, d.fromIndex, [
          ...pile(n, d.fromPile, d.fromIndex),
          ...d.cards,
        ]);
    } else {
      n = setPile(n, d.fromPile, d.fromIndex, [
        ...pile(n, d.fromPile, d.fromIndex),
        ...d.cards,
      ]);
      if (
        s.lastPress &&
        s.lastPress.x >= K.STOCK_X &&
        s.lastPress.x < K.STOCK_X + 100 &&
        s.lastPress.y >= 24 &&
        s.lastPress.y < 164
      )
        n = turn(n)[0];
    }
    return n;
  }
  if (
    s.screen === "playing" &&
    s.pointer.x >= K.STOCK_X &&
    s.pointer.x < K.STOCK_X + 100 &&
    s.pointer.y >= 24 &&
    s.pointer.y < 164
  ) {
    const [turned] = turn({ ...s, pointer: { x, y, down: false } });
    return turned;
  }
  return { ...s, pointer: { x, y, down: false } };
}
function activate(s: CascadeState, i: number): CascadeState {
  if (s.screen === "title") {
    if (i === 0)
      return {
        ...deal({ ...s, titleIndex: 0, screen: "playing" }),
        screen: "playing",
        menuIndex: 0,
      };
    return { ...s, screen: "howto", titleIndex: 1, menuIndex: 0 };
  }
  if (s.screen === "howto")
    return { ...s, screen: "title", menuIndex: s.titleIndex };
  if (s.screen === "playing") {
    if (i === 0) return { ...deal(s), screen: "playing", menuIndex: 0 };
    if (i === 1) return { ...s, screen: "title", menuIndex: s.titleIndex };
    return { ...s, muted: !s.muted };
  }
  return s;
}
function freshDebug(): CascadeDebugApi {
  const bad = (id: number, s: CascadeState) => {
    const found = [
      ...s.stock,
      ...s.waste,
      ...s.foundations.flat(),
      ...s.tableau.flat(),
      ...s.flyers,
    ].some((c) => c.id === id);
    if (!found) throw Error(`Unknown id ${id}`);
  };
  const base = {
    version: K.CASCADE_DEBUG_VERSION,
    reset: () => empty(),
    snapshot: (s: DeepReadonly<CascadeState>): Snapshot => ({
      ...s,
      version: K.CASCADE_DEBUG_VERSION,
      dealMode: K.DEAL_MODE,
      turnCount: K.TURN_COUNT,
      dealModeLabel: K.DEAL_MODE_LABEL,
      wasteVisibleCount: s.wasteSets[s.wasteSets.length - 1] ?? 0,
      stock: s.stock.map((c) => ({ ...c, color: color(c.suit) })),
      waste: s.waste.map((c) => ({ ...c, color: color(c.suit) })),
      foundations: s.foundations.map((a) =>
        a.map((c) => ({ ...c, color: color(c.suit) })),
      ),
      tableau: s.tableau.map((a) =>
        a.map((c) => ({ ...c, color: color(c.suit) })),
      ),
    }),
    reconcile: (s: DeepReadonly<CascadeState>) => ({ ...s }),
    menuItemRect: (s: DeepReadonly<CascadeState>, i: number) => rectFor(s, i),
    setScreen: (s: DeepReadonly<CascadeState>, v: Screen) => ({
      ...s,
      screen: v,
    }),
    setMenuIndex: (s: DeepReadonly<CascadeState>, v: number) => ({
      ...s,
      menuIndex: v,
    }),
    setTitleIndex: (s: DeepReadonly<CascadeState>, v: number) => ({
      ...s,
      titleIndex: v,
    }),
    addCard: (
      s: DeepReadonly<CascadeState>,
      p: PileKind,
      i: number,
      suit: Suit,
      rank: number,
      faceUp: boolean,
    ) => {
      validRef(p, i);
      const c = { id: s.nextId, suit, rank, faceUp };
      return {
        ...setPile(s as CascadeState, p, i, [...pile(s, p, i), c]),
        nextId: s.nextId + 1,
      };
    },
    removeCard: (s: DeepReadonly<CascadeState>, id: number) => {
      bad(id, s as CascadeState);
      let n = s as CascadeState;
      for (const p of ["stock", "waste", "foundation", "tableau"] as PileKind[])
        for (
          let i = 0;
          i < (p === "foundation" ? 4 : p === "tableau" ? 7 : 1);
          i++
        ) {
          const a = pile(n, p, i);
          if (a.some((c) => c.id === id)) {
            n = setPile(
              n,
              p,
              i,
              a.filter((c) => c.id !== id),
            );
            if (p === "waste") {
              const sets = [...n.wasteSets];
              for (let j = sets.length - 1; j >= 0; j--)
                if (sets[j]! > 0) {
                  sets[j] = sets[j]! - 1;
                  break;
                }
              n = { ...n, wasteSets: sets.filter((v) => v > 0) };
            }
            return n;
          }
        }
      return n;
    },
    setCardFaceUp: (s: DeepReadonly<CascadeState>, id: number, v: boolean) => {
      bad(id, s as CascadeState);
      let n = s as CascadeState;
      for (const p of ["stock", "waste", "foundation", "tableau"] as PileKind[])
        for (
          let i = 0;
          i < (p === "foundation" ? 4 : p === "tableau" ? 7 : 1);
          i++
        )
          n = setPile(
            n,
            p,
            i,
            pile(n, p, i).map((c) => (c.id === id ? { ...c, faceUp: v } : c)),
          );
      return n;
    },
    clearPile: (s: DeepReadonly<CascadeState>, p: PileKind, i: number) => {
      validRef(p, i);
      const n = setPile(s as CascadeState, p, i, []);
      return p === "waste" ? { ...n, wasteSets: [] } : n;
    },
    clearTable: (s: DeepReadonly<CascadeState>) => ({
      ...s,
      stock: [],
      waste: [],
      wasteSets: [],
      foundations: [[], [], [], []],
      tableau: [[], [], [], [], [], [], []],
      drag: null,
      dropTarget: null,
    }),
    addWasteSet: (s: DeepReadonly<CascadeState>, count: number) => {
      if (!Number.isInteger(count)) throw Error("count must be an integer");
      return { ...s, wasteSets: [...s.wasteSets, count] };
    },
    clearWasteSets: (s: DeepReadonly<CascadeState>) => ({
      ...s,
      wasteSets: [],
    }),
    deal: (s: DeepReadonly<CascadeState>) => deal(s as CascadeState),
    turnStock: (s: DeepReadonly<CascadeState>) => turn(s as CascadeState)[0],
    move: (
      s: DeepReadonly<CascadeState>,
      f: "waste" | "foundation" | "tableau",
      fi: number,
      row: number,
      t: "foundation" | "tableau",
      ti: number,
    ) => {
      const [n, ok] = move(s as CascadeState, f, fi, row, t, ti);
      return [n, ok] as [CascadeState, boolean];
    },
    autoMove: (
      s: DeepReadonly<CascadeState>,
      p: "waste" | "tableau",
      i: number,
    ) => {
      const a = p === "waste" ? s.waste : (s.tableau[i] ?? []);
      const row = p === "waste" ? a.length - 1 : a.findIndex((c) => c.faceUp);
      const c = a[row];
      if (!c) return [s as CascadeState, false] as [CascadeState, boolean];
      const fi = s.foundations.findIndex((f) =>
        !f.length
          ? c.rank === 1
          : f[f.length - 1]!.suit === c.suit &&
            f[f.length - 1]!.rank + 1 === c.rank,
      );
      if (fi < 0) return [s as CascadeState, false] as [CascadeState, boolean];
      const [n, ok] = move(s as CascadeState, p, i, row, "foundation", fi);
      return [n, ok] as [CascadeState, boolean];
    },
    pointerDown: (s: DeepReadonly<CascadeState>, x: number, y: number) =>
      down(s as CascadeState, x, y),
    pointerMove: (s: DeepReadonly<CascadeState>, x: number, y: number) =>
      movePointer(s as CascadeState, x, y),
    pointerUp: (s: DeepReadonly<CascadeState>, x: number, y: number) =>
      up(s as CascadeState, x, y),
    setAutoFlip: (s: DeepReadonly<CascadeState>, v: boolean) => ({
      ...s,
      autoFlip: v,
    }),
    setWinDetect: (s: DeepReadonly<CascadeState>, v: boolean) => ({
      ...s,
      winDetect: v,
    }),
    setLaunching: (s: DeepReadonly<CascadeState>, v: boolean) => ({
      ...s,
      launching: v,
    }),
    setTrailPainting: (s: DeepReadonly<CascadeState>, v: boolean) => ({
      ...s,
      trailPainting: v,
    }),
    addFlyer: (
      s: DeepReadonly<CascadeState>,
      suit: Suit,
      rank: number,
      x: number,
      y: number,
      vx: number,
      vy: number,
    ) => ({
      ...s,
      flyers: [...s.flyers, { id: s.nextId, suit, rank, x, y, vx, vy }],
      nextId: s.nextId + 1,
    }),
    setFlyerPosition: (
      s: DeepReadonly<CascadeState>,
      id: number,
      x: number,
      y: number,
    ) => {
      bad(id, s as CascadeState);
      return {
        ...s,
        flyers: s.flyers.map((f) => (f.id === id ? { ...f, x, y } : f)),
      };
    },
    setFlyerVelocity: (
      s: DeepReadonly<CascadeState>,
      id: number,
      vx: number,
      vy: number,
    ) => {
      bad(id, s as CascadeState);
      return {
        ...s,
        flyers: s.flyers.map((f) => (f.id === id ? { ...f, vx, vy } : f)),
      };
    },
    removeFlyer: (s: DeepReadonly<CascadeState>, id: number) => {
      bad(id, s as CascadeState);
      return { ...s, flyers: s.flyers.filter((f) => f.id !== id) };
    },
    clearFlyers: (s: DeepReadonly<CascadeState>) => ({ ...s, flyers: [] }),
    setLaunchClock: (s: DeepReadonly<CascadeState>, v: number) => ({
      ...s,
      launchClock: v,
    }),
    clearTrail: (s: DeepReadonly<CascadeState>) => ({ ...s, trailStamps: 0 }),
    drawLaunchVx: () =>
      (Math.random() < 0.5 ? -1 : 1) *
      (K.LAUNCH_VX_MIN + Math.random() * (K.LAUNCH_VX_MAX - K.LAUNCH_VX_MIN)),
  };
  return base;
}
function cardDraw(
  ctx: CanvasRenderingContext2D,
  c: CardState | FlyerState,
  x: number,
  y: number,
  back = false,
) {
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,.28)";
  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 3;
  ctx.fillStyle = back ? "#183b65" : "#f5f1e7";
  ctx.strokeStyle = back ? "#d9c99b" : "#d6d0c4";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.roundRect(x, y, 100, 140, 8);
  ctx.fill();
  ctx.stroke();
  ctx.shadowColor = "transparent";
  if (back) {
    ctx.fillStyle = "#244f76";
    ctx.beginPath();
    ctx.roundRect(x + 6, y + 6, 88, 128, 5);
    ctx.fill();
    ctx.strokeStyle = "#e0c982";
    ctx.lineWidth = 2;
    ctx.strokeRect(x + 12, y + 12, 76, 116);
    ctx.strokeStyle = "rgba(231,215,151,.55)";
    for (let k = 0; k < 7; k++) {
      ctx.beginPath();
      ctx.moveTo(x + 14 + k * 12, y + 14);
      ctx.lineTo(x + 86 - k * 12, y + 126);
      ctx.stroke();
    }
    ctx.restore();
    return;
  }
  if ("faceUp" in c && !c.faceUp) {
    ctx.restore();
    cardDraw(ctx, c, x, y, true);
    return;
  }
  const red = color(c.suit) === "red",
    glyph = { spades: "♠", hearts: "♥", diamonds: "♦", clubs: "♣" }[c.suit];
  const rank =
    c.rank === 1
      ? "A"
      : c.rank === 11
        ? "J"
        : c.rank === 12
          ? "Q"
          : c.rank === 13
            ? "K"
            : String(c.rank);
  ctx.fillStyle = red ? "#bc3e49" : "#172a31";
  ctx.font = "bold 21px Georgia";
  ctx.textAlign = "left";
  ctx.fillText(rank, x + 9, y + 25);
  ctx.font = "20px Georgia";
  ctx.fillText(glyph, x + 10, y + 47);
  ctx.font = "54px Georgia";
  ctx.textAlign = "center";
  ctx.fillText(glyph, x + 50, y + 87);
  ctx.font = "bold 13px Georgia";
  ctx.fillText(rank, x + 50, y + 118);
  ctx.restore();
}
function slot(ctx: CanvasRenderingContext2D, x: number, y: number, label = "") {
  ctx.save();
  ctx.fillStyle = "rgba(4,25,23,.22)";
  ctx.strokeStyle = "rgba(224,202,143,.42)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(x, y, 100, 140, 9);
  ctx.fill();
  ctx.stroke();
  if (label) {
    ctx.fillStyle = "rgba(225,206,155,.6)";
    ctx.font = "bold 13px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(label, x + 50, y + 82);
  }
  ctx.restore();
}
function drawTable(
  s: DeepReadonly<CascadeState>,
  ctx: CanvasRenderingContext2D,
) {
  ctx.fillStyle = BACKGROUND;
  ctx.fillRect(0, 0, 1280, 720);
  const g = ctx.createRadialGradient(640, 360, 20, 640, 360, 750);
  g.addColorStop(0, "#1e6049");
  g.addColorStop(1, "#0b3028");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 1280, 720);
  ctx.strokeStyle = "rgba(231,210,154,.08)";
  ctx.lineWidth = 1;
  for (let y = 5; y < 720; y += 18) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1280, y);
    ctx.stroke();
  }
  slot(ctx, K.STOCK_X, 24, "STOCK");
  slot(ctx, K.WASTE_X, 24, "WASTE");
  slot(ctx, 590, 24, "♠");
  slot(ctx, 712, 24, "♥");
  slot(ctx, 834, 24, "♦");
  slot(ctx, 956, 24, "♣");
  if (s.stock.length)
    cardDraw(ctx, s.stock[s.stock.length - 1]!, 224, 24, true);
  const visible = s.wasteSets[s.wasteSets.length - 1] ?? 0;
  if (!visible) slot(ctx, 346, 24, "");
  else {
    const start = s.waste.length - visible;
    for (let j = 0; j < visible; j++)
      cardDraw(ctx, s.waste[start + j]!, 346 + j * K.WASTE_FAN, 24);
  }
  s.foundations.forEach((f, i) => {
    if (f.length) cardDraw(ctx, f[f.length - 1]!, K.FOUNDATION_X[i]!, 24);
  });
  for (let i = 0; i < 7; i++) {
    const col = s.tableau[i]!;
    if (!col.length) slot(ctx, K.COLUMN_X[i]!, 180, "K");
    let y = 180;
    for (let j = 0; j < col.length; j++) {
      const c = col[j]!;
      if (
        s.drag?.fromPile === "tableau" &&
        s.drag.fromIndex === i &&
        j >= col.findIndex((q) => q.id === s.drag!.cards[0]!.id)
      ) {
        y += c.faceUp ? 34 : 24;
        continue;
      }
      cardDraw(ctx, c, K.COLUMN_X[i]!, y);
      y += c.faceUp ? 34 : 24;
    }
  }
  if (s.drag)
    s.drag.cards.forEach((c, i) =>
      cardDraw(ctx, c, s.drag!.x, s.drag!.y + i * 24),
    );
  if (s.dropTarget) {
    const x =
      s.dropTarget.pile === "foundation"
        ? K.FOUNDATION_X[s.dropTarget.index]!
        : K.COLUMN_X[s.dropTarget.index]!;
    const y = s.dropTarget.pile === "foundation" ? 24 : 180;
    ctx.strokeStyle = "#f1d16f";
    ctx.lineWidth = 4;
    ctx.strokeRect(x - 3, y - 3, 106, 146);
  }
  ctx.fillStyle = "rgba(4,24,22,.65)";
  ctx.fillRect(0, 680, 1280, 40);
  ctx.font = "bold 13px sans-serif";
  ctx.textAlign = "center";
  ctx.fillStyle = "#eddcae";
  ctx.fillText(K.DEAL_MODE_LABEL, 640, 703);
  K.HUD_ITEMS.forEach((v, i) => {
    const r = { x: 380 + i * 180, y: 680, w: 160, h: 36 };
    ctx.fillStyle = s.menuIndex === i ? "#d6b867" : "#254c3e";
    ctx.fillRect(r.x, r.y, r.w, r.h);
    ctx.fillStyle = s.menuIndex === i ? "#182e25" : "#f4e9cb";
    ctx.fillText(v, r.x + 80, r.y + 23);
  });
}
function activateMenu(s: CascadeState, i: number, api: UpdateApi) {
  if (s.screen === "playing" && i === 2) {
    api.audio.setMuted(!s.muted);
    return { ...s, muted: api.audio.muted() };
  }
  const n = activate(s, i);
  if (n.stock.length === 24 && n.screen === "playing" && s.screen !== "playing")
    api.audio.play(K.CUES.deal);
  return n;
}
export const game: Game<CascadeState, CascadeDebugApi> = {
  initialize(api: InitApi<CascadeState>) {
    for (const [name, freq, wave] of [
      [K.CUES.deal, 520, "triangle"],
      [K.CUES.turn, 640, "sine"],
      [K.CUES.recycle, 300, "triangle"],
      [K.CUES.lift, 720, "sine"],
      [K.CUES.drop, 560, "triangle"],
      [K.CUES.reject, 180, "sawtooth"],
      [K.CUES.flip, 820, "sine"],
      [K.CUES.home, 980, "triangle"],
      [K.CUES.launch, 420, "sawtooth"],
      [K.CUES.win, 1040, "triangle"],
    ] as const)
      api.audio.define(name, { freq, wave, durationMs: 120, gain: 0.12 });
    for (const [name, src] of [
      ["screen", (s: DeepReadonly<CascadeState>) => s.screen],
      ["mode", (_s: DeepReadonly<CascadeState>) => K.DEAL_MODE],
      ["stock", (s: DeepReadonly<CascadeState>) => `Stock ${s.stock.length}`],
      ["waste", (s: DeepReadonly<CascadeState>) => `Waste ${s.waste.length}`],
      ...Array.from(
        { length: 4 },
        (_, i) =>
          [
            `foundation ${i + 1}`,
            (s: DeepReadonly<CascadeState>) =>
              `F${i + 1} ${s.foundations[i]!.length}`,
          ] as const,
      ),
      ...Array.from(
        { length: 7 },
        (_, i) =>
          [
            `column ${i + 1}`,
            (s: DeepReadonly<CascadeState>) =>
              `C${i + 1} ${s.tableau[i]!.length}`,
          ] as const,
      ),
      [
        "hand",
        (s: DeepReadonly<CascadeState>) => `Hand ${s.drag?.cards.length ?? 0}`,
      ],
      [
        "cascade",
        (s: DeepReadonly<CascadeState>) =>
          s.screen === "won"
            ? `Launched ${s.launched}/52 · ${s.flyers.length} flying`
            : "Cascade idle",
      ],
    ] as const)
      api.diagnostics.register(name, src as never);
    for (const name of [K.MENU_UP, K.MENU_DOWN, K.MENU_CONFIRM, K.MENU_BACK])
      api.input.register(name, { keys: [...K.MENU_BINDINGS[name]!] });
    return [empty(), freshDebug()];
  },
  update(input: DeepReadonly<CascadeState>, api: UpdateApi, dt: number) {
    let s = { ...input, simTime: input.simTime + dt };
    const cues = new Set<string>();
    s = { ...s, muted: api.audio.muted() };
    const ups = api.input.pressed(K.MENU_UP),
      downs = api.input.pressed(K.MENU_DOWN),
      confirm = api.input.pressed(K.MENU_CONFIRM),
      back = api.input.pressed(K.MENU_BACK);
    if (s.screen !== "won") {
      const count =
        s.screen === "title"
          ? 2
          : s.screen === "playing"
            ? 3
            : s.screen === "howto"
              ? 1
              : 0;
      if (ups) s = { ...s, menuIndex: (s.menuIndex + count - 1) % count };
      else if (downs) s = { ...s, menuIndex: (s.menuIndex + 1) % count };
      else if (confirm || (back && s.screen === "howto"))
        s = activateMenu(s, s.menuIndex, api);
    }
    for (const sample of api.input.pointerSamples()) {
      if (!sample.primary) continue;
      if (sample.type === "down") s = down(s, sample.x, sample.y);
      else if (sample.type === "move") s = movePointer(s, sample.x, sample.y);
      else s = up(s, sample.x, sample.y);
    }
    if (s.screen === "won") {
      let flyers = [...s.flyers].map((f) => {
        const vy = f.vy + K.GRAVITY * dt;
        const x = f.x + f.vx * dt;
        let y = f.y + vy * dt,
          nv = vy;
        if (y >= K.FLOOR_Y && vy > 0) {
          y = K.FLOOR_Y;
          nv = -vy * K.BOUNCE_DAMP;
        }
        return { ...f, x, y, vy: nv };
      });
      if (s.trailPainting)
        s = { ...s, trailStamps: s.trailStamps + flyers.length };
      flyers = flyers.filter((f) => f.x + K.CARD_W >= 0 && f.x <= 1280);
      let clock = s.launchClock + (s.launching ? dt : 0),
        launched = s.launched;
      while (s.launching && clock >= K.LAUNCH_INTERVAL && launched < 52) {
        clock -= K.LAUNCH_INTERVAL;
        let fi = launched % 4;
        while (
          !s.foundations[fi]!.length &&
          s.foundations.some((a) => a.length)
        )
          fi = (fi + 1) % 4;
        const f = s.foundations[fi]!,
          c = f[f.length - 1];
        if (!c) break;
        s = {
          ...s,
          foundations: s.foundations.map((a, i) =>
            i === fi ? a.slice(0, -1) : a,
          ),
        };
        flyers.push({
          id: c.id,
          suit: c.suit,
          rank: c.rank,
          x: K.FOUNDATION_X[fi]!,
          y: 24,
          vx: freshDebug().drawLaunchVx(),
          vy: K.LAUNCH_VY,
        });
        launched++;
        cues.add(K.CUES.launch);
      }
      const done = launched === 52 && flyers.length === 0;
      s = { ...s, flyers, launchClock: clock, launched, cascadeDone: done };
    }
    for (const cue of cues) api.audio.play(cue);
    return s;
  },
  render(readonlyState: DeepReadonly<CascadeState>, api: RenderApi) {
    const s = readonlyState,
      ctx = api.ctx as CanvasRenderingContext2D;
    drawTable(s, ctx);
    if (s.screen === "title" || s.screen === "howto") {
      ctx.fillStyle = "rgba(5,24,23,.82)";
      ctx.fillRect(0, 0, 1280, 720);
      if (s.screen === "title") {
        ctx.fillStyle = "#ead8a6";
        ctx.textAlign = "center";
        ctx.font = "bold 74px Georgia";
        ctx.fillText(K.TITLE_TEXT, 640, 214);
        ctx.font = "20px sans-serif";
        ctx.fillText(K.TAGLINE_TEXT, 640, 254);
        ctx.font = "bold 15px sans-serif";
        ctx.fillStyle = "#d8c58f";
        ctx.fillText(K.DEAL_MODE_LABEL, 640, 310);
        K.TITLE_ITEMS.forEach((v, i) => {
          const r = rectFor(s, i)!;
          ctx.fillStyle = s.menuIndex === i ? "#dfc374" : "#244e3d";
          ctx.fillRect(r.x, r.y, r.w, r.h);
          ctx.fillStyle = "#f5efd9";
          ctx.font = "bold 17px sans-serif";
          ctx.fillText(v, 640, r.y + 32);
        });
        ctx.font = "14px sans-serif";
        ctx.fillStyle = "#b7cdb9";
        ctx.fillText(
          "A patient game of color, sequence, and momentum",
          640,
          570,
        );
      } else {
        ctx.fillStyle = "#ead8a6";
        ctx.textAlign = "center";
        ctx.font = "bold 40px Georgia";
        ctx.fillText("HOW TO PLAY", 640, 125);
        ctx.textAlign = "left";
        ctx.font = "20px sans-serif";
        ctx.fillStyle = "#f4f0e1";
        [
          "Build each foundation from ACE to KING, one suit at a time.",
          "In columns, build down in rank and alternate red and black.",
          "Only a KING can fill an empty column.",
          "Turn the STOCK to reveal cards; recycle when it runs out.",
          "Drag a card or run to move it. DOUBLE-CLICK a playable card to send it home.",
        ].forEach((t, i) => ctx.fillText(t, 210, 230 + i * 58));
        const r = rectFor(s, 0)!;
        ctx.fillStyle = "#d6b867";
        ctx.fillRect(r.x, r.y, r.w, r.h);
        ctx.fillStyle = "#172c24";
        ctx.textAlign = "center";
        ctx.font = "bold 16px sans-serif";
        ctx.fillText(K.HOWTO_BACK_LABEL, 640, r.y + 32);
      }
    } else if (s.screen === "won") {
      for (const f of s.flyers) cardDraw(ctx, f, f.x, f.y);
      if (s.cascadeDone) {
        ctx.fillStyle = "rgba(8,35,29,.75)";
        ctx.fillRect(360, 280, 560, 140);
        ctx.fillStyle = "#f3dda1";
        ctx.textAlign = "center";
        ctx.font = "bold 48px Georgia";
        ctx.fillText(K.WIN_TEXT, 640, 355);
        ctx.font = "16px sans-serif";
        ctx.fillText("TAP OR CLICK TO DEAL AGAIN", 640, 393);
      }
    }
  },
};
