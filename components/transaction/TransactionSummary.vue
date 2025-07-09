<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <!-- Income Card -->
        <div
            class="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-xl transition-all duration-300 rounded-lg"
        >
            <div
                class="flex flex-row items-center justify-between space-y-0 p-6 pb-3"
            >
                <h3 class="text-sm font-semibold text-green-700">
                    Total Income
                </h3>
                <div class="p-2 bg-green-100 rounded-lg">
                    <TrendingUp class="text-green-600" :size="16" />
                </div>
            </div>
            <div class="px-6 pb-6">
                <div class="text-3xl font-bold text-green-700">
                    {{ totalIncome.toFixed(2) }}€
                </div>
                <p class="text-sm text-green-600 mt-1">All time earnings</p>
            </div>
        </div>

        <!-- Expense Card -->
        <div
            class="border-0 shadow-lg bg-gradient-to-br from-red-50 to-rose-50 hover:shadow-xl transition-all duration-300 rounded-lg"
        >
            <div
                class="flex flex-row items-center justify-between space-y-0 p-6 pb-3"
            >
                <h3 class="text-sm font-semibold text-red-700">
                    Total Expense
                </h3>
                <div class="p-2 bg-red-100 rounded-lg">
                    <TrendingDown class="text-red-600" :size="16" />
                </div>
            </div>
            <div class="px-6 pb-6">
                <div class="text-3xl font-bold text-red-700">
                    {{ totalExpense.toFixed(2) }}€
                </div>
                <p class="text-sm text-red-600 mt-1">All time spending</p>
            </div>
        </div>

        <!-- Balance Card -->
        <div
            class="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-all duration-300 rounded-lg"
        >
            <div
                class="flex flex-row items-center justify-between space-y-0 p-6 pb-3"
            >
                <h3 class="text-sm font-semibold text-blue-700">Net Balance</h3>
                <div class="p-2 bg-blue-100 rounded-lg">
                    <Scale class="text-blue-600" :size="16" />
                </div>
            </div>
            <div class="px-6 pb-6">
                <div
                    :class="
                        balance >= 0
                            ? 'text-3xl font-bold text-blue-700'
                            : 'text-3xl font-bold text-red-700'
                    "
                >
                    {{ Math.abs(balance).toFixed(2) }}€
                </div>
                <p
                    :class="
                        balance >= 0
                            ? 'text-sm mt-1 text-blue-600'
                            : 'text-sm mt-1 text-red-600'
                    "
                >
                    {{ balance >= 0 ? "Positive balance" : "Negative balance" }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { TrendingUp, TrendingDown, Scale } from "lucide-vue-next";

const props = defineProps({
    totalIncome: Number,
    totalExpense: Number,
    balance: Number,
});
</script>
