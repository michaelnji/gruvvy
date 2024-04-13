
<script setup>
import ApexCharts from 'apexcharts';
import { computed, onMounted, watch } from 'vue';
const props = defineProps({
	type: {
		type: String,
		required: true,
	},
	series: {
		required: true,
	},
	color: {
		type: String,
		required: true,
	},
	categories: {
		required: true,
	},
	id:{
		required:true
	}
});
const colors = {
	green: {
		name: "#087f5b",
		class: "bg-[#087f5b]",
	},
	red: {
		name: "#c2255c",
		class: "bg-[#c2255c]",
	},
	primary: {
		name: "rgb(199, 129, 19)",
		class: "bg-[rgb(199, 129, 19)]",
	},
	
};
const defaultOptions = {
	theme: {
		monochrome: {
			enabled: true,
			color: colors.primary.name,
			shadeTo: "light",
			shadeIntensity: 0.65,
		},
	},

	dataLabels: {
		enabled: false,
	},
};
const bgColor = `${colors[props.color].class} bg-opacity-5`;
const options = computed(() => {
	return {
		...defaultOptions,
		chart: {
			fontFamily: "Pally",
			type: props.type,
			toolbar: {
				show: false,
			},
		},
		series: [
			{
				...props.series,
				color: colors[props.color].name,
			},
		],
		xaxis: {
			categories: props.categories,
		},
	}
});


let chart
onMounted(() => {

	chart = new ApexCharts(document.querySelector(`#chart-${props.id}`), options.value);
	chart.render();
});

watch(props, () => {
	document.querySelector(`#chart-${props.id}`).remove()
	const newChartElement = document.createElement("div")
	const container = document.querySelector(`.chart-container-${props.id}`)
	container.append(newChartElement)
	newChartElement.id = `chart-${props.id}`
	chart = new ApexCharts(newChartElement, options.value);
	chart.render();
});
</script>

<template>
	<div :class="`p-3 rounded-2xl ${bgColor} chart-container-${id}`">
		<div :id="`chart-${id}`"></div>
	</div>
</template>