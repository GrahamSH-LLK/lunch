import { error } from '@sveltejs/kit';
import Fuse from 'fuse.js';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	let query = `query mobileSchoolPage($date: String!, $site_code: String!, $site_code2: String!, $useDepth2: Boolean!) {
        menuTypes(publish_location: "mobile", site: {depth_0_id: $site_code, depth_1_id: $site_code2}) {
          id
          name
          formats
          items(start_date: $date, end_date: $date) {
            date
            product {
              id
              name
              allergen_dairy
              allergen_egg
              allergen_fish
              allergen_gluten
              allergen_milk
              allergen_peanut
              allergen_pork
              allergen_shellfish
              allergen_soy
              allergen_treenuts
              allergen_vegetarian
              allergen_wheat
              allergen_other
              customAllergens
              image_url1
              image_url2
              pdf_url
              portion_size
              portion_size_unit
              price
              prod_allergens
              prod_calcium
              prod_calories
              prod_carbs
              prod_cholesterol
              prod_dietary_fiber
              prod_gram_weight
              prod_iron
              prod_mfg
              prod_protein
              prod_sat_fat
              prod_sodium
              prod_total_fat
              prod_trans_fat
              prod_vita_iu
              prod_vita_re
              prod_vitc
              sugar
              is_ancillary
              mealsPlusCustomAllergens
              mealsPlusCustomAttributes
              long_description
              hide_on_mobile
            }
          }
        }
        listMenus(publish_location: "mobile", site: {depth_0_id: $site_code, depth_1_id: $site_code2}) {
          id
          name
          items {
            product {
              id
              name
              allergen_dairy
              allergen_egg
              allergen_fish
              allergen_gluten
              allergen_milk
              allergen_peanut
              allergen_pork
              allergen_shellfish
              allergen_soy
              allergen_treenuts
              allergen_vegetarian
              allergen_wheat
              allergen_other
              customAllergens
              image_url1
              image_url2
              pdf_url
              portion_size
              portion_size_unit
              price
              prod_allergens
              prod_calcium
              prod_calories
              prod_carbs
              prod_cholesterol
              prod_dietary_fiber
              prod_gram_weight
              prod_iron
              prod_mfg
              prod_protein
              prod_sat_fat
              prod_sodium
              prod_total_fat
              prod_trans_fat
              prod_vita_iu
              prod_vita_re
              prod_vitc
              sugar
              is_ancillary
              mealsPlusCustomAllergens
              mealsPlusCustomAttributes
              long_description
              hide_on_mobile
            }
          }
        }
        pdfMenus(site: {depth_0_id: $site_code}) {
          id
          name
          url
        }
        site(depth: 0, id: $site_code) @skip(if: $useDepth2) {
          id
          parent_id
          name
          logo_url
          organization {
            id
            name
            logo_url
            OnlineMenuDesignSettings {
              customAllergens {
                field
                img
                label
                tooltip
              }
              mealsPlusCustomAllergens {
                field
                img
                label
                tooltip
                mealsPlusId
              }
              mealsPlusCustomAttributes {
                field
                img
                label
                tooltip
                mealsPlusId
              }
              disableAllergen
              showAllergens
              allergenFilterEnabled
              ratingEmojiShow
            }
            SnafDistrict {
              url_online_pay
            }
            SnafSettings {
              enable_surveys
              enable_announcements
            }
            OnlineOrderingSettings {
              enableSlc
              enableTlc
            }
            apps {
              onlineordering {
                enable_linq
              }
            }
          }
        }
        site2: site(depth: 1, id: $site_code2) @include(if: $useDepth2) {
          id
          parent_id
          name
          logo_url
          organization {
            id
            name
            logo_url
            OnlineMenuDesignSettings {
              customAllergens {
                field
                img
                label
                tooltip
              }
              mealsPlusCustomAllergens {
                field
                img
                label
                tooltip
                mealsPlusId
              }
              mealsPlusCustomAttributes {
                field
                img
                label
                tooltip
                mealsPlusId
              }
              disableAllergen
              showAllergens
              allergenFilterEnabled
              ratingEmojiShow
            }
            SnafDistrict {
              url_online_pay
            }
            SnafSettings {
              enable_surveys
              enable_announcements
            }
            OnlineOrderingSettings {
              enableSlc
              enableTlc
            }
            apps {
              onlineordering {
                enable_linq
              }
            }
          }
        }
      }
      `;

	let variables = `{"date":"${params.slug}","site_code":"19767","site_code2":"65146","useDepth2":true}`;
	let res = await fetch(
		`https://api.isitesoftware.com/graphql?query=${encodeURIComponent(
			query
		)}&variables=${encodeURIComponent(variables)}`,
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
			method: 'POST'
		}
	);
	let data = await res.json();
	let today = [];
	let images = [
		{
			name: 'Chicken Patty Sandwich',
			image:
				'https://www.foxvalleyfoodie.com/wp-content/uploads/2020/10/homemade-chicken-patties-feature.jpg'
		},
		{
			name: "General Tso's Chicken with Fried Rice",
			image:
				'https://www.recipetineats.com/wp-content/uploads/2020/10/General-Tsao-Chicken_1-SQ.jpg'
		},
		{
			name: 'Spicy Chicken Sandwich',
			image:
				'https://www.foxvalleyfoodie.com/wp-content/uploads/2020/10/homemade-chicken-patties-feature.jpg'
		},
		{
			name: 'Cheeseburger on Bun',
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
			name: 'Cheese Pizza',
			image:
				'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2022%2F02%2F15%2Fclassic-cheese-pizza-FT-RECIPE0422.jpg&q=60'
		},
		{
			name: 'Pepperoni Pizza',
			image: 'https://www.tasteatlas.com/images/dishes/b05a0af72ad845f3a6abe16143d7853a.jpg'
		},
		{
			name: 'Tater Tots',
			image:
				'https://cdn.vox-cdn.com/thumbor/Nc8pN-5K37_EGya_Ac-BsY7NoZ8=/1400x1050/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/9064347/tater_tots_closeup.jpg'
		},
		{
			name: 'Downtown Deli',
			image:
				'https://homemaderecipes.com/wp-content/uploads/2016/08/Two-Bacon-Burgers-on-Plates-deli-sandwiches-px-feature.jpg'
		},
		{
			name: 'Chicken Caesar Salad',
			image:
				'https://dinnersdishesanddesserts.com/wp-content/uploads/2021/11/Caesar-Salad-square-scaled.jpg'
		},
		{
			name: 'Assorted Fruit',
			image:
				'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2F1502826406%2F1708w-getty-fruit-closeup-CarstenSchanter-EyeEm.jpg%3Fitok%3DXFE9vQPZ'
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
    {name: 'Garden Salad', image: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-beet-salad-jpg-1526059794.jpg'}
	];
	const options = {
		includeScore: true,
		keys: ['name', 'alternateName']
	};

	const fuse = new Fuse(images, options);

	for (let mealdex in data.data.menuTypes[0].items) {
		let meal = data.data.menuTypes[0].items[mealdex];

		if (meal.product.is_ancillary) {
			console.log('ancillary');
			let newMeal = { name: meal.product.name, items: [] };
			today.push(newMeal);
		} else {
			let result = fuse.search(meal.product.name)[0]?.item.image;
			meal.product.image = result;
			today[today.length - 1].items.push(meal.product);
		}
	}
	return { today: today, date: new Date(params.slug) };
}
