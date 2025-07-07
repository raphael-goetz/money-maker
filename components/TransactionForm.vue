<template>
    <div
        class="outline-solid outline outline-2 outline-gray-300 bg-white rounded-2xl p-6 text-center card flex flex-col gap-2 justify-center"
    >
        <Toast />
        <H2 class="text-gray-600 text-lg font-semibold mb-2"
            >Create Transaction</H2
        >
        <Form
            v-slot="$form"
            :initialValues
            :resolver
            @submit="onFormSubmit"
            class="flex flex-col gap-4 w-full sm:w-56"
        >
            <div class="flex flex-col gap-1">
                <Dropdown
                    class="bg-white text-black"
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
            <div class="flex flex-col gap-1">
                <Dropdown
                    class="bg-white text-black"
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
            <div class="flex flex-col gap-1">
                <InputNumber
                    class="bg-white text-black"
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
            { label: "Bonus", value: "bonus" },
            { label: "Investment", value: "investment" },
        ];
    } else {
        return [
            { label: "Rent", value: "rent" },
            { label: "Groceries", value: "groceries" },
            { label: "Entertainment", value: "entertainment" },
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
