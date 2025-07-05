import { TimeTravelingHashmap } from "./TimeTravelingHashmap";

const tth = new TimeTravelingHashmap<string>();
tth.put("foo", 1, "car");
tth.put("foo", 6, "jar");
console.log(tth.get("foo", 1));
console.log(tth.get("foo", 6));
console.log(tth.get("foo", 3));
console.log(tth.get("foo", 8));
