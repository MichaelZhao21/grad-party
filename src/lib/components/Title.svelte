<script lang="ts">
	import type { Snippet } from "svelte";

    interface TitleProps {
        children: Snippet;
        className?: string;
    }

    let { className, children }: TitleProps = $props();
    let titleClass = 'font-bold font-title text-5xl mb-4 text-secondary ' + className;
</script>

<h1 class={titleClass}>
    {@render children()}
</h1>
