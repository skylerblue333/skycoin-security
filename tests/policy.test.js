const assert = require("node:assert/strict");
const { evaluatePolicy, normalizeRule } = require("../dist/policy/engine.js");

const rules = [
  { id: "allow-reader", effect: "allow", principals: ["user:alice"], actions: ["doc:read"], resources: ["doc:public"], priority: 10 },
  { id: "deny-sensitive", effect: "deny", principals: ["*"], actions: ["doc:read"], resources: ["doc:sensitive"], priority: 100 },
  { id: "allow-sensitive", effect: "allow", principals: ["user:alice"], actions: ["doc:read"], resources: ["doc:sensitive"], priority: 100 },
];

assert.deepEqual(evaluatePolicy({ principal: "user:alice", action: "doc:read", resource: "doc:public" }, rules), {
  allowed: true,
  effect: "allow",
  matchedRuleId: "allow-reader",
  reason: "matched-rule",
  enforcementPerformed: false,
});

const denied = evaluatePolicy({ principal: "user:alice", action: "doc:read", resource: "doc:sensitive" }, rules);
assert.equal(denied.allowed, false);
assert.equal(denied.matchedRuleId, "deny-sensitive", "deny wins an equal-priority conflict");

const fallback = evaluatePolicy({ principal: "user:bob", action: "doc:write", resource: "doc:public" }, rules);
assert.deepEqual(fallback, { allowed: false, effect: "deny", matchedRuleId: null, reason: "default-deny", enforcementPerformed: false });

assert.deepEqual(normalizeRule({ id: "r1", effect: "allow", principals: ["user:b", "user:a", "user:a"], actions: ["read"], resources: ["*"] }), {
  id: "r1", effect: "allow", principals: ["user:a", "user:b"], actions: ["read"], resources: ["*"], priority: 0,
});

assert.throws(() => evaluatePolicy({ principal: "bad token", action: "read", resource: "doc" }, []), /bounded policy token/);
assert.throws(() => evaluatePolicy({ principal: "user:a", action: "read", resource: "doc" }, [
  { id: "same", effect: "allow", principals: ["*"], actions: ["*"], resources: ["*"] },
  { id: "same", effect: "deny", principals: ["*"], actions: ["*"], resources: ["*"] },
]), /duplicate rule id/);
assert.throws(() => normalizeRule({ id: "r", effect: "allow", principals: [], actions: ["read"], resources: ["doc"] }), /1-64/);

console.log("SkyPolicy contract tests passed");
