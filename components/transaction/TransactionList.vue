<template>
    <div class="w-full">
        <!-- Current Month Transactions -->
        <div
            class="border-0 shadow-xl bg-white/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 rounded-lg"
        >
            <div
                class="bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-t-lg p-6"
            >
                <div class="flex justify-between items-center">
                    <div>
                        <h3
                            class="flex items-center gap-3 text-xl font-semibold"
                        >
                            <div class="p-2 bg-white/20 rounded-lg">
                                <History :size="16" />
                            </div>
                            This Month's Activity
                        </h3>
                        <p class="text-blue-100 mt-1">
                            All transactions for this month
                        </p>
                    </div>
                    <Button
                        label="Add Transaction"
                        @click="visible = true"
                        class="bg-white/20 hover:bg-white/30 border-white/30 text-white"
                    />
                </div>
            </div>

            <div class="p-6">
                <div
                    v-if="!transactions || transactions.length === 0"
                    class="text-center py-12"
                >
                    <div
                        class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                        <i class="pi pi-calendar h-8 w-8 text-gray-400"></i>
                    </div>
                    <p class="text-gray-500 text-lg">
                        No transactions this month yet
                    </p>
                    <p class="text-gray-400 text-sm mt-1">
                        Add your first transaction to get started!
                    </p>
                </div>

                <div v-else class="space-y-3 max-h-96 overflow-y-auto pr-2">
                    <div
                        v-for="transaction in transactions"
                        :key="transaction.id"
                        class="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200"
                    >
                        <div class="flex items-center gap-4">
                            <span
                                :class="
                                    transaction.type === 'income'
                                        ? 'px-3 py-1 font-semibold bg-green-100 text-green-700 hover:bg-green-200 rounded-full text-sm'
                                        : 'px-3 py-1 font-semibold bg-red-100 text-red-700 hover:bg-red-200 rounded-full text-sm'
                                "
                            >
                                {{
                                    transaction.type === "income" ? "💰" : "💸"
                                }}
                                {{ transaction.type }}
                            </span>
                            <div>
                                <div class="font-semibold text-gray-900">
                                    {{ transaction.topic }}
                                </div>
                                <div
                                    v-if="transaction.description"
                                    class="text-sm text-gray-600 mt-1"
                                >
                                    {{ transaction.description }}
                                </div>
                                <div class="text-xs text-gray-500 mt-1">
                                    {{ formatDate(transaction.date) }}
                                </div>
                            </div>
                        </div>
                        <div
                            :class="
                                transaction.type === 'income'
                                    ? 'font-bold text-lg text-green-600'
                                    : 'font-bold text-lg text-red-600'
                            "
                        >
                            {{ transaction.type === "income" ? "+" : "-"
                            }}{{ transaction.amount.toFixed(2) }}€
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Add Transaction Dialog -->
        <Dialog
            v-model:visible="visible"
            modal
            header="Add New Transaction"
            class="bg-white text-black w-[40%]"
        >
            <TransactionDialog :onAdd="handleAdd" />
        </Dialog>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { History } from "lucide-vue-next";
import TransactionDialog from "./TransactionDialog.vue";

const props = defineProps({
    transactions: Array,
    onAdd: {
        type: Function,
        required: true,
    },
});

const visible = ref(false);

const handleAdd = (transaction) => {
    props.onAdd(transaction);
    visible.value = false;
};

const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};
</script>
