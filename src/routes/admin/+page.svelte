<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Text from '$lib/components/Text.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import Title from '$lib/components/Title.svelte';

	let { data } = $props();
	let { loggedIn, users }: AdminData = data;
	let pass = $state('');

	const bad = users?.filter((user) => !user.name || user.name === '');
	const good = users?.filter((user) => user.name && user.name !== '');

	const logIn = async () => {
		const res = await fetch('/admin/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ pass })
		});

		if (!res.ok) {
			alert('Password incorrect');
			return;
		}

		// Reload page
		window.location.reload();
	};
</script>

{#if !loggedIn}
	<div class="my-4 h-screen bg-black pt-8 text-white">
		<div class="flex h-32 flex-col items-center justify-center">
			<Title>Admin Login</Title>
			<TextInput
				bind:value={pass}
				label="Admin Password"
				password
				className="md:w-[400px] w-full p-4"
			/>
			<Button onClick={logIn} className="mt-4">Login</Button>
		</div>
	</div>
{/if}

{#if loggedIn && users}
	<div class="font-body my-4 h-screen bg-black px-4 pt-8 text-white lg:px-[30%]">
		<div class="flex h-32 flex-col items-center justify-center">
			<Title>Admin</Title>
		</div>
		<div class="flex flex-col items-start">
			<Text className="mt-4 mb-0 text-2xl lg:text-3xl">Total: {users.length}</Text>
			<Text className="my-0 text-yes"
				>RSVP Yes: {users.filter((user) => user.rsvp === 'yes').length}</Text
			>
			<Text className="my-0 text-maybe"
				>RSVP Maybe: {users.filter((user) => user.rsvp === 'maybe').length}</Text
			>
			<Text className="mt-0 text-no"
				>RSVP No: {users.filter((user) => user.rsvp === 'no').length}</Text
			>
		</div>
		{#each users as user}
            <div class="mt-4 flex w-full flex-col items-start justify-start rounded-lg bg-gray-800 p-4">
                <Text className="text-xl">{user.name}</Text>
                <p class="my-0 text-sm">Email: {user.email}</p>
                <p class="my-0 text-sm">Phone: {user.phone}</p>
                <p class="my-0 text-sm">RSVP: {user.rsvp}</p>
                <p class="my-0 text-sm">Paid: {user.paid}</p>
                <p class="my-0 text-sm">Relation: {user.relation}</p>
                <p class="my-0 text-sm">Bringing: {user.bringing}</p>
                <p class="my-0 text-sm">Music: {user.music}</p>
                <p class="my-0 text-sm">Notes: {user.notes}</p>
            </div>
		{/each}
	</div>
{/if}
