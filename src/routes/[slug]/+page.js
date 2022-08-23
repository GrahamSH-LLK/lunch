import { error } from '@sveltejs/kit';

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
	let images = {
		'Chicken Patty Sandwich':
			'https://www.foxvalleyfoodie.com/wp-content/uploads/2020/10/homemade-chicken-patties-feature.jpg',
      "General Tso's Chicken with Fried Rice":'https://www.recipetineats.com/wp-content/uploads/2020/10/General-Tsao-Chicken_1-SQ.jpg',
		'Spicy Chicken Sandwich':
			'https://www.foxvalleyfoodie.com/wp-content/uploads/2020/10/homemade-chicken-patties-feature.jpg',
		'Cheeseburger on Bun':
			'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cheeseburger.jpg/1200px-Cheeseburger.jpg',
		'Hamburger on Bun':
			'https://www.inspiredtaste.net/wp-content/uploads/2016/08/Easy-Homemade-Hamburger-Recipe-2-1200.jpg',
		'Baked Ziti':
			'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F43%2F2022%2F06%2F29%2F18031-baked-ziti-ii-ddmfs-1x1-0340.jpg',
		'Cheese Pizza':
			'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F9%2F2022%2F02%2F15%2Fclassic-cheese-pizza-FT-RECIPE0422.jpg&q=60',
		'Pepperoni Pizza':
			'data:image/jpeg;base64,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',
		'Downtown Deli':
			'data:image/jpeg;base64,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'
	};
	for (let mealdex in data.data.menuTypes[0].items) {
		let meal = data.data.menuTypes[0].items[mealdex];

		if (meal.product.is_ancillary) {
			console.log('ancillary');
			let newMeal = { name: meal.product.name, items: [] };
			today.push(newMeal);
		} else {
			meal.product.image = images[meal.product.name] ? images[meal.product.name] : '';
			today[today.length - 1].items.push(meal.product);
		}
	}
	return { today: today, date: new Date(params.slug) };
}
