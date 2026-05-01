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
    if (heroVisual && window.innerWidth > 768) {
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
  { name: "TV Collection", category: "electronics-main", type: "Collection", originalPrice: "Explore All", price: "Premium Series", save: "Latest Models", badge: "Folder", image: "assets/tv.png" }
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

let currentCategory = 'furniture-main';
let currentCategoryName = 'Furniture';
let searchQuery = '';
let typeFilter = 'All';

function renderProducts() {
  if (!prodGrid) return;
  prodGrid.style.opacity = '0';
  prodGrid.style.transform = 'translateY(10px)';
  
  setTimeout(() => {
    if (currentCategory === 'furniture-main') {
      filtered = catalogData.filter(p => p.type === 'Furniture' || p.category === 'furniture-main');
    } else if (currentCategory === 'electronics-main') {
      filtered = catalogData.filter(p => p.type === 'Electronics' || p.category === 'electronics-main');
    } else {
      filtered = catalogData.filter(p => p.category === currentCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.type.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (typeFilter !== 'All') {
      filtered = filtered.filter(p => p.type === typeFilter);
    }

    let html = '';
    
    if (filtered.length === 0) {
      const msg = searchQuery ? 'No products found matching your search.' : `More ${currentCategoryName} products coming soon!`;
      html = `<div style="grid-column: 1/-1; padding: 4rem; text-align: center; color: var(--muted);">${msg}</div>`;
    } else {
      filtered.forEach(p => {
        const badgeHtml = p.badge ? `<span class="prod-badge">${p.badge}</span>` : '';
        html += `
        <div class="prod-card" onclick="openQuickView('${p.name.replace(/'/g, "\\'")}')">
          <div class="prod-img"><img src="${p.image}" alt="${p.name}"/>${badgeHtml}</div>
          <div class="prod-info">
            <div class="prod-cat">${p.type}</div>
            <div class="prod-name">${p.name}</div>
            <div class="prod-price-row">
              <span class="prod-price">${p.price}</span>
              <span class="prod-original">${p.originalPrice}</span>
              <span class="prod-save">${p.save}</span>
            </div>
            <button class="prod-btn" onclick="event.stopPropagation(); enquireProduct('${p.type}', '${p.name}', '${p.price}')">Enquire Now →</button>
          </div>
        </div>`;
      });
    }
    
    prodGrid.innerHTML = html;
    
    prodGrid.style.opacity = '1';
    prodGrid.style.transform = 'translateY(0)';
  }, 300);
}

// Category selection
if (catCards.length > 0) {
  renderProducts();
  
  catCards.forEach(card => {
    card.addEventListener('click', () => {
      catCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      
      currentCategory = card.getAttribute('data-category');
      currentCategoryName = card.querySelector('h3').innerText;
      
      renderProducts();
      document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
    });
  });
}

// Search Input
const searchInput = document.getElementById('productSearch');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProducts();
  });
}

// Type Filter Chips
const filterChips = document.querySelectorAll('.filter-chip');
filterChips.forEach(chip => {
  chip.addEventListener('click', () => {
    filterChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    typeFilter = chip.getAttribute('data-type');
    renderProducts();
  });
});

// EMI Calculator Logic
const emiAmount = document.getElementById('emiAmount');
const emiAmountVal = document.getElementById('emiAmountVal');
const monthlyEMI = document.getElementById('monthlyEMI');
const tenureBtns = document.querySelectorAll('.tenure-btn');
let currentTenure = 12;

function calculateEMI() {
  const p = parseFloat(emiAmount.value);
  const r = 12 / (12 * 100); // 12% p.a. interest
  const n = currentTenure;
  
  // EMI Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
  const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  
  emiAmountVal.innerText = `₹${p.toLocaleString('en-IN')}`;
  monthlyEMI.innerText = `₹${Math.round(emi).toLocaleString('en-IN')}`;
}

if (emiAmount) {
  emiAmount.addEventListener('input', calculateEMI);
  tenureBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tenureBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentTenure = parseInt(btn.getAttribute('data-months'));
      calculateEMI();
    });
  });
  calculateEMI(); // Initial calculation
}

// Map Tab Switching
const mapTabs = document.querySelectorAll('.map-tab');
const mapFrame = document.getElementById('mapFrame');
if (mapTabs.length > 0 && mapFrame) {
  mapTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      mapTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const mapUrl = tab.getAttribute('data-map');
      mapFrame.src = mapUrl;
    });
  });
}

// WhatsApp Enquiry Submission
const submitBtn = document.getElementById('submitEnquiry');
if (submitBtn) {
  submitBtn.addEventListener('click', () => {
    const name = document.getElementById('userName').value.trim();
    const phone = document.getElementById('userPhone').value.trim();
    const type = document.getElementById('enquiryType').value;
    const message = document.getElementById('enquiryMessage').value.trim();

    if (!name || !phone) {
      alert('Please enter your name and phone number.');
      return;
    }

    const whatsappNumber = '9842298464';
    const text = `*New Enquiry from AVM Enterprises Website*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Interested In:* ${type}%0A*Message:* ${message}`;
    
    const whatsappURL = `https://wa.me/91${whatsappNumber}?text=${text}`;
    window.open(whatsappURL, '_blank');
  });
}

// Quick View Modal Logic
function openQuickView(name) {
  const p = catalogData.find(item => item.name === name);
  if (!p) return;
  
  if (p.type === 'Collection') {
    window.location.href = 'tv-collection.html';
    return;
  }
  
  const modal = document.getElementById('quickViewModal');
  const img = document.getElementById('qvImg');
  const title = document.getElementById('qvTitle');
  const cat = document.getElementById('qvCat');
  const price = document.getElementById('qvPrice');
  const original = document.getElementById('qvOriginal');
  const save = document.getElementById('qvSave');
  const specsList = document.getElementById('qvSpecsList');
  const enquireBtn = document.getElementById('qvEnquireBtn');
  const waBtn = document.getElementById('qvWhatsappBtn');
  
  if (!modal || !img || !title) return;

  img.src = p.image;
  title.innerText = p.name;
  cat.innerText = p.type;
  price.innerText = p.price;
  original.innerText = p.originalPrice;
  save.innerText = p.save;
  
  // Dynamic Specs based on type/category
  let specs = [];
  if (p.type === 'Electronics') {
    specs = ["High Efficiency", "1-Year Warranty", "Energy Saver", "Latest Model"];
  } else {
    specs = ["Solid Wood", "Premium Finish", "Ergonomic Design", "Durable Build"];
  }
  
  specsList.innerHTML = specs.map(s => `<li>${s}</li>`).join('');
  
  enquireBtn.onclick = () => {
    modal.classList.remove('active');
    enquireProduct(p.type, p.name, p.price);
  };
  
  waBtn.onclick = () => {
    const msg = encodeURIComponent(`Hi AVM Enterprises, I'm interested in the ${p.name} (${p.price}). Please share more details.`);
    window.open(`https://wa.me/919842298464?text=${msg}`, '_blank');
  };
  
  modal.classList.add('active');
}

const closeQV = document.getElementById('closeQuickView');
const qvModal = document.getElementById('quickViewModal');

if (closeQV && qvModal) {
  closeQV.onclick = () => qvModal.classList.remove('active');
  qvModal.onclick = (e) => {
    if (e.target === qvModal) qvModal.classList.remove('active');
  };
}
