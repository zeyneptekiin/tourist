//Data

const filterByCount = ({ count }) => {
    if (count > 5) return "moreThan"
    else return "lessThan"
}

const categories = document.createElement('section');
categories.classList.add('inner-container');
categories.classList.add('section-categories')

const fetchByCityName = async () => {
    const url = 'https://d1uolqnvceabeb.cloudfront.net/city-dest-types/istanbul.json';
    const arr = [];
    const response = await fetch(url);
    const data = await response.json();

    for (const [key, { list }] of Object.entries(data)) {
        arr.push({ title: key, list });
    }

    arr.forEach((place) => {
        const filteredData = Object.groupBy(place.list, filterByCount);

        const row = document.createElement('div');
        row.classList.add('slider');

        const rowTitle = document.createElement('div');
        rowTitle.textContent = place.title;
        rowTitle.classList.add('slider-title');
        row.appendChild(rowTitle);

        console.log(rowTitle);

        const wrapper = document.createElement('div');
        wrapper.classList.add('swiper-wrapper');

        filteredData.moreThan.forEach((item) => {
            const h3 = document.createElement('h3');
            h3.textContent = item.title2;

            console.log(h3);

            const sliderImg = document.createElement('img');
            sliderImg.classList.add('wrapper-box__img');
            sliderImg.src = `https://touristapplication.s3.eu-central-1.amazonaws.com/explore-photos/${item.image_url_key}.jpg`;

            console.log(sliderImg);

            const swiperSlide = document.createElement('div');
            swiperSlide.classList.add('swiper-slide');

            swiperSlide.appendChild(sliderImg);
            swiperSlide.appendChild(h3);
            wrapper.appendChild(swiperSlide);
        })

        // const swiper = new Swiper('.swiper', {
        //     slidesPerView: 6,
        //     spaceBetween: 30,
        //     loop: true,
        // })

        row.appendChild(wrapper);
        categories.appendChild(row);
    });

    document.body.appendChild(categories);
}
 
fetchByCityName();

// const slider = document.querySelectorAll('.swiper-wrapper');

// data.forEach((item) => {
//     const DOMImg = document.createElement('img');
//     DOMImg.classList.add('wrapper-box__img');
//     DOMImg.src = item.img;

//     const title = document.createElement('h3');
//     title.textContent = item.title;

//     const wrapper = document.createElement('div');
//     wrapper.classList.add('swiper-slide');

//     wrapper.appendChild(DOMImg);
//     wrapper.appendChild(title);
//     slider[0].appendChild(wrapper);
// })

// Swiper

// const swiper = new Swiper('.swiper', {
//     slidesPerView: 6,
//     spaceBetween: 30,
//     loop: true,
// });

// City Info

const searchInfo = document.getElementById("header-searchbar-info");
const cityImage = document.getElementById("cityImg");
const cityName = document.getElementById("cityName");

searchInfo.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {

        const searchText = searchInfo.value;

        //Change - Background Image

        const newSrc = 'https://d1uolqnvceabeb.cloudfront.net/city_background_photos/' + searchText.toLowerCase().replaceAll(" ", "_") + '_1.jpg';

        cityImage.src = newSrc;

        searchInfo.value = '';

        //Change - City Name

        cityName.innerText = searchText;

        //reload

        fetchByCityName(searchText)

    }
});
