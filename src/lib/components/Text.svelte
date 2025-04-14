<script lang="ts">
	import type { Snippet } from "svelte";

    interface TextProps {
        children: Snippet;
        className?: string;
    }

    let { className, children }: TextProps = $props();
    let textClass = 'lg:text-xl font-body mb-4 ' + className;
</script>

<h1 class={textClass}>
    {@render children()}
</h1>
