<template>
    <div>
        <label for="sort">Sort by...</label>
        <select name="sort" v-model="value" @change="sortMovies(value)" id="sort">
            <option value="default">Default</option>
            <option value="sort-old-new">Sort from old to new</option>
            <option value="sort-new-old">Sort from new to old</option>
            <option value="sort-high-low">Sort rating from high to low </option>
            <option value="sort-low-high">Sort rating from low to high</option>
        </select>
    </div>
</template>

<script>
import EventBus from '../event-bus';

export default {
    methods: {
sortMovies(value) {
EventBus.$emit("sort-movies", value);
}
    },
    data() {
        return {
            value: "",
        }
    }
}
</script>

<style>
    
</style>