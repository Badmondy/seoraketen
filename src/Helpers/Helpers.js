import {useRouter} from "vue-router";
export function playSound(path,volume)  {

    import( /* @vite-ignore */path).then((module) => {
        const audio = new Audio(module.default);
        audio.volume = volume;
        audio.play()

    }).catch((error) => {
        console.error('Error loading audio file:', error);
    });
}

export async function fetchKeywordInfo(keyword,website,restricted,index){
    return fetch(`https://www.googleapis.com/customsearch/v1?key=${import.meta.env.VITE_PUBLIC_API_KEY}&cx=${import.meta.env.VITE_PUBLIC_SEARCH_ENGINE_ID}&q=${keyword}&siteSearch=${website}&siteSearchFilter=${restricted}&start=${index}`)
        .then((response) => {
            if(response.ok){
                return response.json();
            }
            return { error: response.error }
        })
        .catch((error) => {
            console.error(`Something crashed ${error}`)
            return {error: 'Du har sökt för många gånger idag!'};
        });
}

export function sendToController(route,method,data){
    return fetch(route,
        {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            return response.ok ? response.json() : {message: 'HTTP error!', status: response.status};
        })
        .catch((error) => {
            console.error('Error fetching data: ', error);
        })
}