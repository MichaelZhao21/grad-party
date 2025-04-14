<script lang="ts">
	import B from '$lib/components/B.svelte';
	import Text from '$lib/components/Text.svelte';
	import Title from '$lib/components/Title.svelte';

	const rsvpMap = {
		yes: 'Yes!',
		no: 'No :(',
		maybe: 'Maybe...'
	};

	let { loggedIn, user, attendees }: IndexProps = $props();
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
			<div class="grwo flex basis-1/2 flex-col px-4 lg:pl-6">
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
	</div>
</div>
