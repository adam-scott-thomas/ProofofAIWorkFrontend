import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const blog = readFileSync(join(root, "src/marketing/content/blog.ts"), "utf8");
const quiz = readFileSync(join(root, "src/marketing/data/quiz.ts"), "utf8");
const quizLogic = readFileSync(join(root, "src/marketing/lib/quiz.ts"), "utf8");

const blogSlugs = [...blog.matchAll(/slug:\s*"([^"]+)"/g)].map((match) => match[1]);
const quizQuestions = [...quiz.matchAll(/id:\s*"([^"]+)"/g)].map((match) => match[1]);

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(blogSlugs.length >= 5, "Marketing blog needs at least five seed posts.");
assert(new Set(blogSlugs).size === blogSlugs.length, "Blog post slugs must be unique.");
assert(quizQuestions.length >= 8 && quizQuestions.length <= 12, "Primary quiz needs 8 to 12 questions.");
assert(new Set(quizQuestions).size === quizQuestions.length, "Quiz question ids must be unique.");
assert(quizLogic.includes("AI-Native Operator"), "Quiz profiles must include AI-Native Operator.");
assert(quizLogic.includes("Early AI Explorer"), "Quiz profiles must include Early AI Explorer.");

console.log("Marketing content validation passed.");
