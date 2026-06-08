const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('http://localhost:4321/producto/aritos-alpaca-con-pasador-de-plata');
  
  // click comprar
  await page.click('#add-to-cart-btn');
  await page.waitForTimeout(1000);
  
  // click ir a paso 2
  await page.click('#go-to-step-2');
  await page.waitForTimeout(1000);
  
  // fill form
  await page.fill('input[name="name"]', 'Test Name');
  await page.fill('input[name="email"]', 'test@test.com');
  await page.fill('input[name="phone"]', '123456789');
  
  await page.selectOption('#provincia-select', 'Tucumán');
  await page.waitForTimeout(500);
  
  // trigger localidad input
  await page.fill('#localidad-input', 'San Miguel de Tucumán');
  await page.dispatchEvent('#localidad-input', 'input');
  await page.waitForTimeout(500);
  
  // fill cp
  await page.fill('#cp-input', '4000');
  await page.dispatchEvent('#cp-input', 'input');
  await page.waitForTimeout(2000); // wait for shipping options
  
  // fill the rest of the form
  await page.fill('input[name="calle"]', 'Calle Falsa');
  await page.fill('input[name="numero"]', '123');
  
  // check validation
  const validationState = await page.evaluate(() => {
    const form = document.getElementById('checkout-form');
    const matchedOpt = document.querySelector('#localidad-input').value.trim().toLowerCase();
    const options = Array.from(document.getElementById('localidades-list').options);
    const mOpt = options.find(opt => opt.value.toLowerCase() === matchedOpt);
    
    const validCps = JSON.parse(mOpt?.dataset?.cps || '[]');
    const cpValido = validCps.includes(document.getElementById('cp-input').value.trim());
    
    const invalidElements = Array.from(form.elements).filter(e => !e.checkValidity()).map(e => e.name || e.id);
    
    return {
      checkValidity: form.checkValidity(),
      invalidElements: invalidElements,
      cpValido,
      selectedShippingMethod: document.querySelector('input[name="shipping_method"]:checked')?.dataset?.name || '',
      buttonDisabled: document.getElementById('checkout-btn').disabled
    };
  });
  
  console.log(JSON.stringify(validationState, null, 2));
  
  await browser.close();
})();
