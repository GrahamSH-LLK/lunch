const generateMidYear = (day, date) => {
	const blocks = ['H', 'G', 'F', 'E', 'D', 'C', 'B', 'A', 'Makeup'];
	const times = ['8:00 - 9:30', '10:00 - 11:30', '11:30 - 12:45', '12:45 - 2:15'];
	// grab 3 based on day
	const selectedBlocks = blocks.slice(3 * (day - 1), day * 3);
	selectedBlocks.splice(2, 0, 'Lunch');

	const schedule = {
		name: `Mid Year Exam Day ${day}`,
		description: `Mid Year Exam Day ${day} schedule`,
		dates: [date],
		blocks: selectedBlocks.map((block, index) => ({
			block: `${block} Block`,
			times: [times[index]]
		}))
	};
	return schedule;
};
const generateFinals = (day, date) => {

    const blocks = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'Makeup'];
    const times = ['8:00 - 10:00', '10:00 - 11:00', '11:00 - 1:00'];

    const selectedBlocks = blocks.slice(2 * (day - 1), day * 2);
    selectedBlocks.splice(1, 0, 'Lunch');
    const schedule = {
        name: `Finals Day ${day}`,
        description: `Finals Day ${day} schedule`,
        dates: [date],
        blocks: selectedBlocks.map((block, index) => ({
            block: `${block} Block`,
            times: [times[index]]
        }))
    };
    return schedule;
}
export const schedules = [
	{
		name: 'Opening Day',
		description: `- 7:48 - 8:44
    - Ninth, Tenth, Eleventh Graders report to homeroom. Seniors Report to the Auditorium.
    - Class schedules will be distributed.
    - Students will receive paperwork necessary to collect pertinent information.
    - Seniors will record size information for caps and gowns while in homeroom.	
    - Other information will be distributed as needed.
- 8:10
    - Junior Assembly
- 8:30
    - Sophomore Assembly

*Approximate times for homeroom teachers to bring students to the auditorium.*

`,
		dates: [new Date('Tuesday, August 27, 2024')],
		blocks: [
			{
				block: 'homeroom',
				times: ['7:48 - 8:44']
			},
			{
				block: 'a1',
				times: ['8:48 - 9:18']
			},
			{
				block: 'b1',
				times: ['9:22 - 9:52']
			},
			{
				block: 'c1',
				times: ['9:56 - 10:26']
			},
			{
				block: 'd2',
				times: ['10:30 - 11:00']
			},
			{
				block: 'e1 1st lunch',
				times: ['11:04 - 11:34', 'class 11:39 - 12:33']
			},
			{
				block: 'e1 2nd lunch',
				times: ['class 11:04 - 11:30', '11:34 - 12:03', 'class 12:07 - 12:33']
			},
			{
				block: 'e1 3rd lunch',
				times: ['class 11:04 - 11:59', '12:03 - 12:33']
			},
			{
				block: 'f1',
				times: ['12:37 - 1:07']
			},
			{
				block: 'g1',
				times: ['1:11 - 1:41']
			},
			{
				block: 'h2',
				times: ['1:45 - 2:15']
			}
		]
	},

	{
		name: 'Fall Election Speeches',
		description: `Class of 2028 Officer Candidate Speeches will be held during E Block. All students are to report to their E7 class, attendance will be taken and the teacher will then accompany the class to the auditorium. At the conclusion of the speeches, teachers will bring their students back to the classrooms.`,
		dates: [new Date('Wednesday, September 18, 2024')],
		blocks: [
			{
				block: 'C7',
				times: ['7:48 - 8:44']
			},
			{
				block: 'A7',
				times: ['8:48 - 9:44']
			},
			{
				block: 'D7',
				times: ['9:48 - 10:44']
			},
			{
				block: 'G7',
				times: ['10:48 - 12:15']
			},
			{
				block: 'E7',
				times: ['12:19 - 1:15']
			},
			{
				block: 'H7',
				times: ['1:19 - 2:15']
			}
		]
	},
	{
		name: 'Second Day (Day 3)',
		description: `Students return completed paperwork in Homeroom.`,
		dates: [new Date('Wednesday, August 28, 2024')],
		blocks: [
			{
				block: 'homeroom',
				times: ['7:48 - 8:00']
			},
			{
				block: 'C3',
				times: ['8:04 - 8:44']
			},
			{
				block: 'A3',
				times: ['8:48 - 9:44']
			},
			{
				block: 'D3',
				times: ['9:48 - 10:44']
			},
			{
				block: 'G3',
				times: ['10:48 - 12:15']
			},
			{
				block: 'E3',
				times: ['12:19 - 1:15']
			},
			{
				block: 'H3',
				times: ['1:19 - 2:15']
			}
		]
	},
	{
		name: 'AM Connect Block Schedule',
		description: 'Schedule for AM Connect Block days',
		dates: [
			new Date('2023-09-08'),
			new Date('2023-10-20'),
			new Date('2023-12-15'),
			new Date('2024-02-28'),
			new Date('2024-04-10'),
			new Date(
				'2024-05-29'
			) /* TODO: Update dates for AM Connect Block once actual dates come out */
		],
		blocks: [
			{
				block: '1st Block',
				times: ['7:48am - 8:37am']
			},
			{
				block: '2nd Block',
				times: ['8:41am - 9:30am']
			},
			{
				block: 'Connect Block',
				times: ['9:34am - 10:04am']
			},
			{
				block: '3rd Block',
				times: ['10:08am - 10:57am']
			},
			{
				block: '4th Block 1st Lunch',
				times: ['1st Lunch 11:01am - 11:28am', 'Class 11:32am - 12:30pm']
			},
			{
				block: '4th Block 2nd Lunch',
				times: ['Class 11:01am - 11:28am', '2nd Lunch 11:32am - 11:59am', 'Class 12:03pm - 12:30pm']
			},
			{
				block: '4th Block 3rd Lunch',
				times: ['Class 11:01am - 11:59am', '3rd Lunch 12:03pm - 12:30pm']
			},
			{
				block: '5th Block',
				times: ['12:34pm - 1:23pm']
			},
			{
				block: '6th Block',
				times: ['1:27pm - 2:15pm']
			}
		]
	},
	{
		name: 'PM Connect Block Schedule',
		description: 'Schedule for PM Connect Block days',
		dates: [
			new Date('2023-09-29'),
			new Date('2023-11-17'),
			new Date('2024-03-20'),
			new Date('2024-05-08')
		],
		blocks: [
			{
				block: '1st Block',
				times: ['7:48am - 8:37am']
			},
			{
				block: '2nd Block',
				times: ['8:41am - 9:30am']
			},
			{
				block: '3rd Block',
				times: ['9:34am - 10:23am']
			},
			{
				block: '4th Block 1st Lunch',
				times: ['1st Lunch 10:27am - 10:54am', 'Class 10:58am - 11:56am']
			},
			{
				block: '4th Block 2nd Lunch',
				times: ['Class 10:27am - 10:54am', '2nd Lunch 10:58am - 11:25am', 'Class 11:29am - 11:56am']
			},
			{
				block: '4th Block 3rd Lunch',
				times: ['Class 10:27am - 11:25am', '3rd Lunch 11:29am - 11:56am']
			},
			{
				block: '5th Block',
				times: ['12:00pm - 12:49pm']
			},
			{
				block: 'Connect Block',
				times: ['12:53pm - 1:23pm']
			},
			{
				block: '6th Block',
				times: ['1:27pm - 2:15pm']
			}
		]
	},
	{
		name: 'All-School Pep Rally',
		description: 'Schedule for All-School Pep Rally day',
		dates: [new Date('2024-10-18')],
		description: `* F5 moved up in order to not disrupt lunch block
* Note: F, G, and H are switched to keep the regular lunch schedule.
* Students will sit in their designated areas with their grade level.
* Sections will be decorated by class color.
* In Powerschool, this time is shown as "Homeroom".`,
		blocks: [
			{
				block: 'A5',
				times: ['7:48 - 8:28']
			},
			{
				block: 'B5',
				times: ['8:32 - 9:12']
			},
			{
				block: 'C5',
				times: ['9:16 - 9:56']
			},
			{
				block: 'F5',
				times: ['10:00 - 10:40']
			},
			{
				block: 'E Block 1st Lunch',
				times: ['1st Lunch 10:44 - 11:10', 'Class 11:14 - 12:11']
			},
			{
				block: 'E Block 2nd Lunch',
				times: ['Class 10:44 - 11:12', '2nd Lunch 11:14 - 11:40', 'Class 11:44 - 12:11']
			},
			{
				block: 'E Block 3rd Lunch',
				times: ['Class 10:44 - 11:40', '3rd Lunch 11:44 - 12:11']
			},
			{
				block: 'G5',
				times: ['12:15 - 12:55']
			},
			{
				block: 'Pep Rally in the gym',
				times: ['12:59 - 2:15']
			}
		]
	},
	{
		name: 'Thanksgiving Early Release',
		description: 'Schedule for Thanksgiving Early Release days',
		dates: [new Date('2024-11-27')],
		blocks: [
			{
				block: 'C7',
				times: ['7:48 - 8:29']
			},
			{
				block: 'A7',
				times: ['8:33 - 9:14']
			},
			{
				block: 'D7',
				times: ['9:18 - 9:59']
			},
			{
				block: 'G7',
				times: ['10:03 - 10:44']
			}
		]
	},
	/*
Day before Holiday Break	A5	7:48 - 8:28			
B5	8:32-9:12		
C5	9:16-9:56			
F5	10:00-10:40	*moved up in order to not disrupt lunch block		
Friday, December 20, 2024	E5	10:44-12:11 Lunch Block			
1st Lunch 10:44-11:10	Class 11:14-12:11		
Class 10:44-11:12	2nd Lunch 11:14-11:40	Class 11:44-12:11	
Class 10:44-11:40	3rd Lunch 11:44-12:11		
Day 5	G5	12:15-12:55	Note: F, G, and H are switched to keep the regular lunch schedule.	
Talent Show (Auditorium), Basketball Game (Gym), Makers' Space (Sem. A)	12:59-2:15	Students and teachers will attend the event of their choosing. */

	{
		name: 'Day before Holiday Break',
		description: `- F, G, and H are switched to keep the regular lunch schedule.	
- Students and teachers will attend the event of their choosing at the end of the day.`,
		dates: [new Date('2024-12-20')],
		blocks: [
			{
				block: 'A5',
				times: ['7:48 - 8:28']
			},
			{
				block: 'B5',
				times: ['8:32 - 9:12']
			},
			{
				block: 'C5',
				times: ['9:16 - 9:56']
			},
			{
				block: 'F5',
				times: ['10:00 - 10:40']
			},
			{
				block: 'E5 First Lunch',
				times: ['Lunch 10:44 - 11:10', 'Class 11:14 - 12:11']
			},
			{
				block: 'E5 Second Lunch',
				times: ['Class 10:44 - 11:12', '2nd Lunch 11:14 - 11:40', 'Class 11:44 - 12:11']
			},
			{
				block: 'E5 Third Lunch',
				times: ['Class 10:44 - 11:40', '3rd Lunch 11:44 - 12:11']
			},
			{
				block: 'G5',
				times: ['12:15 - 12:55']
			}
		]
	},
	generateMidYear(1, new Date('2025-01-15')),
	generateMidYear(2, new Date('2025-01-16')),
	generateMidYear(3, new Date('2025-01-17')),
	{
		name: 'Fine Arts Festival',
		// Thursday, February 13, 2025
		dates: [new Date('2025-02-13')],
		description: 'Schedule for the Fine Arts Festival',
		blocks: [
			{
				block: 'B8',
				times: ['7:48 - 8:29']
			},
			{
				block: 'C8 (Juniors and Freshmen)',
				times: ['Performance 8:33 - 9:36', 'Class 9:41 - 10:44']
			},
			{
				block: 'C8 (Sophomores and Seniors)',
				times: ['Class 8:33 - 9:36', 'Performance 9:41 - 10:44']
			},
			{
				block: 'H8 1st Lunch',
				times: ['10:48 - 11:14', 'Class 11:18 - 12:10']
			},
			{
				block: 'H8 2nd Lunch',
				times: ['Class 10:48 - 11:10', '2nd Lunch 11:14 - 11:40', 'Class 11:44 - 12:10']
			},
			{
				block: 'H8 3rd Lunch',
				times: ['Class 10:48 - 11:40', '3rd Lunch 11:44 - 12:10']
			},
			{
				block: 'D8',
				times: ['12:14 - 12:52']
			},
			{
				block: 'G8',
				times: ['12:56 - 1:34']
			},
			{
				block: 'E8',
				times: ['1:38 - 2:15']
			}
		]
	},
	{
		name: 'Spring Election Speeches',
		dates: [new Date('2025-04-30')],
        blocks: [
            {
                block: 'D2',
                times: ['7:48 - 8:44']
            },
            {
                block: 'A2',
                times: ['8:48 - 9:44']
            },
            {
                block: 'B2',
                times: ['9:48 - 10:44']
            },
            {
                block: 'H2',
                times: ['10:48 - 12:15']
            },
            {
                block: 'F2',
                times: ['12:19 - 1:15']
            },
            {
                block: 'E2',
                times: ['1:19 - 2:15']
            }
        ],
        description: `Note: All candidates should report to the Main Office at the listed time. All other students are to report to their classes for attendance, then proceed to the auditorium with their teachers for the candidates' speeches.	
- Class of 2025
    - B Block
    - Candidates arrive: 9:35
- Class of 2026
    - F Block
    - Candidates arrive: 12:15
- Class of 2027
    - E Block
    - Candidates arrive: 1:15
        `
	},
    generateFinals(1, new Date(`Friday, June 6, 2025`)),
    generateFinals(2, new Date(`Monday, June 9, 2025`)),
    generateFinals(3, new Date(`Tuesday, June 10, 2025`)),
    generateFinals(4, new Date(`Wednesday, June 11, 2025`)),
];
