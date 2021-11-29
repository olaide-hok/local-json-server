// javascript for index.html

// container for the posts
const container = document.querySelector('.blogs');

const searchForm = document.querySelector('.search');

// function to render post
const renderPosts = async (term) => {
    let url ='http://localhost:3000/posts?_sort=likes&_order=desc';
    if (term) {
        url += `&q=${term}`
    }

    const res = await fetch(url);
    const posts = await res.json();

    let template = '';
    posts.forEach(post => {
        template += `
            <div class="post">
                <h2>${post.title}</h2>
                <p><small>${post.likes} likes </small></p>
                <p>${post.body.slice(0, 200)}</p>
                <a href="/details.html?id=${post.id}"> continue reading ...</a>
            </div>
        `
    });

    container.innerHTML = template;
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault(),
    renderPosts(searchForm.term.value.trim())
})

// Invoke when all of the DOM content have been fully loaded
window.addEventListener('DOMContentLoaded', () => renderPosts());