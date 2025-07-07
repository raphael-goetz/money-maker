<template>
    <div>
        <h3>Transactions - This Month</h3>
        <DataTable
            :value="transactions"
            responsiveLayout="scroll"
            :emptyMessage="'No transactions'"
        >
            <Column field="topic" header="Topic" />
            <Column field="type" header="Type" />
            <Column field="amount" header="Amount" :body="formatAmount" />
            <Column field="date" header="Date" :body="formatDate" />
        </DataTable>
    </div>
</template>

<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";

const props = defineProps({
    transactions: Array,
});

function formatAmount(row) {
    return row.type === "expense"
        ? `- $${row.amount.toFixed(2)}`
        : `$${row.amount.toFixed(2)}`;
}

function formatDate(row) {
    return new Date(row.date).toLocaleDateString();
}
</script>
