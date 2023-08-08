/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
	
	const {product_id, uuid} = await request.json();

	let res = await fetch(
		'https://www.schoolnutritionandfitness.com/webmenus2/api/productController.php/get-my-rating',
		{
			headers: {
				
				accept: 'application/json, text/plain, */*',
				'accept-language': 'en-US,en;q=0.9',
				'content-type': 'application/json;charset=UTF-8'
			},
			//referrer: 'https://www.schoolnutritionandfitness.com/webmenus2/',
			//referrerPolicy: 'strict-origin-when-cross-origin',
			body: `{"sid":"1624626026767","product_id":"${product_id}","profile_uuid":"${uuid}"}`,
			method: 'POST',
			//credentials: 'include'
		}
	);
	
	return new Response(await res.text());
}
