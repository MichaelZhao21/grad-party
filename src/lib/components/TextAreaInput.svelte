<script lang="ts">
	interface TextAreaInputProps {
		value: string;
		label: string;
		placeholder?: string;
		className?: string;
	}

	let { value = $bindable(), label, placeholder, className }: TextAreaInputProps = $props();
	let textAreaClassName = 'flex flex-col grow ' + className;
	let labelId = label.replace(/\s+/g, '-').toLowerCase();
</script>

<div class={textAreaClassName}>
	<textarea
		bind:value
		{placeholder}
		id={labelId}
		class="border-secondary focus:border-primary focus:text-primary placeholder:text-primary/50 text-text border-b-2 bg-transparent duration-400 focus:outline-none"
	></textarea>
	<label for={labelId} class="font-body text-secondary text-sm">{label}</label>
</div>
