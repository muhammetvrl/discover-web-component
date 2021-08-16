const template = document.createElement("template");
template.innerHTML = `
<style>
@import url('http://${window.location.host}/components/ProductCard/syled.css')
</style>
<div class="product-container">
    <div class="image-container">
        <img />
    </div>
    <h6 class="title"></h6>
    <div class="price"></div>
    <div class="shipping">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#36b458">
            <path
                d="M23.808 9.733L21.552 6.6A1.421 1.421 0 0020.4 6h-4.08V4.5c0-.828-.645-1.5-1.44-1.5H1.44C.645 3 0 3.672 0 4.5v12c0 .828.645 1.5 1.44 1.5h1.44c0 1.657 1.29 3 2.88 3 1.59 0 2.88-1.343 2.88-3h5.76c0 1.657 1.29 3 2.88 3 1.59 0 2.88-1.343 2.88-3h1.92c1.06 0 1.92-.895 1.92-2v-5.667c0-.216-.067-.427-.192-.6zM5.76 20c-1.06 0-1.92-.895-1.92-2s.86-2 1.92-2 1.92.895 1.92 2c-.001 1.104-.86 1.999-1.92 2zm11.52 0c-1.06 0-1.92-.895-1.92-2s.86-2 1.92-2 1.92.895 1.92 2c-.001 1.104-.86 1.999-1.92 2zm5.76-9h-6.72V7h4.08c.15 0 .293.075.384.2l2.256 3.133V11z">
            </path>
        </svg> 
        Ücretsiz Kargo
    </div>

    <button 
      class="btn btn-toast"  
      data-title="Ürün sepete eklendi." 
      data-text="Sepete Git">Sepete Ekle</button>
</div>
`;

class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    setTimeout(() => {
      this.shadowRoot.querySelector("h6.title").innerHTML =
        this.getAttribute("title");
      this.shadowRoot.querySelector("img").src =
        this.getAttribute("productImg");
      this.shadowRoot.querySelector(".price").innerHTML =
        this.getAttribute("price");
    }, 100);
  }
}

window.customElements.define("product-card", ProductCard);
