const DIFFICULTY_ORDER = { Easy: 0, Medium: 1, Hard: 2 };

export function sortProblems(problems, sortOption) {
    const sorted = [...problems];

    switch (sortOption) {
        case "date-desc":
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
        case "date-asc":
            sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            break;
        case "difficulty-asc":
            sorted.sort((a, b) => DIFFICULTY_ORDER[a.difficulty] - DIFFICULTY_ORDER[b.difficulty]);
            break;
        case "difficulty-desc":
            sorted.sort((a, b) => DIFFICULTY_ORDER[b.difficulty] - DIFFICULTY_ORDER[a.difficulty]);
            break;
        default:
            break;
    }

    return sorted;
}