<template>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <!-- Income Card -->
        <div class="bg-white outline outline-2 outline-gray-300 rounded-2xl p-6 text-center">
            <h4 class="text-gray-600 text-lg font-semibold mb-2">
                Total Income
                <i class="pi pi-angle-double-up text-green-600"></i>
            </h4>
            <div
                class="text-green-600 text-2xl font-bold flex justify-center items-center gap-2"
            >
                {{ totalIncome.toFixed(2) }}€
            </div>
        </div>

        <!-- Expense Card -->
        <div class="outline-solid outline outline-2 outline-gray-300 bg-white rounded-2xl p-6 text-center">
            <h4 class="text-gray-600 text-lg font-semibold mb-2">
                Total Expense
                <i class="pi pi-angle-double-down text-red-600"></i>
            </h4>
            <div
                class="text-red-600 text-2xl font-bold flex justify-center items-center gap-2"
            >
                {{ totalExpense.toFixed(2) }}€
            </div>
        </div>

        <!-- Balance Card -->
        <div class="bg-white outline outline-2 outline-gray-300 rounded-2xl p-6 text-center">
            <h4 class="text-gray-600 text-lg font-semibold mb-2">
                Balance
                <i
                :class="balance >= 0 ? 'text-green-600 pi pi-credit-card' : 'text-red-600 pi pi-credit-card'"
                </i>
            </h4>
            <div
                :class="balance >= 0 ? 'text-green-600' : 'text-red-600'"
                class="text-2xl font-bold flex justify-center items-center gap-2"
            >
                {{ balance.toFixed(2) }}€
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    totalIncome: Number,
    totalExpense: Number,
    balance: Number,
});
</script>
