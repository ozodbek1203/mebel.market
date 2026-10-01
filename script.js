// ==========================================
// MEBEL MARKET
// ==========================================


// ==========================================
// ADMIN LOGIN MA'LUMOTLARI
// ==========================================

// Avval saqlangan login/parol bo'lsa, shuni oladi.
// Bo'lmasa, boshlang'ich login ishlaydi.

let adminCredentials =
    JSON.parse(localStorage.getItem("adminCredentials")) || {
        username: "ozodbek",
        password: "ozodbek0312"
    };


// ==========================================
// MAHSULOTLAR
// ==========================================

let products = [

    {
        id: 1,
        name: "Royal Kitchen",
        category: "oshxona",
        price: 12500000,
        size: "3.2 metr",
        sold: 12,
        image: "",
        description: "Zamonaviy premium oshxona mebeli."
    },

    {
        id: 2,
        name: "Luxury Closet",
        category: "shkaf",
        price: 8500000,
        size: "2.8 × 2.5 metr",
        sold: 8,
        image: "",
        description: "Keng va zamonaviy kupe shkaf."
    },

    {
        id: 3,
        name: "Modern Bedroom",
        category: "yotoqxona",
        price: 15000000,
        size: "Komplekt",
        sold: 6,
        image: "",
        description: "Yotoqxona uchun premium komplekt."
    },

    {
        id: 4,
        name: "Executive Office",
        category: "ofis",
        price: 18500000,
        size: "4 kishilik",
        sold: 5,
        image: "",
        description: "Zamonaviy ofis mebeli."
    },

    {
        id: 5,
        name: "Classic Kitchen",
        category: "oshxona",
        price: 9800000,
        size: "2.7 metr",
        sold: 10,
        image: "",
        description: "Minimalistik oshxona mebeli."
    },

    {
        id: 6,
        name: "Premium Wardrobe",
        category: "shkaf",
        price: 11000000,
        size: "3 metr",
        sold: 7,
        image: "",
        description: "Premium materialdan tayyorlangan shkaf."
    }

];


// ==========================================
// BUYURTMALAR
// ==========================================

let orders = [

    {
        id: 1,
        name: "Ali Valiyev",
        phone: "+998 90 123 45 67",
        address: "Toshkent shahri",
        product: "Royal Kitchen",
        price: 12500000,
        paid: 7000000,
        status: "progress",
        comment: ""
    },

    {
        id: 2,
        name: "Muhammad Ali",
        phone: "+998 91 222 33 44",
        address: "Chilonzor",
        product: "Luxury Closet",
        price: 8500000,
        paid: 8500000,
        status: "done",
        comment: ""
    }

];


// ==========================================
// FORMAT
// ==========================================

function money(value) {

    return new Intl.NumberFormat("uz-UZ").format(value) + " so‘m";

}


// ==========================================
// KATALOG
// ==========================================

let currentCategory = "all";


function renderProducts() {

    const container =
        document.getElementById("productsContainer");

    const search =
        document.getElementById("searchInput")
        .value
        .toLowerCase();

    container.innerHTML = "";

    const filtered = products.filter(product => {

        const categoryMatch =
            currentCategory === "all" ||
            product.category === currentCategory;

        const searchMatch =
            product.name
                .toLowerCase()
                .includes(search);

        return categoryMatch && searchMatch;

    });


    filtered.forEach((product, index) => {

        const image = product.image
            ? `<img src="${product.image}" alt="${product.name}">`
            : `<div class="image-placeholder">
                    <span>PREMIUM</span>
                    <strong>MEBEL</strong>
               </div>`;


        container.innerHTML += `

            <article class="product-card">

                <div class="product-image">

                    ${image}

                    <div class="product-number">
                        0${index + 1}
                    </div>

                </div>

                <div class="product-info">

                    <div class="product-category">
                        ${categoryName(product.category)}
                    </div>

                    <h3>
                        ${product.name}
                    </h3>

                    <div class="product-size">
                        📐 ${product.size}
                    </div>

                    <div class="product-bottom">

                        <div class="price">
                            ${money(product.price)}
                        </div>

                        <button
                            class="order-btn"
                            onclick="openOrder(${product.id})">

                            BUYURTMA

                        </button>

                    </div>

                </div>

            </article>

        `;

    });

}


function categoryName(category) {

    const names = {

        oshxona: "Oshxona",
        shkaf: "Shkaf",
        yotoqxona: "Yotoqxona",
        ofis: "Ofis"

    };

    return names[category] || category;

}


function filterCategory(category, button) {

    currentCategory = category;

    document
        .querySelectorAll(".category")
        .forEach(btn =>
            btn.classList.remove("active")
        );

    button.classList.add("active");

    renderProducts();

}


function searchProducts() {

    renderProducts();

}


// ==========================================
// BUYURTMA
// ==========================================

let selectedProduct = null;


function openOrder(productId) {

    selectedProduct =
        products.find(product =>
            product.id === productId
        );

    document.getElementById("selectedProduct").textContent =
        `${selectedProduct.name} — ${money(selectedProduct.price)}`;

    document.getElementById("orderModal").style.display =
        "flex";

}


function submitOrder() {

    const name =
        document.getElementById("customerName").value.trim();

    const phone =
        document.getElementById("customerPhone").value.trim();

    const address =
        document.getElementById("customerAddress").value.trim();

    const comment =
        document.getElementById("customerComment").value.trim();


    if (!name || !phone || !address) {

        alert("Iltimos, ism, telefon va manzilni kiriting!");

        return;

    }


    const newOrder = {

        id: Date.now(),

        name: name,

        phone: phone,

        address: address,

        product: selectedProduct.name,

        price: selectedProduct.price,

        paid: 0,

        status: "new",

        comment: comment

    };


    orders.unshift(newOrder);


    closeModal("orderModal");


    document.getElementById("customerName").value = "";
    document.getElementById("customerPhone").value = "";
    document.getElementById("customerAddress").value = "";
    document.getElementById("customerComment").value = "";


    alert(
        "✅ Buyurtmangiz qabul qilindi!\n\n" +
        "Tez orada siz bilan bog‘lanamiz."
    );


    updateAdmin();

}


// ==========================================
// MODAL
// ==========================================

function closeModal(id) {

    document.getElementById(id).style.display =
        "none";

}


// ==========================================
// ADMIN LOGIN
// ==========================================

function openAdminLogin() {

    document.getElementById("adminLogin").style.display =
        "flex";

}


function adminLogin() {

    const username =
        document.getElementById("adminUsername").value.trim();

    const password =
        document.getElementById("adminPassword").value;


    if (
        username === adminCredentials.username &&
        password === adminCredentials.password
    ) {

        closeModal("adminLogin");

        document.getElementById("adminPanel")
            .classList.add("show");

        updateAdmin();

        document.body.style.overflow = "hidden";

        // Login oynasini tozalash
        document.getElementById("adminUsername").value = "";
        document.getElementById("adminPassword").value = "";

    } else {

        alert("❌ Login yoki parol noto‘g‘ri!");

    }

}


// ==========================================
// ADMIN LOGIN + PAROLNI O'ZGARTIRISH
// ==========================================

function saveAdminCredentials() {

    const username =
        document
            .getElementById("newAdminUsername")
            .value
            .trim();

    const password =
        document
            .getElementById("newAdminPassword")
            .value;

    const confirmPassword =
        document
            .getElementById("confirmAdminPassword")
            .value;


    // Bo'sh maydonlarni tekshirish
    if (!username || !password || !confirmPassword) {

        alert("⚠️ Iltimos, barcha maydonlarni to‘ldiring!");

        return;

    }


    // Login uzunligi
    if (username.length < 3) {

        alert("⚠️ Login kamida 3 ta belgidan iborat bo‘lsin!");

        return;

    }


    // Parol uzunligi
    if (password.length < 4) {

        alert("⚠️ Parol kamida 4 ta belgidan iborat bo‘lsin!");

        return;

    }


    // Parollar bir xilmi?
    if (password !== confirmPassword) {

        alert("❌ Parollar bir xil emas!");

        return;

    }


    // Yangi ma'lumotlarni saqlash
    adminCredentials = {

        username: username,

        password: password

    };


    localStorage.setItem(
        "adminCredentials",
        JSON.stringify(adminCredentials)
    );


    // Formani tozalash
    document.getElementById("newAdminUsername").value = "";
    document.getElementById("newAdminPassword").value = "";
    document.getElementById("confirmAdminPassword").value = "";


    alert(
        "✅ Login va parol muvaffaqiyatli o‘zgartirildi!\n\n" +
        "Yangi login: " + username
    );

}


function logoutAdmin() {

    document.getElementById("adminPanel")
        .classList.remove("show");

    document.body.style.overflow = "auto";

}


// ==========================================
// ADMIN NAVIGATION
// ==========================================

function adminPage(page, button) {

    document
        .querySelectorAll(".admin-page")
        .forEach(item =>
            item.classList.remove("active")
        );


    const target =
        document.getElementById("admin-" + page);


    if (target) {

        target.classList.add("active");

    }


    document
        .querySelectorAll(".admin-menu-btn")
        .forEach(item =>
            item.classList.remove("active")
        );


    if (button) {

        button.classList.add("active");

    }


    const titles = {

        overview: "Dashboard",

        products: "Katalog",

        orders: "Buyurtmalar",

        clients: "Mijozlar",

        reports: "Hisobot",

        settings: "Admin sozlamalari"

    };


    document.getElementById("adminTitle").textContent =
        titles[page] || "Dashboard";

}


// ==========================================
// ADMIN UPDATE
// ==========================================

function updateAdmin() {

    updateDashboard();

    renderAdminProducts();

    renderAdminOrders();

    renderAdminClients();

    renderReports();

}


// ==========================================
// DASHBOARD
// ==========================================

function updateDashboard() {

    const totalSales =
        orders.reduce(
            (sum, order) =>
                sum + Number(order.price),
            0
        );


    const totalPaid =
        orders.reduce(
            (sum, order) =>
                sum + Number(order.paid),
            0
        );


    const debt =
        totalSales - totalPaid;


    document.getElementById("dashOrders").textContent =
        orders.length;


    document.getElementById("dashSales").textContent =
        money(totalSales);


    document.getElementById("dashPaid").textContent =
        money(totalPaid);


    document.getElementById("dashDebt").textContent =
        money(debt);


    document.getElementById("quickProducts").textContent =
        products.length;


    document.getElementById("quickClients").textContent =
        uniqueClients();


    const sold =
        products.reduce(
            (sum, product) =>
                sum + Number(product.sold),
            0
        );


    document.getElementById("quickSold").textContent =
        sold;


    const badge =
        document.getElementById("orderBadge");

    badge.textContent = orders.length;


    renderRecentOrders();

}


// ==========================================
// RECENT ORDERS
// ==========================================

function renderRecentOrders() {

    const table =
        document.getElementById("recentOrders");

    table.innerHTML = "";


    orders.slice(0, 5).forEach(order => {

        table.innerHTML += `

            <tr>

                <td>
                    <strong>${order.name}</strong>
                </td>

                <td>
                    ${order.product}
                </td>

                <td>
                    ${money(order.price)}
                </td>

                <td>
                    ${statusHTML(order.status)}
                </td>

            </tr>

        `;

    });

}


// ==========================================
// STATUS
// ==========================================

function statusHTML(status) {

    const data = {

        new: [
            "new",
            "Yangi"
        ],

        progress: [
            "progress",
            "Jarayonda"
        ],

        done: [
            "done",
            "Yetkazildi"
        ],

        cancel: [
            "cancel",
            "Bekor qilindi"
        ]

    };


    const item =
        data[status] || data.new;


    return `
        <span class="status ${item[0]}">
            ${item[1]}
        </span>
    `;

}


// ==========================================
// ADMIN PRODUCTS
// ==========================================

function renderAdminProducts() {

    const table =
        document.getElementById("adminProductsTable");

    table.innerHTML = "";


    products.forEach(product => {

        table.innerHTML += `

            <tr>

                <td>
                    <strong>${product.name}</strong>
                </td>

                <td>
                    ${categoryName(product.category)}
                </td>

                <td>
                    ${money(product.price)}
                </td>

                <td>
                    ${product.sold} ta
                </td>

                <td>

                    <button
                        onclick="deleteProduct(${product.id})"
                        style="
                            border:0;
                            background:#fee2e2;
                            padding:7px 10px;
                            border-radius:4px;
                            cursor:pointer;
                        ">

                        🗑

                    </button>

                </td>

            </tr>

        `;

    });

}


// ==========================================
// PRODUCT ADD
// ==========================================

function openProductForm() {

    document.getElementById("productModal").style.display =
        "flex";

}


function addProduct() {

    const name =
        document.getElementById("productName").value.trim();

    const category =
        document.getElementById("productCategory").value;

    const price =
        Number(
            document.getElementById("productPrice").value
        );

    const size =
        document.getElementById("productSize").value.trim();

        function addProduct() {

            const name =
                document.getElementById("productName").value.trim();
        
            const category =
                document.getElementById("productCategory").value;
        
            const price =
                Number(
                    document.getElementById("productPrice").value
                );
        
            const size =
                document.getElementById("productSize").value.trim();
        
            const imageInput =
                document.getElementById("productImage");
        
            const description =
                document.getElementById("productDescription").value.trim();
        
        
            if (!name || !price) {
        
                alert("Mebel nomi va narxini kiriting!");
        
                return;
            }
        
        
            // Rasm tanlanganmi?
            if (!imageInput.files || !imageInput.files[0]) {
        
                alert("📷 Iltimos, mahsulot rasmini tanlang!");
        
                return;
            }
        
        
            const file = imageInput.files[0];
        
        
            // Rasmni Data URL ga aylantiramiz
            const reader = new FileReader();
        
        
            reader.onload = function(e) {
        
                const image = e.target.result;
        
        
                products.push({
        
                    id: Date.now(),
        
                    name: name,
        
                    category: category,
        
                    price: price,
        
                    size: size || "Individual",
        
                    sold: 0,
        
                    image: image,
        
                    description: description
        
                });
        
        
                closeModal("productModal");
        
        
                // Formani tozalash
                document.getElementById("productName").value = "";
                document.getElementById("productPrice").value = "";
                document.getElementById("productSize").value = "";
                document.getElementById("productImage").value = "";
                document.getElementById("productDescription").value = "";
        
        
                // Previewni tozalash
                document.getElementById("imagePreview").innerHTML =
                    "<span>Rasm tanlanmagan</span>";
        
        
                // Katalogni yangilash
                renderProducts();
        
                updateAdmin();
        
        
                alert("✅ Mebel va rasmi katalogga qo‘shildi!");
        
            };
        
        
            reader.readAsDataURL(file);
        
        }

    const description =
        document.getElementById("productDescription").value.trim();


    if (!name || !price) {

        alert("Mebel nomi va narxini kiriting!");

        return;

    }


    products.push({

        id: Date.now(),

        name: name,

        category: category,

        price: price,

        size: size || "Individual",

        sold: 0,

        image: image,

        description: description

    });


    closeModal("productModal");


    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productSize").value = "";
    document.getElementById("productImage").value = "";
    document.getElementById("productDescription").value = "";


    renderProducts();

    updateAdmin();


    alert("✅ Mebel katalogga qo‘shildi!");

}


function deleteProduct(id) {

    if (!confirm("Bu mahsulotni o‘chirmoqchimisiz?")) {

        return;

    }


    products =
        products.filter(product =>
            product.id !== id
        );


    renderProducts();

    updateAdmin();

}


// ==========================================
// ADMIN ORDERS
// ==========================================

function renderAdminOrders() {

    const table =
        document.getElementById("adminOrdersTable");

    table.innerHTML = "";


    orders.forEach(order => {

        const debt =
            Number(order.price) -
            Number(order.paid);


        table.innerHTML += `

            <tr>

                <td>
                    <strong>${order.name}</strong>
                </td>

                <td>
                    ${order.phone}
                </td>

                <td>
                    ${order.product}
                </td>

                <td>
                    ${money(order.price)}
                </td>

                <td>
                    ${money(order.paid)}
                    <br>
                    <small style="color:#d64545">
                        Qarz: ${money(debt)}
                    </small>
                </td>

                <td>
                    ${statusHTML(order.status)}
                </td>

                <td>

                    <button
                        onclick="changeOrderStatus(${order.id})"
                        style="
                            border:0;
                            background:#111;
                            color:#fff;
                            padding:7px 10px;
                            cursor:pointer;
                        ">

                        Status

                    </button>

                    <button
                        onclick="addPayment(${order.id})"
                        style="
                            border:0;
                            background:#dff3e6;
                            padding:7px 10px;
                            cursor:pointer;
                        ">

                        + Pul

                    </button>

                </td>

            </tr>

        `;

    });

}


// ==========================================
// ORDER STATUS
// ==========================================

function changeOrderStatus(id) {

    const order =
        orders.find(item =>
            item.id === id
        );


    if (!order) return;


    const statuses = [
        "new",
        "progress",
        "done",
        "cancel"
    ];


    const current =
        statuses.indexOf(order.status);


    order.status =
        statuses[
            (current + 1) % statuses.length
        ];


    updateAdmin();

}


// ==========================================
// PAYMENT
// ==========================================

function addPayment(id) {

    const order =
        orders.find(item =>
            item.id === id
        );


    if (!order) return;


    const payment =
        Number(
            prompt(
                "To‘lov summasini kiriting:"
            )
        );


    if (!payment || payment <= 0) {

        return;

    }


    order.paid += payment;


    if (order.paid > order.price) {

        order.paid = order.price;

    }


    updateAdmin();

}


// ==========================================
// CLIENTS
// ==========================================

function uniqueClients() {

    return new Set(
        orders.map(order =>
            order.phone
        )
    ).size;

}


function renderAdminClients() {

    const table =
        document.getElementById("adminClientsTable");

    table.innerHTML = "";


    const clients = {};


    orders.forEach(order => {

        if (!clients[order.phone]) {

            clients[order.phone] = {

                name: order.name,

                phone: order.phone,

                address: order.address,

                orders: 0

            };

        }


        clients[order.phone].orders++;

    });


    Object.values(clients).forEach(client => {

        table.innerHTML += `

            <tr>

                <td>
                    <strong>${client.name}</strong>
                </td>

                <td>
                    ${client.phone}
                </td>

                <td>
                    ${client.address}
                </td>

                <td>
                    ${client.orders} ta
                </td>

            </tr>

        `;

    });

}


// ==========================================
// REPORTS
// ==========================================

function renderReports() {

    const total =
        orders.reduce(
            (sum, order) =>
                sum + Number(order.price),
            0
        );


    const paid =
        orders.reduce(
            (sum, order) =>
                sum + Number(order.paid),
            0
        );


    const debt =
        total - paid;


    document.getElementById("reportSales").textContent =
        money(total);

    document.getElementById("reportPaid").textContent =
        money(paid);

    document.getElementById("reportDebt").textContent =
        money(debt);


    let sold =
        products.reduce(
            (sum, product) =>
                sum + Number(product.sold),
            0
        );


    let percent =
        products.length
            ? Math.min(
                100,
                Math.round(
                    sold /
                    (products.length * 15) *
                    100
                )
            )
            : 0;


    document.getElementById("soldPercent").textContent =
        percent + "%";


    document.querySelector(".circle-inner").style.background =
        `conic-gradient(
            var(--gold) ${percent * 3.6}deg,
            #eee ${percent * 3.6}deg
        )`;

}


// ==========================================
// INITIALIZE
// ==========================================

renderProducts();

updateAdmin();
function previewProductImage(event) {
    const file = event.target.files[0];
    const preview = document.getElementById("imagePreview");

    if (!file) {
        preview.innerHTML = "<span>Rasm tanlanmagan</span>";
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        preview.innerHTML =
            `<img src="${e.target.result}" alt="Mahsulot rasmi">`;
    };

    reader.readAsDataURL(file);
}
