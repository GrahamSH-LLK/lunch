<script lang="ts">
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import {
		type DateValue,
		DateFormatter,
		getLocalTimeZone,
		getDayOfWeek
	} from '@internationalized/date';
	import { cn } from '$lib/utils.js';
	import { Button } from '$lib/components/ui/button';
	import { Calendar } from '$lib/components/ui/calendar';
	import * as Popover from '$lib/components/ui/popover';

	const df = new DateFormatter('en-US', {
		dateStyle: 'long'
	});

	export let value: DateValue | undefined = undefined;
	const isDateDisabled = (date: DateValue | undefined): boolean => {
		if (!date) {
            return false;
        }
		if (getDayOfWeek(date, 'en-US') == 0 || getDayOfWeek(date, 'en-US') == 6) {
			return true;
		}

		return false;
	};
</script>

<Popover.Root openFocus>
	<Popover.Trigger asChild let:builder>
		<Button
			variant="outline"
			class={cn('w-[160px] justify-start text-left font-normal', !value && 'text-muted-foreground')}
			builders={[builder]}
		>
			<CalendarIcon class="mr-2 h-4 w-4" />
			{value ? df.format(value.toDate(getLocalTimeZone())) : 'Select a date'}
		</Button>
	</Popover.Trigger>
	<Popover.Content class="w-auto p-0">
		<Calendar bind:value initialFocus={false} {isDateDisabled} />
	</Popover.Content>
</Popover.Root>
