export function filterProblems(problems, difficulty) {
    if (difficulty === "all") return problems;
    return problems.filter((p) => p.difficulty === difficulty);
}