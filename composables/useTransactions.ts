// composables/useTransactions.ts
import { ref, computed } from "vue";

type Transaction = {
  id: string;
  type: "income" | "expense";
  amount: number;
};

export const useTransactions = () => {
  const transactions = ref([]);

  const fetchTransactions = async () => {
    const res = await $fetch("/api/transactions/get");
    transactions.value = res;
  };

  const addTransaction = async (transaction: Transaction) => {
    await $fetch("/api/transactions/post", {
      method: "POST",
      body: transaction,
    });
    await fetchTransactions();
  };

  const totalIncome = computed(() =>
    transactions.value
      .filter((t: Transaction) => t.type === "income")
      .reduce((a, t: Transaction) => a + t.amount, 0),
  );
  const totalExpense = computed(() =>
    transactions.value
      .filter((t: Transaction) => t.type === "expense")
      .reduce((a, t: Transaction) => a + t.amount, 0),
  );
  const balance = computed(() => totalIncome.value - totalExpense.value);

  return {
    transactions,
    totalIncome,
    totalExpense,
    balance,
    fetchTransactions,
    addTransaction,
  };
};
