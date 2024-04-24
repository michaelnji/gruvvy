
<script setup>
import { numToSummary } from '@/lib/scripts/numberFunctions';
import { useSettings } from '@/stores/settings';
import ApexCharts from 'apexcharts';
import { computed, onMounted, watch } from 'vue';
const settingsState = useSettings()
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
	},
	labelColor: {
		required: true
	}
});
const colors = {
	green: {
		name: "#087f5b",

	},
	red: {
		name: "#c2255c",

	},
};
const labelColors = {
	amethyst: '#220029',
	nord: '#f2f9f9',
	midnight: '#fff',
	desert: '#3e1e0a',
	forest: '#122a09',
	white: '#000',
}
const tooltipColors = `bg-${props.color === 'green' ? 'success-content' : 'error-content'} text-${props.color === 'green' ? 'success' : 'error'}`
const tooltipPointClass = `bg-${props.color === 'green' ? 'success' : 'error'}`
const defaultOptions = {
	tooltip: {
		custom: ({ series, seriesIndex, dataPointIndex, w }) => `<div class="p-3  !border-0  uppercase flex items-center gap-x-2 !text-xs  ${tooltipColors}">
			
			<div>
			 ${props.color === 'green' ? 'income' : 'expense'} - <b class='font-bold'>${settingsState.settings.currency} ${numToSummary(series[seriesIndex][dataPointIndex])}</b>
			</div>
		</div>`
	},
	theme: {
		monochrome: {
			enabled: true,
			color: colors[props.color].name,
			shadeTo: "dark",
			shadeIntensity: 0.65,
		},
	},

	dataLabels: {
		enabled: false,
	},
	grid: {
		show: false
	},



};

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


			},
		],
		xaxis: {
			categories: props.categories,
			labels: {
				style: {
					colors: labelColors[props.labelColor],
					fontFamily: "Pally",
				}
			},
			tickPlacement: 'on'


		},
		yaxis: {
			labels: {
				show: false,
				style: {
					colors: '#fff',
					fontFamily: "Pally",
				}
			}
		}
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
	<div :class="`p-3 rounded-2xl  chart-container-${id}`">
		<div :id="`chart-${id}`"></div>
	</div>
</template>