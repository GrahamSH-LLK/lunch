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
			referrer: 'https://www.schoolnutritionandfitness.com/',
			referrerPolicy: 'strict-origin-when-cross-origin',
			body: null,
			method: 'POST',
			credentials: 'omit'
		}
	);
	let data = await res.json();
	let today = [];
	console.log(data);
	for (let mealdex in data.data.menuTypes[0].items) {
		let meal = data.data.menuTypes[0].items[mealdex];

		if (meal.product.is_ancillary) {
			console.log('ancillary');
			let newMeal = { name: meal.product.name, items: [] };
			today.push(newMeal);
		} else {
			today[today.length - 1].items.push(meal.product);
		}
	}
	return { today: today, date: new Date(params.slug) };
}
