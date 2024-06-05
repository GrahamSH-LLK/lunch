import { error } from '@sveltejs/kit';
import Fuse from 'fuse.js';
import { CalendarDate } from '@internationalized/date';
/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch, url }) {
	let normalURL = params.slug != 'today';
	let date = normalURL
		? params.slug
		: new Date().toLocaleString(undefined, { day: '2-digit', year: 'numeric', month: '2-digit' });

	let res = await fetch(
		`https://apiservicelocators.fdmealplanner.com/api/v1/data-locator-webapi/3/meals?accountId=78&endDate=${date}&isActive=true&isStandalone&locationId=430&mealPeriodId=2&menuId=0&monthId=${new Date(date).getMonth() + 1}&selectedDate=${date}&startDate=${date}&tenantId=3&timeOffset=0&year=2024`,
		{
			headers: {
				accept: 'application/json, text/plain, */*',
				'accept-language': 'en-US,en;q=0.9',
				'sec-ch-ua': '"Chromium";v="104", " Not A;Brand";v="99", "Google Chrome";v="104"',
				'sec-ch-ua-mobile': '?0',
				'sec-ch-ua-platform': '"macOS"',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'cross-site'
			},
			body: null,
			method: 'GET'
		}
	);
	let data = await res.json();
	//console.log(data.data["__type"].fields);
	let today = [];
	let images = [
		{
			name: 'Chicken Patty Sandwich',
			alternateName: 'Spicy Chicken Sandwich',
			image:
				'https://mrs.mdek12.org//images/made/photos_recipes/2015_732_chicken_patty_sandwich_300_200_int_c1.jpg'
		},
		{
			name: "General Tso's Chicken with Fried Rice",
			image:
				'https://www.recipetineats.com/wp-content/uploads/2020/10/General-Tsao-Chicken_1-SQ.jpg'
		},
		{
			name: 'Cheeseburger on Bun',
			alternateName: 'Double Bacon Burger',
			image:
				'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cheeseburger.jpg/1200px-Cheeseburger.jpg'
		},
		{
			name: 'Hamburger on Bun',
			image:
				'https://www.inspiredtaste.net/wp-content/uploads/2016/08/Easy-Homemade-Hamburger-Recipe-2-1200.jpg'
		},
		{
			name: 'Baked Ziti',
			image:
				'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F06%2F29%2F18031-baked-ziti-ii-ddmfs-1x1-0340.jpg'
		},
		{
			name: 'Tater Tots',
			image:
				'https://cdn.vox-cdn.com/thumbor/Nc8pN-5K37_EGya_Ac-BsY7NoZ8=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/9064347/tater_tots_closeup.jpg'
		},
		{
			name: 'Assorted Fruit',
			image: 'https://cdn10.bostonmagazine.com/wp-content/uploads/2014/08/lunch.jpg'
		},
		{
			name: 'Assorted Condiments',
			image: 'https://townsquare.media/site/182/files/2019/06/GettyImages-818915652.jpg'
		},
		{
			name: 'Chicken Tenders',
			alternateName: 'Chicken Nuggets',
			image:
				'https://images.ctfassets.net/o19mhvm9a2cm/7vncTip0YUPHM6SttXHM4x/60ec9cfaef5e47ff2477a80a6fc11b74/Website_Chicken_Tenders_5PC.png?&q=80&w=1000'
		},
		{
			name: 'Fruit and Yogurt Parfait',
			image: 'https://therecipecritic.com/wp-content/uploads/2020/01/yogurtparfaits-500x375.jpg'
		},
		{
			name: 'Pasta with Meat Sauce',
			alternateName: 'Pasta',
			image:
				'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2020/04/03/Day16-PastaWithMeatSauce2.JPG.rend.hgtvcom.616.462.suffix/1585920662894.jpeg'
		},
		{
			name: 'Garlic Bread',
			image:
				'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F06%2F06%2F963781-garlic-bread-spread-LYNNINMA-4x3-1.jpg&q=60'
		},
		{
			name: 'French Fries',
			image: 'https://upload.wikimedia.org/wikipedia/commons/7/73/SupermaketFries.jpg'
		},
		{
			name: 'French Toast',
			image:
				'https://www.thespruceeats.com/thmb/XGw9RhFWrvULPVBgPRW34_Tv9L8=/2000x1125/smart/filters:no_upscale()/cinnamon-french-toast-sticks-2k-56a8c3855f9b58b7d0f4e838.jpg'
		},
		{
			name: 'Hash Brown',
			image:
				'https://s7d1.scene7.com/is/image/mcdonalds/t-mcdonalds-HASH-BROWNS-1:1-3-product-tile-desktop?wid=829&hei=515&dpr=off'
		},
		{
			name: 'Steamed Broccoli',
			image:
				'https://assets.epicurious.com/photos/5761cfc58accf290434553a9/master/pass/steamed-broccoli-with-olive-oil-garlic-and-lemon.jpg'
		},
		{
			name: 'Ranch Dressing',
			image: 'https://images-gmi-pmc.edge-generalmills.com/6baa2d3b-2beb-4875-9318-f7eee148c00b.jpg'
		},
		{
			name: 'Lite Caeser Dressing',
			image:
				'https://www.inspiredtaste.net/wp-content/uploads/2020/07/Homemade-Caesar-Dressing-Recipe-6-1200.jpg'
		},
		{
			name: 'Italian Dressing',
			image: 'https://cdn.loveandlemons.com/wp-content/uploads/2020/08/italian-dressing.jpg'
		},
		{
			name: 'Balsamic Dressing',
			image: 'https://www.onceuponachef.com/images/2022/03/balsamic-vinaigrette-1200x817.jpg'
		},
		{
			name: 'Low Fat Milk',
			image: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/296/296564/milk.jpg'
		},
		{
			name: 'Chocolate Milk',
			image:
				'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-2021-chocolatemilk-036-1615340969.jpg'
		},
		{
			name: 'Baked Potato',
			image:
				'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/10/8/0/fnk_baked-potato_s4x3.jpg.rend.hgtvcom.616.462.suffix/1383780369940.jpeg'
		},
		{
			name: 'Spanish Style Rice',
			alternateName: 'Mexi-Cali Rice',
			image:
				'https://www.seriouseats.com/thmb/quM8-Bh0abni-O0ikBpJn0KaH00=/1500x844/smart/filters:no_upscale()/easy-vegetable-fried-rice-recipe-hero-2-fed2a62b8bce4c51b945d9c24c2edb68.jpg'
		},
		{
			name: 'Carrots',
			image:
				'https://static.onecms.io/wp-content/uploads/sites/19/2017/04/04/GettyImages-121088095-2000.jpg'
		},
		{
			name: 'Dinner Roll',
			image:
				'https://rebelsmuggling.com/storage/products/productImages/qz-zzzz-1233__1-300x300-resize.jpg'
		},
		{
			name: 'Whole Grain Waffles',
			image: 'https://i.ytimg.com/vi/dHLOv0jUa58/maxresdefault.jpg',
			alternateName: 'Chicken & Waffles'
		},
		{
			name: 'Build Your Own Nachos',
			image:
				'https://hallrecord.org/wp-content/uploads/2018/10/Flickr_jennerosity_3399911471-Nachos-900x675.jpg'
		},
		{
			name: 'Corn Dog',
			image:
				'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9RLwDauoQAPaapGkm4HAJsF_4V2VF5PHquyI1WUHkkA&s'
		},
		{
			name: 'BBQ Pulled Pork',
			image:
				'https://www.beyondthechickencoop.com/wp-content/uploads/2021/09/Crockpot-BBQ-Pulled-Pork-5.jpg'
		},
		{
			name: 'Cole Slaw',
			image:
				'https://www.superhealthykids.com/wp-content/uploads/2013/04/healthy-cole-slaw-07-640-square.jpg'
		},
		{
			name: 'Quesadilla',
			image:
				'https://i0.wp.com/www.sonshinekitchen.com/wp-content/uploads/2019/02/chicken-cheese-quesadillas-featured.jpg?fit=1024%2C768&ssl=1',
			alternateName: 'Chicken Quesadilla'
		},
		{
			name: 'Hot Dog',
			image:
				'https://d2u4q3iydaupsp.cloudfront.net/Rld89tubrDzEu4QflFXg6kRkSOPvwNMx2ymDQb7WhqAtO6PB7n5RkDhoOXG49YCNs3QK6VHwv8iUmIFhQXDc2GCEJfvAl6JNsqqsY9IHnHsVxderI1rOgWwiee3vQv0H'
		},
		{
			name: 'Alfredo Sauce',
			image:
				'https://valentinascorner.com/wp-content/uploads/2020/07/Alfredo-Sauce-Recipe-5-of-5.jpg'
		},
		{
			name: 'Tomato Sauce',
			image:
				'https://www.allrecipes.com/thmb/4X86LzlzRXty6zbIzo2zDZZ6Ugc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/11966-best-marinara-sauce-yet-DDMFS-4x3-078e494b66c4485e8efe0971473b3196.jpg'
		},
		{
			name: 'Bolognese Sauce',
			image: 'https://www.budgetbytes.com/wp-content/uploads/2023/04/Bologneseoverhead.jpg'
		},
		{
			name: 'Tortilla Chips',
			image: 'https://zastfoods.b-cdn.net/wp-content/uploads/2017/05/yellow-round-nachos.jpg'
		},
		{
			name: 'Apple',
			image:
				'https://media.post.rvohealth.io/wp-content/uploads/2020/09/health-benefits-of-apples-1200x628-facebook-1200x628.jpg'
		},
		{
			name: 'Orange',
			image:
				'https://cdn-prod.medicalnewstoday.com/content/images/articles/272/272782/oranges-in-a-box.jpg'
		},
		{
			name: 'Refried Beans',
			image:
				'https://www.allrecipes.com/thmb/M7cF4MGiiYs4Q03PXXsCT-90Foc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/70312-Refried-Beans-Without-the-Fry-DDMFS-4X3-2643-f6a23c1b1e5d41108f8a1e7a07284202.jpg'
		},
		{
			name: 'Salsa',
			image:
				'https://www.spendwithpennies.com/wp-content/uploads/2020/07/Restaurant-Style-Salsa-SpendWithPennies-6-480x270.jpg'
		},
		{
			name: 'Diced Tomatoes',
			image:
				'https://www.seriouseats.com/thmb/fRUV6x9QwmivMZEe1Vwu3HSdxkQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__images__2016__09__20160909-minestrone-04-e526220713eb448a84c34cadc3319574.jpg'
		},
		{
			name: 'Chicken Fajita',
			image:
				'https://www.eatwell101.com/wp-content/uploads/2020/07/Grilled-Chicken-Fajitas-Recipe-1.jpg'
		},
		{
			name: 'Spicy Beef',
			image:
				'https://www.allrecipes.com/thmb/tQq1D3TigZEeysde4qL0LZ0N9D4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/229112-ground-beef-with-homemade-taco-seasoning-mix-DDMFS-4x3-719013d51e844a948c0b39cccb5ed908.jpg'
		},
		{
			name: 'Iceberg Lettuce',
			image:
				'https://www.wikihow.com/images/thumb/9/95/Cut-Iceberg-Lettuce-Step-8-Version-2.jpg/550px-nowatermark-Cut-Iceberg-Lettuce-Step-8-Version-2.jpg'
		},
		{
			name: 'Soft Taco',
			image: 'https://elriogrande.net/wp-content/uploads/2021/09/soft-tacos-915X610.jpg'
		},
		{
			name: 'Shredded Cheddar Cheese',
			image: 'https://shop.burnettdairy.com/cdn/shop/products/BD_ShredMildChed.jpg?v=1589902985'
		}
	];
	let specialSearchSets = {
		'Pizza Picks': [
			{
				name: 'Cheese Pizza',
				image:
					'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2022%2F02%2F15%2Fclassic-cheese-pizza-FT-RECIPE0422.jpg&q=60&pizza'
			},
			{
				name: 'Pepperoni Pizza',
				image: 'https://www.tasteatlas.com/images/dishes/b05a0af72ad845f3a6abe16143d7853a.jpg?pizza'
			}
		],
		'Deli Picks': [
			{
				name: 'Made to Order Deli',
				image:
					'https://homemaderecipes.com/wp-content/uploads/2016/08/Two-Bacon-Burgers-on-Plates-deli-sandwiches-px-feature.jpg'
			}
		],
		'Express Picks': [
			{
				name: 'Cheeseburger on Bun',
				alternateName: 'Double Bacon Burger',
				image:
					'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cheeseburger.jpg/1200px-Cheeseburger.jpg'
			},

			{
				name: 'Corn Dog',
				alternateName: 'Chicken Corn Dog',
				image:
					'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9RLwDauoQAPaapGkm4HAJsF_4V2VF5PHquyI1WUHkkA&s'
			},
			{
				name: 'Chicken Patty Sandwich',
				alternateName: 'Spicy Chicken Sandwich',
				image:
					'https://mrs.mdek12.org//images/made/photos_recipes/2015_732_chicken_patty_sandwich_300_200_int_c1.jpg'
			}
		],
		'Market Fresh': [
			{
				name: 'Garden Salad',
				image:
					'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-beet-salad-jpg-1526059794.jpg'
			},
			{
				name: 'Chicken Caesar Salad',
				image:
					'https://dinnersdishesanddesserts.com/wp-content/uploads/2021/11/Caesar-Salad-square-scaled.jpg'
			}
		]
	};
	let specialSearchIndexes = {};
	const options = {
		includeScore: true,
		keys: ['name', 'alternateName']
	};

	for (let specialSearchSet in specialSearchSets) {
		specialSearchIndexes[specialSearchSet] = new Fuse(specialSearchSets[specialSearchSet], options);
	}
	const fuse = new Fuse(images, options);
	/*
	for (let mealdex in data.data.menuTypes[0].items) {
		let meal = data.data.menuTypes[0].items[mealdex];

		if (meal.product.is_ancillary) {
			let newMeal = { name: meal.product.name, items: [] };
			today.push(newMeal);
		} else {
			let result = fuse.search(meal.product.name)[0]?.item.image;
			meal.product.image = result;
			today[today.length - 1].items.push(meal.product);
		}
	}*/
	let dateNative = new Date(date);
	let dateObj = new CalendarDate(
		dateNative.getFullYear(),
		dateNative.getMonth() + 1,
		dateNative.getDate()
	);

	if (!data.result.length) {
		return { today: [], date: dateNative, dateObj, todayDate: normalURL ? null : new Date(date) };
	}
	for (let meal of data.result[0].menuRecipiesData) {
		if (
			!today.some((x) => {
				return x.id == meal.rowId;
			})
		) {
			let concept = data.result[0].conceptData.find((x) => {
				return x.rowId == meal.rowId; //&& x.weekId == meal.weekId;
			}) || { conceptName: "couldn't find concept" };
			let newCategory = { name: concept.conceptName, id: meal.rowId, items: [] };
			today.push(newCategory);
		}
		let category = today.find((x) => {
			return x.id == meal.rowId;
		});
		let index = specialSearchIndexes[category.name] || fuse;

		let result =
			index.search(meal.componentEnglishName)[0]?.item.image ||
			specialSearchSets[category.name]?.[0]?.image;

		meal.image = result;
		category.items.push(meal);
	}
	today = today.sort((a, b) => {
		return a.id > b.id ? 1 : -1;
	});
	const { pathname } = url;

	return { today: today, date: dateNative, dateObj, todayDate: normalURL ? null : new Date(date), pathname };
}
