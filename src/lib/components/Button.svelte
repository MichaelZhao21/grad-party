<script lang="ts">
	import type { Snippet } from 'svelte';

	interface ButtonProps {
		onClick: () => void;
		children: Snippet;
		className?: string;
	}

	let { onClick, children, className }: ButtonProps = $props();
	let buttonClassName =
		'border-2 border-primary text-primary p-2 rounded-md hover:bg-secondary/20 hover:text-secondary py-1 px-4 focus:bg-secondary/20 focus:text-secondary duration-150 focus:outline-none cursor-pointer ' +
		className;
</script>

<button onclick={onClick} class={buttonClassName}>
	{@render children()}
</button>
