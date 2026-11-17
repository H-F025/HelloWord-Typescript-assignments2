// 型定義
// 商品データ
interface Merchandise {
  id: number;
  name: string;
  price: number;
  discount?: number; // 割引率(%)。未指定の商品は割引なし
}

// カート内の商品
interface CartItem {
  id: number;
  quantity: number;
}

// 定数
const MAX_QUANTITY = 10; // 1商品あたりの最大数量
const DELETE = -1; // カートから削除は1個ずつ

// 商品データ
const merchandiseData: Merchandise[] = [
  { id: 1, name: 'ガム', price: 100 },
  { id: 2, name: 'コーラ', price: 200, discount: 50 },
  { id: 3, name: '栄養ドリンク', price: 300, discount: 10 },
];

// カート内の商品（追加した順）
let inCart: CartItem[] = [];

// HTML要素取得
// getElementById は「見つからないと null」を返すので、
// null のときはエラーにして、以降は HTMLElement として扱えるようにする
function getEl(id: string): HTMLElement {
  const el = document.getElementById(id);
  if (!el) throw new Error(`#${id} が見つかりません`);
  return el;
}

const shoppingEl = getEl('shopping');
const cartEl = getEl('cart');
const cartTitleEl = getEl('cart-title');
const cartCountEl = getEl('cart-count');
const totalScoreEl = getEl('total-score');
const totalDiscountEl = getEl('total-discount');
const totalAmountEl = getEl('total-amount');

const formatYen = (value: number): string => `¥${value.toLocaleString()}`;
const findItem = (id: number): Merchandise | undefined =>
  merchandiseData.find((m) => m.id === id);
const findCartItem = (id: number): CartItem | undefined =>
  inCart.find((c) => c.id === id);

// 商品カード（商品リスト・カート共通）を作る
function createCard(
  item: Merchandise,
  buttonLabel: string,
  onClick: () => void
): HTMLDivElement {
  const card = document.createElement('div');
  card.classList.add('card');

  // セール中（左上）
  if (item.discount) {
    const label = document.createElement('span');
    label.classList.add('sale-badge');
    label.textContent = `セール中:${item.discount}% OFF`;
    card.appendChild(label);
  }

  const body = document.createElement('div');
  body.classList.add('card-body');

  const name = document.createElement('div');
  name.classList.add('card-name');
  name.textContent = item.name;

  const price = document.createElement('div');
  price.classList.add('card-price');
  price.textContent = formatYen(item.price);

  body.append(name, price);

  const button = document.createElement('button');
  button.type = 'button';
  button.classList.add('card-btn');
  button.textContent = buttonLabel;
  button.addEventListener('click', onClick);

  card.append(body, button);
  return card;
}

// 商品リスト表示（全商品を常に表示）
function renderShopping(): void {
  shoppingEl.innerHTML = '';

  merchandiseData.forEach((item) => {
    const card = createCard(item, 'カートに追加', () => addToCart(item.id));
    shoppingEl.appendChild(card);
  });
}

// カート表示
function renderCart(): void {
  cartEl.innerHTML = '';

  inCart.forEach((cartItem) => {
    const item = findItem(cartItem.id);
    if (!item) return; // 見つからない商品はスキップ

    const li = document.createElement('li');

    const card = createCard(item, 'カートから削除', () =>
      changeQuantity(item.id, cartItem.quantity + DELETE)
    );

    // 数量SelectBox（右上 x1, x2 ...）
    // 選べる最大数は MAX_QUANTITY で固定
    const max = MAX_QUANTITY;
    const select = document.createElement('select');
    select.classList.add('quantity-select');
    for (let i = 1; i <= max; i++) {
      const option = document.createElement('option');
      option.value = String(i); // value は string 型
      option.textContent = `x${i}`;
      if (i === cartItem.quantity) option.selected = true;
      select.appendChild(option);
    }
    select.addEventListener('change', () => {
      changeQuantity(item.id, Number(select.value));
    });

    card.appendChild(select);
    li.appendChild(card);
    cartEl.appendChild(li);
  });
}

// 割引後の単価（1円未満切り捨て）
function discountedPrice(item: Merchandise): number {
  const rate = item.discount ?? 0;
  return Math.floor(item.price * (1 - rate / 100));
}

// 合計表示
function renderBreakdown(): void {
  // 点数（数量の合計）
  const totalScore = inCart.reduce((sum, c) => sum + c.quantity, 0);

  // 定価合計
  const subtotal = inCart.reduce((sum, c) => {
    const item = findItem(c.id);
    return item ? sum + item.price * c.quantity : sum;
  }, 0);

  // 割引後の合計
  const total = inCart.reduce((sum, c) => {
    const item = findItem(c.id);
    return item ? sum + discountedPrice(item) * c.quantity : sum;
  }, 0);

  // 全体の割引率
  const discountRate =
    subtotal === 0 ? 0 : Math.round(((subtotal - total) / subtotal) * 100);

  cartTitleEl.textContent = `カート(${inCart.length})`;
  cartCountEl.textContent = `カート内(${totalScore})`;
  totalScoreEl.textContent = String(totalScore);
  totalDiscountEl.textContent = String(discountRate);
  totalAmountEl.textContent = formatYen(total);
}

// 画面全体を再描画
function render(): void {
  renderShopping();
  renderCart();
  renderBreakdown();
}

// 操作
// カートに追加：カートに同じ商品があれば数量+1
function addToCart(id: number): void {
  const cartItem = findCartItem(id);
  if (cartItem) {
    changeQuantity(id, cartItem.quantity + 1);
  } else {
    inCart.push({ id, quantity: 1 }); // 初期数量 ×1
    render();
  }
}

// 数量変更：上限を超えたら何もしない。0になったらカートから外す
function changeQuantity(id: number, newQuantity: number): void {
  const cartItem = findCartItem(id);
  if (!cartItem) return;
  if (newQuantity > MAX_QUANTITY) return; // 上限チェック

  if (newQuantity <= 0) {
    inCart = inCart.filter((c) => c.id !== id);
  } else {
    cartItem.quantity = newQuantity;
  }
  render();
}

// 初期化
function initShopping(): void {
  render();
}

initShopping();