import { ref, computed } from "vue";

type Goal = {
  name: string;
  amount: number;
};

export const useGoals = () => {
  const goals = ref<Goal[]>([]);

  const fetchGoals = async () => {
    const res = await $fetch("/api/goals/get");
    goals.value = res;
  };

  const addGoal = async (goal: Goal) => {
    await $fetch("/api/goals/get", {
      method: "POST",
      body: goal,
    });
    await fetchGoals();
  };

  return {
    goals,
    fetchGoals,
    addGoal,
  };
};
