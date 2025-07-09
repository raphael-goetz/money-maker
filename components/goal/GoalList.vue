<template>
    <div
        class="w-full border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 rounded-lg"
    >
        <div
            class="w-full flex justify-between items-center bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg p-6"
        >
            <div>
                <h3 class="flex items-center gap-3 text-xl font-semibold">
                    <div class="p-2 bg-white/20 rounded-lg">
                        <Flag :size="16" />
                    </div>
                    Savings Goals
                </h3>
                <p class="text-emerald-100 mt-1">
                    Set and track your financial milestones
                </p>
            </div>
            <Button
                label="Add Goal"
                @click="visible = true"
                class="bg-white/20 hover:bg-white/30 border-white/30 text-white"
            />
        </div>
        <div class="p-6">
            <div class="space-y-6">
                <!-- Goals List -->
                <div class="space-y-4">
                    <div
                        v-for="goal in goals"
                        :key="goal.id"
                        :class="getGoalCardClass(goal)"
                        class="rounded-xl p-6 border"
                    >
                        <div class="flex justify-between items-center mb-3">
                            <h4
                                class="font-semibold flex items-center gap-2"
                                :class="getGoalTextClass(goal)"
                            >
                                {{ goal.emoji }} {{ goal.name }}
                            </h4>
                            <span
                                class="text-sm font-semibold px-3 py-1 rounded-full"
                                :class="getGoalBadgeClass(goal)"
                            >
                                €{{ goal.currentAmount }} / €{{
                                    goal.targetAmount
                                }}
                            </span>
                        </div>
                        <div
                            class="w-full rounded-full h-3 mb-3 overflow-hidden"
                            :class="getGoalProgressBgClass(goal)"
                        >
                            <div
                                class="h-3 rounded-full shadow-sm transition-all duration-500"
                                :class="getGoalProgressClass(goal)"
                                :style="{
                                    width: getProgressPercentage(goal) + '%',
                                }"
                            ></div>
                        </div>
                        <div class="flex justify-between items-center">
                            <div
                                class="text-sm font-medium"
                                :class="getGoalTextClass(goal)"
                            >
                                📅 {{ getTimeToGoal(goal) }}
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-if="goals.length === 0" class="text-center py-12">
                    <div
                        class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                        <i class="pi pi-flag h-8 w-8 text-gray-400"></i>
                    </div>
                    <p class="text-gray-500 text-lg">No savings goals yet</p>
                    <p class="text-gray-400 text-sm mt-1">
                        Create your first goal to start saving!
                    </p>
                </div>
            </div>
        </div>

        <Dialog
            v-model:visible="visible"
            modal
            header="Add New Goal"
            class="bg-white text-black w-[40%]"
        >
            <GoalDialog :onGoalAdd="handleGoalAdd" />
        </Dialog>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Flag } from "lucide-vue-next";

const props = defineProps({
    currentBalance: {
        type: Number,
        default: 0,
    },
});
const visible = ref(false);

const goals = ref([]);
const newGoal = ref({
    name: "",
    targetAmount: null,
});

const goalEmojis = ["🏦", "✈️", "🏠", "🚗", "🎓", "💍", "🏖️", "💻", "📱", "🎮"];

const addGoal = () => {
    if (!newGoal.value.name || !newGoal.value.targetAmount) return;

    const goal = {
        id: Date.now(),
        name: newGoal.value.name,
        targetAmount: parseFloat(newGoal.value.targetAmount),
        currentAmount: 0,
        emoji: goalEmojis[Math.floor(Math.random() * goalEmojis.length)],
        createdAt: new Date().toISOString(),
    };

    goals.value.push(goal);
    saveGoals();

    // Reset form
    newGoal.value = {
        name: "",
        targetAmount: null,
    };
};

const updateGoalAmount = (goal, amount) => {
    const newAmount = Math.max(0, goal.currentAmount + amount);
    goal.currentAmount = Math.min(newAmount, goal.targetAmount);
    saveGoals();
};

const getProgressPercentage = (goal) => {
    return Math.min((goal.currentAmount / goal.targetAmount) * 100, 100);
};

const getTimeToGoal = (goal) => {
    const remaining = goal.targetAmount - goal.currentAmount;
    if (remaining <= 0) return "🎉 Goal achieved!";

    const monthlySavings = 200; // Assumption for demo
    const monthsToGoal = Math.ceil(remaining / monthlySavings);

    if (monthsToGoal === 1) return "~1 month to reach goal";
    if (monthsToGoal < 12) return `~${monthsToGoal} months to reach goal`;

    const years = Math.floor(monthsToGoal / 12);
    const months = monthsToGoal % 12;
    return `~${years} year${years > 1 ? "s" : ""}${months > 0 ? ` ${months} month${months > 1 ? "s" : ""}` : ""} to reach goal`;
};

const getGoalCardClass = (goal) => {
    const progress = getProgressPercentage(goal);
    if (progress >= 100)
        return "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200";
    if (progress >= 75)
        return "bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200";
    if (progress >= 50)
        return "bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200";
    return "bg-gradient-to-r from-red-50 to-pink-50 border-red-200";
};

const getGoalTextClass = (goal) => {
    const progress = getProgressPercentage(goal);
    if (progress >= 100) return "text-green-900";
    if (progress >= 75) return "text-blue-900";
    if (progress >= 50) return "text-yellow-900";
    return "text-red-900";
};

const getGoalBadgeClass = (goal) => {
    const progress = getProgressPercentage(goal);
    if (progress >= 100) return "text-green-700 bg-green-100";
    if (progress >= 75) return "text-blue-700 bg-blue-100";
    if (progress >= 50) return "text-yellow-700 bg-yellow-100";
    return "text-red-700 bg-red-100";
};

const getGoalProgressBgClass = (goal) => {
    const progress = getProgressPercentage(goal);
    if (progress >= 100) return "bg-green-200";
    if (progress >= 75) return "bg-blue-200";
    if (progress >= 50) return "bg-yellow-200";
    return "bg-red-200";
};

const getGoalProgressClass = (goal) => {
    const progress = getProgressPercentage(goal);
    if (progress >= 100) return "bg-gradient-to-r from-green-500 to-green-600";
    if (progress >= 75) return "bg-gradient-to-r from-blue-500 to-blue-600";
    if (progress >= 50) return "bg-gradient-to-r from-yellow-500 to-yellow-600";
    return "bg-gradient-to-r from-red-500 to-red-600";
};

const saveGoals = () => {
    localStorage.setItem("savingsGoals", JSON.stringify(goals.value));
};

const loadGoals = () => {
    const saved = localStorage.getItem("savingsGoals");
    if (saved) {
        goals.value = JSON.parse(saved);
    } else {
        // Add some sample goals for demo
        goals.value = [
            {
                id: 1,
                name: "Emergency Fund",
                targetAmount: 10000,
                currentAmount: 2000,
                emoji: "🏦",
                createdAt: new Date().toISOString(),
            },
            {
                id: 2,
                name: "Vacation Fund",
                targetAmount: 3000,
                currentAmount: 800,
                emoji: "✈️",
                createdAt: new Date().toISOString(),
            },
        ];
    }
};

onMounted(() => {
    loadGoals();
});
</script>
