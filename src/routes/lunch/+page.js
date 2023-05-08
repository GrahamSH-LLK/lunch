import {redirect} from '@sveltejs/kit'
export async function load() {
    throw redirect(307,`/lunch/${encodeURIComponent(new Date().toLocaleString(undefined, {day: '2-digit', year: 'numeric', month: '2-digit'}))}`);
}
