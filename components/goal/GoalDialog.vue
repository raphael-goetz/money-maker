<template>
    <div
        class="bg-white rounded-2xl p-6 text-center flex flex-col gap-2 justify-center"
    >
        <Toast />

        <Form
            v-slot="{ errors }"
            :initialValues="initialValues"
            :resolver="resolver"
            @submit="onFormSubmit"
            class="flex flex-col gap-4 w-full"
        >
            <!-- Goal Name -->
            <div class="flex flex-col gap-1">
                <InputText
                    v-model="formData.goalName"
                    name="goalName"
                    mode="text"
                    placeholder="New Goal"
                    class="bg-white text-black"
                    input-class="bg-white text-black"
                    fluid
                />
                <Message
                    v-if="errors?.goalName"
                    severity="error"
                    size="small"
                    variant="simple"
                >
                    {{ errors.goalName?.[0]?.message }}
                </Message>
            </div>

            <!-- Target Amount -->
            <div class="flex flex-col gap-1">
                <InputNumber
                    v-model="formData.amount"
                    name="amount"
                    mode="currency"
                    currency="EUR"
                    locale="de-DE"
                    placeholder="Target Amount"
                    class="bg-white text-black"
                    input-class="bg-white text-black"
                    fluid
                />
                <Message
                    v-if="errors?.amount"
                    severity="error"
                    size="small"
                    variant="simple"
                >
                    {{ errors.amount?.[0]?.message }}
                </Message>
            </div>

            <!-- Allocation Type -->
            <div class="flex flex-col gap-1">
                <SelectButton
                    v-model="formData.allocationType"
                    :options="ALLOCATION_TYPES"
                    optionLabel="label"
                    optionValue="value"
                    class="bg-white text-black"
                />
                <Message
                    v-if="errors?.allocationType"
                    severity="error"
                    size="small"
                    variant="simple"
                >
                    {{ errors.allocationType?.[0]?.message }}
                </Message>
            </div>

            <!-- Allocation Value -->
            <div class="flex flex-col gap-1">
                <InputNumber
                    v-model="formData.allocationValue"
                    name="allocationValue"
                    :mode="allocationInputMode"
                    :currency="
                        formData.allocationType.includes('amount')
                            ? 'EUR'
                            : undefined
                    "
                    :locale="
                        formData.allocationType.includes('amount')
                            ? 'de-DE'
                            : undefined
                    "
                    :suffix="
                        formData.allocationType.includes('percentage')
                            ? '%'
                            : undefined
                    "
                    :placeholder="allocationPlaceholder"
                    :min="0"
                    :max="
                        formData.allocationType.includes('percentage')
                            ? 100
                            : undefined
                    "
                    class="bg-white text-black"
                    input-class="bg-white text-black"
                    fluid
                />
                <Message
                    v-if="errors?.allocationValue"
                    severity="error"
                    size="small"
                    variant="simple"
                >
                    {{ errors.allocationValue?.[0]?.message }}
                </Message>
            </div>

            <Button
                type="submit"
                label="Submit"
                class="bg-white text-black"
                severity="secondary"
            />
        </Form>
    </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useToast } from "primevue/usetoast";

const toast = useToast();

// Props
const props = defineProps({
    onGoalAdd: {
        type: Function,
        required: true,
    },
});

// Constants
const ALLOCATION_TYPES = [
    { label: "Percentage", value: "percentage" },
    { label: "Fixed Amount", value: "amount" },
];

// Form data
const formData = reactive({
    goalName: "",
    amount: null,
    allocationType: [],
    allocationValue: null,
});

// Initial values for form
const initialValues = {
    goalName: formData.goalName,
    amount: formData.amount,
    allocationType: formData.allocationType,
    allocationValue: formData.allocationValue,
};

// Computed properties for allocation input
const allocationInputMode = computed(() => {
    return formData.allocationType.includes("amount") ? "currency" : "decimal";
});

const allocationPlaceholder = computed(() => {
    if (
        formData.allocationType.includes("percentage") &&
        formData.allocationType.includes("amount")
    ) {
        return "Percentage and/or fixed amount";
    } else if (formData.allocationType.includes("percentage")) {
        return "Percentage of monthly income";
    } else if (formData.allocationType.includes("amount")) {
        return "Fixed monthly amount";
    }
    return "Select allocation type first";
});

// Form validation
const resolver = ({ values }) => {
    const errors = {};

    if (!values.goalName?.trim()) {
        errors.goalName = [{ message: "Goal name is required." }];
    }

    if (!values.amount || values.amount <= 0) {
        errors.amount = [
            {
                message:
                    "Target amount is required and must be greater than 0.",
            },
        ];
    }

    if (!values.allocationType || values.allocationType.length === 0) {
        errors.allocationType = [
            { message: "At least one allocation type is required." },
        ];
    }

    if (!values.allocationValue || values.allocationValue <= 0) {
        errors.allocationValue = [
            {
                message:
                    "Allocation value is required and must be greater than 0.",
            },
        ];
    } else if (
        values.allocationType.includes("percentage") &&
        values.allocationValue > 100
    ) {
        errors.allocationValue = [
            { message: "Percentage cannot exceed 100%." },
        ];
    }

    return { values, errors };
};

// Form submission
const onFormSubmit = ({ valid }) => {
    if (!valid) return;

    toast.add({
        severity: "success",
        summary: "Goal submitted.",
        life: 3000,
    });

    // Call the onGoalAdd function with current form data
    props.onGoalAdd({
        name: formData.goalName,
        amount: formData.amount,
        allocationType: formData.allocationType,
        allocationValue: formData.allocationValue,
    });

    // Reset form
    resetForm();
};

// Reset form to initial state
const resetForm = () => {
    formData.goalName = "";
    formData.amount = null;
    formData.allocationType = [];
    formData.allocationValue = null;
};
</script>
