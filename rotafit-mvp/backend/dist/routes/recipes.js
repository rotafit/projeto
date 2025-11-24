"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const index_1 = require("../index");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
// Load recipes from JSON database
router.get('/', auth_1.authenticateToken, async (req, res) => {
    try {
        // Read the JSON database
        const jsonPath = path_1.default.join(process.cwd(), '../rotafit_complete_database_final.json');
        const recipesData = JSON.parse(fs_1.default.readFileSync(jsonPath, 'utf8'));
        const { category, difficulty, caloriesMin, caloriesMax, prepTime, search, page = 1, limit = 20 } = req.query;
        // Extract recipes from different categories
        let allRecipes = [];
        // Add recipes from each category
        const categories = [
            'shakes_vitaminas', 'cafe_da_manha', 'detox', 'saladas',
            'jantar', 'almoco', 'sopas', 'lanches', 'ceia',
            'termogenicas', 'low_carb', 'sobresmeses_saudaveis'
        ];
        categories.forEach(catKey => {
            if (recipesData[catKey] && Array.isArray(recipesData[catKey])) {
                allRecipes = allRecipes.concat(recipesData[catKey]);
            }
        });
        // Apply filters
        let filteredRecipes = allRecipes;
        if (category) {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.category === category || category === 'all');
        }
        if (difficulty) {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.difficulty === difficulty);
        }
        if (caloriesMin) {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.calories >= parseInt(caloriesMin));
        }
        if (caloriesMax) {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.calories <= parseInt(caloriesMax));
        }
        if (prepTime) {
            filteredRecipes = filteredRecipes.filter(recipe => recipe.prep_time === prepTime);
        }
        if (search) {
            const searchTerm = search.toLowerCase();
            filteredRecipes = filteredRecipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm) ||
                recipe.ingredients.some((ing) => ing.item.toLowerCase().includes(searchTerm)) ||
                recipe.tags.some((tag) => tag.toLowerCase().includes(searchTerm)));
        }
        // Pagination
        const startIndex = (parseInt(page) - 1) * parseInt(limit);
        const endIndex = startIndex + parseInt(limit);
        const paginatedRecipes = filteredRecipes.slice(startIndex, endIndex);
        // Get available filter options
        const categoriesAvailable = categories.filter(cat => recipesData[cat] && Array.isArray(recipesData[cat])).map(cat => ({
            id: cat,
            name: cat.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()),
            count: recipesData[cat]?.length || 0
        }));
        const difficulties = ['fácil', 'médio', 'difícil'];
        const prepTimes = ['< 15min', '15-30min', '> 30min'];
        const calorieRanges = [
            { id: '<200', label: 'Menos de 200 kcal', min: 0, max: 200 },
            { id: '200-400', label: '200-400 kcal', min: 200, max: 400 },
            { id: '400-600', label: '400-600 kcal', min: 400, max: 600 },
            { id: '600-800', label: '600-800 kcal', min: 600, max: 800 },
            { id: '>800', label: 'Mais de 800 kcal', min: 800, max: 9999 }
        ];
        res.json({
            status: 'success',
            data: {
                recipes: paginatedRecipes,
                pagination: {
                    page: parseInt(page),
                    limit: parseInt(limit),
                    total: filteredRecipes.length,
                    pages: Math.ceil(filteredRecipes.length / parseInt(limit))
                },
                filters: {
                    categories: categoriesAvailable,
                    difficulties,
                    prepTimes,
                    calorieRanges
                }
            }
        });
    }
    catch (error) {
        console.error('Error loading recipes:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error loading recipes'
        });
    }
});
// Get single recipe
router.get('/:id', auth_1.authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        // Read the JSON database
        const jsonPath = path_1.default.join(process.cwd(), '../rotafit_complete_database_final.json');
        const recipesData = JSON.parse(fs_1.default.readFileSync(jsonPath, 'utf8'));
        // Find recipe in any category
        let foundRecipe = null;
        const categories = [
            'shakes_vitaminas', 'cafe_da_manha', 'detox', 'saladas',
            'jantar', 'almoco', 'sopas', 'lanches', 'ceia',
            'termogenicas', 'low_carb', 'sobresmeses_saudaveis'
        ];
        for (const catKey of categories) {
            if (recipesData[catKey] && Array.isArray(recipesData[catKey])) {
                foundRecipe = recipesData[catKey].find((recipe) => recipe.id === id);
                if (foundRecipe)
                    break;
            }
        }
        if (!foundRecipe) {
            return res.status(404).json({
                status: 'error',
                message: 'Recipe not found'
            });
        }
        // Get similar recipes (same category, different recipe)
        let similarRecipes = [];
        if (foundRecipe.category) {
            const categoryRecipes = recipesData[foundRecipe.category] || [];
            similarRecipes = categoryRecipes
                .filter((recipe) => recipe.id !== id)
                .slice(0, 4);
        }
        res.json({
            status: 'success',
            data: {
                recipe: foundRecipe,
                similarRecipes
            }
        });
    }
    catch (error) {
        console.error('Error loading recipe:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error loading recipe'
        });
    }
});
// Sync recipes to database (admin function)
router.post('/sync', auth_1.authenticateToken, async (req, res) => {
    try {
        // Read the JSON database
        const jsonPath = path_1.default.join(process.cwd(), '../rotafit_complete_database_final.json');
        const recipesData = JSON.parse(fs_1.default.readFileSync(jsonPath, 'utf8'));
        const categories = [
            'shakes_vitaminas', 'cafe_da_manha', 'detox', 'saladas',
            'jantar', 'almoco', 'sopas', 'lanches', 'ceia',
            'termogenicas', 'low_carb', 'sobresmeses_saudaveis'
        ];
        let totalSynced = 0;
        for (const catKey of categories) {
            if (recipesData[catKey] && Array.isArray(recipesData[catKey])) {
                for (const recipe of recipesData[catKey]) {
                    try {
                        // Check if recipe already exists
                        const existingRecipe = await index_1.prisma.recipe.findUnique({
                            where: { externalId: recipe.id }
                        });
                        if (!existingRecipe) {
                            await index_1.prisma.recipe.create({
                                data: {
                                    externalId: recipe.id,
                                    name: recipe.name,
                                    category: recipe.category,
                                    difficulty: recipe.difficulty,
                                    prepTime: recipe.prep_time,
                                    cookTime: recipe.cook_time || '0',
                                    servings: recipe.servings || 1,
                                    calories: recipe.calories,
                                    ingredients: recipe.ingredients,
                                    instructions: recipe.instructions,
                                    tags: recipe.tags || [],
                                    nutrition: recipe.nutrition,
                                    healthBenefits: recipe.health_benefits || [],
                                    categoryIndex: totalSynced
                                }
                            });
                            totalSynced++;
                        }
                    }
                    catch (recipeError) {
                        console.error(`Error syncing recipe ${recipe.id}:`, recipeError);
                    }
                }
            }
        }
        res.json({
            status: 'success',
            message: `Successfully synced ${totalSynced} recipes to database`,
            data: {
                totalSynced
            }
        });
    }
    catch (error) {
        console.error('Error syncing recipes:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error syncing recipes'
        });
    }
});
exports.default = router;
