const sections = [
  {
    grade: "9",
    title: "9. Sınıf Kimya",
    folder: "9-sinif-kimya",
    items: [
      ["Maddelerin Asidik ve Bazik Özelliklerinin Belirlenmesi", "https://synletsoft.github.io/maddelerde-asidik-bazik-ozellik-belirleme/"],
      ["Metallerin Asit ve Bazlarla Tepkimesi", "https://synletsoft.github.io/metallerin-asit-baz-tepkimesi/"],
      ["Temel Güvenlik İşaretleri", "https://synletsoft.github.io/temel-guvenlik-isaretleri/"],
      ["Kimya Laboratuvarında Kullanılan Temel Malzemeler", "https://synletsoft.github.io/kimya-laboratuvarindaki-temel-malzemeler/"],
      ["Atom Modellerinin Tarihsel Gelişimi", "https://synletsoft.github.io/atomun-tarihsel-gelisimi/"],
      ["Elektronların Orbitallere Yerleşme Kuralları", "https://synletsoft.github.io/elektron-yerlesimi/"],
      ["Periyodik Tabloda Yer Bulma", "https://synletsoft.github.io/periyodik-cetvel/"],
      ["Periyodik Tabloda Bazı Gruplar ve Özellikleri", "https://synletsoft.github.io/modern-periyodik-sistem/"],
      ["Metalik Bağ Oluşumu ve Özellikleri", "https://synletsoft.github.io/metalik-baglar/"],
      ["İyonik Bağın Oluşumu", "https://synletsoft.github.io/iyonik-bagin-olusumu/"],
      ["Lewis Yapısı", "https://synletsoft.github.io/lewis-yapisi/"],
      ["Molekül Polarlığı", "https://synletsoft.github.io/molekul-polarligi/"],
      ["Moleküller Arası Etkileşimler", "https://synletsoft.github.io/molekul-etkilesimi/"],
      ["Katılar ve Özellikleri", "https://synletsoft.github.io/katilar-ve-ozellikleri/"],
      ["Sıvılar: Buharlaşma ve Denge Buhar Basıncı", "https://synletsoft.github.io/buharlasma-denge-buhar-basinci/", "Sıvılar Buharlaşma ve Denge Buhar Basıncı"],
      ["Sıvılar: Kaynama Sıcaklığı", "https://synletsoft.github.io/kaynama-sicakligi/", "Sıvılar Kaynama Sıcaklığı"],
      ["Sıvılar: Viskozite", "https://synletsoft.github.io/sivilar-viskozite/", "Sıvılar (Viskozite)"],
    ],
  },
  {
    grade: "10",
    title: "10. Sınıf Kimya",
    folder: "10-sinif-kimya",
    items: [
      ["Kimyasal Değişim", "https://synletsoft.github.io/kimyasal-degisim/"],
      ["Kimyasal Tepkimelerin Oluşum Sürecini Modelleme", "https://synletsoft.github.io/kimyasal-tepkimelerin-olusum-surecini-modelleme/"],
      ["Çökelme Tepkimeleri", "https://synletsoft.github.io/kimyasal-tepkime-turleri/"],
      ["Mol Kavramı", "https://synletsoft.github.io/grup-isimleri-mol-sayisi/"],
      ["Organik Moleküllerin Ayıraçları", "https://synletsoft.github.io/organik-molekullerin-ayiraclari/"],
      ["Basit Miktar Geçişleri", "https://synletsoft.github.io/basit-miktar-gecisleri/"],
      ["Kimyasal Tepkime Türleri", "https://synletsoft.github.io/kimyasal-tepkime-turleri/", "Çökelme Tepkimeleri"],
      ["Gazların Özellikleri", "https://synletsoft.github.io/gazlarin-ozellikleri/"],
      ["Graham Difüzyon Efüzyon Yasası", "https://synletsoft.github.io/graham-difuzyon-efuzyon-yasasi/"],
      ["Koligatif Özellikler", "https://synletsoft.github.io/koligatif-ozellikler/"],
      ["Çözünme Süreci Maddelerin Çözünebilirliği", "https://synletsoft.github.io/cozunme-sureci-maddelerin-cozunebilirligi/"],
    ],
  },
];

const sectionsRoot = document.querySelector("#sections");
const searchInput = document.querySelector("#searchInput");
const resultCount = document.querySelector("#resultCount");
const emptyState = document.querySelector("#emptyState");
const clearSearch = document.querySelector("#clearSearch");
const filterButtons = [...document.querySelectorAll(".filter-button")];

let activeFilter = "all";

function toSafeFileName(value) {
  const turkishCharacters = {
    ç: "c",
    ğ: "g",
    ı: "i",
    ö: "o",
    ş: "s",
    ü: "u",
  };

  return value
    .toLocaleLowerCase("tr-TR")
    .replace(/[çğıöşü]/g, (character) => turkishCharacters[character])
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function imagePath(folder, title) {
  return `./${folder}/${toSafeFileName(title)}.png`;
}

function createCard(section, [title, url, imageTitle], index) {
  const card = document.createElement("a");
  card.className = "activity-card";
  card.href = url;
  card.target = "_blank";
  card.rel = "noopener noreferrer";
  card.dataset.title = title.toLocaleLowerCase("tr-TR");
  card.setAttribute("aria-label", `${title} etkinliğini aç`);

  const imageWrap = document.createElement("div");
  imageWrap.className = "card-image-wrap";

  const image = document.createElement("img");
  image.className = "card-image";
  image.src = imagePath(section.folder, imageTitle || title);
  image.alt = `${title} etkinlik görseli`;
  image.loading = "lazy";
  imageWrap.append(image);

  const badge = document.createElement("span");
  badge.className = "class-badge";
  badge.textContent = `${section.grade}. sınıf`;
  imageWrap.append(badge);

  const content = document.createElement("div");
  content.className = "card-content";

  const number = document.createElement("p");
  number.className = "card-number";
  number.textContent = `Etkinlik ${String(index + 1).padStart(2, "0")}`;

  const heading = document.createElement("h3");
  heading.className = "card-title";
  heading.textContent = title;

  const action = document.createElement("div");
  action.className = "card-action";
  action.innerHTML = '<span>Etkinliği aç</span><span aria-hidden="true">↗</span>';

  content.append(number, heading, action);
  card.append(imageWrap, content);
  return card;
}

function getVisibleItems(section) {
  const query = searchInput.value.trim().toLocaleLowerCase("tr-TR");
  if (activeFilter !== "all" && section.grade !== activeFilter) return [];
  return section.items.filter(([title]) => title.toLocaleLowerCase("tr-TR").includes(query));
}

function render() {
  sectionsRoot.replaceChildren();
  let visibleTotal = 0;

  for (const section of sections) {
    const items = getVisibleItems(section);
    if (!items.length) continue;
    visibleTotal += items.length;

    const sectionElement = document.createElement("section");
    sectionElement.className = "section";
    sectionElement.dataset.grade = section.grade;

    const heading = document.createElement("div");
    heading.className = "section-heading";

    const title = document.createElement("h2");
    title.textContent = section.title;
    const count = document.createElement("p");
    count.textContent = `${items.length} etkinlik`;
    heading.append(title, count);

    const grid = document.createElement("div");
    grid.className = "card-grid";
    items.forEach((item) => grid.append(createCard(section, item, section.items.indexOf(item))));

    sectionElement.append(heading, grid);
    sectionsRoot.append(sectionElement);
  }

  const total = sections.reduce((sum, section) => sum + section.items.length, 0);
  resultCount.textContent = `${visibleTotal} / ${total} etkinlik gösteriliyor`;
  emptyState.hidden = visibleTotal !== 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    render();
  });
});

searchInput.addEventListener("input", render);

clearSearch.addEventListener("click", () => {
  searchInput.value = "";
  activeFilter = "all";
  filterButtons.forEach((item) => item.classList.toggle("is-active", item.dataset.filter === "all"));
  render();
  searchInput.focus();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "/" && document.activeElement !== searchInput) {
    event.preventDefault();
    searchInput.focus();
  }
});

render();
