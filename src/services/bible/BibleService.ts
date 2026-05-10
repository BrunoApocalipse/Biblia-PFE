import acf from "@/data/bibles/acf.json";
import kjv from "@/data/bibles/en_kjv.json";
import kja from "@/data/bibles/kja.json";
import kjf from "@/data/bibles/kjf.json";
import nbv from "@/data/bibles/nbv.json";
import ntlh from "@/data/bibles/ntlh.json";
import nvi from "@/data/bibles/nvi.json";
import nvt from "@/data/bibles/nvt.json";
import tb from "@/data/bibles/tb.json";

import { normalizeBible } from "./BibleMapper";

const BIBLES: Record<string, any> = {
  nvi,
  acf,
  kjv,
  kja,
  kjf,
  nbv,
  ntlh,
  nvt,
  tb,
};

export function getBible(version: string) {
  const raw = BIBLES[version] ?? BIBLES.nvi;
  return normalizeBible(raw);
}