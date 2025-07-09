<template>
    <div
        class="w-full rounded-2xl p-6 text-center flex flex-col gap-2 justify-center"
    >
        <Toast />

        <Form
            v-slot="$form"
            :initialValues
            :resolver
            @submit="onFormSubmit"
            class="flex flex-col gap-4 w-full"
        >
            <div
                class="w-full justify-between flex flex-row text-left items-center gap-1"
            >
                <label for="type" class="font-semibold w-24">Type</label>
                <div class="flex flex-col">
                    <Dropdown
                        id="type"
                        class="bg-white text-black w-80"
                        input-class="text-black"
                        v-model="type"
                        :options="types"
                        optionLabel="label"
                        optionValue="value"
                        required
                    />
                    <Message
                        v-if="$form.type?.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                        >{{ $form.type.error?.message }}</Message
                    >
                </div>
            </div>
            <div
                class="flex flex-row justify-between items-center text-left gap-1"
            >
                <label for="topic" class="font-semibold w-24">Topic</label>
                <div class="flex flex-col">
                    <Dropdown
                        id="topic"
                        class="bg-white text-black w-80 dropdown"
                        input-class="text-black"
                        v-model="topic"
                        :options="topics"
                        optionLabel="label"
                        optionValue="value"
                        required
                    />
                    <Message
                        v-if="$form.topic?.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                        >{{ $form.topic.error?.message }}</Message
                    >
                </div>
            </div>
            <div
                class="flex flex-row justify-between items-center text-left gap-1"
            >
                <label for="amount" class="font-semibold w-24">Amount</label>
                <div class="flex flex-col">
                    <InputNumber
                        id="amount"
                        class="bg-white text-black w-80"
                        input-class="bg-white text-black"
                        v-model="amount"
                        name="amount"
                        mode="currency"
                        currency="EUR"
                        locale="de-DE"
                        placeholder="Amount"
                        fluid
                    />
                    <Message
                        v-if="$form.amount?.invalid"
                        severity="error"
                        size="small"
                        variant="simple"
                        >{{ $form.amount.error?.message }}</Message
                    >
                </div>
            </div>
            <Button
                class="bg-white text-black"
                type="submit"
                severity="secondary"
                label="Submit"
            />
        </Form>
    </div>
</template>

<script setup>
import { reactive, ref, computed, watch } from "vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();

// Define props
const props = defineProps({
    onAdd: {
        type: Function,
        required: true,
    },
});

// Separate reactive variables for form fields
const type = ref("income");
const topic = ref("salary");
const amount = ref("");

const initialValues = reactive({
    topic: topic.value,
    type: type.value,
    amount: amount.value,
});

const types = [
    { label: "Income", value: "income" },
    { label: "Expense", value: "expense" },
];

// Topics computed property that depends on the reactive type
const topics = computed(() => {
    if (type.value === "income") {
        return [
            { label: "Salary", value: "salary" },
            { label: "Business Income", value: "business_income" },
            { label: "Freelance Income", value: "freelance_income" },
            { label: "Rental Income", value: "rental_income" },
            { label: "Interest Income", value: "interest_income" },
            { label: "Dividend Income", value: "dividend_income" },
            { label: "Capital Gains", value: "capital_gains" },
            { label: "Gift", value: "gift" },
            { label: "Other Income", value: "other_income" },
        ];
    } else {
        return [
            { label: "Rent", value: "rent" },
            { label: "Utilities", value: "utilities" },
            { label: "Groceries", value: "groceries" },
            { label: "Transportation", value: "transportation" },
            { label: "Insurance", value: "insurance" },
            { label: "Healthcare", value: "healthcare" },
            { label: "Entertainment", value: "entertainment" },
            { label: "Dining Out", value: "dining_out" },
            { label: "Debt Payments", value: "debt_payments" },
            { label: "Savings", value: "savings" },
            { label: "Investments", value: "investments" },
            { label: "Education", value: "education" },
            { label: "Subscriptions", value: "subscriptions" },
            { label: "Other Expenses", value: "other_expenses" },
        ];
    }
});

// Watch for type changes and reset topic to first available option
watch(type, (newType) => {
    const availableTopics = topics.value;
    if (availableTopics.length > 0) {
        topic.value = availableTopics[0].value;
    }
});

const resolver = ({ values }) => {
    const errors = {};
    if (!values.amount) {
        errors.amount = [{ message: "Amount is required." }];
    }
    if (!values.topic) {
        errors.topic = [{ message: "Topic is required." }];
    }
    if (!values.type) {
        errors.type = [{ message: "Type is required." }];
    }
    return {
        values,
        errors,
    };
};

const onFormSubmit = ({ valid }) => {
    console.log(valid);
    if (valid) {
        toast.add({
            severity: "success",
            summary: "Transaction submitted.",
            life: 3000,
        });

        // Call the onAdd function passed as prop
        props.onAdd({
            topic: topic.value,
            type: type.value,
            amount: amount.value,
        });

        // Reset form after successful submission
        type.value = "income";
        topic.value = "salary";
        amount.value = "";
    }
};
</script>
