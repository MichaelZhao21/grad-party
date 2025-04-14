<script lang="ts">
	interface TextInputProps {
		value: string;
		label: string;
		placeholder?: string;
		className?: string;
		password?: boolean;
	}

	let { value = $bindable(), label, placeholder, className, password }: TextInputProps = $props();
	let inputClassName = 'flex flex-col grow ' + className;
	let labelId = label.replace(/\s+/g, '-').toLowerCase();
</script>

<div class={inputClassName}>
	<input
		bind:value
		{placeholder}
		type={password ? 'password' : 'text'}
		id={labelId}
		class="border-secondary focus:border-primary focus:text-primary placeholder:text-primary/50 border-b-2 bg-transparent text-text duration-400 focus:outline-none"
	/>
	<label for={labelId} class="font-body text-secondary text-sm">{label}</label>
</div>
