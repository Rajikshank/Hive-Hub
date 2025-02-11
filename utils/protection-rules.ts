import arcjet, { detectBot, shield } from "./arcjet";

export const aj=arcjet.withRule(
  shield({mode:"DRY_RUN"}),
 
).withRule(detectBot({mode:"DRY_RUN",
  allow:[]
}))