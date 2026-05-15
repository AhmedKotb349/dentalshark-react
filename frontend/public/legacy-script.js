

function toggleTheme(){
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  document.getElementById('theme-toggle').textContent = isLight ? '🌙' : '🌓';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}
// Load saved theme
if(localStorage.getItem('theme')==='light'){ document.body.classList.add('light-mode'); const tt = document.getElementById('theme-toggle'); if(tt) tt.textContent = '🌙'; }

function showInfo(type){
  const titles = {faq:'Frequently Asked Questions', returns:'Returns & Exchange Policy', track:'Track Your Order', warranty:'Warranty Information', payment:'Payment Methods'};
  const icons = {faq:'❓', returns:'📦', track:'🚚', warranty:'🛡️', payment:'💳'};
  const content = {
    faq: `<h3>General Questions</h3><p><b>How do I place an order?</b><br>Browse the shop, add items to your cart, and click checkout. You'll receive a confirmation with your order number and tracking ID.</p><p><b>How long does delivery take?</b><br>Standard delivery takes 3–5 business days across all 27 Egyptian governorates. Express delivery (orders over 1,000 EGP) takes 1–2 business days.</p><p><b>Can I cancel my order?</b><br>You can cancel within 1 hour of placing the order. After that, contact us via WhatsApp.</p><h3>Payment</h3><p><b>What payment methods do you accept?</b><br>Cash on Delivery (COD), Credit/Debit Cards (Visa, Mastercard), Vodafone Cash / E-Wallets, and InstaPay bank transfers.</p><p><b>Is there a minimum order?</b><br>No minimum. Free shipping on orders over 500 EGP.</p><h3>Account & Points</h3><p><b>What are SHARK Points?</b><br>Earn points on every purchase (10% of value) and repair booking (+100 pts). Redeem for discounts, free shipping, and VIP perks.</p><p><b>How do I reset my password?</b><br>Click "Forgot Password?" on the login screen and enter your email.</p>`,
    returns: `<h3>Returns & Exchanges</h3><p>We offer a <b>14-day return policy</b> for unused and unopened products in original packaging.</p><h3>How to Return</h3><ol style="color:var(--text2);font-size:13px;line-height:2"><li>Contact us via WhatsApp at <b>+20 100 123 4567</b> within 14 days</li><li>Provide your order number and reason</li><li>We arrange a free pickup from your clinic</li><li>Refund processed within 5–7 business days</li></ol><h3>Non-Returnable Items</h3><ul style="color:var(--text2);font-size:13px;line-height:2"><li>Opened sterilization consumables</li><li>Custom-ordered equipment</li><li>Products damaged due to misuse</li><li>Items past the 14-day window</li></ul><h3>Exchanges</h3><p>Free exchanges within 14 days. Replacement ships within 2 business days.</p>`,
    track: `<h3>Track Your Order</h3><p style="margin-bottom:16px">Enter your Order ID (e.g., #DS-44821) or Tracking ID (e.g., TRK-DS44821):</p><div style="display:flex;gap:8px;margin-bottom:16px"><input id="track-input" class="form-input" placeholder="Enter Order ID or Tracking ID" style="flex:1"><button onclick="trackOrder(document.getElementById('track-input').value)" style="padding:10px 20px;background:var(--teal);border:none;border-radius:8px;color:#000;font-family:Inter,sans-serif;font-weight:700;cursor:pointer">🔍 Track</button></div><div id="track-results" style="display:none;background:var(--bg2);border:1px solid var(--b2);border-radius:12px;padding:16px;margin-bottom:16px"></div><h3>Order Status Guide</h3><div style="display:grid;gap:8px"><div style="display:flex;align-items:center;gap:10px;padding:8px;background:var(--bg2);border-radius:8px"><span class="s-tag s-pd">Pending</span><span style="font-size:12px;color:var(--text2)">Order received and being processed</span></div><div style="display:flex;align-items:center;gap:10px;padding:8px;background:var(--bg2);border-radius:8px"><span class="s-tag s-sh">Shipped</span><span style="font-size:12px;color:var(--text2)">On the way to your clinic</span></div><div style="display:flex;align-items:center;gap:10px;padding:8px;background:var(--bg2);border-radius:8px"><span class="s-tag s-dl">Delivered</span><span style="font-size:12px;color:var(--text2)">Successfully delivered</span></div></div><p style="margin-top:14px;font-size:12px;color:var(--text3)">Need help? <a onclick="navTo('contact')" style="color:var(--teal);cursor:pointer">Contact support</a></p>`,
    warranty: `<h3>Warranty Coverage</h3><div style="display:grid;gap:10px;margin-bottom:14px"><div style="padding:12px;background:rgba(78,204,163,.08);border:1px solid rgba(78,204,163,.2);border-radius:10px"><b style="color:var(--teal)">🔧 Handpieces & Turbines</b><p style="font-size:12px;color:var(--text2);margin-top:4px">6-month warranty. Covers manufacturing defects, bearing failures, and fiber optic issues.</p></div><div style="padding:12px;background:rgba(78,204,163,.08);border:1px solid rgba(78,204,163,.2);border-radius:10px"><b style="color:var(--teal)">🪑 Dental Units & Chairs</b><p style="font-size:12px;color:var(--text2);margin-top:4px">12-month warranty. Covers hydraulic systems, electronics, and upholstery defects.</p></div><div style="padding:12px;background:rgba(78,204,163,.08);border:1px solid rgba(78,204,163,.2);border-radius:10px"><b style="color:var(--teal)">♻️ Autoclaves & Sterilizers</b><p style="font-size:12px;color:var(--text2);margin-top:4px">12-month warranty. Covers seals, pressure systems, and electronic controls.</p></div><div style="padding:12px;background:rgba(78,204,163,.08);border:1px solid rgba(78,204,163,.2);border-radius:10px"><b style="color:var(--teal)">📡 Imaging & Sensors</b><p style="font-size:12px;color:var(--text2);margin-top:4px">6-month warranty. Covers sensor defects and cable issues.</p></div><div style="padding:12px;background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.2);border-radius:10px"><b style="color:var(--gold)">🔧 Repair Services</b><p style="font-size:12px;color:var(--text2);margin-top:4px">3-month service warranty on all repairs by Eng. Mohamed Kotb.</p></div></div><h3>How to Claim</h3><ol style="color:var(--text2);font-size:13px;line-height:2"><li>Contact us via WhatsApp with your order number</li><li>Describe the issue and attach photos if possible</li><li>We arrange pickup within 24 hours</li><li>Repair or replacement within 5–7 business days</li></ol>`,
    payment: `<h3>Accepted Payment Methods</h3><div style="display:grid;gap:10px;margin-bottom:16px"><div style="padding:14px;background:var(--bg2);border:1px solid var(--b2);border-radius:10px;display:flex;align-items:center;gap:12px"><span style="font-size:24px">💵</span><div><b style="color:var(--text)">Cash on Delivery (COD)</b><p style="font-size:11px;color:var(--text3);margin-top:2px">Pay when you receive your order. Available across all 27 governorates.</p></div></div><div style="padding:14px;background:var(--bg2);border:1px solid var(--b2);border-radius:10px;display:flex;align-items:center;gap:12px"><span style="font-size:24px">💳</span><div><b style="color:var(--text)">Credit / Debit Card</b><p style="font-size:11px;color:var(--text3);margin-top:2px">Visa, Mastercard, Meeza accepted. Secure SSL encryption.</p></div></div><div style="padding:14px;background:var(--bg2);border:1px solid var(--b2);border-radius:10px;display:flex;align-items:center;gap:12px"><span style="font-size:24px">📱</span><div><b style="color:var(--text)">E-Wallet (Vodafone Cash / Orange Money)</b><p style="font-size:11px;color:var(--text3);margin-top:2px">Pay via your mobile wallet. Instant confirmation.</p></div></div><div style="padding:14px;background:var(--bg2);border:1px solid var(--b2);border-radius:10px;display:flex;align-items:center;gap:12px"><span style="font-size:24px">🏦</span><div><b style="color:var(--text)">InstaPay Bank Transfer</b><p style="font-size:11px;color:var(--text3);margin-top:2px">Direct bank transfer. Order confirmed within 1 hour.</p></div></div></div><h3>Payment Security</h3><p style="font-size:12px;color:var(--text2);line-height:1.8">All transactions are protected with 256-bit SSL encryption. We never store card details. PCI DSS compliant.</p><h3>Installment Plans</h3><p style="font-size:12px;color:var(--text2);line-height:1.8">For orders over <b>10,000 EGP</b>, we offer interest-free installments up to 12 months via select banks.</p>`
  };
  document.getElementById('info-title').textContent = titles[type] || 'Support';
  document.getElementById('info-icon').textContent = icons[type] || '❓';
  document.getElementById('info-body').innerHTML = content[type] || '<p>Content coming soon.</p>';
  navTo('info');
}
function trackOrder(inputVal){
  const val=(inputVal || document.getElementById('track-input')?.value || '').trim();
  if(!val){toast('Please enter an Order ID or Tracking ID','warn');return}
  const res=document.getElementById('track-results');
  res.style.display='block';res.innerHTML='<div style="text-align:center;padding:20px;color:var(--text2)">🔍 Searching...</div>';
  fetch(API_URL+'/api/orders/track/'+encodeURIComponent(val)).then(r=>r.json()).then(data=>{
    if(data.error){res.innerHTML='<div style="text-align:center;padding:20px"><div style="font-size:32px;margin-bottom:8px">📦</div><div style="color:#f87171;font-weight:700">'+data.error+'</div><p style="font-size:12px;color:var(--text3);margin-top:8px">Double-check your ID and try again.</p></div>';return}
    const statusColors={Pending:'s-pd',Shipped:'s-sh',Delivered:'s-dl',Confirmed:'s-sh',Cancelled:'s-pd'};
    res.innerHTML='<div style="display:flex;align-items:center;gap:12px;margin-bottom:14px"><span style="font-size:28px">📦</span><div><div style="font-size:16px;font-weight:800;color:var(--teal)">'+data.orderId+'</div><div style="font-size:11px;color:var(--text3)">Tracking: '+data.trackingId+'</div></div><span class="s-tag '+(statusColors[data.status]||'s-pd')+'" style="margin-left:auto">'+data.status+'</span></div><div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><div style="padding:10px;background:var(--bg3);border-radius:8px"><div style="font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">Items</div><div style="font-size:14px;font-weight:700;color:var(--text)">'+data.items+' product(s)</div></div><div style="padding:10px;background:var(--bg3);border-radius:8px"><div style="font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">Total</div><div style="font-size:14px;font-weight:700;color:var(--teal)">'+(data.total||0).toLocaleString()+' EGP</div></div><div style="padding:10px;background:var(--bg3);border-radius:8px"><div style="font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">Payment</div><div style="font-size:14px;font-weight:700;color:var(--text)">'+(data.paymentMethod||'COD')+'</div></div><div style="padding:10px;background:var(--bg3);border-radius:8px"><div style="font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">Est. Delivery</div><div style="font-size:12px;font-weight:700;color:var(--text)">'+(data.estimatedDelivery||'3-5 days')+'</div></div></div>';
  }).catch(()=>{res.innerHTML='<div style="text-align:center;padding:20px;color:#f87171">⚠️ Could not connect to server. Please try again later.</div>'});
}
/* ===== DATA ===== */
const USERS=[
  {id:"owner",name:"Eng. Ahmed Kotb",role:"CEO",dept:"CEO & Admin",email:"ahmed.kotb@dentalshark.eg",phone:"+20 100 123 4567",initials:"AK",color:"linear-gradient(135deg,#1d4ed8,#3b82f6)",orders:42,spent:"EGP 280,000",joined:"Jan 2022"},
  {id:"eng",name:"Eng. Mohamed Kotb",role:"Engineer",dept:"Head Engineer & Repairing",email:"m.kotb@dentalshark.eg",phone:"+20 101 234 5678",initials:"MK",color:"linear-gradient(135deg,#7c3aed,#a855f7)",orders:0,spent:"—",joined:"Jan 2022"},
  {id:"v1",name:"Eng. Mohamed Gomaa",role:"Vendor",dept:"Handpieces Supply Partner",email:"m.gomaa@dentalshark.eg",phone:"+20 102 345 6789",initials:"MG",color:"linear-gradient(135deg,#059669,#10b981)",orders:0,spent:"—",joined:"Mar 2022"},
  {id:"v2",name:"Eng. Ahmed Sedky",role:"Vendor",dept:"Sterilization Supply Partner",email:"a.sedky@dentalshark.eg",phone:"+20 103 456 7890",initials:"AS",color:"linear-gradient(135deg,#d97706,#f59e0b)",orders:0,spent:"—",joined:"Jun 2022"},
  {id:"d1",name:"Dr. Ashraf Elsokary",role:"Doctor",dept:"Senior Dental Consultant",email:"dr.ashraf@clinic.eg",phone:"+20 104 567 8901",initials:"AE",color:"linear-gradient(135deg,#db2777,#f472b6)",orders:18,spent:"EGP 45,000",joined:"Feb 2023"},
  {id:"d2",name:"Dr. Nader Mersal",role:"Doctor",dept:"Orthodontist Specialist",email:"dr.nader@clinic.eg",phone:"+20 105 678 9012",initials:"NM",color:"linear-gradient(135deg,#0891b2,#22d3ee)",orders:24,spent:"EGP 62,000",joined:"Apr 2023"},
  {id:"ad1",name:"David Samir",role:"Staff",dept:"Inventory Manager",email:"d.samir@dentalshark.eg",phone:"+20 106 789 0123",initials:"DS",color:"linear-gradient(135deg,#7c3aed,#ec4899)",orders:0,spent:"—",joined:"Mar 2022"},
  {id:"ad2",name:"Omar Essam",role:"Student",dept:"Logistics Intern",email:"o.essam@dentalshark.eg",phone:"+20 107 890 1234",initials:"OE",color:"linear-gradient(135deg,#3b82f6,#2dd4bf)",orders:0,spent:"—",joined:"Apr 2022"},
  {id:"guest",name:"Guest User",role:"Guest",dept:"Visitor",email:"guest@dentalshark.eg",phone:"—",initials:"GU",color:"#64748b",orders:0,spent:"—",joined:"Apr 2026"},
];
const PRODUCTS = [
  {id:1, name:"Tetric N-Ceram Composite 3.5g", brand:"Ivoclar Vivadent", cat:"RESTORATIVE", cat2:"Restorative", price:1250, old:1490, badge:"sale", rating:4.8, rev:98, pts:125, img:"https://th.bing.com/th/id/OIP.VWEs7OeSvwIwna0uAeFaZwHaGE?w=229&h=196&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3", desc:"Light-cured nano-hybrid composite for anterior and posterior restorations with excellent aesthetics, durability, and natural shade matching."},
  {id:2, name:"Neo Spectra ST LV Composite 3g", brand:"Dentsply Sirona", cat:"RESTORATIVE", cat2:"Restorative", price:1575, old:1850, badge:"hot", rating:4.7, rev:76, pts:157, img:"https://th.bing.com/th/id/OIP.WAttaUiM9h9s5tkP6Kv_gQHaHa?w=195&h=195&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3", desc:"Universal nano-ceramic composite with SphereTEC filler technology for superior handling and polish."},
  {id:3, name:"NSK Pana-Max Plus Turbine", brand:"NSK", cat:"HANDPIECES", cat2:"Handpieces", price:3850, old:4500, badge:"new", rating:4.9, rev:42, pts:385, img:"https://tse2.mm.bing.net/th/id/OIP.xYoV5VBe89iqOxlatXKCSwHaHa?pid=ImgDet&w=202&h=202&c=7&dpr=2&o=7&rm=3", desc:"High-speed air turbine with ceramic bearings and anti-retraction valve for enhanced durability."},
  {id:4, name:"Cavitron 300 Ultrasonic Scaler", brand:"Dentsply Sirona", cat:"PERIODONTICS", cat2:"Periodontics", price:42000, old:48000, badge:"sale", rating:4.9, rev:15, pts:4200, img:"https://th.bing.com/th/id/OIP.9CZykMaBkwfiscyDh0vIhgHaE7?w=281&h=188&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3", desc:"Advanced digital ultrasonic scaling system with Steri-Mate 360 handpiece and wireless pedal."},
  {id:5, name:"Eighteeth E-Connect S Endo Motor", brand:"Eighteeth", cat:"ENDODONTICS", cat2:"Endodontics", price:9800, old:11500, badge:"hot", rating:4.7, rev:28, pts:980, img:"https://th.bing.com/th/id/OIP.SrDfdBbFkdBblqcID22sPAHaHZ?w=171&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3", desc:"Cordless endodontic motor with built-in apex locator and multi-program settings."},
  {id:6, name:"Mocom B Futura Autoclave 22L", brand:"Mocom", cat:"STERILIZATION", cat2:"Sterilization", price:85000, old:92000, badge:"new", rating:4.9, rev:12, pts:8500, img:"https://th.bing.com/th/id/OIP.koNOwKLA50dGIsNu3VJZJwHaFj?w=258&h=194&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3", desc:"Premium Class B steam sterilizer with Wi-Fi connectivity and integrated water sensor."},
  {id:7, name:"Woodpecker i-Sensor H1", brand:"Woodpecker", cat:"IMAGING", cat2:"Imaging", price:14500, old:16000, badge:"sale", rating:4.6, rev:34, pts:1450, img:"https://tse2.mm.bing.net/th/id/OIP.4ia4LH5Y3jr8EXfnz9GMcAHaHa?pid=ImgDet&w=202&h=202&c=7&dpr=2&o=7&rm=3", desc:"High-definition intraoral digital X-ray sensor with ultra-slim design for patient comfort."},
  {id:8, name:"KaVo Primus 1058 Life", brand:"KaVo", cat:"DENTAL UNITS", cat2:"Dental Units", price:245000, old:270000, badge:"hot", rating:4.9, rev:8, pts:24500, img:"https://th.bing.com/th/id/OIP.fsiqwbZYkZdi4davFzUsgQHaEK?w=297&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3", desc:"Ergonomic dental chair with high-quality upholstery and integrated hygiene functions."},
  {id:9, name:"3M Filtek Z350 XT Composite", brand:"3M ESPE", cat:"RESTORATIVE", cat2:"Restorative", price:1450, old:1600, badge:"new", rating:4.9, rev:112, pts:145, img:"https://th.bing.com/th/id/OIP.t85XC-d_3kUAR5zSOCqHLQHaHa?w=201&h=201&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3", desc:"Premium universal nanocomposite with excellent wear resistance and polish retention."},
  {id:10, name:"NSK Ti-Max Z95L Contra-Angle", brand:"NSK", cat:"HANDPIECES", cat2:"Handpieces", price:15200, old:17500, badge:"hot", rating:5.0, rev:45, pts:1520, img:"https://blog.confidental.org/wp-content/uploads/2024/06/NSK-Ti-MAX-Z95L-1024x576.png", desc:"1:5 increasing contra-angle handpiece with titanium body and cellular glass optics."},
  {id:11, name:"Woodpecker Endo Radar Plus", brand:"Woodpecker", cat:"ENDODONTICS", cat2:"Endodontics", price:12500, old:14000, badge:"sale", rating:4.8, rev:64, pts:1250, img:"https://tse2.mm.bing.net/th/id/OIP.QFAHmfoktISJh0kXsUqHEwHaHa?pid=ImgDet&w=202&h=202&c=7&dpr=2&o=7&rm=3", desc:"Wireless endo motor with integrated apex locator, supporting reciprocating and rotary motion."},
  {id:12, name:"KaVo Kerr SonicFill 3", brand:"KaVo Kerr", cat:"RESTORATIVE", cat2:"Restorative", price:8900, old:9500, badge:"new", rating:4.7, rev:39, pts:890, img:"https://th.bing.com/th/id/OIP.sXYU6QHA5R_ACe1S_SgsAwHaGf?w=193&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3", desc:"Advanced sonic-activated bulk fill system for fast and void-free restorations."},
  {id:13, name:"Dentsply Propex Pixi", brand:"Dentsply Sirona", cat:"ENDODONTICS", cat2:"Endodontics", price:7400, old:8200, badge:"hot", rating:4.9, rev:51, pts:740, img:"https://th.bing.com/th/id/OIP.pIsuycSCQNzd6E8JclKQWAHaHa?w=177&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3", desc:"Miniature apex locator that fits in your pocket, accurate in both wet and dry canals."},
  {id:14, name:"W&H Lina Autoclave 22L", brand:"W&H", cat:"STERILIZATION", cat2:"Sterilization", price:92000, old:105000, badge:"sale", rating:5.0, rev:19, pts:9200, img:"https://th.bing.com/th/id/OIP.pOJrW93ZT5Utxvwjo3J31wHaHa?w=193&h=193&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3", desc:"Reliable Class B sterilizer with Eco Dry technology and low water consumption."},
  {id:15, name:"KaVo Mastertorque M9000L", brand:"KaVo", cat:"HANDPIECES", cat2:"Handpieces", price:18500, old:21000, badge:"new", rating:4.9, rev:24, pts:1850, img:"https://th.bing.com/th/id/OIP.yViZBp68qmO77JZ-rwN89AHaHa?w=187&h=187&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3", desc:"High-end turbine with Direct Stop Technology and silent operation."},
  {id:16, name:"Meta Biomed EQ-V Fill", brand:"Meta Biomed", cat:"ENDODONTICS", cat2:"Endodontics", price:11200, old:13000, badge:"hot", rating:4.8, rev:18, pts:1120, img:"https://th.bing.com/th/id/OIP.TghORw7OYJZZZDzNHEDu0gHaHa?w=162&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3", desc:"Gutta-percha obturation system for precise root canal filling."},
  {id:17, name:"Tokuyama Estelite Sigma Quick", brand:"Tokuyama Dental", cat:"RESTORATIVE", cat2:"Restorative", price:1150, old:1350, badge:"sale", rating:4.9, rev:56, pts:115, img:"https://th.bing.com/th/id/OIP.5nNsJaXnOVoDUqhmQO9IzgAAAA?w=180&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3", desc:"Quick-curing universal composite with outstanding polishability."},
  {id:18, name:"NSK Surgic Pro Optic", brand:"NSK", cat:"SURGICAL", cat2:"Surgical", price:72000, old:80000, badge:"new", rating:5.0, rev:11, pts:7200, img:"https://th.bing.com/th/id/OIP.D4HokRF6NcDg0Dfwu8qsbgHaEK?w=324&h=182&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3", desc:"Micromotor system for oral surgery and dental implants with LED optics."},
  {id:19, name:"Promedica N-Fill Flow", brand:"Promedica", cat:"RESTORATIVE", cat2:"Restorative", price:650, old:850, badge:"hot", rating:4.7, rev:41, pts:65, img:"https://tse4.mm.bing.net/th/id/OIP.Pr06ArbSv7y_i_N3e56ksQAAAA?pid=ImgDet&w=202&h=105&c=7&dpr=2&o=7&rm=3", desc:"Light-cured flowable restorative composite for minimal intervention."},
  {id:20, name:"Dentsply Aquasil Soft Putty", brand:"Dentsply Sirona", cat:"RESTORATIVE", cat2:"Restorative", price:1950, old:2200, badge:"sale", rating:4.8, rev:29, pts:195, img:"https://th.bing.com/th/id/OIP.57b1PbtLgOOJwBFVAHYLjwHaE7?w=266&h=180&c=7&r=0&o=7&dpr=2&pid=1.7&rm=3", desc:"Premium silicone impression material for highly accurate restorations."},
];
const CATS=[{n:"Restorative",i:"🔬"},{n:"Endodontics",i:"🔩"},{n:"Handpieces",i:"⚙️"},{n:"Dental Units",i:"🦷"},{n:"Sterilization",i:"🧪"},{n:"Imaging",i:"📡"},{n:"Periodontics",i:"🌿"},{n:"Orthodontics",i:"😁"},{n:"Surgical",i:"🔪"}];
CATS.forEach(c => c.c = PRODUCTS.filter(p=>p.cat2===c.n).length);
const BRANDS=["Ivoclar Vivadent","Dentsply Sirona","Tokuyama Dental","Promedica","Schutz Dental","Dentkist","Meta Biomed","Eighteeth Medical"];
const SERVICES=[
  {ic:"🔧",nm:"Handpiece Repair",pr:"From 800 EGP",ds:"Full turbine overhaul, bearing replacement, spray system. KaVo, NSK, W&H, Bien-Air."},
  {ic:"📡",nm:"X-Ray Calibration",pr:"From 1,200 EGP",ds:"Digital sensor calibration, generator maintenance, image quality optimization."},
  {ic:"🪑",nm:"Chair Service",pr:"From 1,500 EGP",ds:"Hydraulic system, upholstery, instrument tray, light maintenance. All brands."},
  {ic:"♻️",nm:"Autoclave Service",pr:"From 900 EGP",ds:"Seal replacement, pressure testing, cycle validation. Class B compliance."},
  {ic:"🔬",nm:"Full Clinic Audit",pr:"From 2,500 EGP",ds:"Complete examination of all equipment with detailed condition report and recommendations."},
  {ic:"📋",nm:"Annual Contract",pr:"From 3,600 EGP/yr",ds:"Priority 24h response, free minor repairs, quarterly preventive checks included."},
];
const SLIDES=[PRODUCTS[7],PRODUCTS[9],PRODUCTS[6],PRODUCTS[3],PRODUCTS[17],PRODUCTS[5]].map(p=>({nm:p.name,br:p.brand,cat:p.cat,pr:p.price.toLocaleString()+" EGP",img:p.img}));
const NOTIFS=[
  {t:"New order — NSK Turbine Handpiece placed",tm:"2 min ago",read:false},
  {t:"Repair completed — KaVo Dental Chair serviced",tm:"1 hr ago",read:false},
  {t:"Flash deal: 40% off autoclaves — 2 hrs left!",tm:"3 hrs ago",read:false},
  {t:"Eng. Gomaa listed 3 new handpieces",tm:"Yesterday",read:true},
  {t:"Dr. Ashraf placed a new order",tm:"2 days ago",read:true},
  {t:"Welcome to DentalShark! 🦈 You earned 100 bonus points",tm:"Jan 2023",read:true},
];
const VALUES=[
  {ic:"🎯",nm:"Quality First",ds:"Every product verified for authenticity. We partner only with certified international dental brands recognized globally for quality and innovation."},
  {ic:"🤖",nm:"AI Innovation",ds:"Egypt's first dental marketplace with integrated AI diagnostics — powered by machine learning trained on 500K+ dental images."},
  {ic:"💛",nm:"Community",ds:"More than a marketplace — a thriving community of 5,000+ Egyptian dental professionals sharing knowledge, trust and expertise."},
];
const ROLE_DEFAULTS={dentist:{uid:"d1"},vendor:{uid:"v1"},student:{uid:"ad2"},admin:{uid:"owner"},staff:{uid:"ad1"},engineer:{uid:"eng"}};

/* ===== STATE ===== */
let CU=null,cart=[],wishlist=[],sharkPts=0,slideIdx=0,slideTimer=null,loginTime=null;
let fCat="",fBrands=[],currPage=1,pageSize=12;

/* ===== INIT ===== */
const initApp = () => {
  startFBTimer();startFlashCountdown();
  buildSlideshow();buildCatGrid();buildFlashGrid();buildFeaturedGrid();buildTeamGrid("team-home",4);
  buildShopSidebar();buildServices();buildValues();
};
if(document.readyState === 'loading') window.addEventListener('DOMContentLoaded', initApp); else setTimeout(initApp, 1);

/* ===== UTILS ===== */
function p2(n) { return String(n).padStart(2,"0"); }
function toast(msg,type="info"){
  const icons={success:"✅",warn:"⚠️",error:"❌",info:"💡"};
  document.getElementById("toast-icon").textContent=icons[type]||"💡";
  document.getElementById("toast-msg").textContent=msg;
  const t=document.getElementById("toast");t.classList.add("show");setTimeout(()=>t.classList.remove("show"),3200);
}

/* ===== TIMERS ===== */
function startFBTimer(){
  let s=3*3600+24*60+17;
  const el=document.getElementById("fbt");
  const mel=document.getElementById("mft");
  setInterval(()=>{
    const h=Math.floor(s/3600),m=Math.floor((s%3600)/60),sec=s%60;
    const txt = p2(h)+":"+p2(m)+":"+p2(sec);
    if(el)el.textContent=txt;
    if(mel)mel.textContent=txt;
    s>0?s--:s=5*3600;
  },1000);
}

function startFlashCountdown(){let e=Date.now()+(2*3600+45*60+30)*1000;const tick=()=>{const d=Math.max(0,e-Date.now()),h=Math.floor(d/3600000),m=Math.floor((d%3600000)/60000),s=Math.floor((d%60000)/1000);["fh","fm","fs"].forEach((id,i)=>{const el=document.getElementById(id);if(el)el.textContent=p2([h,m,s][i])});const ht=document.getElementById("hero-flash-timer");if(ht)ht.textContent=p2(h)+":"+p2(m)+":"+p2(s);if(d<=0)e=Date.now()+6*3600*1000};tick();setInterval(tick,1000)}
function buildFooter(){
  return `<footer>
    <div class="footer-grid">
      <div>
        <div style="display:flex;align-items:center;gap:9px;margin-bottom:4px">
          <img id="footer-logo-img" src="" alt="DentalShark Logo" style="width:40px;height:40px;object-fit:contain;border-radius:8px">
          <span style="font-size:18px;font-weight:800;color:#fff">Dental<span style="color:var(--teal)">Shark</span></span>
        </div>
        <div class="free-ship-badge" onclick="toast('? Offer ends in 02:45:30','info')" style="cursor:pointer"><span>🚚</span> Free shipping Egypt-wide on orders 500+ EGP</div>
        <p style="font-size:11px;color:var(--text2);line-height:1.8;max-width:240px;margin-top:10px">Egypt's #1 dental equipment marketplace connecting clinics, doctors and vendors.</p>
        <div class="footer-pts" onclick="navTo('sharkpoints')" style="cursor:pointer; display:inline-flex; align-items:center; gap:8px; width:fit-content;" onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">
          <span style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;background:var(--gold);color:#000;border-radius:6px;font-size:14px;font-weight:900;box-shadow:0 0 10px rgba(245,158,11,0.3)">⚡</span>
          <span style="font-size:13px; font-weight:700; color:var(--gold); letter-spacing:0.5px;">SHARK Points</span>
        </div>
      </div>
      <div class="footer-col"><h4>Quick Links</h4><a onclick="navTo('shop')">Shop All</a><a>Flash Deals</a><a onclick="navTo('ai')">AI Scanner</a><a onclick="navTo('engineers')">Engineers</a><a onclick="openWishlist()">My Wishlist ❤️</a><a onclick="navTo('sharkpoints')">SHARK Points ⚡</a></div>
      <div class="footer-col"><h4>Support</h4><a onclick="navTo('contact')">Contact Us</a><a onclick="showInfo('faq')">FAQ</a><a onclick="showInfo('returns')">Returns</a><a onclick="showInfo('track')">Track Order</a><a onclick="showInfo('warranty')">Warranty</a><a onclick="showInfo('payment')">Payment Methods</a></div>
      <div class="footer-col"><h4>Newsletter</h4><p style="font-size:11px;color:var(--text2);margin-bottom:9px">Exclusive deals and new products straight to your inbox.</p><div class="nl-form"><input placeholder="your@email.com"><button onclick="toast('? Subscribed!','success')">Subscribe</button></div></div>
    </div>
    <div class="footer-bottom"><span>© 2025 DentalShark. CEO & Admin: Eng. Ahmed Kotb. All Rights Reserved.</span><span>🦷 Made with precision in Egypt 🇪🇬</span></div>
  </footer>`;
}
function startSessionTimer(){loginTime=Date.now();const el=document.getElementById("session-timer");setInterval(()=>{if(!loginTime||!el)return;const d=Date.now()-loginTime,h=Math.floor(d/3600000),m=Math.floor((d%3600000)/60000),s=Math.floor((d%60000)/1000);el.textContent="⏱ "+p2(h)+":"+p2(m)+":"+p2(s)},1000)}

/* ===== SLIDESHOW ===== */
function buildSlideshow(){
  const ss=document.getElementById("hero-ss"),dots=document.getElementById("sdots");
  ss.querySelectorAll(".slide").forEach(s=>s.remove());dots.innerHTML="";
  SLIDES.forEach((s,i)=>{
    const d=document.createElement("div");d.className="slide"+(i===0?" active":"");
    d.innerHTML=`<img src="${s.img}" alt="${s.nm}" onerror="this.parentElement.style.background='#0f2040'"><div class="slide-overlay"></div><div class="slide-info"><div class="si-cat">${s.cat}</div><div class="si-name">${s.nm}</div><div class="si-brand">${s.br}</div><div class="si-price">${s.pr}</div></div>`;
    ss.insertBefore(d,ss.querySelector(".slide-arrow"));
    const dot=document.createElement("div");dot.className="sdot"+(i===0?" active":"");dot.onclick=()=>goSlide(i);dots.appendChild(dot);
  });
  clearInterval(slideTimer);slideTimer=setInterval(nextSlide,4500);
}
function goSlide(n){slideIdx=(n+SLIDES.length)%SLIDES.length;document.querySelectorAll(".slide").forEach((s,i)=>s.classList.toggle("active",i===slideIdx));document.querySelectorAll(".sdot").forEach((d,i)=>d.classList.toggle("active",i===slideIdx))}
function nextSlide(){goSlide(slideIdx+1)}function prevSlide(){goSlide(slideIdx-1)}

/* ===== PRODUCT CARD ===== */
function pcard(p){
  const bmap={sale:"b-sale",hot:"b-hot",new:"b-new",flash:"b-flash"};
  const blabel={sale:"SALE",hot:"🔥 HOT",new:"NEW",flash:"⚡ FLASH"};
  const disc=p.old?Math.round((1-p.price/p.old)*100):0;
  const stars=Math.round(p.rating);
  const inWL=!!wishlist.find(x=>x.id===p.id);
  return`<div class="pc" onclick="openProductModal(${p.id})">
    <div class="pc-img-wrap">
      <img class="pc-img" src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.parentElement.style.background='#0f2040'">
      <div class="pc-img-overlay"></div>
      ${p.badge?`<div class="pc-badge ${bmap[p.badge]||"b-new"}">${blabel[p.badge]||p.badge.toUpperCase()}</div>`:""}
      <button class="pc-wish ${inWL?"wl-active":""}" data-pid="${p.id}" onclick="event.stopPropagation();wToggle(this,${p.id})" title="${inWL?"Remove from":"Add to"} wishlist">${inWL?"❤️":"🤍"}</button>
    </div>
    <div class="pc-body">
      <div class="pc-cat">🔬 ${p.cat}</div>
      <div class="pc-name">${p.name}</div>
      <div class="pc-brand">${p.brand}</div>
      <div class="pc-desc">${p.desc}</div>
      <div class="pc-rating"><span class="pc-stars">${"★".repeat(stars)}${"☆".repeat(5-stars)}</span><span class="pc-rating-num">${p.rating}</span><span class="pc-rating-cnt">(${p.rev})</span></div>
      <div class="pc-price-row">
        <span class="pc-price">${p.price.toLocaleString()} EGP</span>
        ${p.old?`<span class="pc-old">${p.old.toLocaleString()} EGP</span><span class="pc-disc">-${disc}%</span>`:""}
      </div>
      <div class="pc-pts">⚡ Earn ${p.pts} SHARK Points</div>
      <div class="pc-ship">${p.price>1000?'<span style="color:var(--gold)">⚡ Express 1–2 days</span>':'<span style="color:var(--teal)">🚚 Free shipping 3–5 days</span>'}</div>
      <div class="pc-actions">
        <button class="btn-cart" onclick="event.stopPropagation();addToCart(${p.id})">🛒 Add to Cart</button>
        <button class="btn-qv" onclick="event.stopPropagation();openProductModal(${p.id})" title="Quick View">👁</button>
      </div>
    </div>
  </div>`;
}

/* ===== BUILDERS ===== */
function buildCatGrid(){document.getElementById("cat-grid").innerHTML=CATS.map(c=>`<div class="cat-card" onclick="shopByCat('${c.n}')"><div class="cat-icon">${c.i}</div><div class="cat-name">${c.n}</div><div class="cat-count">${c.c}</div></div>`).join("")}
function buildFlashGrid(){document.getElementById("flash-grid").innerHTML=PRODUCTS.slice(0,4).map(p=>pcard(p)).join("")}
function buildFeaturedGrid(){document.getElementById("featured-grid").innerHTML=PRODUCTS.slice(3,7).map(p=>pcard(p)).join("")}
function buildTeamGrid(id,limit){
  const t=USERS.slice(0,limit||USERS.length);
  const el=document.getElementById(id);if(!el)return;
  el.innerHTML=t.map(u=>`<div class="team-card"><div class="team-av" style="background:${u.color}">${u.initials}</div><div class="team-name" onclick="openProfileModal('${u.id}')">${u.name}</div><div class="team-role">${u.role}</div><div class="team-dept">${u.dept}</div></div>`).join("");
}
function buildServices(){const g=document.getElementById("svcs-grid");if(!g)return;g.innerHTML=SERVICES.map(s=>`<div class="svc-card"><span class="svc-icon">${s.ic}</span><div class="svc-name">${s.nm}</div><div class="svc-price">${s.pr}</div><div class="svc-desc">${s.ds}</div></div>`).join("")}
function buildValues(){const g=document.getElementById("values-grid");if(!g)return;g.innerHTML=VALUES.map(v=>`<div class="val-card"><div class="val-icon">${v.ic}</div><div class="val-name">${v.nm}</div><div class="val-desc">${v.ds}</div></div>`).join("")}

/* ===== SHOP ===== */
function buildShopSidebar(){
  document.getElementById("shop-cats").innerHTML=`<div class="scat-item active" onclick="shopByCat('',this)"><span>All Products</span><span class="scat-cnt">${PRODUCTS.length}</span></div>`+CATS.map(c=>`<div class="scat-item" onclick="shopByCat('${c.n}',this)"><span>${c.i} ${c.n}</span><span class="scat-cnt">${c.c}</span></div>`).join("");
  document.getElementById("shop-brands").innerHTML=BRANDS.map(b=>`<label class="sbrand-item"><input type="checkbox" value="${b}" onchange="filterBrand()"> ${b}</label>`).join("");
  refreshShop();
}
function shopByCat(cat,el){fCat=cat;document.querySelectorAll(".scat-item").forEach(c=>c.classList.remove("active"));if(el)el.classList.add("active");navTo("shop")}
function filterBrand(){fBrands=Array.from(document.querySelectorAll("#shop-brands input:checked")).map(i=>i.value);refreshShop()}
function refreshShop(){
  let ps=[...PRODUCTS];
  const q=(document.getElementById("shop-search")?.value||"").toLowerCase();
  const sort=document.getElementById("shop-sort")?.value||"";
  if(fCat)ps=ps.filter(p=>p.cat2===fCat);
  if(fBrands.length)ps=ps.filter(p=>fBrands.includes(p.brand));
  if(q)ps=ps.filter(p=>p.name.toLowerCase().includes(q)||p.brand.toLowerCase().includes(q)||p.cat2.toLowerCase().includes(q));
  if(sort.includes("Low to High"))ps.sort((a,b)=>a.price-b.price);
  if(sort.includes("High to Low"))ps.sort((a,b)=>b.price-a.price);
  if(sort.includes("Rated"))ps.sort((a,b)=>b.rating-a.rating);

  const total = ps.length;
  const pages = Math.ceil(total / pageSize);
  currPage = Math.min(currPage, pages || 1);
  const start = (currPage - 1) * pageSize;
  const paginated = ps.slice(start, start + pageSize);

  const g=document.getElementById("shop-grid");if(g)g.innerHTML=paginated.length?paginated.map(p=>pcard(p)).join(""):`<div style="grid-column:1/-1;text-align:center;padding:48px;color:var(--text2)">No products found.</div>`;
  const c=document.getElementById("shop-count");if(c)c.textContent=total+" product"+(total!==1?"s":"");
  
  const pagBox = document.getElementById("shop-pagination");
  if(pagBox) {
    pagBox.innerHTML = Array.from({length:pages}, (_,i)=>i+1).map(p=>`
      <button onclick="currPage=${p};refreshShop();window.scrollTo(0,0);" style="padding:8px 14px; background:${p===currPage?'var(--teal)':'var(--card)'}; color:${p===currPage?'#000':'var(--text)'}; border:1px solid var(--b2); border-radius:8px; cursor:pointer; font-weight:700;">${p}</button>
    `).join('');
  }
  setTimeout(syncWLHearts,50);
}

/* ===== SEARCH ===== */
function handleSK(e){if(e.key==="Enter")doSearch();else showSDrop()}
function showSDrop(){
  const q=(document.getElementById("nsi").value||"").toLowerCase();
  const drop=document.getElementById("search-drop");
  if(!q||q.length<2){drop.classList.remove("open");return}
  const matches=PRODUCTS.filter(p=>p.name.toLowerCase().includes(q)||p.brand.toLowerCase().includes(q)).slice(0,6);
  if(!matches.length){drop.classList.remove("open");return}
  drop.innerHTML=matches.map(p=>`<div class="sdrop-item" onclick="openProductModal(${p.id})"><img class="sdrop-img" src="${p.img}" onerror="this.style.background='#1e2a3a'"><div><div class="sdrop-name">${p.name}</div><div class="sdrop-brand">${p.brand}</div></div><span class="sdrop-price">${p.price.toLocaleString()}</span></div>`).join("");
  drop.classList.add("open");
}
function doSearch(){const q=document.getElementById("nsi").value;document.getElementById("search-drop").classList.remove("open");document.getElementById("shop-search").value=q;refreshShop();navTo("shop")}
document.addEventListener("click",e=>{if(!e.target.closest("#nav-search-desktop")&&!e.target.closest("#search-drop"))document.getElementById("search-drop").classList.remove("open")});

/* ===== LOGIN ===== */
function setRole(r,el){
  document.querySelectorAll(".rt").forEach(t=>t.classList.remove("active"));el.classList.add("active");
  document.getElementById("lei").value="";
  document.getElementById("lpi").value="";
  document.getElementById("lei").placeholder="Enter your "+r+" email";
  document.getElementById("lpi").placeholder="Enter your password";
}
function togglePw(){const i=document.getElementById("lpi");i.type=i.type==="password"?"text":"password"}
function handleForgotPw(){
  const email = document.getElementById("lei").value;
  if(!email){toast("Please enter your email first","warn");return}
  toast("⏳ Verifying email with database...","info");
  
  // Simulation of database check (already implemented in DentalShark_PHP_SQL/api/auth.php)
  setTimeout(() => {
    const user = USERS.find(u => u.email === email);
    if(user){
      toast("✅ Reset link sent to " + email, "success");
    } else {
      toast("❌ Email not found in database", "error");
    }
  }, 1500);
}
/* ===== VALIDATION ===== */
const API_URL='http://localhost:5000';
function validateEmail(email){
  if(!email) return {valid:false, msg:'Email is required'};
  if(!email.includes('@')) return {valid:false, msg:'Email must contain @ symbol'};
  if(!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) return {valid:false, msg:'Invalid email format (e.g. name@domain.com)'};
  return {valid:true};
}
function validatePassword(pw){
  const err=[];
  if(!pw) return {valid:false, msg:'Password is required'};
  if(pw.length<8) err.push('at least 8 characters');
  if(!/[A-Z]/.test(pw)) err.push('an uppercase letter');
  if(!/[a-z]/.test(pw)) err.push('a lowercase letter');
  if(!/[0-9]/.test(pw)) err.push('a number');
  if(!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pw)) err.push('a special character (!@#$%)');
  if(err.length) return {valid:false, msg:'Password must contain: '+err.join(', ')};
  return {valid:true};
}
function doLogin(provider){
  if(provider === 'google'){ toast('Redirecting to Google...','info'); setTimeout(()=>window.location.href='https://accounts.google.com', 1500); return; }
  if(provider === 'apple'){ toast('Redirecting to Apple ID...','info'); setTimeout(()=>window.location.href='https://appleid.apple.com', 1500); return; }
  // Guest — direct login, no authentication needed
  if(provider === 'guest'){
    toast("⏳ Logging in as Guest...","info");
    fetch(API_URL+'/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({guest:true})})
    .then(r=>r.json()).then(data=>{
      if(data.error){ CU=USERS.find(u=>u.id==='guest'); sharkPts=0; }
      else { localStorage.setItem('ds_token',data.token); const u=data.user; CU={id:u.uid,name:u.name,role:u.role,dept:u.dept,email:u.email,phone:u.phone,initials:u.initials,color:u.color,orders:u.orders||0,spent:u.spent||'—',joined:u.joined}; sharkPts=u.sharkPts||0; }
      completeLogin();
    }).catch(()=>{ CU=USERS.find(u=>u.id==='guest'); sharkPts=0; completeLogin(); toast('⚠️ Offline mode — server unavailable','warn'); });
    return;
  }
  const em=document.getElementById("lei").value.trim();
  const pw=document.getElementById("lpi").value;
  // Validate email
  const ec=validateEmail(em); if(!ec.valid){toast(ec.msg,"warn");return}
  // Validate password
  const pc=validatePassword(pw); if(!pc.valid){toast(pc.msg,"warn");return}
  toast("⏳ Authenticating with server...","info");
  fetch(API_URL+'/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:em,password:pw})})
  .then(r=>r.json()).then(data=>{
    if(data.error){toast("❌ "+data.error,"error");return}
    localStorage.setItem('ds_token',data.token);
    const u=data.user; CU={id:u.uid,name:u.name,role:u.role,dept:u.dept,email:u.email,phone:u.phone,initials:u.initials,color:u.color,orders:u.orders||0,spent:u.spent||'—',joined:u.joined};
    sharkPts=u.sharkPts||0;
    completeLogin();
  }).catch(()=>{
    const found=USERS.find(u=>u.email===em);
    if(found){CU=found;sharkPts=CU.orders>0?CU.orders*12:0;completeLogin();toast('⚠️ Offline mode','warn');}
    else toast('❌ Server unavailable. Please try again.','error');
  });
}
function completeLogin(){
  document.body.classList.add('logged-in');
  document.getElementById("login-screen").classList.remove("active");document.getElementById("login-screen").style.display="none";
  document.getElementById("main-nav").style.display="block";
  updateNavUser();updatePtsDisplay();startSessionTimer();setBN("home");navTo('home');
  toast("🦈 Welcome back, "+CU.name.split(" ")[0]+"! You have "+sharkPts+" SHARK Points","success");
}
function updateNavUser(){
  if(!CU)return;
  document.getElementById("nav-user-wrap").innerHTML=`<div class="user-chip" onclick="openProfileModal('${CU.id}')"><div class="user-av" style="background:${CU.color}">${CU.initials}</div><span class="user-name">${CU.name.split(" ").slice(-2).join(" ")}</span></div>`;
  document.getElementById("mob-user-wrap").innerHTML=`<button class="mob-link" onclick="closeMobDrawer();openProfileModal('${CU.id}')"><span class="mi">👤</span>${CU.name.split(" ").slice(-2).join(" ")}</button><button class="mob-link" onclick="closeMobDrawer();navTo('dashboard')"><span class="mi">📊</span>Dashboard</button><button class="mob-link" onclick="closeMobDrawer();doLogout()"><span class="mi">🚪</span>Sign Out</button>`;
}
function updatePtsDisplay(){
  const b=document.getElementById("pts-badge");if(b){b.textContent=sharkPts;b.style.display=sharkPts>0?"flex":"none"}
  const pd=document.getElementById("pts-display");if(pd)pd.textContent=sharkPts.toLocaleString();
}
function doLogout(){CU=null;cart=[];wishlist=[];sharkPts=0;document.body.classList.remove('logged-in');document.querySelectorAll(".screen").forEach(s=>{s.classList.remove("active");s.style.display="none"});document.getElementById("main-nav").style.display="none";const bn=document.getElementById("bottom-nav");if(bn)bn.style.display="none";document.getElementById("login-screen").style.display="flex";document.getElementById("login-screen").classList.add("active");document.getElementById("nav-user-wrap").innerHTML=`<button class="btn-signin" onclick="navTo('login')">SIGN IN</button>`;updateBadges()}

/* ===== NAVIGATION ===== */
function navTo(p){
  document.querySelectorAll(".screen").forEach(s=>{s.classList.remove("active");s.style.display="none"});
  const el=document.getElementById(p+"-screen");if(el){el.style.display="block";el.classList.add("active")}
  
  // Hide navs on login
  const nav = document.getElementById("main-nav");
  if(nav) nav.style.display = (p==="login") ? "none" : "block";
  
  const bnav = document.getElementById("bottom-nav");
  if(bnav) bnav.style.display = (p==="login") ? "none" : ""; 

  if(p!=='login' && el && !el.querySelector('footer')){
    el.insertAdjacentHTML('beforeend', buildFooter());
    const nl = document.querySelector('.nav-logo-img');
    const fl = el.querySelector('#footer-logo-img');
    if(nl && fl) fl.src = nl.src;
  }

  // Dashboard links in mobile burger menu
  const mobDash = document.getElementById("mob-dash-links");
  const mobMain = document.getElementById("mob-main-links");
  if(mobDash && mobMain){
    if(p==="dashboard"){
      mobDash.style.display="block";
      mobMain.style.display="none";
    } else {
      mobDash.style.display="none";
      mobMain.style.display="block";
    }
  }

  document.querySelectorAll(".nl").forEach(l=>l.classList.remove("active"));
  const nlMap={home:"HOME",shop:"SHOP","ai":"AI SCANNER",engineers:"ENGINEERS",about:"ABOUT",contact:"CONTACT"};
  if(nlMap[p])document.querySelectorAll(".nl").forEach(l=>{if(l.textContent===nlMap[p])l.classList.add("active")});
  window.scrollTo(0,0);closeCart();document.getElementById("search-drop").classList.remove("open");
  const bnm={home:"home",shop:"shop","ai":"ai",sharkpoints:"pts"};
  setBN(bnm[p]||"menu");
  if(p==="dashboard"&&CU)buildDashboard();
  if(p==="wishlist")renderWishlist();
  if(p==="about"){buildTeamGrid("team-about",7);buildValues()}
  if(p==="shop")refreshShop();
  if(p==="sharkpoints")updatePtsDisplay();
  if(p==="home"){buildFlashGrid();buildFeaturedGrid();setTimeout(syncWLHearts,50)}
}
function setBN(page){document.querySelectorAll(".bn-item").forEach(b=>b.classList.remove("active"));const el=document.getElementById("bn-"+page);if(el)el.classList.add("active")}

/* ===== MOBILE DRAWER ===== */
function openMobDrawer(){document.getElementById("mob-drawer").classList.add("open");document.getElementById("mob-overlay").classList.add("open");document.body.style.overflow="hidden"}
function closeMobDrawer(){document.getElementById("mob-drawer").classList.remove("open");document.getElementById("mob-overlay").classList.remove("open");document.body.style.overflow=""}

/* ===== BADGES ===== */
function updateBadges(){
  const cartCnt=cart.reduce((a,b)=>a+b.qty,0);
  const cb = document.getElementById("cart-badge"); if(cb) cb.textContent=cartCnt;
  const bnCB=document.getElementById("bn-cart-badge"); if(bnCB){bnCB.textContent=cartCnt;bnCB.style.display=cartCnt>0?"flex":"none"}
  const wlCnt=wishlist.length;
  const wlB=document.getElementById("wl-badge");if(wlB){wlB.textContent=wlCnt;wlB.style.display=wlCnt>0?"flex":"none"}
  const bnWLB=document.getElementById("bn-wl-badge");if(bnWLB){bnWLB.textContent=wlCnt;bnWLB.style.display=wlCnt>0?"flex":"none"}
  updatePtsDisplay();
}

/* ===== CART ===== */
function addToCart(id){
  const p=PRODUCTS.find(x=>x.id===id);if(!p)return;
  const ex=cart.find(x=>x.id===id);if(ex)ex.qty++;else cart.push({...p,qty:1});
  updateBadges();updateCartPtsEarn();
  toast("🛒 "+p.name+" added — ⚡ +"+p.pts+" pts","success");
}
function updateCartPtsEarn(){
  const totalPts=cart.reduce((a,b)=>a+b.pts*b.qty,0);
  const el=document.getElementById("cart-pts-text");if(el)el.textContent="Earn "+totalPts+" SHARK Points on this order";
}
function openCart(){
  const items=document.getElementById("cart-items");
  if(!cart.length){items.innerHTML=`<div style="text-align:center;padding:40px;color:var(--text2)">🛒<br><br>Your cart is empty</div>`}
  else items.innerHTML=cart.map(c=>`<div class="cart-item"><img class="cart-item-img" src="${c.img}" onerror="this.style.background='#0f2040'"><div class="cart-item-info"><div class="cart-item-name">${c.name}</div><div class="cart-item-sub">${c.brand} × ${c.qty}</div><div class="cart-pts">⚡ +${c.pts*c.qty} pts</div><button class="cart-item-del" onclick="removeFromCart(${c.id})">🗑</button></div><div class="cart-item-price">${(c.price*c.qty).toLocaleString()} EGP</div></div>`).join("");
  const sub=cart.reduce((a,b)=>a+b.price*b.qty,0);
  document.getElementById("cart-sub").textContent=sub.toLocaleString()+" EGP";
  document.getElementById("cart-tot").textContent=(sub+150).toLocaleString()+" EGP";
  updateCartPtsEarn();
  document.getElementById("cart-sidebar").classList.add("open");
}
function removeFromCart(id){cart=cart.filter(x=>x.id!==id);updateBadges();openCart()}
function closeCart(){document.getElementById("cart-sidebar").classList.remove("open")}
function doCheckout(){
  if(!cart.length){toast("Your cart is empty!","warn");return}
  const ptsEarned=cart.reduce((a,b)=>a+b.pts*b.qty,0);
  const sub=cart.reduce((a,b)=>a+b.price*b.qty,0);
  const payMethod=document.getElementById('pay-method')?.value||'COD';
  // Try API checkout
  const token=localStorage.getItem('ds_token');
  if(token){
    fetch(API_URL+'/api/orders',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},body:JSON.stringify({items:cart.map(c=>({productId:c.id,name:c.name,brand:c.brand,price:c.price,qty:c.qty,img:c.img,pts:c.pts})),subtotal:sub,shipping:150,total:sub+150,paymentMethod:payMethod})})
    .then(r=>r.json()).then(data=>{
      if(data.success){
        sharkPts+=data.ptsEarned||ptsEarned;
        showConfirmation(data.order?.orderId||'#DS-'+String(Math.floor(Math.random()*90000)+10000),sub,ptsEarned,payMethod,data.order?.trackingId);
      } else { sharkPts+=ptsEarned; showConfirmation('#DS-'+String(Math.floor(Math.random()*90000)+10000),sub,ptsEarned,payMethod); }
    }).catch(()=>{ sharkPts+=ptsEarned; showConfirmation('#DS-'+String(Math.floor(Math.random()*90000)+10000),sub,ptsEarned,payMethod); });
  } else { sharkPts+=ptsEarned; showConfirmation('#DS-'+String(Math.floor(Math.random()*90000)+10000),sub,ptsEarned,payMethod); }
}
let lastTrackingId = '';
function showConfirmation(ord,sub,ptsEarned,payMethod,trackId){
  closeCart();
  lastTrackingId = trackId || '';
  const d=new Date(),d2=new Date();d.setDate(d.getDate()+3);d2.setDate(d2.getDate()+5);
  const fmt=dt=>dt.toLocaleDateString("en-EG",{month:"short",day:"numeric"});
  document.getElementById("conf-ordnum").textContent=ord;
  document.getElementById("conf-eta").textContent=fmt(d)+" – "+fmt(d2)+", "+d.getFullYear();
  const ptsMsg=document.getElementById("pts-earned-msg");if(ptsMsg)ptsMsg.textContent="⚡ You earned "+ptsEarned+" SHARK Points on this order!";
  document.getElementById("conf-sub").textContent=sub.toLocaleString()+" EGP";
  document.getElementById("conf-tot").textContent=(sub+150).toLocaleString()+" EGP";
  const pmEl=document.getElementById("conf-payment");if(pmEl)pmEl.textContent=payMethod;
  const tkEl=document.getElementById("conf-tracking");if(tkEl)tkEl.textContent=trackId||'Processing...';
  document.getElementById("conf-items").innerHTML=cart.map(c=>`<div style="display:flex;align-items:center;gap:9px;padding:7px 0;border-bottom:1px solid var(--b2)"><img src="${c.img}" style="width:40px;height:40px;border-radius:7px;object-fit:cover;background:var(--bg2)" onerror="this.style.background='#0f2040'"><div style="flex:1"><div style="font-size:12px;font-weight:600;color:var(--text)">${c.name}</div><div style="font-size:10px;color:var(--text3)">${c.brand} x ${c.qty}</div></div><div style="font-family:'Bebas Neue',sans-serif;font-size:16px;color:var(--teal);letter-spacing:.5px">${(c.price*c.qty).toLocaleString()} EGP</div></div>`).join("");
  cart=[];updateBadges();updatePtsDisplay();
  navTo("confirm");
}

/* ===== WISHLIST ===== */
function wToggle(btn,pid){
  const id=parseInt(pid);const inWL=!!wishlist.find(x=>x.id===id);
  if(inWL){wishlist=wishlist.filter(x=>x.id!==id);toast("Removed from wishlist")}
  else{const p=PRODUCTS.find(x=>x.id===id);if(p)wishlist.push(p);toast("❤️ Added to wishlist","success")}
  updateBadges();syncWLHearts();
}
function syncWLHearts(){
  document.querySelectorAll(".pc-wish[data-pid]").forEach(btn=>{
    const id=parseInt(btn.dataset.pid);const inWL=!!wishlist.find(x=>x.id===id);
    btn.innerHTML=inWL?"❤️":"🤍";btn.classList.toggle("wl-active",inWL);btn.title=(inWL?"Remove from":"Add to")+" wishlist";
  });
}
function openWishlist(){navTo("wishlist")}
function renderWishlist(){
  const g=document.getElementById("wl-grid"),em=document.getElementById("wl-empty");if(!g)return;
  if(!wishlist.length){g.innerHTML="";if(em)em.style.display="block";return}
  if(em)em.style.display="none";g.innerHTML=wishlist.map(p=>pcard(p)).join("");setTimeout(syncWLHearts,50);
}
function clearWishlist(){wishlist=[];updateBadges();document.querySelectorAll(".pc-wish").forEach(b=>{b.innerHTML="🤍";b.classList.remove("wl-active")});renderWishlist();toast("💔 Wishlist cleared")}

/* ===== MODALS ===== */
function closeModal(){document.getElementById("profile-modal").classList.remove("show")}
function openProfileModal(uid){
  const u=USERS.find(x=>x.id===uid);if(!u)return;
  const rc={CEO:"#3b82f6",Engineer:"#a855f7",Vendor:"#10b981",Doctor:"#ec4899",Admin:"#22d3ee"}[u.role]||"var(--teal)";
  const roleIcons={CEO:"👑",Engineer:"🔧",Vendor:"🏪",Doctor:"🦷",Admin:"⚙️"};
  document.getElementById("modal-body").innerHTML=`
    <div style="display:flex;gap:14px;align-items:center;margin-bottom:22px">
      <div style="width:68px;height:68px;border-radius:16px;background:${u.color};display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;color:#fff;flex-shrink:0">${u.initials}</div>
      <div><div style="font-size:19px;font-weight:800;color:#fff;margin-bottom:4px">${u.name}</div><div style="display:inline-flex;align-items:center;gap:5px;font-size:10px;font-weight:700;padding:3px 10px;border-radius:20px;text-transform:uppercase;letter-spacing:.5px;background:${rc}18;color:${rc};border:1px solid ${rc}30">${roleIcons[u.role]||"👤"} ${u.role}</div></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px">
      <div><span style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:1px;display:block;margin-bottom:4px">Department</span><div style="font-size:13px;color:var(--text);font-weight:500">${u.dept}</div></div>
      <div><span style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:1px;display:block;margin-bottom:4px">Email</span><div style="font-size:13px;color:var(--text);font-weight:500">${u.email}</div></div>
      <div><span style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:1px;display:block;margin-bottom:4px">Phone</span><div style="font-size:13px;color:var(--text);font-weight:500">${u.phone}</div></div>
      <div><span style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:1px;display:block;margin-bottom:4px">Member Since</span><div style="font-size:13px;color:var(--text);font-weight:500">${u.joined}</div></div>
      ${u.orders>0?`<div><span style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:1px;display:block;margin-bottom:4px">Total Orders</span><div style="font-size:13px;color:var(--text);font-weight:500">${u.orders}</div></div>`:""}
      ${u.spent!=="—"?`<div><span style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:1px;display:block;margin-bottom:4px">Total Spent</span><div style="font-size:14px;color:var(--teal);font-weight:800;font-family:'Bebas Neue',sans-serif;letter-spacing:1px">${u.spent}</div></div>`:""}
    </div>
    ${CU&&u.id===CU.id?`<div style="background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.2);border-radius:10px;padding:12px;margin-bottom:14px;display:flex;align-items:center;gap:12px"><span style="font-size:28px">⚡</span><div><div style="font-size:11px;font-weight:700;color:var(--gold);text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">YOUR SHARK POINTS</div><div style="font-family:'Bebas Neue',sans-serif;font-size:32px;color:var(--gold);letter-spacing:2px;line-height:1">${sharkPts.toLocaleString()}</div></div><button onclick="closeModal();navTo('sharkpoints')" style="margin-left:auto;padding:8px 14px;background:rgba(245,158,11,.15);border:1px solid rgba(245,158,11,.3);border-radius:8px;color:var(--gold);font-family:Inter,sans-serif;font-size:12px;font-weight:700;cursor:pointer">Redeem →</button></div>`:""}
    <div style="display:flex;gap:8px;flex-wrap:wrap">
      <button style="padding:9px 16px;border-radius:8px;font-family:Inter,sans-serif;font-size:12px;font-weight:700;cursor:pointer;background:var(--teal);border:none;color:#000" onclick="window.open('https://wa.me/'+'${u.phone}'.replace(/\\D/g,''))">💬 Message</button>
      <button style="padding:9px 16px;border-radius:8px;font-family:Inter,sans-serif;font-size:12px;font-weight:700;cursor:pointer;background:transparent;border:1px solid var(--b2);color:var(--text2)" onclick="window.location.href='mailto:'+USERS.find(x=>x.name==='${u.name}').email">📧 Email</button>
      ${CU&&u.id===CU.id?`<button style="padding:9px 16px;border-radius:8px;font-family:Inter,sans-serif;font-size:12px;font-weight:700;cursor:pointer;background:transparent;border:1px solid var(--b2);color:var(--text2)" onclick="closeModal();navTo('dashboard')">📊 Dashboard</button><button style="padding:9px 16px;border-radius:8px;font-family:Inter,sans-serif;font-size:12px;font-weight:700;cursor:pointer;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);color:#f87171" onclick="closeModal();doLogout()">🚪 Sign Out</button>`:""}
    </div>`;
  document.getElementById("modal-title").textContent="👤 "+u.name;
  document.getElementById("profile-modal").classList.add("show");
}
function openProductModal(id){
  const p=PRODUCTS.find(x=>x.id===id);if(!p)return;
  const disc=p.old?Math.round((1-p.price/p.old)*100):0;
  const stars=Math.round(p.rating);const starsHtml=Array.from({length:5},(_,i)=>i<stars?"★":"☆").join("");
  document.getElementById("modal-body").innerHTML=`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:start;margin-bottom:16px">
      <div>
        <img src="${p.img}" style="width:100%;border-radius:12px;object-fit:cover;height:200px;background:var(--bg2)" onerror="this.style.background='#0f2040'">
        <div style="margin-top:10px;padding:11px;background:var(--bg2);border:1px solid var(--b2);border-radius:10px">
          <div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">SHIPPING</div>
          <div style="font-size:12px;color:var(--teal);font-weight:600;margin-bottom:3px">${p.price>1000?"⚡ Express: 1–2 business days":"🚚 Free: 3–5 business days"}</div>
          <div style="font-size:10px;color:var(--text3)">Ships from Cairo to all 27 governorates</div>
        </div>
        <div style="margin-top:8px;padding:10px 12px;background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.2);border-radius:10px;display:flex;align-items:center;gap:8px">
          <span style="font-size:18px">⚡</span>
          <div><div style="font-size:10px;font-weight:700;color:var(--gold);text-transform:uppercase;letter-spacing:1px;margin-bottom:2px">SHARK POINTS EARNED</div><div style="font-family:'Bebas Neue',sans-serif;font-size:22px;color:var(--gold);letter-spacing:1px">${p.pts} POINTS</div></div>
        </div>
      </div>
      <div>
        <div style="font-size:9px;font-weight:700;color:var(--teal);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:4px">${p.cat}</div>
        <div style="font-size:17px;font-weight:800;color:#fff;margin-bottom:4px;letter-spacing:-.3px">${p.name}</div>
        <div style="font-size:11px;color:var(--text3);margin-bottom:8px;font-weight:500">${p.brand}</div>
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px">
          <span style="color:#fbbf24;font-size:11px">${starsHtml}</span>
          <span style="font-size:12px;font-weight:700;color:var(--text)">${p.rating}</span>
          <span style="font-size:10px;color:var(--text3)">(${p.rev} reviews)</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap">
          <span style="font-family:'Bebas Neue',sans-serif;font-size:24px;color:var(--teal);letter-spacing:1px">${p.price.toLocaleString()} EGP</span>
          ${p.old?`<span style="font-size:11px;color:var(--text3);text-decoration:line-through">${p.old.toLocaleString()} EGP</span><span style="font-size:9px;font-weight:800;background:rgba(239,68,68,.12);color:#f87171;border:1px solid rgba(239,68,68,.2);padding:2px 6px;border-radius:4px">-${disc}%</span>`:""}
        </div>
        <div style="font-size:11px;color:var(--text2);line-height:1.65;margin-bottom:12px">${p.desc}</div>
        <div style="display:flex;gap:7px;margin-bottom:12px">
          <button style="flex:1;padding:10px;background:linear-gradient(90deg,var(--teal),var(--teal2));border:none;border-radius:9px;color:#000;font-family:Inter,sans-serif;font-size:12px;font-weight:800;cursor:pointer" onclick="addToCart(${p.id});closeModal()">🛒 Add to Cart</button>
          <button style="padding:10px 12px;background:rgba(37,211,102,.1);border:1px solid rgba(37,211,102,.3);border-radius:9px;color:#25d366;font-family:Inter,sans-serif;font-size:12px;font-weight:700;cursor:pointer" onclick="window.open('https://wa.me/201001234567?text='+encodeURIComponent('Hi DentalShark! I am interested in: ${p.name.replace(/'/g,'')} by ${p.brand.replace(/'/g,'')} — Price: ${p.price.toLocaleString()} EGP. Can you help?'),'_blank')" title="Contact vendor on WhatsApp">💬 WhatsApp</button>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px">
          <div style="padding:7px;background:var(--bg2);border:1px solid var(--b2);border-radius:7px"><div style="font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:2px">Brand</div><div style="font-size:11px;font-weight:600;color:var(--text)">${p.brand}</div></div>
          <div style="padding:7px;background:var(--bg2);border:1px solid var(--b2);border-radius:7px"><div style="font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:2px">Category</div><div style="font-size:11px;font-weight:600;color:var(--text)">${p.cat2}</div></div>
          <div style="padding:7px;background:var(--bg2);border:1px solid var(--b2);border-radius:7px"><div style="font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:2px">Warranty</div><div style="font-size:11px;font-weight:600;color:var(--teal)">6 months</div></div>
          <div style="padding:7px;background:var(--bg2);border:1px solid var(--b2);border-radius:7px"><div style="font-size:9px;color:var(--text3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:2px">Stock</div><div style="font-size:11px;font-weight:600;color:#4ade80">In Stock</div></div>
        </div>
      </div>
    </div>`;
  document.getElementById("modal-title").textContent=p.name;
  document.getElementById("profile-modal").classList.add("show");
}
function showNotifs(){
  document.getElementById("notif-body").innerHTML=NOTIFS.map(n=>`<div class="notif-item"><div class="n-dot ${n.read?"read":""}"></div><div><div class="n-text">${n.t}</div><div class="n-time">${n.tm}</div></div></div>`).join("");
  document.getElementById("notif-modal").classList.add("show");
  document.getElementById("notif-badge").textContent="0";
}

/* ===== DASHBOARD ===== */
function buildDashboard(){
  if(!CU)return;
  const sb=document.getElementById("dash-sidebar"),co=document.getElementById("dash-content"),mobInner=document.getElementById("mob-dash-inner");
  const menuMap={
    CEO:[["📊","Overview","overview"],["📦","Orders","orders"],["🏪","Products","products"],["💰","Revenue","revenue"],["👥","All Users","users"],["🏪","Vendors","vendors"],["⚙️","Settings","settings"]],
    Engineer:[["📊","Overview","overview"],["🔧","Repairs","repairs"],["📦","Orders","orders"],["👥","Team","users"],["📈","Analytics","analytics"],["⚙️","Settings","settings"]],
    Vendor:[["📊","My Store","overview"],["📦","Products","products"],["🛒","Orders","orders",8],["⭐","Reviews","reviews"],["💰","Earnings","earnings"],["⚙️","Settings","settings"]],
    Doctor:[["📊","Overview","overview"],["🛒","My Orders","orders"],["❤️","Wishlist","wishlist"],["🔧","Repairs","repairs"],["⚡","SHARK Points","sharkpoints"],["👤","Profile","profile"]],
    Admin:[["📊","Dashboard","overview"],["🏪","Products","products"],["👥","Users","users"],["📦","Orders","orders"],["🏪","Vendors","vendors"],["📣","Marketing","analytics"],["⚙️","Settings","settings"]],
    Staff:[["📊","Overview","overview"],["🏪","Products","products"],["📦","Orders","orders"],["❤️","Wishlist","wishlist"],["⚡","SHARK Points","sharkpoints"],["👤","Profile","profile"]],
    Student:[["📊","Overview","overview"],["🛒","My Orders","orders"],["❤️","Wishlist","wishlist"],["⚡","SHARK Points","sharkpoints"],["👤","Profile","profile"]]
  };
  const links=menuMap[CU.role]||menuMap["Doctor"];
  
  const sidebarHtml = `<div class="dash-user"><div class="dash-user-av" style="background:${CU.color}">${CU.initials}</div><div><div class="dash-user-name">${CU.name}</div><div class="dash-user-role">${CU.role}</div></div></div>
    <div class="dash-sec-label">Menu</div>
    ${links.map((l,i)=>`<div class="dash-link ${i===0?"active":""}" onclick="showDashSection('${l[2]}',this)">${l[0]} <span>${l[1]}</span>${l[3]?`<span class="dash-link-badge">${l[3]}</span>`:""}</div>`).join("")}
    <div style="margin-top:32px;border-top:1px solid var(--b2);padding-top:14px">
      <div class="dash-link" onclick="navTo('shop')">🛍️ <span>Shop</span></div>
      <div class="dash-link" onclick="openWishlist()">❤️ <span>Wishlist</span></div>
      <div class="dash-link" onclick="navTo('sharkpoints')" style="color:var(--gold)">⚡ <span>SHARK Points (${sharkPts})</span></div>
      <div class="dash-link" onclick="doLogout()">🚪 <span>Sign Out</span></div>
    </div>`;
  
  if(sb) sb.innerHTML = sidebarHtml;
  
  if(mobInner) {
    mobInner.innerHTML = links.map(l=>`<button class="mob-link" onclick="showDashSection('${l[2]}',null)"><span class="mi">${l[0]}</span>${l[1]}</button>`).join('') + 
      `<div class="mob-divider"></div>
       <button class="mob-link" onclick="doLogout()"><span class="mi">🚪</span>Sign Out</button>`;
  }

  showDashSection("overview",sb?.querySelector(".dash-link.active"));
}

function showDashSection(section,el){
  if(el){document.querySelectorAll(".dash-link").forEach(x=>x.classList.remove("active"));el.classList.add("active")}
  closeMobDrawer(); // Always close drawer when section is picked
  const co=document.getElementById("dash-content");if(!CU||!co)return;
  const kpiMap={
    CEO:[["💰","EGP 1.2M","Revenue","↑ 23% month","up"],["📦","342","Orders","↑ 18 week","up"],["👥","128","Users","↑ 12 today","up"],["🏪","6","Vendors","All active","up"]],
    Engineer:[["🔧","24","Repairs Done","↑ 8 month","up"],["⏳","6","In Progress","2 urgent","dn"],["📦","342","All Orders","Since launch","up"],["👨‍🔧","3","Engineers","Available","up"]],
    Vendor:[["📦","85","Products","↑ 5 new","up"],["🛒","47","Orders","↑ 12 week","up"],["💰","EGP 180K","Earnings","↑ 15K","up"],["⭐","4.8","Rating","Top vendor","up"]],
    Doctor:[["🛒","18","My Orders","2 pending","up"],["💰","EGP 45K","Spent","↑ 8K","up"],["❤️","12","Wishlist","3 on sale","up"],["⚡",String(sharkPts),"SHARK Points","Keep earning!","up"]],
    Admin:[["👥","128","Users","↑ 12","up"],["📦","342","Orders","↑ 8%","up"],["💰","EGP 1.2M","Revenue","↑ 23%","up"],["⚠️","4","Tickets","Needs action","dn"]]
  };
  const kpis=kpiMap[CU.role]||kpiMap["Doctor"];
  const orders=[
    {img:PRODUCTS[0].img,nm:PRODUCTS[0].name,dt:"Jan 15, 2025",st:"s-dl",sl:"Delivered",id:1},
    {img:PRODUCTS[1].img,nm:PRODUCTS[1].name,dt:"Jan 22, 2025",st:"s-sh",sl:"Shipped",id:2},
    {img:PRODUCTS[2].img,nm:PRODUCTS[2].name,dt:"Jan 28, 2025",st:"s-pd",sl:"Pending",id:3}
  ];
  if(section==="overview"){
    co.innerHTML=`
    <div class="dash-welcome">
      <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
        <div>
          <h2>Welcome, <span>${CU.name.split(" ").slice(-2).join(" ")}</span> 👋</h2>
          <p>${CU.dept} · ${new Date().toLocaleDateString("en-EG",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}</p>
        </div>
      </div>
    </div>
    <div class="pts-dashboard" style="margin-bottom:20px"><div style="display:flex;align-items:center;gap:14px"><span style="font-size:36px">⚡</span><div><div class="pts-balance">${sharkPts.toLocaleString()}</div><div class="pts-label">SHARK Points balance</div></div><button onclick="navTo('sharkpoints')" style="margin-left:auto;padding:9px 18px;background:rgba(245,158,11,.15);border:1px solid rgba(245,158,11,.3);border-radius:9px;color:var(--gold);font-family:Inter,sans-serif;font-size:12px;font-weight:700;cursor:pointer">Redeem Points →</button></div><div class="pts-history">📊 Earned from ${(CU.orders||0)} orders · Keep shopping to earn more!</div></div>
    <div style="display:flex;gap:9px;margin-bottom:20px;flex-wrap:wrap">
      <button style="padding:9px 16px;background:var(--teal);border:none;border-radius:8px;color:#000;font-family:Inter,sans-serif;font-size:12px;font-weight:700;cursor:pointer" onclick="navTo('shop')">🛍️ Browse Shop</button>
      <button style="padding:9px 16px;background:transparent;border:1px solid var(--b2);border-radius:8px;color:var(--text2);font-family:Inter,sans-serif;font-size:12px;cursor:pointer" onclick="navTo('ai')">🤖 AI Scanner</button>
      <button style="padding:9px 16px;background:transparent;border:1px solid var(--b2);border-radius:8px;color:var(--text2);font-family:Inter,sans-serif;font-size:12px;cursor:pointer" onclick="navTo('engineers')">🔧 Book Repair</button>
      <button style="padding:9px 16px;background:transparent;border:1px solid var(--b2);border-radius:8px;color:var(--text2);font-family:Inter,sans-serif;font-size:12px;cursor:pointer" onclick="showNotifs()">🔔 Notifications</button>
    </div>
    <div class="kpi-grid">${kpis.map(k=>`<div class="kpi-card"><div class="kpi-icon">${k[0]}</div><div class="kpi-val">${k[1]}</div><div class="kpi-lbl">${k[2]}</div><div class="kpi-change kpi-${k[4]}">${k[3]}</div></div>`).join("")}</div>
    <div class="dash-row">
      <div class="dash-card"><h3>📦 Recent Orders</h3>${orders.map(o=>`<div class="order-item"><img class="order-img" src="${o.img}" onerror="this.style.background='#0f2040'"><div><div class="order-name">${o.nm}</div><div class="order-date">${o.dt}</div></div><div style="margin-left:auto;display:flex;flex-direction:column;align-items:flex-end;gap:5px"><span class="s-tag ${o.st}">${o.sl}</span><button onclick="openProductModal(${o.id})" style="font-size:10px;padding:3px 8px;background:rgba(78,204,163,.1);border:1px solid rgba(78,204,163,.3);color:var(--teal);border-radius:5px;cursor:pointer;font-family:Inter,sans-serif">View</button></div></div>`).join("")}</div>
      <div class="dash-card"><h3>🔔 Notifications</h3>${NOTIFS.map(n=>`<div class="notif-item"><div class="n-dot ${n.read?"read":""}"></div><div><div class="n-text">${n.t}</div><div class="n-time">${n.tm}</div></div></div>`).join("")}</div>
    </div>`;
  } else if(section==="revenue"){
    co.innerHTML=`<div class="dash-welcome"><h2>Revenue <span>Analytics</span> 💰</h2><p>Financial performance and transaction history</p></div>
    <div class="kpi-grid">
      <div class="kpi-card"><div class="kpi-icon">💵</div><div class="kpi-val">EGP 1,248,500</div><div class="kpi-lbl">Total Revenue</div><div class="kpi-change kpi-up">↑ 12% vs last month</div></div>
      <div class="kpi-card"><div class="kpi-icon">📈</div><div class="kpi-val">EGP 312,125</div><div class="kpi-lbl">Net Profit (25%)</div><div class="kpi-change kpi-up">↑ 8% vs last month</div></div>
      <div class="kpi-card"><div class="kpi-icon">🛍️</div><div class="kpi-val">EGP 3,650</div><div class="kpi-lbl">Avg. Order Value</div><div class="kpi-change kpi-dn">↓ 2% vs last month</div></div>
      <div class="kpi-card"><div class="kpi-icon">💳</div><div class="kpi-val">342</div><div class="kpi-lbl">Total Transactions</div><div class="kpi-change kpi-up">↑ 45 new this week</div></div>
    </div>
    <div class="dash-card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
        <h3>📊 Recent Transactions</h3>
        <button class="btn-qv" style="width:auto;padding:0 12px;font-size:11px" onclick="toast('📄 Exporting CSV…','info')">Export CSV</button>
      </div>
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;font-size:12px;color:var(--text2)">
          <thead>
            <tr style="border-bottom:1px solid var(--b2);text-align:left">
              <th style="padding:10px;color:var(--text3)">ORDER ID</th>
              <th style="padding:10px;color:var(--text3)">CUSTOMER</th>
              <th style="padding:10px;color:var(--text3)">AMOUNT</th>
              <th style="padding:10px;color:var(--text3)">STATUS</th>
              <th style="padding:10px;color:var(--text3)">DATE</th>
            </tr>
          </thead>
          <tbody>
            ${[
              {id:"#DS-9912",c:"Dr. Ashraf Elsokary",a:"EGP 12,500",s:"Completed",st:"s-dl",d:"Oct 24, 2025"},
              {id:"#DS-9911",c:"Dr. Nader Mersal",a:"EGP 4,200",s:"Completed",st:"s-dl",d:"Oct 23, 2025"},
              {id:"#DS-9910",c:"Dr. Ahmed Hassan",a:"EGP 85,000",s:"Pending",st:"s-pd",d:"Oct 23, 2025"},
              {id:"#DS-9909",c:"Dr. Sarah Ali",a:"EGP 1,250",s:"Completed",st:"s-dl",d:"Oct 22, 2025"},
              {id:"#DS-9908",c:"Dr. Khaled Omar",a:"EGP 15,200",s:"Shipped",st:"s-sh",d:"Oct 22, 2025"}
            ].map(t=>`
              <tr style="border-bottom:1px solid var(--b2)">
                <td style="padding:12px;font-weight:700;color:var(--teal)">${t.id}</td>
                <td style="padding:12px;color:var(--text)">${t.c}</td>
                <td style="padding:12px;font-weight:700;color:var(--text)">${t.a}</td>
                <td style="padding:12px"><span class="s-tag ${t.st}">${t.s}</span></td>
                <td style="padding:12px;font-size:11px">${t.d}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>`;
  } else if(section==="sharkpoints" || section==="earnings"){
    co.innerHTML=`<div class="dash-welcome"><h2><span>${section.charAt(0).toUpperCase()+section.slice(1)}</span> ⚡</h2><p>Your loyalty rewards balance and history</p></div>
    <div class="pts-dashboard"><div style="display:flex;align-items:center;gap:14px"><span style="font-size:36px">⚡</span><div><div class="pts-balance">${sharkPts.toLocaleString()}</div><div class="pts-label">SHARK Points · 🥉 Bronze Tier</div></div><button onclick="navTo('sharkpoints')" style="margin-left:auto;padding:9px 18px;background:rgba(245,158,11,.15);border:1px solid rgba(245,158,11,.3);border-radius:9px;color:var(--gold);font-family:Inter,sans-serif;font-size:12px;font-weight:700;cursor:pointer">Redeem →</button></div></div>
    <div class="dash-card"><h3>📊 Transaction History</h3><div style="font-size:13px;color:var(--text2);line-height:2">⚡ Welcome bonus: +100 pts<br>⚡ Order #DS-001: +125 pts<br>⚡ Order #DS-002: +157 pts</div></div>`;
  } else if(section==="orders"){
    co.innerHTML=`<div class="dash-welcome"><h2><span>My Orders</span> 📦</h2><p>Track and manage your purchases</p></div>
    <div class="dash-card">
      <h3 style="margin-bottom:12px;">Recent Orders</h3>
      <div id="dash-orders-list"><div style="color:var(--text2);text-align:center;padding:20px;">Loading orders...</div></div>
    </div>`;
    fetch(API_URL+'/api/orders', { headers:{'Authorization':'Bearer '+localStorage.getItem('token')} })
      .then(r=>r.json()).then(ords=>{
        const ol = document.getElementById('dash-orders-list');
        if(!ol) return;
        if(ords.error || !ords.length) {
          ol.innerHTML = `<div style="text-align:center;padding:40px;color:var(--text2)">No orders found. <a onclick="navTo('shop')" style="color:var(--teal);cursor:pointer">Browse Shop</a></div>`;
          return;
        }
        ol.innerHTML = ords.map(o=>`
          <div class="order-item" style="display:flex;align-items:center;padding:12px;border-bottom:1px solid var(--b2)">
            <div style="flex:1">
              <div class="order-name" style="font-weight:700;color:var(--teal)">${o.orderId} <span class="s-tag ${statusColors[o.status]||'s-pd'}">${o.status}</span></div>
              <div class="order-date" style="font-size:12px;color:var(--text2)">${o.items.length} item(s) · Total: ${o.total.toLocaleString()} EGP</div>
              <div style="font-size:11px;color:var(--text3);margin-top:4px">Placed on: ${new Date(o.createdAt).toLocaleDateString()}</div>
            </div>
            <button onclick="showInfo('track'); setTimeout(()=> { document.getElementById('track-input').value='${o.trackingId}'; trackOrder(); }, 100);" style="padding:6px 12px;background:var(--card);border:1px solid var(--teal);border-radius:6px;color:var(--teal);font-weight:700;cursor:pointer">🔍 Track</button>
          </div>
        `).join('');
      }).catch(err=>console.error('Failed to load orders', err));
  } else if (section==="products") {
    co.innerHTML=`<div class="dash-welcome"><h2><span>Products</span> 📦</h2><p>Manage store catalog</p></div>
    ${(['CEO', 'Admin', 'Staff'].includes(CU.role)) ? `
      <div style="background:var(--card); border:1px solid var(--b2); border-radius:12px; padding:20px; margin-bottom:18px;">
        <h3 style="margin-bottom:14px; font-size:14px;">➕ Add New Product</h3>
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px;">
          <input class="form-input" id="np-name" placeholder="Product Name">
          <input class="form-input" id="np-brand" placeholder="Brand">
          <input class="form-input" id="np-price" type="number" placeholder="Price (EGP)">
          <select class="form-select" id="np-cat">
            ${CATS.map(c=>`<option>${c.n}</option>`).join('')}
          </select>
          <input class="form-input" id="np-img" placeholder="Image URL (Unsplash/Imgur)">
          <button class="btn-primary" onclick="addProduct()">Add Product</button>
        </div>
      </div>
    ` : ''}
    <div class="dash-card">
      <h3 style="margin-bottom:12px;">Existing Products</h3>
      <div id="dash-prod-list">
        ${PRODUCTS.map(p=>`<div class="order-item"><img class="order-img" src="${p.img}" onerror="this.style.background='#0f2040'"><div style="flex:1"><div class="order-name">${p.name}</div><div class="order-date">${p.brand} · ${p.price.toLocaleString()} EGP</div></div>
          ${(['CEO', 'Admin', 'Staff'].includes(CU.role)) ? `<button onclick="removeProduct(${p.id})" style="padding:5px 10px; background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:6px; color:#f87171; font-family:Inter,sans-serif; font-size:11px; cursor:pointer;">Remove</button>` : ''}
        </div>`).join("")}
      </div>
    </div>`;
  } else if(section==="repairs" || section==="vendors" || section==="users"){
    co.innerHTML=`<div class="dash-welcome"><h2><span>${section.charAt(0).toUpperCase()+section.slice(1)}</span> 🛠️</h2><p>Management and tracking</p></div>
    <div style="display:flex;gap:10px;margin-bottom:18px"><button style="padding:9px 16px;background:var(--teal);border:none;border-radius:8px;color:#000;font-family:Inter,sans-serif;font-size:12px;font-weight:700;cursor:pointer" onclick="navTo('engineers')">Add New Entry</button></div>
    <div class="dash-card"><h3>Active Records</h3>
      <div class="order-item"><div style="font-size:20px;margin-right:8px">🔧</div><div style="flex:1"><div class="order-name">Case #8821 - In Progress</div><div class="order-date">Updated Jan 20 · Est. Feb 5</div></div><span class="s-tag s-sh">Active</span></div>
      <div class="order-item"><div style="font-size:20px;margin-right:8px">👤</div><div style="flex:1"><div class="order-name">Entry #4412 - Pending Review</div><div class="order-date">Updated Jan 28 · Action required</div></div><span class="s-tag s-pd">Pending</span></div>
    </div>`;
  } else if(section==="wishlist"){
    co.innerHTML=`<div class="dash-welcome"><h2>My <span>Wishlist</span> ❤️</h2><p>Products saved for later</p></div><div class="prod-grid" style="margin-top:18px" id="dash-wl"></div>`;
    const g=document.getElementById("dash-wl");if(g)g.innerHTML=wishlist.length?wishlist.map(p=>pcard(p)).join(""):`<div style="grid-column:1/-1;text-align:center;padding:60px;color:var(--text2)"><div style="font-size:48px;margin-bottom:14px">❤️</div><p>No wishlist items yet. <a onclick="navTo('shop')" style="color:var(--teal);cursor:pointer">Browse Shop</a></p></div>`;
  } else if(section==="profile"){
    co.innerHTML=`<div class="dash-welcome"><h2>My <span>Profile</span> 👤</h2><p>Manage your account</p></div>
    <div style="max-width:600px;display:flex;flex-direction:column;gap:12px">
      <div class="dash-card" style="display:flex;align-items:center;gap:18px">
        <div style="width:72px;height:72px;border-radius:16px;background:${CU.color};display:flex;align-items:center;justify-content:center;font-size:24px;font-weight:800;color:#fff;flex-shrink:0">${CU.initials}</div>
        <div style="flex:1"><div style="font-size:19px;font-weight:800;color:#fff">${CU.name}</div><div style="font-size:12px;color:var(--teal);margin-top:4px">${CU.role} · ${CU.dept}</div></div>
        <button onclick="openProfileModal('${CU.id}')" style="padding:9px 18px;background:var(--teal);border:none;border-radius:9px;color:#000;font-family:Inter,sans-serif;font-size:12px;font-weight:700;cursor:pointer">Edit Profile</button>
      </div>
      <div class="dash-card"><div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">Email</div><div style="font-size:13px;color:var(--text)">${CU.email}</div></div>
      <div class="dash-card"><div style="font-size:10px;font-weight:700;color:var(--text3);text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">Phone</div><div style="font-size:13px;color:var(--text)">${CU.phone}</div></div>
    </div>
    <div style="margin-top:16px;display:flex;gap:10px;flex-wrap:wrap">
      <button onclick="toast('🔑 Reset email sent!','success')" style="padding:9px 18px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);border-radius:9px;color:#f87171;font-family:Inter,sans-serif;font-size:12px;font-weight:700;cursor:pointer">🔑 Change Password</button>
      <button onclick="doLogout()" style="padding:9px 18px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);border-radius:9px;color:#f87171;font-family:Inter,sans-serif;font-size:12px;font-weight:700;cursor:pointer">🚪 Sign Out</button>
    </div>`;
  } else if(section==="settings"){
    co.innerHTML=`<div class="dash-welcome"><h2>Account <span>Settings</span> ⚙️</h2><p>Manage your preferences</p></div>
    <div style="max-width:600px;display:flex;flex-direction:column;gap:12px">
      <div class="dash-card"><h3 style="margin-bottom:12px">🔔 Notifications</h3>${["Order updates","Flash deal alerts","Repair status updates","New product arrivals","Newsletter"].map(l=>`<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--b2)"><span style="font-size:13px;color:var(--text)">${l}</span><input type="checkbox" checked style="accent-color:var(--teal);width:16px;height:16px;cursor:pointer"></div>`).join("")}</div>
      <div class="dash-card"><h3 style="margin-bottom:12px">🌐 Language & Region</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
          <div><div class="form-lbl">Language</div><select class="form-select" onchange="toast('✅ Language updated','success')"><option>English</option><option>العربية</option></select></div>
          <div><div class="form-lbl">Currency</div><select class="form-select" onchange="toast('✅ Currency updated','success')"><option>EGP — Egyptian Pound</option><option>USD — US Dollar</option></select></div>
        </div>
      </div>
      <button onclick="toast('✅ Settings saved!','success')" style="padding:10px 22px;background:var(--teal);border:none;border-radius:8px;color:#000;font-family:Inter,sans-serif;font-size:13px;font-weight:700;cursor:pointer;max-width:200px">Save Changes</button>
    </div>`;
  } else {
    co.innerHTML=`<div class="dash-welcome"><h2><span>${section.charAt(0).toUpperCase()+section.slice(1)}</span></h2><p>Coming soon</p></div>
    <div class="dash-card" style="text-align:center;padding:60px 20px"><div style="font-size:48px;margin-bottom:16px">🚧</div><div style="font-size:18px;font-weight:700;color:#fff;margin-bottom:8px">Coming Soon</div><p style="color:var(--text2);margin-bottom:24px">This section is under development.</p><button style="padding:10px 18px;background:var(--teal);border:none;border-radius:8px;color:#000;font-family:Inter,sans-serif;font-size:13px;font-weight:700;cursor:pointer" onclick="showDashSection('overview',null)">← Back to Overview</button></div>`;
  }
}

/* ===== AI SCANNER ===== */
function handleAIFile(input){if(input.files&&input.files[0])runDemoAI()}
function runDemoAI(){
  const prog=document.getElementById("ai-prog"),bar=document.getElementById("ai-fill"),lbl=document.getElementById("ai-prog-lbl"),panel=document.getElementById("ai-results-panel"),empty=document.getElementById("ai-empty");
  if(!prog)return;
  prog.classList.add("show");bar.style.width="0%";lbl.textContent="🔬 Analyzing panoramic X-ray…";
  if(empty)empty.style.display="none";
  let w=0;const iv=setInterval(()=>{
    w=Math.min(w+Math.random()*13+4,100);bar.style.width=w+"%";
    if(w<30)lbl.textContent="📡 Loading DICOM data…";
    else if(w<60)lbl.textContent="🦷 Detecting tooth positions…";
    else if(w<85)lbl.textContent="🔍 Analyzing caries and bone loss…";
    else lbl.textContent="📄 Generating clinical report…";
    if(w>=100){clearInterval(iv);lbl.textContent="✅ Analysis Complete";showAIResults(panel)}
  },110);
}
function runSymptomAI(){const t=document.getElementById("ai-txt");if(!t.value.trim()){toast("⚠️ Please describe symptoms first","warn");return}runDemoAI()}
function showAIResults(panel){
  const old=panel.querySelector(".ai-results-inner");if(old)old.remove();
  const div=document.createElement("div");div.className="ai-results-inner";
  
  const upperR = [18,17,16,15,14,13,12,11];
  const upperL = [21,22,23,24,25,26,27,28];
  const lowerR = [48,47,46,45,44,43,42,41];
  const lowerL = [31,32,33,34,35,36,37,38];
  
  div.innerHTML=`
    <div class="ai-teeth-map" style="background:var(--bg3); border:1px solid var(--b2); border-radius:12px; padding:16px; margin-bottom:12px;">
      <div style="font-size:10px; font-weight:700; color:var(--text3); text-transform:uppercase; letter-spacing:1px; margin-bottom:12px; text-align:center;">Interactive Teeth Map (FDI Notation)</div>
      <div style="display:flex; flex-direction:column; gap:10px; align-items:center;">
        <div style="display:flex; gap:4px;">
          ${upperR.map(t=>`<div onclick="toast('Tooth ${t} selected','info')" style="width:24px; height:28px; background:${t===26?'#f87171':'var(--card)'}; border:1px solid ${t===26?'#ef4444':'var(--b2)'}; border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:700; cursor:pointer;" title="Tooth ${t}">${t}</div>`).join('')}
          <div style="width:2px; background:var(--b2); margin:0 4px;"></div>
          ${upperL.map(t=>`<div onclick="toast('Tooth ${t} selected','info')" style="width:24px; height:28px; background:var(--card); border:1px solid var(--b2); border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:700; cursor:pointer;" title="Tooth ${t}">${t}</div>`).join('')}
        </div>
        <div style="display:flex; gap:4px;">
          ${lowerR.map(t=>`<div onclick="toast('Tooth ${t} selected','info')" style="width:24px; height:28px; background:var(--card); border:1px solid var(--b2); border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:700; cursor:pointer;" title="Tooth ${t}">${t}</div>`).join('')}
          <div style="width:2px; background:var(--b2); margin:0 4px;"></div>
          ${lowerL.map(t=>`<div onclick="toast('Tooth ${t} selected','info')" style="width:24px; height:28px; background:${t===36?'#f87171':'var(--card)'}; border:1px solid ${t===36?'#ef4444':'var(--b2)'}; border-radius:4px; display:flex; align-items:center; justify-content:center; font-size:9px; font-weight:700; cursor:pointer;" title="Tooth ${t}">${t}</div>`).join('')}
        </div>
      </div>
      <div style="margin-top:10px; display:flex; justify-content:center; gap:12px; font-size:9px; font-weight:700;">
        <span style="display:flex; align-items:center; gap:4px;"><span style="width:8px; height:8px; background:#f87171; border-radius:2px;"></span> Finding</span>
        <span style="display:flex; align-items:center; gap:4px;"><span style="width:8px; height:8px; background:var(--card); border:1px solid var(--b2); border-radius:2px;"></span> Healthy</span>
      </div>
    </div>
    <div style="display:grid;gap:10px;margin-bottom:12px">
      <div style="background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:10px;padding:14px"><div style="font-size:10px;font-weight:700;color:#f87171;margin-bottom:6px;text-transform:uppercase;letter-spacing:1px">⚠️ URGENT FINDINGS</div><div style="font-size:12px;color:var(--text2);line-height:1.7">• Caries detected — Tooth 26 mesial surface (Stage II)<br>• Periapical lesion suspected — Tooth 36<br>• Bone loss Stage II — Upper right quadrant</div></div>
      <div style="background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2);border-radius:10px;padding:14px"><div style="font-size:10px;font-weight:700;color:#4ade80;margin-bottom:6px;text-transform:uppercase;letter-spacing:1px">✅ NORMAL</div><div style="font-size:12px;color:var(--text2);line-height:1.7">• Bone levels within normal limits — Lower anterior<br>• No impacted teeth detected<br>• Sinus cavities clear and healthy</div></div>
      <div style="background:rgba(245,158,11,.08);border:1px solid rgba(245,158,11,.2);border-radius:10px;padding:14px"><div style="font-size:10px;font-weight:700;color:#fbbf24;margin-bottom:6px;text-transform:uppercase;letter-spacing:1px">📋 TREATMENT PLAN</div><div style="font-size:12px;color:var(--text2);line-height:1.7">1. RCT Tooth 36 — <b style="color:#f87171">Emergency</b><br>2. Composite restoration Tooth 26 — Urgent<br>3. Periodontal therapy Q1 — Routine<br>4. 3-month recall panoramic X-ray</div></div>
      <div style="display:flex;gap:8px;margin-top:4px">
        <button onclick="toast('📄 Full PDF report downloading…','success')" style="flex:1;padding:9px;background:var(--teal);border:none;border-radius:8px;color:#000;font-family:Inter,sans-serif;font-size:12px;font-weight:700;cursor:pointer">📋 Download PDF Report</button>
        <button onclick="navTo('shop');toast('🛒 4 matched products shown','success')" style="flex:1;padding:9px;background:rgba(59,130,246,.15);border:1px solid rgba(59,130,246,.3);border-radius:8px;color:#60a5fa;font-family:Inter,sans-serif;font-size:12px;font-weight:700;cursor:pointer">🛒 View Products</button>
      </div>
    </div>`;
  panel.insertBefore(div,panel.querySelector(".ai-dicom-row")||null);
}

/* ===== FORMS ===== */
function submitBooking(){
  const clinic=document.getElementById("bk-clinic"),doctor=document.getElementById("bk-doctor");
  if(!clinic||!doctor||!clinic.value.trim()||!doctor.value.trim()){toast("Please fill in clinic and doctor name","warn");return}
  sharkPts+=100;updatePtsDisplay();
  toast("✅ Appointment booked! +100 SHARK Points earned! Eng. Kotb will contact you shortly.","success");
  clinic.value="";doctor.value="";const ph=document.getElementById("bk-phone");if(ph)ph.value="";
}
function submitContact(){
  const name=document.getElementById("ct-name"),email=document.getElementById("ct-email"),msg=document.getElementById("ct-msg");
  if(!name||!email||!msg||!name.value.trim()||!email.value.trim()||!msg.value.trim()){toast("Please fill in all required fields","warn");return}
  toast("📩 Message sent! Redirecting to WhatsApp...","success");
  const waMsg = encodeURIComponent(`Hello DentalShark! My name is ${name.value}. ${msg.value}`);
  setTimeout(()=>window.open(`https://wa.me/201001234567?text=${waMsg}`), 1500);
  name.value="";email.value="";msg.value="";const ph=document.getElementById("ct-phone");if(ph)ph.value="";
}
function removeProduct(id){
  const idx=PRODUCTS.findIndex(p=>p.id===id);
  if(idx!==-1){
    const name=PRODUCTS[idx].name;
    PRODUCTS.splice(idx,1);
    toast("🗑️ "+name+" removed","warn");
    showDashSection('products',null);
    refreshShop();
  }
}
function addProduct(){
  const name=document.getElementById("np-name").value;
  const brand=document.getElementById("np-brand").value;
  const price=parseFloat(document.getElementById("np-price").value);
  const cat=document.getElementById("np-cat").value;
  const img=document.getElementById("np-img").value || "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&h=400&fit=crop&q=85";
  if(!name || !brand || isNaN(price)){toast("Please fill name, brand and price","warn"); return;}
  const newP={id:Date.now(),name,brand,price,cat:cat.toUpperCase(),cat2:cat,badge:"new",rating:5.0,rev:0,pts:Math.floor(price/10),img,desc:"Newly added professional dental product."};
  PRODUCTS.unshift(newP);
  toast("✅ "+name+" added to catalog","success");
  showDashSection('products',null);
  refreshShop();
  document.getElementById("np-name").value="";
  document.getElementById("np-brand").value="";
  document.getElementById("np-price").value="";
}
function openSignupModal(){document.getElementById('signup-modal').classList.add('show')}
function closeSignupModal(){document.getElementById('signup-modal').classList.remove('show')}
function doSignup(){
  const name=document.getElementById('su-name')?.value?.trim();
  const email=document.getElementById('su-email')?.value?.trim();
  const pw=document.getElementById('su-pw')?.value;
  const role=document.getElementById('su-role')?.value||'Doctor';
  const phone=document.getElementById('su-phone')?.value?.trim()||'';
  if(!name){toast('Please enter your full name','warn');return}
  if(name.split(' ').length<2){toast('Please enter first and last name','warn');return}
  const ec=validateEmail(email);if(!ec.valid){toast(ec.msg,'warn');return}
  const pc=validatePassword(pw);if(!pc.valid){toast(pc.msg,'warn');return}
  toast('⏳ Creating account...','info');
  fetch(API_URL+'/api/auth/register',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,password:pw,role,phone})})
  .then(r=>r.json()).then(data=>{
    if(data.error){toast('❌ '+data.error,'error');return}
    localStorage.setItem('ds_token',data.token);
    const u=data.user;CU={id:u.uid,name:u.name,role:u.role,dept:u.dept,email:u.email,phone:u.phone,initials:u.initials,color:u.color,orders:0,spent:'—',joined:u.joined};
    sharkPts=0;closeSignupModal();completeLogin();
    toast('🎉 Account created! Welcome to DentalShark!','success');
  }).catch(()=>toast('❌ Server unavailable. Please try again.','error'));
}
