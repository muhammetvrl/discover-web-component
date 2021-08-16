import { data } from "../../product-list.js";

const categories = data.responses[0][0].params.userCategories;
const recommendedProducts = data.responses[0][0].params.recommendedProducts;

categories.forEach((cat, index) => {
  let tabEl = document.createElement("li");
  tabEl.setAttribute("class", "tab");

  if (index === 0) {
    tabEl.setAttribute("class", "tab active");
    getProduct(cat);
  }

  tabEl.setAttribute("data-tab-target", `cat${index}`);
  tabEl.setAttribute("data-cat", cat);
  tabEl.innerHTML = cat.split(">")[0];
  document.querySelector(".tabs").append(tabEl);
});

function getProduct(target) {
  const swiperWrapper = document.querySelector(".swiper-wrapper");

  document.querySelectorAll(".swiper-slide").forEach((e) => e.remove());

  recommendedProducts[target].forEach((product, index) => {
    let swiperSlide = document.createElement("div");
    swiperSlide.setAttribute("class", "swiper-slide");
    swiperSlide.setAttribute("style", "width: 242px;");
    swiperWrapper.append(swiperSlide);

    let productCard = document.createElement("product-card");
    productCard.setAttribute("title", product.name);
    productCard.setAttribute("price", product.priceText);
    productCard.setAttribute("productImg", product.image);
    productCard.setAttribute(
      "isCargo",
      product.params?.shippingFee === "FREE" ? true : false
    );
    document.querySelector(".swiper-wrapper").append(productCard);
    swiperSlide.append(productCard);
  });
}

var swiper = new Swiper(".swiper-container", {
  slidesPerView: 2,
  slidesPerGroup: 3,
  breakpoints: {
    640: {
      slidesPerView: 2,
      slidesPerGroup: 1,
    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,
    },
    1024: {
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    1400: {
      slidesPerView: 4,
      slidesPerGroup: 3,
    },
    1600: {
      slidesPerView: 5,
      slidesPerGroup: 3,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const tabsEl = document.querySelectorAll("[data-tab-target]");
tabsEl.forEach((tab) => {
  tab.addEventListener("click", () => {
    getProduct(tab.dataset.cat);
    listenerButton()
    tabsEl.forEach((tab) => {
      tab.classList.remove("active");
    });

    tab.classList.add("active");
  });
});

function render_xml(el, xml_string){
  var doc = new DOMParser().parseFromString(xml_string, 'application/xml');

  el.appendChild(
    el.ownerDocument.importNode(doc.documentElement, true)
  )
}

// when dom content is loaded 
document.addEventListener('DOMContentLoaded', (event) => {

  // get all elements with .toast-container class
  var toastContainer = document.querySelectorAll(".toast-container");
  // check if container already exist and add it if it doesen't
  if(toastContainer.length == 0){
      // prepare toast-container element
      var toastContainerContent = '<div class="toast-container"></div>'
       // add it to the end of the body
      document.querySelector("body").innerHTML += toastContainerContent;
  }
});

// function for creating toast elements available with parameters
function createToast(title, text, duration){
  var toastElem = document.createElement("div"); 
  toastElem.classList.add('toast');

  var titleElem = document.createElement("p"); 
  titleElem.classList.add('t-title');  

  titleElem.innerHTML += title;
  toastElem.appendChild(titleElem);

  var closeElem = document.createElement("p"); 
  closeElem.classList.add('t-close');
  toastElem.appendChild(closeElem);

  var textElement = document.createElement("p"); 
  textElement.classList.add('t-text');
  textElement.innerHTML = text;
  toastElem.appendChild(textElement);

  var  toastContainer = document.querySelector(".toast-container");

  var svg = `<svg width="14" height="14" viewBox="0 0 12 12" fill="#333">
              <path
                  d="M10.522 2.326L4.182 8.62 1.364 5.664a.828.828 0 00-1.169.087.824.824 0 00.095 1.162l3.465 3.52a.823.823 0 00.54.202l.082-.004a.829.829 0 00.573-.32l6.875-6.979a.824.824 0 10-1.304-1.006z"
                  fill="#fff" fill-rule="nonzero"></path>
            </svg>`;

render_xml(toastElem, svg)

  toastContainer.appendChild(toastElem);

  setTimeout(function(){                 
      toastElem.classList.add('active');
  }, 1);


  if(duration>0){
      setTimeout(function(){                 
          toastElem.classList.remove('active');
          setTimeout(function(){                 
              toastElem.remove();
          }, 350);       
      }, duration);
  }else if(duration == null){
      setTimeout(function(){                 
          toastElem.classList.remove('active');
          setTimeout(function(){                 
              toastElem.remove();
          }, 350);       
      }, 3000);
  }
}


document.addEventListener('click', function (e) {
  //check is the right element clicked
  if (!e.target.matches('.t-close')) return;
  else{
      var toastElement = e.target.parentElement;
      toastElement.classList.remove('active');
      setTimeout(function(){                 
          toastElement.remove();
      }, 350);
  }
});


function listenerButton(){
  document.querySelectorAll('product-card').forEach(item => item.shadowRoot.addEventListener("click", function (e) {
    if (!e.target.matches(".btn-toast")) return;
    else {
      //create toast message with dataset attributes
      createToast(
        e.target.dataset.title,
        e.target.dataset.text,
        e.target.dataset.duration
      );
    }
  }));
}

listenerButton();