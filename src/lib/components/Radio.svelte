<script lang="ts">
	interface RadioProps {
		value: string;
		label: string;
		options: string[];
		optionLabels: string[];
		className?: string;
	}

	let { value = $bindable(), label, options, optionLabels, className }: RadioProps = $props();
	let radioClassName = 'flex flex-col grow ' + className;
</script>

<div class={radioClassName}>
	<span class="text-secondary font-bold">{label}</span>
	<div class="flex flex-col gap-x-4 lg:flex-row">
		{#each options as option, i}
			<div class="mr-2 flex items-center">
				<input
					type="radio"
					id={option + label}
					name={label}
					value={option}
                    bind:group={value}
					class="border-secondary/50 checked:bg-secondary h-4 w-4 cursor-pointer appearance-none rounded-full border-2 shrink-0"
				/>
				<label for={option + label} class="text-secondary ml-1 cursor-pointer">
					{optionLabels[i]}
				</label>
			</div>
		{/each}
	</div>
</div>
