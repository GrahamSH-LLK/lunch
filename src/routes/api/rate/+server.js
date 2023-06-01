/** @type {import('./$types').RequestHandler} */
export async function POST({request}) {
	
	console.log('no');
	const {product_id, uuid,rating} = await request.json();

	let res = await fetch(
		'https://www.schoolnutritionandfitness.com/webmenus2/api/productController.php/rate',
		{
			headers: {
				
				accept: 'application/json, text/plain, */*',
				'accept-language': 'en-US,en;q=0.9',
				'content-type': 'application/json;charset=UTF-8'
			},
			referrer: 'https://www.schoolnutritionandfitness.com/webmenus2/',
			referrerPolicy: 'strict-origin-when-cross-origin',
			body: `{"sid":"1624626026767","product_id":"${product_id}","rate":${rating},"profile_uuid":"${uuid}"}`,
			method: 'POST',
			//credentials: 'include'
		}
	);
	console.log(res.statusText)
	
	return new Response();
}
