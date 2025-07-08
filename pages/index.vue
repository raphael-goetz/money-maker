<template>
    <div className="min-h-screen flex bg-gray-50 items-center justify-center">
        <div className="max-w-screen-xl mx-auto w-full py-12 px-6 xl:px-0">
            <div className="text-center space-y-2">
                <h1 className="text-5xl font-bold text-gray-900">
                    Income & Expense Tracker
                </h1>
                <p className="text-2xl text-gray-600">
                    Track your finances and monitor your account balance over
                    time
                </p>
            </div>
            <div class="flex flex-col gap-4">
                <TransactionSummary
                    :totalIncome="totalIncome"
                    :totalExpense="totalExpense"
                    :balance="balance"
                />
                <TransactionList :transactions="transactions" />
                <SavingsGoals :currentBalance="balance" />
            </div>
        </div>
    </div>
</template>

<script setup>
import TransactionSummary from "../components/TransactionSummary.vue";
import TransactionList from "../components/TransactionList.vue";
import { useTransactions } from "../composables/useTransactions.ts";

const {
    transactions,
    totalIncome,
    totalExpense,
    balance,
    fetchTransactions,
    addTransaction,
} = useTransactions();

const handleAdd = async (t) => {
    console.log(t);
    await addTransaction(t);
};

fetchTransactions();
</script>
