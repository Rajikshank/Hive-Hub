import arcjet, { detectBot, shield } from "./arcjet";

export const aj=arcjet.withRule(
  shield({mode:"LIVE"}),
 
).withRule(detectBot({mode:"LIVE",
  allow:[]
}))