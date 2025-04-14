<script lang="ts">
	import B from '$lib/components/B.svelte';
	import Button from '$lib/components/Button.svelte';
	import ColorDummy from '$lib/components/ColorDummy.svelte';
	import Radio from '$lib/components/Radio.svelte';
	import Text from '$lib/components/Text.svelte';
	import TextAreaInput from '$lib/components/TextAreaInput.svelte';
	import TextInput from '$lib/components/TextInput.svelte';
	import Title from '$lib/components/Title.svelte';

	const rsvpMap = {
		yes: 'Yes!',
		no: 'No :(',
		maybe: 'Maybe...'
	};

	let { data } = $props();
	let { loggedIn, user, attendees }: IndexProps = data;

	let form = $state<User>({
		email: user?.email || '',
		password: '',
		name: user?.name || '',
		phone: user?.phone || '',
		rsvp: user?.rsvp || '',
		paid: user?.paid || '',
		relation: user?.relation || '',
		bringing: user?.bringing || '',
		music: user?.music || '',
		notes: user?.notes || ''
	});

	const logIn = async () => {
		const res = await fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(form)
		});

		if (!res.ok) {
			alert('Invalid email or password');
			return;
		}

		// Reload page
		window.location.reload();
	};

	const logOut = async () => {
		const res = await fetch('/logout', { method: 'POST' });
		if (!res.ok) {
			alert('Error logging out');
			return;
		}

		// Reload page
		window.location.reload();
	};

	const save = async () => {
		const res = await fetch('/save', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(form)
		});

		if (!res.ok) {
			alert('Error saving data');
			return;
		}

		// Reload page
		window.location.reload();
	};
</script>

<div
	class="text-text font-body h-max min-h-screen w-full bg-[url(/stars.webp)] bg-cover bg-fixed bg-center bg-no-repeat p-6 lg:p-12"
>
	<!-- Card -->
	<div
		class="bg-surface/25 flex h-full w-full flex-col justify-center rounded-lg drop-shadow-md backdrop-blur-md"
	>
		<!-- Header section -->
		<div class="flex w-full flex-col-reverse lg:flex-row">
			<div class="flex grow basis-1/2 flex-col px-4 lg:pl-6">
				<Title className="text-6xl mt-6 text-center hidden lg:block">Michael's Grad Party!</Title>
				<Text>
					IM GRADUATING!!! And that means it’s time for one last party :D If you’ve been to any of
					my previous ones, then you know the vibe -- lots of food, drinks, and fun hehe
				</Text>
				<Text>
					The party’s gonna be on <B>4/25 (Friday) at 9pm</B>! There’s not a strict theme this time,
					but I’d love if everyone could go <B>ALL OUT</B> for their party fits: the craziest shirts,
					the most stunning accessories, and anything else that will make you stand out.
				</Text>
				<Text>
					I ask that everyone <B>pay me $5</B> for the drinks and snacks unless you’re bringing your
					own. Feel free to bring whatever drinks or snacks you want!
				</Text>
				<Text>
					We ask you to follow these <B>house rules</B>:
					<ul class="ml-6 list-disc">
						<li>No smoking of any kind indoors</li>
						<li>Please take off your shoes at the front</li>
						<li>Don’t go through cabinets/drawers</li>
					</ul>
				</Text>
				<Text>
					Please <B>RSVP below</B> so I know how many people are coming! Feel free to bring a +1, but
					have them fill out the form too!
				</Text>
				<Text>
					For any questions, feel free to text me at <B>(469) 569 - 0174</B>!
				</Text>
			</div>
			<div class="flex grow flex-col items-center p-4 pt-0 lg:basis-1/2 lg:p-6 lg:pt-6">
				<img
					alt="party graphic"
					src="/graphic.webp"
					width="800"
					height="800"
					class="drop-shadow-md md:w-1/2 lg:w-full"
				/>
			</div>
			<Title className="text-4xl mt-4 text-center block lg:hidden px-2">
				Michael's Grad Party!
			</Title>
		</div>

		<!-- Login -->
		{#if !loggedIn}
			<div class="mx-6 mb-6 lg:mb-8">
				<Title>Sign Up/Log In</Title>
				<div class="mb-4 flex w-full flex-col lg:flex-row">
					<TextInput
						bind:value={form.email}
						label="Email"
						placeholder="Full email"
						className="lg:mr-8"
					/>
					<TextInput
						bind:value={form.password}
						label="Password"
						placeholder="Password"
						className="lg:ml-8"
						password
					/>
				</div>
				<Button onClick={logIn}>Submit</Button>
			</div>
		{/if}

		<!-- RSVP Form -->
		{#if loggedIn}
			<div class="mx-6 mb-6 lg:mb-8">
				<Title>Your Info</Title>
				<Text>
					Fill out your info please! Feel free to save at any time and come back to edit :3
				</Text>
				<div class="flex w-full flex-col lg:flex-row">
					<TextInput
						bind:value={form.email}
						label="Email"
						placeholder="Full email"
						className="lg:mr-8 mb-4"
					/>
					<TextInput
						bind:value={form.password}
						label="Password"
						placeholder="(unchanged)"
						className="lg:ml-8 mb-4"
						password
					/>
				</div>
				<Radio
					bind:value={form.rsvp}
					label="RSVP Status"
					options={['yes', 'no', 'maybe']}
					optionLabels={['Yes!', 'No :(', 'Maybe (change as soon as you know!)']}
					className="mb-4"
				/>
				<div class="flex w-full flex-col lg:flex-row">
					<TextInput
						bind:value={form.name}
						label="Full Name"
						placeholder="Full name"
						className="lg:mr-8 mb-4"
					/>
					<TextInput
						bind:value={form.phone}
						label="Phone Number"
						placeholder="Phone number"
						className="lg:ml-8 mb-4"
					/>
				</div>
				<div class="flex w-full flex-col-reverse lg:mb-4 lg:flex-row">
					<Radio
						bind:value={form.paid}
						label="Paid $5? (Zelle 4695690174, Venmo @mikeyz314)"
						options={['yes', 'no', 'bringing']}
						optionLabels={['Yes!', 'Not Yet', 'Bringing Drinks/Snacks (notate below)']}
						className="mb-4 lg:mb-0 basis-1/2 grow-0"
					/>
					<TextInput
						bind:value={form.relation}
						label="How do u know me?"
						placeholder="Friend, friend of friend, etc"
						className="grow lg:ml-8 mb-4"
					/>
				</div>
				<div class="flex w-full flex-col lg:flex-row">
					<TextAreaInput
						bind:value={form.bringing}
						label="Whatcha bringing? (if you don’t know that’s fine)"
						placeholder="Leave blank if paying"
						className="lg:mr-8 mb-4"
					/>
					<TextAreaInput
						bind:value={form.music}
						label="Music recs (spotify links if possible)"
						placeholder="Optional but appreciated :D"
						className="lg:ml-8 mb-4"
					/>
				</div>
				<TextAreaInput
					bind:value={form.notes}
					label="Additional Comments"
					placeholder="Anything else you want to tell me :3"
					className="mb-4"
				/>
				<div class="flex w-full flex-col justify-between lg:flex-row">
					<Button onClick={save}>Save</Button>
					<Button
						onClick={logOut}
						className="mt-4 lg:mt-0 text-red-400 border-red-400 bg-red-800/50"
					>
						Log Out
					</Button>
				</div>
			</div>

			<!-- Attendees -->
			<div class="mx-6 mb-6 lg:mb-8">
				<ColorDummy />
				<Title>Attendees</Title>
				<Text><B>Here's everyone that has RSVP'ed :D</B></Text>
				<div class="flex w-full flex-row flex-wrap gap-x-16">
					{#each attendees || [] as at}
						<Text className="flex flex-col">
							<span class="text-xl lg:text-3xl">{at.name}</span>
							<span class={`text-${at.rsvp} mt-[-0.5rem] lg:mt-0`}>
								{rsvpMap[at.rsvp]}
							</span>
						</Text>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>
