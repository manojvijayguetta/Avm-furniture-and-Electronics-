// Cursor
const cur=document.getElementById('cur'),curR=document.getElementById('curR');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;cur.style.left=mx-4+'px';cur.style.top=my-4+'px';});
(function loop(){rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;curR.style.left=Math.round(rx-16)+'px';curR.style.top=Math.round(ry-16)+'px';requestAnimationFrame(loop);})();

// Scroll reveal
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');}});
},{threshold:0.12});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

// Hero Effects
const hero = document.querySelector('.hero');
const heroGlow = document.getElementById('heroGlow');
const heroVisual = document.querySelector('.hero-visual');
if (hero && heroGlow) {
  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    heroGlow.style.setProperty('--x', `${e.clientX - rect.left}px`);
    heroGlow.style.setProperty('--y', `${e.clientY - rect.top}px`);
    if (heroVisual) {
      const mx = (e.clientX - window.innerWidth/2) * 0.02;
      const my = (e.clientY - window.innerHeight/2) * 0.02;
      heroVisual.style.transform = `translate(${mx}px, ${my}px)`;
    }
  });
}

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
  
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });
}

// Showroom Modal
const ctaBtns = document.querySelectorAll('.nav-cta');
const modal = document.getElementById('showroomModal');
const closeBtn = document.getElementById('closeModal');

if (ctaBtns.length > 0 && modal && closeBtn) {
  ctaBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('show');
    });
  });
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('show');
  });
}

const catalogData = [
  // Living Room Products (11 products)
  { name: "Royal 3-Seater Sofa", category: "living-room", type: "Furniture", originalPrice: "₹32,000", price: "₹24,999", save: "22% off", badge: "Bestseller", image: "assets/sofa.png" },
  { name: "55″ 4K Smart TV", category: "living-room", type: "Electronics", originalPrice: "₹58,000", price: "₹42,999", save: "26% off", badge: "New", image: "assets/tv.png" },
  { name: "L-Shaped Sectional Sofa", category: "living-room", type: "Furniture", originalPrice: "₹48,000", price: "₹39,999", save: "16% off", badge: "Premium", image: "assets/l_shaped_sofa.png" },
  { name: "Glass Coffee Table", category: "living-room", type: "Furniture", originalPrice: "₹18,000", price: "₹12,499", save: "30% off", badge: "", image: "assets/coffee_table.png" },
  { name: "Minimalist TV Unit", category: "living-room", type: "Furniture", originalPrice: "₹21,000", price: "₹16,999", save: "19% off", badge: "", image: "assets/tv_unit.png" },
  { name: "Leather Recliner", category: "living-room", type: "Furniture", originalPrice: "₹28,000", price: "₹22,999", save: "17% off", badge: "Popular", image: "assets/recliner.png" },
  { name: "Split Air Conditioner", category: "living-room", type: "Electronics", originalPrice: "₹45,000", price: "₹36,999", save: "17% off", badge: "Cooling", image: "assets/ac_unit.png" },
  { name: "Modern Floor Lamp", category: "living-room", type: "Electronics", originalPrice: "₹5,500", price: "₹3,999", save: "27% off", badge: "", image: "assets/floor_lamp.png" },
  { name: "5.1 Soundbar Setup", category: "living-room", type: "Electronics", originalPrice: "₹24,000", price: "₹18,999", save: "20% off", badge: "Audio", image: "assets/speaker.png" },
  { name: "Geometric Woven Rug", category: "living-room", type: "Furniture", originalPrice: "₹8,000", price: "₹5,499", save: "31% off", badge: "", image: "assets/rug.png" },
  { name: "Floating Wall Shelves", category: "living-room", type: "Furniture", originalPrice: "₹3,500", price: "₹2,499", save: "28% off", badge: "", image: "assets/wall_shelves.png" },

  // Bedroom Products
  { name: "King Size Bed + Storage", category: "bedroom", type: "Furniture", originalPrice: "₹26,000", price: "₹18,499", save: "29% off", badge: "Popular", image: "assets/bed.png" },
  { name: "Premium Wooden Wardrobe", category: "bedroom", type: "Furniture", originalPrice: "₹38,000", price: "₹29,999", save: "21% off", badge: "New", image: "assets/wardrobe.png" },
  { name: "Designer Dressing Table", category: "bedroom", type: "Furniture", originalPrice: "₹18,000", price: "₹13,499", save: "25% off", badge: "", image: "assets/dressing_table.png" },
  { name: "Geometric Woven Bedroom Rug", category: "bedroom", type: "Decor", originalPrice: "₹6,000", price: "₹4,499", save: "25% off", badge: "", image: "assets/rug.png" },
  { name: "Standing Corner Lamp", category: "bedroom", type: "Electronics", originalPrice: "₹5,000", price: "₹3,499", save: "30% off", badge: "", image: "assets/floor_lamp.png" },
  { name: "Split Air Conditioner", category: "bedroom", type: "Electronics", originalPrice: "₹42,000", price: "₹34,999", save: "16% off", badge: "Cooling", image: "assets/ac_unit.png" },
  { name: "Luxury Reading Chair", category: "bedroom", type: "Furniture", originalPrice: "₹24,000", price: "₹19,999", save: "16% off", badge: "", image: "assets/recliner.png" },

  // Kitchen/Dining
  { name: "6-Seater Dining Set", category: "dining", type: "Furniture", originalPrice: "₹42,000", price: "₹29,999", save: "28% off", badge: "Bestseller", image: "assets/dining.png" },
  { name: "Modern Bar Stools", category: "dining", type: "Furniture", originalPrice: "₹6,000", price: "₹4,499", save: "25% off", badge: "", image: "assets/coffee_table.png" },
  { name: "Serveware Display Cabinet", category: "dining", type: "Furniture", originalPrice: "₹19,000", price: "₹14,999", save: "21% off", badge: "", image: "assets/tv_unit.png" },
  { name: "Dining Wall Decor Shelves", category: "dining", type: "Furniture", originalPrice: "₹4,500", price: "₹2,999", save: "33% off", badge: "", image: "assets/wall_shelves.png" },
  { name: "Double Door Fridge", category: "dining", type: "Electronics", originalPrice: "₹36,500", price: "₹28,999", save: "21% off", badge: "Sale", image: "assets/fridge.png" },

  // Televisions
  { name: "55″ 4K Smart TV", category: "televisions", type: "Electronics", originalPrice: "₹58,000", price: "₹42,999", save: "26% off", badge: "New", image: "assets/tv.png" },
  { name: "65″ Ultra HD LED TV", category: "televisions", type: "Electronics", originalPrice: "₹75,000", price: "₹59,999", save: "20% off", badge: "Premium", image: "assets/tv.png" },
  { name: "Media Cabinet & TV Unit", category: "televisions", type: "Furniture", originalPrice: "₹18,000", price: "₹13,999", save: "22% off", badge: "", image: "assets/tv_unit.png" },
  { name: "Wireless Surround Soundbar", category: "televisions", type: "Electronics", originalPrice: "₹14,000", price: "₹10,500", save: "25% off", badge: "", image: "assets/speaker.png" },
  { name: "Wall-Mount Entertainment Shelves", category: "televisions", type: "Furniture", originalPrice: "₹3,500", price: "₹2,499", save: "28% off", badge: "", image: "assets/wall_shelves.png" },

  // Appliances
  { name: "Smart Inverter Refrigerator", category: "appliances", type: "Electronics", originalPrice: "₹36,500", price: "₹28,999", save: "21% off", badge: "Sale", image: "assets/fridge.png" },
  { name: "Front Load Washing Machine", category: "appliances", type: "Electronics", originalPrice: "₹35,000", price: "₹28,500", save: "18% off", badge: "Bestseller", image: "assets/fridge.png" },
  { name: "Split Air Conditioner 1.5T", category: "appliances", type: "Electronics", originalPrice: "₹45,000", price: "₹36,999", save: "17% off", badge: "Cooling", image: "assets/ac_unit.png" },
  { name: "Convection Microwave Oven", category: "appliances", type: "Electronics", originalPrice: "₹16,000", price: "₹12,500", save: "21% off", badge: "", image: "assets/ac_unit.png" },
  
  // Audio
  { name: "5.1 Surround Soundbar", category: "audio", type: "Electronics", originalPrice: "₹24,000", price: "₹18,999", save: "20% off", badge: "Audio", image: "assets/speaker.png" },
  { name: "Premium Tower Speakers", category: "audio", type: "Electronics", originalPrice: "₹32,000", price: "₹25,999", save: "18% off", badge: "Bestseller", image: "assets/speaker.png" },
  { name: "Mini Portable Speaker", category: "audio", type: "Electronics", originalPrice: "₹4,000", price: "₹2,999", save: "25% off", badge: "Portable", image: "assets/speaker.png" },
  { name: "Hifi Setup & Display Unit", category: "audio", type: "Furniture", originalPrice: "₹12,000", price: "₹8,999", save: "25% off", badge: "", image: "assets/tv_unit.png" },
  { name: "Cinematic Recliner", category: "audio", type: "Furniture", originalPrice: "₹30,000", price: "₹24,499", save: "18% off", badge: "Comfort", image: "assets/recliner.png" }
];

const prodGrid = document.getElementById('products-catalog');
const catCards = document.querySelectorAll('.cat-card');
const catalogTitle = document.getElementById('catalog-title');

function enquireProduct(type, name, price) {
  const enquiryType = document.getElementById('enquiryType');
  const enquiryMessage = document.getElementById('enquiryMessage');
  if (enquiryType) enquiryType.value = type === 'Electronics' ? 'Electronics' : 'Furniture';
  if (enquiryMessage) enquiryMessage.value = `I am interested in the ${name} (${price}). Please provide more details.`;
  window.location.href = '#contact';
}

function renderProducts(categoryId, categoryName) {
  if (!prodGrid) return;
  prodGrid.style.opacity = '0';
  prodGrid.style.transform = 'translateY(10px)';
  
  setTimeout(() => {
    const filtered = catalogData.filter(p => p.category === categoryId);
    let html = '';
    
    if (filtered.length === 0) {
      html = `<div style="grid-column: 1/-1; padding: 4rem; text-align: center; color: var(--muted);">More ${categoryName} products coming soon!</div>`;
    } else {
      filtered.forEach(p => {
        const badgeHtml = p.badge ? `<span class="prod-badge">${p.badge}</span>` : '';
        html += `
        <div class="prod-card">
          <div class="prod-img"><img src="${p.image}" alt="${p.name}"/>${badgeHtml}</div>
          <div class="prod-info">
            <div class="prod-cat">${p.type}</div>
            <div class="prod-name">${p.name}</div>
            <div class="prod-price-row">
              <span class="prod-price">${p.price}</span>
              <span class="prod-original">${p.originalPrice}</span>
              <span class="prod-save">${p.save}</span>
            </div>
            <button class="prod-btn" onclick="enquireProduct('${p.type}', '${p.name}', '${p.price}')">Enquire Now →</button>
          </div>
        </div>`;
      });
    }
    
    prodGrid.innerHTML = html;
    if(catalogTitle) catalogTitle.innerText = `${categoryName} Collection`;
    
    prodGrid.style.opacity = '1';
    prodGrid.style.transform = 'translateY(0)';
  }, 300);
}

if (catCards.length > 0) {
  renderProducts('living-room', 'Living Room');
  
  catCards.forEach(card => {
    card.addEventListener('click', () => {
      catCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      
      const catId = card.getAttribute('data-category');
      const catName = card.querySelector('h3').innerText;
      
      renderProducts(catId, catName);
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
  });
}
